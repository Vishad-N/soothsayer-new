"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
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
          "group mt-6 inline-flex min-h-11 items-center gap-2 rounded-[6px] border px-5 text-[15px] font-medium transition-colors",
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
