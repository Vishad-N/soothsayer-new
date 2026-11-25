import { STATS } from "@/data/content";
import { CountUp } from "./ui/CountUp";
import { Reveal } from "./ui/Reveal";

/** "Results that survive scrutiny" stat grid on the dark band. */
export function ImpactStats() {
  return (
    <section aria-labelledby="stats-title" className="bg-deep py-20 text-white lg:pb-36 lg:pt-28 xl:pb-44">
      <div className="container-page">
        <Reveal>
          <h2 id="stats-title" className="h-section text-center">{STATS.title}</h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {STATS.items.map((s, i) => (
            <Reveal
              as="li"
              key={s.label}
              delay={i * 0.08}
              className="group relative flex min-h-[220px] flex-col justify-between gap-10 overflow-hidden rounded-[14px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] px-6 pb-7 pt-8 transition duration-300 hover:-translate-y-1 hover:border-brand/40 sm:min-h-[300px]"
            >
              <span aria-hidden className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/70 to-transparent" />
              <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-brand/15 blur-3xl transition-opacity duration-300 group-hover:opacity-100 lg:opacity-70" />
              <CountUp
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="relative font-display text-[52px] font-semibold leading-none tracking-[-0.025em] sm:text-[56px] lg:text-[60px]"
              />
              <p className="relative border-t border-white/15 pt-5 text-[17px] leading-[1.55] text-white/85 lg:min-h-[100px]">{s.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
