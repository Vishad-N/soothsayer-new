import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = (p: P) => (
  <svg {...base(p)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const ArrowDown = (p: P) => (
  <svg {...base(p)}><path d="M12 5v14M6 13l6 6 6-6" /></svg>
);
export const Chevron = (p: P) => (
  <svg {...base(p)}><path d="M6 9l6 6 6-6" /></svg>
);
export const Close = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Menu = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Play = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}><path d="M8 5.5v13l11-6.5-11-6.5z" /></svg>
);
export const Quote = (p: P) => (
  <svg {...base({ viewBox: "0 0 32 24", fill: "currentColor", stroke: "none", ...p })}>
    <path d="M0 24V14C0 6.3 4.1 1.6 11.3 0l1.4 2.7C8.8 4 6.7 6.6 6.4 10.6H12V24H0zm19.3 0V14c0-7.7 4.1-12.4 11.3-14L32 2.7c-3.9 1.3-6 3.9-6.3 7.9h5.6V24H19.3z" />
  </svg>
);
export const Mouse = (p: P) => (
  <svg {...base({ viewBox: "0 0 24 36", ...p })}>
    <rect x="3" y="1" width="18" height="30" rx="9" />
    <path d="M12 9v4" />
  </svg>
);

/* ---------- Social ---------- */
const solid = (p: P) => base({ ...p, fill: "currentColor", stroke: "none" });

export const Facebook = (p: P) => (
  <svg {...solid(p)}><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" /></svg>
);
export const Instagram = (p: P) => (
  <svg {...base(p)}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" /></svg>
);
export const XLogo = (p: P) => (
  <svg {...solid(p)}><path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.2L5.6 21h-3l7.1-8.1L2.2 3h6.2l4.3 5.7L17.8 3zm-1 16.2h1.7L7.3 4.7H5.5l11.3 14.5z" /></svg>
);
export const LinkedIn = (p: P) => (
  <svg {...solid(p)}><path d="M6.9 8.8H3.6V20h3.3V8.8zM5.3 3.5a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM20.4 13.6c0-3-1.6-5-4.4-5-1.5 0-2.5.8-2.9 1.6V8.8H9.9V20h3.3v-5.6c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h3.3v-6.4z" /></svg>
);
export const YouTube = (p: P) => (
  <svg {...solid(p)}><path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 00-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" /></svg>
);

export const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  x: XLogo,
  linkedin: LinkedIn,
  youtube: YouTube,
};

/* ---------- Line icons used inside cards (24px grid) ---------- */
export const LINE_ICONS: Record<string, (p: P) => React.ReactElement> = {
  data: (p) => <svg {...base(p)}><ellipse cx="12" cy="6" rx="7" ry="2.5" /><path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12v6c0 1.4 3.1 2.5 7 2.5" /><path d="M15 18l2 2 4-4" /></svg>,
  people: (p) => <svg {...base(p)}><circle cx="12" cy="8" r="3" /><path d="M6 19c.8-3 3.2-5 6-5s5.2 2 6 5" /><path d="M4 4l2 2M20 4l-2 2M3 11h2M19 11h2" /></svg>,
  framework: (p) => <svg {...base(p)}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>,
  risk: (p) => <svg {...base(p)}><path d="M12 4l9 16H3l9-16z" /><path d="M12 10v4M12 17v.5" /></svg>,
  owner: (p) => <svg {...base(p)}><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.7-3 2.9-5 5.5-5 1.4 0 2.6.5 3.6 1.4" /><path d="M15 18l2 2 4-4" /></svg>,
  compliance: (p) => <svg {...base(p)}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M9 11h6M9 15h4" /></svg>,
  target: (p) => <svg {...base(p)}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r=".8" fill="currentColor" /></svg>,
  map: (p) => <svg {...base(p)}><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" /><path d="M9 4v14M15 6v14" /></svg>,
  layers: (p) => <svg {...base(p)}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
  chart: (p) => <svg {...base(p)}><path d="M4 20V4M4 20h16" /><path d="M8 16v-4M12 16V8M16 16v-6" /></svg>,
  compass: (p) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></svg>,
  flag: (p) => <svg {...base(p)}><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></svg>,
  cap: (p) => <svg {...base(p)}><path d="M2 9l10-5 10 5-10 5L2 9z" /><path d="M6 11v5c2 2 10 2 12 0v-5" /></svg>,
  users: (p) => <svg {...base(p)}><circle cx="9" cy="8" r="3" /><path d="M3 19c.7-3 3-5 6-5s5.3 2 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M17.5 14c1.9.4 3.1 2 3.5 4" /></svg>,
  book: (p) => <svg {...base(p)}><path d="M4 5c3-1 6-1 8 1v14c-2-2-5-2-8-1V5zM20 5c-3-1-6-1-8 1v14c2-2 5-2 8-1V5z" /></svg>,
  spark: (p) => <svg {...base(p)}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" /></svg>,
  award: (p) => <svg {...base(p)}><circle cx="12" cy="9" r="5" /><path d="M9 13.5L8 21l4-2 4 2-1-7.5" /></svg>,
  refresh: (p) => <svg {...base(p)}><path d="M20 11a8 8 0 00-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0014.6 4.5L20 16M20 20v-4h-4" /></svg>,
  dollar: (p) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M14.8 9.2c-.4-1-1.5-1.6-2.8-1.6-1.6 0-2.8.8-2.8 2.1 0 3 5.7 1.6 5.7 4.5 0 1.3-1.3 2.2-2.9 2.2-1.4 0-2.6-.7-3-1.8M12 6v1.6M12 16.4V18" /></svg>,
  hand: (p) => <svg {...base(p)}><path d="M12 4a8 8 0 105.7 2.3" /><path d="M18 3v4h-4" /><path d="M9 12.5l2 2 4-4.5" /></svg>,
  sliders: (p) => <svg {...base(p)}><path d="M6 4v16M12 4v16M18 4v16" /><circle cx="6" cy="9" r="2" fill="white" /><circle cx="12" cy="15" r="2" fill="white" /><circle cx="18" cy="8" r="2" fill="white" /></svg>,
  clock: (p) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  bolt: (p) => <svg {...base(p)}><path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" /></svg>,
  chip: (p) => <svg {...base(p)}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /><path d="M10 10h4v4h-4z" /></svg>,
  eye: (p) => <svg {...base(p)}><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="2.8" /></svg>,
  trend: (p) => <svg {...base(p)}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>,
  check: (p) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>,
  rocket: (p) => <svg {...base(p)}><path d="M5 15c-1 1-1.5 3.5-1.5 5.5 2 0 4.5-.5 5.5-1.5M9 15l-3-3c1-3 3-5.5 6-7.5 2.5-1.5 5.5-1.5 8-1.5 0 2.5 0 5.5-1.5 8-2 3-4.5 5-7.5 6l-2-2z" /><circle cx="15" cy="9" r="1.6" /></svg>,
  globe: (p) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" /></svg>,
};
