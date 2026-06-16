# CodeViz

Pega código y obtén un **call graph interactivo** para entender qué hace.
Multi-lenguaje gracias a [Tree-sitter](https://tree-sitter.github.io/): un solo
motor de parsing, una arquitectura *pluggable* donde agregar un lenguaje son
unas pocas líneas.

> Estado: MVP. Soporta **Python** y **JavaScript/TypeScript**. Diagrama: call
> graph (funciones como nodos, llamadas como flechas).

## Cómo funciona

```
código  →  /api/analyze (Tree-sitter)  →  Graph JSON  →  React Flow (interactivo)
```

- **Frontend + backend** en un solo proyecto Next.js (App Router, TypeScript).
- El backend (`src/app/api/analyze/route.ts`) parsea con Tree-sitter (WASM) y
  devuelve un grafo normalizado `{ nodes, edges }`.
- El frontend lo dibuja con React Flow + layout de dagre.

## Desarrollo

Requisitos: Node 20+ y [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Otros scripts:

```bash
pnpm test       # tests de los analyzers (Vitest)
pnpm typecheck  # tsc --noEmit
pnpm build      # build de producción
```

## Agregar un lenguaje

La arquitectura es *pluggable*: el backend adapta el análisis por lenguaje.

1. Copia el grammar `tree-sitter-<lang>.wasm` a `public/wasm/`
   (de [`tree-sitter-wasms`](https://www.npmjs.com/package/tree-sitter-wasms)).
2. Crea `src/lib/analysis/analyzers/<lang>.ts` con su `LangSpec`
   (dos queries de Tree-sitter: definiciones y llamadas). Usa
   [`python.ts`](src/lib/analysis/analyzers/python.ts) como plantilla.
3. Regístralo en [`src/lib/analysis/registry.ts`](src/lib/analysis/registry.ts).
4. Añade un test en `src/lib/analysis/analyzers/`.

Eso es todo: nada más se toca.

## Estructura

```
src/
  app/
    page.tsx                  # UI: textarea + selector + diagrama
    api/analyze/route.ts      # backend: valida y llama al analyzer
  components/                 # CodeInput, Diagram (React Flow + dagre)
  lib/analysis/               # núcleo: types, registry, treesitter, analyzers/
public/wasm/                  # grammars + runtime de Tree-sitter (.wasm)
```

## Roadmap

- Más lenguajes (Go, Java, C/C++).
- Más tipos de diagrama: control-flow y dependencias entre módulos.
- Input por archivo/ZIP y por URL de repo.

## Contribuir

Lee [CONTRIBUTING.md](CONTRIBUTING.md). Issues y PRs bienvenidos.

## Licencia

[MIT](LICENSE).
