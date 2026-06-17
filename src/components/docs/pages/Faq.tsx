import type { Locale } from "@/i18n/config";
import { H1, Lead, H2, H3, P, UL, LI, Code } from "../Prose";

export default function Faq({ lang }: { lang: Locale }) {
  if (lang === "es") {
    return (
      <>
        <H1>FAQ y solución de problemas</H1>
        <Lead>Respuestas rápidas a las dudas más comunes.</Lead>

        <H2>Preguntas frecuentes</H2>

        <H3>¿Mi código sale de mi máquina?</H3>
        <P>
          Sí: se envía al servidor para parsearlo con Tree-sitter y se descarta
          tras responder. No se guarda nada ni se ejecuta tu código — el
          análisis es estático.
        </P>

        <H3>¿Hay límite de tamaño?</H3>
        <P>Hasta 2 MB de contenido total y 400 archivos por análisis.</P>

        <H3>¿Qué lenguajes soporta?</H3>
        <P>
          Python, JavaScript, TypeScript, Go y Rust (call graph), y SQL
          (diagrama ER). Y vienen más — ver <Code>Lenguajes</Code>.
        </P>

        <H3>¿Es gratis y open source?</H3>
        <P>
          Sí, licencia MIT. Las contribuciones —sobre todo nuevos lenguajes— son
          bienvenidas.
        </P>

        <H2>Solución de problemas</H2>

        <H3>No aparece nada en el diagrama</H3>
        <UL>
          <LI>Verifica que el lenguaje seleccionado coincide con el código.</LI>
          <LI>
            Solo se dibujan funciones definidas en tu código; las llamadas a
            builtins o librerías se omiten.
          </LI>
          <LI>
            Un archivo sin funciones (solo constantes/tipos) produce un grafo
            vacío.
          </LI>
        </UL>

        <H3>«No se encontraron archivos analizables»</H3>
        <UL>
          <LI>
            En modo proyecto, la carpeta debe contener archivos con la extensión
            del lenguaje elegido.
          </LI>
          <LI>
            Se ignoran <Code>node_modules</Code>, <Code>.git</Code>,{" "}
            <Code>dist</Code> y similares.
          </LI>
        </UL>

        <H3>Faltan algunas aristas</H3>
        <UL>
          <LI>
            La resolución entre archivos usa nombres; nombres duplicados pueden
            quedar sin resolver para evitar aristas erróneas.
          </LI>
          <LI>
            En Go y Rust los imports son por paquete/módulo, así que no se
            dibujan aristas de import.
          </LI>
        </UL>
      </>
    );
  }

  return (
    <>
      <H1>FAQ &amp; troubleshooting</H1>
      <Lead>Quick answers to the most common questions.</Lead>

      <H2>Frequently asked</H2>

      <H3>Does my code leave my machine?</H3>
      <P>
        Yes: it&apos;s sent to the server to be parsed with Tree-sitter and
        discarded after the response. Nothing is stored and your code is never
        run — analysis is static.
      </P>

      <H3>Is there a size limit?</H3>
      <P>Up to 2 MB of total content and 400 files per analysis.</P>

      <H3>Which languages are supported?</H3>
      <P>
        Python, JavaScript, TypeScript, Go and Rust (call graph), and SQL (ER
        diagram). More on the way — see <Code>Languages</Code>.
      </P>

      <H3>Is it free and open source?</H3>
      <P>
        Yes, MIT-licensed. Contributions — especially new languages — are
        welcome.
      </P>

      <H2>Troubleshooting</H2>

      <H3>Nothing shows up in the diagram</H3>
      <UL>
        <LI>Make sure the selected language matches the code.</LI>
        <LI>
          Only functions defined in your code are drawn; calls to builtins or
          libraries are skipped.
        </LI>
        <LI>
          A file with no functions (just constants/types) yields an empty graph.
        </LI>
      </UL>

      <H3>&quot;No analyzable files found&quot;</H3>
      <UL>
        <LI>
          In project mode, the folder must contain files with the chosen
          language&apos;s extension.
        </LI>
        <LI>
          <Code>node_modules</Code>, <Code>.git</Code>, <Code>dist</Code> and
          the like are ignored.
        </LI>
      </UL>

      <H3>Some edges are missing</H3>
      <UL>
        <LI>
          Cross-file resolution uses names; duplicate names may stay unresolved
          to avoid wrong edges.
        </LI>
        <LI>
          In Go and Rust, imports are package/module-based, so import edges
          aren&apos;t drawn.
        </LI>
      </UL>
    </>
  );
}
