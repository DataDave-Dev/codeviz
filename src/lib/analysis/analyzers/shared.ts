// Lógica común para construir un call graph desde Tree-sitter.
// Cada lenguaje sólo aporta: el grammar WASM y dos queries (defs y calls).

import type Parser from "web-tree-sitter";
import { getParser } from "../treesitter";
import type { Graph, GraphEdge } from "../types";

type Node = Parser.SyntaxNode;

/** Nodo sintético que agrupa las llamadas a nivel de módulo (entry points). */
const MODULE_NODE = "(module)";

export type LangSpec = {
  language: string;
  wasm: string;
  /** Query que captura como @def cada definición de función/método. */
  funcDefQuery: string;
  /** Query que captura como @callee el identificador de cada llamada. */
  callQuery: string;
  /** Tipos de nodo que cuentan como "una función" al buscar el llamador. */
  funcDefTypes: ReadonlySet<string>;
};

/**
 * Resuelve el nombre de una definición de función.
 * - Caso directo: el nodo tiene campo `name` (def normal, método).
 * - Caso JS: `const foo = () => {}` → el nombre vive en el variable_declarator.
 * Devuelve null para funciones anónimas (callbacks sin nombre).
 */
function resolveName(node: Node): string | null {
  const direct = node.childForFieldName("name");
  if (direct) return direct.text;

  const parent = node.parent;
  if (parent && parent.type === "variable_declarator") {
    const name = parent.childForFieldName("name");
    if (name) return name.text;
  }
  return null;
}

/** Sube por el árbol hasta la primera función con nombre que contenga al nodo. */
function enclosingFunctionName(
  node: Node,
  funcDefTypes: ReadonlySet<string>,
): string {
  let current: Node | null = node.parent;
  while (current) {
    if (funcDefTypes.has(current.type)) {
      const name = resolveName(current);
      if (name) return name;
    }
    current = current.parent;
  }
  return MODULE_NODE;
}

export async function analyzeWith(
  spec: LangSpec,
  code: string,
): Promise<Graph> {
  const { parser, language } = await getParser(spec.wasm);
  const tree = parser.parse(code);
  const root = tree.rootNode;

  // 1. Funciones definidas en el snippet → conjunto de nodos internos.
  const defined = new Set<string>();
  const defQuery = language.query(spec.funcDefQuery);
  for (const { node } of defQuery.captures(root)) {
    const name = resolveName(node);
    if (name) defined.add(name);
  }

  // 2. Llamadas a funciones internas → aristas llamador → llamado.
  //    Se ignoran llamadas a builtins/librerías (no están en `defined`).
  const edgeKeys = new Set<string>();
  const edges: GraphEdge[] = [];
  const callQuery = language.query(spec.callQuery);
  for (const { node } of callQuery.captures(root)) {
    const callee = node.text;
    if (!defined.has(callee)) continue;
    const caller = enclosingFunctionName(node, spec.funcDefTypes);
    const key = `${caller} ${callee}`;
    if (edgeKeys.has(key)) continue;
    edgeKeys.add(key);
    edges.push({ source: caller, target: callee });
  }

  // 3. Nodos: las funciones definidas + "(module)" si originó alguna llamada.
  const ids = new Set(defined);
  if (edges.some((e) => e.source === MODULE_NODE)) ids.add(MODULE_NODE);
  const nodes = [...ids].map((id) => ({ id, label: id }));

  tree.delete();
  return { nodes, edges };
}
