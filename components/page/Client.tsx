"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight } from "../ui/Icons";

/** "Read More" disclosure. The text stays in the DOM (hidden) so it is still indexable. */
export function ReadMore({ children, label = "Read More", dark }: { children: React.ReactNode; label?: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div hidden={!open} className="space-y-5">{children}</div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group inline-flex min-h-11 items-center gap-2 rounded-[6px] border px-5 text-[15px] font-medium transition-colors",
          open && "mt-6",
          dark ? "border-white/25 text-white hover:border-brand hover:text-brand-300" : "border-line text-ink hover:border-brand hover:text-brand",
        )}
      >
        {open ? "Show Less" : label}
        <ArrowRight className={cn("size-4 transition-transform", open ? "-rotate-90" : "group-hover:translate-x-1")} />
      </button>
    </div>
  );
}

const LottiePlayer = dynamic(() => import("./LottiePlayer"), { ssr: false });

/** Animated Lottie from the original site. `ratio` is the file's width / height so the box never collapses. */
export function Lottie({ src, ratio, className }: { src: string; ratio: number; className?: string }) {
  return (
    <div className={cn("w-full", className)} style={{ aspectRatio: ratio }} aria-hidden>
      <LottiePlayer src={src} />
    </div>
  );
}

/**
 * Sticky in-page nav that highlights the section currently in view.
 * `items` are [label, "#id"]; the last item can be flagged as a call to action.
 */
export function ScrollSpyNav({ items, ctaLast }: { items: readonly (readonly [string, string])[]; ctaLast?: boolean }) {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    const ids = items.map(([, h]) => h.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setCurrent(hit.target.id);
        else if (els[0].getBoundingClientRect().top > window.innerHeight * 0.3) setCurrent(null);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-20 z-40 border-b border-line bg-white/90 backdrop-blur-md lg:top-24">
      <ul className="container-page no-scrollbar flex items-center gap-1 overflow-x-auto py-2 text-[15px]">
        {items.map(([label, href], n) => {
          const isCta = ctaLast && n === items.length - 1;
          const on = current === href.slice(1);
          return (
            <li key={label} className={cn(isCta && "ml-auto pl-3")}>
              <a
                href={href}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "block whitespace-nowrap rounded-full px-4 py-2 font-medium transition-colors",
                  isCta
                    ? "bg-brand text-white hover:bg-brand-600"
                    : on
                      ? "bg-brand-50 text-[#007a96]"
                      : "text-ink-soft hover:bg-brand-50 hover:text-[#007a96]",
                )}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Generic tab set. Panels are all rendered; only the active one is visible. */
export function Tabs({ tabs, initial = 0, dark }: { tabs: { label: string; content: React.ReactNode }[]; initial?: number; dark?: boolean }) {
  const [i, setI] = useState(initial);
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map((t, n) => (
          <button
            key={t.label}
            role="tab"
            type="button"
            id={`tab-${n}`}
            aria-selected={i === n}
            aria-controls={`panel-${n}`}
            onClick={() => setI(n)}
            className={cn(
              "min-h-11 rounded-full border px-5 text-[15px] font-medium transition-colors",
              i === n
                ? "border-brand bg-brand text-white"
                : dark
                  ? "border-white/20 text-white/80 hover:border-brand hover:text-brand-300"
                  : "border-line text-ink-soft hover:border-brand hover:text-brand",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, n) => (
        <div key={t.label} role="tabpanel" id={`panel-${n}`} aria-labelledby={`tab-${n}`} hidden={i !== n} className="mt-8">
          {t.content}
        </div>
      ))}
    </div>
  );
}

/**
 * Selectable pillars that share one featured passage. `items` carry server-rendered icons;
 * the active pillar is named in the panel header so the selection is always visible.
 */
export function PillarTabs({ items, panels }: { items: { label: string; icon: React.ReactNode }[]; panels: React.ReactNode[] }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Pillars" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, n) => (
          <button
            key={it.label}
            role="tab"
            type="button"
            id={`pillar-tab-${n}`}
            aria-selected={i === n}
            aria-controls="pillar-panel"
            onClick={() => setI(n)}
            className={cn(
              "group relative flex min-h-[96px] items-center gap-4 overflow-hidden rounded-[12px] border p-5 text-left transition duration-300",
              i === n
                ? "border-brand bg-brand/10 shadow-[0_0_0_1px_var(--color-brand),0_18px_40px_-18px_rgb(0_180_216/0.5)]"
                : "border-white/12 bg-white/[0.04] hover:border-brand/50 hover:bg-white/[0.07]",
            )}
          >
            <span className={cn("grid size-12 shrink-0 place-items-center rounded-full border transition-colors", i === n ? "border-brand bg-brand text-white" : "border-brand-300/30 bg-brand-300/10 text-brand-300")}>
              {it.icon}
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-xs tracking-widest text-brand-300">{String(n + 1).padStart(2, "0")}</span>
              <span className="block font-display text-[17px] font-semibold leading-snug text-white">{it.label}</span>
            </span>
          </button>
        ))}
      </div>
      <div
        key={i}
        role="tabpanel"
        id="pillar-panel"
        aria-labelledby={`pillar-tab-${i}`}
        className="relative mt-6 animate-[fadeUp_0.45s_ease-out] overflow-hidden rounded-[16px] border border-white/12 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-7 sm:p-10 lg:p-12"
      >
        <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand/20 blur-3xl" />
        <p className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-brand-300/30 bg-brand-300/10 px-3.5 py-1.5 text-sm font-medium text-brand-100">
          <span className="size-2 rounded-full bg-brand" />
          {items[i].label}
        </p>
        <div className="relative">{panels[i]}</div>
      </div>
    </div>
  );
}
