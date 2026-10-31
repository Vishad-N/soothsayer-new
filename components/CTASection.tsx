import { CTA } from "@/data/content";
import { KeycapButton } from "./ui/KeycapButton";
import { HelixField } from "./ui/HelixField";
import { PixelEdge } from "./ui/PixelEdge";
import { Reveal } from "./ui/Reveal";

/** "Let's Talk" panel: horizon glow with a slow-drifting glyph helix. */
export function CTASection() {
  return (
    <section aria-labelledby="cta-title" className="relative bg-coal px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
      <PixelEdge color="var(--color-coal)" />
      <Reveal data-helix-host className="relative isolate mx-auto max-w-[1240px] overflow-hidden rounded-[12px] border border-white/5 bg-[#071419] px-6 py-16 text-center text-white sm:py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 -z-10">
          {/* horizon glow */}
          <div className="absolute -bottom-[75%] left-1/2 h-[120%] w-[150%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#4cc3e6_0%,#17607b_40%,transparent_100%)] opacity-80" />
          {/* drifting helix: dimmed behind the copy so the headline stays the focus */}
          <HelixField className="absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_70%_75%_at_50%_50%,rgba(0,0,0,0.28)_0%,#000_78%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_48%,rgba(7,20,25,0.72)_0%,transparent_100%)]" />
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1.5 text-[13px] font-medium text-ink">
          <span className="size-2 rounded-full bg-brand" />
          {CTA.pill}
        </span>
        <h2 id="cta-title" className="h-section mx-auto mt-5 max-w-[640px]">{CTA.title}</h2>
        <p className="mx-auto mt-5 max-w-[640px] text-[15px] leading-[1.65] text-white/80">{CTA.body}</p>
        <KeycapButton href={CTA.cta.href} className="mt-9">{CTA.cta.label}</KeycapButton>
      </Reveal>
    </section>
  );
}
