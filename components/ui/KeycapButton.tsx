"use client";

/*!
 * Adapted from IsometricButton, a DesignPass.dev component by Ernest Liu
 * (ernestliu.com). https://designpass.dev/components/isometric-button (MIT).
 *
 * A keycap link for the dark sections: a dark glass cap floating over a lit
 * underside. Hover lowers the cap and brightens the light, press seats it on
 * the floor. All state is a handful of CSS custom properties written from one
 * tween, so there is no React re-render while it animates.
 *
 * Design decisions for this site:
 *  - colours are the theme's: deep-teal cap, brand-cyan light, pale-cyan label
 *  - the camera is gentler than the demo (tilt 30°, no turn) so the label
 *    stays level and the cap lines up with the text column
 *  - the real control is an unrotated, invisible hit target pinned at the rest
 *    height, so the hover edge never moves under a still pointer
 *  - the cap is aria-hidden; the anchor carries the accessible name
 *  - reduced motion: states switch instantly, no glide
 */

import { useAnimate, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { linkProps } from "@/lib/cn";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RGB = { r: number; g: number; b: number };
const BLACK: RGB = { r: 0, g: 0, b: 0 };
const WHITE: RGB = { r: 255, g: 255, b: 255 };

function parse(hex: string): RGB {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
const rgb = (c: RGB) => `rgb(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)})`;
const rgba = (c: RGB, a: number) => `rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, ${a})`;
const mix = (a: RGB, b: RGB, k: number): RGB => ({
  r: a.r + (b.r - a.r) * k,
  g: a.g + (b.g - a.g) * k,
  b: a.b + (b.b - a.b) * k,
});
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Theme
const CAP = parse("#0d3039"); // between bg-deep and teal-night
const LIGHT = parse("#00b4d8"); // --color-brand
const LIGHT_A = parse("#0090c0"); // cooler flank of the light
const LIGHT_C = parse("#5fe0f2"); // warmer, lighter flank
const LABEL = parse("#d9f5fb"); // --color-brand-100
const LABEL_HOVER = WHITE;

// Geometry
const SIDE_LAYERS = 15;
const THICK = 12;
const FLOAT_REST = 8;
const FLOAT_HOVER = 5;
const PRESS_FLOAT = 2;
const LEAN = -10;
const PRESS_DUR = 0.1;
const HIT_INSET = -6;
const TILT = 30;
const TURN = 0;
const GLOW_SPREAD_REST = 1.1;
const GLOW_SPREAD_HOVER = 0.15;
const REFL_BLUR_REST = 8;
const REFL_BLUR_HOVER = 1;
const BRIGHT_REST = 0.6;
const BRIGHT_HOVER = 1.3;

const edge = mix(CAP, BLACK, 0.4);
const glowGradient = `linear-gradient(120deg, ${rgb(LIGHT_A)} 0%, ${rgb(LIGHT)} 50%, ${rgb(LIGHT_C)} 110%)`;
const topGradient = `linear-gradient(135deg, ${rgb(mix(CAP, WHITE, 0.1))} 0%, ${rgb(mix(CAP, edge, 0.15))} 75%)`;

type Props = {
  href: string;
  children: React.ReactNode;
  arrow?: boolean;
  /** Full-width below `sm` (a thumb-sized target); natural width from `sm` up. */
  fullWidthMobile?: boolean;
  className?: string;
};

export function KeycapButton({ href, children, arrow = true, fullWidthMobile = false, className }: Props) {
  const [scope, animate] = useAnimate();
  const reduced = useReducedMotion();
  const hovered = useRef(false);
  const pressed = useRef(false);
  const hoverT = useRef(0);
  const pressT = useRef(0);

  // Corner radius is a fixed 6px like the flat buttons it sits beside.
  const [radius] = useState(6);

  const paint = () => {
    const el = scope.current as HTMLElement | null;
    if (!el) return;
    const h = hoverT.current;
    const p = pressT.current;
    const set = (k: string, v: string) => el.style.setProperty(k, v);
    const bright = lerp(BRIGHT_REST, BRIGHT_HOVER, h);
    set("--kc-float", `${lerp(lerp(FLOAT_REST, FLOAT_HOVER, h), PRESS_FLOAT, p).toFixed(2)}px`);
    set("--kc-stand", `${lerp(LEAN, 0, p).toFixed(2)}deg`);
    set("--kc-bright", bright.toFixed(3));
    set("--kc-spread", lerp(GLOW_SPREAD_REST, GLOW_SPREAD_HOVER, h).toFixed(3));
    set("--kc-refl-opacity", lerp(0.6, 1, h).toFixed(3));
    set("--kc-refl-blur", `${lerp(REFL_BLUR_REST, REFL_BLUR_HOVER, h).toFixed(2)}px`);
    set("--kc-refl-spread", lerp(0, 3, h).toFixed(3));
    set("--kc-refl-bright", (bright * 0.95).toFixed(3));
    set("--kc-text", rgb(mix(LABEL, LABEL_HOVER, h)));
    set("--kc-text-glow", `${(10 * h).toFixed(2)}px`);
  };

  const glide = (ref: React.MutableRefObject<number>, to: number, fast: boolean) => {
    if (reduced) {
      ref.current = to;
      paint();
      return;
    }
    animate(ref.current, to, {
      ...(fast
        ? { duration: PRESS_DUR, ease: "easeOut" as const }
        : { type: "spring" as const, stiffness: 260, damping: 14, mass: 1 }),
      onUpdate: (v: number) => {
        ref.current = v;
        paint();
      },
    });
  };

  useEffect(() => {
    paint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A pointer released outside the button must not leave the cap pressed.
  useEffect(() => {
    const release = () => {
      if (!pressed.current) return;
      pressed.current = false;
      glide(pressT, 0, true);
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard users get the same hover state on focus.
  const onFocus = () => glide(hoverT, 1, false);
  const onBlur = () => glide(hoverT, 0, false);

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "0 28px",
    height: 50,
    gap: 8,
    whiteSpace: "nowrap",
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "var(--font-sans)",
  };
  const face: React.CSSProperties = { position: "absolute", inset: 0, borderRadius: radius };

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <svg aria-hidden viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </>
  );

  return (
    <div
      ref={scope}
      // margin leaves room for the lean and the light so neighbours are never overlapped
      className={`relative mt-3 mb-[18px] ${fullWidthMobile ? "block w-full sm:mx-2 sm:inline-block sm:w-auto" : "mx-2 inline-block"} ${className ?? ""}`}
      style={
        {
          "--kc-float": `${FLOAT_REST}px`,
          "--kc-stand": `${LEAN}deg`,
          "--kc-thick": `${THICK}px`,
          "--kc-bright": String(BRIGHT_REST),
          "--kc-spread": String(GLOW_SPREAD_REST),
          "--kc-refl-opacity": "0.6",
          "--kc-refl-blur": `${REFL_BLUR_REST}px`,
          "--kc-refl-spread": "0",
          "--kc-refl-bright": String(BRIGHT_REST * 0.95),
          "--kc-text": rgb(LABEL),
          "--kc-text-glow": "0px",
        } as React.CSSProperties
      }
    >
      {/* Sizer: the cap is absolutely positioned, so a hidden copy of the label gives the button its box. */}
      <div aria-hidden style={{ ...rowStyle, visibility: "hidden", pointerEvents: "none" }}>
        {content}
      </div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(3px) rotateX(${TILT}deg) rotateZ(${TURN}deg)`,
          transformStyle: "preserve-3d",
          pointerEvents: "none",
        }}
      >
        {/* floor reflection of the light; never give this a mix-blend-mode, it breaks preserve-3d paint order */}
        <div
          style={{
            ...face,
            background: glowGradient,
            transform: "translateZ(calc(-1 * var(--kc-float))) scaleZ(-1)",
            boxShadow: `0 0 calc(20px * var(--kc-refl-spread)) calc(4px * var(--kc-refl-spread)) ${rgba(LIGHT, 0.85)}, 0 0 calc(56px * var(--kc-refl-spread)) calc(10px * var(--kc-refl-spread)) ${rgba(LIGHT, 0.45)}`,
            filter: "blur(var(--kc-refl-blur)) brightness(var(--kc-refl-bright))",
            opacity: "var(--kc-refl-opacity)" as unknown as number,
          }}
        />

        <div style={{ position: "absolute", inset: 0, transformOrigin: "center bottom", transform: "rotateX(var(--kc-stand))", transformStyle: "preserve-3d" }}>
          {/* lit underside */}
          <div
            style={{
              ...face,
              background: glowGradient,
              transform: "translateZ(var(--kc-float))",
              boxShadow: `0 0 calc(16px * var(--kc-spread)) calc(2px * var(--kc-spread)) ${rgba(LIGHT, 0.8)}, 0 0 calc(44px * var(--kc-spread)) calc(6px * var(--kc-spread)) ${rgba(LIGHT, 0.4)}`,
              filter: "brightness(var(--kc-bright)) saturate(calc(0.85 + 0.15 * var(--kc-bright)))",
            }}
          />
          {/* side walls: stacked slices with spread-only shadows keep the edge crisp */}
          {Array.from({ length: SIDE_LAYERS }, (_, i) => (
            <div
              key={i}
              style={{
                ...face,
                background: rgb(edge),
                transform: `translateZ(calc(var(--kc-float) + var(--kc-thick) * ${i} / ${SIDE_LAYERS}))`,
                boxShadow: `0 0 0 1px ${rgb(edge)}`,
              }}
            />
          ))}
          {/* cap with the visible label */}
          <div
            style={{
              ...face,
              ...rowStyle,
              border: `1px solid ${rgba(WHITE, 0.12)}`,
              background: topGradient,
              transform: "translateZ(calc(var(--kc-float) + var(--kc-thick)))",
              boxShadow: `inset 0 1px 0 ${rgba(WHITE, 0.1)}`,
              color: "var(--kc-text)",
              textShadow: `0 0 var(--kc-text-glow) ${rgb(LIGHT)}, 0 0 calc(var(--kc-text-glow) * 2) ${rgb(LIGHT)}`,
            }}
          >
            {content}
          </div>
        </div>
      </div>

      {/* the real control: unrotated, invisible, pinned at the rest height */}
      <a
        {...linkProps(href)}
        onPointerEnter={() => {
          hovered.current = true;
          glide(hoverT, 1, false);
        }}
        onPointerLeave={() => {
          hovered.current = false;
          pressed.current = false;
          glide(hoverT, 0, false);
          glide(pressT, 0, true);
        }}
        onPointerDown={() => {
          pressed.current = true;
          glide(pressT, 1, true);
        }}
        onPointerUp={() => {
          pressed.current = false;
          glide(pressT, 0, true);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          position: "absolute",
          inset: HIT_INSET,
          borderRadius: radius,
          color: "transparent",
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
          transform: `translateZ(${FLOAT_REST + THICK}px)`,
        }}
      >
        <span className="sr-only">{children}</span>
      </a>
    </div>
  );
}
