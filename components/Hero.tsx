"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HERO } from "@/data/content";
import { cn, linkProps } from "@/lib/cn";
import { KeycapButton } from "./ui/KeycapButton";
import { ArrowDown, Mouse } from "./ui/Icons";
import { HeroChip } from "./illustrations/HeroChip";
import { BeadCloth } from "./ui/BeadCloth";

const ROTATE_MS = 5000;
const ease = [0.22, 1, 0.36, 1] as const;
// Figma pillar column widths (labels wrap to two lines, so each is sized to its text).
const PILLAR_W = ["sm:w-[112px]", "sm:w-[98px]", "sm:w-[134px]"];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % HERO.pillars.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * -22);
    py.set(((e.clientY - r.top) / r.height - 0.5) * -12);
  };

  const words = HERO.title.split(" ");

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden bg-abyss text-white"
      aria-labelledby="hero-title"
      data-bead-host
      onPointerMove={onPointerMove}
    >
      {/* Background: deep teal wash, bead cloth rising behind the art, glow */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_40%,#0b323a_0%,#061f26_45%,#04141a_78%)]" />
        {/* the cloth fades out toward the copy so the headline stays calm */}
        <BeadCloth className="absolute inset-0 hidden opacity-75 sm:block [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.2)_32%,#000_66%)]" />
        {/* scrims: calm the top (nav), the copy column and the bottom (pillar row) so text keeps its contrast */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(4,20,26,0.6)_0%,rgba(4,20,26,0.25)_45%,transparent_70%)] sm:block" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,26,0.5)_0%,transparent_20%,transparent_58%,rgba(4,20,26,0.88)_100%)]" />
        <div className="absolute -right-40 top-1/4 size-[640px] rounded-full bg-brand/10 blur-[140px]" />
      </div>

      <div className="container-page relative flex lg:static min-h-[720px] flex-col pt-[72px] lg:min-h-[800px] lg:pt-20">
        <div className="grid flex-1 items-center gap-10 py-14 lg:py-0">
          <div className="relative z-10 max-w-[700px] lg:mt-[55px]">
            <motion.p
              className="eyebrow gap-2.5 text-base text-brand sm:text-lg [&::before]:size-3"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              {HERO.eyebrow}
            </motion.p>

            <h1
              id="hero-title"
              className="mt-3.5 text-[34px] leading-[1.1] font-semibold tracking-[-0.02em] xs:text-[46px] sm:text-[56px] lg:text-[65px] lg:leading-[1.05]"
            >
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.045, ease }}
                  >
                    {w}
                    {i < words.length - 1 && " "}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-[600px] text-[17px] leading-[1.4] text-white/85 lg:text-xl lg:leading-[1.4]"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
            >
              {HERO.body}
            </motion.p>

            <motion.div
              className="mt-7"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
            >
              <KeycapButton href={HERO.cta.href} fullWidthMobile>{HERO.cta.label}</KeycapButton>
            </motion.div>
          </div>

        <motion.div
          style={{ y: artY }}
          className="pointer-events-none relative -mx-4 sm:mx-0 lg:absolute lg:right-[1.9vw] lg:top-[84px] lg:w-[56.5vw] lg:max-w-[900px]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease }}
        >
          <motion.div style={{ x: px, y: py }}>
            <HeroChip className="h-auto w-full" />
          </motion.div>
        </motion.div>
        </div>

        {/* Pillar ticker + scroll cue */}
        <div className="relative z-10 flex items-end justify-between gap-6 pb-10 lg:pb-12">
          <ul
            className="no-scrollbar flex w-full flex-col gap-3 sm:w-auto sm:snap-x sm:flex-row sm:gap-8 sm:overflow-x-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {HERO.pillars.map((p, i) => (
              <li key={p.label} className={cn("w-full shrink-0 snap-start", PILLAR_W[i])}>
                <a
                  {...linkProps(p.href)}
                  onFocus={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex min-h-11 items-end pb-2.5 text-base leading-[1.45] sm:min-h-[56px] sm:pb-3 transition-colors duration-300",
                    i === active ? "text-white" : "text-white/70 hover:text-white",
                  )}
                >
                  {p.label}
                </a>
                <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-white/15">
                  {i === active && (
                    <motion.span
                      key={`${active}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-white"
                      initial={{ width: reduce || paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: reduce || paused ? 0 : ROTATE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#trusted"
            aria-label="Scroll to next section"
            className="hidden shrink-0 flex-col items-center gap-1.5 text-white/80 transition-colors hover:text-brand-300 sm:flex"
          >
            <Mouse className="h-8 w-6" />
            <ArrowDown className="size-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
