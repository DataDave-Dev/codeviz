import type { LanguageAnalyzer } from "../types";
import { analyzeProjectWith } from "./shared";
import { makeJsLikeSpec } from "./jslike";

// Uses the dedicated TypeScript grammar so type annotations parse cleanly.
const spec = makeJsLikeSpec("typescript", "tree-sitter-typescript.wasm");

export const typescriptAnalyzer: LanguageAnalyzer = {
  language: spec.language,
  analyzeProject: (files) => analyzeProjectWith(spec, files),
};
