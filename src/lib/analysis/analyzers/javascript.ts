import path from "node:path";
import type Parser from "web-tree-sitter";
import type { LanguageAnalyzer } from "../types";
import { analyzeProjectWith, type LangSpec } from "./shared";

const EXTS = [".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx"];

// Single base from `class A extends B {}` (or `extends ns.B`).
function classBases(node: Parser.SyntaxNode): string[] {
  const heritage = node.namedChildren.find((c) => c.type === "class_heritage");
  if (!heritage) return [];
  for (const child of heritage.namedChildren) {
    if (child.type === "identifier") return [child.text];
    if (child.type === "member_expression") {
      const prop = child.childForFieldName("property");
      if (prop) return [prop.text];
    }
  }
  return [];
}

// Resolve relative ES imports (`./x`, `../lib/x`). Bare specifiers = node_modules, skipped.
function resolveModule(
  fromFile: string,
  specifier: string,
  paths: Set<string>,
): string | null {
  if (!specifier.startsWith(".")) return null;
  const dir = path.posix.dirname(fromFile);
  const base = path.posix.normalize(path.posix.join(dir, specifier));

  const candidates: string[] = [];
  if (/\.[cm]?[jt]sx?$/.test(base)) candidates.push(base);
  for (const e of EXTS) candidates.push(base + e);
  for (const e of EXTS) candidates.push(path.posix.join(base, `index${e}`));

  for (const c of candidates) if (paths.has(c)) return c;
  for (const c of candidates) {
    for (const p of paths) if (p === c || p.endsWith("/" + c)) return p;
  }
  return null;
}

// Covers JS and most TS; heavy TS annotations will need tree-sitter-typescript.
const spec: LangSpec = {
  language: "javascript",
  wasm: "tree-sitter-javascript.wasm",
  funcDefQuery: `
    [
      (function_declaration)
      (generator_function_declaration)
      (function_expression)
      (arrow_function)
      (method_definition)
    ] @def
  `,
  callQuery: `
    (call_expression function: (identifier) @callee)
    (call_expression function: (member_expression property: (property_identifier) @callee))
  `,
  importQuery: `
    (import_statement source: (string) @mod)
    (export_statement source: (string) @mod)
  `,
  classQuery: "[(class_declaration) (class)] @class",
  funcDefTypes: new Set([
    "function_declaration",
    "generator_function_declaration",
    "function_expression",
    "arrow_function",
    "method_definition",
  ]),
  classNodeTypes: new Set(["class_declaration", "class"]),
  classBases,
  resolveModule,
};

export const javascriptAnalyzer: LanguageAnalyzer = {
  language: spec.language,
  analyzeProject: (files) => analyzeProjectWith(spec, files),
};
