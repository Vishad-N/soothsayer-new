import Link from "next/link";
import { capabilityHref, getCapability } from "@/data/capabilities";
import { getService, serviceHref, type Card, type Faq, type ServicePage as Page, type Step } from "@/data/services";
import { LINKS } from "@/data/links";
import { cn } from "@/lib/cn";
import { PageShell } from "../page/PageShell";
import { ContactBand, Heading, Section } from "../page/Shared";
import { KeycapButton } from "../ui/KeycapButton";
import { ArrowRight, Chevron, LINE_ICONS, Quote } from "../ui/Icons";
import { CornerRings } from "../ui/CornerRings";
import { Reveal } from "../ui/Reveal";
import { ServiceArt } from "./ServiceArt";
import type { ArtKey } from "@/data/services";

export const SITE = "https://www.soothsayeranalytics.ai";
export const pad = (n: number) => String(n).padStart(2, "0");

export type Crumb = { name: string; href?: string };

/* ------------------------------------------------------------- hero --- */

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70">
        {crumbs.map((c, i) => (
          <li key={c.name} className="flex items-center gap-2">
            {i > 0 && <Chevron aria-hidden className="size-3.5 -rotate-90 text-white/40" />}
            {c.href ? (
              <Link href={c.href} className="inline-flex min-h-8 items-center transition-colors hover:text-brand-300">{c.name}</Link>
            ) : (
              <span aria-current="page" className="text-white">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ServiceHero({
  crumbs, h1, subhead, body, cta, ctaHref = LINKS.booking, art, extra,
}: {
  crumbs: Crumb[]; h1: string; subhead: string; body: string; cta: string; ctaHref?: string; art: ArtKey; extra?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-abyss text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_100%_at_72%_45%,#0b3a44_0%,#061f26_55%,#04141a_90%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_80%_at_70%_40%,#000,transparent_80%)]" />
        <div className="absolute right-[-10%] top-1/2 h-[520px] w-[640px] max-w-[120vw] -translate-y-1/2 rounded-full bg-brand/25 blur-[130px]" />
      </div>

      <div className="container-page pb-24 pt-28 sm:pb-28 sm:pt-32 lg:pb-36 lg:pt-36">
        <Breadcrumb crumbs={crumbs} />
        <div className="mt-8 grid items-center gap-12 lg:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div>
            <Reveal delay={0.05}>
              <h1 className="bg-gradient-to-b from-white from-40% to-brand-100/80 bg-clip-text text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-transparent xs:text-[38px] sm:text-[48px] xl:text-[54px]">
                {h1}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[620px] text-[18px] font-medium leading-[1.5] text-brand-100 sm:text-xl">{subhead}</p>
              <p className="mt-5 max-w-[620px] text-[16px] leading-[1.7] text-white/75 sm:text-[17px]">{body}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-7 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
              <KeycapButton href={ctaHref} fullWidthMobile>{cta}</KeycapButton>
              {extra ?? (
                <a href={LINKS.contact} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center text-[15px] text-white/80 underline underline-offset-4 transition-colors hover:text-brand-300">
                  Prefer to write to us?
                </a>
              )}
            </Reveal>
          </div>
          <Reveal delay={0.2} y={24}>
            <div className="relative mx-auto w-full max-w-[560px]">
              <div aria-hidden className="absolute -inset-4 rounded-[32px] bg-brand/20 blur-3xl" />
              <ServiceArt name={art} className="relative" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- sections --- */

export function When({ items }: { items: string[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <Heading>When you need this</Heading>
      </div>
      <ul className="border-t border-line">
        {items.map((w, i) => (
          <li key={w} className="flex gap-4 border-b border-line py-5 sm:gap-5 sm:py-6">
            <span aria-hidden className="mt-0.5 w-8 shrink-0 font-mono text-sm tracking-widest text-[#007a96]">{pad(i + 1)}</span>
            <p className="text-[18px] font-medium leading-[1.5] text-ink sm:text-xl">{w}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Get({ heading, items }: { heading: string; items: Card[] }) {
  return (
    <>
      <Heading>{heading}</Heading>
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
        {items.map((c, i) => {
          const last = i === items.length - 1 && items.length % 2 === 1;
          const body = (
            <>
              <CornerRings />
              <span aria-hidden className="font-mono text-sm tracking-widest text-[#007a96]">{pad(i + 1)}</span>
              <h3 className="mt-3 text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-2xl">{c.title}</h3>
              <p className="mt-4 text-base leading-[1.75] text-ink-soft sm:text-[17px]">{c.text}</p>
              {c.href && (
                <span className="mt-auto flex items-center gap-2 pt-6 text-[15px] font-medium text-[#007a96] group-hover:text-brand-600">
                  View this role
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              )}
            </>
          );
          const cls = "relative flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-8";
          return (
            <li key={c.title} className={cn("group", last && "md:col-span-2")}>
              {c.href ? (
                <Link href={c.href} className={cls}>{body}</Link>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

const COLS: Record<number, string> = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

/** A numbered timeline: horizontal from lg, a vertical rail below. */
export function How({ how }: { how: Page["how"] }) {
  const { heading, intro, steps, closing } = how;
  return (
    <>
      <Heading dark>{heading}</Heading>
      {intro && (
        <p className="mt-6 max-w-[760px] text-lg leading-[1.7] text-white/80 sm:text-xl">
          {intro.before}
          <Link href={intro.link.href} className="text-brand-300 underline underline-offset-4 hover:text-white">{intro.link.text}</Link>
          {intro.after}
        </p>
      )}
      <ol className={cn("mt-14 grid gap-10 lg:gap-8", COLS[steps.length])}>
        {steps.map((s: Step, i) => {
          const [a, b] = s.label.includes(": ") ? s.label.split(/: (.*)/s) : [null, s.label];
          return (
            <li key={s.label} className="relative pl-16 lg:pl-0 lg:pt-16">
              <span aria-hidden className="absolute left-0 top-0 grid size-11 place-items-center rounded-full border border-brand-300/60 bg-deep font-mono text-sm text-brand-300 shadow-[0_0_24px_-4px_rgb(34_211_238/0.5)]">{pad(i + 1)}</span>
              {i < steps.length - 1 && (
                <>
                  <span aria-hidden className="absolute bottom-[-2.5rem] left-[21px] top-12 w-px bg-gradient-to-b from-brand-300/60 to-brand-300/10 lg:hidden" />
                  <span aria-hidden className="absolute left-14 right-[-2rem] top-[21px] hidden h-px bg-gradient-to-r from-brand-300/60 to-brand-300/10 lg:block" />
                </>
              )}
              {a && <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-brand-300">{a}</p>}
              <h3 className={cn("text-[22px] font-semibold leading-snug text-white sm:text-2xl", a && "mt-2")}>{b}</h3>
              <p className="mt-3 text-base leading-[1.7] text-white/75 sm:text-[17px]">{s.text}</p>
            </li>
          );
        })}
      </ol>
      {closing && (
        <p className="mt-12 inline-flex items-center gap-3 rounded-full border border-brand-300/30 bg-brand-300/10 px-5 py-3 text-[16px] font-medium text-brand-100">
          <LINE_ICONS.refresh className="size-5 shrink-0 text-brand-300" />
          {closing}
        </p>
      )}
    </>
  );
}

export function Options({ heading, items }: { heading: string; items: Card[] }) {
  return (
    <>
      <Heading>{heading}</Heading>
      <ul className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
        {items.map((o, i) => (
          <li key={o.title} className="group relative overflow-hidden rounded-[12px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-8">
            <CornerRings />
            <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-300" style={{ opacity: 1 - i * 0.25 }} />
            <h3 className="text-[22px] font-semibold leading-[1.2] text-ink">{o.title}</h3>
            <p className="mt-4 text-base leading-[1.75] text-ink-soft sm:text-[17px]">{o.text}</p>
            {o.href && (
              <Link href={o.href} className="group mt-5 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-[#007a96] hover:text-brand-600">
                Fractional Chief AI Officer
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export function Stories({ stories, heading = "Success stories" }: { stories: { name: string; text: string }[]; heading?: string }) {
  const one = stories.length === 1;
  return (
    <>
      <Heading>{heading}</Heading>
      <ul className={cn("mt-12 grid gap-5", one ? "" : stories.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
        {stories.map((s) => (
          <li key={s.name} className="group relative overflow-hidden rounded-[12px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-8">
            <CornerRings />
            <h3 className={cn("font-semibold leading-snug text-ink", one ? "text-2xl" : "text-xl")}>{s.name}</h3>
            <p className={cn("mt-3 leading-[1.65] text-ink-soft", one ? "max-w-[820px] text-[17px] sm:text-lg" : "text-base")}>{s.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

const initials = (s: string) => s.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("");

export function Quotes({ quotes }: { quotes: { role: string; company: string; quote: string }[] }) {
  return (
    <>
      <Heading>What clients say</Heading>
      <ul className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
        {quotes.map((q) => (
          <li key={q.role + q.company} className="flex flex-col rounded-[12px] border border-line bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-3">
              <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-[6px] bg-[linear-gradient(135deg,#0d2530,#0e5262)] font-display text-[17px] font-semibold text-brand-300">{initials(q.company)}</span>
              <div>
                <p className="font-display text-[16px] font-semibold leading-tight text-ink">{q.role}</p>
                <p className="mt-1 text-[15px] text-ink-soft">{q.company}</p>
              </div>
            </div>
            <Quote className="mt-6 h-4 w-6 text-brand" />
            <blockquote className="mt-4 text-base leading-[1.75] text-ink-soft sm:text-[17px]"><p>{q.quote}</p></blockquote>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Faqs({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <Heading>Questions we get asked</Heading>
      </div>
      <div className="border-t border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-line">
            <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-[18px] font-semibold leading-snug text-ink marker:hidden hover:text-[#007a96] sm:text-xl [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-transform duration-200 group-open:rotate-45 group-open:border-brand group-open:text-brand">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </summary>
            <p className="pb-6 pr-12 text-base leading-[1.75] text-ink-soft sm:text-[17px]">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function RelatedLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  const Icon = LINE_ICONS[icon] ?? LINE_ICONS.spark;
  return (
    <li>
      <Link href={href} className="group flex min-h-[64px] items-center gap-4 rounded-[12px] border border-line bg-white px-4 py-3 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lift">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-brand/40 text-brand"><Icon className="size-5" /></span>
        <span className="flex-1 text-[17px] font-semibold leading-snug text-ink">{label}</span>
        <ArrowRight className="size-4 shrink-0 text-[#007a96] transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </li>
  );
}

export function Related({ related }: { related: Page["related"] }) {
  return (
    <>
      <Heading>Related</Heading>
      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#007a96]">Services</h3>
          <ul className="mt-4 space-y-3">
            {related.services.map((s) => {
              const p = getService(s)!;
              return <RelatedLink key={s} href={serviceHref(s)} icon={p.icon} label={p.nav} />;
            })}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#007a96]">Capabilities</h3>
          <ul className="mt-4 space-y-3">
            {related.capabilities.map((s) => {
              const p = getCapability(s)!;
              return <RelatedLink key={s} href={capabilityHref(s)} icon={p.icon} label={p.name} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export function schemaFor(crumbs: Crumb[], faqs: Faq[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, ...(c.href ? { item: `${SITE}${c.href}` } : {}) })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
}

/** Sections that follow the dark "How it works" band alternate white / mist; the first one takes the skyline edge. */
export function Alternating({ nodes, afterDark = true }: { nodes: { key: string; node: React.ReactNode }[]; afterDark?: boolean }) {
  return (
    <>
      {nodes.map((r, i) => (
        <Section key={r.key} tone={i % 2 === 0 ? "light" : "mist"} edge={i === 0 && afterDark} beforeDark={i === nodes.length - 1}>
          {r.node}
        </Section>
      ))}
    </>
  );
}

/* ------------------------------------------------------------- page --- */

export function ServicePageView({ page }: { page: Page }) {
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    ...(page.parent ? [{ name: page.parent.name, href: serviceHref(page.parent.slug) }] : []),
    { name: page.name },
  ];

  const rest: { key: string; node: React.ReactNode }[] = [];
  if (page.options) rest.push({ key: "options", node: <Options {...page.options} /> });
  if (page.stories.length) rest.push({ key: "stories", node: <Stories stories={page.stories} /> });
  if (page.quotes) rest.push({ key: "quotes", node: <Quotes quotes={page.quotes} /> });
  rest.push({ key: "faqs", node: <Faqs faqs={page.faqs} /> });
  rest.push({ key: "related", node: <Related related={page.related} /> });

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFor(crumbs, page.faqs)) }} />
      <ServiceHero crumbs={crumbs} h1={page.h1} subhead={page.subhead} body={page.body} cta={page.cta} art={page.art} />
      <Section edge><When items={page.when} /></Section>
      <Section tone="mist" beforeDark><Get heading={page.getHeading} items={page.get} /></Section>
      <Section tone="dark" edge beforeDark><How how={page.how} /></Section>
      <Alternating nodes={rest} />
      <ContactBand
        title={page.closing.heading}
        cta={page.closing.button}
        href={LINKS.booking}
        secondary={{ label: "Prefer to write to us?", href: LINKS.contact }}
      />
    </PageShell>
  );
}

