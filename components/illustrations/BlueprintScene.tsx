"use client";

import { motion, useReducedMotion } from "framer-motion";
import { box, iso, planeMatrix } from "@/lib/iso";

/**
 * "Strategy & Blueprint": an architect's sheet with the target AI architecture
 * floating above it as four layers (data → models → apps → governance), a
 * numbered roadmap route across the sheet ending in a flag, an ROI card and a
 * compass.
 *
 * Same visual language as the other Expertise scenes: key light top-left (top
 * faces white, +y faces mid, +x faces darkest), teal ink for objects, cyan only
 * on the route and the "live" edges.
 */
const INK = "#1f5c6c";
const LINE = "#c9dbe0";
const GRIDLINE = "#cfe3e8";
const EASE = [0.22, 1, 0.36, 1] as const;

const W = 330; // sheet
const D = 300;
const SX = 130; // stack origin and size
const SY = 40;
const SS = 130;
const LAYERS = [
  { z: 14, label: "Data" },
  { z: 48, label: "Models" },
  { z: 82, label: "Apps" },
  { z: 116, label: "Governance" },
];
const SLAB_H = 10;

const ROUTE = "M30 262 C70 262 70 232 110 232 S 160 252 200 250 S 240 222 268 232";
const PINS: { x: number; y: number; n: string }[] = [
  { x: 110, y: 232, n: "1" },
  { x: 200, y: 250, n: "2" },
];

const pts = (l: [number, number][]) => l.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

function Pin({ x, y, n }: { x: number; y: number; n: string }) {
  const [px, py] = iso(x, y, 0);
  return (
    <g transform={`translate(${px.toFixed(1)} ${py.toFixed(1)})`}>
      <ellipse cx="0" cy="1" rx="9" ry="3.5" fill="#0c2631" opacity="0.14" />
      <path d="M0 0 C-5 -9 -13 -16 -13 -25 a13 13 0 1 1 26 0 c0 9 -8 16 -13 25z" fill={INK} />
      <circle cx="0" cy="-25" r="8.5" fill="#fff" />
      <text x="0" y="-21.3" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} fontFamily="var(--font-sans)">{n}</text>
    </g>
  );
}

export function BlueprintScene({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const sheet = box(0, 0, -6, W, D, 6);
  const [cx, cy] = iso(SX + SS / 2, SY + SS / 2, LAYERS[3].z + SLAB_H);
  const [fx, fy] = iso(268, 232, 0);

  return (
    <svg viewBox="-280 -140 600 480" className={className} role="img" aria-label="Isometric blueprint: a four-layer target architecture, a numbered roadmap route and an ROI chart">
      <defs>
        <filter id="bp-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="bp-ribbon" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#8fe4f4" stopOpacity="0.85" />
          <stop offset="1" stopColor="#b9eef7" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="bp-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#7fd3e3" />
          <stop offset="1" stopColor="#00b4d8" />
        </linearGradient>
      </defs>

      {/* the sheet */}
      <motion.g
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <polygon points={pts([iso(10, 10, -6), iso(W + 10, 10, -6), iso(W + 10, D + 10, -6), iso(10, D + 10, -6)])} fill="#0c2631" opacity="0.1" filter="url(#bp-blur)" />
        <polygon points={sheet.left} fill="#e6eff2" stroke={LINE} strokeLinejoin="round" />
        <polygon points={sheet.right} fill="#d3e2e7" stroke={LINE} strokeLinejoin="round" />
        <polygon points={sheet.top} fill="#fff" fillOpacity="0.85" stroke={LINE} strokeLinejoin="round" />
        <g transform={planeMatrix(0, 0, 0)}>
          <g stroke={GRIDLINE} strokeWidth="1">
            {Array.from({ length: W / 30 - 1 }, (_, i) => 30 + i * 30).map((v) => <line key={`v${v}`} x1={v} y1={0} x2={v} y2={D} />)}
            {Array.from({ length: D / 30 - 1 }, (_, i) => 30 + i * 30).map((v) => <line key={`h${v}`} x1={0} y1={v} x2={W} y2={v} />)}
          </g>
          {/* crop marks */}
          <g stroke="#9fc9d3" strokeWidth="1.5" fill="none">
            <path d="M8 22V8h14" />
            <path d={`M${W - 22} 8h14v14`} />
            <path d={`M8 ${D - 22}v14h14`} />
          </g>
          {/* title block */}
          <rect x={W - 116} y={D - 52} width="100" height="38" rx="3" fill="none" stroke="#bcd6dd" />
          <line x1={W - 116} y1={D - 38} x2={W - 16} y2={D - 38} stroke="#bcd6dd" />
          <rect x={W - 108} y={D - 47} width="46" height="4" rx="2" fill="#bcd6dd" />
          <rect x={W - 108} y={D - 30} width="70" height="3" rx="1.5" fill="#d3e4e9" />
          <rect x={W - 108} y={D - 23} width="52" height="3" rx="1.5" fill="#d3e4e9" />
          {/* compass */}
          <g transform="translate(46 46)">
            <circle r="24" fill="#fff" fillOpacity="0.7" stroke="#bcd6dd" />
            <circle r="17" fill="none" stroke="#d3e4e9" strokeDasharray="2 4" />
            <polygon points="0,-20 5,0 0,20 -5,0" fill="#8fe4f4" opacity="0.5" />
            <polygon points="0,-20 5,0 -5,0" fill={INK} />
          </g>
          <line x1="0" y1={D} x2={W} y2={D} stroke="#8fe4f4" strokeWidth="2" />
        </g>

        {/* roadmap route */}
        <g transform={planeMatrix(0, 0, 0)} fill="none" strokeLinecap="round">
          <motion.path
            d={ROUTE}
            stroke="url(#bp-ribbon)"
            strokeWidth="16"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.7, ease: EASE }}
          />
          <path d={ROUTE} stroke="#fff" strokeOpacity="0.9" strokeWidth="2" strokeDasharray="2 14" className="animate-dash" />
          <circle cx="30" cy="262" r="6" fill="#fff" stroke={INK} strokeWidth="2" />
          {!reduce && (
            <circle r="5" fill="#00b4d8" stroke="#fff" strokeWidth="2">
              <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE} />
            </circle>
          )}
        </g>
        {PINS.map((p) => <Pin key={p.n} {...p} />)}
        {/* finish flag */}
        <g transform={`translate(${fx.toFixed(1)} ${fy.toFixed(1)})`}>
          <ellipse cx="0" cy="1" rx="11" ry="4" fill="#0c2631" opacity="0.14" />
          <line x1="0" y1="0" x2="0" y2="-54" stroke="#8aa3aa" strokeWidth="3" strokeLinecap="round" />
          <path className="animate-wave" d="M2 -53 C14 -59 24 -48 40 -53 L35 -34 C22 -29 13 -40 2 -34 Z" fill="#fff" stroke="#c9d6da" strokeLinejoin="round" style={{ transformOrigin: "2px -43px" }} />
        </g>

        {/* the target architecture, floating above the sheet */}
        <motion.g
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          <ellipse cx={iso(SX + SS / 2, SY + SS / 2, 0)[0]} cy={iso(SX + SS / 2, SY + SS / 2, 0)[1] + 8} rx="92" ry="34" fill="#0c2631" opacity="0.1" filter="url(#bp-blur)" />
          <g className="animate-float" style={{ animationDuration: "8s" }}>
            {LAYERS.map((l, i) => {
              const top = i === LAYERS.length - 1;
              const b = box(SX, SY, l.z, SS, SS, SLAB_H);
              const next = LAYERS[i + 1];
              const [rx, ry] = iso(SX + SS, SY, l.z + SLAB_H / 2);
              const w = l.label.length * 6.8 + 30;
              return (
                <g key={l.label}>
                  {/* corner posts up to the next layer */}
                  {next &&
                    [[SX + 10, SY + SS - 10], [SX + SS - 10, SY + SS - 10], [SX + SS - 10, SY + 10]].map(([x, y], k) => {
                      const [x1, y1] = iso(x, y, l.z + SLAB_H);
                      const [, y2] = iso(x, y, next.z);
                      return <line key={k} x1={x1} y1={y1} x2={x1} y2={y2} stroke="#9fc9d3" strokeWidth="1.5" strokeDasharray="3 4" />;
                    })}
                  <polygon points={b.left} fill="#e6eff2" stroke={LINE} strokeLinejoin="round" strokeWidth="1.3" />
                  <polygon points={b.right} fill="#d3e2e7" stroke={LINE} strokeLinejoin="round" strokeWidth="1.3" />
                  <polygon points={b.top} fill={top ? "#e8f8fb" : "#fff"} stroke={top ? "#8fe4f4" : LINE} strokeLinejoin="round" strokeWidth="1.3" />

                  {/* layer content, drawn flat on the slab */}
                  <g transform={planeMatrix(0, 0, l.z + SLAB_H)} fill="none" strokeLinecap="round">
                    {i === 0 &&
                      [0, 1, 2].flatMap((r) => [0, 1, 2, 3].map((c) => (
                        <circle key={`${r}${c}`} cx={SX + 24 + c * 26} cy={SY + 30 + r * 26} r="5" fill="#e1eef2" stroke="#bcd6dd" />
                      )))}
                    {i === 1 &&
                      [0, 1, 2].map((c) => (
                        <rect key={c} x={SX + 20 + c * 34} y={SY + 38} width="26" height="54" rx="5" fill="#e7f7fb" stroke="#8fe4f4" />
                      ))}
                    {i === 2 &&
                      [34, 56, 78, 100].map((y, k) => (
                        <line key={y} x1={SX + 22} y1={SY + y} x2={SX + SS - 22 - (k % 2) * 26} y2={SY + y} stroke="#cfe3e8" strokeWidth="5" />
                      ))}
                    {top && (
                      <g>
                        <rect x={SX + SS / 2 - 22} y={SY + SS / 2 - 22} width="44" height="44" rx="7" fill="#fff" stroke={INK} strokeWidth="2" />
                        <rect x={SX + SS / 2 - 11} y={SY + SS / 2 - 11} width="22" height="22" rx="4" fill="#8fe4f4" stroke={INK} strokeWidth="1.5" className="animate-glow" />
                        {[-12, 0, 12].map((o) => (
                          <g key={o} stroke={INK} strokeWidth="2">
                            <line x1={SX + SS / 2 + o} y1={SY + SS / 2 - 22} x2={SX + SS / 2 + o} y2={SY + SS / 2 - 30} />
                            <line x1={SX + SS / 2 + o} y1={SY + SS / 2 + 22} x2={SX + SS / 2 + o} y2={SY + SS / 2 + 30} />
                            <line x1={SX + SS / 2 - 22} y1={SY + SS / 2 + o} x2={SX + SS / 2 - 30} y2={SY + SS / 2 + o} />
                            <line x1={SX + SS / 2 + 22} y1={SY + SS / 2 + o} x2={SX + SS / 2 + 30} y2={SY + SS / 2 + o} />
                          </g>
                        ))}
                      </g>
                    )}
                  </g>

                  {/* layer label */}
                  <line x1={rx} y1={ry} x2={rx + 22} y2={ry} stroke="#9fc9d3" strokeWidth="1.2" strokeDasharray="2 3" />
                  <g transform={`translate(${(rx + 22).toFixed(1)} ${ry.toFixed(1)})`}>
                    <rect x="0" y="-12" width={w} height="24" rx="12" fill="#fff" stroke={LINE} />
                    <circle cx="12" cy="0" r="3.5" fill="#00b4d8" />
                    <text x="22" y="4" fontSize="11.5" fontWeight="600" fill={INK} fontFamily="var(--font-sans)">{l.label}</text>
                  </g>
                </g>
              );
            })}
            {/* live ring above the top layer */}
            <ellipse cx={cx} cy={cy - 6} rx="34" ry="12" fill="none" stroke="#8fe4f4" strokeWidth="1.5" strokeDasharray="3 5" className="animate-dash" />
          </g>
        </motion.g>

        {/* ROI card */}
        <motion.g
          initial={reduce ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
        >
          <g transform="translate(-196 14)">
            <g className="animate-float" style={{ animationDelay: "0.6s", animationDuration: "7s" }}>
              <rect x="-4" y="-2" width="92" height="74" rx="10" fill="#0c2631" opacity="0.1" filter="url(#bp-blur)" />
              <rect x="0" y="-8" width="92" height="74" rx="10" fill="#fff" stroke="#dbe7ea" />
              <rect x="10" y="2" width="30" height="4" rx="2" fill="#d3e4e9" />
              {[16, 26, 38, 52].map((h, i) => (
                <rect key={i} x={14 + i * 18} y={56 - h} width="11" height={h} rx="3" fill="url(#bp-bar)" opacity={0.45 + i * 0.18} />
              ))}
              <path d="M14 42 L34 32 L52 36 L80 14" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M72 12 L81 13 L79 22" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </motion.g>
      </motion.g>
    </svg>
  );
}
