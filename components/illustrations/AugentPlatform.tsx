"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * AuGENT render: a glass-walled vessel with a chrome lip and eight copper
 * posts, four glass agent modules on its axes and a gold octagonal core,
 * linked by cyan circuitry.
 *
 * Built from the Figma frame:
 *  - the vessel is a rounded square (superellipse) whose corners point to the
 *    screen's top / bottom / left / right, so the modules sit on the world
 *    axes (between the corners) and the cyan spokes run to the corners
 *  - one projection (30° isometric) for every layer, so lip, floor, wall and
 *    posts all share the same perspective
 *  - back half of the wall and posts are painted before the modules, the
 *    front half after, which is what makes the glass read as a container
 */

const C = 0.866;
const S = 0.5;
type Pt = [number, number];
const iso = (x: number, y: number, z = 0): Pt => [(x - y) * C, (x + y) * S - z];
const f = (n: number) => n.toFixed(1);
const poly = (l: Pt[]) => l.map(([a, b]) => `${f(a)},${f(b)}`).join(" ");
const path = (l: Pt[], close = true) => `M${l.map(([a, b]) => `${f(a)} ${f(b)}`).join("L")}${close ? "Z" : ""}`;

// ---- vessel geometry -------------------------------------------------------
const EXP = 3.4; // superellipse exponent: corner roundness
const sq = (t: number, R: number): [number, number] => {
  const c = Math.cos(t);
  const s = Math.sin(t);
  return [R * Math.sign(c) * Math.abs(c) ** (2 / EXP), R * Math.sign(s) * Math.abs(s) ** (2 / EXP)];
};
// Scale so the floor is 812 units wide on screen (Figma: 1440 frame).
const unitHalf = Math.max(...Array.from({ length: 360 }, (_, i) => {
  const [x, y] = sq((i / 360) * Math.PI * 2, 1);
  return (x - y) * C;
}));
const R = 406 / unitHalf;

const ZF = -34; // floor height (core top sits at 0)
const ZT = ZF + 88; // top of the glass wall
const DEG = Math.PI / 180;

/** Points along the vessel outline from angle a0 to a1 (degrees). */
const arc = (a0: number, a1: number, scale: number, z: number, steps = 90): Pt[] =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const [x, y] = sq((a0 + ((a1 - a0) * i) / steps) * DEG, R * scale);
    return iso(x, y, z);
  });

// x+y < 0 is the far side. Far arc is 135° → 315°, near arc is -45° → 135°.
const FAR: [number, number] = [135, 315];
const NEAR: [number, number] = [-45, 135];

const wall = (range: [number, number], z0: number, z1: number, s = 0.985) => {
  const top = arc(range[0], range[1], s, z1);
  const bot = arc(range[0], range[1], s, z0).reverse();
  return path([...top, ...bot]);
};

// Eight posts, midway between corners and axes.
const posts = Array.from({ length: 8 }, (_, k) => {
  const t = (22.5 + 45 * k) * DEG;
  const [x, y] = sq(t, R * 0.985);
  return { x, y, far: x + y < 0 };
});

// Corners (spokes run here) and module axes.
const corners = [45, 135, 225, 315].map((a) => sq(a * DEG, R * 0.9));
const D = 205; // module distance from centre along the axes
const modules = [
  { x: -D, y: 0, key: "stack" },
  { x: 0, y: -D, key: "cubes" },
  { x: 0, y: D, key: "swirl" },
  { x: D, y: 0, key: "cross" },
] as const;

// ---- octagon prism ---------------------------------------------------------
const oct = (rho: number): Pt[] =>
  Array.from({ length: 8 }, (_, i) => [rho * Math.cos(i * (Math.PI / 4)), rho * Math.sin(i * (Math.PI / 4))]);

function Prism({ rho, z0, z1, top, side, stroke, strokeW = 1 }: { rho: number; z0: number; z1: number; top: string; side: string; stroke?: string; strokeW?: number }) {
  const v = oct(rho);
  const sides = v
    .map((p, i) => {
      const q = v[(i + 1) % 8];
      const mid = (p[0] + q[0] + p[1] + q[1]) / 2;
      return { p, q, mid };
    })
    .filter((e) => e.mid > -0.1 * rho)
    .sort((a, b) => a.mid - b.mid);
  return (
    <g>
      {sides.map(({ p, q }, i) => (
        <polygon
          key={i}
          points={poly([iso(p[0], p[1], z0), iso(q[0], q[1], z0), iso(q[0], q[1], z1), iso(p[0], p[1], z1)])}
          fill={side}
          stroke={stroke}
          strokeWidth={strokeW}
          strokeLinejoin="round"
        />
      ))}
      <polygon points={poly(v.map(([x, y]) => iso(x, y, z1)))} fill={top} stroke={stroke} strokeWidth={strokeW} strokeLinejoin="round" />
    </g>
  );
}

// ---- modules ---------------------------------------------------------------
const slabs = [
  { s: 122, z0: ZF, z1: ZF + 9, edge: "#d9a566", w: 1.6 },
  { s: 111, z0: ZF + 9, z1: ZF + 22, edge: "#7fe8f5", w: 1 },
  { s: 98, z0: ZF + 22, z1: ZF + 31, edge: "#dff7fb", w: 1.2 },
];

function Slab({ cx, cy, s, z0, z1, edge, w }: { cx: number; cy: number; s: number; z0: number; z1: number; edge: string; w: number }) {
  const x0 = cx - s / 2;
  const y0 = cy - s / 2;
  const L = [iso(x0, y0 + s, z0), iso(x0 + s, y0 + s, z0), iso(x0 + s, y0 + s, z1), iso(x0, y0 + s, z1)];
  const Rr = [iso(x0 + s, y0, z0), iso(x0 + s, y0 + s, z0), iso(x0 + s, y0 + s, z1), iso(x0 + s, y0, z1)];
  const T = [iso(x0, y0, z1), iso(x0 + s, y0, z1), iso(x0 + s, y0 + s, z1), iso(x0, y0 + s, z1)];
  return (
    <g strokeLinejoin="round">
      <polygon points={poly(L)} fill="url(#ag-side-l)" stroke={edge} strokeOpacity="0.8" strokeWidth={w} />
      <polygon points={poly(Rr)} fill="url(#ag-side-r)" stroke={edge} strokeOpacity="0.6" strokeWidth={w} />
      <polygon points={poly(T)} fill="url(#ag-glass)" stroke={edge} strokeOpacity="0.9" strokeWidth={w} />
    </g>
  );
}

function cube(cx: number, cy: number, s: number, top: string, left: string, right: string) {
  const w = s * C;
  const h = s * S;
  const fb: Pt = [cx, cy];
  const lb: Pt = [cx - w, cy - h];
  const rb: Pt = [cx + w, cy - h];
  const bb: Pt = [cx, cy - 2 * h];
  const up = (p: Pt): Pt => [p[0], p[1] - s];
  return (
    <g strokeLinejoin="round" stroke="#04181d" strokeOpacity="0.4" strokeWidth="0.8">
      <polygon points={poly([fb, lb, up(lb), up(fb)])} fill={left} />
      <polygon points={poly([fb, rb, up(rb), up(fb)])} fill={right} />
      <polygon points={poly([up(fb), up(lb), up(bb), up(rb)])} fill={top} />
    </g>
  );
}

function Icon({ kind }: { kind: (typeof modules)[number]["key"] }) {
  switch (kind) {
    case "stack": {
      const layer = (y: number, top: string, side: string) => (
        <g>
          <path d={`M-30 ${y} L0 ${y + 15} L30 ${y} L30 ${y + 6} L0 ${y + 21} L-30 ${y + 6} Z`} fill={side} />
          <path d={`M0 ${y - 15} L30 ${y} L0 ${y + 15} L-30 ${y} Z`} fill={top} />
        </g>
      );
      return (
        <g>
          {layer(10, "#e7eef0", "#8fa0a5")}
          {layer(-1, "#d3a15f", "#8a5d2b")}
          {layer(-12, "#fafcfc", "#a5b4b8")}
        </g>
      );
    }
    case "cubes":
      return (
        <g>
          {cube(-15, 16, 20, "#5fd0e0", "#1f8ea0", "#136a7a")}
          {cube(15, 18, 20, "#7fe0ee", "#2aa0b2", "#177586")}
          {cube(0, -2, 17, "#ffffff", "#d6e3e6", "#a2b5ba")}
        </g>
      );
    case "swirl":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" transform="scale(1 0.82)">
          <path d="M-26 6 C-28 -16 6 -26 24 -10 L24 -26" stroke="#8ea0a5" strokeWidth="11" />
          <path d="M26 6 C28 26 -6 30 -24 14 L-24 28" stroke="#8ea0a5" strokeWidth="11" />
          <path d="M-26 4 C-28 -18 6 -28 24 -12 L24 -28" stroke="#f1f6f7" strokeWidth="8" />
          <path d="M26 4 C28 24 -6 28 -24 12 L-24 26" stroke="#f1f6f7" strokeWidth="8" />
        </g>
      );
    case "cross":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" transform="scale(1 0.86)">
          <path d="M-30 -20 L-10 -4 L-10 -18 M30 20 L10 4 L10 18 M-30 20 L30 -20 M30 -20 L10 -6" stroke="#8ea0a5" strokeWidth="11" />
          <path d="M-30 -20 L-10 -4 L-10 -18 M30 20 L10 4 L10 18 M-30 20 L30 -20 M30 -20 L10 -6" stroke="#f1f6f7" strokeWidth="7.5" />
        </g>
      );
  }
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function AugentPlatform({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  // The outline uses Math.pow/trig, which can round a digit differently in Node and the
  // browser. The art is decorative, so it is drawn after mount instead of hydrated.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const rimTop = arc(0, 360, 0.985, ZT, 160);
  const lipOuter = arc(0, 360, 1.065, ZF, 160);
  const lipInner = arc(0, 360, 1.0, ZF, 160);
  const floor = arc(0, 360, 1.0, ZF, 160);

  const origin = iso(0, 0, ZF);
  const spokes = corners.map(([x, y]) => iso(x, y, ZF));

  const farWall = wall(FAR, ZF, ZT);
  const nearWall = wall(NEAR, ZF, ZT);
  const lipFront = path([...arc(NEAR[0], NEAR[1], 1.065, ZF), ...arc(NEAR[0], NEAR[1], 1.065, ZF - 26).reverse()]);

  const ordered = [...modules].sort((a, b) => a.x + a.y - (b.x + b.y));

  return (
    <svg viewBox="-430 -330 860 680" className={className} role="img" aria-label="AuGENT agentic AI platform: four agent modules around a gold core inside a glass vessel">
      <defs>
        <linearGradient id="ag-floor" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#1d6471" />
          <stop offset="0.55" stopColor="#12424d" />
          <stop offset="1" stopColor="#0a2a33" />
        </linearGradient>
        <radialGradient id="ag-floorlight" cx="0.58" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#4fb9c7" stopOpacity="0.32" />
          <stop offset="1" stopColor="#4fb9c7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ag-lip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2f7f8" />
          <stop offset="0.35" stopColor="#9fb4ba" />
          <stop offset="0.7" stopColor="#dfeaec" />
          <stop offset="1" stopColor="#7c9298" />
        </linearGradient>
        <linearGradient id="ag-lipside" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9d8db" />
          <stop offset="0.3" stopColor="#6f858b" />
          <stop offset="0.65" stopColor="#d6e3e5" />
          <stop offset="1" stopColor="#566a70" />
        </linearGradient>
        <linearGradient id="ag-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6dba0" />
          <stop offset="0.45" stopColor="#b9854a" />
          <stop offset="1" stopColor="#e9c487" />
        </linearGradient>
        <linearGradient id="ag-goldside" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c99556" />
          <stop offset="1" stopColor="#6e4a24" />
        </linearGradient>
        <linearGradient id="ag-post" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6b4325" />
          <stop offset="0.35" stopColor="#e3b378" />
          <stop offset="0.6" stopColor="#b57f47" />
          <stop offset="1" stopColor="#5a3820" />
        </linearGradient>
        <linearGradient id="ag-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bdf1f8" stopOpacity="0.2" />
          <stop offset="1" stopColor="#6fd0de" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="ag-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a7d8b" />
          <stop offset="1" stopColor="#0b333c" />
        </linearGradient>
        <linearGradient id="ag-side-l" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12505c" />
          <stop offset="1" stopColor="#06222a" />
        </linearGradient>
        <linearGradient id="ag-side-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b3a44" />
          <stop offset="1" stopColor="#041a20" />
        </linearGradient>
        <radialGradient id="ag-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#2fe0f0" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2fe0f0" stopOpacity="0" />
        </radialGradient>
        <filter id="ag-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="ag-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="ag-blur-s" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {mounted && (
      <motion.g
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ transformOrigin: "0px 0px", transformBox: "view-box" }}
      >
        {/* ambient light + contact shadow */}
        <ellipse cx="20" cy="60" rx="470" ry="290" fill="url(#ag-halo)" opacity="0.5" />
        <path d={path(arc(0, 360, 1.05, ZF - 30, 120))} fill="#000" opacity="0.55" filter="url(#ag-blur)" />

        {/* chrome lip */}
        <path d={lipFront} fill="url(#ag-lipside)" stroke="#e9f3f5" strokeOpacity="0.55" strokeLinejoin="round" />
        <path d={`${path(lipOuter)}${path(lipInner)}`} fillRule="evenodd" fill="url(#ag-lip)" stroke="#f4fafb" strokeOpacity="0.8" strokeWidth="1" />
        <path d={path(arc(NEAR[0], NEAR[1], 1.065, ZF - 26), false)} fill="none" stroke="#7fe8f5" strokeOpacity="0.35" strokeWidth="1.2" />

        {/* floor */}
        <path d={path(floor)} fill="url(#ag-floor)" />
        <path d={path(floor)} fill="url(#ag-floorlight)" />
        <path d={path(arc(0, 360, 0.9, ZF, 160))} fill="none" stroke="#04181d" strokeOpacity="0.5" strokeWidth="6" />
        <path d={path(arc(0, 360, 0.9, ZF, 160))} fill="none" stroke="url(#ag-gold)" strokeWidth="3.4" />
        <path d={path(arc(0, 360, 0.855, ZF, 160))} fill="none" stroke="#e5c18a" strokeOpacity="0.45" strokeWidth="1" />

        {/* far wall + posts */}
        <path d={farWall} fill="url(#ag-wall)" />
        {posts.filter((p) => p.far).map((p, i) => {
          const [bx, by] = iso(p.x, p.y, ZF);
          const [, ty] = iso(p.x, p.y, ZT);
          return (
            <g key={i}>
              <rect x={bx - 4.5} y={ty} width="9" height={by - ty} rx="4.5" fill="url(#ag-post)" />
              <ellipse cx={bx} cy={ty} rx="5.5" ry="2.8" fill="#f3d6a3" />
            </g>
          );
        })}
        <path d={path(arc(FAR[0], FAR[1], 0.985, ZT), false)} fill="none" stroke="#f2fbfd" strokeOpacity="0.8" strokeWidth="2.6" strokeLinecap="round" />
        <path d={path(arc(FAR[0], FAR[1], 0.985, ZT - 7), false)} fill="none" stroke="#bdf1f8" strokeOpacity="0.28" strokeWidth="1.2" />

        {/* circuit spokes */}
        <g fill="none" strokeLinecap="round">
          {spokes.map(([x, y], i) => (
            <g key={i}>
              <line x1={origin[0]} y1={origin[1]} x2={x} y2={y} stroke="#2fe0f0" strokeOpacity="0.55" strokeWidth="1.4" />
              <line x1={origin[0]} y1={origin[1]} x2={x} y2={y} stroke="#b8f6ff" strokeOpacity="0.95" strokeWidth="1.6" strokeDasharray="6 40" className="animate-dash" style={{ animationDelay: `${i * 0.4}s` }} />
            </g>
          ))}
          {modules.map((m, i) => {
            const [x, y] = iso(m.x * 0.8, m.y * 0.8, ZF);
            return (
              <g key={m.key} filter="url(#ag-glow)">
                <line x1={origin[0]} y1={origin[1]} x2={x} y2={y} stroke="#2fe0f0" strokeOpacity="0.8" strokeWidth="1.6" />
                <circle cx={x} cy={y} r="3" fill="#bdf8ff" className="animate-glow" style={{ animationDelay: `${i * 0.5}s` }} />
              </g>
            );
          })}
        </g>

        {/* modules, far to near */}
        {ordered.map((m, i) => (
          <motion.g
            key={m.key}
            initial={reduce ? false : { y: -36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 + i * 0.12, ease: EASE }}
          >
            <polygon
              points={poly([iso(m.x - 48, m.y - 48, ZF), iso(m.x + 76, m.y - 48, ZF), iso(m.x + 76, m.y + 76, ZF), iso(m.x - 48, m.y + 76, ZF)])}
              fill="#000" opacity="0.4" filter="url(#ag-blur-s)"
            />
            {slabs.map((s, k) => <Slab key={k} cx={m.x} cy={m.y} {...s} />)}
            {(() => {
              const [sx, sy] = iso(m.x, m.y, ZF + 31);
              return (
                <g transform={`translate(${f(sx)} ${f(sy - 12)})`}>
                  <g className="animate-float" style={{ animationDelay: `${i * 0.8}s`, animationDuration: "7s" }}>
                    <ellipse cx="0" cy="22" rx="26" ry="9" fill="#000" opacity="0.28" filter="url(#ag-blur-s)" />
                    <g transform="scale(1.1)"><Icon kind={m.key} /></g>
                  </g>
                </g>
              );
            })()}
          </motion.g>
        ))}

        {/* gold core */}
        <motion.g
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
        >
          <ellipse cx="0" cy="26" rx="170" ry="96" fill="#000" opacity="0.4" filter="url(#ag-blur-s)" />
          <Prism rho={100} z0={ZF} z1={ZF + 22} top="url(#ag-gold)" side="url(#ag-goldside)" stroke="#f6dba0" strokeW={0.8} />
          <Prism rho={89} z0={ZF + 22} z1={ZF + 30} top="#0f1a1d" side="#070d0f" stroke="#c99556" strokeW={1.2} />
          {/* ring detail: tick marks and rivets */}
          <g transform={`translate(0 ${f(iso(0, 0, ZF + 30)[1])})`} fill="none" stroke="#c99556" strokeOpacity="0.8">
            {Array.from({ length: 48 }, (_, i) => {
              const a = (i / 48) * Math.PI * 2;
              const [x1, y1] = iso(Math.cos(a) * 70, Math.sin(a) * 70, 0);
              const [x2, y2] = iso(Math.cos(a) * 78, Math.sin(a) * 78, 0);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" />;
            })}
          </g>
          <Prism rho={64} z0={ZF + 30} z1={ZF + 34} top="#0c2229" side="#061418" stroke="#d9a566" strokeW={1.8} />
          <Prism rho={44} z0={ZF + 34} z1={ZF + 35} top="#0d3a44" side="#0a2a31" stroke="#7fe8f5" strokeW={1.6} />
          <polygon points={poly(oct(44).map(([x, y]) => iso(x, y, ZF + 36)))} fill="none" stroke="#7fe8f5" strokeWidth="1.6" filter="url(#ag-glow)" className="animate-glow" />
          <polygon points={poly(oct(24).map(([x, y]) => iso(x, y, ZF + 36)))} fill="#1b6b78" fillOpacity="0.55" stroke="#bdf8ff" strokeOpacity="0.6" />
          {[45, 135, 225, 315].map((a) => {
            const [x, y] = iso(Math.cos(a * DEG) * 82, Math.sin(a * DEG) * 82, ZF + 30);
            return <circle key={a} cx={x} cy={y} r="2.4" fill="#c99556" stroke="#f6dba0" strokeWidth="0.6" />;
          })}
        </motion.g>

        {/* near wall + posts */}
        <path d={nearWall} fill="url(#ag-wall)" />
        {posts.filter((p) => !p.far).map((p, i) => {
          const [bx, by] = iso(p.x, p.y, ZF);
          const [, ty] = iso(p.x, p.y, ZT);
          return (
            <g key={i}>
              <rect x={bx - 5} y={ty} width="10" height={by - ty} rx="5" fill="url(#ag-post)" />
              <ellipse cx={bx} cy={ty} rx="6" ry="3" fill="#f6dfb0" />
              <ellipse cx={bx} cy={by} rx="7.5" ry="3.6" fill="#2a1a0e" opacity="0.5" />
            </g>
          );
        })}
        <path d={path(arc(NEAR[0], NEAR[1], 0.985, ZT), false)} fill="none" stroke="#f2fbfd" strokeOpacity="0.9" strokeWidth="2.8" strokeLinecap="round" />
        <path d={path(arc(NEAR[0], NEAR[1], 0.985, ZT - 7), false)} fill="none" stroke="#bdf1f8" strokeOpacity="0.3" strokeWidth="1.2" />
        <path d={path(arc(NEAR[0], NEAR[1], 0.985, ZF + 3), false)} fill="none" stroke="#e9fbff" strokeOpacity="0.45" strokeWidth="1" />

        {/* light travelling around the rim */}
        <path
          d={path(rimTop)}
          pathLength="1000"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeDasharray="60 940"
          filter="url(#ag-glow)"
          className="animate-rim"
        />
      </motion.g>
      )}
    </svg>
  );
}
