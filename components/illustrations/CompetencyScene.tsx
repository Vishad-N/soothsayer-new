"use client";

import { motion, useReducedMotion } from "framer-motion";
import { box, iso } from "@/lib/iso";

/**
 * "Building Digital Competency": a learning staircase. Three steps rise away
 * from the viewer, a person on each (the top one graduating), a progress
 * dashboard behind them, a stack of books in front and an award floating over
 * the top step, with a dashed growth arc tying the three people together.
 *
 * Same lighting rules as the other Expertise scenes: key light top-left,
 * teal ink for objects, cyan only for progress and "live" parts.
 */
type Pt = [number, number];
const C = 0.866;
const S = 0.5;
const INK = "#1f5c6c";
const LINE = "#c9dbe0";
const CY = "#8fe4f4";
const BR = "#00b4d8";
const EASE = [0.22, 1, 0.36, 1] as const;
const P = (l: Pt[]) => l.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

const STEP_X = 90;
const STEP_W = 120;
const STEP_D = 62;
const STEP_Y = [176, 114, 52];
const STEP_H = [24, 46, 70];
const BODY = ["#8cc3cf", "#3f8a9d", INK];
const PX = 24; // dashboard plane
const planeX = (x0: number) => `matrix(${-C} ${S} 0 -1 ${(x0 * C).toFixed(2)} ${(x0 * S).toFixed(2)})`;
const planeY = (y0: number) => `matrix(${C} ${S} 0 -1 ${(-y0 * C).toFixed(2)} ${(y0 * S).toFixed(2)})`;

type Faces = ReturnType<typeof box>;
function Solid({ b, top = "#fff", left = "#e6eff2", right = "#d3e2e7", stroke = LINE }: { b: Faces; top?: string; left?: string; right?: string; stroke?: string }) {
  return (
    <g strokeLinejoin="round" stroke={stroke} strokeWidth="1.3">
      <polygon points={b.left} fill={left} />
      <polygon points={b.right} fill={right} />
      <polygon points={b.top} fill={top} />
    </g>
  );
}

function Spark({ x, y, s = 7, d = 0 }: { x: number; y: number; s?: number; d?: number }) {
  return (
    <path
      d={`M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`}
      fill={BR}
      opacity="0.8"
      className="animate-glow"
      style={{ animationDelay: `${d}s` }}
    />
  );
}

function Person({ k, grad }: { k: number; grad: boolean }) {
  const [x, y] = iso(STEP_X + STEP_W / 2, STEP_Y[k] + STEP_D / 2, STEP_H[k]);
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
      <ellipse cx="0" cy="1" rx="16" ry="5.5" fill="#0c2631" opacity="0.14" />
      <g className="animate-float" style={{ animationDelay: `${k * 0.6}s`, animationDuration: "5.5s" }}>
        <path d="M-13 0 C-13 -20 -10 -29 0 -29 C10 -29 13 -20 13 0 Z" fill={BODY[k]} />
        <circle cx="0" cy="-39" r="9" fill="#f3fafb" stroke={BODY[k]} strokeWidth="2" />
        {grad && (
          <g>
            <polygon points="0,-60 20,-52 0,-44 -20,-52" fill={INK} stroke="#133c48" strokeLinejoin="round" />
            <path d="M-10 -48 v6 c4 3 16 3 20 0 v-6" fill="#2d7385" />
            <line x1="17" y1="-51" x2="17" y2="-38" stroke={CY} strokeWidth="2" strokeLinecap="round" />
            <circle cx="17" cy="-36" r="2.6" fill={CY} />
          </g>
        )}
      </g>
    </g>
  );
}

export function CompetencyScene({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const head = (k: number): Pt => {
    const [x, y] = iso(STEP_X + STEP_W / 2, STEP_Y[k] + STEP_D / 2, STEP_H[k]);
    return [x, y - 78];
  };
  const [a, b, c] = [head(0), head(1), head(2)];
  const arc = `M${a[0] - 10} ${a[1] + 6} Q${(a[0] + b[0]) / 2 - 14} ${(a[1] + b[1]) / 2 - 24} ${b[0] - 10} ${b[1] + 6} Q${(b[0] + c[0]) / 2 - 14} ${(b[1] + c[1]) / 2 - 24} ${c[0] - 12} ${c[1] + 8}`;
  const [mx, my] = iso(STEP_X + STEP_W / 2, STEP_Y[2] + STEP_D / 2, STEP_H[2]);
  const stage = box(0, 0, -14, 300, 250, 14);

  return (
    <svg viewBox="-250 -150 540 450" className={className} role="img" aria-label="Isometric learning staircase: three people climbing three steps toward a graduation, with a progress dashboard, books and an award">
      <defs>
        <filter id="cs-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="cs-ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={BR} />
          <stop offset="1" stopColor="#0090c0" />
        </linearGradient>
      </defs>

      {/* stage + shadow */}
      <motion.g
        initial={reduce ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <polygon points={P([iso(10, 10, -14), iso(310, 10, -14), iso(310, 260, -14), iso(10, 260, -14)])} fill="#0c2631" opacity="0.1" filter="url(#cs-blur)" />
        <Solid b={stage} top="#fbfeff" />

        {/* progress dashboard standing at the back-left */}
        <polygon points={P([iso(PX, 40, 0), iso(PX, 200, 0), iso(PX, 200, 132), iso(PX, 40, 132)])} fill="#0c2631" opacity="0.08" transform="translate(6 4)" />
        <polygon points={P([iso(PX, 40, 0), iso(PX, 200, 0), iso(PX, 200, 132), iso(PX, 40, 132)])} fill="#fff" stroke={LINE} strokeWidth="1.4" strokeLinejoin="round" />
        <g transform={planeX(PX)}>
          <rect x="40" y="116" width="160" height="16" fill="#f1f8fa" />
          <circle cx="52" cy="124" r="3.4" fill={BR} />
          <rect x="62" y="122" width="52" height="4.5" rx="2.2" fill="#cfe3e8" />
          {[0.35, 0.65, 0.9].map((f, i) => {
            const u = 76 + i * 48;
            return (
              <g key={i}>
                <circle cx={u} cy="80" r="14" fill="none" stroke="#e1ecef" strokeWidth="5" />
                <g transform={`rotate(-90 ${u} 80)`}>
                  <motion.circle
                    cx={u}
                    cy="80"
                    r="14"
                    fill="none"
                    stroke={i === 2 ? INK : BR}
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: f }}
                    transition={{ duration: 1.3, delay: 0.9 + i * 0.2, ease: EASE }}
                  />
                </g>
                <rect x={u - 17} y="50" width="34" height="5" rx="2.5" fill="#d3e4e9" />
              </g>
            );
          })}
          {/* skills achieved */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={52 + i * 36} y="18" width="28" height="14" rx="7" fill={i < 3 ? "#e7f7fb" : "#f1f6f8"} stroke={i < 3 ? CY : "#dbe7ea"} />
              {i < 3 && <circle cx={52 + i * 36 + 8} cy="25" r="2.6" fill={BR} />}
            </g>
          ))}
        </g>
      </motion.g>

      {/* the steps, far to near, each with its person */}
      {[2, 1, 0].map((k) => {
        const b = box(STEP_X, STEP_Y[k], 0, STEP_W, STEP_D, STEP_H[k]);
        const yf = STEP_Y[k] + STEP_D;
        return (
          <motion.g
            key={k}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 + (2 - k) * 0.16, ease: EASE }}
          >
            <Solid b={b} />
            {/* skill level dots on the step's front face */}
            <g transform={planeY(yf)}>
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={STEP_X + 18 + i * 14} cy={STEP_H[k] / 2} r="4" fill={i <= k ? BR : "#d9e8ec"} />
              ))}
            </g>
            <Person k={k} grad={k === 2} />
          </motion.g>
        );
      })}

      {/* growth arc between the three people */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d={arc}
          stroke={BR}
          strokeWidth="2.4"
          strokeDasharray="2 8"
          className="animate-dash"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        />
        <path d={`M${c[0] - 22} ${c[1] + 6} l11 4 -2 -12`} stroke={BR} strokeWidth="2.4" />
      </g>

      {/* books in front of the steps */}
      <motion.g
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
      >
        <Solid b={box(222, 168, 0, 62, 42, 11)} top="#3f8a9d" left="#2d7385" right="#1f5c6c" stroke="#18505f" />
        <Solid b={box(228, 172, 11, 52, 36, 9)} top="#8fe4f4" left="#6fd0e2" right="#4fb8cc" stroke="#3fa6bc" />
        <Solid b={box(225, 170, 20, 56, 38, 8)} />
        <g transform={`translate(${iso(253, 189, 28)[0].toFixed(1)} ${iso(253, 189, 28)[1].toFixed(1)})`}>
          <path d="M-9 0 L0 -5 L9 0 L0 5 Z" fill="none" stroke={BR} strokeWidth="1.6" strokeLinejoin="round" />
        </g>
      </motion.g>

      {/* award over the top step */}
      <motion.g
        initial={reduce ? false : { opacity: 0, y: -16, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
        style={{ transformOrigin: `${mx + 52}px ${my - 118}px` }}
      >
        <g transform={`translate(${(mx + 52).toFixed(1)} ${(my - 118).toFixed(1)})`}>
          <g className="animate-float" style={{ animationDuration: "6.5s" }}>
            <polygon points="-8,10 -14,34 -4,28 0,36 2,12" fill="url(#cs-ribbon)" />
            <polygon points="8,10 14,34 4,28 0,36 -2,12" fill="#0090c0" />
            <circle cx="0" cy="0" r="17" fill="#fff" stroke={BR} strokeWidth="2.4" />
            <circle cx="0" cy="0" r="11" fill="#e7f7fb" stroke={CY} />
            <path d="M0 -6 L2 -1.5 L7 -1.5 L3 1.5 L4.5 6.5 L0 3.5 L-4.5 6.5 L-3 1.5 L-7 -1.5 L-2 -1.5 Z" fill={BR} />
          </g>
        </g>
      </motion.g>

      <Spark x={-170} y={-60} d={0.2} />
      <Spark x={196} y={-30} s={5} d={1.1} />
      <Spark x={120} y={-110} s={5} d={0.6} />
    </svg>
  );
}
