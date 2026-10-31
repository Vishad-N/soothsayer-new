"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EXPERTISE } from "@/data/content";
import { cn } from "@/lib/cn";
import { LinkButton } from "./ui/Button";
import { Chevron, LINE_ICONS } from "./ui/Icons";
import { PixelEdge } from "./ui/PixelEdge";
import { Reveal } from "./ui/Reveal";
import { BlueprintScene } from "./illustrations/BlueprintScene";
import { CompetencyScene } from "./illustrations/CompetencyScene";
import { JourneyPath } from "./illustrations/JourneyPath";

type Tab = (typeof EXPERTISE.tabs)[number];

/** The scene for a tab. Responsible AI keeps the original route scene. */
function Art({ art, className }: { art: Tab["art"]; className?: string }) {
  if (art === "blueprint") return <BlueprintScene className={className} />;
  if (art === "competency") return <CompetencyScene className={className} />;
  return <JourneyPath variant="trust" className={className} />;
}

/**
 * "Our Expertise": Responsible AI / Strategy & Blueprint / Digital Competency.
 * lg and up: the tab card. Below lg: a vertical accordion (one panel open at a
 * time, the first open by default) with the same content and links.
 */
export function Expertise() {
  const [active, setActive] = useState(0);
  const [openAcc, setOpenAcc] = useState<number | null>(0);
  // null until mounted: the server renders the desktop card; phones swap its art for the accordion's
  const [desk, setDesk] = useState<boolean | null>(null);
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = EXPERTISE.tabs[active];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = EXPERTISE.tabs.length;
    const next = (active + (e.key === "ArrowRight" ? 1 : n - 1)) % n;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="relative bg-deep pt-20 text-white lg:pt-28">
      <PixelEdge />

      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_400px] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-white/85">{EXPERTISE.eyebrow}</p>
            <h2 id="expertise-title" className="h-section mt-4 max-w-[620px]">{EXPERTISE.title}</h2>
          </div>
          <p className="text-base leading-[1.65] text-white/80 lg:pb-2 lg:text-[15px] lg:text-white/75">{EXPERTISE.body}</p>
        </Reveal>

        {/* Below lg: accordion */}
        <Reveal delay={0.1} className="mt-10 space-y-3 lg:hidden">
          {EXPERTISE.tabs.map((t, i) => {
            const open = openAcc === i;
            return (
              <div key={t.key} className="overflow-hidden rounded-[10px] bg-white text-ink shadow-[0_20px_50px_-30px_rgb(0_0_0/0.6)]">
                <h3>
                  <button
                    type="button"
                    id={`exp-acc-${t.key}`}
                    aria-expanded={open}
                    aria-controls={`exp-acc-panel-${t.key}`}
                    onClick={() => setOpenAcc(open ? null : i)}
                    className={cn(
                      "flex min-h-14 w-full items-center justify-between gap-4 border-b-2 px-5 py-4 text-left text-base font-medium transition-colors",
                      open
                        ? "border-brand bg-[linear-gradient(90deg,#ffffff_0%,#8fe4f4_100%)]"
                        : "border-transparent hover:bg-brand-50",
                    )}
                  >
                    {t.tab}
                    <Chevron className={cn("size-4 shrink-0 text-ink transition-transform duration-300", open && "rotate-180")} />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      id={`exp-acc-panel-${t.key}`}
                      role="region"
                      aria-labelledby={`exp-acc-${t.key}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-7 pt-6">
                        <div className="flex items-center gap-3 text-[13px] text-ink-mute">
                          {String(i + 1).padStart(2, "0")}
                          <span className="relative h-px w-24 bg-line">
                            <span className="absolute inset-y-0 left-0 w-2/3 bg-brand" />
                          </span>
                        </div>
                        <h4 className="mt-5 text-[28px] font-semibold leading-[1.15] tracking-[-0.015em]">{t.title}</h4>
                        <p className="mt-3 text-base leading-[1.6] text-ink-soft">{t.body}</p>
                        <ul className="mt-6 space-y-5">
                          {t.points.map((p) => {
                            const Icon = LINE_ICONS[p.icon];
                            return (
                              <li key={p.label} className="flex items-center gap-3 text-base leading-[1.45] text-ink-soft">
                                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-brand/40 text-brand">
                                  <Icon className="size-[18px]" />
                                </span>
                                {p.label}
                              </li>
                            );
                          })}
                        </ul>
                        <LinkButton href={t.cta.href} className="mt-8 w-full">{t.cta.label}</LinkButton>
                      </div>
                      <div className="bg-[linear-gradient(135deg,#f4fafb_0%,#e4f1f4_100%)] px-4 py-6">
                        {desk === false && <Art art={t.art} className="mx-auto h-auto w-full max-w-[560px]" />}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>

        {/* lg and up: the tab card */}
        <Reveal delay={0.1} className="mt-12 hidden overflow-hidden rounded-[10px] bg-white text-ink shadow-[0_30px_80px_-40px_rgb(0_0_0/0.6)] lg:block">
          <div role="tablist" aria-label="Expertise" className="no-scrollbar flex overflow-x-auto border-b border-line" onKeyDown={onKey}>
            {EXPERTISE.tabs.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.key}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  role="tab"
                  id={`exp-tab-${t.key}`}
                  aria-selected={on}
                  aria-controls="exp-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative min-w-[200px] flex-1 px-4 py-4 text-[14px] font-medium transition-colors sm:text-[15px]",
                    i > 0 && "border-l border-line",
                    on ? "text-ink" : "text-ink-soft hover:bg-brand-50 hover:text-ink",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="exp-tab-bg"
                      className="absolute inset-0 border-b-2 border-brand bg-[linear-gradient(90deg,#ffffff_0%,#8fe4f4_100%)]"
                      transition={{ type: "spring", stiffness: 400, damping: 36 }}
                    />
                  )}
                  <span className="relative">{t.tab}</span>
                </button>
              );
            })}
          </div>

          <div id="exp-panel" role="tabpanel" aria-labelledby={`exp-tab-${tab.key}`} className="grid lg:grid-cols-[1fr_1.12fr]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab.key}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: 12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="px-6 py-10 sm:px-10 lg:px-[60px] lg:py-[60px]"
              >
                <div className="flex items-center gap-3 text-[13px] text-ink-mute">
                  {String(active + 1).padStart(2, "0")}
                  <span className="relative h-px w-24 bg-line">
                    <span className="absolute inset-y-0 left-0 w-2/3 bg-brand" />
                  </span>
                </div>
                <h3 className="mt-7 text-[30px] font-semibold tracking-[-0.015em] sm:text-[38px]">{tab.title}</h3>
                <p className="mt-4 max-w-[460px] text-base leading-[1.6] text-ink-soft lg:text-[15px]">{tab.body}</p>
                <ul className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  {tab.points.map((p) => {
                    const Icon = LINE_ICONS[p.icon];
                    return (
                      <li key={p.label} className="flex items-start gap-3 text-base leading-[1.45] text-ink-soft lg:text-[14.5px]">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-brand/40 text-brand">
                          <Icon className="size-[18px]" />
                        </span>
                        <span className="pt-0.5">{p.label}</span>
                      </li>
                    );
                  })}
                </ul>
                <LinkButton href={tab.cta.href} className="mt-9">{tab.cta.label}</LinkButton>
              </motion.div>
            </AnimatePresence>

            <div className="relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f4fafb_0%,#e4f1f4_100%)] px-6 py-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab.art}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  {desk !== false && <Art art={tab.art} className="mx-auto h-auto w-full max-w-[560px]" />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
