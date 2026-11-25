import Link from "next/link";
import { HUB, getService, serviceHref } from "@/data/services";
import { LINKS } from "@/data/links";
import { cn } from "@/lib/cn";
import { PageShell } from "../page/PageShell";
import { ContactBand, Heading, Section } from "../page/Shared";
import { TrustedBy } from "../TrustedBy";
import { KeycapButton } from "../ui/KeycapButton";
import { LinkButton } from "../ui/Button";
import { ArrowRight, LINE_ICONS } from "../ui/Icons";
import { Alternating, Faqs, ServiceHero, Stories, pad, schemaFor, type Crumb } from "./ServicePage";

const STAGE_ICONS = ["compass", "chip", "rocket", "trend"];

/* ------------------------------------------------------- stage map --- */

function ServiceChip({ slug, dark }: { slug: string; dark?: boolean }) {
  const p = getService(slug)!;
  return (
    <Link
      href={serviceHref(slug)}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-medium transition-colors",
        dark
          ? "border-white/20 bg-white/[0.06] text-white hover:border-brand-300 hover:text-brand-300"
          : "border-brand/30 bg-brand-50 text-ink hover:border-brand hover:bg-white",
      )}
    >
      {p.nav}
      <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/** The five-stage program path: four stage cards on a rail, with one leader's bar underneath that spans every stage. */
function StageMap() {
  const { heading, intro, items, across, note } = HUB.stages;
  const AcrossIcon = LINE_ICONS.users;
  return (
    <>
      <Heading>{heading}</Heading>
      <p className="mt-5 max-w-[760px] text-lg leading-[1.65] text-ink-soft">{intro}</p>

      <ol className="mt-14 grid gap-8 lg:grid-cols-4 lg:gap-5">
        {items.map((s, i) => {
          const Icon = LINE_ICONS[STAGE_ICONS[i]];
          return (
            <li key={s.stage} className="relative pl-16 lg:pl-0 lg:pt-16">
              {/* rail: node + a line to the next stage (vertical below lg, horizontal from lg) */}
              <span aria-hidden className="absolute left-0 top-0 grid size-12 place-items-center rounded-full border-2 border-brand bg-white text-brand shadow-[0_0_0_6px_rgb(0_180_216/0.1)]">
                <Icon className="size-[22px]" />
              </span>
              {i < items.length - 1 && (
                <>
                  <span aria-hidden className="absolute bottom-[-2rem] left-[23px] top-14 w-px border-l-2 border-dashed border-brand/40 lg:hidden" />
                  <span aria-hidden className="absolute left-[3.75rem] right-[-1.25rem] top-6 hidden border-t-2 border-dashed border-brand/40 lg:block" />
                </>
              )}
              <div className="flex h-full flex-col rounded-[12px] border border-line bg-white p-6 shadow-card">
                <p className="font-mono text-[13px] tracking-[0.16em] text-[#007a96]">{pad(i + 1)}</p>
                <h3 className="mt-2 text-[22px] font-semibold leading-tight text-ink">{s.stage}</h3>
                <p className="mt-3 text-base leading-[1.6] text-ink-soft">{s.line}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {s.services.map((sv) => <ServiceChip key={sv} slug={sv} />)}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* the leader spans the whole path: dashed drops from each stage into one bar */}
      <div aria-hidden className="hidden h-9 grid-cols-4 gap-5 lg:grid">
        {items.map((s) => <span key={s.stage} className="mx-auto h-full border-l-2 border-dashed border-brand/40" />)}
      </div>
      <div className="relative mt-8 overflow-hidden rounded-[14px] bg-[linear-gradient(110deg,#0d3039_0%,#0b4452_55%,#0a6275_100%)] p-6 text-white shadow-lift sm:p-8 lg:mt-0">
        <svg aria-hidden viewBox="0 0 400 120" preserveAspectRatio="xMaxYMid slice" className="pointer-events-none absolute inset-y-0 right-0 h-full w-[60%] text-brand-300 opacity-25">
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="360" cy="60" r="38" /><circle cx="360" cy="60" r="66" /><circle cx="360" cy="60" r="94" />
            <path d="M0 60h260" strokeDasharray="4 8" />
          </g>
        </svg>
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-brand-300/40 bg-brand-300/15 text-brand-300"><AcrossIcon className="size-6" /></span>
            <div>
              <h3 className="text-[22px] font-semibold leading-tight">{across.stage}</h3>
              <p className="mt-2 max-w-[420px] text-base leading-[1.6] text-white/80">{across.line}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {across.services.map((sv) => <ServiceChip key={sv} slug={sv} dark />)}
          </div>
        </div>
      </div>
      <p className="mt-6 text-[15px] text-ink-soft">{note}</p>
    </>
  );
}

/* ------------------------------------------------------- ways to work --- */

function Ways() {
  const { heading, intro, items } = HUB.ways;
  return (
    <>
      <Heading>{heading}</Heading>
      <p className="mt-5 max-w-[760px] text-lg leading-[1.65] text-ink-soft">{intro}</p>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 lg:gap-6">
        {items.map((w) => {
          const p = getService(w.slug)!;
          const Icon = LINE_ICONS[p.icon];
          return (
            <li key={w.slug} className="group">
              <Link
                href={serviceHref(w.slug)}
                className="flex h-full flex-col rounded-[12px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-full border border-brand/40 text-brand transition-transform duration-300 group-hover:scale-105"><Icon className="size-[22px]" /></span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[13px] font-medium text-[#007a96] ring-1 ring-brand/20">{w.duration}</span>
                </div>
                <h3 className="mt-5 text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">{p.name}</h3>
                <p className="mt-3 text-base leading-[1.6] text-ink-soft">{w.line}</p>
                <ul className="mt-5 border-t border-line pt-1">
                  {w.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 border-b border-dashed border-line py-2.5 text-[15px] leading-snug text-ink last:border-b-0">
                      <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto flex items-center gap-2 pt-5 text-[15px] font-medium text-[#007a96] group-hover:text-brand-600">
                  Explore
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/* ------------------------------------------------------ three starts --- */

const START_ICONS = ["clock", "target", "award"];

function Start() {
  return (
    <section id="start" className="scroll-mt-24">
      <Heading dark>{HUB.start.heading}</Heading>
      <ol className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
        {HUB.start.items.map((o, i) => {
          const Icon = LINE_ICONS[START_ICONS[i]];
          const href = o.href === "booking" ? LINKS.booking : o.href;
          return (
            <li key={o.title} className="flex flex-col rounded-[14px] border border-white/10 bg-white/[0.05] p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full border border-brand-300/40 bg-brand-300/10 text-brand-300"><Icon className="size-[22px]" /></span>
                <span aria-hidden className="font-mono text-sm tracking-widest text-brand-300">{pad(i + 1)}</span>
              </div>
              <h3 className="mt-5 text-[24px] font-semibold leading-tight text-white">{o.title}</h3>
              <p className="mt-3 flex-1 text-base leading-[1.7] text-white/75 sm:text-[17px]">{o.text}</p>
              <div className="mt-6"><KeycapButton href={href} fullWidthMobile>{o.button}</KeycapButton></div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* --------------------------------------------------------- figures --- */

function Figures() {
  const [money, pct, people] = HUB.proof.figures;
  const R = 44, C = 2 * Math.PI * R;
  const card = "relative flex items-center gap-5 overflow-hidden rounded-[14px] border border-line bg-white p-6 shadow-card sm:p-7";
  const num = "font-display text-[40px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[46px]";
  return (
    <ul className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
      <li className={card}>
        <svg aria-hidden viewBox="0 0 100 100" className="size-20 shrink-0">
          <g fill="none" stroke="#00b4d8" strokeWidth="3" strokeLinejoin="round">
            <ellipse cx="50" cy="72" rx="30" ry="10" fill="#d9f5fb" /><path d="M20 72v-12c0 5.5 13.4 10 30 10s30-4.5 30-10v12" />
            <ellipse cx="50" cy="56" rx="30" ry="10" fill="#d9f5fb" /><path d="M20 56V44c0 5.5 13.4 10 30 10s30-4.5 30-10v12" />
            <ellipse cx="50" cy="40" rx="30" ry="10" fill="#6fdcf0" />
          </g>
          <path d="M50 30v20M44 34c0-3 12-3 12 1 0 5-12 2-12 7 0 3.5 12 3.5 12 .5" fill="none" stroke="#0c2631" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div><p className={num}>{money.value}</p><p className="mt-2 text-base leading-snug text-ink-soft">{money.label}</p></div>
      </li>
      <li className={card}>
        <svg aria-hidden viewBox="0 0 100 100" className="size-20 shrink-0 -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="#d9f5fb" strokeWidth="10" />
          <circle cx="50" cy="50" r={R} fill="none" stroke="#00b4d8" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${C * 0.7} ${C}`} />
        </svg>
        <div><p className={num}>{pct.value}</p><p className="mt-2 text-base leading-snug text-ink-soft">{pct.label}</p></div>
      </li>
      <li className={card}>
        <svg aria-hidden viewBox="0 0 100 100" className="size-20 shrink-0">
          <g fill="#00b4d8"><circle cx="50" cy="30" r="9" /><path d="M32 62c1.500-12 8-17 18-17s16.5 5 18 17z" /></g>
          <g fill="#6fdcf0"><circle cx="22" cy="40" r="7" /><path d="M8 66c1-9 6-13 14-13 3 0 6 .8 8 2.5-4 3-6.5 6.5-7.500 10.500z" /><circle cx="78" cy="40" r="7" /><path d="M92 66c-1-9-6-13-14-13-3 0-6 .8-8 2.5 4 3 6.5 6.5 7.500 10.500z" /></g>
          <path d="M14 80h72" stroke="#0c2631" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
        </svg>
        <div><p className={num}>{people.value}</p><p className="mt-2 text-base leading-snug text-ink-soft">{people.label}</p></div>
      </li>
    </ul>
  );
}

/* ----------------------------------------------- services vs capabilities --- */

function Split() {
  const { services, capabilities } = HUB.split;
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
      <div className="rounded-[14px] border border-line bg-white p-7 shadow-card sm:p-9">
        <span className="grid size-12 place-items-center rounded-full border border-brand/40 text-brand"><LINE_ICONS.users className="size-[22px]" /></span>
        <h3 className="mt-5 text-[26px] font-semibold leading-tight text-ink">{services.title}</h3>
        <p className="mt-3 text-base leading-[1.7] text-ink-soft sm:text-[17px]">{services.text}</p>
      </div>
      <Link href="/capabilities" className="group flex flex-col rounded-[14px] border border-brand/30 bg-brand-50 p-7 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-9">
        <span className="grid size-12 place-items-center rounded-full border border-brand/40 bg-white text-brand"><LINE_ICONS.layers className="size-[22px]" /></span>
        <h3 className="mt-5 text-[26px] font-semibold leading-tight text-ink">{capabilities.title}</h3>
        <p className="mt-3 text-base leading-[1.7] text-ink-soft sm:text-[17px]">{capabilities.text}</p>
        <span className="mt-auto flex items-center gap-2 pt-6 text-[15px] font-medium text-[#007a96] group-hover:text-brand-600">
          {capabilities.link}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------- page --- */

export function ServicesHubView() {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, { name: "Services" }];
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFor(crumbs, HUB.faqs)) }} />
      <ServiceHero
        crumbs={crumbs}
        h1={HUB.h1}
        subhead={HUB.subhead}
        body={HUB.body}
        cta={HUB.cta}
        art="hub"
        extra={<LinkButton href="#start" variant="outline-dark" className="mt-1 max-sm:w-full sm:mt-0">{HUB.secondaryCta}</LinkButton>}
      />
      <Section edge><StageMap /></Section>
      <Section tone="mist" beforeDark><Ways /></Section>
      <Section tone="dark" edge beforeDark reveal={false}><Start /></Section>
      <Section edge>
        <Heading>{HUB.proof.heading}</Heading>
        <Figures />
      </Section>
      <TrustedBy />
      <Alternating
        afterDark={false}
        nodes={[
          { key: "stories", node: <Stories stories={HUB.proof.stories} heading="Short stories" /> },
          { key: "split", node: <Split /> },
          { key: "faqs", node: <Faqs faqs={HUB.faqs} /> },
        ]}
      />
      <ContactBand
        title={HUB.closing.heading}
        cta={HUB.closing.button}
        href={LINKS.booking}
        secondary={{ label: "Prefer to write to us?", href: LINKS.contact }}
      />
    </PageShell>
  );
}
