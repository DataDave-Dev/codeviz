// Carga y cachea el runtime de Tree-sitter y los grammars (WASM).
// Corre en el servidor (API route), por eso lee los .wasm del filesystem.

import Parser from "web-tree-sitter";
import { readFile } from "node:fs/promises";
import path from "node:path";

const WASM_DIR = path.join(process.cwd(), "public", "wasm");

let initPromise: Promise<void> | null = null;
const languageCache = new Map<string, Parser.Language>();

function initRuntime(): Promise<void> {
  // Parser.init carga tree-sitter.wasm; lo redirigimos a public/wasm.
  if (!initPromise) {
    initPromise = Parser.init({
      locateFile: (name: string) => path.join(WASM_DIR, name),
    });
  }
  return initPromise;
}

async function loadLanguage(wasmFile: string): Promise<Parser.Language> {
  const cached = languageCache.get(wasmFile);
  if (cached) return cached;
  const bytes = await readFile(path.join(WASM_DIR, wasmFile));
  const language = await Parser.Language.load(bytes);
  languageCache.set(wasmFile, language);
  return language;
}

/** Devuelve un parser configurado y su Language (necesario para crear queries). */
export async function getParser(
  wasmFile: string,
): Promise<{ parser: Parser; language: Parser.Language }> {
  await initRuntime();
  const language = await loadLanguage(wasmFile);
  const parser = new Parser();
  parser.setLanguage(language);
  return { parser, language };
}
