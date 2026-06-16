import type { Locale } from "@/i18n/config";
import { H1, Lead, H2, H3, P, UL, LI, Code, Callout } from "../Prose";

export default function GettingStarted({ lang }: { lang: Locale }) {
  if (lang === "es") {
    return (
      <>
        <H1>Empezar</H1>
        <Lead>
          Hay dos formas de generar un grafo: pegar un fragmento suelto, o subir
          una carpeta para mapear todo un proyecto.
        </Lead>

        <H2>Modo Snippet</H2>
        <P>Ideal para un archivo o un ejemplo rápido.</P>
        <UL>
          <LI>Abre la app y deja la pestaña <Code>Snippet</Code> activa.</LI>
          <LI>Elige el lenguaje en el selector inferior.</LI>
          <LI>Pega tu código en el editor.</LI>
          <LI>Pulsa <Code>Analizar</Code> (o <Code>⌘/Ctrl + Enter</Code>).</LI>
        </UL>
        <P>El grafo aparece en el panel derecho. Cambiar de lenguaje carga un ejemplo nuevo solo si no has tocado el editor.</P>

        <H2>Modo Proyecto</H2>
        <P>Para ver la arquitectura de varios archivos a la vez.</P>
        <UL>
          <LI>Cambia a la pestaña <Code>Proyecto</Code>.</LI>
          <LI>Pulsa <Code>Subir una carpeta</Code> y elige el directorio.</LI>
          <LI>Weftmap filtra por extensión del lenguaje e ignora <Code>node_modules</Code>, <Code>.git</Code> y similares.</LI>
          <LI>Revisa la lista de archivos y pulsa <Code>Analizar</Code>.</LI>
        </UL>
        <Callout kind="note">
          Todo ocurre en tu navegador y servidor; los archivos no se guardan. Hay
          un límite de tamaño y de número de archivos para mantenerlo ágil.
        </Callout>

        <H2>Explorar el diagrama</H2>
        <UL>
          <LI><strong>Mover y zoom:</strong> arrastra el lienzo, rueda para acercar.</LI>
          <LI><strong>Encuadrar:</strong> usa los controles para reajustar la vista.</LI>
          <LI><strong>Filtrar:</strong> en la leyenda, oculta o muestra <Code>calls</Code>, <Code>imports</Code> y <Code>extends</Code>.</LI>
        </UL>

        <H3>¿No aparece nada?</H3>
        <UL>
          <LI>Verifica que el lenguaje seleccionado coincide con el código.</LI>
          <LI>Solo se dibujan funciones definidas en el código; las llamadas a librerías se omiten.</LI>
        </UL>
      </>
    );
  }

  return (
    <>
      <H1>Getting started</H1>
      <Lead>
        There are two ways to build a graph: paste a single snippet, or upload a
        folder to map a whole project.
      </Lead>

      <H2>Snippet mode</H2>
      <P>Great for one file or a quick example.</P>
      <UL>
        <LI>Open the app and keep the <Code>Snippet</Code> tab active.</LI>
        <LI>Pick the language in the bottom selector.</LI>
        <LI>Paste your code into the editor.</LI>
        <LI>Hit <Code>Analyze</Code> (or <Code>⌘/Ctrl + Enter</Code>).</LI>
      </UL>
      <P>The graph appears in the right panel. Switching language loads a fresh sample only if you haven&apos;t edited the editor.</P>

      <H2>Project mode</H2>
      <P>To see the architecture across many files at once.</P>
      <UL>
        <LI>Switch to the <Code>Project</Code> tab.</LI>
        <LI>Click <Code>Upload a folder</Code> and pick the directory.</LI>
        <LI>Weftmap filters by the language&apos;s extensions and ignores <Code>node_modules</Code>, <Code>.git</Code> and the like.</LI>
        <LI>Review the file list and hit <Code>Analyze</Code>.</LI>
      </UL>
      <Callout kind="note">
        Everything runs in your browser and server; files are not stored. There is
        a size and file-count limit to keep things fast.
      </Callout>

      <H2>Explore the diagram</H2>
      <UL>
        <LI><strong>Pan &amp; zoom:</strong> drag the canvas, scroll to zoom.</LI>
        <LI><strong>Fit:</strong> use the controls to reset the view.</LI>
        <LI><strong>Filter:</strong> in the legend, toggle <Code>calls</Code>, <Code>imports</Code> and <Code>extends</Code>.</LI>
      </UL>

      <H3>Nothing shows up?</H3>
      <UL>
        <LI>Make sure the selected language matches the code.</LI>
        <LI>Only functions defined in the code are drawn; calls to libraries are skipped.</LI>
      </UL>
    </>
  );
}
