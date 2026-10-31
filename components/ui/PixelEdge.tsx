/**
 * "Pixel skyline" that joins a light section to the dark one below it.
 * Place it at the top of the dark section.
 *
 * Concept: the dark band is made of data. Its top edge is a row of columns
 * (an equaliser / skyline) and each column dissolves upward into a few loose
 * pixels that fade out, so the dark never meets the light as a hard cut.
 * Every cell is a true square (columns share the width equally and the pixels
 * are `aspect-square`), so the pattern scales with the viewport instead of
 * stretching. A few column tops carry a faint cyan edge-light and the loose
 * pixels shimmer on staggered delays.
 *
 * Deterministic on purpose (no Math.random): server and client render the
 * same markup, so there is no hydration mismatch.
 */
const COLS = 72;

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Smooth rolling heights, in whole cells, so neighbours relate to each other.
const columns = Array.from({ length: COLS }, (_, i) => {
  const wave = 2.2 + 1.1 * Math.sin(i * 0.33) + 0.8 * Math.sin(i * 0.91 + 1.2);
  const body = Math.max(1, Math.min(4, Math.round(wave + (hash(i) - 0.5) * 1.2)));
  const loose = hash(i + 100) < 0.7 ? (hash(i + 200) < 0.4 ? 2 : 1) : 0;
  const lit = hash(i + 300) < 0.16;
  return { body, loose, lit, delay: (hash(i + 400) * 5).toFixed(2) };
});

/** `accent` adds the cyan edge-light; keep it for dark joins, it reads as stray dashes on light-on-light. */
export function PixelEdge({ color = "var(--color-deep)", accent = true, className = "" }: { color?: string; accent?: boolean; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-full flex items-end ${className}`}>
      {columns.map((c, i) => (
        <div key={i} className="flex flex-1 flex-col-reverse">
          {/* solid body, as tall as `body` square cells */}
          <span
            className="block w-full"
            style={{
              aspectRatio: `1 / ${c.body}`,
              background: color,
              boxShadow: accent && c.lit ? "inset 0 2px 0 rgb(0 180 216 / 0.55)" : undefined,
            }}
          />
          {/* loose pixels thinning out above it */}
          {Array.from({ length: c.loose }, (_, k) => (
            <span
              key={k}
              className="animate-glow block aspect-square w-full scale-[0.62]"
              style={{
                background: color,
                opacity: k === 0 ? 0.55 : 0.28,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
