// Modelo de grafo normalizado: el resultado de analizar código en cualquier
// lenguaje. La UI (React Flow) consume exactamente esta forma.

export type GraphNode = {
  /** Identificador único dentro del grafo (por ahora, el nombre de la función). */
  id: string;
  /** Texto mostrado en el nodo. */
  label: string;
};

export type GraphEdge = {
  /** id del nodo que hace la llamada. */
  source: string;
  /** id del nodo llamado. */
  target: string;
};

export type Graph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

/**
 * Contrato que implementa cada lenguaje soportado. Agregar un lenguaje =
 * crear un módulo que exporte uno de estos + registrarlo en registry.ts.
 */
export interface LanguageAnalyzer {
  /** Clave del lenguaje (lo que manda el cliente). */
  language: string;
  /** Convierte código fuente en un call graph. */
  analyze(code: string): Promise<Graph>;
}
