# Contribuir a Weftmap

**🌐 Idioma:** [English](CONTRIBUTING.md) · **Español**

¡Gracias por tu interés! Esta guía cubre lo esencial.

## Setup

```bash
pnpm install
pnpm dev
```

## Antes de abrir un PR

Todo esto debe pasar (es lo que corre CI):

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Flujo

- `main` está protegida: no se puede hacer push directo. Trabaja en una rama y
  abre un Pull Request.
- El PR necesita CI en verde y al menos una aprobación para mergear.
- Commits en formato [Conventional Commits](https://www.conventionalcommits.org/):
  `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.

## Agregar un lenguaje

Es el tipo de contribución más valioso. Los pasos están en el
[README](README.es.md#agregar-un-lenguaje). Incluye siempre un test del analyzer.

## Agregar una traducción

¡Damos la bienvenida a las traducciones para que Weftmap sea accesible en todo el mundo!
Para agregar una traducción:
1. Registra el nuevo código de locale (por ejemplo, `fr`) en [src/i18n/config.ts](file:///src/i18n/config.ts).
2. Copia [src/i18n/dictionaries/en.json](file:///src/i18n/dictionaries/en.json) a `src/i18n/dictionaries/<locale>.json` y traduce los valores.
3. Ejecuta `pnpm test` para verificar que el diccionario de traducción coincida con las claves de la plantilla de origen.

## Estilo

- TypeScript, sin `any` en código de aplicación.
- Archivos pequeños y enfocados.
- Maneja los errores; no los silencies.
