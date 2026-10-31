"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero art: a 3×3 grid of glass and graphite tiles on a stepped, glowing
 * plate, a holographic cube hovering over a stepped socket in the centre,
 * and a staircase of chips on a satellite slab. Pure SVG: sharp at any size,
 * a few KB, and every moving part is a transform or opacity change.
 *
 * Depth rules, applied everywhere so it reads as one lit object:
 *  - one key light, top-left: top faces light, +y faces mid, +x faces dark
 *  - cyan light only comes from the rim, the gaps and the cube, so every
 *    cyan edge sits where the glow would physically reach
 *  - contact shadows under every solid, atmospheric fade on the ground grid
 */

// True isometric camera (30°), measured from the plate corners in the Figma render.
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
    // front-most top edges, used for rim light
    rim: pts([iso(x, y + d, t), iso(x + w, y + d, t), iso(x + w, y, t)]),
    // back-most top edges, used for the key-light highlight
    lit: pts([iso(x, y + d, t), iso(x, y, t), iso(x + w, y, t)]),
  };
}

const T = 112; // tile
const G = 9; // gap
const N = 3 * T + 2 * G; // 354
const PAD = 16;
const Z0 = -8; // tile base plane
const EASE = [0.22, 1, 0.36, 1] as const;

// [row (y), col (x)] → height / material. Varied heights are what stop the
// grid reading as a flat checkerboard.
const H = [
  [24, 27, 30],
  [28, 0, 27],
  [25, 30, 22],
];
const GLASS = new Set(["0,1", "0,2"]);

const tiles = [0, 1, 2]
  .flatMap((r) => [0, 1, 2].map((c) => ({ r, c, x: c * (T + G), y: r * (T + G), h: H[r][c] })))
  .filter((t) => !(t.r === 1 && t.c === 1))
  .sort((a, b) => a.x + a.y - (b.x + b.y));

const CX = T + G + T / 2; // centre of the plate

const traces = [
  // back / left
  "M-16 70 H-90 V130 H-170",
  "M-16 210 H-84",
  "M-16 300 H-60 V350 H-140",
  "M70 -16 V-80 H140",
  "M200 -16 V-64",
  // front
  "M70 370 V430 H150 V496",
  "M196 370 V450",
  "M300 370 V410 H368 V470",
  // bridge to the chip slab
  "M370 120 H452",
  "M370 210 H452",
  "M370 300 H420 V272 H452",
];
const pads: Pt[] = [[-170, 130], [-84, 210], [-140, 350], [140, -80], [200, -64], [150, 496], [196, 450], [368, 470]];

const chips = [
  { y: 64, h: 30 },
  { y: 146, h: 24 },
  { y: 228, h: 18 },
];

function Tile({ x, y, h, glass, order, reduce }: { x: number; y: number; h: number; glass: boolean; order: number; reduce: boolean | null }) {
  const t = Z0 + h;
  const b = box(x, y, Z0, T, T, h);
  const inset = box(x + 5, y + 5, Z0, T - 10, T - 10, h);
  const dist = Math.hypot(x + T / 2 - CX, y + T / 2 - CX) / 100;
  const shadow = pts([iso(x + 6, y + 6, Z0), iso(x + T + 16, y + 6, Z0), iso(x + T + 16, y + T + 16, Z0), iso(x + 6, y + T + 16, Z0)]);
  return (
    <motion.g
      initial={reduce ? false : { y: -46, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 + order * 0.07, ease: EASE }}
    >
      <polygon points={shadow} fill="#000" opacity="0.5" filter="url(#hc-shadow)" />
      {glass ? (
        <>
          {/* back edges seen through the glass */}
          <polyline
            points={pts([iso(x, y + T, Z0), iso(x, y, Z0), iso(x + T, y, Z0)])}
            fill="none" stroke="#7fe8f5" strokeOpacity="0.2" strokeWidth="1"
          />
          <line x1={iso(x, y, Z0)[0]} y1={iso(x, y, Z0)[1]} x2={iso(x, y, t)[0]} y2={iso(x, y, t)[1]} stroke="#7fe8f5" strokeOpacity="0.25" />
          <polygon points={b.left} fill="url(#hc-glassL)" stroke="#9bf0fa" strokeOpacity="0.35" strokeLinejoin="round" />
          <polygon points={b.right} fill="url(#hc-glassR)" stroke="#9bf0fa" strokeOpacity="0.25" strokeLinejoin="round" />
          <polygon points={b.top} fill="url(#hc-glass)" stroke="#bff6ff" strokeOpacity="0.55" strokeLinejoin="round" />
          <polygon points={inset.top} fill="none" stroke="#bff6ff" strokeOpacity="0.18" />
          <polygon points={b.top} fill="url(#hc-sheen)" opacity="0.8" />
        </>
      ) : (
        <>
          <polygon points={b.left} fill="url(#hc-left)" stroke="#05090a" strokeWidth="1" strokeLinejoin="round" />
          <polygon points={b.right} fill="url(#hc-right)" stroke="#05090a" strokeWidth="1" strokeLinejoin="round" />
          <polygon points={b.top} fill="#1c2427" stroke="#05090a" strokeWidth="1" strokeLinejoin="round" />
          <polygon points={inset.top} fill="url(#hc-top)" stroke="#6c7a7f" strokeOpacity="0.4" strokeWidth="0.8" strokeLinejoin="round" />
          <polygon points={inset.top} fill="url(#hc-sheen)" />
        </>
      )}
      <polyline points={b.lit} fill="none" stroke="#c4d4d8" strokeOpacity={glass ? 0.7 : 0.45} strokeWidth="1" strokeLinejoin="round" />
      <polyline points={b.rim} fill="none" stroke="#2fe0f0" strokeOpacity={glass ? 0.8 : 0.4} strokeWidth="1.2" strokeLinejoin="round" />
      {/* light wave rolling out from the core */}
      <polygon
        points={b.top}
        fill="#2fe0f0"
        opacity="0"
        className="animate-tile-wave"
        style={{ animationDelay: `${dist * 0.55}s` }}
      />
    </motion.g>
  );
}

export function HeroChip({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // Plate
  const ledge = box(-PAD - 8, -PAD - 8, -42, N + 2 * PAD + 16, N + 2 * PAD + 16, 12);
  const slab = box(-PAD, -PAD, -30, N + 2 * PAD, N + 2 * PAD, 16);
  const inner = box(-10, -10, -14, N + 20, N + 20, 6);
  const tileBase = [T + G / 2, 2 * T + 1.5 * G];

  // Socket stack under the cube
  const o = T + G;
  const s1 = box(o, o, Z0, T, T, 12);
  const s2 = box(o + 10, o + 10, Z0 + 12, T - 20, T - 20, 10);
  const s3 = box(o + 22, o + 22, Z0 + 22, T - 44, T - 44, 8);
  const zSock = Z0 + 30;
  const zCube = zSock + 32;
  const cs = 68;
  const outer = box(CX - cs / 2, CX - cs / 2, zCube, cs, cs, cs);
  const core = box(CX - 15, CX - 15, zCube + 17, 30, 30, 30);
  const [hx, hy] = iso(CX, CX, zCube + cs / 2);
  const [bx, by] = iso(CX, CX, zSock);
  const [, topY] = iso(CX, CX, zCube);

  // Chip slab
  const cslab = box(450, 44, -42, 86, 262, 12);

  return (
    <svg viewBox="-430 -120 880 580" className={className} role="img" aria-label="Isometric AI chip platform with glowing circuitry">
      <defs>
        <linearGradient id="hc-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#56646a" />
          <stop offset="0.5" stopColor="#2e393e" />
          <stop offset="1" stopColor="#192124" />
        </linearGradient>
        <linearGradient id="hc-sheen" x1="0" y1="0" x2="0.7" y2="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.03" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hc-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#222d31" />
          <stop offset="1" stopColor="#0b1113" />
        </linearGradient>
        <linearGradient id="hc-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#131b1e" />
          <stop offset="1" stopColor="#060a0b" />
        </linearGradient>
        <linearGradient id="hc-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fe9f5" stopOpacity="0.34" />
          <stop offset="0.5" stopColor="#2c7e8a" stopOpacity="0.26" />
          <stop offset="1" stopColor="#0c3d47" stopOpacity="0.42" />
        </linearGradient>
        <linearGradient id="hc-glassL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4bbccb" stopOpacity="0.45" />
          <stop offset="1" stopColor="#0b3640" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="hc-glassR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c6a76" stopOpacity="0.4" />
          <stop offset="1" stopColor="#06242b" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="hc-plate" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10464e" />
          <stop offset="1" stopColor="#062329" />
        </linearGradient>
        <linearGradient id="hc-socket" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b7e8b" />
          <stop offset="1" stopColor="#0a3d46" />
        </linearGradient>
        <linearGradient id="hc-cube" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c4fbff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#00b4d8" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="hc-beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2fe0f0" stopOpacity="0.6" />
          <stop offset="1" stopColor="#2fe0f0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hc-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#4fe9f7" stopOpacity="0.6" />
          <stop offset="0.5" stopColor="#2fe0f0" stopOpacity="0.16" />
          <stop offset="1" stopColor="#2fe0f0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hc-ambient" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#12a9c0" stopOpacity="0.3" />
          <stop offset="1" stopColor="#12a9c0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hc-fade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.35" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="hc-groundmask" maskUnits="userSpaceOnUse" x="-430" y="-120" width="880" height="580">
          <ellipse cx="10" cy="200" rx="440" ry="280" fill="url(#hc-fade)" />
        </mask>
        <filter id="hc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="hc-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="hc-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Ambient light pooling on the floor */}
      <ellipse cx="20" cy="200" rx="470" ry="270" fill="url(#hc-ambient)" />

      {/* Blueprint floor: fine grid + circuit traces, fading to nothing at the edges */}
      <g mask="url(#hc-groundmask)">
        <g transform={ground(-42)}>
          <g stroke="#2fe0f0" strokeOpacity="0.11" strokeWidth="0.8">
            {Array.from({ length: 27 }, (_, i) => -240 + i * 36).map((v) => (
              <g key={v}>
                <line x1={v} y1={-240} x2={v} y2={720} />
                <line x1={-240} y1={v} x2={720} y2={v} />
              </g>
            ))}
          </g>
          <g fill="none" stroke="#2fe0f0" strokeLinecap="round" strokeLinejoin="round">
            {traces.map((d, i) => (
              <g key={d}>
                <path d={d} strokeOpacity="0.22" strokeWidth="1.6" />
                <path d={d} strokeOpacity="0.95" strokeWidth="1.8" strokeDasharray="5 26" className="animate-dash" style={{ animationDelay: `${i * 0.21}s` }} />
              </g>
            ))}
            {pads.map(([x, y]) => (
              <rect key={`${x},${y}`} x={x - 5} y={y - 5} width="10" height="10" rx="2" fill="#07262c" stroke="#2fe0f0" strokeOpacity="0.75" strokeWidth="1.2" />
            ))}
          </g>
        </g>
      </g>

      <motion.g
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
      >
        {/* Plate: ledge, slab, recessed deck */}
        <polygon points={slab.top} fill="#2fe0f0" opacity="0.3" filter="url(#hc-soft)" />
        <polygon points={ledge.left} fill="#050d0f" />
        <polygon points={ledge.right} fill="#03090a" />
        <polygon points={ledge.top} fill="#071a1e" />
        <polygon points={slab.left} fill="#0a1d21" />
        <polygon points={slab.right} fill="#061215" />
        <polygon points={slab.top} fill="url(#hc-plate)" />
        {/* rim light: bright on the right (nearest the glow), dimmer on the left */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#hc-glow)" className="animate-glow">
          <polyline points={pts([iso(-PAD, N + PAD, -14), iso(N + PAD, N + PAD, -14)])} stroke="#2fe0f0" strokeOpacity="0.55" strokeWidth="1.5" />
          <polyline points={pts([iso(N + PAD, N + PAD, -14), iso(N + PAD, -PAD, -14)])} stroke="#4ff0ff" strokeOpacity="0.95" strokeWidth="2" />
        </g>
        <polyline points={slab.lit} fill="none" stroke="#2fe0f0" strokeOpacity="0.28" strokeWidth="1" />
        <polygon points={inner.top} fill="#041a1f" stroke="#2fe0f0" strokeOpacity="0.45" strokeWidth="1" />

        {/* glowing seams in the gaps between tiles */}
        <g transform={ground(-8)} stroke="#2fe0f0" strokeWidth="1.4" filter="url(#hc-glow)" className="animate-glow">
          {tileBase.map((v) => (
            <g key={v}>
              <line x1={v} y1={-4} x2={v} y2={N + 4} />
              <line x1={-4} y1={v} x2={N + 4} y2={v} />
            </g>
          ))}
        </g>

        {/* Tiles behind the socket */}
        {tiles
          .filter((t) => t.x + t.y < o + o)
          .map((t, i) => (
            <Tile key={`${t.r}${t.c}`} {...t} glass={GLASS.has(`${t.r},${t.c}`)} order={i} reduce={reduce} />
          ))}

        {/* Socket stack */}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
        >
          <polygon points={pts([iso(o + 6, o + 6, Z0), iso(o + T + 18, o + 6, Z0), iso(o + T + 18, o + T + 18, Z0), iso(o + 6, o + T + 18, Z0)])} fill="#000" opacity="0.5" filter="url(#hc-shadow)" />
          <polygon points={s1.left} fill="url(#hc-left)" stroke="#05090a" strokeLinejoin="round" />
          <polygon points={s1.right} fill="url(#hc-right)" stroke="#05090a" strokeLinejoin="round" />
          <polygon points={s1.top} fill="url(#hc-top)" stroke="#05090a" strokeLinejoin="round" />
          <polyline points={s1.rim} fill="none" stroke="#2fe0f0" strokeOpacity="0.7" strokeWidth="1.2" />
          <polygon points={s2.left} fill="#0d171a" />
          <polygon points={s2.right} fill="#070d0f" />
          <polygon points={s2.top} fill="url(#hc-top)" stroke="#2fe0f0" strokeOpacity="0.9" strokeWidth="1.4" filter="url(#hc-glow)" strokeLinejoin="round" />
          <polygon points={s3.left} fill="#0b3f48" />
          <polygon points={s3.right} fill="#062a31" />
          <polygon points={s3.top} fill="url(#hc-socket)" stroke="#7fe8f5" strokeWidth="1.2" strokeLinejoin="round" />
          <g transform={ground(zSock)} fill="none" stroke="#bff6ff">
            <rect x={o + 30} y={o + 30} width={T - 60} height={T - 60} rx="3" strokeOpacity="0.7" />
            <rect x={o + 40} y={o + 40} width={T - 80} height={T - 80} rx="2" strokeOpacity="0.9" className="animate-glow" />
          </g>
        </motion.g>

        {/* Tiles in front of the socket */}
        {tiles
          .filter((t) => t.x + t.y >= o + o)
          .map((t, i) => (
            <Tile key={`${t.r}${t.c}`} {...t} glass={GLASS.has(`${t.r},${t.c}`)} order={i + 4} reduce={reduce} />
          ))}

        {/* Cube, beam and rising data motes */}
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          style={{ transformOrigin: `${hx}px ${by}px`, transformBox: "view-box" }}
        >
          <polygon points={pts([[bx - 24, by], [bx + 24, by], [hx + 30, topY + 50], [hx - 30, topY + 50]])} fill="url(#hc-beam)" className="animate-beam" />
          {[-14, 6, 18, -4].map((dx, i) => (
            <circle key={i} cx={bx + dx} cy={by - 4} r="1.6" fill="#c4fbff" className="animate-rise" style={{ animationDelay: `${i * 0.9}s` }} />
          ))}
          <g className="animate-float">
            <ellipse cx={hx} cy={hy} rx="130" ry="100" fill="url(#hc-halo)" className="animate-glow" />
            <polygon points={outer.left} fill="#00b4d8" fillOpacity="0.2" stroke="#9bf0fa" strokeWidth="1.2" strokeLinejoin="round" />
            <polygon points={outer.right} fill="#00b4d8" fillOpacity="0.1" stroke="#9bf0fa" strokeWidth="1.2" strokeLinejoin="round" />
            <polygon points={core.left} fill="#2fe0f0" fillOpacity="0.6" />
            <polygon points={core.right} fill="#12a9c0" fillOpacity="0.45" />
            <polygon points={core.top} fill="#d4fcff" fillOpacity="0.9" filter="url(#hc-glow)" className="animate-glow" />
            <polygon points={outer.top} fill="url(#hc-cube)" stroke="#d4fcff" strokeWidth="1.3" strokeLinejoin="round" filter="url(#hc-glow)" />
          </g>
        </motion.g>

        {/* Chip staircase */}
        <motion.g
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
        >
          <polygon points={cslab.left} fill="#0a1a1e" />
          <polygon points={cslab.right} fill="#050e10" />
          <polygon points={cslab.top} fill="url(#hc-plate)" stroke="#2fe0f0" strokeOpacity="0.55" strokeLinejoin="round" />
          {chips.map(({ y, h }, i) => {
            const base = -30;
            const lo = box(462, y, base, 62, 62, h);
            const up = box(472, y + 10, base + h, 42, 42, 8);
            const sh = pts([iso(468, y + 8, base), iso(540, y + 8, base), iso(540, y + 76, base), iso(468, y + 76, base)]);
            return (
              <g key={y}>
                <polygon points={sh} fill="#000" opacity="0.45" filter="url(#hc-shadow)" />
                <polygon points={lo.left} fill="url(#hc-left)" stroke="#05090a" strokeLinejoin="round" />
                <polygon points={lo.right} fill="url(#hc-right)" stroke="#05090a" strokeLinejoin="round" />
                <polygon points={lo.top} fill="url(#hc-top)" stroke="#05090a" strokeLinejoin="round" />
                <polygon points={lo.top} fill="url(#hc-sheen)" />
                <polyline points={lo.lit} fill="none" stroke="#c4d4d8" strokeOpacity="0.4" />
                <polygon points={up.left} fill="#0d171a" />
                <polygon points={up.right} fill="#070d0f" />
                <polygon points={up.top} fill="url(#hc-top)" stroke="#8ea0a5" strokeOpacity="0.55" strokeLinejoin="round" />
                <polygon points={up.top} fill="url(#hc-sheen)" />
                <polyline points={lo.rim} fill="none" stroke="#2fe0f0" strokeWidth="2" filter="url(#hc-glow)" className="animate-led" style={{ animationDelay: `${i * 0.6}s` }} strokeLinejoin="round" />
              </g>
            );
          })}
        </motion.g>
      </motion.g>
    </svg>
  );
}
