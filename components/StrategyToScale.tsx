"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { STRATEGY } from "@/data/content";
import { cn, linkProps } from "@/lib/cn";
import { ArrowRight } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { StepScene } from "./illustrations/StepScenes";

/**
 * "Enterprise AI. From Strategy to Scale." Six-step journey.
 * Desktop (lg+): a stepper beside one detail card.
 * Below lg: an accordion. Each step opens its own panel (illustration, copy, tags)
 * directly under it, and tapping the open step closes it again.
 */
export function StrategyToScale() {
  const [active, setActive] = useState(3);
  const [collapsed, setCollapsed] = useState(false); // accordion only
  // null until mounted: the server renders the desktop card, and phones swap it for the accordion
  const [desk, setDesk] = useState<boolean | null>(null);
  const reduce = useReducedMotion();
  const step = STRATEGY.steps[active];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const mobile = desk === false;
  const choose = (i: number) => {
    if (mobile && i === active) setCollapsed((c) => !c);
    else {
      setActive(i);
      setCollapsed(false);
    }
  };

  return (
    <section
      id="services"
      aria-labelledby="strategy-title"
      className="relative overflow-hidden bg-white pb-28 pt-20 lg:pb-40 lg:pt-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/3 size-[520px] rounded-full bg-brand-100/70 blur-[120px]" />
        <div className="absolute -right-40 -top-20 size-[420px] rounded-full bg-brand-100/50 blur-[120px]" />
      </div>

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 id="strategy-title" className="h-section">
            Enterprise AI. From Strategy
            <br className="hidden sm:block" /> to Scale.
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[15px] leading-[1.65] text-ink-soft sm:text-base">
            {STRATEGY.body}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-0 lg:mt-16 lg:grid-cols-[minmax(0,520px)_minmax(0,612px)] lg:justify-between lg:gap-12">
          {/* Stepper */}
          <Reveal>
            <ol role={mobile ? undefined : "tablist"} aria-label="Enterprise AI journey" className="relative">
              {STRATEGY.steps.map((s, i) => {
                const on = i === active && !(mobile && collapsed);
                const done = i < active;
                const open = mobile && on;
                return (
                  <li key={s.key} className="relative flex items-stretch gap-5">
                    {/* rail */}
                    <div className="relative flex w-12 shrink-0 flex-col items-center">
                      <span
                        className={cn(
                          "relative z-10 mt-[18px] grid size-12 place-items-center rounded-full border text-[13px] font-semibold transition-all duration-300",
                          on
                            ? "border-brand bg-brand text-white shadow-[0_0_0_6px_rgb(0_180_216/0.15)]"
                            : "border-brand/60 bg-white text-brand",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i < STRATEGY.steps.length - 1 && (
                        <span aria-hidden className="relative -mb-[18px] w-px flex-1 bg-brand/30">
                          <span
                            className={cn(
                              "absolute inset-x-0 top-0 bg-brand transition-[height] duration-500",
                              done ? "h-full" : "h-0",
                            )}
                          />
                          <svg className="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 text-brand" viewBox="0 0 10 10" aria-hidden>
                            <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      role={mobile ? undefined : "tab"}
                      id={`step-tab-${s.key}`}
                      aria-selected={mobile ? undefined : on}
                      aria-expanded={mobile ? open : undefined}
                      aria-controls={mobile ? `step-m-${s.key}` : "step-panel"}
                      onClick={() => choose(i)}
                      // hover previews a step on desktop only; on touch a tap must not pre-activate it
                      onPointerEnter={(e) => e.pointerType === "mouse" && desk && setActive(i)}
                      className={cn(
                        "group flex min-h-[84px] w-full items-center justify-between border-b border-dashed border-line text-left transition-colors",
                        i === STRATEGY.steps.length - 1 && !open && "border-b-0",
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-[24px] font-medium tracking-[-0.01em] transition-colors duration-300 sm:text-[30px]",
                          on ? "text-brand" : "text-ink-soft group-hover:text-ink",
                        )}
                      >
                        {s.label}
                      </span>
                      <ArrowRight
                        className={cn(
                          "size-6 transition-all duration-300",
                          on ? "translate-x-1 text-brand" : "text-ink group-hover:translate-x-1",
                          open && "max-lg:translate-x-0 max-lg:rotate-90",
                        )}
                      />
                    </button>

                    {/* phones: the step's detail opens right under it */}
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="panel"
                          id={`step-m-${s.key}`}
                          role="region"
                          aria-labelledby={`step-tab-${s.key}`}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mb-5 mt-3 rounded-[10px] border border-[#cfe9ef] bg-[linear-gradient(180deg,#eef9fb_0%,#e6f5f8_100%)] px-4 pb-7 pt-4 text-center">
                            <StepScene icon={s.icon} className="mx-auto h-auto w-full" />
                            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand">
                              {String(i + 1).padStart(2, "0")} · {s.label}
                            </p>
                            <h3 className="mt-2 text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">
                              <a {...linkProps(s.href)} className="transition-colors hover:text-brand">
                                {s.title}
                              </a>
                            </h3>
                            <p className="mt-3 text-base leading-[1.6] text-ink-soft">{s.body}</p>
                            <ul className="mt-5 flex flex-wrap justify-center gap-2">
                              {s.tags.map((t) => (
                                <li key={t} className="rounded-full border border-[#c7dfe5] bg-white px-3.5 py-1.5 text-[13px] text-ink-soft">
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-6 max-w-[520px] text-base leading-[1.65] text-ink-soft lg:text-[15px]">{STRATEGY.footnote}</p>
          </Reveal>

          {/* Detail card */}
          <Reveal delay={0.1} className="hidden lg:block">
            <div
              id="step-panel"
              role="tabpanel"
              aria-labelledby={`step-tab-${step.key}`}
              className="relative overflow-hidden rounded-[10px] border border-[#cfe9ef] bg-[linear-gradient(180deg,#eef9fb_0%,#e6f5f8_100%)] px-6 pb-10 pt-6 text-center sm:px-10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.key}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {!mobile && <StepScene icon={step.icon} className="mx-auto h-auto w-full max-w-[480px]" />}
                  <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand">
                    {String(active + 1).padStart(2, "0")} · {step.label}
                  </p>
                  <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.01em] text-ink sm:text-[30px]">
                    <a {...linkProps(step.href)} className="transition-colors hover:text-brand">
                      {step.title}
                    </a>
                  </h3>
                  <p className="mx-auto mt-3 max-w-[460px] text-base leading-[1.6] text-ink-soft sm:text-[15px]">
                    {step.body}
                  </p>
                  <ul className="mx-auto mt-5 flex max-w-[460px] flex-wrap justify-center gap-2">
                    {step.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[#c7dfe5] bg-white px-3.5 py-1.5 text-[12.5px] text-ink-soft"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
