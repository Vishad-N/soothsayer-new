import { box, iso, planeMatrix } from "@/lib/iso";

/**
 * Light isometric platform with a central emblem and four icon tiles.
 * Used in the Expertise tabs; `variant` swaps the emblem and tile glyphs.
 */
type Variant = "trust" | "blueprint" | "competency";

const OX = 300;
const OY = 70;

const G: Record<string, React.ReactNode> = {
  person: <g><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1-4 3.8-6 7-6s6 2 7 6" /></g>,
  scale: <g><path d="M12 4v16M6 20h12M4 9h16" /><path d="M4 9l-2 5a2.5 2.5 0 005 0L4 9zM20 9l-2 5a2.5 2.5 0 005 0l-3-5z" /></g>,
  db: <g><ellipse cx="12" cy="6" rx="7" ry="2.5" /><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></g>,
  lock: <g><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3M12 14v2" /></g>,
  map: <g><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" /><path d="M9 4v14M15 6v14" /></g>,
  target: <g><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /></g>,
  chart: <g><path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" /></g>,
  layers: <g><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></g>,
  cap: <g><path d="M2 9l10-5 10 5-10 5L2 9z" /><path d="M6 11v5c2 2 10 2 12 0v-5" /></g>,
  book: <g><path d="M4 5c3-1 6-1 8 1v14c-2-2-5-2-8-1V5zM20 5c-3-1-6-1-8 1v14c2-2 5-2 8-1V5z" /></g>,
  users: <g><circle cx="9" cy="8" r="3" /><path d="M3 19c.7-3 3-5 6-5s5.3 2 6 5" /><circle cx="17" cy="9" r="2.4" /></g>,
  award: <g><circle cx="12" cy="9" r="5" /><path d="M9 13.5L8 21l4-2 4 2-1-7.5" /></g>,
};

const SETS: Record<Variant, { tiles: string[]; emblem: React.ReactNode; labels: [string, string] }> = {
  trust: {
    tiles: ["person", "scale", "db", "lock"],
    emblem: <path d="M9 12.5l2.2 2.2L15.5 10" />,
    labels: ["Planning Route", "Staged Milestone"],
  },
  blueprint: {
    tiles: ["target", "map", "layers", "chart"],
    emblem: <path d="M7 15l3-4 3 2 4-5" />,
    labels: ["Opportunity Map", "Target Roadmap"],
  },
  competency: {
    tiles: ["cap", "book", "users", "award"],
    emblem: <path d="M12 7v10M7 12h10" />,
    labels: ["Enablement Path", "Skill Milestone"],
  },
};

// Satellite tiles around the platform (world coords).
const SAT = [
  { x: -40, y: -150 }, // top
  { x: 210, y: -60 }, // right-top
  { x: -170, y: 60 }, // left
  { x: 250, y: 140 }, // right
];

function IconTile({ x, y, glyph }: { x: number; y: number; glyph: React.ReactNode }) {
  const s = 76;
  const b = box(x, y, 40, s, s, 14);
  const k = (s - 32) / 24;
  return (
    <g>
      <polygon points={b.left} fill="#e4eef1" stroke="#c4d6dc" strokeLinejoin="round" />
      <polygon points={b.right} fill="#d3e3e8" stroke="#c4d6dc" strokeLinejoin="round" />
      <polygon points={b.top} fill="#fff" stroke="#c4d6dc" strokeLinejoin="round" />
      {/* glyph stands upright on the tile face for legibility */}
      {(() => {
        const [cx, cy] = iso(x + s / 2, y + s / 2, 54);
        return (
          <g transform={`translate(${cx - 12 * k * 0.8} ${cy - 12 * k * 0.8 - 4}) scale(${k * 0.8})`} fill="none" stroke="#1f5c6c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {glyph}
          </g>
        );
      })()}
    </g>
  );
}

export function ShieldPlatform({ variant = "trust", className }: { variant?: Variant; className?: string }) {
  const set = SETS[variant];
  const P = 260; // platform size
  const layers = [
    { inset: 0, z: 0, h: 10, top: "#f4f8f9" },
    { inset: 30, z: 10, h: 10, top: "#ffffff" },
    { inset: 70, z: 20, h: 12, top: "#e9f7fa" },
  ];
  const [ex, ey] = iso(P / 2, P / 2, 32);

  return (
    <svg viewBox="0 0 600 470" className={className} role="img" aria-label="Isometric governance platform illustration">
      <defs>
        <linearGradient id="sp-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfe8ee" />
        </linearGradient>
        <filter id="sp-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0c2631" floodOpacity="0.12" />
        </filter>
      </defs>
      <g transform={`translate(${OX} ${OY + 90})`}>
        {/* connectors from tiles to platform */}
        <g transform={planeMatrix(0, 0, 0)} fill="none" stroke="#00b4d8" strokeWidth="1.4">
          {SAT.map((s, i) => (
            <path key={i} d={`M${s.x + 38} ${s.y + 38} L${P / 2} ${P / 2}`} strokeOpacity="0.35" strokeDasharray="4 6" className="animate-dash" />
          ))}
        </g>

        {/* platform stack */}
        <g filter="url(#sp-shadow)">
          {layers.map((l, i) => {
            const b = box(l.inset, l.inset, l.z, P - l.inset * 2, P - l.inset * 2, l.h);
            return (
              <g key={i}>
                <polygon points={b.left} fill="#dce9ed" stroke="#c4d6dc" strokeLinejoin="round" />
                <polygon points={b.right} fill="#cbdde3" stroke="#c4d6dc" strokeLinejoin="round" />
                <polygon points={b.top} fill={l.top} stroke="#c4d6dc" strokeLinejoin="round" />
              </g>
            );
          })}
          {/* grid etched on the top layer */}
          <g transform={planeMatrix(0, 0, 32)} stroke="#00b4d8" strokeOpacity="0.35" strokeWidth="1">
            {[90, 110, 130, 150, 170].map((v) => (
              <g key={v}>
                <line x1={v} y1={74} x2={v} y2={186} />
                <line x1={74} y1={v} x2={186} y2={v} />
              </g>
            ))}
          </g>
        </g>

        {/* back tiles first, then emblem, then front tiles */}
        {SAT.slice(0, 2).map((s, i) => <IconTile key={i} x={s.x} y={s.y} glyph={G[set.tiles[i]]} />)}

        {/* upright shield emblem */}
        <g className="animate-float" transform={`translate(${ex} ${ey - 70})`}>
          <ellipse cx="0" cy="78" rx="46" ry="14" fill="#00b4d8" opacity="0.18" />
          <path d="M0 -46 L40 -30 V8 C40 34 22 52 0 62 C-22 52 -40 34 -40 8 V-30 Z" fill="url(#sp-shield)" stroke="#a9cfd8" strokeWidth="1.5" filter="url(#sp-shadow)" />
          <path d="M0 -34 L29 -22 V6 C29 26 16 40 0 48 C-16 40 -29 26 -29 6 V-22 Z" fill="#e3f6fa" stroke="#00b4d8" strokeOpacity="0.5" />
          <g transform="translate(-18 -14) scale(1.5)" fill="none" stroke="#00b4d8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {set.emblem}
          </g>
        </g>

        {SAT.slice(2).map((s, i) => <IconTile key={i + 2} x={s.x} y={s.y} glyph={G[set.tiles[i + 2]]} />)}

        {/* labels */}
        {(() => {
          const [lx, ly] = iso(-40, P + 40, 0);
          const [rx, ry] = iso(P + 60, 40, 0);
          return (
            <g fontFamily="var(--font-sans)" fontSize="12" fill="#3d5560">
              <circle cx={lx + 70} cy={ly - 8} r="3" fill="#00b4d8" />
              <text x={lx} y={ly + 14}>{set.labels[0]}</text>
              <circle cx={rx - 30} cy={ry - 8} r="3" fill="#00b4d8" />
              <text x={rx - 70} y={ry + 14}>{set.labels[1]}</text>
            </g>
          );
        })()}
      </g>
    </svg>
  );
}
