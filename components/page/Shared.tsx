import { LINKS } from "@/data/links";
import { cn } from "@/lib/cn";
import { LinkButton } from "../ui/Button";
import { HelixField } from "../ui/HelixField";
import { KeycapButton } from "../ui/KeycapButton";
import { PixelEdge } from "../ui/PixelEdge";
import { Reveal } from "../ui/Reveal";

const WF = "https://cdn.prod.website-files.com/6687c738a732506c2bf59c22/";
export const MAP_IMG = `${WF}686feef50e3e1a0a66c7b9f6_Map.svg`;
export const WF_BASE = WF;

/* ------------------------------------------------------------ glyphs --- */

const G: Record<string, React.ReactNode> = {
  person: <g><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1-4 3.8-6 7-6s6 2 7 6" /></g>,
  pencil: <g><path d="M4 20l1-4L16.5 4.5a2 2 0 013 3L8 19l-4 1z" /><path d="M14 7l3 3" /></g>,
  shield: <g><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z" /><path d="M9 12l2.2 2.2L15.5 10" /></g>,
  leaf: <g><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" /><path d="M5 19c2-4 5-7 9-9" /></g>,
  sparkle: <g><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" /></g>,
  lock: <g><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3M12 14v2" /></g>,
  cursor: <g><path d="M5 4l14 7-6 2-2 6L5 4z" /></g>,
  database: <g><ellipse cx="12" cy="6" rx="7" ry="2.5" /><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></g>,
  seed: <g><path d="M12 21v-9" /><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-3 2.5-5 6-5 0 3-2.5 5-6 5z" /></g>,
  puzzle: <g><path d="M5 9h3a2 2 0 114 0h3v3a2 2 0 110 4v3H5v-4a2 2 0 100-4V9z" /></g>,
  link: <g><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1" /></g>,
  search: <g><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></g>,
  check: <g><path d="M5 12.5l4.5 4.5L19 7.5" /></g>,
  bolt: <g><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" /></g>,
  compass: <g><circle cx="12" cy="12" r="8" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></g>,
  users: <g><circle cx="9" cy="8" r="3" /><path d="M3 19c.7-3 3-5 6-5s5.3 2 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14c2.5 0 4.2 1.7 5 4" /></g>,
  flag: <g><path d="M6 21V4M6 5h11l-2 4 2 4H6" /></g>,
  alert: <g><path d="M12 4l9 16H3L12 4z" /><path d="M12 10v4M12 17h.01" /></g>,
};

export function Glyph({ name, className }: { name: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cn("size-6", className)}>
      {G[name] ?? G.sparkle}
    </svg>
  );
}

/** Round icon chip used on cards. */
export function IconChip({ name, dark, className }: { name: string; dark?: boolean; className?: string }) {
  return (
    <span className={cn("grid size-12 shrink-0 place-items-center rounded-full border", dark ? "border-brand-300/30 bg-brand-300/10 text-brand-300" : "border-brand/25 bg-brand-50 text-brand-600", className)}>
      <Glyph name={name} />
    </span>
  );
}

/* ------------------------------------------------------------- text --- */

/** Paragraphs. The first one is set larger as a lead when `lead` is true. */
export function Paras({ children, className, lead }: { children: string[]; className?: string; lead?: boolean }) {
  return (
    <div className={cn("space-y-5 text-[17px] leading-[1.75]", className)}>
      {children.map((p, i) => (
        <p key={p.slice(0, 40)} className={cn(lead && i === 0 && "text-[19px] leading-[1.6] text-ink sm:text-[21px]")}>{p}</p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- hero --- */

/** Subtle dot lattice with a few concentric arcs, drawn in the theme's teal. Decorative only. */
function HeroPattern() {
  return (
    <svg aria-hidden className="absolute inset-0 size-full text-brand-300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="currentColor" />
        </pattern>
        <radialGradient id="hero-dots-fade" cx="68%" cy="50%" r="75%">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hero-dots-mask"><rect width="100%" height="100%" fill="url(#hero-dots-fade)" /></mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-dots)" opacity="0.22" mask="url(#hero-dots-mask)" />
      <g fill="none" stroke="currentColor" opacity="0.1" transform="translate(0 0)">
        <circle cx="75%" cy="50%" r="220" />
        <circle cx="75%" cy="50%" r="340" />
        <circle cx="75%" cy="50%" r="460" />
      </g>
    </svg>
  );
}

/** Slow, low-contrast motion for the hero: a drifting dot grid, two breathing glows and a few floating motes. */
function HeroMotion() {
  const motes = [
    [12, 22, 0], [28, 70, 1.4], [44, 14, 2.8], [58, 82, 0.7], [66, 30, 2.1], [78, 62, 3.5],
    [86, 18, 1.1], [92, 76, 2.4], [20, 48, 3.1], [52, 52, 0.4], [72, 90, 1.8], [36, 88, 2.9],
  ];
  return (
    <>
      <div className="animate-grid-drift absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,#6fdcf0_1px,transparent_1.4px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_70%_50%,#000,transparent_85%)]" />
      <div className="animate-orb-a absolute -left-24 top-1/4 size-[420px] rounded-full bg-brand/15 blur-[120px]" />
      <div className="animate-orb-b absolute -right-16 bottom-0 size-[460px] rounded-full bg-brand-300/15 blur-[130px]" />
      {motes.map(([x, y, d], i) => (
        <span
          key={i}
          className="animate-mote absolute size-1.5 rounded-full bg-brand-300/60 shadow-[0_0_10px_rgb(111_220_240/0.7)]"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s`, animationDuration: `${7 + (i % 4) * 2}s` }}
        />
      ))}
    </>
  );
}

/**
 * Hero. Default is centred with the artwork below the copy. With `split`, the copy sits
 * on the left and the artwork fills the right column on desktop (stacked on mobile).
 */
export function PageHero({
  eyebrow, title, sub, video, poster, cta, art, split, animated,
}: {
  eyebrow?: string; title: React.ReactNode; sub?: string; video?: string; poster?: string;
  cta?: { label: string; href: string }; art?: React.ReactNode; split?: boolean; animated?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-abyss text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        {video && (
          <video className="absolute inset-0 size-full object-cover opacity-20 mix-blend-screen" autoPlay muted loop playsInline preload="metadata" poster={poster} tabIndex={-1}>
            <source src={video} type="video/mp4" />
          </video>
        )}
        <div className={cn("absolute inset-0 opacity-95", split ? "bg-[radial-gradient(90%_100%_at_72%_45%,#0b3a44_0%,#061f26_55%,#04141a_90%)]" : "bg-[radial-gradient(120%_90%_at_50%_0%,#0b323a_0%,#061f26_48%,#04141a_85%)]")} />
        {split ? (
          <>
            <HeroPattern />
            {animated && <HeroMotion />}
          </>
        ) : (
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_65%_at_50%_0%,#000,transparent_80%)]" />
        )}
        <div className={cn("absolute rounded-full bg-brand/25 blur-[130px]", split ? "right-[-10%] top-1/2 h-[520px] w-[640px] max-w-[120vw] -translate-y-1/2" : "left-1/2 top-0 h-[480px] w-[900px] max-w-[160vw] -translate-x-1/2")} />
      </div>

      <div
        className={cn(
          "container-page",
          split
            ? "grid items-center gap-10 pb-14 pt-28 sm:pt-32 lg:min-h-[640px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:pb-16 lg:pt-32"
            : "flex flex-col items-center pb-20 pt-32 text-center sm:pt-40 lg:pb-28 lg:pt-44",
        )}
      >
        <div className={cn(split ? "max-w-[620px]" : "flex flex-col items-center")}>
          {eyebrow && (
            <Reveal y={12}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-300/30 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-brand-100 backdrop-blur-md">
                <span className="size-2 rounded-full bg-brand shadow-[0_0_10px_var(--color-brand)]" />
                {eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className={cn("bg-gradient-to-b from-white from-40% to-brand-100/80 bg-clip-text font-semibold leading-[1.08] tracking-[-0.025em] text-transparent", split ? "text-[34px] xs:text-[42px] sm:text-[52px] lg:text-[56px] xl:text-[60px]" : "mx-auto mt-5 max-w-[920px] text-[34px] xs:text-[42px] sm:text-[54px] lg:text-[64px]")}>
              {title}
            </h1>
          </Reveal>
          {sub && (
            <Reveal delay={0.12}>
              <p className={cn("mt-6 text-[17px] leading-[1.55] text-white/80 sm:text-xl", split ? "max-w-[540px]" : "mx-auto max-w-[660px]")}>{sub}</p>
            </Reveal>
          )}
          {cta && (
            <Reveal delay={0.2} className="mt-9">
              <KeycapButton href={cta.href} fullWidthMobile>{cta.label}</KeycapButton>
            </Reveal>
          )}
        </div>

        {art && (
          split ? (
            <Reveal delay={0.2} y={24} className="relative mx-auto w-full max-w-[520px] sm:max-w-[600px] lg:mx-0 lg:max-w-none">
              <div aria-hidden className="absolute inset-x-8 inset-y-10 rounded-full bg-brand/20 blur-3xl" />
              <div className="relative lg:scale-[1.08] lg:origin-center xl:translate-x-4">{art}</div>
            </Reveal>
          ) : (
            <Reveal delay={0.25} y={32} className="relative mt-12 w-full max-w-[640px] sm:mt-14">
              <div aria-hidden className="absolute inset-x-6 -bottom-6 top-10 rounded-full bg-brand/20 blur-3xl" />
              <div className="relative">{art}</div>
            </Reveal>
          )
        )}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- sections --- */

type Tone = "light" | "mist" | "dark";
const tones: Record<Tone, { cls: string; color: string }> = {
  light: { cls: "bg-white text-ink", color: "#ffffff" },
  mist: { cls: "bg-mist text-ink", color: "var(--color-mist)" },
  dark: { cls: "bg-deep text-white", color: "var(--color-deep)" },
};

/**
 * Page band. `edge` draws the pixel skyline on the join with the section above;
 * `beforeDark` gives the section room for the skyline of a dark band below it.
 */
export function Section({
  tone = "light", id, children, className, edge, beforeDark, reveal = true,
}: {
  tone?: Tone; id?: string; children: React.ReactNode; className?: string; edge?: boolean; beforeDark?: boolean; reveal?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-24 lg:py-28", tones[tone].cls, beforeDark && "pb-32 sm:pb-36 lg:pb-44", className)}>
      {edge && <PixelEdge color={tones[tone].color} accent={tone === "dark"} />}
      <div className="container-page">{reveal ? <Reveal>{children}</Reveal> : children}</div>
    </section>
  );
}

/** Section heading with an optional numeric index and sub-heading. */
export function Heading({ children, sub, dark, index, center, className }: { children: React.ReactNode; sub?: string; dark?: boolean; index?: string; center?: boolean; className?: string }) {
  return (
    <div className={cn(center && "mx-auto text-center", className)}>
      {index && (
        <span aria-hidden className={cn("mb-4 flex items-center gap-3 font-mono text-sm font-medium tracking-widest", dark ? "text-brand-300" : "text-[#007a96]", center && "justify-center")}>
          {index}
          <span className={cn("h-px w-12", dark ? "bg-brand-300/50" : "bg-brand/50")} />
        </span>
      )}
      <h2 className={cn("h-section", !dark && "text-ink")}>{children}</h2>
      {sub && <p className={cn("mt-4 text-xl font-medium sm:text-2xl", dark ? "text-brand-300" : "text-[#007a96]")}>{sub}</p>}
    </div>
  );
}

/** Button that adapts to its background: keycap on dark, solid on light. */
export function Cta({ href, children, dark }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return dark ? <KeycapButton href={href}>{children}</KeycapButton> : <LinkButton href={href}>{children}</LinkButton>;
}

export function GlobalPresence({ title, paras, edge, tone = "mist" }: { title: string; paras: string[]; edge?: boolean; tone?: Tone }) {
  return (
    <Section tone={tone} edge={edge} beforeDark>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <h2 className="h-section text-[#007a96]">{title}</h2>
          <Paras className="mt-6 text-ink-soft">{paras}</Paras>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MAP_IMG} alt="" loading="lazy" className="w-full" />
      </div>
    </Section>
  );
}

/** Closing call to action in the homepage's horizon-glow panel. The original form links out to the .com contact page. */
export function ContactBand({
  title, text, cta = "Contact Us", href = LINKS.contact, secondary,
}: { title: string; text?: string; cta?: string; href?: string; secondary?: { label: string; href: string } }) {
  return (
    <section id="cta-form" className="relative bg-coal px-4 pb-20 pt-24 text-white sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
      <PixelEdge color="var(--color-coal)" />
      <Reveal data-helix-host className="relative isolate mx-auto max-w-[1240px] overflow-hidden rounded-[14px] border border-white/10 bg-[#071419] px-6 py-16 text-center sm:py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -bottom-[75%] left-1/2 h-[120%] w-[150%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#4cc3e6_0%,#17607b_40%,transparent_100%)] opacity-80" />
          <HelixField className="absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_70%_75%_at_50%_50%,rgba(0,0,0,0.28)_0%,#000_78%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_48%,rgba(7,20,25,0.72)_0%,transparent_100%)]" />
        </div>
        <h2 className="mx-auto max-w-[760px] font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] sm:text-[44px]">{title}</h2>
        {text && <p className="mx-auto mt-5 max-w-[640px] text-lg leading-[1.6] text-white/80">{text}</p>}
        <KeycapButton href={href} fullWidthMobile className="mt-9">{cta}</KeycapButton>
        {secondary && (
          <p className="mt-6">
            <a href={secondary.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[15px] text-white/80 underline underline-offset-4 transition-colors hover:text-brand-300">{secondary.label}</a>
          </p>
        )}
        <p className="mx-auto mt-8 max-w-[520px] text-xs text-white/60">
          I have read and agree to the{" "}
          <a href={LINKS.privacy} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-300">Privacy Policy</a>{" "}and{" "}
          <a href={LINKS.terms} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-300">Terms &amp; Conditions</a>.
        </p>
      </Reveal>
    </section>
  );
}
