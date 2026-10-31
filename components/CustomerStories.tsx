"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CASE_STUDIES } from "@/data/content";
import { cn, linkProps } from "@/lib/cn";
import { LinkButton } from "./ui/Button";
import { ArrowRight } from "./ui/Icons";
import { PixelEdge } from "./ui/PixelEdge";
import { Reveal } from "./ui/Reveal";

/**
 * "Enterprise AI Case Studies": an expanding accordion on desktop
 * (hover or focus a slim panel to open it), stacked cards on mobile.
 */
export function CustomerStories() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const items = CASE_STUDIES.items;

  return (
    <section
      id="case-studies"
      aria-labelledby="cases-title"
      className="relative overflow-x-clip bg-[linear-gradient(120deg,#ffffff_0%,#f3fbfd_45%,#e4f6fb_100%)] pt-20 pb-20 lg:pt-28 lg:pb-36 xl:pb-44"
    >
      <PixelEdge color="#f7fcfd" accent={false} />
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="cases-title" className="h-section">{CASE_STUDIES.title}</h2>
          <LinkButton href={CASE_STUDIES.viewAll} className="self-start sm:self-auto">View All Studies</LinkButton>
        </Reveal>

        {/* Desktop accordion */}
        <Reveal delay={0.1} className="mt-12 hidden h-[460px] gap-3 lg:flex">
          {items.map((c, i) => {
            const on = i === active;
            return (
              <motion.a
                key={c.href}
                {...linkProps(c.href)}
                layout={!reduce}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                transition={{ type: "spring", stiffness: 260, damping: 32 }}
                className={cn(
                  "group relative isolate overflow-hidden rounded-[8px] bg-deep text-white",
                  on ? "flex-[6_1_0%]" : "flex-[1_1_0%]",
                )}
                aria-label={`${c.title} — read case study`}
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes={on ? "760px" : "150px"}
                  className={cn("-z-10 object-cover transition-[filter,transform] duration-700", on ? "scale-100" : "scale-110 grayscale")}
                />
                <div
                  className={cn(
                    "absolute inset-0 -z-10 transition-colors duration-500",
                    on
                      ? "bg-[linear-gradient(180deg,rgb(6_26_32/0.15)_0%,rgb(6_26_32/0.85)_100%)]"
                      : "bg-[linear-gradient(180deg,rgb(8_40_80/0.8)_0%,rgb(6_26_32/0.85)_100%)]",
                  )}
                />
                <span className="absolute left-5 top-5 text-[13px] font-medium text-white/85">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {on ? (
                  <motion.div
                    key="open"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="absolute inset-x-0 bottom-0 p-8"
                  >
                    <span className="inline-block rounded-full border border-white/40 px-3 py-1 text-[12.5px] text-white/90 backdrop-blur-sm">
                      {c.industry}
                    </span>
                    <h3 className="mt-4 max-w-[520px] font-display text-[26px] font-semibold leading-[1.3]">{c.title}</h3>
                    <span className="mt-5 inline-flex items-center gap-3 text-[14px] font-medium">
                      Read Studies
                      <span className="grid size-8 place-items-center rounded-full bg-brand transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="size-4" />
                      </span>
                    </span>
                  </motion.div>
                ) : (
                  <span className="absolute bottom-6 left-1/2 max-h-[380px] max-w-[64px] -translate-x-1/2 rotate-180 overflow-hidden font-display text-[15px] font-medium leading-[1.35] text-white/95 [writing-mode:vertical-rl]">
                    {c.title}
                  </span>
                )}
              </motion.a>
            );
          })}
        </Reveal>

        {/* Mobile / tablet cards */}
        <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:hidden">
          {items.map((c, i) => (
            <li key={c.href} className="w-[82vw] max-w-[420px] shrink-0 snap-start">
              <a {...linkProps(c.href)} className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[8px] p-6 text-white">
                <Image src={c.image} alt="" fill sizes="82vw" className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(6_26_32/0.1)_20%,rgb(6_26_32/0.9)_100%)]" />
                <span className="absolute left-5 top-5 text-[13px] text-white/85">{String(i + 1).padStart(2, "0")}</span>
                <span className="self-start rounded-full border border-white/40 px-3 py-1 text-[12px]">{c.industry}</span>
                <h3 className="mt-3 font-display text-[20px] font-semibold leading-[1.3]">{c.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium">
                  Read Studies
                  <span className="grid size-7 place-items-center rounded-full bg-brand"><ArrowRight className="size-3.5" /></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
