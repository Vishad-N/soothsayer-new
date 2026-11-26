"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CoverMotif, Webinar } from "@/data/webinars";
import { cn } from "@/lib/cn";

/**
 * The picture for a webinar: its own cover image where the old site had one, otherwise a designed
 * 16:9 cover. The three covers each say something about their topic: a radar sweep for continuous
 * cyber defense, a layered control plane for architecting AI at scale, and a climbing path for making
 * a transformation work. Motion is transform / opacity only and is skipped for reduced-motion users.
 */
const BR = "#00b4d8";
const CY = "#6fdcf0";
const PALE = "#d9f5fb";
const DEEP = "#0b2f38";
const SMOOTH = [0.45, 0, 0.25, 1] as const;

function useLoop() {
  const reduce = useReducedMotion();
  return (animate: Record<string, unknown>, transition: Record<string, unknown> = {}): object =>
    reduce ? {} : { animate, transition: { repeat: Infinity, ease: SMOOTH, ...transition } };
}

function Stage({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 800 450" role="img" aria-label={label} className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-bg`} cx="62%" cy="45%" r="85%">
          <stop offset="0" stopColor="#0e4a58" /><stop offset="0.6" stopColor="#07262e" /><stop offset="1" stopColor="#04141a" />
        </radialGradient>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={BR} /><stop offset="1" stopColor={CY} /></linearGradient>
        <pattern id={`${id}-dots`} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" opacity="0.14" /></pattern>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="800" height="450" fill={`url(#${id}-bg)`} />
      <rect width="800" height="450" fill={`url(#${id}-dots)`} />
      {children}
    </svg>
  );
}

function Radar() {
  const loop = useLoop();
  const blips: [number, number][] = [[470, 150], [560, 250], [330, 300], [610, 170]];
  return (
    <Stage id="cv-r" label="A radar sweep over a shield, for continuous cyber defense">
      {[60, 110, 160, 210].map((r) => <circle key={r} cx="400" cy="225" r={r} fill="none" stroke={CY} strokeOpacity="0.2" />)}
      <path d="M190 225H610M400 15V435" stroke={CY} strokeOpacity="0.14" />
      <motion.g {...loop({ rotate: 360 }, { duration: 7, ease: "linear" })}>
        <circle cx="400" cy="225" r="210" fill="none" stroke="none" />
        <path d="M400 225L610 225A210 210 0 0 0 549 76.500Z" fill="url(#cv-r-g)" opacity="0.28" />
        <path d="M400 225H610" stroke={CY} strokeWidth="2.5" />
      </motion.g>
      {blips.map(([x, y], i) => (
        <g key={i}>
          <motion.circle cx={x} cy={y} r="8" fill="#f5b942" initial={{ opacity: 0.3 }} {...loop({ scale: [0.6, 2.2], opacity: [0.7, 0] }, { duration: 2.4, delay: i * 0.9, ease: "easeOut" })} />
          <circle cx={x} cy={y} r="4.500" fill="#f5b942" />
        </g>
      ))}
      <path d="M400 190l32 11v22c0 20-14 34-32 41-18-7-32-21-32-41v-22z" fill={DEEP} stroke={CY} strokeWidth="3" filter="url(#cv-r-glow)" />
      <path d="M386 224l10 10 20-22" fill="none" stroke={CY} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </Stage>
  );
}

function StackCover() {
  const loop = useLoop();
  const layers = [150, 215, 280];
  return (
    <Stage id="cv-s" label="Three layers of a control plane with signals rising through them, for architecting AI at scale">
      {layers.map((y, i) => (
        <g key={y}>
          <path d={`M400 ${y - 56}L610 ${y}L400 ${y + 56}L190 ${y}Z`} fill={DEEP} fillOpacity={0.55 + i * 0.12} stroke={CY} strokeOpacity={0.45 + i * 0.15} strokeWidth="2" />
          <path d={`M190 ${y}L400 ${y + 56}L610 ${y}`} fill="none" stroke={CY} strokeOpacity="0.25" />
          {[[320, y - 4], [400, y + 20], [480, y - 4], [400, y - 30]].map(([x, yy], k) => (
            <motion.circle key={k} cx={x} cy={yy} r="5" fill={i === 0 ? PALE : CY} initial={{ opacity: 0.4 }}
              {...loop({ opacity: [0.35, 1, 0.35], scale: [1, 1.5, 1] }, { duration: 2.6, delay: i * 0.5 + k * 0.3 })} />
          ))}
        </g>
      ))}
      {[340, 400, 460].map((x, i) => (
        <motion.circle key={x} cx={x} cy="330" r="5" fill={PALE} filter="url(#cv-s-glow)" initial={{ opacity: 0 }}
          {...loop({ y: [0, -230], opacity: [0, 1, 1, 0] }, { duration: 3.4, delay: i * 1.1, ease: "easeInOut" })} />
      ))}
      <path d="M340 330V120M400 360V80M460 330V120" stroke={CY} strokeOpacity="0.2" strokeDasharray="3 8" />
    </Stage>
  );
}

function Ascent() {
  const loop = useLoop();
  const path = "M90 360 C 190 360 210 300 290 290 S 390 230 450 200 S 560 120 700 90";
  const marks: [number, number][] = [[90, 360], [290, 290], [450, 200], [700, 90]];
  return (
    <Stage id="cv-a" label="A path climbing from a pilot to measurable value, for making AI transformation work">
      <path d={path} fill="none" stroke={CY} strokeOpacity="0.18" strokeWidth="14" strokeLinecap="round" />
      <motion.path d={path} fill="none" stroke="url(#cv-a-g)" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: 1 }}
        {...loop({ pathLength: [0, 1, 1], opacity: [1, 1, 0.2] }, { duration: 6, times: [0, 0.7, 1] })} />
      {marks.map(([x, y], i) => (
        <g key={i}>
          <motion.circle cx={x} cy={y} r="22" fill="none" stroke={CY} strokeWidth="2" initial={{ opacity: 0.4 }}
            {...loop({ scale: [1, 1.5], opacity: [0.7, 0] }, { duration: 2, delay: 0.6 + i * 1, repeatDelay: 2, ease: "easeOut" })} />
          <circle cx={x} cy={y} r="14" fill={DEEP} stroke={BR} strokeWidth="2.5" />
          <circle cx={x} cy={y} r="5" fill={i === marks.length - 1 ? PALE : CY} />
        </g>
      ))}
      {[150, 330, 500, 640].map((x, i) => (
        <motion.rect key={x} x={x} y={400 - (i + 1) * 28} width="26" height={(i + 1) * 28} rx="5" fill={CY} fillOpacity={0.18 + i * 0.08}
          style={{ originX: 0.5, originY: 1 }} {...loop({ scaleY: [0, 1, 1, 0] }, { duration: 6, times: [i * 0.12, i * 0.12 + 0.15, 0.9, 1] })} />
      ))}
      <path d="M700 64V26l34 12-34 12" fill={PALE} stroke={PALE} strokeLinejoin="round" />
    </Stage>
  );
}

const COVERS: Record<CoverMotif, () => React.ReactElement> = { radar: Radar, stack: StackCover, ascent: Ascent };

/** A 16:9 frame holding the cover image or the designed cover. `priority` is for the hero image only. */
export function WebinarCover({ webinar, className, priority, sizes = "(min-width: 1024px) 560px, 100vw" }: {
  webinar: Pick<Webinar, "hero" | "cover" | "title">; className?: string; priority?: boolean; sizes?: string;
}) {
  const Cover = webinar.cover ? COVERS[webinar.cover] : null;
  return (
    <div className={cn("relative aspect-video overflow-hidden bg-deep", className)}>
      {webinar.hero ? (
        <Image src={webinar.hero} alt={`Cover image for the webinar ${webinar.title}`} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : Cover ? (
        <Cover />
      ) : null}
    </div>
  );
}
