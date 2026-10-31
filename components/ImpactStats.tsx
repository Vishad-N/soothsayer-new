import { STATS } from "@/data/content";
import { CountUp } from "./ui/CountUp";
import { Reveal } from "./ui/Reveal";

/** Small "+" crosshair drawn at grid intersections. */
const Cross = ({ className }: { className: string }) => (
  <svg aria-hidden viewBox="0 0 11 11" className={`absolute size-[11px] text-white/40 ${className}`}>
    <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" />
  </svg>
);

/** "Results that survive scrutiny" stat grid on the dark band. */
export function ImpactStats() {
  return (
    <section aria-labelledby="stats-title" className="bg-deep py-20 text-white lg:pb-36 lg:pt-28 xl:pb-44">
      <div className="container-page">
        <Reveal>
          <h2 id="stats-title" className="h-section text-center">{STATS.title}</h2>
        </Reveal>

        <ul className="mt-12 grid border-t border-white/10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {STATS.items.map((s, i) => (
            <Reveal
              as="li"
              key={s.label}
              delay={i * 0.08}
              className="relative flex min-h-[230px] flex-col justify-between border-b border-r border-white/10 px-6 py-8 first:border-l sm:min-h-[360px] sm:[&:nth-child(3)]:border-l lg:[&:nth-child(3)]:border-l-0"
            >
              <Cross className="-left-[6px] -top-[6px]" />
              <Cross className="-right-[6px] -top-[6px]" />
              <Cross className="-bottom-[6px] -left-[6px]" />
              <Cross className="-bottom-[6px] -right-[6px]" />
              <CountUp
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="font-display text-[52px] font-semibold leading-none tracking-[-0.025em] sm:text-[56px] lg:text-[64px]"
              />
              <p className="border-t border-white/15 pt-5 text-[17px] leading-[1.55] text-white/85 lg:min-h-[100px]">{s.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
