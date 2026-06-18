"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteGraph } from "@/lib/graphs";

type Props = {
  id: string;
  title: string;
  language: string;
  dateLabel: string;
  href: string;
  openLabel: string;
  deleteLabel: string;
};

export default function GraphListItem({
  id,
  title,
  language,
  dateLabel,
  href,
  openLabel,
  deleteLabel,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [removed, setRemoved] = useState(false);

  function onDelete() {
    startTransition(async () => {
      await deleteGraph(id);
      setRemoved(true);
      router.refresh();
    });
  }

  if (removed) return null;

  return (
    <li className="flex items-center justify-between gap-4 px-4 py-3">
      <Link href={href} className="min-w-0 flex-1">
        <span className="block truncate font-medium text-[#0f172a] dark:text-[#e6e9ef]">
          {title}
        </span>
        <span className="font-mono text-[12px] text-[#64748b] dark:text-[#7c8696]">
          {language} · {dateLabel}
        </span>
      </Link>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={href}
          className="rounded-lg border border-[#e2e8f0] dark:border-[#232a36] px-3 py-1.5 text-[12px] text-[#475569] dark:text-[#9aa6b8] transition-colors hover:border-[#4f46e5] hover:text-[#0f172a]"
        >
          {openLabel}
        </Link>
        <button
          onClick={onDelete}
          disabled={isPending}
          className="rounded-lg border border-transparent px-3 py-1.5 text-[12px] text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
        >
          {deleteLabel}
        </button>
      </div>
    </li>
  );
}
