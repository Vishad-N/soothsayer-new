import Link from "next/link";
import { CAPABILITIES } from "@/data/content";
import { ArrowRight, Chevron, LINE_ICONS } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

type Item = (typeof CAPABILITIES.items)[number];

/**
 * One capability card. The whole card is the link target (title, description and the four
 * sub-capabilities sit inside a single anchor); the "Explore" row in the lower-left is the
 * visible affordance that says so.
 */
export function CapabilityCard({ c, index = 0 }: { c: Item; index?: number }) {
  const Icon = LINE_ICONS[c.icon];
  const titleId = `cap-${c.href.split("/").pop()}`;
  return (
    <Reveal as="li" delay={(index % 3) * 0.08} className="group">
      <Link
        href={c.href}
        aria-labelledby={titleId}
        className="flex h-full flex-col rounded-[10px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-7"
      >
        <span className="grid size-12 place-items-center rounded-full border border-brand/40 text-brand transition-transform duration-300 group-hover:scale-105">
          <Icon className="size-[22px]" />
        </span>
        <h3 id={titleId} className="mt-6 text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">{c.title}</h3>
        <p className="mt-3 text-base leading-[1.6] text-ink-soft lg:text-[15px]">{c.body}</p>

        <ul className="mt-6 border-t border-line pt-2">
          {c.points.map((p) => (
            <li key={p} className="flex items-center gap-3 border-b border-dashed border-line py-3 text-base text-ink last:border-b-0 lg:text-[15px]">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
              {p}
            </li>
          ))}
        </ul>

        <span className="mt-auto flex items-center gap-2 pt-6 text-[15px] font-medium text-[#007a96] transition-colors group-hover:text-brand-600">
          Explore this capability
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

/**
 * "Capabilities we build and run": six practice areas as cards.
 * 3 × 2 on desktop (six across would leave ~190px per card, too narrow for four
 * items), 2 across on tablet, one full-width column on phones.
 * Bottom padding leaves room for the pixel skyline of the dark section below.
 */
export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative bg-white pb-24 pt-2 lg:pb-36 lg:pt-0 xl:pb-44"
    >
      <div className="container-page">
        {/* hairline marks the hand-off from the journey above to the service catalogue */}
        <div aria-hidden className="mb-14 flex items-center gap-4 lg:mb-20 lg:gap-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brand/30 to-brand/60" />
          <span className="relative grid size-11 place-items-center rounded-full border border-brand/40 bg-white shadow-[0_0_0_6px_rgb(0_180_216/0.08)]">
            <Chevron className="size-4 text-brand" />
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-brand/30 to-brand/60" />
        </div>
        <Reveal className="mx-auto max-w-[760px] text-center">
          <p className="eyebrow text-ink-soft">{CAPABILITIES.eyebrow}</p>
          <h2 id="capabilities-title" className="h-section mt-4">{CAPABILITIES.title}</h2>
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-[1.65] text-ink-soft">{CAPABILITIES.body}</p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {CAPABILITIES.items.map((c, i) => (
            <CapabilityCard key={c.title} c={c} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
