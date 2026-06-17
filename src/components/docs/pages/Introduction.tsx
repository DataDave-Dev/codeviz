import type { Locale } from "@/i18n/config";
import { H1, Lead, H2, P, UL, LI, Code, EdgeDot, Callout } from "../Prose";

export default function Introduction({ lang }: { lang: Locale }) {
  if (lang === "es") {
    return (
      <>
        <H1>Introducción</H1>
        <Lead>
          Weftmap convierte tu código en un grafo de llamadas interactivo. Pega un
          fragmento o sube un proyecto y visualiza cómo se relacionan funciones,
          clases y módulos.
        </Lead>

        <H2>¿Qué es Weftmap?</H2>
        <P>
          Weftmap lee tu código con <Code>tree-sitter</Code> y dibuja un mapa
          navegable: quién llama a quién, qué archivo importa a cuál y qué clase
          hereda de otra. No ejecuta el código — solo lo analiza estáticamente.
        </P>

        <H2>Qué muestra el grafo</H2>
        <P>Los <strong>nodos</strong> son las piezas de tu código:</P>
        <UL>
          <LI><strong>Módulos</strong> — cada archivo, dibujado como contenedor.</LI>
          <LI><strong>Funciones y métodos</strong> — dentro de su módulo o clase.</LI>
          <LI><strong>Clases</strong> — agrupan sus métodos.</LI>
        </UL>
        <P>Las <strong>aristas</strong> son las relaciones:</P>
        <UL>
          <LI><EdgeDot kind="calls" /> <strong>calls</strong> — una función llama a otra.</LI>
          <LI><EdgeDot kind="imports" /> <strong>imports</strong> — un módulo importa a otro.</LI>
          <LI><EdgeDot kind="extends" /> <strong>extends</strong> — una clase hereda de otra.</LI>
        </UL>

        <H2>Cómo leerlo</H2>
        <UL>
          <LI>Arrastra para moverte por el lienzo y usa la rueda para hacer zoom.</LI>
          <LI>La leyenda (arriba a la izquierda) filtra cada tipo de arista con un clic.</LI>
          <LI>Los recuadros agrupan: los módulos contienen clases y funciones; las clases contienen sus métodos.</LI>
        </UL>

        <H2>Cuándo usarlo</H2>
        <UL>
          <LI>Entrar a un código nuevo y entender su estructura antes de leerlo línea por línea.</LI>
          <LI>Revisar un PR viendo cómo se conecta una función con el resto.</LI>
          <LI>Enseñar o documentar convirtiendo código en un diagrama.</LI>
        </UL>

        <H2>Qué no hace</H2>
        <UL>
          <LI>No ejecuta tu código ni hace análisis dinámico.</LI>
          <LI>No resuelve llamadas dinámicas o por reflexión, ni dibuja llamadas a librerías externas.</LI>
          <LI>No es un linter ni un type-checker: solo mapea la estructura.</LI>
        </UL>

        <Callout>
          ¿Listo para probar? Continúa con <strong>Empezar</strong>.
        </Callout>
      </>
    );
  }

  return (
    <>
      <H1>Introduction</H1>
      <Lead>
        Weftmap turns your code into an interactive call graph. Paste a snippet or
        upload a project and see how functions, classes and modules relate.
      </Lead>

      <H2>What is Weftmap?</H2>
      <P>
        Weftmap reads your code with <Code>tree-sitter</Code> and draws a navigable
        map: who calls whom, which file imports which, and which class extends
        another. It never runs your code — it analyzes it statically.
      </P>

      <H2>What the graph shows</H2>
      <P>The <strong>nodes</strong> are the pieces of your code:</P>
      <UL>
        <LI><strong>Modules</strong> — each file, drawn as a container.</LI>
        <LI><strong>Functions and methods</strong> — inside their module or class.</LI>
        <LI><strong>Classes</strong> — group their methods.</LI>
      </UL>
      <P>The <strong>edges</strong> are the relationships:</P>
      <UL>
        <LI><EdgeDot kind="calls" /> <strong>calls</strong> — one function calls another.</LI>
        <LI><EdgeDot kind="imports" /> <strong>imports</strong> — one module imports another.</LI>
        <LI><EdgeDot kind="extends" /> <strong>extends</strong> — one class extends another.</LI>
      </UL>

      <H2>How to read it</H2>
      <UL>
        <LI>Drag to pan the canvas and scroll to zoom.</LI>
        <LI>The legend (top-left) toggles each edge type with a click.</LI>
        <LI>Boxes group things: modules contain classes and functions; classes contain their methods.</LI>
      </UL>

      <H2>When to use it</H2>
      <UL>
        <LI>Onboarding to a new codebase and grasping its structure before reading line by line.</LI>
        <LI>Reviewing a PR by seeing how a function connects to the rest.</LI>
        <LI>Teaching or documenting by turning code into a diagram.</LI>
      </UL>

      <H2>What it doesn&apos;t do</H2>
      <UL>
        <LI>It never runs your code or does dynamic analysis.</LI>
        <LI>It doesn&apos;t resolve dynamic/reflection calls, nor draw calls to external libraries.</LI>
        <LI>It&apos;s not a linter or type-checker — it only maps structure.</LI>
      </UL>

      <Callout>
        Ready to try it? Continue with <strong>Getting started</strong>.
      </Callout>
    </>
  );
}
