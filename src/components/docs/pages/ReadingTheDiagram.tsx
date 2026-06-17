import type { Locale } from "@/i18n/config";
import { H1, Lead, H2, P, UL, LI, Code, EdgeDot, Callout } from "../Prose";

export default function ReadingTheDiagram({ lang }: { lang: Locale }) {
  if (lang === "es") {
    return (
      <>
        <H1>Leer el diagrama</H1>
        <Lead>
          Weftmap dibuja dos tipos de diagrama: un <strong>call graph</strong>{" "}
          para lenguajes de programación y un diagrama{" "}
          <strong>entidad-relación</strong> para SQL. Esta página explica cómo
          interpretar nodos, aristas y controles.
        </Lead>

        <H2>Nodos</H2>
        <UL>
          <LI>
            <strong>Módulo</strong> — cada archivo, dibujado como un contenedor
            que agrupa sus funciones.
          </LI>
          <LI>
            <strong>Función / método</strong> — una definición dentro de un
            módulo o clase.
          </LI>
          <LI>
            <strong>Clase</strong> — agrupa sus métodos (en lenguajes con
            clases).
          </LI>
          <LI>
            <strong>Tabla</strong> — en SQL, una entidad con su lista de
            columnas, tipos y claves PK/FK.
          </LI>
        </UL>

        <H2>Aristas</H2>
        <UL>
          <LI>
            <EdgeDot kind="calls" />
            <Code>calls</Code> — una función llama a otra (línea animada).
          </LI>
          <LI>
            <EdgeDot kind="imports" />
            <Code>imports</Code> — un módulo importa otro.
          </LI>
          <LI>
            <EdgeDot kind="extends" />
            <Code>extends</Code> — una clase hereda de otra.
          </LI>
          <LI>
            <strong>references</strong> — en SQL, una foreign key apunta a otra
            tabla.
          </LI>
        </UL>

        <H2>Cardinalidad (SQL)</H2>
        <P>Las aristas de foreign key muestran su cardinalidad:</P>
        <UL>
          <LI>
            <Code>1:N</Code> — una fila referencia muchas (FK normal).
          </LI>
          <LI>
            <Code>1:1</Code> — la columna FK es única o es la PK completa.
          </LI>
          <LI>
            <Code>N:M</Code> — inferida desde una tabla puente (PK compuesta de
            dos FKs).
          </LI>
        </UL>

        <H2>Leyenda y controles</H2>
        <UL>
          <LI>
            <strong>Leyenda:</strong> arriba a la izquierda; haz clic en un tipo
            de arista para ocultarlo o mostrarlo.
          </LI>
          <LI>
            <strong>Mover y zoom:</strong> arrastra el lienzo, usa la rueda para
            acercar.
          </LI>
          <LI>
            <strong>Encuadrar:</strong> los controles inferiores reajustan la
            vista.
          </LI>
        </UL>

        <Callout kind="note">
          Solo se dibujan las definiciones de tu código. Las llamadas a builtins
          o librerías externas se omiten para mantener el grafo legible.
        </Callout>
      </>
    );
  }

  return (
    <>
      <H1>Reading the diagram</H1>
      <Lead>
        Weftmap draws two diagram types: a <strong>call graph</strong> for
        programming languages and an <strong>entity-relationship</strong>{" "}
        diagram for SQL. This page explains how to read the nodes, edges and
        controls.
      </Lead>

      <H2>Nodes</H2>
      <UL>
        <LI>
          <strong>Module</strong> — each file, drawn as a container that groups
          its functions.
        </LI>
        <LI>
          <strong>Function / method</strong> — a definition inside a module or
          class.
        </LI>
        <LI>
          <strong>Class</strong> — groups its methods (in languages with
          classes).
        </LI>
        <LI>
          <strong>Table</strong> — in SQL, an entity with its columns, types and
          PK/FK keys.
        </LI>
      </UL>

      <H2>Edges</H2>
      <UL>
        <LI>
          <EdgeDot kind="calls" />
          <Code>calls</Code> — one function calls another (animated line).
        </LI>
        <LI>
          <EdgeDot kind="imports" />
          <Code>imports</Code> — one module imports another.
        </LI>
        <LI>
          <EdgeDot kind="extends" />
          <Code>extends</Code> — one class inherits from another.
        </LI>
        <LI>
          <strong>references</strong> — in SQL, a foreign key points to another
          table.
        </LI>
      </UL>

      <H2>Cardinality (SQL)</H2>
      <P>Foreign-key edges show their cardinality:</P>
      <UL>
        <LI>
          <Code>1:N</Code> — one row references many (a normal FK).
        </LI>
        <LI>
          <Code>1:1</Code> — the FK column is unique or is the full primary key.
        </LI>
        <LI>
          <Code>N:M</Code> — inferred from a junction table (composite PK of two
          FKs).
        </LI>
      </UL>

      <H2>Legend and controls</H2>
      <UL>
        <LI>
          <strong>Legend:</strong> top-left; click an edge type to hide or show
          it.
        </LI>
        <LI>
          <strong>Pan &amp; zoom:</strong> drag the canvas, scroll to zoom.
        </LI>
        <LI>
          <strong>Fit:</strong> the bottom controls reset the view.
        </LI>
      </UL>

      <Callout kind="note">
        Only definitions from your code are drawn. Calls to builtins or external
        libraries are skipped to keep the graph readable.
      </Callout>
    </>
  );
}
