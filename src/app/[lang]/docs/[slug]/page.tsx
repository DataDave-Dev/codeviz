import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { DOC_NAV, DOC_SLUGS, type DocSlug } from "@/lib/docs";
import { DOC_COMPONENTS } from "@/components/docs/registry";

export function generateStaticParams() {
  return locales.flatMap((lang) => DOC_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const item = DOC_NAV.find((d) => d.slug === slug);
  const locale: Locale = isLocale(lang) ? lang : "en";
  const title = item ? item.title[locale] : "Docs";
  return { title: `${title} — Weftmap` };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const index = DOC_NAV.findIndex((d) => d.slug === slug);
  if (index === -1) notFound();

  const Content = DOC_COMPONENTS[slug as DocSlug];
  const prev = DOC_NAV[index - 1];
  const next = DOC_NAV[index + 1];

  return (
    <article>
      <Content lang={lang} />

      <nav className="mt-16 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-sm">
        {prev ? (
          <Link
            href={`/${lang}/docs/${prev.slug}`}
            className="text-muted transition-colors hover:text-fg"
          >
            ← {prev.title[lang]}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/${lang}/docs/${next.slug}`}
            className="text-right font-medium text-[#e6e9ef] transition-colors hover:text-white"
          >
            {next.title[lang]} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
