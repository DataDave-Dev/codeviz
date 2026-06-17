import type { Locale } from "@/i18n/config";

export type DocSlug =
  | "introduction"
  | "getting-started"
  | "reading-the-diagram"
  | "languages"
  | "how-it-works"
  | "api"
  | "adding-a-language"
  | "faq";

export type DocNavItem = {
  slug: DocSlug;
  title: Record<Locale, string>;
};

// Order here drives the sidebar and prev/next navigation.
export const DOC_NAV: DocNavItem[] = [
  { slug: "introduction", title: { es: "Introducción", en: "Introduction" } },
  { slug: "getting-started", title: { es: "Empezar", en: "Getting started" } },
  { slug: "reading-the-diagram", title: { es: "Leer el diagrama", en: "Reading the diagram" } },
  { slug: "languages", title: { es: "Lenguajes", en: "Languages" } },
  { slug: "how-it-works", title: { es: "Cómo funciona", en: "How it works" } },
  { slug: "api", title: { es: "Referencia de la API", en: "API reference" } },
  { slug: "adding-a-language", title: { es: "Agregar un lenguaje", en: "Adding a language" } },
  { slug: "faq", title: { es: "FAQ", en: "FAQ" } },
];

export const DOC_SLUGS = DOC_NAV.map((d) => d.slug);
