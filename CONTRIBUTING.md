# Contributing to Weftmap

**🌐 Language:** **English** · [Español](CONTRIBUTING.es.md)

Thanks for your interest! This guide covers the essentials.

## Setup

```bash
pnpm install
pnpm dev
```

## Before opening a PR

All of these must pass (it's what CI runs):

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Workflow

- `main` is protected: no direct pushes. Work on a branch and open a Pull Request.
- A PR needs CI green and at least one approval to merge.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/):
  `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.

## Adding a language

This is the most valuable kind of contribution. The steps are in the
[README](README.md#adding-a-language). Always include an analyzer test.

## Adding a translation

We welcome translations to make Weftmap accessible worldwide!
To add a translation:

1. Register the new locale code (e.g., `fr`) in [src/i18n/config.ts](file:///src/i18n/config.ts).
2. Copy [src/i18n/dictionaries/en.json](file:///src/i18n/dictionaries/en.json) to `src/i18n/dictionaries/<locale>.json` and translate the values.
3. Run `pnpm test` to verify the translation dictionary matches the source template keys.

## Style

- TypeScript, no `any` in application code.
- Small, focused files.
- Handle errors; never silence them.
