import Image from "next/image";
import { CLIENT_LOGOS, type ClientLogo } from "@/data/images";

function Logo({ logo, decorative = false }: { logo: ClientLogo; decorative?: boolean }) {
  return (
    <li className="flex h-24 shrink-0 items-center px-2.5 lg:px-3"><span className="flex h-20 w-[130px] items-center justify-center rounded-[12px] border border-line/80 bg-white/80 px-4 shadow-[0_1px_2px_rgb(12_38_49/0.04)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card sm:w-[150px] lg:w-[170px]">
      {/* Source files mix white and coloured artwork; brightness(0) turns them into one dark mark. */}
      <Image
        src={logo.src}
        alt={decorative ? "" : logo.name}
        width={logo.width}
        height={logo.height}
        sizes="170px"
        className={`w-auto max-w-full object-contain transition-opacity duration-300 ${
          logo.fill ? "opacity-70 grayscale hover:opacity-100" : "opacity-60 brightness-0 hover:opacity-90"
        } ${
          logo.width < 200 ? "max-h-11" : "max-h-20"
        }`}
      />
    </span></li>
  );
}

/**
 * "Trusted By Enterprises" logo strip: one endless right-to-left loop.
 * The list is rendered twice and the track slides by exactly half its width,
 * so the second copy lands where the first began and the loop never jumps.
 * Spacing is padding on each item (not flex gap) for the same reason.
 * Hovering pauses it; the duplicate is hidden from assistive tech.
 */
export function TrustedBy() {
  return (
    <section
      id="trusted"
      aria-labelledby="trusted-title"
      className="relative overflow-hidden border-b border-line bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_45%,#e3f7fc_100%)] py-12 lg:py-14"
    >
      <h2 id="trusted-title" className="text-center font-sans text-[15px] font-medium tracking-[0.01em] text-ink-soft">
        Trusted By Enterprises
      </h2>

      <div className="group mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] lg:mt-8">
        <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
          <ul className="flex shrink-0 items-center">
            {CLIENT_LOGOS.map((l) => <Logo key={l.name} logo={l} />)}
          </ul>
          <ul aria-hidden className="flex shrink-0 items-center">
            {CLIENT_LOGOS.map((l) => <Logo key={l.name} logo={l} decorative />)}
          </ul>
        </div>
      </div>
    </section>
  );
}
