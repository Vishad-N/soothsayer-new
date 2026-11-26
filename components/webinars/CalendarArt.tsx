"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Empty-calendar illustration for "The SoothSight Intelligence Calendar": a month grid waiting for its next session. */
export function CalendarArt({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const loop = (animate: Record<string, unknown>, transition: Record<string, unknown> = {}): object =>
    reduce ? {} : { animate, transition: { repeat: Infinity, ease: [0.45, 0, 0.25, 1], ...transition } };
  const cells = Array.from({ length: 28 }, (_, i) => i);
  return (
    <svg viewBox="0 0 320 260" role="img" aria-label="An empty calendar" className={className}>
      <defs>
        <linearGradient id="cal-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#00b4d8" /><stop offset="1" stopColor="#6fdcf0" /></linearGradient>
      </defs>
      <rect x="30" y="34" width="260" height="196" rx="16" fill="#fff" stroke="#dfe6e9" strokeWidth="2" />
      <path d="M30 50a16 16 0 0 1 16-16h228a16 16 0 0 1 16 16v26H30z" fill="url(#cal-g)" />
      <path d="M92 20v28M228 20v28" stroke="#0c2631" strokeWidth="6" strokeLinecap="round" />
      {cells.map((i) => {
        const x = 52 + (i % 7) * 33, y = 96 + Math.floor(i / 7) * 33;
        return (
          <motion.rect key={i} x={x} y={y} width="22" height="22" rx="6" fill="#dfe6e9" initial={{ opacity: 0.55 }}
            {...loop({ opacity: [0.35, 0.9, 0.35] }, { duration: 3.2, delay: ((i * 7) % 28) * 0.11 })} />
        );
      })}
      {/* the next session, not yet booked: a dashed ring that keeps searching the grid */}
      <motion.circle cx="85" cy="129" r="17" fill="none" stroke="#00b4d8" strokeWidth="2.5" strokeDasharray="4 5"
        {...loop({ x: [0, 66, 132, 66, 0], y: [0, 33, 0, -33, 0], rotate: [0, 120, 240, 120, 0] }, { duration: 9 })} />
    </svg>
  );
}
