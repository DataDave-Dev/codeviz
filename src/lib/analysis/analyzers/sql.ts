import type Parser from "web-tree-sitter";
import { getParser } from "../treesitter";
import type {
  Cardinality,
  Graph,
  GraphEdge,
  GraphNode,
  LanguageAnalyzer,
  SourceFile,
  TableColumn,
} from "../types";

type Node = Parser.SyntaxNode;

// Cap parsing of a single file so a pathological input can't block the event loop.
const MAX_PARSE_MICROS = 5_000_000; // 5s

const WASM = "tree-sitter-sql.wasm";
const tableId = (key: string) => `table::${key}`;
// SQL identifiers are case-insensitive and may be double-quoted; normalize for matching.
const norm = (raw: string) => raw.replace(/^"(.*)"$/, "$1").toLowerCase();

type Fk = {
  fromTable: string; // normalized key
  fromCols: string[];
  toTable: string;
  toCols: string[];
};

type Table = {
  key: string;
  label: string;
  columns: Map<string, TableColumn>;
  order: string[];
  pk: Set<string>;
};

/** Last `identifier` under an `object_reference` (handles schema-qualified names). */
function refName(node: Node | null): string | null {
  if (!node) return null;
  const named = node.childForFieldName("name");
  if (named) return named.text;
  // Fallback: last identifier child.
  for (let i = node.namedChildCount - 1; i >= 0; i--) {
    const c = node.namedChild(i)!;
    if (c.type === "identifier") return c.text;
  }
  return null;
}

function childOfType(node: Node, type: string): Node | null {
  for (let i = 0; i < node.namedChildCount; i++) {
    const c = node.namedChild(i)!;
    if (c.type === type) return c;
  }
  return null;
}

function hasChildType(node: Node, type: string): boolean {
  for (let i = 0; i < node.childCount; i++) {
    if (node.child(i)!.type === type) return true;
  }
  return false;
}

/** Column names inside an `ordered_columns` node. */
function orderedColumns(node: Node | null): string[] {
  if (!node) return [];
  const cols: string[] = [];
  for (let i = 0; i < node.namedChildCount; i++) {
    const col = node.namedChild(i)!;
    if (col.type !== "column") continue;
    const name = col.childForFieldName("name");
    if (name) cols.push(norm(name.text));
  }
  return cols;
}

function normalizeType(typeNode: Node | null): string {
  if (!typeNode) return "";
  return typeNode.text.replace(/\s+/g, " ").trim().toLowerCase();
}

/** Parse a table-level or ALTER `constraint` node. Returns an FK or updates PKs. */
function readConstraint(
  node: Node,
  table: Table,
  fks: Fk[],
): void {
  const isPk = hasChildType(node, "keyword_primary");
  const isFk = hasChildType(node, "keyword_foreign");
  const cols = orderedColumns(childOfType(node, "ordered_columns"));

  if (isPk) {
    for (const c of cols) table.pk.add(c);
    return;
  }
  if (isFk) {
    const toTable = refName(childOfType(node, "object_reference"));
    if (!toTable) return;
    // Target columns: the trailing identifier(s) after the object_reference.
    const toCols: string[] = [];
    const ref = childOfType(node, "object_reference");
    for (let i = 0; i < node.namedChildCount; i++) {
      const c = node.namedChild(i)!;
      if (ref && c.startIndex > ref.startIndex && c.type === "identifier") {
        toCols.push(norm(c.text));
      }
    }
    fks.push({ fromTable: table.key, fromCols: cols, toTable: norm(toTable), toCols });
  }
}

function readColumn(node: Node, table: Table, fks: Fk[]): void {
  const nameNode = node.childForFieldName("name");
  if (!nameNode) return;
  const name = norm(nameNode.text);
  const pk = hasChildType(node, "keyword_primary");
  const notNull = hasChildType(node, "keyword_not") && hasChildType(node, "keyword_null");
  const unique = hasChildType(node, "keyword_unique");
  const isFk = hasChildType(node, "keyword_references");

  const col: TableColumn = {
    name: nameNode.text.replace(/^"(.*)"$/, "$1"),
    type: normalizeType(node.childForFieldName("type")),
    pk,
    fk: isFk,
    nullable: !notNull && !pk,
    unique,
  };
  table.columns.set(name, col);
  table.order.push(name);
  if (pk) table.pk.add(name);

  if (isFk) {
    const toTable = refName(childOfType(node, "object_reference"));
    if (!toTable) return;
    const ref = childOfType(node, "object_reference");
    const toCols: string[] = [];
    for (let i = 0; i < node.namedChildCount; i++) {
      const c = node.namedChild(i)!;
      if (ref && c.startIndex > ref.startIndex && c.type === "identifier") {
        toCols.push(norm(c.text));
      }
    }
    fks.push({ fromTable: table.key, fromCols: [name], toTable: norm(toTable), toCols });
  }
}

function readCreateTable(node: Node, tables: Map<string, Table>, fks: Fk[]): void {
  const rawName = refName(childOfType(node, "object_reference"));
  if (!rawName) return;
  const key = norm(rawName);
  const table: Table =
    tables.get(key) ??
    { key, label: rawName.replace(/^"(.*)"$/, "$1"), columns: new Map(), order: [], pk: new Set() };
  tables.set(key, table);

  const defs = childOfType(node, "column_definitions");
  if (!defs) return;
  for (let i = 0; i < defs.namedChildCount; i++) {
    const child = defs.namedChild(i)!;
    if (child.type === "column_definition") readColumn(child, table, fks);
    else if (child.type === "constraints") {
      for (let j = 0; j < child.namedChildCount; j++) {
        const con = child.namedChild(j)!;
        if (con.type === "constraint") readConstraint(con, table, fks);
      }
    } else if (child.type === "constraint") {
      readConstraint(child, table, fks);
    }
  }
}

function readAlterTable(node: Node, tables: Map<string, Table>, fks: Fk[]): void {
  const rawName = refName(childOfType(node, "object_reference"));
  if (!rawName) return;
  const key = norm(rawName);
  const table = tables.get(key);
  if (!table) return; // ALTER on an unknown table: skip.
  const add = childOfType(node, "add_constraint");
  if (!add) return;
  const con = childOfType(add, "constraint");
  if (con) readConstraint(con, table, fks);
}

/** Mark UNIQUE single-column indexes onto their columns. */
function readCreateIndex(node: Node, tables: Map<string, Table>): void {
  if (!hasChildType(node, "keyword_unique")) return;
  const rawName = refName(childOfType(node, "object_reference"));
  if (!rawName) return;
  const table = tables.get(norm(rawName));
  if (!table) return;
  const fields = childOfType(node, "index_fields");
  if (!fields) return;
  const cols: string[] = [];
  for (let i = 0; i < fields.namedChildCount; i++) {
    const field = fields.namedChild(i)!;
    const col = field.childForFieldName("column");
    if (col) cols.push(norm(col.text));
  }
  if (cols.length === 1) {
    const col = table.columns.get(cols[0]);
    if (col) col.unique = true;
  }
}

function walk(root: Node, tables: Map<string, Table>, fks: Fk[]): void {
  // Statements are top-level; recurse one level into `statement` wrappers.
  const visit = (n: Node) => {
    switch (n.type) {
      case "create_table":
        readCreateTable(n, tables, fks);
        return;
      case "alter_table":
        readAlterTable(n, tables, fks);
        return;
      case "create_index":
        readCreateIndex(n, tables);
        return;
    }
    for (let i = 0; i < n.namedChildCount; i++) visit(n.namedChild(i)!);
  };
  visit(root);
}

function cardinalityFor(fk: Fk, from: Table): Cardinality {
  // FK side is "one" when the referencing columns are unique or the full PK.
  const allUnique = fk.fromCols.every((c) => from.columns.get(c)?.unique);
  const isFullPk =
    from.pk.size > 0 &&
    from.pk.size === fk.fromCols.length &&
    fk.fromCols.every((c) => from.pk.has(c));
  return allUnique || isFullPk ? "1:1" : "1:N";
}

/** A junction/bridge table: composite PK made of exactly two FK columns. */
function isJunction(table: Table, fks: Fk[]): Fk[] | null {
  const own = fks.filter((f) => f.fromTable === table.key);
  if (own.length !== 2) return null;
  const fkCols = new Set(own.flatMap((f) => f.fromCols));
  if (table.pk.size < 2) return null;
  const pkAllFk = [...table.pk].every((c) => fkCols.has(c));
  return pkAllFk ? own : null;
}

async function analyzeProject(files: SourceFile[]): Promise<Graph> {
  const { parser } = await getParser(WASM);
  parser.setTimeoutMicros(MAX_PARSE_MICROS);

  const tables = new Map<string, Table>();
  const fks: Fk[] = [];

  for (const file of files) {
    let tree: Parser.Tree | null = null;
    try {
      tree = parser.parse(file.content);
      if (tree) walk(tree.rootNode, tables, fks);
    } finally {
      tree?.delete();
    }
  }

  // Flag FK columns (covers FKs declared via table-level/ALTER constraints).
  for (const fk of fks) {
    const t = tables.get(fk.fromTable);
    if (!t) continue;
    for (const c of fk.fromCols) {
      const col = t.columns.get(c);
      if (col) col.fk = true;
    }
  }

  const nodes: GraphNode[] = [...tables.values()].map((t) => ({
    id: tableId(t.key),
    label: t.label,
    type: "table",
    columns: t.order.map((c) => t.columns.get(c)!),
  }));

  const edges: GraphEdge[] = [];
  const seen = new Set<string>();
  const pushEdge = (e: GraphEdge) => {
    const id = `${e.source}->${e.target}:${e.kind}:${e.column ?? ""}`;
    if (seen.has(id)) return;
    seen.add(id);
    edges.push(e);
  };

  for (const fk of fks) {
    const from = tables.get(fk.fromTable);
    if (!from || !tables.has(fk.toTable)) continue; // skip edges to unknown tables
    pushEdge({
      source: tableId(fk.fromTable),
      target: tableId(fk.toTable),
      kind: "references",
      column: fk.fromCols.join(", "),
      cardinality: cardinalityFor(fk, from),
    });
  }

  // N:M relationships inferred from junction tables.
  for (const t of tables.values()) {
    const pair = isJunction(t, fks);
    if (!pair) continue;
    const [a, b] = pair;
    if (!tables.has(a.toTable) || !tables.has(b.toTable)) continue;
    pushEdge({
      source: tableId(a.toTable),
      target: tableId(b.toTable),
      kind: "references",
      column: t.label,
      cardinality: "N:M",
    });
  }

  return { nodes, edges };
}

export const sqlAnalyzer: LanguageAnalyzer = {
  language: "sql",
  analyzeProject,
};
