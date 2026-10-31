"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Light isometric "journey" scene for the Expertise tabs: three stepped white
 * slabs joined by a translucent ribbon route, each carrying one object and a
 * small icon card, over a faint blueprint sheet. `variant` swaps the objects
 * and glyphs per tab.
 *
 * Same lighting rule as the dark hero art: key light top-left, so top faces
 * are white, +y faces mid-grey-teal and +x faces darkest; cyan is the only
 * accent and only appears on the route.
 */
type Variant = "trust" | "blueprint" | "competency";
type Obj = "magnifier" | "ring" | "flag" | "shield" | "cap";

const C = 0.866;
const S = 0.5;
type Pt = [number, number];
const iso = (x: number, y: number, z = 0): Pt => [(x - y) * C, (x + y) * S - z];
const pts = (l: Pt[]) => l.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");
const ground = (z: number) => `matrix(${C} ${S} ${-C} ${S} 0 ${-z})`;

function box(x: number, y: number, z: number, w: number, d: number, h: number) {
  const t = z + h;
  return {
    top: pts([iso(x, y, t), iso(x + w, y, t), iso(x + w, y + d, t), iso(x, y + d, t)]),
    left: pts([iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, t), iso(x, y + d, t)]),
    right: pts([iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, t), iso(x + w, y, t)]),
    rim: pts([iso(x, y + d, t), iso(x + w, y + d, t), iso(x + w, y, t)]),
  };
}

const INK = "#1f5c6c";
const LINE = "#c9dbe0";

const GLYPH: Record<string, React.ReactNode> = {
  db: <g><ellipse cx="12" cy="6" rx="7" ry="2.5" /><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></g>,
  scale: <g><path d="M12 4v16M6 20h12M4 9h16" /><path d="M4 9l-2 5a2.5 2.5 0 005 0L4 9zM20 9l-2 5a2.5 2.5 0 005 0l-3-5z" /></g>,
  lock: <g><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3M12 14v2" /></g>,
  bulb: <g><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z" /></g>,
  target: <g><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 12l6-6" /></g>,
  flag: <g><path d="M6 21V4M6 5h11l-2 4 2 4H6" /></g>,
  book: <g><path d="M4 5c3-1 6-1 8 1v14c-2-2-5-2-8-1V5zM20 5c-3-1-6-1-8 1v14c2-2 5-2 8-1V5z" /></g>,
  users: <g><circle cx="9" cy="8" r="3" /><path d="M3 19c.7-3 3-5 6-5s5.3 2 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14c2.4.2 4.2 2 5 5" /></g>,
  award: <g><circle cx="12" cy="9" r="5" /><path d="M9 13.5L8 21l4-2 4 2-1-7.5" /></g>,
};

type Stage = { obj: Obj; badge: keyof typeof GLYPH; flat: boolean };
const SETS: Record<Variant, Stage[]> = {
  trust: [
    { obj: "magnifier", badge: "db", flat: true },
    { obj: "shield", badge: "scale", flat: false },
    { obj: "flag", badge: "lock", flat: false },
  ],
  blueprint: [
    { obj: "magnifier", badge: "bulb", flat: true },
    { obj: "ring", badge: "target", flat: false },
    { obj: "flag", badge: "flag", flat: false },
  ],
  competency: [
    { obj: "cap", badge: "book", flat: true },
    { obj: "ring", badge: "users", flat: false },
    { obj: "flag", badge: "award", flat: false },
  ],
};

const SIZE = 84;
const STEP = 168;
const SLAB_H = 14;
const RISE = 10;
const ROUTE = "M42 30 C150 -20 -66 -60 42 -126 C150 -176 -66 -228 42 -294";
const EASE = [0.22, 1, 0.36, 1] as const;

/** Objects are drawn upright in screen space with their feet at (0, 0). */
function Object3D({ kind }: { kind: Obj }) {
  switch (kind) {
    case "magnifier":
      return (
        <g>
          <ellipse cx="-6" cy="2" rx="30" ry="8" fill="#0c2631" opacity="0.1" />
          <line x1="-16" y1="-18" x2="-40" y2="4" stroke="#8aa3aa" strokeWidth="8" strokeLinecap="round" />
          <circle cx="0" cy="-38" r="25" fill="#dff3f7" fillOpacity="0.55" stroke="#a9bcc2" strokeWidth="6" />
          <circle cx="0" cy="-38" r="19" fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="1.5" />
          <path d="M-12 -48 a14 14 0 0 1 12 -8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        </g>
      );
    case "ring":
      return (
        <g>
          <ellipse cx="2" cy="2" rx="28" ry="8" fill="#0c2631" opacity="0.1" />
          <ellipse cx="7" cy="-36" rx="26" ry="33" fill="#aec4cb" />
          <ellipse cx="0" cy="-38" rx="26" ry="33" fill="#fff" stroke="#c9d6da" />
          <ellipse cx="0" cy="-38" rx="21" ry="27" fill={INK} />
          <ellipse cx="0" cy="-38" rx="14.5" ry="19" fill="#fff" />
          <ellipse cx="0" cy="-38" rx="8" ry="10.5" fill={INK} />
        </g>
      );
    case "flag":
      return (
        <g>
          <ellipse cx="0" cy="0" rx="12" ry="5.5" fill="#c4d3d8" />
          <ellipse cx="0" cy="-1" rx="7" ry="3.2" fill="#fff" stroke="#b3c5cb" />
          <line x1="0" y1="-2" x2="0" y2="-96" stroke="#8aa3aa" strokeWidth="3" strokeLinecap="round" />
          <path className="animate-wave" d="M2 -94 C16 -102 28 -86 46 -94 L40 -70 C26 -62 14 -78 2 -70 Z" fill="#fff" stroke="#c9d6da" strokeLinejoin="round" style={{ transformOrigin: "2px -82px" }} />
        </g>
      );
    case "shield":
      return (
        <g>
          <ellipse cx="2" cy="2" rx="26" ry="7" fill="#0c2631" opacity="0.1" />
          <path d="M0 -84 L30 -72 V-42 C30 -22 16 -8 0 0 C-16 -8 -30 -22 -30 -42 V-72 Z" fill="#aec4cb" transform="translate(6 0)" />
          <path d="M0 -84 L30 -72 V-42 C30 -22 16 -8 0 0 C-16 -8 -30 -22 -30 -42 V-72 Z" fill="#fff" stroke="#c9d6da" />
          <path d="M0 -74 L22 -65 V-42 C22 -27 12 -16 0 -9 C-12 -16 -22 -27 -22 -42 V-65 Z" fill={INK} />
          <path d="M-9 -42 l6 6 12 -13" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "cap":
      return (
        <g>
          <ellipse cx="0" cy="2" rx="30" ry="8" fill="#0c2631" opacity="0.1" />
          <path d="M-22 -30 V-14 C-10 -4 10 -4 22 -14 V-30" fill="#2d7385" stroke="#1a4a58" strokeLinejoin="round" />
          <path d="M0 -62 L40 -44 L0 -26 L-40 -44 Z" fill={INK} stroke="#133c48" strokeLinejoin="round" />
          <path d="M0 -62 L40 -44 L0 -44 Z" fill="#fff" opacity="0.14" />
          <path d="M34 -42 V-18" stroke="#8fe4f4" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="34" cy="-15" r="3.4" fill="#8fe4f4" />
        </g>
      );
  }
}

function Badge({ glyph, x, y, delay }: { glyph: React.ReactNode; x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="animate-float" style={{ animationDelay: `${delay}s` }}>
        <rect x="-17" y="-15" width="34" height="34" rx="7" fill="#0c2631" opacity="0.08" filter="url(#jp-blur)" />
        <rect x="-17" y="-17" width="34" height="34" rx="7" fill="#fff" stroke="#dbe7ea" />
        <g transform="translate(-10 -10) scale(0.84)" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {glyph}
        </g>
      </g>
    </g>
  );
}

export function JourneyPath({ variant = "trust", className }: { variant?: Variant; className?: string }) {
  const reduce = useReducedMotion();
  const stages = SETS[variant];

  // far stage first so near slabs overlap it
  const order = [2, 1, 0];

  return (
    <svg viewBox="-120 -330 520 500" className={className} role="img" aria-label="Isometric roadmap: three steps joined by a glowing route">
      <defs>
        <filter id="jp-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id="jp-ribbon" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#8fe4f4" stopOpacity="0.85" />
          <stop offset="1" stopColor="#b9eef7" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Blueprint sheet */}
      <g transform={ground(0)}>
        <rect x="30" y="-380" width="300" height="420" rx="6" fill="#fff" fillOpacity="0.55" stroke={LINE} />
        <g stroke="#cfe3e8" strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => 66 + i * 30).map((v) => <line key={`v${v}`} x1={v} y1={-380} x2={v} y2={40} />)}
          {Array.from({ length: 13 }, (_, i) => -350 + i * 32).map((v) => <line key={`h${v}`} x1={30} y1={v} x2={330} y2={v} />)}
        </g>
        <rect x="150" y="-110" width="150" height="110" fill="none" stroke="#bcd6dd" />
        <rect x="170" y="-90" width="60" height="30" fill="#e7f3f6" stroke="#bcd6dd" />
        <path d="M30 40 H330" stroke="#8fe4f4" strokeWidth="1.5" />
      </g>

      {/* Route */}
      <g transform={ground(8)} fill="none" strokeLinecap="round">
        <motion.path
          d={ROUTE}
          stroke="url(#jp-ribbon)"
          strokeWidth="30"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
        />
        <path d={ROUTE} stroke="#fff" strokeOpacity="0.85" strokeWidth="2" strokeDasharray="2 20" className="animate-dash" />
        {!reduce && (
          <circle r="6" fill="#00b4d8" stroke="#fff" strokeWidth="2">
            <animateMotion dur="6s" repeatCount="indefinite" path={ROUTE} />
          </circle>
        )}
      </g>

      {order.map((k) => {
        const st = stages[k];
        const y0 = -STEP * k;
        const z0 = k * RISE;
        const zTop = z0 + SLAB_H;
        const b = box(0, y0, z0, SIZE, SIZE, SLAB_H);
        const lip = box(8, y0 + 8, zTop, SIZE - 16, SIZE - 16, 3);
        const [cx, cy] = iso(SIZE / 2, y0 + SIZE / 2, zTop + 3);
        const shadow = pts([iso(10, y0 + 10, z0), iso(SIZE + 26, y0 + 10, z0), iso(SIZE + 26, y0 + SIZE + 26, z0), iso(10, y0 + SIZE + 26, z0)]);
        const [tx, ty] = iso(SIZE * 0.68, y0 + SIZE * 0.72, zTop + 3);
        const ox = st.obj === "flag" || st.obj === "ring" || st.obj === "shield" ? 0 : -16;
        return (
          <motion.g
            key={k}
            initial={reduce ? false : { y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1 + (2 - k) * 0.18, ease: EASE }}
          >
            <polygon points={shadow} fill="#0c2631" opacity="0.14" filter="url(#jp-blur)" />
            <polygon points={b.left} fill="#e6eff2" stroke={LINE} strokeLinejoin="round" strokeWidth="1.4" />
            <polygon points={b.right} fill="#d3e2e7" stroke={LINE} strokeLinejoin="round" strokeWidth="1.4" />
            <polygon points={b.top} fill="#fff" stroke={LINE} strokeLinejoin="round" strokeWidth="1.4" />
            <polygon points={lip.top} fill="#f4f9fa" stroke="#e1ecef" strokeLinejoin="round" />
            <polyline points={b.rim} fill="none" stroke="#8fe4f4" strokeOpacity="0.7" strokeWidth="1.4" strokeLinejoin="round" />

            {st.flat && (
              <g>
                <polygon points={box(SIZE * 0.5, y0 + SIZE * 0.5, zTop + 3, 38, 38, 4).top} fill="#fff" stroke={LINE} />
                <polygon points={box(SIZE * 0.5, y0 + SIZE * 0.5, zTop + 3, 38, 38, 4).left} fill="#e6eff2" stroke={LINE} />
                <polygon points={box(SIZE * 0.5, y0 + SIZE * 0.5, zTop + 3, 38, 38, 4).right} fill="#d3e2e7" stroke={LINE} />
                <g
                  transform={`${ground(zTop + 7)} translate(${SIZE * 0.5 + 8} ${y0 + SIZE * 0.5 + 8}) scale(0.9)`}
                  fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                >
                  {GLYPH[st.badge]}
                </g>
              </g>
            )}

            <g transform={`translate(${cx + ox} ${cy - (st.flat ? 4 : 0)})`}>
              <g className="animate-float" style={{ animationDelay: `${k * 0.7}s`, animationDuration: "7s" }}>
                <Object3D kind={st.obj} />
              </g>
            </g>

            {!st.flat && <Badge glyph={GLYPH[st.badge]} x={tx + 26} y={ty - 86} delay={0.4 + k * 0.5} />}
          </motion.g>
        );
      })}
    </svg>
  );
}
