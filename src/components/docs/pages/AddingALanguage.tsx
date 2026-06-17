import type { Locale } from "@/i18n/config";
import { H1, Lead, H2, P, UL, LI, Code, CodeBlock, Callout } from "../Prose";

export default function AddingALanguage({ lang }: { lang: Locale }) {
  if (lang === "es") {
    return (
      <>
        <H1>Agregar un lenguaje</H1>
        <Lead>
          La arquitectura es pluggable: un lenguaje es una gramática de
          Tree-sitter más un puñado de consultas. Agregar uno son unos pocos
          pasos.
        </Lead>

        <H2>1. Agrega la gramática</H2>
        <P>
          Copia <Code>tree-sitter-&lt;lang&gt;.wasm</Code> a{" "}
          <Code>public/wasm/</Code>. Muchas vienen en el paquete{" "}
          <Code>tree-sitter-wasms</Code>; si no, se compila desde la gramática
          con la CLI de Tree-sitter.
        </P>

        <H2>2. Crea el analyzer</H2>
        <P>
          Añade <Code>src/lib/analysis/analyzers/&lt;lang&gt;.ts</Code> con un{" "}
          <Code>LangSpec</Code>: dos consultas (definiciones de funciones y
          llamadas) más los tipos de nodo que cuentan como función.
        </P>
        <CodeBlock label="src/lib/analysis/analyzers/go.ts">{`const spec: LangSpec = {
  language: "go",
  wasm: "tree-sitter-go.wasm",
  funcDefQuery: "[(function_declaration) (method_declaration)] @def",
  callQuery: \`
    (call_expression function: (identifier) @callee)
    (call_expression function: (selector_expression field: (field_identifier) @callee))
  \`,
  importQuery: "(import_spec path: (interpreted_string_literal) @mod)",
  funcDefTypes: new Set(["function_declaration", "method_declaration"]),
  resolveModule: () => null,
};

export const goAnalyzer: LanguageAnalyzer = {
  language: spec.language,
  analyzeProject: (files) => analyzeProjectWith(spec, files),
};`}</CodeBlock>
        <P>
          Para lenguajes con clases, añade <Code>classQuery</Code>,{" "}
          <Code>classNodeTypes</Code> y<Code>classBases</Code>. Para un tipo de
          diagrama distinto (como SQL → ER), implementa
          <Code>LanguageAnalyzer</Code> directamente en vez de usar{" "}
          <Code>analyzeProjectWith</Code>.
        </P>

        <H2>3. Regístralo</H2>
        <P>
          Agrega una línea en <Code>src/lib/analysis/registry.ts</Code>.
        </P>

        <H2>4. Cablea la UI</H2>
        <UL>
          <LI>
            <Code>EXT</Code> y <Code>PROJECT_EXTS</Code> en{" "}
            <Code>route.ts</Code> y <Code>CodeWorkspace.tsx</Code>{" "}
            (extensiones).
          </LI>
          <LI>
            El selector de lenguaje y un sample en{" "}
            <Code>CodeWorkspace.tsx</Code>.
          </LI>
        </UL>

        <H2>5. Agrega un test</H2>
        <P>
          Un snippet → verificación de nodos/aristas en{" "}
          <Code>analyzers.test.ts</Code>.
        </P>

        <Callout kind="note">
          Mira <Code>go.ts</Code> y <Code>rust.ts</Code> (sin clases) o{" "}
          <Code>python.ts</Code> (con clases) como plantilla, y revisa{" "}
          <Code>CONTRIBUTING.md</Code>. ¡Los PRs de nuevos lenguajes son muy
          bienvenidos!
        </Callout>
      </>
    );
  }

  return (
    <>
      <H1>Adding a language</H1>
      <Lead>
        The architecture is pluggable: a language is a Tree-sitter grammar plus
        a handful of queries. Adding one is a few steps.
      </Lead>

      <H2>1. Add the grammar</H2>
      <P>
        Copy <Code>tree-sitter-&lt;lang&gt;.wasm</Code> into{" "}
        <Code>public/wasm/</Code>. Many ship in the{" "}
        <Code>tree-sitter-wasms</Code> package; otherwise build it from the
        grammar with the Tree-sitter CLI.
      </P>

      <H2>2. Create the analyzer</H2>
      <P>
        Add <Code>src/lib/analysis/analyzers/&lt;lang&gt;.ts</Code> with a{" "}
        <Code>LangSpec</Code>: two queries (function definitions and calls) plus
        the node types that count as a function scope.
      </P>
      <CodeBlock label="src/lib/analysis/analyzers/go.ts">{`const spec: LangSpec = {
  language: "go",
  wasm: "tree-sitter-go.wasm",
  funcDefQuery: "[(function_declaration) (method_declaration)] @def",
  callQuery: \`
    (call_expression function: (identifier) @callee)
    (call_expression function: (selector_expression field: (field_identifier) @callee))
  \`,
  importQuery: "(import_spec path: (interpreted_string_literal) @mod)",
  funcDefTypes: new Set(["function_declaration", "method_declaration"]),
  resolveModule: () => null,
};

export const goAnalyzer: LanguageAnalyzer = {
  language: spec.language,
  analyzeProject: (files) => analyzeProjectWith(spec, files),
};`}</CodeBlock>
      <P>
        For languages with classes, add <Code>classQuery</Code>,{" "}
        <Code>classNodeTypes</Code> and
        <Code>classBases</Code>. For a different diagram type (like SQL → ER),
        implement
        <Code>LanguageAnalyzer</Code> directly instead of using{" "}
        <Code>analyzeProjectWith</Code>.
      </P>

      <H2>3. Register it</H2>
      <P>
        Add one line to <Code>src/lib/analysis/registry.ts</Code>.
      </P>

      <H2>4. Wire the UI</H2>
      <UL>
        <LI>
          <Code>EXT</Code> and <Code>PROJECT_EXTS</Code> in{" "}
          <Code>route.ts</Code> and <Code>CodeWorkspace.tsx</Code> (extensions).
        </LI>
        <LI>
          The language selector and a sample in <Code>CodeWorkspace.tsx</Code>.
        </LI>
      </UL>

      <H2>5. Add a test</H2>
      <P>
        A snippet → expected nodes/edges check in <Code>analyzers.test.ts</Code>
        .
      </P>

      <Callout kind="note">
        Use <Code>go.ts</Code> and <Code>rust.ts</Code> (class-less) or{" "}
        <Code>python.ts</Code> (with classes) as a template, and read{" "}
        <Code>CONTRIBUTING.md</Code>. New-language PRs are very welcome!
      </Callout>
    </>
  );
}
