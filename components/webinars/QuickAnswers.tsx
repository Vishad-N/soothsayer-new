"use client";

import Image from "next/image";
import { useState } from "react";
import { QA } from "@/data/webinars";
import { cn } from "@/lib/cn";

/**
 * "Quick Answers. Real Insights.": one short video per question. A question list drives a single
 * player, so only one video is ever loaded. The player is a thumbnail until clicked; the YouTube
 * embed (privacy-enhanced domain) loads only then, which keeps the page fast.
 */
export function QuickAnswers() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const clip = QA.clips[active];

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
      <div className="overflow-hidden rounded-[14px] border border-white/10 bg-black shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]">
        <div className="relative aspect-video">
          {playing ? (
            <iframe
              key={clip.id}
              src={`https://www.youtube-nocookie.com/embed/${clip.id}?autoplay=1&rel=0`}
              title={clip.q}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${clip.q}`}
              className="group absolute inset-0 grid place-items-center"
            >
              <Image src={clip.thumb} alt="" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span aria-hidden className="relative grid size-[72px] place-items-center rounded-full bg-brand text-white shadow-[0_0_0_10px_rgb(0_180_216/0.25)] transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_16px_rgb(0_180_216/0.28)]">
                <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </button>
          )}
        </div>
        <p className="border-t border-white/10 bg-white/[0.04] px-5 py-4 text-[17px] font-medium leading-snug text-white sm:px-6">{clip.q}</p>
      </div>

      <ol className="space-y-3">
        {QA.clips.map((c, i) => {
          const on = i === active;
          return (
            <li key={c.id}>
              <button
                type="button"
                aria-current={on}
                onClick={() => { setActive(i); setPlaying(false); }}
                className={cn(
                  "group flex min-h-[64px] w-full items-center gap-4 rounded-[12px] border px-4 py-3 text-left transition-colors",
                  on ? "border-brand-300/60 bg-brand-300/10" : "border-white/10 bg-white/[0.04] hover:border-brand-300/40",
                )}
              >
                <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border font-mono text-sm tracking-wider", on ? "border-brand-300 bg-brand-300 text-deep" : "border-white/25 text-brand-300")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("flex-1 text-[16px] leading-snug sm:text-[17px]", on ? "font-semibold text-white" : "text-white/80 group-hover:text-white")}>{c.q}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
