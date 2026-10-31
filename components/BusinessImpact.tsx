"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { IMPACT } from "@/data/content";
import { cn } from "@/lib/cn";
import { LinkButton } from "./ui/Button";
import { LINE_ICONS } from "./ui/Icons";
import { PixelEdge } from "./ui/PixelEdge";
import { Reveal } from "./ui/Reveal";
import { ImpactScene } from "./illustrations/ImpactScenes";

/** "AI built for business impact": six outcome tabs. "Explore More" goes to IDP. */
export function BusinessImpact() {
  const [active, setActive] = useState(IMPACT.defaultTab);
  const reduce = useReducedMotion();
  const tab = IMPACT.tabs[active];

  return (
    <section id="impact" aria-labelledby="impact-title" className="relative bg-mist py-20 lg:py-28">
      <PixelEdge color="var(--color-mist)" />
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-ink-soft">{IMPACT.eyebrow}</p>
            <h2 id="impact-title" className="h-section mt-4">{IMPACT.title}</h2>
            <p className="mt-4 max-w-[640px] text-base leading-[1.65] text-ink-soft lg:text-[15px]">{IMPACT.body}</p>
          </div>
          <LinkButton href={IMPACT.cta.href} className="self-start lg:self-end">{IMPACT.cta.label}</LinkButton>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-[10px] border border-line bg-white shadow-card">
          <div role="tablist" aria-label="Business outcomes" className="no-scrollbar flex overflow-x-auto border-b border-line">
            {IMPACT.tabs.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.tab}
                  role="tab"
                  aria-selected={on}
                  aria-controls="impact-panel"
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative min-w-[170px] flex-1 px-3 py-4 text-[14px] font-medium whitespace-nowrap transition-colors",
                    i > 0 && "border-l border-line",
                    on ? "text-ink" : "text-ink hover:bg-brand-50",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="impact-tab-bg"
                      className="absolute inset-0 border-b-2 border-brand bg-[linear-gradient(90deg,#ffffff_0%,#8fe4f4_100%)]"
                      transition={{ type: "spring", stiffness: 400, damping: 36 }}
                    />
                  )}
                  <span className="relative">{t.tab}</span>
                </button>
              );
            })}
          </div>

          <div id="impact-panel" role="tabpanel" className="grid lg:grid-cols-[minmax(0,620px)_1fr]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={tab.tab}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="divide-y divide-line"
              >
                {tab.items.map((it) => {
                  const Icon = LINE_ICONS[it.icon];
                  return (
                    <li key={it.title} className="group flex gap-4 px-6 py-7 transition-colors hover:bg-brand-50/60 sm:px-8 lg:py-8">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-brand/40 text-brand transition-transform duration-300 group-hover:scale-105">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="text-[22px] font-semibold tracking-[-0.01em] text-ink">{it.title}</h3>
                        <p className="mt-1.5 max-w-[420px] text-base leading-[1.6] text-ink-soft lg:text-[14.5px]">{it.body}</p>
                      </div>
                    </li>
                  );
                })}
              </motion.ul>
            </AnimatePresence>

            <div className="flex items-center justify-center bg-[linear-gradient(135deg,#eef2f4_0%,#dfe7ea_100%)] p-6 lg:p-8">
              <div className="w-full rounded-[10px] bg-[linear-gradient(180deg,#f7fafb_0%,#e9f1f4_100%)] p-4 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.8)]">
                <ImpactScene key={active} index={active} className="h-auto w-full" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
