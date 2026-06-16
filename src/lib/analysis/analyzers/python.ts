import type { LanguageAnalyzer } from "../types";
import { analyzeWith, type LangSpec } from "./shared";

const spec: LangSpec = {
  language: "python",
  wasm: "tree-sitter-python.wasm",
  funcDefQuery: "(function_definition) @def",
  // Llamadas directas: foo()  y  por atributo: obj.foo()
  callQuery: `
    (call function: (identifier) @callee)
    (call function: (attribute attribute: (identifier) @callee))
  `,
  funcDefTypes: new Set(["function_definition"]),
};

export const pythonAnalyzer: LanguageAnalyzer = {
  language: spec.language,
  analyze: (code) => analyzeWith(spec, code),
};
