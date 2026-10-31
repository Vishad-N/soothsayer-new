"use client";

import { useEffect, useRef } from "react";

/**
 * Bead cloth: tens of thousands of shaded beads on a sheet that is pulled up
 * into a creased peak, with a flickering glowing band and arc, bloom on the
 * lit beads, a camera swing that loops without a cut, and pointer play.
 *
 * Re-created from the public description of Originkit's "Bead Cloth Lift";
 * it is our own implementation (raw WebGL, no dependencies), tuned to the
 * site's palette.
 *
 *  - every bead is a GPU point shaded as a small sphere (diffuse from the
 *    surface slope, specular highlight, rim light)
 *  - the height field is a Gaussian peak with radial creases, slow drape
 *    waves and tap ripples; it is evaluated in the vertex shader and mirrored
 *    in JS so the pointer can be placed *on the cloth surface*, which keeps
 *    beads hidden behind a fold dark
 *  - bloom is a second additive pass of soft sprites for the lit beads only
 *  - press and drag leans the peak and it springs back; a tap sends ripples
 *  - runs only while on screen; reduced motion draws one still frame
 */

const TUNE = {
  cloth: "#0f5468",
  glow: "#00b4d8",
  highlight: "#d9f5fb",
  core: "#8fe4f4",
  lift: 70, // peak height
  scale: 50, // bead pitch / size, lower = finer
  zoom: 100,
  hover: 50,
  ripple: 50,
  speed: 50,
  cycle: 18, // seconds for one lift + camera loop at speed 50
};

const PEAK = [-0.2, 2.9];
const FOV = (34 * Math.PI) / 180;
const HALF_X = 9;
const HALF_Z = 7;
const MAX_RIPPLES = 4;

const HEIGHT_GLSL = /* glsl */ `
uniform float u_t;
uniform float u_lift;
uniform vec2 u_lean;
uniform vec4 u_rip[${MAX_RIPPLES}];
const vec2 PEAK = vec2(${PEAK[0].toFixed(2)}, ${PEAK[1].toFixed(2)});

float baseH(vec2 p) {
  vec2 d = p - (PEAK + u_lean);
  float r = length(d);
  float a = atan(d.y, d.x);
  float peak = exp(-r * r / (2.0 * 1.75 * 1.75));
  float cr = 1.0
    + 0.22 * sin(7.0 * a + 0.5 * sin(u_t * 0.25)) * smoothstep(0.2, 2.0, r)
    + 0.07 * sin(15.0 * a) * smoothstep(0.5, 2.5, r);
  float y = u_lift * 3.8 * peak * cr * (1.0 + 0.35 * length(u_lean));
  y += 0.20 * sin(p.x * 0.9 + u_t * 0.35) * sin(p.y * 0.7 - u_t * 0.27)
     + 0.10 * sin(p.x * 1.9 - p.y * 1.3 + u_t * 0.5);
  return y;
}

float ripH(vec2 p) {
  float y = 0.0;
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    float age = u_rip[i].z;
    if (age > 0.0) {
      float w = length(p - u_rip[i].xy) - age * 3.2;
      y += u_rip[i].w * 0.45 * exp(-w * w * 5.0) * exp(-age * 0.8) * cos(w * 5.0);
    }
  }
  return y;
}

float H(vec2 p) { return baseH(p) + ripH(p); }
`;

const VERT = /* glsl */ `
precision highp float;
attribute vec3 a_bead;
uniform mat4 u_vp;
uniform float u_size;
uniform float u_ppu;
uniform float u_pass;
uniform vec4 u_ptr;
${HEIGHT_GLSL}
varying vec3 v_n;
varying float v_lit;
varying float v_edge;
varying float v_depth;

float hash(float x) { return fract(sin(x * 12.9898) * 43758.5453); }

void main() {
  vec2 p = a_bead.xy;
  float seed = a_bead.z;

  // beads part around the cursor
  vec2 dp = p - u_ptr.xz;
  float part = u_ptr.w * exp(-dot(dp, dp) / 1.2);
  p += normalize(dp + vec2(1e-4)) * part * 0.28;

  float y = H(p);
  vec3 pos = vec3(p.x, y, p.y);

  float e = 0.06;
  float hx = H(p + vec2(e, 0.0)) - H(p - vec2(e, 0.0));
  float hz = H(p + vec2(0.0, e)) - H(p - vec2(0.0, e));
  v_n = normalize(vec3(-hx, 2.0 * e, -hz));

  // glowing band along one fold, and an arc of beads around the peak
  vec2 d = p - (PEAK + u_lean);
  float r = length(d);
  float a = atan(d.y, d.x);
  float band = exp(-pow((a - 0.75) * max(r, 0.5) / 0.32, 2.0))
             * smoothstep(0.5, 1.4, r) * (1.0 - smoothstep(3.6, 5.2, r));
  float arc = exp(-pow((r - 3.9) / 0.16, 2.0))
            * smoothstep(-2.6, -1.7, a) * (1.0 - smoothstep(-0.9, -0.1, a));
  float flick = 0.35 + 0.65 * hash(seed * 91.7 + floor(u_t * 9.0 + seed * 13.0));
  float lit = (band * 0.95 + arc * 0.8) * flick;

  // cursor light, measured in 3D so beads behind a fold stay dark
  vec3 dc = pos - u_ptr.xyz;
  lit += u_ptr.w * exp(-dot(dc, dc) / 0.9) * 0.9;

  // tap rings
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    float age = u_rip[i].z;
    if (age > 0.0) {
      float w = length(p - u_rip[i].xy) - age * 3.2;
      lit += u_rip[i].w * exp(-w * w * 6.0) * exp(-age * 1.1) * 0.9;
    }
  }
  lit = clamp(lit, 0.0, 1.4);

  v_lit = lit;
  v_edge = (1.0 - smoothstep(7.5, 9.0, abs(p.x))) * (1.0 - smoothstep(5.5, 7.0, abs(p.y)));

  vec4 clip = u_vp * vec4(pos, 1.0);
  v_depth = clip.w;
  gl_Position = clip;

  float size = u_size * (1.0 + 0.45 * lit);
  float px = size * u_ppu / clip.w;
  if (u_pass > 0.5) {
    if (lit < 0.05) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); }
    px *= 5.5;
  }
  gl_PointSize = clamp(px, 1.5, 64.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;
uniform float u_pass;
uniform vec3 u_cloth;
uniform vec3 u_glow;
uniform vec3 u_highlight;
uniform vec3 u_core;
varying vec3 v_n;
varying float v_lit;
varying float v_edge;
varying float v_depth;

void main() {
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float rr = dot(q, q);
  if (rr > 1.0) discard;

  if (u_pass > 0.5) {
    float a = exp(-rr * 3.2) * clamp(v_lit, 0.0, 1.0) * 0.22 * v_edge;
    gl_FragColor = vec4(u_glow * a, 0.0);
    return;
  }

  vec3 sn = vec3(q.x, -q.y, sqrt(1.0 - rr));
  vec3 L = normalize(vec3(-0.45, 0.6, 0.65));
  float wrap = clamp(dot(v_n, normalize(vec3(-0.5, 0.8, 0.4))) * 0.5 + 0.5, 0.0, 1.0);
  float diff = max(dot(sn, L), 0.0);
  float spec = pow(max(dot(reflect(-L, sn), vec3(0.0, 0.0, 1.0)), 0.0), 22.0);
  float rim = pow(1.0 - sn.z, 2.6);

  vec3 col = u_cloth * (0.22 + 0.95 * wrap) * (0.35 + 0.8 * diff);
  col += u_highlight * spec * (0.22 + 0.4 * wrap);
  col += u_cloth * rim * 0.9;

  float lit = clamp(v_lit, 0.0, 1.0);
  vec3 hot = mix(u_glow, u_core, spec + lit * 0.35);
  col = mix(col, hot * (0.8 + 0.5 * diff), lit);
  col += u_glow * lit * rim * 0.8;

  float fog = clamp((v_depth - 9.0) / 14.0, 0.0, 1.0);
  col *= 1.0 - 0.55 * fog;

  float a = v_edge;
  gl_FragColor = vec4(col * a, a);
}
`;

// ---- tiny matrix helpers (column-major) ------------------------------------
type V3 = [number, number, number];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: V3): V3 => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function viewProj(eye: V3, target: V3, aspect: number): Float32Array {
  const f = norm(sub(target, eye));
  const s = norm(cross(f, [0, 1, 0]));
  const u = cross(s, f);
  const view = [
    s[0], u[0], -f[0], 0,
    s[1], u[1], -f[1], 0,
    s[2], u[2], -f[2], 0,
    -dot(s, eye), -dot(u, eye), dot(f, eye), 1,
  ];
  const near = 1;
  const far = 80;
  const t = 1 / Math.tan(FOV / 2);
  const proj = [
    t / aspect, 0, 0, 0,
    0, t, 0, 0,
    0, 0, (far + near) / (near - far), -1,
    0, 0, (2 * far * near) / (near - far), 0,
  ];
  const out = new Float32Array(16);
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) sum += proj[k * 4 + r] * view[c * 4 + k];
      out[c * 4 + r] = sum;
    }
  return out;
}

function hexToVec(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/** JS mirror of baseH(), used to land the pointer on the cloth surface. */
function heightAt(x: number, z: number, lift: number, lean: [number, number], t: number) {
  const dx = x - (PEAK[0] + lean[0]);
  const dz = z - (PEAK[1] + lean[1]);
  const r = Math.hypot(dx, dz);
  const a = Math.atan2(dz, dx);
  const ss = (e0: number, e1: number, v: number) => {
    const k = Math.min(1, Math.max(0, (v - e0) / (e1 - e0)));
    return k * k * (3 - 2 * k);
  };
  const peak = Math.exp(-(r * r) / (2 * 1.75 * 1.75));
  const cr = 1 + 0.22 * Math.sin(7 * a + 0.5 * Math.sin(t * 0.25)) * ss(0.2, 2, r) + 0.07 * Math.sin(15 * a) * ss(0.5, 2.5, r);
  let y = lift * 3.8 * peak * cr * (1 + 0.35 * Math.hypot(lean[0], lean[1]));
  y += 0.2 * Math.sin(x * 0.9 + t * 0.35) * Math.sin(z * 0.7 - t * 0.27) + 0.1 * Math.sin(x * 1.9 - z * 1.3 + t * 0.5);
  return y;
}

export function BeadCloth({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "high-performance" });
    if (!gl) return;

    // phones get the plain gradient: calmer behind stacked text, and no GPU work
    if (window.matchMedia("(max-width: 639px)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const host = root.closest<HTMLElement>("[data-bead-host]") ?? root;

    // ---- program -------------------------------------------------------
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const loc = {
      vp: U("u_vp"), size: U("u_size"), ppu: U("u_ppu"), pass: U("u_pass"), ptr: U("u_ptr"),
      t: U("u_t"), lift: U("u_lift"), lean: U("u_lean"), rip: U("u_rip"),
      cloth: U("u_cloth"), glow: U("u_glow"), highlight: U("u_highlight"), core: U("u_core"),
    };

    // ---- beads ---------------------------------------------------------
    const narrow = root.offsetWidth < 700;
    const pitch = 0.075 * (TUNE.scale / 50) * (narrow ? 1.8 : 1);
    const cols = Math.floor((HALF_X * 2) / pitch);
    const rows = Math.floor((HALF_Z * 2) / pitch);
    const data = new Float32Array(cols * rows * 3);
    let o = 0;
    const jitter = (i: number, j: number, k: number) => {
      const x = Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        data[o++] = -HALF_X + (i + 0.5 + (jitter(i, j, 1) - 0.5) * 0.35) * pitch;
        data[o++] = -HALF_Z + (j + 0.5 + (jitter(i, j, 2) - 0.5) * 0.35) * pitch;
        data[o++] = jitter(i, j, 3);
      }
    }
    const count = cols * rows;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const aBead = gl.getAttribLocation(prog, "a_bead");
    gl.enableVertexAttribArray(aBead);
    gl.vertexAttribPointer(aBead, 3, gl.FLOAT, false, 0, 0);

    gl.uniform3fv(loc.cloth, hexToVec(TUNE.cloth));
    gl.uniform3fv(loc.glow, hexToVec(TUNE.glow));
    gl.uniform3fv(loc.highlight, hexToVec(TUNE.highlight));
    gl.uniform3fv(loc.core, hexToVec(TUNE.core));
    gl.uniform1f(loc.size, pitch * 0.72);

    // ---- state ---------------------------------------------------------
    let W = 1;
    let H = 1;
    let dpr = 1;
    let time = reduce ? 5 : 0;
    const lean: [number, number] = [0, 0];
    const leanVel: [number, number] = [0, 0];
    let leanTarget: [number, number] = [0, 0];
    let dragging = false;
    let hover = 0;
    let hoverT = 0;
    const ripples: { x: number; z: number; t0: number }[] = [];
    const ptr = { nx: 0, ny: 0, inside: false };
    const surf = { x: 0, y: -100, z: 0 };
    let camEye: V3 = [0, 0, 10];
    let camTarget: V3 = [0.4, 0.8, 0];
    let liftEff = TUNE.lift / 100;

    const resize = () => {
      W = root.offsetWidth;
      H = root.offsetHeight;
      // keep the fill cost bounded on large or high-density screens
      dpr = Math.min(window.devicePixelRatio || 1, narrow ? 1.25 : 1.5, Math.sqrt(1.7e6 / Math.max(1, W * H)));
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (reduce) frame(0);
    };

    // ray from the camera through the pointer, marched onto the height field
    const placePointer = () => {
      const fwd = norm(sub(camTarget, camEye));
      const right = norm(cross(fwd, [0, 1, 0]));
      const up = cross(right, fwd);
      const th = Math.tan(FOV / 2);
      const aspect = W / H;
      const dir = norm([
        fwd[0] + right[0] * ptr.nx * th * aspect + up[0] * ptr.ny * th,
        fwd[1] + right[1] * ptr.nx * th * aspect + up[1] * ptr.ny * th,
        fwd[2] + right[2] * ptr.nx * th * aspect + up[2] * ptr.ny * th,
      ]);
      const at = (t: number): V3 => [camEye[0] + dir[0] * t, camEye[1] + dir[1] * t, camEye[2] + dir[2] * t];
      const below = (t: number) => {
        const p = at(t);
        return p[1] < heightAt(p[0], p[2], liftEff, lean, time);
      };
      let t0 = 2;
      let t1 = 0;
      let hit = false;
      for (let t = 2; t < 50; t += 0.18) {
        if (below(t)) {
          t1 = t;
          hit = true;
          break;
        }
        t0 = t;
      }
      if (!hit) {
        surf.y = -100;
        return;
      }
      for (let i = 0; i < 6; i++) {
        const m = (t0 + t1) / 2;
        if (below(m)) t1 = m;
        else t0 = m;
      }
      const p = at((t0 + t1) / 2);
      surf.x = p[0];
      surf.y = p[1];
      surf.z = p[2];
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      ptr.nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ptr.ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      ptr.inside = true;
      hoverT = 1;
      if (dragging) {
        const lx = surf.x - PEAK[0];
        const lz = surf.z - PEAK[1];
        const len = Math.hypot(lx, lz) || 1;
        const k = Math.min(len, 5) / len;
        leanTarget = [lx * k * 0.42, lz * k * 0.42];
      }
    };
    const onLeave = () => {
      ptr.inside = false;
      hoverT = 0;
    };
    let downAt = 0;
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) return;
      downAt = performance.now();
      dragging = true;
      onMove(e);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      leanTarget = [0, 0];
      // a quick press is a tap: send rings across the cloth from where it landed
      if (performance.now() - downAt < 260 && surf.y > -50 && TUNE.ripple > 0) {
        if (ripples.length >= MAX_RIPPLES) ripples.shift();
        ripples.push({ x: surf.x, z: surf.z, t0: time });
      }
    };

    // ---- frame ---------------------------------------------------------
    const ripArr = new Float32Array(MAX_RIPPLES * 4);
    let phaseT = reduce ? 5 : 0;
    const frame = (dt: number) => {
      const speed = TUNE.speed / 50;
      if (!reduce) {
        time += dt;
        phaseT += dt * speed;
      }
      const phase = (phaseT / TUNE.cycle) * Math.PI * 2;
      liftEff = (TUNE.lift / 100) * (0.62 + 0.38 * (0.5 - 0.5 * Math.cos(phase)));

      // camera swing that closes on itself
      const az = 0.2 * Math.sin(phase);
      const el = 0.62 + 0.05 * Math.sin(phase * 2 + 1);
      const dist = 17 / (TUNE.zoom / 100);
      camTarget = [0.9, 0.9 * liftEff, 1.4];
      camEye = [
        camTarget[0] + dist * Math.sin(az) * Math.cos(el),
        camTarget[1] + dist * Math.sin(el),
        camTarget[2] + dist * Math.cos(az) * Math.cos(el),
      ];

      // the peak leans toward a drag and springs back on release
      if (dt > 0) {
        for (let i = 0; i < 2; i++) {
          const acc = 40 * (leanTarget[i] - lean[i]) - 7 * leanVel[i];
          leanVel[i] += acc * Math.min(dt, 0.033);
          lean[i] += leanVel[i] * Math.min(dt, 0.033);
        }
      }
      hover += (hoverT - hover) * (1 - Math.exp(-dt * 5));

      placePointer();
      const strength = TUNE.hover > 0 && surf.y > -50 && !reduce ? hover * (TUNE.hover / 50) : 0;

      ripArr.fill(0);
      for (let i = 0; i < ripples.length; i++) {
        const age = time - ripples[i].t0;
        ripArr[i * 4] = ripples[i].x;
        ripArr[i * 4 + 1] = ripples[i].z;
        ripArr[i * 4 + 2] = age > 0.001 && age < 4 ? age : -1;
        ripArr[i * 4 + 3] = TUNE.ripple / 50;
      }
      for (let i = ripples.length; i < MAX_RIPPLES; i++) ripArr[i * 4 + 2] = -1;

      gl.uniformMatrix4fv(loc.vp, false, viewProj(camEye, camTarget, W / H));
      gl.uniform1f(loc.t, time);
      gl.uniform1f(loc.lift, liftEff);
      gl.uniform2f(loc.lean, lean[0], lean[1]);
      gl.uniform4fv(loc.rip, ripArr);
      gl.uniform4f(loc.ptr, surf.x, surf.y, surf.z, strength);
      gl.uniform1f(loc.ppu, canvas.height / (2 * Math.tan(FOV / 2)));

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // pass 0: the beads
      gl.enable(gl.DEPTH_TEST);
      gl.depthMask(true);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.uniform1f(loc.pass, 0);
      gl.drawArrays(gl.POINTS, 0, count);

      // pass 1: bloom for the lit beads only, additive and depth-tested
      gl.depthMask(false);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.uniform1f(loc.pass, 1);
      gl.drawArrays(gl.POINTS, 0, count);
    };

    // ---- loop: only while on screen and motion is allowed ----------------
    let raf = 0;
    let last = -1;
    let visible = false;
    const tick = (now: number) => {
      const dt = last < 0 ? 0 : Math.min(0.05, (now - last) / 1000);
      last = now;
      frame(dt);
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
    host.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const onLost = (e: Event) => e.preventDefault();
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className={className}>
      <canvas ref={canvasRef} className="absolute inset-0 block size-full" />
    </div>
  );
}
