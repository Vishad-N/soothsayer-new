/**
 * Concentric arcs in a card's top-right corner. The parent card must be `relative overflow-hidden group`:
 * on hover the rings expand outward and a fourth one appears (see .corner-rings in globals.css).
 */
export function CornerRings() {
  return (
    <svg aria-hidden viewBox="0 0 80 80" className="corner-rings pointer-events-none absolute right-0 top-0 size-20 overflow-visible text-brand">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="80" cy="0" r="26" />
        <circle cx="80" cy="0" r="44" />
        <circle cx="80" cy="0" r="62" />
        <circle cx="80" cy="0" r="80" />
      </g>
    </svg>
  );
}
