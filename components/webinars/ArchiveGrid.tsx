"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight } from "../ui/Icons";
import type { CoverMotif } from "@/data/webinars";
import { WebinarCover } from "./WebinarCover";

export type ArchiveItem = {
  slug: string; title: string; date: string; year: number; subtitle?: string; hero: string | null; cover: CoverMotif | null;
};

/** Past sessions as image cards, filterable by year. Every card is one link to the session's page. */
export function ArchiveGrid({ items, years }: { items: ArchiveItem[]; years: number[] }) {
  const [year, setYear] = useState<number | "all">("all");
  const shown = year === "all" ? items : items.filter((i) => i.year === year);
  const tabs: (number | "all")[] = ["all", ...years];

  return (
    <div>
      <div role="group" aria-label="Filter sessions by year" className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const on = t === year;
          const count = t === "all" ? items.length : items.filter((i) => i.year === t).length;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              onClick={() => setYear(t)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-[15px] font-medium transition-colors",
                on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand hover:text-brand",
              )}
            >
              {t === "all" ? "All sessions" : t}
              <span className={cn("rounded-full px-2 py-0.5 text-[12px]", on ? "bg-white/25" : "bg-mist text-ink-soft")}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {shown.map((w) => (
          <li key={w.slug} className="group">
            <Link
              href={`/webinars/${w.slug}`}
              className="flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-white shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
            >
              <div className="overflow-hidden">
                <div className="transition-transform duration-700 group-hover:scale-[1.04]">
                  <WebinarCover webinar={w} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#007a96]">{w.date}</p>
                <h3 className="mt-2 text-[20px] font-semibold leading-snug text-ink">{w.title}</h3>
                {w.subtitle && <p className="mt-2 line-clamp-2 text-[15px] leading-[1.55] text-ink-soft">{w.subtitle}</p>}
                <span className="mt-auto flex items-center gap-2 pt-5 text-[15px] font-medium text-[#007a96] group-hover:text-brand-600">
                  View webinar <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
