"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ArtKey } from "@/data/services";

/**
 * One illustration per Services page, each showing what that service actually does and looping
 * quietly: the motion tells the same story as the picture (ideas ranked, a seat filled, bars
 * climbing past a target, an alert caught and fixed). Built with Motion (framer-motion); only
 * transform, opacity and stroke properties animate. Reduced-motion users get the still frame.
 * Drawn for the dark hero, 560 × 440, text-free except a few rank numerals.
 */
const BR = "#00b4d8";
const CY = "#6fdcf0";
const PALE = "#d9f5fb";
const DEEP = "#0b2f38";
const AMBER = "#f5b942";
const LINE = "rgba(255,255,255,0.14)";
const DIM = "rgba(255,255,255,0.28)";

const SMOOTH = [0.45, 0, 0.25, 1] as const;
// transform origins for SVG elements (Motion measures them against each element's own box)
const BOTTOM = { originX: 0.5, originY: 1 } as const;
const LEFT = { originX: 0, originY: 0.5 } as const;

/** Props for an endless loop, or nothing at all when the user prefers reduced motion. */
function useLoop() {
  const reduce = useReducedMotion();
  return (animate: Record<string, unknown>, transition: Record<string, unknown> = {}): object =>
    reduce ? {} : { animate, transition: { repeat: Infinity, ease: SMOOTH, ...transition } };
}

function Frame({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 560 440" role="img" aria-label={label} className="h-auto w-full">
      <defs>
        <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.09" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={BR} />
          <stop offset="1" stopColor={CY} />
        </linearGradient>
        <linearGradient id={`${id}-v`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={BR} stopOpacity="0.55" />
          <stop offset="1" stopColor={CY} />
        </linearGradient>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <pattern id={`${id}-dots`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#fff" opacity="0.12" />
        </pattern>
      </defs>
      <rect x="8" y="8" width="544" height="424" rx="26" fill={`url(#${id}-panel)`} stroke={LINE} />
      <rect x="8" y="8" width="544" height="424" rx="26" fill={`url(#${id}-dots)`} />
      {children}
    </svg>
  );
}

/** Head and shoulders, centred on (x, y). */
function Person({ x, y, s = 1, fill = CY, op = 1 }: { x: number; y: number; s?: number; fill?: string; op?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op} fill={fill}>
      <circle cx="0" cy="-9" r="6" />
      <path d="M-11 12c.8-8 5-12 11-12s10.2 4 11 12z" />
    </g>
  );
}

/* ------------------------------------------------------------- hub --- */
function Hub() {
  const loop = useLoop();
  const nodes: [number, number][] = [[84, 300], [182, 238], [280, 214], [378, 150], [476, 96]];
  const path = "M84 300 C 130 300 140 238 182 238 S 240 214 280 214 S 336 150 378 150 S 434 96 476 96";
  return (
    <Frame id="hub" label="Five stages of an AI program rising from strategy to scale, with one leader spanning all of them">
      <defs><clipPath id="hub-bar"><rect x="60" y="356" width="440" height="30" rx="15" /></clipPath></defs>
      <path d={path} fill="none" stroke={LINE} strokeWidth="14" strokeLinecap="round" />
      <motion.path d={path} fill="none" stroke="url(#hub-g)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9"
        {...loop({ strokeDashoffset: [0, -22] }, { duration: 1.4, ease: "linear" })} />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y + 26} x2={x} y2="356" stroke={DIM} strokeDasharray="3 6" />
          {/* a ripple travels node to node, stage by stage */}
          <motion.circle cx={x} cy={y} r="26" fill="none" stroke={CY} strokeWidth="2" initial={{ opacity: 0 }}
            {...loop({ scale: [1, 1.7], opacity: [0.7, 0] }, { duration: 1.8, delay: i * 0.9, repeatDelay: 2.7, ease: "easeOut" })} />
          <circle cx={x} cy={y} r="26" fill={DEEP} stroke={BR} strokeWidth="2" />
          <motion.circle cx={x} cy={y} r="19" fill={BR} initial={{ opacity: 0.12 + i * 0.17 }}
            {...loop({ opacity: [0.12 + i * 0.17, 0.5 + i * 0.1, 0.12 + i * 0.17] }, { duration: 1.8, delay: i * 0.9, repeatDelay: 2.7 })} />
          <text x={x} y={y + 6} textAnchor="middle" fontSize="17" fontWeight="600" fill={PALE} fontFamily="var(--font-display)">{i + 1}</text>
        </g>
      ))}
      <motion.path d="M476 70V40l24 8-24 8" fill={CY} stroke={CY} strokeLinejoin="round" style={LEFT}
        {...loop({ scaleX: [1, 0.82, 1] }, { duration: 2.4 })} />
      <circle r="6" fill={PALE} filter="url(#hub-glow)" className="animate-travel" style={{ offsetPath: `path("${path}")` }} />
      <rect x="60" y="356" width="440" height="30" rx="15" fill="url(#hub-g)" opacity="0.9" />
      <g clipPath="url(#hub-bar)">
        <motion.rect x="-80" y="350" width="70" height="42" fill="#fff" opacity="0.28" transform="skewX(-20)"
          {...loop({ x: [40, 620] }, { duration: 3.4, repeatDelay: 1.4 })} />
      </g>
      <Person x={84} y={375} s={0.9} fill={DEEP} />
      <rect x="118" y="368" width="150" height="5" rx="2.5" fill={DEEP} opacity="0.55" />
      <rect x="118" y="377" width="96" height="4" rx="2" fill={DEEP} opacity="0.35" />
    </Frame>
  );
}

/* -------------------------------------------------------- strategy --- */
function Strategy() {
  const loop = useLoop();
  const dim: [number, number, number][] = [[118, 300, 13], [168, 256, 19], [214, 318, 11], [158, 148, 16], [236, 112, 12], [330, 298, 17]];
  const hi: [number, number, number, number][] = [[356, 176, 27, 1], [432, 118, 22, 2], [458, 196, 18, 3]];
  const bars: [number, number][] = [[70, 198], [215, 350], [363, 500]];
  return (
    <Frame id="st" label="Ideas plotted by value and data readiness, the top three ranked, then sequenced into a roadmap">
      <motion.rect x="285" y="62" width="215" height="143" rx="10" fill={BR} stroke={BR} strokeDasharray="5 5"
        initial={{ opacity: 0.1 }} {...loop({ opacity: [0.07, 0.18, 0.07] }, { duration: 4 })} />
      <g stroke={DIM} strokeWidth="1.5" fill="none">
        <path d="M70 60V345H500" strokeLinecap="round" />
        <path d="M285 62V345M70 205H500" strokeDasharray="3 7" opacity="0.7" />
      </g>
      {dim.map(([x, y, r], i) => (
        <motion.circle key={i} cx={x} cy={y} r={r} fill="#fff" fillOpacity="0.16" stroke="#fff" strokeOpacity="0.3"
          {...loop({ y: [0, -7, 0], x: [0, i % 2 ? 4 : -4, 0] }, { duration: 4 + (i % 3), delay: i * 0.4 })} />
      ))}
      {hi.map(([x, y, r, n], i) => (
        <g key={n}>
          <motion.circle cx={x} cy={y} r={r + 9} fill={BR} initial={{ opacity: 0.18 }}
            {...loop({ scale: [1, 1.3, 1], opacity: [0.22, 0.05, 0.22] }, { duration: 2.6, delay: i * 0.5 })} />
          <motion.g {...loop({ scale: [1, 1.06, 1] }, { duration: 2.6, delay: i * 0.5 })}>
            <circle cx={x} cy={y} r={r} fill="url(#st-g)" />
            <text x={x} y={y + 6} textAnchor="middle" fontSize="18" fontWeight="700" fill={DEEP} fontFamily="var(--font-display)">{n}</text>
          </motion.g>
        </g>
      ))}
      {/* the roadmap fills phase by phase, each gate lighting as it is reached */}
      {bars.map(([a, b], i) => (
        <g key={i}>
          <rect x={a} y="372" width={b - a - 18} height="16" rx="8" fill={DIM} opacity="0.18" />
          <motion.rect x={a} y="372" width={b - a - 18} height="16" rx="8" fill={i === 0 ? "url(#st-g)" : BR} style={LEFT}
            {...loop({ scaleX: [0, 1, 1, 0] }, { duration: 6, times: [i * 0.16, i * 0.16 + 0.2, 0.9, 1], delay: 0 })} />
          <motion.path d={`M${b - 9} 368l9 12-9 12-9-12z`} fill={DEEP} stroke={CY} strokeWidth="2"
            {...loop({ scale: [0.7, 1.15, 1, 0.7] }, { duration: 6, times: [i * 0.16 + 0.15, i * 0.16 + 0.24, 0.9, 1] })} />
        </g>
      ))}
    </Frame>
  );
}

/* ------------------------------------------------------ leadership --- */
function Leadership() {
  const loop = useLoop();
  const team: [number, number][] = [[180, 330], [230, 360], [280, 340], [330, 360], [380, 330]];
  return (
    <Frame id="ld" label="An organisation chart with one empty AI seat filled part time by a fractional leader backed by a delivery team">
      <g stroke={DIM} strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M280 96V128M130 128H430M130 128V148M430 128V148M280 128V148" />
      </g>
      <motion.path d="M280 220V266" stroke={CY} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" fill="none"
        {...loop({ strokeDashoffset: [0, -20] }, { duration: 1, ease: "linear" })} />
      <circle cx="280" cy="70" r="28" fill={DEEP} stroke={LINE} strokeWidth="2" />
      <Person x={280} y={72} fill={PALE} op={0.85} />
      {[130, 430].map((x) => (
        <g key={x}>
          <circle cx={x} cy="176" r="26" fill={DEEP} stroke={LINE} strokeWidth="2" />
          <Person x={x} y={178} s={0.9} fill="#fff" op={0.5} />
        </g>
      ))}
      <motion.circle cx="280" cy="176" r="44" fill="none" stroke={BR} strokeDasharray="5 7" {...loop({ rotate: 360 }, { duration: 20, ease: "linear" })} />
      <motion.circle cx="280" cy="176" r="28" fill={DEEP} stroke={BR} strokeWidth="2.5" filter="url(#ld-glow)"
        {...loop({ scale: [1, 1.07, 1] }, { duration: 2.8 })} />
      <Person x={280} y={178} s={0.95} fill={CY} />
      <motion.g {...loop({ scale: [1, 1.18, 1] }, { duration: 2.8, delay: 0.3 })}>
        <g transform="translate(316 142)">
          <circle r="15" fill={DEEP} stroke={CY} strokeWidth="2" />
          <path d="M0 0V-9A9 9 0 0 1 8.5 3Z" fill={CY} />
        </g>
      </motion.g>
      {team.map(([x, y], i) => (
        <g key={i}>
          <motion.path d={`M${x} ${y - 16}L280 224`} stroke={BR} strokeWidth="1.5" initial={{ strokeOpacity: 0.3 }}
            {...loop({ strokeOpacity: [0.15, 0.8, 0.15] }, { duration: 2.4, delay: i * 0.35 })} />
          <motion.g {...loop({ y: [0, -5, 0] }, { duration: 2.4, delay: i * 0.35 })}>
            <circle cx={x} cy={y} r="21" fill={DEEP} stroke={BR} strokeWidth="1.8" />
            <Person x={x} y={y + 1} s={0.72} fill={i % 2 ? CY : "#fff"} op={0.9} />
          </motion.g>
        </g>
      ))}
    </Frame>
  );
}

/* ------------------------------------------------------------ caio --- */
function Caio() {
  const loop = useLoop();
  const sat: { x: number; y: number; icon: React.ReactNode }[] = [
    { x: 280, y: 72, icon: <path d="M-8 -9V9M-8 -8h14l-3 5 3 5h-14" /> },
    { x: 438, y: 218, icon: <g><path d="M-8 -10h12l4 4v16h-16z" /><path d="M-4 1l3 3 6-6" /></g> },
    { x: 280, y: 364, icon: <g><path d="M0 -10V0M0 0L-8 9M0 0L8 9" /><circle cx="0" cy="-12" r="2.5" /><circle cx="-8" cy="11" r="2.5" /><circle cx="8" cy="11" r="2.5" /></g> },
    { x: 122, y: 218, icon: <path d="M-10 9V-1M-3 9V-8M4 9V1M11 9V-5" /> },
  ];
  return (
    <Frame id="ca" label="A shield at the centre of four responsibilities: roadmap, governance, vendor decisions and value tracking">
      <motion.circle cx="280" cy="218" r="146" fill="none" stroke={DIM} strokeDasharray="4 8" {...loop({ rotate: 360 }, { duration: 50, ease: "linear" })} />
      {[0, 1, 2].map((i) => (
        <motion.circle key={i} cx="280" cy="218" r="82" fill="none" stroke={i === 0 ? CY : BR} strokeOpacity={1 - i * 0.28} strokeWidth="6" strokeLinecap="round"
          strokeDasharray="160 355" initial={{ rotate: -85 + i * 120 }} {...loop({ rotate: [-85 + i * 120, 275 + i * 120] }, { duration: 14, ease: "linear" })} />
      ))}
      {sat.map((s, i) => (
        <g key={i}>
          <motion.line x1="280" y1="218" x2={s.x} y2={s.y} stroke={BR} strokeWidth="2" strokeDasharray="3 7" initial={{ strokeOpacity: 0.35 }}
            {...loop({ strokeDashoffset: [0, i % 2 ? 20 : -20] }, { duration: 1.6, ease: "linear" })} />
          <motion.g {...loop({ scale: [1, 1.1, 1] }, { duration: 2.4, delay: i * 0.6 })}>
            <circle cx={s.x} cy={s.y} r="34" fill={DEEP} stroke={BR} strokeWidth="2" />
            <g transform={`translate(${s.x} ${s.y})`} fill="none" stroke={CY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</g>
          </motion.g>
        </g>
      ))}
      <motion.circle cx="280" cy="218" r="58" fill={DEEP} stroke="url(#ca-g)" strokeWidth="3" filter="url(#ca-glow)" {...loop({ scale: [1, 1.05, 1] }, { duration: 3 })} />
      <path d="M280 182l30 11v22c0 20-13 34-30 41-17-7-30-21-30-41v-22z" fill="url(#ca-g)" opacity="0.95" />
      <motion.path d="M280 200l5.5 11 12 1.8-8.7 8.5 2 12-10.8-5.7-10.8 5.7 2-12-8.7-8.5 12-1.8z" fill={DEEP} {...loop({ scale: [1, 1.15, 1], rotate: [0, 12, 0] }, { duration: 3 })} />
    </Frame>
  );
}

/* ----------------------------------------------------------- proof --- */
function Proof() {
  const loop = useLoop();
  const h = [58, 62, 60, 74, 92, 108, 126, 142, 158, 176, 192, 210];
  const CYCLE = 7;
  return (
    <Frame id="pv" label="Twelve weeks of results rising from the agreed baseline past the agreed target to a decision gate">
      {[[64, 180], [180, 398], [398, 460]].map(([a, b], i) => (
        <path key={i} d={`M${a} 70h${b - a - 8}M${a} 64v12M${b - 8} 64v12`} fill="none" stroke={i === 1 ? BR : DIM} strokeWidth="2.5" />
      ))}
      <path d="M52 270H480" stroke={DIM} strokeDasharray="6 6" strokeWidth="2" />
      <path d="M52 130H480" stroke={BR} strokeDasharray="6 6" strokeWidth="2" />
      <path d="M52 340H480" stroke={LINE} strokeWidth="2" />
      {h.map((v, i) => (
        <motion.rect key={i} x={64 + i * 33} y={340 - v} width="22" height={v} rx="5" style={BOTTOM}
          fill={i < 3 ? "#fff" : i < 9 ? "url(#pv-v)" : CY} fillOpacity={i < 3 ? 0.28 : 1}
          {...loop({ scaleY: [0, 1, 1, 0] }, { duration: CYCLE, times: [i * 0.03, i * 0.03 + 0.14, 0.9, 1] })} />
      ))}
      <circle cx="75" cy="270" r="5" fill="#fff" opacity="0.6" />
      <motion.circle cx="75" cy="130" r="5" fill={BR} {...loop({ scale: [1, 1.7, 1] }, { duration: 2.4 })} />
      {/* the go / no-go gate lights once the bars have cleared the target */}
      <g transform="translate(496 130)">
        <motion.g {...loop({ scale: [0.6, 0.6, 1.15, 1, 1, 0.6], opacity: [0.35, 0.35, 1, 1, 1, 0.35] }, { duration: CYCLE, times: [0, 0.5, 0.6, 0.66, 0.9, 1] })}>
          <path d="M0 -26l26 26-26 26-26-26z" fill={DEEP} stroke={CY} strokeWidth="2.5" filter="url(#pv-glow)" />
          <motion.path d="M-9 0l6 6 12-13" fill="none" stroke={CY} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 1 }}
            {...loop({ pathLength: [0, 0, 1, 1, 0] }, { duration: CYCLE, times: [0, 0.58, 0.7, 0.92, 1] })} />
        </motion.g>
      </g>
    </Frame>
  );
}

/* -------------------------------------------------------- embedded --- */
function Embedded() {
  const loop = useLoop();
  return (
    <Frame id="em" label="A kanban backlog feeding a two-week release cycle, with a client team and a Soothsayer team working inside it">
      {[0, 1, 2].map((c) => (
        <g key={c}>
          <rect x={44 + c * 70} y="96" width="62" height="248" rx="10" fill="#fff" opacity="0.06" stroke={LINE} />
          <rect x={52 + c * 70} y="106" width="30" height="6" rx="3" fill={c === 2 ? CY : DIM} />
          {Array.from({ length: 3 - c + (c === 1 ? 1 : 0) }, (_, k) => (
            <rect key={k} x={52 + c * 70} y={126 + k * 54} width="46" height="40" rx="6" fill={c === 2 ? "url(#em-g)" : "#fff"} opacity={c === 2 ? 0.9 : 0.2} />
          ))}
        </g>
      ))}
      {/* a card travels To do → Doing → Done each cycle */}
      <motion.rect x="52" y="234" width="46" height="40" rx="6" fill={PALE} initial={{ opacity: 0 }}
        {...loop({ x: [0, 0, 70, 70, 140, 140], y: [0, 0, -34, -34, -40, -40], opacity: [0, 1, 1, 1, 1, 0] }, { duration: 6, times: [0, 0.08, 0.38, 0.5, 0.82, 1] })} />
      <motion.path d="M258 220H300" stroke={CY} strokeWidth="3" strokeLinecap="round" strokeDasharray="3 7" fill="none"
        {...loop({ strokeDashoffset: [0, -20] }, { duration: 0.9, ease: "linear" })} />
      <path d="M300 220l-9-7M300 220l-9 7" stroke={CY} strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(414 220)">
        <circle r="116" fill="none" stroke={LINE} strokeWidth="2" />
        {Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2 - Math.PI / 2;
          return (
            <motion.circle key={i} cx={+(Math.cos(a) * 116).toFixed(2)} cy={+(Math.sin(a) * 116).toFixed(2)} r={i === 0 ? 6 : 4} fill={i === 0 ? CY : DIM}
              {...loop({ scale: [1, 1.9, 1], fill: [i === 0 ? CY : DIM, PALE, i === 0 ? CY : DIM] }, { duration: 0.8, delay: i * 0.5, repeatDelay: 6.2 })} />
          );
        })}
        {/* the whole ring turns once per cycle; the first circle fixes the turning centre */}
        <motion.g {...loop({ rotate: 360 }, { duration: 7, ease: "linear" })}>
          <circle r="116" fill="none" stroke="none" />
          <circle cx="0" cy="-116" r="7" fill={PALE} filter="url(#em-glow)" />
        </motion.g>
        <motion.circle cx="-24" cy="0" r="58" fill="#fff" fillOpacity="0.1" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" {...loop({ x: [0, 6, 0] }, { duration: 3.5 })} />
        <motion.circle cx="24" cy="0" r="58" fill={BR} fillOpacity="0.28" stroke={CY} strokeWidth="2" {...loop({ x: [0, -6, 0] }, { duration: 3.5 })} />
        <motion.g {...loop({ x: [0, 6, 0] }, { duration: 3.5 })}><Person x={-48} y={6} s={1.05} fill="#fff" /></motion.g>
        <motion.g {...loop({ x: [0, -6, 0] }, { duration: 3.5 })}><Person x={48} y={6} s={1.05} fill={CY} /></motion.g>
        <path d="M0 -26v52" stroke={PALE} strokeWidth="2" strokeDasharray="2 5" opacity="0.8" />
        <motion.g {...loop({ scale: [1, 1.2, 1] }, { duration: 1.8 })}>
          <circle cx="0" cy="0" r="9" fill={DEEP} stroke={CY} strokeWidth="2" />
          <path d="M-4 0l3 3 5-6" fill="none" stroke={CY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </g>
    </Frame>
  );
}

/* --------------------------------------------------------- managed --- */
function Managed() {
  const loop = useLoop();
  const T = 7;
  const gauge = (cx: number, pct: number, color: string, i: number) => {
    const r = 40;
    return (
      <g key={i} transform={`translate(${cx} 336)`}>
        <circle r={r} fill="none" stroke={LINE} strokeWidth="8" />
        <motion.circle r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" transform="rotate(-90)" initial={{ pathLength: pct }}
          {...loop({ pathLength: [pct, pct - 0.12, pct, pct] }, { duration: 5, delay: i * 0.6 })} />
        <motion.circle r="5" fill={color} {...loop({ scale: [1, 1.7, 1], opacity: [1, 0.5, 1] }, { duration: 2.2, delay: i * 0.4 })} />
      </g>
    );
  };
  return (
    <Frame id="mg" label="A monitored AI system: a drift spike crosses the threshold band, raises an alert and is corrected, with accuracy, usage and cost gauges below">
      <rect x="56" y="108" width="448" height="44" rx="8" fill={BR} opacity="0.12" />
      <path d="M56 108H504M56 152H504" stroke={BR} strokeOpacity="0.5" strokeDasharray="4 6" fill="none" />
      <motion.path d="M56 160 C 90 126 110 150 140 132 S 190 146 220 130 S 262 140 290 134 L 322 70 L 352 190 C 372 160 390 138 420 136 S 470 128 504 132"
        fill="none" stroke="url(#mg-g)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 1 }}
        {...loop({ pathLength: [0, 1, 1, 1], opacity: [1, 1, 1, 0] }, { duration: T, times: [0, 0.55, 0.92, 1] })} />
      {/* the spike raises an alert, then the correction lands */}
      <g transform="translate(322 70)">
        <motion.circle r="22" fill={AMBER} initial={{ opacity: 0.2 }} {...loop({ scale: [0, 0, 1.4, 1, 1, 0], opacity: [0, 0, 0.35, 0.15, 0.15, 0] }, { duration: T, times: [0, 0.34, 0.4, 0.5, 0.92, 1] })} />
        <motion.circle r="9" fill={AMBER} {...loop({ scale: [0, 0, 1.25, 1, 1, 0] }, { duration: T, times: [0, 0.34, 0.4, 0.46, 0.92, 1] })} />
      </g>
      <g transform="translate(352 190)">
        <motion.g {...loop({ scale: [0, 0, 1.2, 1, 1, 0] }, { duration: T, times: [0, 0.5, 0.58, 0.64, 0.92, 1] })}>
          <circle r="9" fill={DEEP} stroke={CY} strokeWidth="2.5" />
          <path d="M-4 0l3 3 5-6" fill="none" stroke={CY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </g>
      <path d="M56 232H504" stroke={LINE} />
      {gauge(130, 0.94, CY, 0)}
      {gauge(280, 0.72, BR, 1)}
      {gauge(430, 0.58, PALE, 2)}
    </Frame>
  );
}

/* ------------------------------------------------------ capability --- */
function Capability() {
  const loop = useLoop();
  const tops = [308, 252, 196, 140];
  const counts = [1, 2, 3, 4];
  const T = 7;
  return (
    <Frame id="cb" label="A staircase of AI maturity climbed by a growing team towards a flag at the top">
      {tops.map((t, i) => (
        <g key={i}>
          <motion.rect x={56 + i * 112} y={t} width="108" height={372 - t} rx="9" stroke={LINE} style={BOTTOM}
            fill={i === 3 ? "url(#cb-v)" : "#fff"} fillOpacity={i === 3 ? 0.95 : 0.1 + i * 0.05}
            {...loop({ scaleY: [0, 1, 1, 0] }, { duration: T, times: [i * 0.09, i * 0.09 + 0.12, 0.92, 1] })} />
          {Array.from({ length: counts[i] }, (_, k) => (
            <motion.g key={k} style={BOTTOM}
              {...loop({ scale: [0, 1.15, 1, 1, 0], y: [8, -4, 0, 0, 8] }, { duration: T, times: [i * 0.09 + 0.1 + k * 0.02, i * 0.09 + 0.18 + k * 0.02, i * 0.09 + 0.22 + k * 0.02, 0.92, 1] })}>
              <Person x={56 + i * 112 + 24 + k * 22} y={t - 18} s={0.75 + i * 0.1} fill={k === 0 ? PALE : i === 3 ? CY : "#fff"} op={0.95} />
            </motion.g>
          ))}
        </g>
      ))}
      <motion.path d="M70 288 C 160 270 240 232 330 176 S 440 100 500 82" fill="none" stroke={CY} strokeWidth="2.5" strokeDasharray="3 8" strokeLinecap="round"
        {...loop({ strokeDashoffset: [0, -22] }, { duration: 1.4, ease: "linear" })} />
      <g transform="translate(474 92)">
        <path d="M0 0V-48" stroke={PALE} strokeWidth="3" strokeLinecap="round" />
        <motion.path d="M0 -48h34l-8 11 8 11H0z" fill="url(#cb-g)" style={LEFT} {...loop({ scaleX: [1, 0.8, 1], skewY: [0, -5, 0] }, { duration: 1.8 })} />
      </g>
      <g transform="translate(86 90)" fill="none" stroke={CY} strokeWidth="2" strokeLinecap="round">
        <circle r="26" fill={DEEP} stroke={BR} strokeWidth="2" />
        <motion.g {...loop({ rotate: 360 }, { duration: 14, ease: "linear" })}>
          <circle r="7" />
          <path d="M0 -15V-20M0 15V20M-15 0H-20M15 0H20M-10.6 -10.6l-3.5 -3.5M10.6 10.6l3.5 3.5M-10.6 10.6l-3.5 3.5M10.6 -10.6l3.5 -3.5" />
        </motion.g>
      </g>
    </Frame>
  );
}

/* -------------------------------------------------------- research --- */
function Research() {
  const loop = useLoop();
  const T = 8;
  return (
    <Frame id="rd" label="Ideas passing through a feasibility gate, a prototype stage and a second gate to become a product">
      <path d="M60 218H500" stroke={LINE} strokeWidth="12" strokeLinecap="round" />
      <motion.path d="M60 218H500" stroke="url(#rd-g)" strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" fill="none"
        {...loop({ strokeDashoffset: [0, -22] }, { duration: 1.4, ease: "linear" })} />
      {/* ideas stream in; weaker ones drop out at each gate, the rest carry on */}
      {[
        { dy: 0, stop: 500, pass: true, d: 0 },
        { dy: 0, stop: 500, pass: true, d: 0.2 },
        { dy: 90, stop: 232, pass: false, d: 0.1 },
        { dy: 90, stop: 232, pass: false, d: 0.3 },
        { dy: 90, stop: 410, pass: false, d: 0.15 },
      ].map((p, i) => (
        <motion.circle key={i} r={5 + (i % 3) * 1.5} fill={p.pass ? PALE : "#fff"} initial={{ opacity: 0, cx: 60, cy: 218 }}
          {...loop(
            p.pass
              ? { cx: [60, 470], cy: [218, 218], opacity: [0, 1, 1, 0] }
              : { cx: [60, p.stop - 20, p.stop + 6], cy: [218, 218, 218 + p.dy], opacity: [0, 1, 0] },
            { duration: p.pass ? 3.6 : 2.6, delay: i * 1.4 + p.d, repeatDelay: T - (p.pass ? 3.6 : 2.6) - 0.2, ease: "easeInOut" },
          )} />
      ))}
      <circle cx="140" cy="218" r="52" fill={DEEP} stroke={BR} strokeWidth="2" />
      <g fill="none" stroke={CY} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M130 196h20M134 196v16l-14 24a5 5 0 0 0 4.4 7.5h31.2a5 5 0 0 0 4.4-7.5L146 212v-16" />
        <path d="M126 232h28" />
      </g>
      <motion.circle cx="146" cy="226" r="3" fill={PALE} {...loop({ y: [0, -14, -26], opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }, { duration: 2.2 })} />
      <motion.g {...loop({ scale: [1, 1.14, 1] }, { duration: 2.6, delay: 0.4 })}>
        <path d="M230 188l30 30-30 30-30-30z" fill={DEEP} stroke={CY} strokeWidth="2.5" filter="url(#rd-glow)" />
        <path d="M220 218l7 7 14-15" fill="none" stroke={CY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      <circle cx="320" cy="218" r="52" fill={DEEP} stroke={BR} strokeWidth="2" />
      <motion.g {...loop({ scale: [1, 1.07, 1] }, { duration: 2.6, delay: 0.8 })}>
        <g fill="none" stroke={CY} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M320 192l24 13v26l-24 13-24-13v-26z" />
          <path d="M296 205l24 13 24-13M320 218v26" />
        </g>
      </motion.g>
      <motion.g {...loop({ scale: [1, 1.14, 1] }, { duration: 2.6, delay: 1.2 })}>
        <path d="M410 188l30 30-30 30-30-30z" fill={DEEP} stroke={CY} strokeWidth="2.5" filter="url(#rd-glow)" />
        <path d="M400 218l7 7 14-15" fill="none" stroke={CY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      <g transform="translate(486 218)">
        <motion.g {...loop({ y: [0, -7, 0] }, { duration: 2.4 })}>
          <rect x="-38" y="-48" width="76" height="96" rx="14" fill="url(#rd-g)" opacity="0.95" />
          <path d="M0 -30c10 8 14 20 12 34H-12c-2-14 2-26 12-34z" fill={DEEP} />
          <circle cx="0" cy="-6" r="5" fill={CY} />
          <path d="M-12 8l-8 12h8M12 8l8 12h-8" fill={DEEP} />
        </motion.g>
      </g>
      {[140, 320, 486].map((x, i) => (
        <g key={x}>
          {[0, 1, 2].map((k) => (
            <motion.rect key={k} x={x - 22 + k * 16} y={338 - (k + 1) * (6 + i * 5)} width="10" height={(k + 1) * (6 + i * 5)} rx="2.5" fill={k <= i ? CY : DIM} style={BOTTOM}
              {...loop({ scaleY: [0, 1, 1, 0] }, { duration: T, times: [0.05 + i * 0.22 + k * 0.04, 0.15 + i * 0.22 + k * 0.04, 0.92, 1] })} />
          ))}
        </g>
      ))}
    </Frame>
  );
}

const ART: Record<ArtKey, () => React.ReactElement> = {
  hub: Hub,
  strategy: Strategy,
  leadership: Leadership,
  caio: Caio,
  proof: Proof,
  embedded: Embedded,
  managed: Managed,
  capability: Capability,
  research: Research,
};

export function ServiceArt({ name, className }: { name: ArtKey; className?: string }) {
  const Art = ART[name];
  return <div className={className}><Art /></div>;
}
