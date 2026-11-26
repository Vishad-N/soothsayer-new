import Link from "next/link";
import { CustomerStories } from "../CustomerStories";
import { PageShell } from "../page/PageShell";
import { ContactBand, Heading, Section } from "../page/Shared";
import { Breadcrumb, type Crumb } from "../services/ServicePage";
import { CornerRings } from "../ui/CornerRings";
import { ArrowRight } from "../ui/Icons";
import { cn } from "@/lib/cn";
import { KeycapButton } from "../ui/KeycapButton";
import { Reveal } from "../ui/Reveal";
import { ADVISORY, CASES, FORM, QA, neighbours, webinarHref, type Webinar } from "@/data/webinars";
import { LINKS } from "@/data/links";
import { PresentationForm } from "./PresentationForm";
import { QuickAnswers } from "./QuickAnswers";
import { WebinarCover } from "./WebinarCover";

const SITE = "https://www.soothsayeranalytics.ai";
const pad = (n: number) => String(n).padStart(2, "0");

const initials = (name: string) =>
  name.replace(/,.*$/, "").replace(/^Dr\.\s*/, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function CalendarIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function Fact({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4 rounded-[12px] border border-line bg-white p-5 shadow-card">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-brand/40 text-brand">
        <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[#007a96]">{label}</p>
        <div className="mt-1.5 text-[16px] font-medium leading-snug text-ink [overflow-wrap:anywhere]">{children}</div>
      </div>
    </li>
  );
}

function Details({ w }: { w: Webinar }) {
  const names = w.speakers.map((s) => s.name);
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {w.zones.length > 0 && (
        <Fact label="Time" icon={<g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>}>
          <ul className="space-y-0.5">{w.zones.map((z) => <li key={z}>{z}</li>)}</ul>
        </Fact>
      )}
      {w.duration && (
        <Fact label="Duration" icon={<g><path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" /></g>}>{w.duration}</Fact>
      )}
      {names.length > 0 && (
        <Fact label={names.length > 1 ? "Speakers" : "Speaker"} icon={<g><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1-4 3.8-6 7-6s6 2 7 6" /></g>}>
          {names.join(" · ")}
        </Fact>
      )}
    </ul>
  );
}

function Speakers({ w }: { w: Webinar }) {
  return (
    <ul className="space-y-5">
      {w.speakers.map((s) => (
        <li key={s.name} className="group relative overflow-hidden rounded-[14px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-7">
          <CornerRings />
          <div className="flex items-center gap-4">
            <span aria-hidden className="grid size-16 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#0d2530,#0e5262)] font-display text-xl font-semibold text-brand-300">{initials(s.name)}</span>
            <div className="min-w-0">
              <h3 className="text-[21px] font-semibold leading-tight text-ink [overflow-wrap:anywhere]">{s.name}</h3>
              {s.roles.map((r) => <p key={r} className="mt-1 text-[15px] leading-snug text-ink-soft">{r}</p>)}
            </div>
          </div>
          <div className="mt-5 space-y-3 text-[15px] leading-[1.7] text-ink-soft">
            {s.bio.map((b) => <p key={b.slice(0, 40)}>{b}</p>)}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Takeaways({ w }: { w: Webinar }) {
  return (
    <>
      <Heading>Key Takeaways</Heading>
      {w.takeawaysIntro.length > 0 && (
        <div className="mt-5 max-w-[820px] space-y-3 text-lg leading-[1.65] text-ink-soft">{w.takeawaysIntro.map((t) => <p key={t.slice(0, 40)}>{t}</p>)}</div>
      )}
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
        {w.takeaways.map((t, i) => (
          <li key={t.title} className={cn("group relative overflow-hidden rounded-[12px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-8", i === w.takeaways.length - 1 && w.takeaways.length % 2 === 1 && "md:col-span-2")}>
            <CornerRings />
            <span aria-hidden className="font-mono text-sm tracking-widest text-[#007a96]">{pad(i + 1)}</span>
            <h3 className="mt-3 text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">{t.title}</h3>
            <p className="mt-3 text-base leading-[1.7] text-ink-soft sm:text-[17px]">{t.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Who({ w }: { w: Webinar }) {
  return (
    <>
      <Heading>Who Should Attend</Heading>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {w.who.map((p) => (
          <li key={p.title} className="rounded-[12px] border border-line bg-mist p-6">
            <span aria-hidden className="grid size-11 place-items-center rounded-full border border-brand/40 bg-white text-brand">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 19c.7-3 3-5 6-5s5.300 2 6 5" /><circle cx="17" cy="9" r="2.400" /><path d="M17.500 14c1.900.4 3.100 2 3.500 4" /></svg>
            </span>
            <h3 className="mt-4 text-[18px] font-semibold leading-snug text-ink">{p.title}</h3>
            {p.text && <p className="mt-2 text-[15px] leading-[1.65] text-ink-soft">{p.text}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}

function PrevNext({ slug }: { slug: string }) {
  const { newer, older } = neighbours(slug);
  const card = (w: Webinar, dir: "Newer" | "Older") => (
    <Link
      href={webinarHref(w.slug)}
      className="group flex h-full flex-col rounded-[12px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
    >
      <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-[#007a96]">{dir} webinar</span>
      <span className="mt-2 text-[19px] font-semibold leading-snug text-ink">{w.title}</span>
      <span className="mt-1 text-[15px] text-ink-soft">{w.date}</span>
      <span className="mt-auto flex items-center gap-2 pt-5 text-[15px] font-medium text-[#007a96] group-hover:text-brand-600">
        View webinar <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>{older && card(older, "Older")}</div>
      <div>{newer && card(newer, "Newer")}</div>
    </div>
  );
}

export function WebinarPageView({ w }: { w: Webinar }) {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, { name: "Webinars", href: "/webinars" }, { name: w.title }];
  const url = `${SITE}${webinarHref(w.slug)}`;
  const iso = new Date(w.timeMs).toISOString().slice(0, 10);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, ...(c.href ? { item: `${SITE}${c.href}` } : {}) })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Event",
      name: w.title,
      startDate: iso,
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: { "@type": "VirtualLocation", url },
      description: w.description ?? w.subtitle ?? w.about[0],
      organizer: { "@type": "Organization", name: "Soothsayer Analytics", url: SITE },
      ...(w.hero ? { image: `${SITE}${w.hero}` } : {}),
      ...(w.speakers.length ? { performer: w.speakers.map((s) => ({ "@type": "Person", name: s.name })) } : {}),
    },
  ];

  const hasDetails = w.zones.length > 0 || !!w.duration || w.speakers.length > 0;

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* hero */}
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
              <Reveal y={12}>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-300/30 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-brand-100 backdrop-blur-md">
                  <CalendarIcon />
                  {w.date}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 bg-gradient-to-b from-white from-40% to-brand-100/80 bg-clip-text text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-transparent xs:text-[38px] sm:text-[46px] xl:text-[52px]">
                  {w.title}
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                {w.subtitle && <p className="mt-5 max-w-[620px] text-[19px] font-medium leading-[1.45] text-brand-100 sm:text-[22px]">{w.subtitle}</p>}
                {w.description && <p className="mt-5 max-w-[620px] text-[16px] leading-[1.7] text-white/75 sm:text-[17px]">{w.description}</p>}
              </Reveal>
              <Reveal delay={0.2} className="mt-7 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                <KeycapButton href="#presentation" fullWidthMobile>{FORM.title}</KeycapButton>
                <a href="#clips" className="inline-flex min-h-11 items-center justify-center text-[15px] text-white/80 underline underline-offset-4 transition-colors hover:text-brand-300">{QA.title}</a>
              </Reveal>
            </div>
            <Reveal delay={0.2} y={24}>
              <div className="relative mx-auto w-full max-w-[560px]">
                <div aria-hidden className="absolute -inset-4 rounded-[32px] bg-brand/20 blur-3xl" />
                <div className="relative rounded-[18px] border border-white/12 bg-white/[0.05] p-2 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]">
                  <WebinarCover webinar={w} priority className="rounded-[12px]" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* details, about, speakers */}
      <Section edge>
        {hasDetails && <div className="mb-14"><Details w={w} /></div>}
        <div className={w.speakers.length ? "grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14" : ""}>
          <div>
            <Heading>About the webinar</Heading>
            <div className="mt-8 space-y-5 text-[17px] leading-[1.8] text-ink-soft">
              {w.about.map((p, i) => <p key={p.slice(0, 40)} className={i === 0 ? "text-[19px] leading-[1.7] text-ink sm:text-[21px]" : undefined}>{p}</p>)}
            </div>
          </div>
          {w.speakers.length > 0 && (
            <div className="lg:pt-2">
              <Speakers w={w} />
            </div>
          )}
        </div>
      </Section>

      {w.takeaways.length > 0 && <Section tone="mist"><Takeaways w={w} /></Section>}
      {w.who.length > 0 && <Section><Who w={w} /></Section>}

      {/* presentation request + quick answers */}
      <Section tone="dark" edge reveal={false} id="presentation" className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Heading dark>{FORM.title}</Heading>
            <p className="mt-5 text-lg leading-[1.7] text-white/80 sm:text-xl">{FORM.intro}</p>
            {w.closing && (
              <div className="mt-8 rounded-[12px] border border-brand-300/25 bg-brand-300/10 p-6">
                <h3 className="text-[19px] font-semibold leading-snug text-white">{w.closing.heading}</h3>
                {w.closing.text.map((t) => <p key={t.slice(0, 30)} className="mt-3 text-[16px] leading-[1.7] text-white/80">{t}</p>)}
              </div>
            )}
          </div>
          <PresentationForm webinar={w.title} />
        </div>

        <div id="clips" className="mt-24 scroll-mt-24 border-t border-white/10 pt-20">
          <p className="max-w-[640px] text-lg leading-[1.6] text-white/75">{QA.intro}</p>
          <h2 className="h-section mt-3 text-white">{QA.title}</h2>
          <div className="mt-10"><QuickAnswers /></div>
        </div>
      </Section>

      <CustomerStories title={CASES.title} intro={CASES.intro} />

      <Section beforeDark>
        <PrevNext slug={w.slug} />
      </Section>

      <ContactBand
        title={ADVISORY.title}
        text={ADVISORY.text}
        cta={ADVISORY.button}
        href={LINKS.booking}
        secondary={{ label: "Prefer to write to us?", href: LINKS.contact }}
      />
    </PageShell>
  );
}
