import type { Locale } from "@/i18n/config";
import { H1, Lead, H2, P, UL, LI, Code, CodeBlock, Callout } from "../Prose";

export default function ApiReference({ lang }: { lang: Locale }) {
  if (lang === "es") {
    return (
      <>
        <H1>Referencia de la API</H1>
        <Lead>
          El análisis vive en un único endpoint. Puedes llamarlo directamente para
          integrarlo en tus propias herramientas.
        </Lead>

        <H2>POST /api/analyze</H2>
        <P>Envía código y recibe un grafo <Code>{`{ nodes, edges }`}</Code>. Acepta un snippet o varios archivos.</P>

        <CodeBlock label="Request — snippet">{`POST /api/analyze
Content-Type: application/json

{
  "language": "python",
  "code": "def main():\\n    helper()\\n\\ndef helper():\\n    pass"
}`}</CodeBlock>

        <CodeBlock label="Request — proyecto (varios archivos)">{`{
  "language": "python",
  "files": [
    { "path": "main.py", "content": "from util import work\\n..." },
    { "path": "util.py", "content": "def work(): ..." }
  ]
}`}</CodeBlock>

        <CodeBlock label="Response 200">{`{
  "nodes": [
    { "id": "main.py::main", "label": "main", "type": "function", "parent": "mod::main.py" }
  ],
  "edges": [
    { "source": "main.py::main", "target": "util.py::work", "kind": "calls" }
  ]
}`}</CodeBlock>

        <H2>Campos</H2>
        <UL>
          <LI><Code>language</Code> — uno de los lenguajes soportados (<Code>python</Code>, <Code>javascript</Code>, <Code>typescript</Code>, <Code>go</Code>, <Code>rust</Code>, <Code>sql</Code>).</LI>
          <LI><Code>code</Code> — el fragmento a analizar (modo snippet).</LI>
          <LI><Code>files</Code> — arreglo de <Code>{`{ path, content }`}</Code> (modo proyecto). Si está presente, tiene prioridad sobre <Code>code</Code>.</LI>
        </UL>

        <H2>Límites</H2>
        <UL>
          <LI>Hasta <strong>2 MB</strong> de contenido total por petición.</LI>
          <LI>Hasta <strong>400 archivos</strong> en modo proyecto.</LI>
        </UL>

        <H2>Errores</H2>
        <UL>
          <LI><Code>400</Code> — JSON inválido o lenguaje no soportado.</LI>
          <LI><Code>413</Code> — se superó el límite de tamaño o de archivos.</LI>
        </UL>

        <Callout kind="warn">
          El código se envía al servidor para parsearlo con Tree-sitter y se descarta
          tras responder. No se almacena nada.
        </Callout>
      </>
    );
  }

  return (
    <>
      <H1>API reference</H1>
      <Lead>
        Analysis lives behind a single endpoint. You can call it directly to integrate
        Weftmap into your own tooling.
      </Lead>

      <H2>POST /api/analyze</H2>
      <P>Send code and receive a <Code>{`{ nodes, edges }`}</Code> graph. Accepts a snippet or multiple files.</P>

      <CodeBlock label="Request — snippet">{`POST /api/analyze
Content-Type: application/json

{
  "language": "python",
  "code": "def main():\\n    helper()\\n\\ndef helper():\\n    pass"
}`}</CodeBlock>

      <CodeBlock label="Request — project (multiple files)">{`{
  "language": "python",
  "files": [
    { "path": "main.py", "content": "from util import work\\n..." },
    { "path": "util.py", "content": "def work(): ..." }
  ]
}`}</CodeBlock>

      <CodeBlock label="Response 200">{`{
  "nodes": [
    { "id": "main.py::main", "label": "main", "type": "function", "parent": "mod::main.py" }
  ],
  "edges": [
    { "source": "main.py::main", "target": "util.py::work", "kind": "calls" }
  ]
}`}</CodeBlock>

      <H2>Fields</H2>
      <UL>
        <LI><Code>language</Code> — one of the supported languages (<Code>python</Code>, <Code>javascript</Code>, <Code>typescript</Code>, <Code>go</Code>, <Code>rust</Code>, <Code>sql</Code>).</LI>
        <LI><Code>code</Code> — the snippet to analyze (snippet mode).</LI>
        <LI><Code>files</Code> — an array of <Code>{`{ path, content }`}</Code> (project mode). When present, it takes precedence over <Code>code</Code>.</LI>
      </UL>

      <H2>Limits</H2>
      <UL>
        <LI>Up to <strong>2 MB</strong> of total content per request.</LI>
        <LI>Up to <strong>400 files</strong> in project mode.</LI>
      </UL>

      <H2>Errors</H2>
      <UL>
        <LI><Code>400</Code> — invalid JSON or unsupported language.</LI>
        <LI><Code>413</Code> — size or file-count limit exceeded.</LI>
      </UL>

      <Callout kind="warn">
        Code is sent to the server to be parsed with Tree-sitter and discarded after
        the response. Nothing is stored.
      </Callout>
    </>
  );
}
