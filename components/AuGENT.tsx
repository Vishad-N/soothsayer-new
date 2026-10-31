import Image from "next/image";
import { AUGENT } from "@/data/content";
import { IMAGES } from "@/data/images";
import { KeycapButton } from "./ui/KeycapButton";
import { Reveal } from "./ui/Reveal";
import { AugentPlatform } from "./illustrations/AugentPlatform";

/** "Meet AuGENT" product feature on the teal band. */
export function AuGENT() {
  return (
    <section
      id="augent"
      aria-labelledby="augent-title"
      className="relative isolate overflow-hidden bg-teal-night text-white"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(75%_110%_at_78%_30%,#1f6d7b_0%,#10414c_42%,#071f26_100%)]" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#061a1f] to-transparent" />
      </div>

      <div className="container-page flex flex-col gap-8 py-16 lg:static lg:min-h-[646px] lg:justify-center lg:py-0">
        <Reveal className="relative z-10 max-w-[600px]">
          <p className="font-display text-[30px] font-semibold uppercase leading-none tracking-[0.04em] lg:text-[38px]">{AUGENT.kicker}</p>
          <h2 id="augent-title" className="mt-3">
            <Image
              src={IMAGES.augentLogo}
              alt="AuGENT — Guided Evolution of Neural Transformation"
              width={420}
              height={97}
              unoptimized
              className="h-auto w-[300px] sm:w-[420px]"
            />
          </h2>
          <p className="mt-6 inline-block rounded-[3px] bg-[linear-gradient(90deg,#b98a3e_0%,#f0d595_50%,#c99a52_100%)] px-[26px] py-[9px] font-display text-[13px] font-semibold uppercase leading-6 tracking-[-0.02em] text-[#1d1608] sm:text-[17.5px]">
            {AUGENT.badge}
          </p>
          <p className="mt-8 max-w-[560px] font-display text-[20px] font-semibold leading-[1.27] sm:text-[21px]">{AUGENT.lead}</p>
          <p className="mt-6 max-w-[570px] text-base leading-[1.6] text-white/80">{AUGENT.body}</p>
          <KeycapButton href={AUGENT.cta.href} className="mt-8 self-start">{AUGENT.cta.label}</KeycapButton>
        </Reveal>

        <div className="pointer-events-none relative -mx-4 sm:mx-0 lg:absolute lg:-right-[2.3vw] lg:top-1/2 lg:w-[56vw] lg:max-w-[1000px] lg:-translate-y-1/2">
          <Reveal delay={0.15}>
            <AugentPlatform className="h-auto w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
