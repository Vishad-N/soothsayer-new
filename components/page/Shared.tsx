import { LINKS } from "@/data/links";
import { cn } from "@/lib/cn";
import { LinkButton } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

const WF = "https://cdn.prod.website-files.com/6687c738a732506c2bf59c22/";
export const MAP_IMG = `${WF}686feef50e3e1a0a66c7b9f6_Map.svg`;
export const WF_BASE = WF;

/** Split on blank lines into paragraphs. */
export function Paras({ children, className }: { children: string[]; className?: string }) {
  return (
    <div className={cn("space-y-5 text-[17px] leading-[1.7]", className)}>
      {children.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

/**
 * Hero in the homepage's language: same teal wash and height, copy on the left,
 * an existing isometric scene on the right (stacked below on tablet/mobile).
 */
export function PageHero({
  eyebrow, title, sub, video, poster, cta, art,
}: {
  eyebrow?: string; title: React.ReactNode; sub?: string; video?: string; poster?: string;
  cta?: { label: string; href: string }; art?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-abyss text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        {video && (
          <video
            className="absolute inset-0 size-full object-cover opacity-25 mix-blend-screen"
            autoPlay muted loop playsInline preload="metadata" poster={poster} tabIndex={-1}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_40%,#0b323a_0%,#061f26_45%,#04141a_78%)] opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,26,0.65)_0%,rgba(4,20,26,0.25)_50%,transparent_75%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,26,0.55)_0%,transparent_22%,transparent_65%,rgba(4,20,26,0.9)_100%)]" />
        <div className="absolute -right-40 top-1/4 size-[560px] rounded-full bg-brand/10 blur-[140px]" />
      </div>

      <div className="container-page grid min-h-[600px] items-center gap-10 pb-16 pt-32 lg:min-h-[720px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:pb-20 lg:pt-36">
        <div className="relative z-10 max-w-[640px]">
          {eyebrow && <p className="eyebrow text-base text-brand sm:text-lg [&::before]:size-3">{eyebrow}</p>}
          <h1 className="mt-3.5 text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] xs:text-[44px] sm:text-[52px] lg:text-[56px] lg:leading-[1.06]">
            {title}
          </h1>
          {sub && <p className="mt-6 max-w-[560px] text-[17px] leading-[1.45] text-white/85 lg:text-xl">{sub}</p>}
          {cta && <div className="mt-8"><LinkButton href={cta.href}>{cta.label}</LinkButton></div>}
        </div>
        {art && (
          <div aria-hidden className="relative mx-auto w-full max-w-[460px] sm:max-w-[540px] lg:max-w-none">
            {art}
          </div>
        )}
      </div>
    </section>
  );
}

type Tone = "light" | "mist" | "dark";
const tones: Record<Tone, string> = {
  light: "bg-white text-ink",
  mist: "bg-mist text-ink",
  dark: "bg-deep text-white",
};

export function Section({ tone = "light", id, children, className }: { tone?: Tone; id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-28", tones[tone], className)}>
      <div className="container-page">
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

export function Heading({ children, sub, dark }: { children: React.ReactNode; sub?: string; dark?: boolean }) {
  return (
    <div>
      <h2 className="h-section">{children}</h2>
      {sub && <p className={cn("mt-4 text-xl font-medium sm:text-2xl", dark ? "text-brand-300" : "text-brand-600")}>{sub}</p>}
    </div>
  );
}

export function GlobalPresence({ title, paras }: { title: string; paras: string[] }) {
  return (
    <Section tone="mist">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <h2 className="h-section text-brand-600">{title}</h2>
          <Paras className="mt-6 text-ink-soft">{paras}</Paras>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MAP_IMG} alt="" loading="lazy" className="w-full" />
      </div>
    </Section>
  );
}

/** The original embeds a form; for now it links out to the .com contact page. */
export function ContactBand({ title }: { title: string }) {
  return (
    <section id="cta-form" className="bg-coal py-20 text-white sm:py-28">
      <div className="container-page text-center">
        <h2 className="mx-auto max-w-3xl font-display text-[32px] font-semibold leading-[1.12] tracking-[-0.015em] sm:text-[44px]">{title}</h2>
        <div className="mt-9"><LinkButton href={LINKS.contact}>Contact Us</LinkButton></div>
        <p className="mt-8 text-sm text-white/70">
          I have read and agree to the{" "}
          <a href={LINKS.privacy} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-300">Privacy Policy</a>{" "}and{" "}
          <a href={LINKS.terms} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-300">Terms &amp; Conditions</a>.
        </p>
      </div>
    </section>
  );
}
