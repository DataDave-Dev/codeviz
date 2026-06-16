"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { DOC_NAV } from "@/lib/docs";

export default function DocsSidebar({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs" className="flex flex-col gap-0.5">
      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted/60">
        {lang === "es" ? "Documentación" : "Documentation"}
      </p>
      {DOC_NAV.map((d) => {
        const href = `/${lang}/docs/${d.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={d.slug}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-white/[0.07] font-medium text-[#e6e9ef]"
                : "text-muted hover:bg-white/[0.04] hover:text-fg"
            }`}
          >
            {d.title[lang]}
          </Link>
        );
      })}
    </nav>
  );
}
