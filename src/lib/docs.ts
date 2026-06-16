import type { Locale } from "@/i18n/config";

export type DocSlug =
  | "introduction"
  | "getting-started"
  | "languages"
  | "how-it-works";

export type DocNavItem = {
  slug: DocSlug;
  title: Record<Locale, string>;
};

// Order here drives the sidebar and prev/next navigation.
export const DOC_NAV: DocNavItem[] = [
  { slug: "introduction", title: { es: "Introducción", en: "Introduction" } },
  { slug: "getting-started", title: { es: "Empezar", en: "Getting started" } },
  { slug: "languages", title: { es: "Lenguajes", en: "Languages" } },
  { slug: "how-it-works", title: { es: "Cómo funciona", en: "How it works" } },
];

export const DOC_SLUGS = DOC_NAV.map((d) => d.slug);
