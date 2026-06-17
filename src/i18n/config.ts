export const locales = ["en", "es", "pt", "ar", "fr", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Pick the best supported locale from an Accept-Language header, defaulting to
// `defaultLocale`. Shared by the proxy redirect and the (param-less) 404 page.
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  for (const part of acceptLanguage.split(",")) {
    const base = part.split(";")[0].trim().toLowerCase().split("-")[0];
    const match = locales.find((locale) => locale === base);
    if (match) return match;
  }
  return defaultLocale;
}
