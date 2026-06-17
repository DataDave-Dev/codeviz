import type { Locale } from "@/i18n/config";
import { H1, Lead, H2, P, UL, LI, Code, EdgeDot, Callout } from "../Prose";

export default function HowItWorks({ lang }: { lang: Locale }) {
  if (lang === "es") {
    return (
      <>
        <H1>Cómo funciona</H1>
        <Lead>
          Weftmap hace análisis estático: lee tu código sin ejecutarlo y deduce las
          relaciones a partir del árbol de sintaxis.
        </Lead>

        <H2>El pipeline</H2>
        <UL>
          <LI><strong>Parseo</strong> — cada archivo se analiza con <Code>tree-sitter</Code>, que produce un árbol de sintaxis real (no expresiones regulares).</LI>
          <LI><strong>Tabla de símbolos</strong> — se recogen las funciones y clases definidas en cada archivo.</LI>
          <LI><strong>Imports</strong> — se resuelve cada import al archivo correspondiente, según las reglas del lenguaje.</LI>
          <LI><strong>Llamadas</strong> — cada llamada se enlaza a su definición: primero local, luego en un archivo importado, y si solo hay un candidato global, a ese.</LI>
          <LI><strong>Clases y herencia</strong> — los métodos se asignan a su clase y se trazan las relaciones <Code>extends</Code>.</LI>
          <LI><strong>Layout</strong> — se agrupa en módulos › clases › métodos y se posiciona con un layout jerárquico.</LI>
        </UL>

        <H2>Modelo del grafo</H2>
        <P>Tres tipos de nodo (módulo, función, clase) y tres tipos de arista:</P>
        <UL>
          <LI><EdgeDot kind="calls" /> <Code>calls</Code> — entre funciones/métodos.</LI>
          <LI><EdgeDot kind="imports" /> <Code>imports</Code> — entre módulos.</LI>
          <LI><EdgeDot kind="extends" /> <Code>extends</Code> — entre clases.</LI>
        </UL>

        <H2>SQL: otro tipo de diagrama</H2>
        <P>
          SQL no produce un call graph sino un diagrama entidad-relación: las tablas
          son nodos (con columnas y claves PK/FK) y las foreign keys son aristas
          <Code>references</Code> con cardinalidad. Más detalle en <Code>Leer el diagrama</Code>.
        </P>

        <H2>Seguridad y rendimiento</H2>
        <UL>
          <LI>El parseo de cada archivo tiene un tope de tiempo para que una entrada patológica no bloquee el servidor.</LI>
          <LI>Hay límites de 2 MB y 400 archivos por análisis (ver <Code>Referencia de la API</Code>).</LI>
        </UL>

        <H2>Límites conocidos</H2>
        <P>El análisis es por <strong>nombre</strong>, no por tipo ni alcance. Eso implica:</P>
        <UL>
          <LI>Dos funciones (o métodos de clases distintas) con el mismo nombre se fusionan en un nodo.</LI>
          <LI>No se sigue el despacho dinámico, <Code>eval</Code>, reflexión ni callbacks invocados indirectamente.</LI>
          <LI>Las llamadas a librerías externas se omiten (solo se enlazan definiciones de tu código).</LI>
          <LI>En Go los imports por paquete no se mapean a archivos.</LI>
          <LI>Por ahora se sube una carpeta (aún no archivos <Code>.zip</Code>).</LI>
        </UL>

        <Callout kind="warn">
          Trata el grafo como un mapa de alta señal, no como una verdad exacta:
          el análisis estático por nombre acierta en la mayoría de casos comunes,
          pero puede aproximar en código muy dinámico.
        </Callout>
      </>
    );
  }

  return (
    <>
      <H1>How it works</H1>
      <Lead>
        Weftmap does static analysis: it reads your code without running it and
        infers the relationships from the syntax tree.
      </Lead>

      <H2>The pipeline</H2>
      <UL>
        <LI><strong>Parsing</strong> — each file is parsed with <Code>tree-sitter</Code>, producing a real syntax tree (not regex).</LI>
        <LI><strong>Symbol table</strong> — the functions and classes defined in each file are collected.</LI>
        <LI><strong>Imports</strong> — each import is resolved to its file, following the language&apos;s rules.</LI>
        <LI><strong>Calls</strong> — each call is linked to its definition: local first, then an imported file, and if there is a single global candidate, that one.</LI>
        <LI><strong>Classes &amp; inheritance</strong> — methods are attributed to their class and <Code>extends</Code> relationships are traced.</LI>
        <LI><strong>Layout</strong> — grouped into modules › classes › methods and positioned with a hierarchical layout.</LI>
      </UL>

      <H2>Graph model</H2>
      <P>Three node types (module, function, class) and three edge types:</P>
      <UL>
        <LI><EdgeDot kind="calls" /> <Code>calls</Code> — between functions/methods.</LI>
        <LI><EdgeDot kind="imports" /> <Code>imports</Code> — between modules.</LI>
        <LI><EdgeDot kind="extends" /> <Code>extends</Code> — between classes.</LI>
      </UL>

      <H2>SQL: a different diagram type</H2>
      <P>
        SQL produces an entity-relationship diagram, not a call graph: tables are
        nodes (with columns and PK/FK keys) and foreign keys are <Code>references</Code>
        edges with cardinality. More in <Code>Reading the diagram</Code>.
      </P>

      <H2>Safety &amp; performance</H2>
      <UL>
        <LI>Parsing each file is time-capped so a pathological input can&apos;t block the server.</LI>
        <LI>There are 2 MB and 400-file limits per analysis (see <Code>API reference</Code>).</LI>
      </UL>

      <H2>Known limitations</H2>
      <P>Resolution is <strong>name-based</strong>, not type- or scope-aware. That means:</P>
      <UL>
        <LI>Two functions (or methods of different classes) with the same name merge into one node.</LI>
        <LI>Dynamic dispatch, <Code>eval</Code>, reflection and indirectly-invoked callbacks are not followed.</LI>
        <LI>Calls to external libraries are skipped (only definitions in your code are linked).</LI>
        <LI>In Go, package-based imports are not mapped to files.</LI>
        <LI>For now you upload a folder (no <Code>.zip</Code> files yet).</LI>
      </UL>

      <Callout kind="warn">
        Treat the graph as a high-signal map, not exact truth: name-based static
        analysis is right for most common cases but can approximate on very dynamic
        code.
      </Callout>
    </>
  );
}
