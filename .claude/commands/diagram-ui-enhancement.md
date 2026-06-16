---
name: diagram-ui-enhancement
description: Workflow command scaffold for diagram-ui-enhancement in codeviz.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /diagram-ui-enhancement

Use this workflow when working on **diagram-ui-enhancement** in `codeviz`.

## Goal

Improves or extends the diagram visualization in the UI, including layout, legend, containers, and interactive filtering.

## Common Files

- `src/components/ui/Diagram.tsx`
- `src/lib/analysis/types.ts`
- `src/lib/analysis/analyzers/{language}.ts`
- `src/lib/analysis/analyzers/analyzers.test.ts`
- `src/i18n/dictionaries/en.json`
- `src/i18n/dictionaries/es.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Update diagram rendering logic in src/components/ui/Diagram.tsx
- Update or add legend and filtering features in the same file
- Update analysis output or types if new edge/node types are visualized (src/lib/analysis/types.ts, analyzers)
- Update tests if diagram output is tested (src/lib/analysis/analyzers/analyzers.test.ts)
- Update i18n dictionaries if UI text changes (src/i18n/dictionaries/*.json)

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.