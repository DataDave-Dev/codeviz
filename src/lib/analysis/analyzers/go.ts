import type { LanguageAnalyzer } from "../types";
import { analyzeProjectWith, type LangSpec } from "./shared";

// Go has no classes. Imports are package-path based (not file based), so module
// import edges are skipped; cross-file calls within a package still resolve via
// the analyzer's unique-definition fallback.
const spec: LangSpec = {
  language: "go",
  wasm: "tree-sitter-go.wasm",
  funcDefQuery: "[(function_declaration) (method_declaration)] @def",
  callQuery: `
    (call_expression function: (identifier) @callee)
    (call_expression function: (selector_expression field: (field_identifier) @callee))
  `,
  importQuery: "(import_spec path: (interpreted_string_literal) @mod)",
  funcDefTypes: new Set(["function_declaration", "method_declaration"]),
  resolveModule: () => null,
};

export const goAnalyzer: LanguageAnalyzer = {
  language: spec.language,
  analyzeProject: (files) => analyzeProjectWith(spec, files),
};
