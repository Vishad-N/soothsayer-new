"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero illustration for the Foundation page: a small globe held in orbit by the three causes the
 * Foundation supports. Education (an open book), healthcare (a heart) and environmental restoration
 * (a leaf) circle the world and stay upright as they go; soft ripples spread from the globe.
 * Motion is transform / opacity only and is skipped for reduced-motion users.
 */
const BR = "#00b4d8";
const CY = "#6fdcf0";
const PALE = "#d9f5fb";
const DEEP = "#0b2f38";
const LINE = "rgba(255,255,255,0.14)";
const DIM = "rgba(255,255,255,0.3)";
const SMOOTH = [0.45, 0, 0.25, 1] as const;

const CAUSES = [
  { a: -90, icon: <g><path d="M-13 -8c4.500-2.500 9-2 13 1 4-3 8.500-3.500 13-1v17c-4.500-2.500-9-2-13 1-4-3-8.500-3.500-13-1z" /><path d="M0 -7v17" /></g> },
  { a: 30, icon: <path d="M0 11C-14 2-12-9-5-9c3 0 5 2 5 4.500 0-2.500 2-4.500 5-4.500 7 0 9 11-5 20z" /> },
  { a: 150, icon: <g><path d="M-10 10C-10-3-2-10 12-11 12 3 3 10-10 10z" /><path d="M-10 10L3-3" /></g> },
];
const R = 138;

export function FoundationArt({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const loop = (animate: Record<string, unknown>, transition: Record<string, unknown> = {}): object =>
    reduce ? {} : { animate, transition: { repeat: Infinity, ease: SMOOTH, ...transition } };

  return (
    <div className={className}>
      <svg viewBox="0 0 560 440" role="img" aria-label="A globe circled by three symbols: an open book for education, a heart for healthcare and a leaf for environmental restoration" className="h-auto w-full">
        <defs>
          <linearGradient id="fd-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.09" /><stop offset="1" stopColor="#fff" stopOpacity="0.02" />
          </linearGradient>
          <radialGradient id="fd-globe" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor={CY} stopOpacity="0.55" /><stop offset="0.55" stopColor={BR} stopOpacity="0.25" /><stop offset="1" stopColor={DEEP} />
          </radialGradient>
          <clipPath id="fd-clip"><circle cx="280" cy="220" r="70" /></clipPath>
          <filter id="fd-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <pattern id="fd-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" opacity="0.12" /></pattern>
        </defs>
        <rect x="8" y="8" width="544" height="424" rx="26" fill="url(#fd-panel)" stroke={LINE} />
        <rect x="8" y="8" width="544" height="424" rx="26" fill="url(#fd-dots)" />

        {/* ripples spreading from the world */}
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} cx="280" cy="220" r="70" fill="none" stroke={CY} strokeWidth="1.5" initial={{ opacity: 0 }}
            {...loop({ scale: [1, 2.3], opacity: [0.5, 0] }, { duration: 4.5, delay: i * 1.5, ease: "easeOut" })} />
        ))}
        <circle cx="280" cy="220" r={R} fill="none" stroke={DIM} strokeDasharray="3 9" />

        {/* globe */}
        <circle cx="280" cy="220" r="70" fill="url(#fd-globe)" stroke={BR} strokeWidth="2.5" filter="url(#fd-glow)" />
        <g clipPath="url(#fd-clip)" fill="none" stroke={PALE} strokeOpacity="0.45" strokeWidth="1.4">
          {[-42, -14, 14, 42].map((dy) => <ellipse key={dy} cx="280" cy={220 + dy} rx={Math.sqrt(4900 - dy * dy)} ry="7" />)}
          {[0, 1, 2].map((i) => (
            <motion.ellipse key={i} cx="280" cy="220" rx="70" ry="70" initial={{ scaleX: 1 - i * 0.3 }}
              {...loop({ scaleX: [1 - i * 0.3, -(1 - i * 0.3)] }, { duration: 9, ease: "linear" })} />
          ))}
          <path d="M280 150V290" />
        </g>
        <path d="M232 192c10-10 26-10 34-4 6 5 2 12-6 14-10 3-16 12-28 6zM292 238c10-8 24-6 30 2 4 7-2 14-12 14-10 0-14-10-18-16z" fill={PALE} fillOpacity="0.28" />

        {/* the three causes, orbiting and staying upright */}
        <motion.g {...loop({ rotate: 360 }, { duration: 36, ease: "linear" })}>
          <circle cx="280" cy="220" r={R} fill="none" stroke="none" />
          {CAUSES.map((c, i) => {
            const x = +(280 + R * Math.cos((c.a * Math.PI) / 180)).toFixed(2);
            const y = +(220 + R * Math.sin((c.a * Math.PI) / 180)).toFixed(2);
            return (
              <motion.g key={i} {...loop({ rotate: -360 }, { duration: 36, ease: "linear" })}>
                <circle cx={x} cy={y} r="34" fill={DEEP} stroke={BR} strokeWidth="2" />
                <circle cx={x} cy={y} r="42" fill="none" stroke={CY} strokeOpacity="0.25" />
                <g transform={`translate(${x} ${y})`} fill="none" stroke={CY} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">{c.icon}</g>
              </motion.g>
            );
          })}
        </motion.g>

        {/* motes rising */}
        {[[96, 360], [150, 330], [440, 350], [480, 300], [86, 150], [492, 120]].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r={3 + (i % 2)} fill={PALE}
            {...loop({ y: [0, -26, 0], opacity: [0.15, 0.7, 0.15] }, { duration: 5 + (i % 3), delay: i * 0.7 })} />
        ))}
      </svg>
    </div>
  );
}
