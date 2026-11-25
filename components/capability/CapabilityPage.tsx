import Link from "next/link";
import { LINKS } from "@/data/links";
import { CAPABILITY_PAGES, capabilityHref, type CapabilityPage as Page } from "@/data/capabilities";
import { cn } from "@/lib/cn";
import { PageShell } from "../page/PageShell";
import { ContactBand, Heading, Section } from "../page/Shared";
import { KeycapButton } from "../ui/KeycapButton";
import { ArrowRight, Chevron, LINE_ICONS } from "../ui/Icons";
import { CornerRings } from "../ui/CornerRings";
import { Reveal } from "../ui/Reveal";

const SITE = "https://www.soothsayeranalytics.ai";
const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------- hero --- */

function Breadcrumb({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70">
        <li><Link href="/" className="inline-flex min-h-8 items-center transition-colors hover:text-brand-300">Home</Link></li>
        <li aria-hidden><Chevron className="size-3.5 -rotate-90 text-white/40" /></li>
        <li><Link href="/capabilities" className="inline-flex min-h-8 items-center transition-colors hover:text-brand-300">Capabilities</Link></li>
        <li aria-hidden><Chevron className="size-3.5 -rotate-90 text-white/40" /></li>
        <li aria-current="page" className="text-white">{name}</li>
      </ol>
    </nav>
  );
}

/** Index of the four sub-capabilities, as jump links. Fills the hero's right column on desktop. */
function InsidePanel({ page }: { page: Page }) {
  const Icon = LINE_ICONS[page.icon];
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-4 rounded-[28px] bg-brand/20 blur-3xl" />
      <div className="relative rounded-[16px] border border-white/12 bg-white/[0.05] p-5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur-md sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full border border-brand-300/30 bg-brand-300/10 text-brand-300">
            <Icon className="size-[22px]" />
          </span>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-300">What we build</p>
        </div>
        <ol className="mt-5">
          {page.build.map((b, i) => (
            <li key={b.title} className="border-t border-white/10 first:border-t-0">
              <a href={`#build-${i + 1}`} className="group flex min-h-14 items-center gap-4 py-3 text-white/90 transition-colors hover:text-brand-300">
                <span className="w-7 shrink-0 font-mono text-[12px] tracking-widest text-brand-300/80">{pad(i + 1)}</span>
                <span className="flex-1 text-[17px] font-medium leading-snug sm:text-lg">{b.title}</span>
                <ArrowRight className="size-4 shrink-0 text-white/40 transition-[transform,color] group-hover:translate-x-1 group-hover:text-brand-300" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Hero({ page }: { page: Page }) {
  return (
    <section className="relative isolate overflow-hidden bg-abyss text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_100%_at_72%_45%,#0b3a44_0%,#061f26_55%,#04141a_90%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_80%_at_70%_40%,#000,transparent_80%)]" />
        <div className="absolute right-[-10%] top-1/2 h-[520px] w-[640px] max-w-[120vw] -translate-y-1/2 rounded-full bg-brand/25 blur-[130px]" />
      </div>

      <div className="container-page pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
        <Breadcrumb name={page.name} />
        <div className="mt-8 grid items-center gap-12 lg:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
          <div>
            <Reveal delay={0.05}>
              <h1 className="bg-gradient-to-b from-white from-40% to-brand-100/80 bg-clip-text text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-transparent xs:text-[38px] sm:text-[48px] xl:text-[54px]">
                {page.h1}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[640px] text-[18px] font-medium leading-[1.5] text-brand-100 sm:text-xl">{page.subhead}</p>
              <p className="mt-5 max-w-[640px] text-[16px] leading-[1.7] text-white/75 sm:text-[17px]">{page.body}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-7">
              <KeycapButton href={LINKS.contact} fullWidthMobile>{page.cta}</KeycapButton>
            </Reveal>
          </div>
          <Reveal delay={0.2} y={24}>
            <InsidePanel page={page} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- sections --- */

type Tone = "light" | "mist";

function When({ page }: { page: Page }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <Heading>When you need this</Heading>
      </div>
      <ul className="border-t border-line">
        {page.when.map((w, i) => (
          <li key={w} className="flex gap-4 border-b border-line py-5 sm:gap-5 sm:py-6">
            <span aria-hidden className="mt-0.5 w-8 shrink-0 font-mono text-sm tracking-widest text-[#007a96]">{pad(i + 1)}</span>
            <p className="text-[18px] font-medium leading-[1.5] text-ink sm:text-xl">{w}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Build({ page }: { page: Page }) {
  return (
    <>
      <Heading>What we build</Heading>
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
        {page.build.map((b, i) => {
          const Icon = LINE_ICONS[b.icon] ?? LINE_ICONS.spark;
          return (
            <li key={b.title} id={`build-${i + 1}`} className="group relative scroll-mt-28 overflow-hidden rounded-[12px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-8">
              <CornerRings />
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-brand/40 text-brand">
                  <Icon className="size-[22px]" />
                </span>
                <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-2xl">{b.title}</h3>
              </div>
              <p className="mt-5 text-base leading-[1.75] text-ink-soft sm:text-[17px]">{b.text}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Deliver({ page }: { page: Page }) {
  const { intro, steps, blocks } = page.deliver;
  return (
    <>
      <Heading dark>How we deliver it</Heading>
      {intro && <p className="mt-6 max-w-[760px] text-lg leading-[1.7] text-white/80 sm:text-xl">{intro}</p>}
      {steps && (
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.label} className="relative rounded-[12px] border border-white/10 bg-white/[0.04] p-6">
              <span aria-hidden className="font-mono text-sm tracking-widest text-brand-300">{pad(i + 1)}</span>
              <h3 className="mt-3 text-2xl font-semibold text-white">{s.label}</h3>
              <p className="mt-3 text-base leading-[1.65] text-white/75">{s.text}</p>
            </li>
          ))}
        </ol>
      )}
      {blocks && (
        <ol className={cn("mt-12 grid gap-5", blocks.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3")}>
          {blocks.map((b, i) => (
            <li key={b.slice(0, 32)} className="rounded-[12px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <span aria-hidden className="font-mono text-sm tracking-widest text-brand-300">{pad(i + 1)}</span>
              <span aria-hidden className="mt-4 block h-px w-12 bg-brand-300/50" />
              <p className="mt-5 text-base leading-[1.75] text-white/85 sm:text-[17px]">{b}</p>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

function Stories({ page }: { page: Page }) {
  const stories = page.stories ?? [];
  return (
    <>
      <Heading>Success stories</Heading>
      <ul className={cn("mt-12 grid gap-5", stories.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
        {stories.map((s) => {
          const listing = s.href === "/case-studies";
          const external = /^https?:/.test(s.href);
          const inner = (
            <>
              <h3 className="text-xl font-semibold leading-snug text-ink">{s.name}</h3>
              <p className="mt-3 text-base leading-[1.65] text-ink-soft">{s.text}</p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-[15px] font-medium text-[#007a96] transition-colors group-hover:text-brand-600">
                {listing ? "Explore case studies" : "Read the case study"}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </>
          );
          const cls = "flex h-full flex-col rounded-[12px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-7";
          return (
            <li key={s.name} className="group">
              {external ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <Link href={s.href} className={cls}>{inner}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Tools({ page }: { page: Page }) {
  return (
    <>
      <Heading>What we work with</Heading>
      <ul className="mt-10 flex flex-wrap gap-3">
        {page.tools!.map((t) => (
          <li key={t} className="rounded-full border border-line bg-white px-4 py-2 text-[15px] font-medium text-ink shadow-card">{t}</li>
        ))}
      </ul>
    </>
  );
}

function Faqs({ page }: { page: Page }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <Heading>Questions we get asked</Heading>
      </div>
      <div className="border-t border-line">
        {page.faqs.map((f) => (
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

function Related({ current }: { current: string }) {
  const others = CAPABILITY_PAGES.filter((p) => p.slug !== current);
  return (
    <>
      <Heading>Related capabilities</Heading>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {others.map((o) => {
          const Icon = LINE_ICONS[o.icon];
          return (
            <li key={o.slug} className="group">
              <Link
                href={capabilityHref(o.slug)}
                className="flex h-full min-h-[132px] flex-col rounded-[12px] border border-line bg-white p-5 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
              >
                <span className="grid size-10 place-items-center rounded-full border border-brand/40 text-brand">
                  <Icon className="size-5" />
                </span>
                <span className="mt-4 text-[17px] font-semibold leading-snug text-ink">{o.nav}</span>
                <ArrowRight className="mt-auto size-4 text-[#007a96] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/* ------------------------------------------------------------- page --- */

/** Shared template for the six capability pages. Optional sections are skipped when the page has no content for them. */
export function CapabilityPageView({ page }: { page: Page }) {
  const hasDeliver = !!(page.deliver.intro || page.deliver.steps || page.deliver.blocks);

  // Sections after the dark "How we deliver it" band alternate white / mist.
  const rest: { key: string; node: React.ReactNode }[] = [];
  if (page.stories?.length) rest.push({ key: "stories", node: <Stories page={page} /> });
  if (page.tools?.length) rest.push({ key: "tools", node: <Tools page={page} /> });
  rest.push({ key: "faqs", node: <Faqs page={page} /> });
  rest.push({ key: "related", node: <Related current={page.slug} /> });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Capabilities", item: `${SITE}/capabilities` },
        { "@type": "ListItem", position: 3, name: page.name, item: `${SITE}${capabilityHref(page.slug)}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero page={page} />

      <Section edge><When page={page} /></Section>
      <Section tone="mist" beforeDark={hasDeliver}><Build page={page} /></Section>
      {hasDeliver && (
        <Section tone="dark" edge beforeDark>
          <Deliver page={page} />
        </Section>
      )}
      {rest.map((r, i) => (
        <Section
          key={r.key}
          tone={i % 2 === 0 ? "light" : "mist"}
          edge={i === 0 && hasDeliver}
          beforeDark={i === rest.length - 1}
        >
          {r.node}
        </Section>
      ))}

      <ContactBand title={page.closing.heading} cta={page.closing.button} />
    </PageShell>
  );
}
