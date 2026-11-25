import type { Metadata } from "next";
import { PageShell } from "@/components/page/PageShell";
import { CompetencyScene } from "@/components/illustrations/CompetencyScene";
import { LINKS } from "@/data/links";
import { Lottie, ReadMore } from "@/components/page/Client";
import { ContactBand, Cta, GlobalPresence, Heading, PageHero, Paras, Section, WF_BASE } from "@/components/page/Shared";

const TITLE = "Digital Competency & AI Readiness for Enterprise Growth";
const DESC =
  "Transform your organization with Soothsayer’s digital competency framework with AI strategy, skills, and culture for sustainable growth. Contact Now";
const OG = `${WF_BASE}68c7b84e497f18f5501f3ae0_Digital-Competency.jpg`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/digital-competency" },
  openGraph: { title: TITLE, description: DESC, url: "/digital-competency", images: [OG] },
  twitter: { title: TITLE, description: DESC, images: [OG] },
};

const LOTTIE = {
  approachH: `${WF_BASE}6846a1817dbf9e1d9d0829e9_Our%20Approach%20-%20Horizontal_v2.lottie`,
  approachV: `${WF_BASE}6846a19c7078cf845a74087c_Our%20Approach%20-%20Vertical_v2.lottie`,
  self: `${WF_BASE}68469e43a4127af06ce19df5_Self%20Reliance_v2.lottie`,
};

const HERO_VIDEO = `${WF_BASE}68389ca9adba036750c448db_background-circle-light-technology-transcode.mp4`;
const HERO_POSTER = `${WF_BASE}68389ca9adba036750c448db_background-circle-light-technology-poster-00001.jpg`;

/** Small label that introduces the animated lists (their text lives inside the animation artwork). */
function ListLabel({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-3 rounded-full border border-brand/30 bg-brand-50 px-5 py-2 text-[15px] font-semibold text-ink">
      <span aria-hidden className="size-2 rounded-full bg-brand" />
      {children}
    </p>
  );
}

export default function DigitalCompetencyPage() {
  return (
    <PageShell>
      <PageHero
        art={<CompetencyScene className="w-full" />}
        split
        cta={{ label: "Contact Us", href: LINKS.contact }}
        title={<>They Build the Deck.<br />We Build Your Capability.</>}
        sub="Beyond Advisory: Sustain, Scale, and Lead in AI & Digital Competency"
        video={HERO_VIDEO}
        poster={HERO_POSTER}
      />

      <Section id="competency-matters" edge beforeDark>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Heading index="01" sub="From Experimentation to Institutional Strength">Competency Matters</Heading>
          <div className="text-ink-soft">
            <Paras lead>{[
              "Artificial Intelligence has reached the enterprise. What separates leaders from laggards is no longer access to tools. It is the capacity to translate those tools into durable advantage.",
              "Soothsayer helps organizations build AI & Digital competency: the internal muscle to think strategically, act intelligently, and evolve continuously.",
            ]}</Paras>
            <div className="mt-6 rounded-[14px] border border-line bg-mist/60 p-6 sm:p-7">
              <ReadMore>
                <Paras className="text-[16px]">{[
                  "This is not about AI or automation for its own sake. It is about constructing the frameworks, capabilities, and governance that allow organizations to lead with clarity in a rapidly transforming digital economy. Soothsayer is the builder of institutional capability that embeds data-driven intelligence into the core of your operations, workforce, and strategic decision-making.",
                  "AI & Digital competency is the ability of an enterprise to identify, integrate, govern, and scale digital technologies in alignment with its core objectives. Without this competency, AI initiatives stall at the proof-of-concept stage and remain disconnected from business value. With it, AI becomes a leapfrog operationally, culturally, and strategically.",
                ]}</Paras>
                <p className="border-l-4 border-brand pl-5 font-display text-2xl font-semibold leading-snug text-ink">Competency is what makes transformation permanent.</p>
              </ReadMore>
            </div>
            <div className="mt-8"><span className="block [&>a]:h-auto [&>a]:min-h-11 [&>a]:whitespace-normal! [&>a]:py-2.5 [&>a]:text-left"><Cta href={LINKS.contact}>Start Building the Right Foundation</Cta></span></div>
          </div>
        </div>
      </Section>

      <Section tone="dark" edge>
        <div className="relative mx-auto max-w-3xl text-center">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[110px]" /></div>
          <h2 className="h-section relative">Build Lasting Competency</h2>
          <p className="relative mt-7 text-lg leading-[1.75] text-white/80 sm:text-xl">Digital Transformation is not a product. It is a capability that requires discipline &amp; alignment, not siloed improvisation. Above all, it requires the commitment to build systems that endure long after the pilot ends.</p>
          <p className="relative mt-6 font-display text-2xl font-semibold leading-snug text-white sm:text-[28px]">Soothsayer Analytics exists to build that foundation.</p>
          <ul className="relative mt-8 flex flex-wrap justify-center gap-3">
            {["Permanently.", "Strategically.", "Without compromise."].map((w) => (
              <li key={w} className="rounded-full border border-brand-300/30 bg-brand-300/10 px-5 py-2 text-base font-medium text-brand-100">{w}</li>
            ))}
          </ul>
          <div className="relative mt-10"><Cta href={LINKS.contact} dark>Contact Us</Cta></div>
        </div>
      </Section>

      <Section tone="mist" id="our-approach" edge>
        <Heading index="02" sub="Architecting Enduring Capability">Our Approach</Heading>
        <div className="mt-8 max-w-3xl text-ink-soft">
          <Paras lead>{["Every engagement with Soothsayer is designed to build internal strength. Our work transforms isolated digital efforts into a coherent, future-ready operating model."]}</Paras>
          <div className="mt-6"><ListLabel>Here is how we do it:</ListLabel></div>
        </div>
        <div id="the-framework" className="mt-8 overflow-hidden rounded-[16px] border border-line bg-white p-4 shadow-lift sm:p-8">
          <Lottie src={LOTTIE.approachH} ratio={1290 / 375} className="hidden lg:block" />
          <Lottie src={LOTTIE.approachV} ratio={279 / 555} className="mx-auto max-w-[300px] sm:max-w-[380px] lg:hidden" />
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="rounded-[14px] border border-line bg-white p-6 text-ink-soft shadow-card sm:p-7">
            <ReadMore label="Explore How We Can Help">
              <Paras className="text-[16px]">{[
                "We recognize that many organizations struggle to translate the promise of AI into durable results. Data remains trapped in silos. Initiatives often fragment across business units. Trust in AI outputs is low. Skills gaps and change resistance slow progress. Leadership may lack a unified mandate or clear roadmap. These are not technical obstacles; they are organizational.",
                "Soothsayer addresses these challenges through structured transformation. We help organizations move beyond experimentation and into institutional strength.",
                "Our focus is lasting capability, not short-term delivery. With Soothsayer, AI becomes more than a toolset. It becomes part of how your organization thinks, decides, and evolves.",
              ]}</Paras>
            </ReadMore>
          </div>
          <div className="lg:pt-2"><span className="block [&>a]:h-auto [&>a]:min-h-11 [&>a]:whitespace-normal! [&>a]:py-2.5 [&>a]:text-left"><Cta href={LINKS.contact}>Discover How We Drive Real Transformation</Cta></span></div>
        </div>
      </Section>

      <Section id="building-self-reliance">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading index="03" sub="Building Competency, Not Dependence">Building Self-Reliance Since 2014</Heading>
            <div className="mt-8 text-ink-soft">
              <Paras lead>{[
                "Soothsayer’s mission is to leave your organization stronger, not reliant. We hand over not just solutions, but the capability to grow and lead independently. Our work ends when your momentum does not.",
              ]}</Paras>
              <Paras className="mt-5">{["We focus on internal enablement from day one."]}</Paras>
              <div className="mt-6"><ListLabel>This includes:</ListLabel></div>
            </div>
          </div>
          <div className="rounded-[16px] border border-line bg-white p-4 shadow-lift sm:p-8">
            <Lottie src={LOTTIE.self} ratio={729 / 678} className="mx-auto max-w-[560px]" />
          </div>
        </div>
      </Section>

      <GlobalPresence
        title="Our Global Presence"
        paras={[
          "Soothsayer delivers advanced Digital & Data Science solutions to Fortune 1000, Global 2000, and Mid-Market enterprises.",
          "Our track record includes 100s of successful AI implementations & strategic engagements as well as 10,000+ professionals trained (from the C-suite to Citizen Data Scientists) in over a dozen countries.",
        ]}
      />
      <ContactBand title="Build the AI & Digital Competency Your Organization Deserves" />
    </PageShell>
  );
}
