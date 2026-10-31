/**
 * Small isometric helpers for the hand-drawn SVG illustrations.
 * World axes: x runs down-right, y runs down-left, z runs up.
 */
export const C = 0.866; // cos 30°
export const S = 0.5; // sin 30°

export type Pt = [number, number];

export const iso = (x: number, y: number, z = 0): Pt => [(x - y) * C, (x + y) * S - z];

const pts = (list: Pt[]) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

/** The three visible faces of a box: top, left (+y face) and right (+x face). */
export function box(x: number, y: number, z: number, w: number, d: number, h: number) {
  const t = z + h;
  return {
    top: pts([iso(x, y, t), iso(x + w, y, t), iso(x + w, y + d, t), iso(x, y + d, t)]),
    left: pts([iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, t), iso(x, y + d, t)]),
    right: pts([iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, t), iso(x + w, y, t)]),
  };
}

/**
 * SVG transform that maps flat (u, v) drawing coordinates onto the
 * isometric ground plane at height z. Use it to lay icons or rounded
 * rectangles flat on a tile top.
 */
export const planeMatrix = (ox = 0, oy = 0, z = 0) =>
  `matrix(${C} ${S} ${-C} ${S} ${ox} ${oy - z})`;
