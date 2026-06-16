import { describe, expect, test } from "vitest";
import { pythonAnalyzer } from "./python";
import { javascriptAnalyzer } from "./javascript";
import type { Graph } from "../types";

function hasEdge(graph: Graph, source: string, target: string): boolean {
  return graph.edges.some((e) => e.source === source && e.target === target);
}

describe("pythonAnalyzer", () => {
  test("extrae nodos y aristas de un call graph", async () => {
    const code = `
def main():
    helper()

def helper():
    leaf()

def leaf():
    pass

main()
`;
    const graph = await pythonAnalyzer.analyze(code);

    const ids = graph.nodes.map((n) => n.id).sort();
    expect(ids).toEqual(["(module)", "helper", "leaf", "main"]);
    expect(hasEdge(graph, "main", "helper")).toBe(true);
    expect(hasEdge(graph, "helper", "leaf")).toBe(true);
    expect(hasEdge(graph, "(module)", "main")).toBe(true);
  });

  test("ignora llamadas a funciones no definidas (builtins)", async () => {
    const graph = await pythonAnalyzer.analyze("def f():\n    print(len([]))\n");
    expect(graph.nodes.map((n) => n.id)).toEqual(["f"]);
    expect(graph.edges).toEqual([]);
  });
});

describe("javascriptAnalyzer", () => {
  test("resuelve funciones declaradas y arrow asignadas", async () => {
    const code = `
function main() {
  helper();
}
const helper = () => {
  leaf();
};
function leaf() {}
main();
`;
    const graph = await javascriptAnalyzer.analyze(code);

    const ids = graph.nodes.map((n) => n.id).sort();
    expect(ids).toEqual(["(module)", "helper", "leaf", "main"]);
    expect(hasEdge(graph, "main", "helper")).toBe(true);
    expect(hasEdge(graph, "helper", "leaf")).toBe(true);
    expect(hasEdge(graph, "(module)", "main")).toBe(true);
  });

  test("detecta llamadas por método (obj.foo())", async () => {
    const code = `
function run() {
  this.step();
}
function step() {}
`;
    const graph = await javascriptAnalyzer.analyze(code);
    expect(hasEdge(graph, "run", "step")).toBe(true);
  });
});
