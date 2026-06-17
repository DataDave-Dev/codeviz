export type NodeKind = "module" | "function" | "class" | "table";

/** A single column of a table entity (SQL / ER diagrams). */
export type TableColumn = {
  name: string;
  /** Declared SQL type, normalized to lowercase (e.g. "integer", "varchar(255)"). */
  type: string;
  pk: boolean;
  /** True when the column is a foreign key referencing another table. */
  fk: boolean;
  nullable: boolean;
  unique: boolean;
};

export type GraphNode = {
  id: string;
  label: string;
  type: NodeKind;
  /** Source file this node belongs to (undefined for synthetic roots). */
  file?: string;
  /** Id of the containing module node, for grouping in the diagram. */
  parent?: string;
  /** Columns for `table` nodes (ER diagrams). */
  columns?: TableColumn[];
};

export type EdgeKind = "calls" | "imports" | "extends" | "references";

/** Relationship cardinality for ER foreign-key edges. */
export type Cardinality = "1:1" | "1:N" | "N:M";

export type GraphEdge = {
  source: string;
  target: string;
  kind: EdgeKind;
  /** Source column name for `references` (FK) edges. */
  column?: string;
  /** Cardinality for `references` edges. */
  cardinality?: Cardinality;
};

export type Graph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

/** One source file in a project analysis request. */
export type SourceFile = {
  path: string;
  content: string;
};

export interface LanguageAnalyzer {
  language: string;
  analyzeProject(files: SourceFile[]): Promise<Graph>;
}
