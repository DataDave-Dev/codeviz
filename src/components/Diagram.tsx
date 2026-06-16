"use client";

import { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  type Edge,
  type Node,
} from "reactflow";
import dagre from "@dagrejs/dagre";
import "reactflow/dist/style.css";
import type { Graph } from "@/lib/analysis/types";

const NODE_W = 170;
const NODE_H = 44;

// Calcula posiciones con dagre (layout jerárquico) y mapea al formato de React Flow.
function toReactFlow(graph: Graph): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "TB", nodesep: 40, ranksep: 70 });
  g.setDefaultEdgeLabel(() => ({}));

  graph.nodes.forEach((n) => g.setNode(n.id, { width: NODE_W, height: NODE_H }));
  graph.edges.forEach((e) => g.setEdge(e.source, e.target));
  dagre.layout(g);

  const nodes: Node[] = graph.nodes.map((n) => {
    const { x, y } = g.node(n.id);
    return {
      id: n.id,
      data: { label: n.label },
      position: { x: x - NODE_W / 2, y: y - NODE_H / 2 },
      style: {
        width: NODE_W,
        borderRadius: 8,
        border: "1px solid #6366f1",
        background: "#1e1b4b",
        color: "#e0e7ff",
        fontFamily: "monospace",
        fontSize: 13,
      },
    };
  });

  const edges: Edge[] = graph.edges.map((e, i) => ({
    id: `e${i}`,
    source: e.source,
    target: e.target,
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#6366f1" },
  }));

  return { nodes, edges };
}

export default function Diagram({ graph }: { graph: Graph }) {
  const { nodes, edges } = useMemo(() => toReactFlow(graph), [graph]);

  if (graph.nodes.length === 0) {
    return (
      <div style={{ padding: 24, color: "#94a3b8" }}>
        No se encontraron funciones en el código.
      </div>
    );
  }

  return (
    <ReactFlow nodes={nodes} edges={edges} fitView>
      <Background />
      <Controls />
    </ReactFlow>
  );
}
