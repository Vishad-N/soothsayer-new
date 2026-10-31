"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas double helix of glowing glyph rungs, used as an ambient background.
 *
 * Adapted from the Neon Helix Drift component and re-tuned for this site:
 *  - palette comes from the theme: deep teal (far) → brand cyan → light cyan,
 *    with the brand gold only on the hottest rungs and nodes
 *  - transparent canvas, so the panel's own gradient shows through
 *  - runs only while on screen, and draws a single still frame when the
 *    visitor prefers reduced motion
 *  - pointer light is tracked on the host panel (the content sits above the
 *    canvas and would otherwise swallow the events)
 */

const TUNE = {
  speed: 28, // 50 = one half turn per `halfTurnMs`
  halfTurnMs: 6200,
  radius: 224,
  halfPitch: 900,
  rungsPerHalf: 40,
  glyphSize: 13,
  density: 26, // glyphs per rung
  charShare: 70,
  outlineShare: 18,
  axisX: 52,
  axisY: 50,
  axisAngle: -22,
  depthTilt: 0.45,
  cameraDistance: 1800,
  focusDepth: 50,
  focusBand: 0.15,
  blurPx: 6,
  focusBlur: 41,
  scale: 100,
  // theme palette
  far: "#0f4a5a",
  cyan: "#00b4d8",
  warm: "#8fe4f4",
  hot: "#ecd28c",
  coolStop: 0.42,
  warmStop: 0.8,
  strand: "#00b4d8",
  halo: "#00b4d8",
  haze: "#0e3a47",
  glyphOpacity: 0.85,
  farOpacity: 0.4,
  hotGlow: 0.6,
  hotGlowStart: 0.9,
  nodeShare: 0.05,
  nodeSize: 30,
  strandWidth: 2.6,
  haloWidth: 14,
  haloOpacity: 0.28,
  hazeAmount: 0.22,
  dustCount: 46,
  seed: 7,
  lightRadius: 170,
  parallax: 10,
};

type RGBA = [number, number, number, number];

const CELL = 80;
const G = 16;
const LEVELS = [0, 1.5, 3, 5, 7.5, 10];
const NL = LEVELS.length;
const CHARS = ["2", "5", "7", "0", "8", "3", "Z", "S", "F", "L"];
const NT = 2 + CHARS.length;
const NC = 10;
const GAP = 0.12;
const STEEL: RGBA = [142, 172, 176, 1];

function parseColor(s: string): RGBA {
  let h = s.trim().slice(1);
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const n = parseInt(h.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
}

function mix(a: RGBA, b: RGBA, t: number): RGBA {
  const k = Math.max(0, Math.min(1, t));
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k, 1];
}

function rgba(c: RGBA, a: number) {
  return `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
}

function ramp(t: number, far: RGBA, cyan: RGBA, warm: RGBA, hot: RGBA, cs: number, ws: number): RGBA {
  if (t <= cs) return mix(far, cyan, t / cs);
  if (t <= ws) return mix(cyan, warm, (t - cs) / (ws - cs));
  return mix(warm, hot, (t - ws) / (1 - ws));
}

function hash3(a: number, b: number, c: number) {
  let h = Math.imul(a | 0, 374761393) ^ Math.imul(b | 0, 668265263) ^ Math.imul(c | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  h = Math.imul(h, 2246822519);
  h ^= h >>> 13;
  return (h >>> 0) / 4294967296;
}

function vnoise(x: number, seed: number) {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash3(i, 11, seed) * (1 - u) + hash3(i + 1, 11, seed) * u;
}

function drawGlyphShape(g: CanvasRenderingContext2D, type: number, x: number, y: number) {
  if (type === 0) {
    const w = 14;
    const r = 2;
    const x0 = x - w / 2;
    const y0 = y - w / 2;
    g.beginPath();
    g.moveTo(x0 + r, y0);
    g.arcTo(x0 + w, y0, x0 + w, y0 + w, r);
    g.arcTo(x0 + w, y0 + w, x0, y0 + w, r);
    g.arcTo(x0, y0 + w, x0, y0, r);
    g.arcTo(x0, y0, x0 + w, y0, r);
    g.closePath();
    g.fill();
  } else if (type === 1) {
    g.lineWidth = 2.2;
    g.strokeRect(x - 6.5, y - 6.5, 13, 13);
  } else {
    g.fillText(CHARS[type - 2], x, y + 1);
  }
}

/** One white sprite sheet: every glyph at every blur level. */
function buildWhite(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = NT * NL * CELL;
  c.height = CELL;
  const g = c.getContext("2d")!;
  g.fillStyle = "#ffffff";
  g.strokeStyle = "#ffffff";
  g.font = `700 ${G + 3}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  for (let t = 0; t < NT; t++) {
    for (let l = 0; l < NL; l++) {
      const cx = (t * NL + l) * CELL + CELL / 2;
      const cy = CELL / 2;
      if (LEVELS[l] === 0) {
        drawGlyphShape(g, t, cx, cy);
      } else {
        // draw off-canvas and keep only the blurred shadow
        g.save();
        g.shadowColor = "#ffffff";
        g.shadowBlur = LEVELS[l] * 2;
        g.shadowOffsetX = 10000;
        drawGlyphShape(g, t, cx - 10000, cy);
        g.restore();
      }
    }
  }
  return c;
}

/** Tints the white sheet once per colour-ramp row. */
function buildAtlas(white: HTMLCanvasElement, colors: string[]): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = white.width;
  c.height = CELL * colors.length;
  const g = c.getContext("2d")!;
  for (let r = 0; r < colors.length; r++) {
    g.globalCompositeOperation = "source-over";
    g.drawImage(white, 0, r * CELL);
    g.globalCompositeOperation = "source-atop";
    g.fillStyle = colors[r];
    g.fillRect(0, r * CELL, c.width, CELL);
  }
  g.globalCompositeOperation = "source-over";
  return c;
}

function radialSprite(size: number, stops: [number, string][]): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, col]) => gr.addColorStop(o, col));
  g.fillStyle = gr;
  g.fillRect(0, 0, size, size);
  return c;
}

export function HelixField({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const host = root.closest<HTMLElement>("[data-helix-host]") ?? root;

    let W = 0;
    let H = 0;
    let dpr = 1;

    // palette and sprites are static, so build them once
    const far = parseColor(TUNE.far);
    const cyan = parseColor(TUNE.cyan);
    const warm = parseColor(TUNE.warm);
    const hot = parseColor(TUNE.hot);
    const cols = Array.from({ length: NC }, (_, r) => rgba(ramp(r / (NC - 1), far, cyan, warm, hot, TUNE.coolStop, TUNE.warmStop), 1));
    const atlas = buildAtlas(buildWhite(), cols);
    const glow = radialSprite(64, [[0, rgba(hot, 1)], [0.35, rgba(hot, 0.4)], [1, rgba(hot, 0)]]);
    const node = radialSprite(128, [
      [0, "rgba(255,248,226,1)"],
      [0.14, rgba(hot, 1)],
      [0.3, rgba(hot, 0.55)],
      [0.6, rgba(hot, 0.15)],
      [1, rgba(hot, 0)],
    ]);
    const haloC = parseColor(TUNE.halo);
    const strandC = parseColor(TUNE.strand);
    const hazeC = parseColor(TUNE.haze);
    const whiteC: RGBA = [255, 255, 255, 1];

    const pointer = { x: 0, y: 0, over: 0, overT: 0 };
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.overT = 1;
    };
    const onLeave = () => {
      pointer.overT = 0;
    };

    let sX = new Float32Array(0);
    let sY = new Float32Array(0);
    let sT = new Float32Array(0);
    let sS = new Float32Array(0);
    let sP = new Float32Array(0);

    let phi = 0.9;
    let time = 0;

    const draw = (dt: number) => {
      if (W < 2 || H < 2) return;
      const hk = reduce ? 0 : 1;
      pointer.over += (pointer.overT - pointer.over) * (1 - Math.exp(-dt * 4));

      if (!reduce) {
        phi += ((dt * Math.PI) / (TUNE.halfTurnMs / 1000)) * (TUNE.speed / 50);
        if (phi > Math.PI * 2) phi -= Math.PI * 2;
        time += dt;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, W, H);

      const u800 = H / 800;
      const f = u800 * (TUNE.scale / 100);
      const R = TUNE.radius * f;
      const half = TUNE.halfPitch * f;
      const pitch = half * 2;
      const spacing = half / TUNE.rungsPerHalf;
      const n = TUNE.density;
      const cx = (W * TUNE.axisX) / 100;
      const cy = (H * TUNE.axisY) / 100;
      const a0 = (TUNE.axisAngle * Math.PI) / 180;
      const nx = Math.sin(a0);
      const ny = Math.cos(a0);
      const diag = Math.hypot(W, H);
      const tilt = TUNE.depthTilt;
      const F = TUNE.cameraDistance * u800;
      const vx = W / 2;
      const vy = H / 2;
      const focusZ = (R * TUNE.focusDepth) / 100;
      const blurK = (TUNE.focusBlur / 50) * TUNE.blurPx * u800;
      const gBase = TUNE.glyphSize * f;
      const Smax = diag * 0.8;

      const pk = pointer.over * hk;
      const pnx = (pointer.x / W - 0.5) * 2;
      const pny = (pointer.y / H - 0.5) * 2;
      const parX = (pnx * TUNE.parallax * u800 * pk) / R;
      const parY = (pny * TUNE.parallax * u800 * pk) / R;
      const lightR2 = Math.pow(TUNE.lightRadius * u800, 2);
      const lightK = pk * 0.45;

      const axisX = (s: number) => cx + Math.cos(a0) * s;
      const axisY = (s: number) => cy - Math.sin(a0) * s;
      const sigmaAt = (z: number) => blurK * Math.max(0, Math.abs(z - focusZ) / R - TUNE.focusBand);

      ctx.globalCompositeOperation = "lighter";

      // dust
      for (let d = 0; d < TUNE.dustCount; d++) {
        const hx = hash3(d, 1, TUNE.seed + 90);
        const hy = hash3(d, 2, TUNE.seed + 90);
        const hs = hash3(d, 3, TUNE.seed + 90);
        const hb = hash3(d, 4, TUNE.seed + 90);
        const zd = (hash3(d, 5, TUNE.seed + 90) - 0.5) * 2 * R;
        const x = hx * W + Math.sin(time * 0.07 + hs * 6.28) * 4 * u800 + parX * zd;
        const y = hy * H + Math.cos(time * 0.05 + hb * 6.28) * 3 * u800 + parY * zd;
        const r = (0.6 + hs * 0.9) * Math.max(0.8, u800);
        const col = hb > 0.5 ? cyan : STEEL;
        const a = (0.3 + 0.3 * hash3(d, 6, TUNE.seed + 90)) * (0.75 + 0.25 * Math.sin(time * 0.8 + hs * 20));
        if (hb > 0.45) {
          ctx.fillStyle = rgba(col, a * 0.35);
          ctx.beginPath();
          ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = rgba(col, a * 0.7);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const i0 = Math.ceil(-Smax / spacing);
      const i1 = Math.floor(Smax / spacing);

      // haze: one path of rungs, filling each bulge silhouette
      {
        const hs = spacing / 3;
        ctx.beginPath();
        for (let i = i0 * 3; i <= i1 * 3; i++) {
          const s = i * hs;
          const ax = axisX(s);
          const ay = axisY(s);
          const za = -s * tilt;
          const th = (2 * Math.PI * s) / pitch + phi;
          const c = Math.cos(th);
          const sn = Math.sin(th);
          const z0 = za + R * sn;
          const z1 = za - R * sn;
          const p0 = F / Math.max(1, F - z0);
          const p1 = F / Math.max(1, F - z1);
          const x0 = vx + (ax + R * c * nx - vx) * p0 + parX * z0;
          const y0 = vy + (ay + R * c * ny - vy) * p0 + parY * z0;
          const x1 = vx + (ax - R * c * nx - vx) * p1 + parX * z1;
          const y1 = vy + (ay - R * c * ny - vy) * p1 + parY * z1;
          if (Math.max(x0, x1) < -R || Math.min(x0, x1) > W + R || Math.max(y0, y1) < -R || Math.min(y0, y1) > H + R) continue;
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
        }
        ctx.lineCap = "butt";
        ctx.strokeStyle = rgba(hazeC, TUNE.hazeAmount * 0.3);
        ctx.lineWidth = hs * 2.6 + 8 * f;
        ctx.stroke();
        ctx.strokeStyle = rgba(hazeC, TUNE.hazeAmount * 0.5);
        ctx.lineWidth = hs * 1.4;
        ctx.stroke();
      }

      // strands: tubes with a soft halo, widening out of focus
      const step = Math.max(3, half / 64);
      const ns = Math.floor((2 * Smax) / step) + 1;
      if (sX.length < ns) {
        sX = new Float32Array(ns);
        sY = new Float32Array(ns);
        sT = new Float32Array(ns);
        sS = new Float32Array(ns);
        sP = new Float32Array(ns);
      }
      const CH = 5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let k = 0; k < 2; k++) {
        for (let q = 0; q < ns; q++) {
          const s = -Smax + q * step;
          const ax = axisX(s);
          const ay = axisY(s);
          const za = -s * tilt;
          const th = (2 * Math.PI * s) / pitch + phi + k * Math.PI;
          const c = Math.cos(th);
          const sn = Math.sin(th);
          const z = za + R * sn;
          const p = F / Math.max(1, F - z);
          sX[q] = vx + (ax + R * c * nx - vx) * p + parX * z;
          sY[q] = vy + (ay + R * c * ny - vy) * p + parY * z;
          sT[q] = (sn + 1) / 2;
          sS[q] = sigmaAt(z);
          sP[q] = p;
        }
        for (let q0 = 0; q0 < ns - 1; q0 += CH) {
          const q1 = Math.min(ns - 1, q0 + CH);
          const mid = (q0 + q1) >> 1;
          if (sX[mid] < -80 || sX[mid] > W + 80 || sY[mid] < -80 || sY[mid] > H + 80) continue;
          const t = sT[mid];
          const sg = sS[mid];
          const p = sP[mid];
          ctx.beginPath();
          ctx.moveTo(sX[q0], sY[q0]);
          for (let q = q0 + 1; q <= q1; q++) ctx.lineTo(sX[q], sY[q]);
          ctx.lineWidth = (TUNE.haloWidth * f + sg * 4) * p;
          ctx.strokeStyle = rgba(haloC, (TUNE.haloOpacity * (0.55 + 0.45 * t)) / (1 + sg * 0.12));
          ctx.stroke();
          ctx.lineWidth = (TUNE.strandWidth * f + sg * 2.2) * p;
          ctx.strokeStyle = rgba(mix(strandC, whiteC, 0.2 * Math.max(0, (t - 0.5) * 2)), (0.4 + 0.6 * t) / (1 + sg * 0.35));
          ctx.stroke();
        }
      }

      // glyph rungs: separate bars of glyphs, strand to strand
      const charP = TUNE.charShare / 100;
      const outP = TUNE.outlineShare / 100;
      const lastLevel = LEVELS[NL - 1];
      const seed = TUNE.seed;

      for (let i = i0; i <= i1; i++) {
        const s = i * spacing;
        const ax = axisX(s);
        const ay = axisY(s);
        const za = -s * tilt;
        const th = (2 * Math.PI * s) / pitch + phi;
        const c = Math.cos(th);
        const sn = Math.sin(th);
        const ex = R * c * nx;
        const ey = R * c * ny;
        const ez = R * sn;
        const pa = F / Math.max(1, F - (za + ez));
        const pb = F / Math.max(1, F - (za - ez));
        const xa = vx + (ax + ex - vx) * pa;
        const ya = vy + (ay + ey - vy) * pa;
        const xb = vx + (ax - ex - vx) * pb;
        const yb = vy + (ay - ey - vy) * pb;
        const m = 60 * u800;
        if (Math.max(xa, xb) < -m || Math.min(xa, xb) > W + m || Math.max(ya, yb) < -m || Math.min(ya, yb) > H + m) continue;

        // warmth is fixed to the rung (turns with the helix), strongest at the centre
        const centre = Math.exp(-Math.pow(s / (1.5 * half), 2));
        const wr = 0.55 * vnoise(i / 5 + 0.37, seed) + 0.45 * centre;

        for (let j = 0; j < n; j++) {
          if (hash3(i, j, seed + 1) < GAP) continue;
          const u = 0.05 + (0.9 * j) / (n - 1);
          const w = 1 - 2 * u;
          const z = za + ez * w;
          const p = F / Math.max(1, F - z);
          const X = vx + (ax + ex * w - vx) * p + parX * z;
          const Y = vy + (ay + ey * w - vy) * p + parY * z;
          if (X < -m || X > W + m || Y < -m || Y > H + m) continue;
          const front = (sn * w + 1) / 2;

          const dx = X - pointer.x;
          const dy = Y - pointer.y;
          const lit = lightK > 0 ? lightK * Math.exp(-(dx * dx + dy * dy) / lightR2) : 0;

          const hj = hash3(i, j, seed + 2);
          let cv = 0.12 + wr * 0.85 + (hj - 0.5) * 0.45 + lit * 0.3;
          if (wr > 0.55 && hash3(i, j, seed + 5) > 0.93) cv = 0.94 + 0.06 * hj;
          cv = Math.max(0, Math.min(1, cv));
          const row = Math.round(cv * (NC - 1));

          const ht = hash3(i, j, seed + 3);
          const type = ht < charP ? 2 + Math.floor((ht / charP) * CHARS.length) % CHARS.length : ht < charP + outP ? 1 : 0;

          const sg = sigmaAt(z);
          const size = gBase * p;
          const k = size / G;
          const sa = Math.min(lastLevel, sg / Math.max(0.05, k));
          let lv = 0;
          let best = 1e9;
          for (let l = 0; l < NL; l++) {
            const d = Math.abs(LEVELS[l] - sa);
            if (d < best) {
              best = d;
              lv = l;
            }
          }

          ctx.globalAlpha = Math.max(0, Math.min(1, TUNE.glyphOpacity * (TUNE.farOpacity + (1 - TUNE.farOpacity) * front) * (1 + lit * 1.5)));
          const dw = CELL * k;
          ctx.drawImage(atlas, (type * NL + lv) * CELL, row * CELL, CELL, CELL, X - dw / 2, Y - dw / 2, dw, dw);

          if (cv > TUNE.hotGlowStart) {
            const gs = size * (3.2 + sg * 0.15);
            ctx.globalAlpha = Math.min(1, (TUNE.hotGlow * (cv - TUNE.hotGlowStart)) / (1 - TUNE.hotGlowStart)) * (0.5 + 0.5 * front);
            ctx.drawImage(glow, X - gs / 2, Y - gs / 2, gs, gs);
          }
        }

        // hot nodes riding on the strands
        for (let e = 0; e < 2; e++) {
          if (hash3(i, 70 + e, seed) >= TUNE.nodeShare) continue;
          const w = e === 0 ? 1 : -1;
          const z = za + ez * w;
          const p = F / Math.max(1, F - z);
          const X = vx + (ax + ex * w - vx) * p + parX * z;
          const Y = vy + (ay + ey * w - vy) * p + parY * z;
          const sg = sigmaAt(z);
          const ns2 = TUNE.nodeSize * f * p * (1 + sg * 0.08);
          ctx.globalAlpha = 0.95 / (1 + sg * 0.15);
          ctx.drawImage(node, X - ns2 / 2, Y - ns2 / 2, ns2, ns2);
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    // loop: only while on screen and motion is allowed
    let raf = 0;
    let last = -1;
    let visible = false;
    const tick = (now: number) => {
      const dt = last < 0 ? 0 : Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || reduce || !visible) return;
      last = -1;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      W = root.offsetWidth;
      H = root.offsetHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      draw(0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className={className}>
      <canvas ref={canvasRef} className="absolute inset-0 block size-full" />
    </div>
  );
}
