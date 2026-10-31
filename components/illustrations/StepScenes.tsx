"use client";

import { motion, useReducedMotion } from "framer-motion";
import { box, iso, planeMatrix } from "@/lib/iso";

/**
 * Six scenes for the "Enterprise AI. From Strategy to Scale." detail card, one
 * per step, each built around what that step actually is:
 *
 *   strategy   Discover  a compass platform with three ideas weighed against it
 *   foundation Build     sources → pipes → a database stack feeding a knowledge graph
 *   genai      Deploy    a chat copilot beside a document being scanned
 *   agents     Automate  agents orbiting a hub while tasks ride a conveyor
 *   scale      Scale     a server rack and a live monitoring dashboard with a CI/CD loop
 *   govern     Govern    a shield inside a walled boundary with a checked audit doc
 *
 * Shared light isometric language: key light top-left (top faces white, +y faces
 * mid, +x faces darkest), teal ink for objects, cyan only for flow and "live" parts.
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

/** Flat matrices for upright planes. x = const: (u = y, v = z). y = const: (u = x, v = z). */
const planeX = (x0: number) => `matrix(${-C} ${S} 0 -1 ${(x0 * C).toFixed(2)} ${(x0 * S).toFixed(2)})`;
const planeY = (y0: number) => `matrix(${C} ${S} 0 -1 ${(-y0 * C).toFixed(2)} ${(y0 * S).toFixed(2)})`;
const quadX = (x0: number, u0: number, u1: number, v0: number, v1: number) =>
  P([iso(x0, u0, v0), iso(x0, u1, v0), iso(x0, u1, v1), iso(x0, u0, v1)]);

const GLYPH: Record<string, React.ReactNode> = {
  bulb: <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z" />,
  chart: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" />,
  target: <g><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 12l6-6" /></g>,
  spark: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />,
  bot: <g><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01" /></g>,
  lock: <g><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3M12 14v2" /></g>,
  justice: <g><path d="M12 4v16M6 20h12M4 8h16" /><path d="M4 8l-2 5a2.5 2.5 0 005 0L4 8zM20 8l-2 5a2.5 2.5 0 005 0l-3-5z" /></g>,
  bell: <path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15L6 16zM10 20a2 2 0 004 0" />,
  check: <path d="M6 12.5l4 4 8-9" />,
  doc: <g><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></g>,
};

/* ---------- small building blocks ------------------------------------------------- */

function Rise({ d = 0, y = 24, children }: { d?: number; y?: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: d, ease: EASE }}
    >
      {children}
    </motion.g>
  );
}

type Faces = ReturnType<typeof box>;
function Solid({ b, top = "#fff", left = "#e6eff2", right = "#d3e2e7", stroke = LINE, w = 1.3 }: { b: Faces; top?: string; left?: string; right?: string; stroke?: string; w?: number }) {
  return (
    <g strokeLinejoin="round" stroke={stroke} strokeWidth={w}>
      <polygon points={b.left} fill={left} />
      <polygon points={b.right} fill={right} />
      <polygon points={b.top} fill={top} />
    </g>
  );
}

function Shadow({ x, y, rx, ry, o = 0.12 }: { x: number; y: number; rx: number; ry: number; o?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#0c2631" opacity={o} filter="url(#ss-blur)" />;
}

/** Iso cylinder; (x, y) is the screen centre of the bottom ellipse. */
function Cyl({ x, y, r, h, top = "#fff", ring }: { x: number; y: number; r: number; h: number; top?: string; ring?: string }) {
  const rx = 1.2247 * r;
  const ry = 0.7071 * r;
  return (
    <g strokeLinejoin="round">
      <path d={`M${x - rx} ${y} A${rx} ${ry} 0 0 0 ${x + rx} ${y} L${x + rx} ${y - h} A${rx} ${ry} 0 0 0 ${x - rx} ${y - h}Z`} fill="url(#ss-side)" stroke={LINE} strokeWidth="1.3" />
      <ellipse cx={x} cy={y - h} rx={rx} ry={ry} fill={top} stroke={ring ?? LINE} strokeWidth={ring ? 1.8 : 1.3} />
    </g>
  );
}

function Badge({ x, y, glyph, d = 0, accent = false, size = 36 }: { x: number; y: number; glyph: string; d?: number; accent?: boolean; size?: number }) {
  const h = size / 2;
  const k = size / 36;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="animate-float" style={{ animationDelay: `${d}s`, animationDuration: "7s" }}>
        <rect x={-h} y={-h + 3} width={size} height={size} rx="8" fill="#0c2631" opacity="0.1" filter="url(#ss-blur)" />
        <rect x={-h} y={-h} width={size} height={size} rx="8" fill="#fff" stroke={accent ? BR : "#dbe7ea"} strokeWidth={accent ? 2 : 1} />
        <g transform={`translate(${-12 * k * 0.86} ${-12 * k * 0.86}) scale(${k * 0.86})`} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {GLYPH[glyph]}
        </g>
      </g>
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

function Halo({ rx = 150, ry = 70, y = 40 }: { rx?: number; ry?: number; y?: number }) {
  return <ellipse cx="0" cy={y} rx={rx} ry={ry} fill="#d9f2f7" opacity="0.55" />;
}

/* ---------- 1 · Discover ------------------------------------------------------------ */

function Discover() {
  const cy = 46;
  const ticks = Array.from({ length: 24 }, (_, i) => i);
  const idea = (x: number, y: number, ex: number, ey: number, glyph: string, d: number, accent = false) => (
    <g key={glyph}>
      <line x1={x} y1={y + 24} x2={ex} y2={ey} stroke={accent ? BR : "#9fc9d3"} strokeWidth="1.5" strokeDasharray="3 4" className="animate-dash" />
      <Badge x={x} y={y} glyph={glyph} d={d} accent={accent} size={accent ? 46 : 38} />
    </g>
  );
  return (
    <>
      <Halo />
      <Rise>
        <Shadow x={0} y={cy + 14} rx={130} ry={38} />
        <Cyl x={0} y={cy} r={86} h={16} />
        <g transform={`translate(0 ${cy})`}>
          <g transform={planeMatrix(0, 0, 16)}>
            <circle r="78" fill="#f4fbfc" stroke={LINE} />
            <circle r="60" fill="none" stroke="#bcd6dd" strokeDasharray="2 5" />
            {ticks.map((i) => {
              const a = (i / 24) * Math.PI * 2;
              const r1 = i % 6 === 0 ? 64 : 70;
              return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * 77} y2={Math.sin(a) * 77} stroke="#9fc9d3" strokeWidth={i % 6 === 0 ? 2.5 : 1.2} />;
            })}
            <g className="animate-needle">
              <polygon points="0,-52 9,0 -9,0" fill={INK} />
              <polygon points="0,52 9,0 -9,0" fill="#bcd6dd" />
            </g>
            <circle r="5.5" fill="#fff" stroke={INK} strokeWidth="2" />
          </g>
        </g>
      </Rise>
      <Rise d={0.35} y={-18}>
        {idea(-168, -16, -90, 34, "bulb", 0)}
        {idea(168, -16, 90, 34, "chart", 1.2)}
        {idea(0, -112, 0, -26, "target", 0.6, true)}
      </Rise>
      <Spark x={-210} y={-96} d={0.4} />
      <Spark x={214} y={-84} s={5} d={1.4} />
      <Spark x={-120} y={110} s={5} d={0.9} />
    </>
  );
}

/* ---------- 2 · Build -------------------------------------------------------------- */

function Build() {
  const pipes = "M58 44H112V104M58 104H112M58 164H112V104M112 104H166";
  const srcY = [22, 82, 142];
  const nodes: Pt[] = [[82, 10], [132, -22], [176, 14], [122, 38]];
  const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 0], [1, 3]];
  const [dx, dy] = iso(205, 104, 0);
  return (
    <g transform="translate(-43 -102)">
      <Rise>
        <Shadow x={30} y={150} rx={190} ry={62} />
        <Solid b={box(0, 0, -10, 290, 190, 10)} top="#fbfeff" />
        {/* pipes */}
        <g transform={planeMatrix(0, 0, 0)} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={pipes} stroke="#d5e9ee" strokeWidth="12" />
          <path d={pipes} stroke={CY} strokeWidth="4" strokeDasharray="2 12" className="animate-dash" />
        </g>
        {/* data sources */}
        {srcY.map((y, i) => (
          <g key={y}>
            <Solid b={box(14, y, 0, 44, 44, 24)} />
            <g transform={planeMatrix(0, 0, 24)} fill="none" stroke={INK} strokeLinecap="round" strokeWidth="2.4">
              {i === 0 && [0, 1, 2].map((k) => <line key={k} x1={24} y1={y + 12 + k * 10} x2={48} y2={y + 12 + k * 10} />)}
              {i === 1 && [0, 1].flatMap((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={22 + c * 16} y={y + 10 + r * 16} width="11" height="11" rx="2" />))}
              {i === 2 && <path d={`M26 ${y + 30} a8 8 0 0 1 4-14 a10 10 0 0 1 19 3 a6.5 6.5 0 0 1-2 11z`} />}
            </g>
          </g>
        ))}
      </Rise>

      {/* database stack */}
      <Rise d={0.3}>
        <Cyl x={dx} y={dy} r={40} h={20} />
        <Cyl x={dx} y={dy - 24} r={40} h={20} />
        <Cyl x={dx} y={dy - 48} r={40} h={20} top="#e8f8fb" ring={BR} />
        <ellipse cx={dx} cy={dy - 68} rx="22" ry="12.5" fill="none" stroke={BR} strokeWidth="1.6" className="animate-glow" />
        {[0, 24, 48].map((z) => (
          <g key={z} fill={z === 48 ? BR : "#9fc9d3"}>
            <circle cx={dx - 22} cy={dy - z + 8} r="2.4" className={z === 48 ? "animate-glow" : undefined} />
            <circle cx={dx - 14} cy={dy - z + 12} r="2.4" />
          </g>
        ))}
      </Rise>

      {/* knowledge graph over the stack */}
      <Rise d={0.55} y={-16}>
        <g transform={`translate(${dx - 125} ${dy - 98})`}>
          <g className="animate-float" style={{ animationDuration: "7s" }}>
            <g stroke="#9fc9d3" strokeWidth="1.6">
              {edges.map(([a, b]) => <line key={`${a}${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />)}
              <line x1={nodes[3][0]} y1={nodes[3][1]} x2={125} y2={70} strokeDasharray="3 4" stroke={BR} className="animate-dash" />
            </g>
            {nodes.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={i === 1 ? 11 : 8} fill="#fff" stroke={INK} strokeWidth="2" />
                {i === 1 && <circle cx={x} cy={y} r="4" fill={BR} className="animate-glow" />}
              </g>
            ))}
          </g>
        </g>
      </Rise>
    </g>
  );
}

/* ---------- 3 · Deploy ------------------------------------------------------------ */

function Deploy() {
  const bx = 40;
  const dots = [0, 1, 2];
  const lines = [0, 1, 2, 3];
  return (
    <g transform="translate(-14 -76)">
      <Rise>
        <Shadow x={20} y={160} rx={180} ry={58} />
        <Solid b={box(0, 0, -10, 250, 200, 10)} top="#fbfeff" />

        {/* upright chat window */}
        <polygon points={quadX(bx, 24, 176, 12, 146)} fill="#0c2631" opacity="0.08" transform="translate(6 4)" />
        <polygon points={quadX(bx, 24, 176, 12, 146)} fill="#fff" stroke={LINE} strokeWidth="1.4" strokeLinejoin="round" />
        <g transform={planeX(bx)}>
          <rect x="24" y="130" width="152" height="16" fill="#f1f8fa" />
          {dots.map((i) => <circle key={i} cx={36 + i * 11} cy="138" r="3" fill={i === 0 ? BR : "#cfe3e8"} />)}
          {/* messages */}
          <rect x="36" y="104" width="68" height="16" rx="8" fill="#e6eff2" />
          <rect x="44" y="110" width="40" height="4" rx="2" fill="#bcd6dd" />
          <rect x="92" y="80" width="76" height="16" rx="8" fill={BR} opacity="0.9" />
          <rect x="102" y="86" width="48" height="4" rx="2" fill="#fff" />
          <rect x="36" y="54" width="84" height="20" rx="10" fill="#e6eff2" />
          {dots.map((i) => <circle key={i} cx={52 + i * 14} cy="64" r="3.4" fill={INK} className="animate-glow" style={{ animationDelay: `${i * 0.3}s` }} />)}
          {/* input */}
          <rect x="34" y="20" width="120" height="18" rx="9" fill="#fff" stroke="#cfe3e8" />
          <circle cx="162" cy="29" r="9" fill={INK} />
          <path d="M158 29h8M163 25l4 4-4 4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </Rise>

      {/* document intelligence: stack + scan beam */}
      <Rise d={0.3}>
        <Solid b={box(132, 108, 0, 76, 60, 3)} />
        <Solid b={box(135, 111, 3, 76, 60, 3)} />
        <Solid b={box(130, 106, 6, 76, 60, 4)} top="#fff" />
        <g transform={planeMatrix(0, 0, 10)} fill="none" strokeLinecap="round">
          {lines.map((i) => <line key={i} x1={140} y1={116 + i * 11} x2={196 - (i % 2) * 18} y2={116 + i * 11} stroke="#bcd6dd" strokeWidth="3" />)}
          <g className="animate-scan">
            <rect x="132" y="110" width="72" height="5" rx="2" fill={CY} opacity="0.85" />
            <rect x="132" y="108" width="72" height="9" fill={CY} opacity="0.25" />
          </g>
        </g>
        <line x1="150" y1="104" x2="60" y2="90" stroke="#9fc9d3" strokeWidth="1.5" strokeDasharray="3 4" className="animate-dash" opacity="0" />
      </Rise>
      <Rise d={0.5} y={-14}>
        <Badge x={64} y={-34} glyph="spark" accent d={0} size={40} />
        <Badge x={-132} y={-30} glyph="doc" d={1.1} />
        <Spark x={150} y={-4} d={0.6} />
        <Spark x={214} y={46} s={5} d={1.5} />
      </Rise>
    </g>
  );
}

/* ---------- 4 · Automate ---------------------------------------------------------- */

function Cube({ s = 26, top = "#8fd7e6", left = "#3f8a9d", right = "#2a6676" }: { s?: number; top?: string; left?: string; right?: string }) {
  const w = s * C;
  const h = s * S;
  const f: Pt = [0, 0];
  const lb: Pt = [-w, -h];
  const rb: Pt = [w, -h];
  const bb: Pt = [0, -2 * h];
  const up = (p: Pt): Pt => [p[0], p[1] - s];
  return (
    <g strokeLinejoin="round" stroke="#0c3a47" strokeOpacity="0.35" strokeWidth="0.8">
      <polygon points={P([f, lb, up(lb), up(f)])} fill={left} />
      <polygon points={P([f, rb, up(rb), up(f)])} fill={right} />
      <polygon points={P([up(f), up(lb), up(bb), up(rb)])} fill={top} />
    </g>
  );
}

function Automate() {
  const reduce = useReducedMotion();
  const R = 118;
  const rx = 1.2247 * R;
  const ry = 0.7071 * R;
  const oc: Pt = iso(0, 0, 0);
  const orbit = `M${-rx} 0a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0`;
  const [x0, y0] = iso(-100, 114, 10);
  const [x1, y1] = iso(100, 114, 10);
  const beltPath = `M${x0} ${y0}L${x1} ${y1}`;
  const sats = [0, 1, 2, 3];
  return (
    <g transform="translate(0 -22)">
      <Halo y={50} />
      <Rise>
        <Shadow x={0} y={50} rx={190} ry={78} />
        {/* orbit rings, drawn on the ground */}
        <g transform={planeMatrix(0, 0, 0)} fill="none">
          <circle r={R} stroke="#bcd6dd" strokeDasharray="3 6" />
          <circle r={R - 26} stroke="#dbe9ed" />
        </g>
        {/* conveyor */}
        <Solid b={box(-112, 92, 0, 224, 46, 8)} top="#f4fbfc" />
        <g transform={planeMatrix(0, 0, 8)} stroke="#cfe3e8" strokeWidth="1.5">
          {Array.from({ length: 11 }, (_, i) => -100 + i * 20).map((x) => <line key={x} x1={x} y1={94} x2={x} y2={136} />)}
        </g>
        {/* hub */}
        <Solid b={box(-36, -36, 0, 72, 72, 36)} />
        <g transform={planeMatrix(0, 0, 36)} fill="none">
          <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#e8f8fb" stroke={BR} strokeWidth="2" />
          <g transform="translate(-12 -12) scale(1)" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{GLYPH.bot}</g>
        </g>
        <line x1={oc[0]} y1={oc[1] - 36} x2={oc[0]} y2={oc[1] - 62} stroke="#8aa3aa" strokeWidth="3" strokeLinecap="round" />
        <circle cx={oc[0]} cy={oc[1] - 66} r="5" fill={BR} className="animate-glow" />
      </Rise>

      {/* agents on orbit */}
      <g transform={`translate(${oc[0]} ${oc[1] - 24})`}>
        {sats.map((k) => {
          const a = (k / 4) * Math.PI * 2;
          const sx = Math.cos(a) * rx;
          const sy = Math.sin(a) * ry;
          const body = (
            <g transform="translate(0 12)">
              <ellipse cx="0" cy="2" rx="16" ry="6" fill="#0c2631" opacity="0.12" />
              <Cube top={k === 0 ? "#c4f1f9" : "#8fd7e6"} />
            </g>
          );
          return reduce ? (
            <g key={k} transform={`translate(${sx.toFixed(1)} ${sy.toFixed(1)})`}>{body}</g>
          ) : (
            <g key={k}>
              <animateMotion dur="20s" begin={`${-5 * k}s`} repeatCount="indefinite" path={orbit} />
              {body}
            </g>
          );
        })}
      </g>

      {/* tasks riding the conveyor */}
      {[0, 1, 2].map((k) => {
        const card = (
          <g>
            <Solid b={box(-13, -13, 0, 26, 26, 6)} w={1} />
            <g transform={planeMatrix(0, 0, 6)} fill="none" stroke={BR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M-6 0l4 4 8-9" />
            </g>
          </g>
        );
        return reduce ? (
          <g key={k} transform={`translate(${(x0 + ((x1 - x0) * (k + 1)) / 4).toFixed(1)} ${(y0 + ((y1 - y0) * (k + 1)) / 4).toFixed(1)})`}>{card}</g>
        ) : (
          <g key={k}>
            <animateMotion dur="7.5s" begin={`${-2.5 * k}s`} repeatCount="indefinite" path={beltPath} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="7.5s" begin={`${-2.5 * k}s`} repeatCount="indefinite" />
            {card}
          </g>
        );
      })}
      <Spark x={-190} y={-60} d={0.3} />
      <Spark x={196} y={-70} s={5} d={1.2} />
    </g>
  );
}

/* ---------- 5 · Scale -------------------------------------------------------------- */

function Scale() {
  const rackX = 10;
  const rackY = 120;
  const rackD = 52;
  const units = [0, 1, 2, 3];
  const [rx, ry] = iso(rackX + 32, rackY + 26, 0);
  const MX = 170; // monitor plane
  const chart = "M28 52 L46 60 L62 50 L80 70 L96 62 L112 86 L126 82";
  return (
    <g transform="translate(-22 -84)">
      <Rise>
        <Shadow x={30} y={160} rx={190} ry={60} />
        <Solid b={box(0, 0, -10, 270, 200, 10)} top="#fbfeff" />

        {/* server rack, at the left */}
        {units.map((i) => {
          const z = i * 24;
          const yf = rackY + rackD;
          return (
            <g key={i}>
              <Solid b={box(rackX, rackY, z, 64, rackD, 20)} />
              <g transform={planeY(yf)}>
                <rect x={rackX + 8} y={z + 6} width="26" height="5" rx="2" fill="#dbe9ed" />
                {[0, 1, 2].map((k) => (
                  <circle key={k} cx={rackX + 44 + k * 7} cy={z + 8.5} r="2.2" fill={k === 0 ? BR : "#9fc9d3"} className={k === 0 ? "animate-glow" : undefined} style={{ animationDelay: `${i * 0.4}s` }} />
                ))}
              </g>
            </g>
          );
        })}
      </Rise>

      {/* monitoring dashboard, at the right */}
      <Rise d={0.3}>
        <Solid b={box(MX - 20, 50, 0, 28, 50, 6)} />
        <Solid b={box(MX - 12, 64, 6, 12, 22, 34)} />
        <polygon points={quadX(MX, 20, 130, 40, 136)} fill="#0c2631" opacity="0.08" transform="translate(6 4)" />
        <polygon points={quadX(MX, 20, 130, 40, 136)} fill="#fff" stroke={LINE} strokeWidth="1.4" strokeLinejoin="round" />
        <g transform={planeX(MX)}>
          <rect x="20" y="122" width="110" height="14" fill="#f1f8fa" />
          <circle cx="30" cy="129" r="3" fill={BR} />
          <rect x="38" y="127" width="30" height="4" rx="2" fill="#cfe3e8" />
          {/* KPI rings */}
          {[0.78, 0.55, 0.9].map((f, i) => {
            const u = 42 + i * 33;
            return (
              <g key={i}>
                <circle cx={u} cy="104" r="9" fill="none" stroke="#e1ecef" strokeWidth="4" />
                <g transform={`rotate(-90 ${u} 104)`}>
                  <motion.circle
                    cx={u}
                    cy="104"
                    r="9"
                    fill="none"
                    stroke={i === 1 ? INK : BR}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: f }}
                    transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease: EASE }}
                  />
                </g>
              </g>
            );
          })}
          {/* live chart */}
          {[50, 66, 82].map((v) => <line key={v} x1="26" y1={v} x2="124" y2={v} stroke="#e1ecef" />)}
          <line x1="26" y1="74" x2="124" y2="74" stroke="#e9a8a0" strokeDasharray="3 4" strokeWidth="1.4" />
          <motion.path
            d={chart}
            fill="none"
            stroke={BR}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          />
        </g>
      </Rise>

      {/* CI/CD loop floating over the rack */}
      <Rise d={0.55} y={-16}>
        <g className="animate-float" style={{ animationDuration: "8s" }}>
          <g transform={planeMatrix(rx, ry, 124)}>
            <circle r="30" fill="#fff" fillOpacity="0.7" stroke="#dbe7ea" />
            <g className="animate-spin-slow">
              <circle r="22" fill="none" stroke={CY} strokeWidth="3" strokeDasharray="40 28" strokeLinecap="round" />
              <polygon points="22,-7 30,2 14,2" fill={BR} />
              <polygon points="-22,7 -30,-2 -14,-2" fill={BR} />
            </g>
            <g transform="translate(-9 -9) scale(0.75)" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">{GLYPH.check}</g>
          </g>
        </g>
        <Badge x={190} y={-40} glyph="bell" d={0.8} />
        <Spark x={-170} y={-46} s={5} d={0.7} />
      </Rise>
    </g>
  );
}

/* ---------- 6 · Govern ------------------------------------------------------------- */

function Govern() {
  const N = 230;
  const [bx, by] = iso(N / 2, N / 2, 0);
  const rows = [0, 1, 2];
  return (
    <g transform="translate(0 -92)">
      <Halo y={90} />
      <Rise>
        <Shadow x={0} y={150} rx={178} ry={62} />
        {/* audit trail running around the plot */}
        <g transform={planeMatrix(0, 0, -10)} fill="none">
          <rect x="-16" y="-16" width={N + 32} height={N + 32} rx="26" stroke={CY} strokeWidth="2" strokeDasharray="3 10" strokeLinecap="round" className="animate-dash" />
        </g>
        <Solid b={box(0, 0, -10, N, N, 10)} top="#fbfeff" />
        <g transform={planeMatrix(0, 0, 0)}>
          <rect x="22" y="22" width={N - 44} height={N - 44} rx="14" fill="#eef9fb" stroke="#d3eaef" />
        </g>
        {/* the boundary: two back walls and three corner posts */}
        <Solid b={box(0, 0, 0, N, 8, 22)} top="#f4fbfc" />
        <Solid b={box(0, 8, 0, 8, N - 8, 22)} top="#f4fbfc" />
        {[[N - 8, 0], [0, N - 8], [N - 8, N - 8]].map(([x, y]) => <Solid key={`${x}${y}`} b={box(x, y, 0, 8, 8, 30)} top="#e8f8fb" stroke="#9fc9d3" />)}
      </Rise>

      {/* the shield */}
      <Rise d={0.3} y={-26}>
        <ellipse cx={bx} cy={by} rx="46" ry="16" fill={BR} opacity="0.2" className="animate-glow" />
        <g transform={`translate(${bx} ${by - 6})`}>
          <g className="animate-float" style={{ animationDuration: "7s" }}>
            <path d="M0 -118 L48 -100 V-52 C48 -22 26 -2 0 10 C-26 -2 -48 -22 -48 -52 V-100 Z" fill="#aec4cb" transform="translate(7 3)" />
            <path d="M0 -118 L48 -100 V-52 C48 -22 26 -2 0 10 C-26 -2 -48 -22 -48 -52 V-100 Z" fill="url(#ss-shield)" stroke="#c9d6da" strokeWidth="1.5" />
            <path d="M0 -106 L38 -92 V-52 C38 -28 20 -10 0 0 C-20 -10 -38 -28 -38 -52 V-92 Z" fill={INK} />
            <motion.path
              d="M-16 -54 l11 11 21 -24"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            />
          </g>
        </g>
      </Rise>

      {/* audit document with a checklist */}
      <Rise d={0.5}>
        <Solid b={box(30, 146, 0, 70, 54, 4)} />
        <g transform={planeMatrix(0, 0, 4)} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {rows.map((i) => (
            <g key={i}>
              <motion.path
                d={`M40 ${158 + i * 14} l4 4 8 -9`}
                stroke={BR}
                strokeWidth="2.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 4.2, delay: 1 + i * 0.35, repeat: Infinity, repeatDelay: 0.6, times: [0, 0.25, 0.85, 1] }}
              />
              <line x1="58" y1={157 + i * 14} x2={90 - (i % 2) * 14} y2={157 + i * 14} stroke="#bcd6dd" strokeWidth="3" />
            </g>
          ))}
        </g>
      </Rise>
      <Rise d={0.6} y={-14}>
        <Badge x={-166} y={20} glyph="justice" d={0.3} />
        <Badge x={166} y={10} glyph="lock" d={1.1} />
        <Spark x={-210} y={-50} d={0.5} />
        <Spark x={206} y={-60} s={5} d={1.3} />
      </Rise>
    </g>
  );
}

/* ---------- public ------------------------------------------------------------------ */

const SCENES: Record<string, () => React.ReactElement> = {
  strategy: Discover,
  foundation: Build,
  genai: Deploy,
  agents: Automate,
  scale: Scale,
  govern: Govern,
};
const LABELS: Record<string, string> = {
  strategy: "a compass platform weighing three ideas",
  foundation: "data sources piped into a database stack and a knowledge graph",
  genai: "a chat copilot beside a document being scanned",
  agents: "agents orbiting a hub while tasks ride a conveyor",
  scale: "a server rack and a live monitoring dashboard with a delivery loop",
  govern: "a shield inside a walled boundary with a checked audit document",
};

export function StepScene({ icon, className }: { icon: string; className?: string }) {
  const Scene = SCENES[icon] ?? Discover;
  return (
    <svg viewBox="-260 -200 520 380" className={className} role="img" aria-label={`Isometric illustration: ${LABELS[icon] ?? ""}`}>
      <defs>
        <filter id="ss-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="ss-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e9f1f4" />
          <stop offset="0.55" stopColor="#d3e2e7" />
          <stop offset="1" stopColor="#bfd3da" />
        </linearGradient>
        <linearGradient id="ss-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfe8ee" />
        </linearGradient>
      </defs>
      <Scene />
    </svg>
  );
}
