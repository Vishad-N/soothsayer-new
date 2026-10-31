import { box, iso, planeMatrix } from "@/lib/iso";
import type { Step } from "@/data/content";

/**
 * Light isometric "orchestration" diagram used beside the stepper:
 * a hub tile wired to satellite tiles, each carrying a small glyph.
 * The hub glyph changes with the active step.
 */
const OX = 300;
const OY = 22;

const hub = { x: 150, y: 150, s: 100 };
const sats = [
  { x: 40, y: 20 }, // top-left
  { x: 300, y: 30 }, // top-right
  { x: 300, y: 290 }, // right
  { x: 30, y: 290 }, // bottom-left
  { x: 170, y: 340 }, // bottom
];
const SAT = 66;

/* Simple flat glyphs drawn in a 24-unit box, laid onto the tile top. */
const GLYPHS: Record<string, React.ReactNode> = {
  bot: (
    <g>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 4v4M9 13h.01M15 13h.01" />
    </g>
  ),
  check: <path d="M6 12.5l4 4 8-9" />,
  hub: (
    <g>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l3 3M15.5 15.5l3 3M5.5 18.5l3-3M15.5 8.5l3-3" />
    </g>
  ),
  strategy: <path d="M4 18l5-6 4 3 7-9M15 6h5v5" />,
  foundation: (
    <g>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </g>
  ),
  genai: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />,
  agents: (
    <g>
      <circle cx="7" cy="8" r="2.5" />
      <circle cx="17" cy="8" r="2.5" />
      <circle cx="12" cy="17" r="2.5" />
      <path d="M9 9.5l2 5M15 9.5l-2 5M9.5 8h5" />
    </g>
  ),
  scale: <path d="M4 20V10M10 20V6M16 20v-8M22 20V3" />,
  govern: (
    <g>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </g>
  ),
};

function Tile({ x, y, s, h, glyph, accent }: { x: number; y: number; s: number; h: number; glyph: React.ReactNode; accent?: boolean }) {
  const b = box(x, y, 0, s, s, h);
  const pad = s * 0.24;
  const k = (s - pad * 2) / 24;
  return (
    <g>
      <polygon points={b.left} fill="#dbe9ed" stroke="#b9d2d9" strokeWidth="1" strokeLinejoin="round" />
      <polygon points={b.right} fill="#c9dde3" stroke="#b9d2d9" strokeWidth="1" strokeLinejoin="round" />
      <polygon points={b.top} fill="#ffffff" stroke={accent ? "#00b4d8" : "#b9d2d9"} strokeWidth={accent ? 1.6 : 1} strokeLinejoin="round" />
      <g transform={`${planeMatrix(0, 0, h)} translate(${x + pad} ${y + pad}) scale(${k})`}>
        <g fill="none" stroke={accent ? "#00b4d8" : "#2b6f80"} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
          {glyph}
        </g>
      </g>
    </g>
  );
}

export function NetworkIso({ icon, className }: { icon: Step["icon"]; className?: string }) {
  const hubC = { x: hub.x + hub.s / 2, y: hub.y + hub.s / 2 };
  return (
    <svg viewBox="0 0 600 420" className={className} role="img" aria-label="AI orchestration network diagram">
      <g transform={`translate(${OX} ${OY})`}>
        {/* Soft glow under the hub */}
        {(() => {
          const [cx, cy] = iso(hubC.x, hubC.y, 0);
          return <ellipse cx={cx} cy={cy} rx="170" ry="90" fill="#00b4d8" opacity="0.07" />;
        })()}

        {/* Connectors on the ground plane */}
        <g transform={planeMatrix()} fill="none" stroke="#00b4d8" strokeWidth="1.6" strokeLinecap="round">
          {sats.map((s, i) => {
            const c = { x: s.x + SAT / 2, y: s.y + SAT / 2 };
            const d = `M${c.x} ${c.y} L${c.x} ${hubC.y} L${hubC.x} ${hubC.y}`;
            return (
              <g key={i}>
                <path d={d} strokeOpacity="0.25" />
                <path d={d} strokeDasharray="4 8" className="animate-dash" style={{ animationDelay: `${i * 0.2}s` }} />
              </g>
            );
          })}
        </g>

        {/* Draw back to front */}
        {[...sats.map((s, i) => ({ ...s, kind: "sat" as const, i })), { ...hub, kind: "hub" as const, i: -1 }]
          .sort((a, b) => a.x + a.y - (b.x + b.y))
          .map((t) =>
            t.kind === "hub" ? (
              <g key="hub">
                <Tile x={hub.x} y={hub.y} s={hub.s} h={18} glyph={GLYPHS[icon] ?? GLYPHS.hub} accent />
              </g>
            ) : (
              <Tile key={t.i} x={t.x} y={t.y} s={SAT} h={12} glyph={t.i === 2 ? GLYPHS.check : GLYPHS.bot} />
            ),
          )}
      </g>
    </svg>
  );
}
