"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Six scenes for the "AI built for business impact" panel, one per outcome tab.
 * Flat, soft-shadowed cards on the light panel (the panel's existing look), each
 * showing what its tab promises with the tab's own numbers:
 *
 *   0 Operational Efficiency   cycle time collapsing 90%, 40,000+ hours automated
 *   1 Cost Optimization        resources re-allocated, a coin stack, cost curve falling
 *   2 Faster Decision-Making   noise filtered to signal, a forecast, a recommended decision
 *   3 Intelligent Automation   trigger → agent → human review → approved, 99% accuracy
 *   4 Scalable AI Adoption     pilot → production → scale with a rocket, a growing team
 *   5 Enterprise Intelligence  a knowledge network feeding $150 Mn+, 70% and 10x
 *
 * Motion is limited to transform / opacity / stroke offsets and is skipped under
 * reduced motion.
 */
const INK = "#0c2631";
const TEAL = "#1f5c6c";
const BR = "#00b4d8";
const CY = "#8fe4f4";
const GREY = "#d3e4e9";
const SOFT = "#eef4f6";
const EASE = [0.22, 1, 0.36, 1] as const;
const SANS = "var(--font-sans)";
const DISPLAY = "var(--font-display)";

type CardProps = { x: number; y: number; w: number; h: number; r?: number; d?: number; children?: React.ReactNode };

function Card({ x, y, w, h, r = 14, d = 0, children }: CardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: d, ease: EASE }}
    >
      <rect x={x} y={y} width={w} height={h} rx={r} fill="url(#ic-card)" filter="url(#ic-shadow)" />
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke="#e3edf0" />
      {children}
    </motion.g>
  );
}

const Label = ({ x, y, children, size = 11, fill = "#5d7580", weight = 500, anchor = "start" as const }: { x: number; y: number; children: React.ReactNode; size?: number; fill?: string; weight?: number; anchor?: "start" | "middle" | "end" }) => (
  <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} fontFamily={SANS}>{children}</text>
);
const Big = ({ x, y, children, size = 26, fill = INK, anchor = "start" as const }: { x: number; y: number; children: React.ReactNode; size?: number; fill?: string; anchor?: "start" | "middle" | "end" }) => (
  <text x={x} y={y} fontSize={size} fontWeight={700} fill={fill} textAnchor={anchor} fontFamily={DISPLAY} letterSpacing="-0.5">{children}</text>
);

function Pill({ x, y, text, w, fill = BR, color = "#fff", d = 0 }: { x: number; y: number; text: string; w: number; fill?: string; color?: string; d?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: d, ease: EASE }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      <rect x={x} y={y} width={w} height="22" rx="11" fill={fill} />
      <text x={x + w / 2} y={y + 15} fontSize="11.5" fontWeight="700" fill={color} textAnchor="middle" fontFamily={SANS}>{text}</text>
    </motion.g>
  );
}

function gearPath(cx: number, cy: number, r: number, teeth: number) {
  const pts: string[] = [];
  const n = teeth * 4;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = i % 4 === 0 || i % 4 === 1 ? r : r * 0.78;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return pts.join(" ");
}

/* ---------- 0 · Operational Efficiency ---------------------------------------------- */

function Efficiency() {
  const reduce = useReducedMotion();
  const ticks = Array.from({ length: 12 }, (_, i) => i);
  return (
    <>
      {/* cycle time, before vs after */}
      <Card x={28} y={70} w={236} h={240}>
        <Label x={48} y={102} weight={600} fill={TEAL}>Processing cycle time</Label>
        <Label x={48} y={140}>Before</Label>
        <rect x="48" y="148" width="196" height="16" rx="8" fill={SOFT} />
        <motion.rect x="48" y="148" height="16" rx="8" fill="#b9cbd1" initial={{ width: reduce ? 196 : 0 }} animate={{ width: 196 }} transition={{ duration: 1.1, delay: 0.4, ease: EASE }} />
        <Label x={48} y={196}>With AI</Label>
        <rect x="48" y="204" width="196" height="16" rx="8" fill={SOFT} />
        <motion.rect x="48" y="204" height="16" rx="8" fill={BR} initial={{ width: reduce ? 20 : 0 }} animate={{ width: 20 }} transition={{ duration: 1.1, delay: 1, ease: EASE }} />
        <Pill x={78} y={199} text="−90%" w={50} d={1.6} />
        <g transform="translate(48 250)">
          {[0, 1, 2, 3].map((i) => (
            <g key={i} className="animate-float" style={{ animationDelay: `${i * 0.35}s`, animationDuration: "4.5s" }}>
              <rect x={i * 34} y="0" width="22" height="28" rx="4" fill="#fff" stroke="#cfe3e8" />
              <rect x={i * 34 + 5} y="7" width="12" height="2.5" rx="1.2" fill={GREY} />
              <rect x={i * 34 + 5} y="13" width="12" height="2.5" rx="1.2" fill={GREY} />
              {i === 3 && <circle cx={i * 34 + 18} cy="24" r="5" fill={BR} />}
            </g>
          ))}
        </g>
      </Card>

      {/* stopwatch */}
      <motion.g initial={reduce ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx="410" cy="188" r="92" fill="url(#ic-card)" filter="url(#ic-shadow)" />
        <circle cx="410" cy="188" r="92" fill="none" stroke="#e3edf0" />
        <rect x="400" y="80" width="20" height="14" rx="4" fill={TEAL} />
        <rect x="446" y="94" width="14" height="10" rx="3" fill={TEAL} transform="rotate(40 453 99)" />
        <circle cx="410" cy="188" r="78" fill="none" stroke={GREY} strokeWidth="3" />
        <g transform="translate(410 188)">
          {ticks.map((i) => (
            <line key={i} x1="0" y1="-78" x2="0" y2={i % 3 === 0 ? -66 : -72} stroke={i % 3 === 0 ? TEAL : "#9fb9c1"} strokeWidth={i % 3 === 0 ? 3 : 2} strokeLinecap="round" transform={`rotate(${i * 30})`} />
          ))}
          <path d="M0 0 L0 -78 A78 78 0 0 1 67.5 -39 Z" fill={BR} opacity="0.12" />
          <g className="animate-spin-slow" style={{ animationDuration: "6s" }}>
            <circle r="60" fill="none" />
            <line x1="0" y1="0" x2="0" y2="-58" stroke={BR} strokeWidth="3.4" strokeLinecap="round" />
          </g>
          <circle r="5" fill={TEAL} />
        </g>
        <Big x={410} y={226} size={21} anchor="middle">40,000+</Big>
        <Label x={410} y={243} anchor="middle" size={10.5}>hours automated a year</Label>
      </motion.g>

      {/* gear */}
      <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <g transform="translate(494 292)">
          <g className="animate-spin-slow" style={{ animationDuration: "9s" }}>
            <polygon points={gearPath(0, 0, 24, 8)} fill={CY} stroke={BR} strokeWidth="1.6" strokeLinejoin="round" />
            <circle r="9" fill="#fff" stroke={BR} strokeWidth="1.6" />
          </g>
        </g>
        <g transform="translate(300 300)">
          <g className="animate-spin-slow" style={{ animationDuration: "12s", animationDirection: "reverse" }}>
            <polygon points={gearPath(0, 0, 17, 7)} fill="#e7f7fb" stroke={CY} strokeWidth="1.6" strokeLinejoin="round" />
            <circle r="6" fill="#fff" stroke={CY} strokeWidth="1.6" />
          </g>
        </g>
      </motion.g>
    </>
  );
}

/* ---------- 1 · Cost Optimization --------------------------------------------------- */

function Cost() {
  const reduce = useReducedMotion();
  const sliders = [
    { y: 134, from: 120, to: 56, c: BR },
    { y: 184, from: 40, to: 110, c: TEAL },
    { y: 234, from: 96, to: 70, c: BR },
  ];
  const curve = "M20 38 C46 40 56 62 82 66 S120 96 168 104";
  return (
    <>
      <Card x={22} y={82} w={188} h={220}>
        <Label x={40} y={112} weight={600} fill={TEAL}>Resource allocation</Label>
        {sliders.map((s, i) => (
          <g key={s.y}>
            <rect x="40" y={s.y} width="152" height="6" rx="3" fill={SOFT} />
            <motion.rect x="40" y={s.y} height="6" rx="3" fill={s.c} opacity="0.55" initial={{ width: s.from }} animate={reduce ? { width: s.to } : { width: [s.from, s.to, s.from] }} transition={{ duration: 6, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }} />
            <motion.circle cy={s.y + 3} r="9" fill="#fff" stroke={s.c} strokeWidth="2.6" initial={{ cx: 40 + s.from }} animate={reduce ? { cx: 40 + s.to } : { cx: [40 + s.from, 40 + s.to, 40 + s.from] }} transition={{ duration: 6, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }} />
          </g>
        ))}
        <Label x={40} y={272} size={10.5}>Capacity matched to demand</Label>
      </Card>

      {/* coin stack */}
      <g>
        <ellipse cx="282" cy="300" rx="52" ry="12" fill={INK} opacity="0.1" filter="url(#ic-blur)" />
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 286 - i * 15;
          return (
            <motion.g key={i} initial={reduce ? false : { opacity: 0, y: -26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 + i * 0.16, ease: EASE }}>
              <path d={`M236 ${y} v10 a46 13 0 0 0 92 0 v-10`} fill="#c9a24a" />
              <path d={`M236 ${y} v10 a46 13 0 0 0 92 0 v-10`} fill="url(#ic-coin)" />
              <ellipse cx="282" cy={y} rx="46" ry="13" fill="#ecd28c" stroke="#c9a24a" strokeWidth="1.4" />
              <ellipse cx="282" cy={y} rx="33" ry="8.5" fill="none" stroke="#c9a24a" strokeOpacity="0.55" />
            </motion.g>
          );
        })}
        <text x="282" y="226" fontSize="20" fontWeight="800" fill="#9a7a2c" textAnchor="middle" fontFamily={DISPLAY}>$</text>
        <g className="animate-float" style={{ animationDuration: "5s" }}>
          <Pill x={216} y={166} text="$14M+ saved a year" w={132} fill={TEAL} />
        </g>
      </g>

      {/* cost curve */}
      <Card x={352} y={70} w={188} h={160} d={0.2}>
        <Label x={370} y={98} weight={600} fill={TEAL}>Operating cost</Label>
        <g transform="translate(366 104)">
          <line x1="0" y1="96" x2="168" y2="96" stroke={GREY} />
          <line x1="0" y1="64" x2="168" y2="64" stroke="#e9f0f2" />
          <path d={`${curve} L168 96 L20 96 Z`} fill="url(#ic-area)" />
          <motion.path d={curve} fill="none" stroke={BR} strokeWidth="3.2" strokeLinecap="round" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7, ease: EASE }} />
          <motion.g initial={reduce ? false : { opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2, duration: 0.5 }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <circle cx="168" cy="104" r="7" fill="#fff" stroke={BR} strokeWidth="3" />
          </motion.g>
        </g>
        <path d="M498 150 v28 m-8 -8 l8 8 8 -8" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.0" />
      </Card>
      <Card x={376} y={246} w={140} h={56} d={0.4}>
        <g transform="translate(394 262)">
          <circle cx="12" cy="12" r="12" fill="#e7f7fb" />
          <path d="M7 12l4 4 7-8" fill="none" stroke={BR} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <Label x={426} y={270} weight={600} fill={INK}>Less manual</Label>
        <Label x={426} y={285} size={10.5}>work, lower cost</Label>
      </Card>
    </>
  );
}

/* ---------- 2 · Faster Decision-Making ---------------------------------------------- */

function Decisions() {
  const reduce = useReducedMotion();
  const dots = Array.from({ length: 34 }, (_, i) => {
    const a = Math.sin(i * 91.7) * 43758.5453;
    const b = Math.sin(i * 12.3 + 5) * 24634.6345;
    return [40 + (a - Math.floor(a)) * 100, 132 + (b - Math.floor(b)) * 120] as [number, number];
  });
  const signal = new Set([4, 11, 19, 27]);
  const hist = "M18 108 L38 96 L56 102 L76 80 L96 88 L112 62";
  const fore = "M112 62 L134 50 L152 40";
  return (
    <>
      {/* noise → signal */}
      <Card x={14} y={64} w={168} h={250}>
        <Label x={30} y={92} weight={600} fill={TEAL}>Signal over noise</Label>
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={signal.has(i) ? 5 : 3} fill={signal.has(i) ? BR : "#c3d3d9"} className={signal.has(i) ? "animate-glow" : undefined} style={{ animationDelay: `${(i % 5) * 0.3}s` }} />
        ))}
        <motion.g animate={reduce ? undefined : { x: [0, 26, -10, 0], y: [0, -14, 20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx="92" cy="190" r="34" fill="#00b4d8" fillOpacity="0.07" stroke={BR} strokeWidth="2.4" />
          <line x1="116" y1="214" x2="132" y2="230" stroke={BR} strokeWidth="5" strokeLinecap="round" />
        </motion.g>
        <Label x={30} y={296} size={10.5}>Anomalies that matter</Label>
      </Card>

      {/* forecast */}
      <Card x={196} y={64} w={176} h={250} d={0.15}>
        <Label x={212} y={92} weight={600} fill={TEAL}>Predictive insight</Label>
        <g transform="translate(196 120)">
          <line x1="18" y1="120" x2="160" y2="120" stroke={GREY} />
          <line x1="18" y1="84" x2="160" y2="84" stroke="#e9f0f2" />
          <line x1="18" y1="48" x2="160" y2="48" stroke="#e9f0f2" />
          <line x1="112" y1="20" x2="112" y2="120" stroke="#b9cbd1" strokeDasharray="3 4" />
          <text x="112" y="14" fontSize="10" fontWeight="600" fill="#5d7580" textAnchor="middle" fontFamily={SANS}>now</text>
          <motion.path d="M112 62 L152 40 L152 76 L112 62 Z" fill={BR} opacity="0.16" initial={{ opacity: 0 }} animate={{ opacity: 0.16 }} transition={{ delay: 1.8, duration: 0.8 }} />
          <motion.path d={hist} fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, delay: 0.5, ease: EASE }} />
          <motion.path d={fore} fill="none" stroke={BR} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 7" className="animate-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} />
          <motion.circle cx="152" cy="40" r="6" fill="#fff" stroke={BR} strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }} />
        </g>
        <Label x={212} y={296} size={10.5}>Risk and demand, early</Label>
      </Card>

      {/* decision */}
      <Card x={386} y={64} w={160} h={250} d={0.3}>
        <Label x={402} y={92} weight={600} fill={TEAL}>Decision support</Label>
        <rect x="402" y="108" width="128" height="46" rx="10" fill={SOFT} />
        <circle cx="418" cy="131" r="6" fill="#fff" stroke="#b9cbd1" strokeWidth="2" />
        <rect x="432" y="124" width="68" height="5" rx="2.5" fill={GREY} />
        <rect x="432" y="134" width="44" height="5" rx="2.5" fill={GREY} />
        <rect x="402" y="164" width="128" height="58" rx="10" fill="#e7f7fb" stroke={BR} strokeWidth="1.8" />
        <circle cx="418" cy="193" r="6" fill={BR} />
        <circle cx="418" cy="193" r="2.4" fill="#fff" />
        <rect x="432" y="184" width="76" height="5" rx="2.5" fill={CY} />
        <rect x="432" y="195" width="52" height="5" rx="2.5" fill={CY} />
        <Pill x={430} y={153} text="AI recommends" w={104} />
        <motion.g animate={reduce ? undefined : { scale: [1, 1.04, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <rect x="402" y="246" width="128" height="40" rx="10" fill={TEAL} />
          <path d="M440 266 l6 6 11 -12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="492" y="271" fontSize="13" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily={SANS}>Approve</text>
        </motion.g>
      </Card>
      <g fill="none" stroke={BR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M184 190 h10 m-4 -4 l4 4 -4 4" />
        <path d="M374 190 h10 m-4 -4 l4 4 -4 4" />
      </g>
    </>
  );
}

/* ---------- 3 · Intelligent Automation ---------------------------------------------- */

function Automation() {
  const reduce = useReducedMotion();
  const nodes = [
    { x: 78, label: "Document", icon: <g><path d="M-9 -12h12l6 6v18h-18z" /><path d="M3 -12v6h6M-5 0h10M-5 5h10" /></g> },
    { x: 206, label: "AI agent", icon: <g><rect x="-11" y="-6" width="22" height="17" rx="5" /><path d="M0 -13v7M-5 2h.01M5 2h.01" /></g>, ring: true },
    { x: 334, label: "Human review", icon: <g><circle cx="0" cy="-5" r="6" /><path d="M-11 13c1-6 5-9 11-9s10 3 11 9" /></g> },
    { x: 462, label: "Approved", icon: <path d="M-10 0l7 7 13-14" /> },
  ];
  const flow = "M110 120 H174 M238 120 H302 M366 120 H430";
  const token = "M78 120 H462";
  return (
    <>
      <Card x={20} y={54} w={520} h={152} r={16}>
        <Label x={40} y={84} weight={600} fill={TEAL}>Agentic workflow, end to end</Label>
      </Card>
      <g fill="none" strokeLinecap="round">
        <path d={flow} stroke={GREY} strokeWidth="3" />
        <path d={flow} stroke={BR} strokeWidth="3" strokeDasharray="2 9" className="animate-dash" />
        {/* human-in-the-loop feedback */}
        <path d="M334 94 C334 66 206 66 206 94" stroke={BR} strokeWidth="2" strokeDasharray="3 5" className="animate-dash" opacity="0.7" />
        <path d="M212 88 l-6 8 -6 -8" stroke={BR} strokeWidth="2" strokeLinejoin="round" />
      </g>
      {nodes.map((n, i) => (
        <motion.g key={n.label} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 + i * 0.14, ease: EASE }}>
          <circle cx={n.x} cy="120" r="32" fill="#fff" stroke={n.ring ? BR : "#d7e5e9"} strokeWidth={n.ring ? 2.6 : 1.5} filter="url(#ic-shadow)" />
          {n.ring && <circle cx={n.x} cy="120" r="40" fill="none" stroke={BR} strokeOpacity="0.35" strokeDasharray="3 6" className="animate-spin-slow" />}
          <g transform={`translate(${n.x} ${120})`} fill="none" stroke={i === 3 ? BR : TEAL} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">{n.icon}</g>
          <Label x={n.x} y={176} anchor="middle" weight={600} fill={INK}>{n.label}</Label>
        </motion.g>
      ))}
      {!reduce && (
        <circle r="6" fill={BR} stroke="#fff" strokeWidth="2.4">
          <animateMotion dur="7s" repeatCount="indefinite" path={token} />
        </circle>
      )}

      {/* accuracy + human in the loop */}
      <Card x={20} y={222} w={250} h={116} d={0.5}>
        <circle cx="76" cy="280" r="34" fill="none" stroke={SOFT} strokeWidth="9" />
        <g transform="rotate(-90 76 280)">
          <motion.circle cx="76" cy="280" r="34" fill="none" stroke={BR} strokeWidth="9" strokeLinecap="round" initial={{ pathLength: reduce ? 0.99 : 0 }} animate={{ pathLength: 0.99 }} transition={{ duration: 1.6, delay: 0.9, ease: EASE }} />
        </g>
        <Big x={76} y={287} size={19} anchor="middle">99%</Big>
        <Label x={128} y={266} weight={600} fill={INK}>Extraction accuracy</Label>
        <Label x={128} y={282} size={10.5}>in production document</Label>
        <Label x={128} y={296} size={10.5}>processing</Label>
      </Card>
      <Card x={284} y={222} w={256} h={116} d={0.65}>
        <g transform="translate(306 252)">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={i * 22} cy="0" r="8" fill={i === 1 ? BR : "#d7e5e9"} />
              <path d={`M${i * 22 - 9} 22 c1-8 5-11 9-11 s8 3 9 11`} fill={i === 1 ? BR : "#d7e5e9"} />
            </g>
          ))}
        </g>
        <Label x={306} y={310} weight={600} fill={INK}>Human in the loop</Label>
        <Label x={306} y={326} size={10.5}>Review where judgement matters most</Label>
        <Pill x={450} y={242} text="Approve" w={62} fill={TEAL} d={1.2} />
        <Pill x={450} y={272} text="Escalate" w={62} fill="#e7f7fb" color={TEAL} d={1.4} />
      </Card>
    </>
  );
}

/* ---------- 4 · Scalable AI Adoption ------------------------------------------------ */

function Adoption() {
  const reduce = useReducedMotion();
  const steps = [
    { x: 30, h: 96, label: "Pilot", c: "#c4e3ec", ink: TEAL },
    { x: 196, h: 160, label: "Production", c: "#b8e7f1", ink: TEAL },
    { x: 362, h: 224, label: "Scale", c: BR, ink: "#fff" },
  ];
  const path = "M92 250 C160 190 230 170 276 160 S400 100 448 56";
  return (
    <>
      {steps.map((s, i) => (
        <motion.g key={s.label} initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 + i * 0.18, ease: EASE }}>
          <rect x={s.x} y={338 - s.h} width="162" height={s.h} rx="14" fill={s.c} filter="url(#ic-shadow)" />
          <rect x={s.x} y={338 - s.h} width="162" height="8" rx="4" fill="#fff" opacity="0.5" />
          <text x={s.x + 18} y="324" fontSize="15" fontWeight="700" fill={s.ink} fontFamily={DISPLAY}>{s.label}</text>
          <g transform={`translate(${s.x + 130} ${338 - s.h + 30})`} fill="none" stroke={s.ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            {i === 0 && <path d="M-5 -12v9l-8 14a3 3 0 003 4h20a3 3 0 003-4l-8-14v-9M-7 -12h14" />}
            {i === 1 && <g><circle r="5" /><path d="M0 -13v4M0 9v4M-13 0h4M9 0h4M-9 -9l3 3M6 6l3 3M-9 9l3-3M6 -6l3-3" /></g>}
            {i === 2 && <g><circle r="12" /><path d="M-12 0h24M0 -12c5 4 5 20 0 24M0 -12c-5 4-5 20 0 24" /></g>}
          </g>
        </motion.g>
      ))}

      {/* trained leaders */}
      <Card x={30} y={34} w={196} h={104} d={0.4}>
        <Big x={48} y={72} size={24}>25,000+</Big>
        <Label x={48} y={90} size={10.5}>leaders trained to adopt and scale AI</Label>
        <g transform="translate(48 100)">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.g key={i} initial={reduce ? false : { opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.08, duration: 0.4, ease: EASE }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <circle cx={i * 14 + 5} cy="6" r="4.2" fill={i < 8 ? BR : "#c3d3d9"} />
              <path d={`M${i * 14 - 1} 22 c0-6 3-8 6-8 s6 2 6 8`} fill={i < 8 ? BR : "#c3d3d9"} />
            </motion.g>
          ))}
        </g>
      </Card>

      {/* rocket along the path */}
      <path d={path} fill="none" stroke={CY} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 10" className="animate-dash" />
      {!reduce ? (
        <g>
          <animateMotion dur="5.5s" repeatCount="indefinite" path={path} rotate="auto" />
          <g transform="rotate(45)">
            <path d="M0 -22 C9 -12 9 4 6 12 H-6 C-9 4 -9 -12 0 -22Z" fill="#fff" stroke={TEAL} strokeWidth="2.2" strokeLinejoin="round" />
            <circle cx="0" cy="-6" r="3.6" fill={BR} />
            <path d="M-6 6 L-13 14 L-6 12ZM6 6 L13 14 L6 12Z" fill={TEAL} />
            <path d="M-3 14 q3 10 6 0Z" fill="#ffb347" />
          </g>
        </g>
      ) : (
        <g transform="translate(448 56) rotate(-45)">
          <path d="M0 -22 C9 -12 9 4 6 12 H-6 C-9 4 -9 -12 0 -22Z" fill="#fff" stroke={TEAL} strokeWidth="2.2" />
        </g>
      )}
      <Pill x={212} y={238} text="Pilot → production" w={118} fill={TEAL} d={1} />
      <Pill x={380} y={170} text="LLMOps built in" w={104} fill="#ffffff" color={TEAL} d={1.2} />
    </>
  );
}

/* ---------- 5 · Enterprise Intelligence ---------------------------------------------- */

function Intelligence() {
  const reduce = useReducedMotion();
  const sat: [number, number][] = [[-70, -26], [-30, 52], [60, 44], [74, -34], [8, -62]];
  return (
    <>
      {/* connectors */}
      <g fill="none" strokeLinecap="round">
        {[["M176 108 C220 120 236 150 252 168", 0], ["M176 276 C220 262 236 228 252 214", 0.5], ["M384 192 H330", 1]].map(([d, k]) => (
          <g key={String(d)}>
            <path d={String(d)} stroke={GREY} strokeWidth="3" />
            <path d={String(d)} stroke={BR} strokeWidth="3" strokeDasharray="2 9" className="animate-dash" style={{ animationDelay: `${k}s` }} />
          </g>
        ))}
      </g>

      {/* knowledge network */}
      <motion.g initial={reduce ? false : { opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: EASE }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx="290" cy="190" r="74" fill="url(#ic-glow)" />
        <g transform="translate(290 190)">
          <g className="animate-spin-slow" style={{ animationDuration: "24s" }}>
            <circle r="68" fill="none" stroke={BR} strokeOpacity="0.4" strokeDasharray="3 7" />
          </g>
          <circle r="44" fill="#fff" stroke="#d7e5e9" filter="url(#ic-shadow)" />
          <g stroke="#9fc9d3" strokeWidth="1.6">
            {sat.map(([x, y], i) => <line key={i} x1="0" y1="0" x2={x} y2={y} />)}
            <line x1={sat[0][0]} y1={sat[0][1]} x2={sat[4][0]} y2={sat[4][1]} />
            <line x1={sat[2][0]} y1={sat[2][1]} x2={sat[3][0]} y2={sat[3][1]} />
          </g>
          {sat.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 4 ? 7 : 5.5} fill="#fff" stroke={TEAL} strokeWidth="2" className={i % 2 ? "animate-glow" : undefined} style={{ animationDelay: `${i * 0.4}s` }} />)}
          <circle r="14" fill={BR} className="animate-glow" />
          <circle r="6" fill="#fff" />
        </g>
        <Label x={290} y={286} anchor="middle" weight={600} fill={TEAL}>Enterprise knowledge</Label>
      </motion.g>

      {/* KPI cards */}
      <Card x={20} y={58} w={156} h={96} d={0.3}>
        <Big x={36} y={96} size={26}>$150 Mn+</Big>
        <Label x={36} y={114} size={10.5}>procurement impact</Label>
        <path d="M36 144 L60 138 L84 142 L108 130 L130 134 L158 122" fill="none" stroke={BR} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </Card>
      <Card x={20} y={236} w={156} h={96} d={0.45}>
        <Big x={36} y={278} size={26}>70%</Big>
        <Label x={36} y={292} size={10.5}>fewer manual processes</Label>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect key={i} x={36 + i * 14} width="9" rx="2.5" fill={i < 2 ? BR : "#c3d3d9"} initial={{ y: 324, height: 0 }} animate={{ y: 324 - (20 - i * 4), height: 20 - i * 4 }} transition={{ duration: 0.7, delay: 1 + i * 0.1, ease: EASE }} />
        ))}
      </Card>
      <Card x={384} y={128} w={156} h={128} d={0.6}>
        <Big x={402} y={176} size={34} fill={TEAL}>10x</Big>
        <Label x={402} y={196} size={10.5}>return on AI investment</Label>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect key={i} x={402 + i * 22} width="14" rx="3.5" fill={BR} opacity={0.35 + i * 0.16} initial={{ y: 246, height: 0 }} animate={{ y: 246 - (10 + i * 8), height: 10 + i * 8 }} transition={{ duration: 0.7, delay: 1.1 + i * 0.1, ease: EASE }} />
        ))}
      </Card>
    </>
  );
}

/* ---------- public --------------------------------------------------------------------- */

const SCENES = [Efficiency, Cost, Decisions, Automation, Adoption, Intelligence];
const LABELS = [
  "Cycle time cut by 90% and 40,000 hours a year automated",
  "Resources re-allocated, a stack of savings and a falling cost curve",
  "Noise filtered into signal, a forecast and a recommended decision",
  "A document moving through an AI agent and human review to approval at 99% accuracy",
  "Pilot, production and scale steps with a rocket and a growing trained team",
  "A knowledge network feeding procurement impact, fewer manual processes and 10x return",
];

export function ImpactScene({ index, className }: { index: number; className?: string }) {
  const Scene = SCENES[index] ?? Efficiency;
  return (
    <svg viewBox="0 0 560 380" className={className} role="img" aria-label={LABELS[index] ?? LABELS[0]}>
      <defs>
        <filter id="ic-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0c2631" floodOpacity="0.13" />
        </filter>
        <filter id="ic-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="ic-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f1f6f8" />
        </linearGradient>
        <linearGradient id="ic-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={BR} stopOpacity="0.28" />
          <stop offset="1" stopColor={BR} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ic-coin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9b95f" />
          <stop offset="0.5" stopColor="#f2dc9c" />
          <stop offset="1" stopColor="#b8913b" />
        </linearGradient>
        <radialGradient id="ic-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#5fe3f6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#5fe3f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Scene />
    </svg>
  );
}
