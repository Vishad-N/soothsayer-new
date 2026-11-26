import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/data/links";
import { ADVISORY, HUB, WEBINARS, YEARS, pastWebinars, upcomingWebinars, webinarHref } from "@/data/webinars";
import { PageShell } from "../page/PageShell";
import { ContactBand, Heading, Section } from "../page/Shared";
import { Breadcrumb } from "../services/ServicePage";
import { TrustedBy } from "../TrustedBy";
import { CountUp } from "../ui/CountUp";
import { ArrowRight } from "../ui/Icons";
import { KeycapButton } from "../ui/KeycapButton";
import { Reveal } from "../ui/Reveal";
import { ArchiveGrid, type ArchiveItem } from "./ArchiveGrid";
import { CalendarArt } from "./CalendarArt";
import { QuickAnswers } from "./QuickAnswers";
import { QA } from "@/data/webinars";

const SITE = "https://www.soothsayeranalytics.ai";

/** Three of the latest covers fanned like a hand of cards: the archive at a glance. */
function CoverFan() {
  const cards = WEBINARS.filter((w) => w.hero).slice(0, 3);
  const pose = ["-rotate-6 -translate-x-[18%] translate-y-[6%]", "rotate-0 z-10", "rotate-6 translate-x-[18%] translate-y-[6%]"];
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
      <div aria-hidden className="absolute -inset-4 rounded-[32px] bg-brand/20 blur-3xl" />
      {[cards[1], cards[0], cards[2]].map((w, i) => (
        <Link
          key={w.slug}
          href={webinarHref(w.slug)}
          tabIndex={i === 1 ? 0 : -1}
          aria-label={w.title}
          className={`absolute left-[14%] top-[10%] w-[72%] overflow-hidden rounded-[14px] border border-white/15 bg-deep shadow-[0_30px_70px_-25px_rgb(0_0_0/0.85)] transition-transform duration-500 hover:scale-[1.04] ${pose[i]}`}
        >
          <div className="relative aspect-video">
            <Image src={w.hero!} alt="" fill sizes="(min-width: 1024px) 400px, 70vw" priority={i === 1} className="object-cover" />
          </div>
          <div className={i === 1 ? "border-t border-white/10 bg-[#071e25]/95 px-4 py-3" : "hidden"}>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-300">{w.date}</p>
            <p className="mt-1 line-clamp-1 text-[14px] font-medium text-white">{w.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function WebinarsHubView() {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Webinars" }];
  const upcoming = upcomingWebinars();
  const past = pastWebinars();
  const items: ArchiveItem[] = past.map(({ slug, title, date, year, subtitle, hero, cover }) => ({ slug, title, date, year, subtitle, hero, cover }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, ...(c.href ? { item: `${SITE}${c.href}` } : {}) })),
  };

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
                  <span className="size-2 rounded-full bg-brand shadow-[0_0_10px_var(--color-brand)]" />
                  {HUB.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 bg-gradient-to-b from-white from-40% to-brand-100/80 bg-clip-text text-[34px] font-semibold leading-[1.08] tracking-[-0.025em] text-transparent xs:text-[42px] sm:text-[52px] xl:text-[58px]">
                  {HUB.h1}
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[620px] text-[16px] leading-[1.7] text-white/80 sm:text-[18px]">{HUB.body}</p>
              </Reveal>
              <Reveal delay={0.2} className="mt-7">
                <KeycapButton href="#briefings" fullWidthMobile>{HUB.cta}</KeycapButton>
              </Reveal>
            </div>
            <Reveal delay={0.2} y={24}><CoverFan /></Reveal>
          </div>
        </div>
      </section>

      <TrustedBy title={HUB.trusted} />

      {/* calendar */}
      <Section id="upcoming" className="scroll-mt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <Heading>{HUB.calendar.title}</Heading>
            <p className="mt-5 max-w-[560px] text-lg leading-[1.65] text-ink-soft">{HUB.calendar.intro}</p>
            {upcoming.length === 0 ? (
              <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-mist px-5 py-3 text-[16px] font-medium text-ink">
                <span aria-hidden className="size-2.5 rounded-full bg-brand" />
                {HUB.calendar.empty}
              </p>
            ) : (
              <ul className="mt-8 space-y-3">
                {upcoming.map((w) => (
                  <li key={w.slug}>
                    <Link href={webinarHref(w.slug)} className="group flex min-h-[64px] items-center justify-between gap-4 rounded-[12px] border border-line bg-white px-5 py-3 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lift">
                      <span><span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-[#007a96]">{w.date}</span><span className="block text-[17px] font-semibold text-ink">{w.title}</span></span>
                      <ArrowRight className="size-4 shrink-0 text-[#007a96] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <CalendarArt className="mx-auto h-auto w-full max-w-[360px]" />
        </div>
      </Section>

      {/* archive */}
      <Section tone="mist" id="briefings" className="scroll-mt-20" beforeDark>
        <Heading sub={HUB.archive.sub}>{HUB.archive.title}</Heading>
        <p className="mt-5 max-w-[720px] text-lg leading-[1.65] text-ink-soft">{HUB.archive.intro}</p>
        <div className="mt-10"><ArchiveGrid items={items} years={YEARS} /></div>
      </Section>

      {/* foundation stats + quick answers */}
      <Section tone="dark" edge reveal={false}>
        <Reveal>
          <Heading dark>{HUB.foundation.title}</Heading>
          <p className="mt-5 max-w-[760px] text-lg leading-[1.7] text-white/80 sm:text-xl">{HUB.foundation.body}</p>
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {HUB.foundation.stats.map((s) => (
            <li key={s.label} className="relative overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.05] p-6 sm:p-7">
              <svg aria-hidden viewBox="0 0 80 80" className="pointer-events-none absolute right-0 top-0 size-20 text-brand-300 opacity-20"><g fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="80" cy="0" r="30" /><circle cx="80" cy="0" r="50" /><circle cx="80" cy="0" r="70" /></g></svg>
              <p className="font-display text-[48px] font-semibold leading-none tracking-[-0.02em] text-white"><CountUp value={s.value} suffix={s.suffix} /></p>
              <h3 className="mt-4 text-[19px] font-semibold text-brand-100">{s.label}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-white/75">{s.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-24 border-t border-white/10 pt-20">
          <p className="max-w-[640px] text-lg leading-[1.6] text-white/75">{QA.intro}</p>
          <h2 className="h-section mt-3 text-white">{QA.title}</h2>
          <div className="mt-10"><QuickAnswers /></div>
        </div>
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
