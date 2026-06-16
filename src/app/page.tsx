"use client";

import { useState } from "react";
import CodeInput from "@/components/CodeInput";
import Diagram from "@/components/Diagram";
import type { Graph } from "@/lib/analysis/types";

// Lista del lado del cliente. El registro real vive en el servidor
// (src/lib/analysis/registry.ts) — no se importa aquí para no arrastrar
// código de Node (fs/wasm) al bundle del navegador.
const LANGUAGES = ["python", "javascript"];

const SAMPLE = `def main():
    data = load()
    result = transform(data)
    save(result)

def load():
    return read_file()

def transform(data):
    return clean(data)

def clean(data):
    return data

def save(result):
    write_file(result)

main()
`;

export default function Home() {
  const [code, setCode] = useState(SAMPLE);
  const [language, setLanguage] = useState("python");
  const [graph, setGraph] = useState<Graph | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error desconocido");
      setGraph(data as Graph);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setGraph(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>CodeViz</h1>
      <p style={{ color: "#64748b", marginBottom: 20 }}>
        Pega código y obtén un call graph interactivo. Multi-lenguaje vía
        Tree-sitter.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        <CodeInput
          code={code}
          language={language}
          loading={isLoading}
          languages={LANGUAGES}
          onCodeChange={setCode}
          onLanguageChange={setLanguage}
          onAnalyze={handleAnalyze}
        />

        <div
          style={{
            height: 480,
            border: "1px solid #cbd5e1",
            borderRadius: 8,
            overflow: "hidden",
            background: "#0f172a",
          }}
        >
          {error ? (
            <div style={{ padding: 24, color: "#f87171" }}>{error}</div>
          ) : graph ? (
            <Diagram graph={graph} />
          ) : (
            <div style={{ padding: 24, color: "#94a3b8" }}>
              El diagrama aparecerá aquí.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
