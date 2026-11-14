import type { Metadata } from "next";
import { PageShell } from "@/components/page/PageShell";
import { CompetencyScene } from "@/components/illustrations/CompetencyScene";
import { LINKS } from "@/data/links";
import { LinkButton } from "@/components/ui/Button";
import { Lottie, ReadMore } from "@/components/page/Client";
import { ContactBand, GlobalPresence, Heading, PageHero, Paras, Section, WF_BASE } from "@/components/page/Shared";

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

export default function DigitalCompetencyPage() {
  return (
    <PageShell>
      <PageHero
        art={<CompetencyScene className="w-full" />}
        eyebrow="Effective Money Management"
        title={<>They Build the Deck.<br />We Build Your Capability.</>}
        sub="Beyond Advisory: Sustain, Scale, and Lead in AI & Digital Competency"
        video={HERO_VIDEO}
        poster={HERO_POSTER}
      />

      <Section id="competency-matters">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Heading sub="From Experimentation to Institutional Strength">Competency Matters</Heading>
          <div className="text-ink-soft">
            <Paras>{[
              "Artificial Intelligence has reached the enterprise. What separates leaders from laggards is no longer access to tools. It is the capacity to translate those tools into durable advantage.",
              "Soothsayer helps organizations build AI & Digital competency: the internal muscle to think strategically, act intelligently, and evolve continuously.",
            ]}</Paras>
            <ReadMore>
              <Paras>{[
                "This is not about AI or automation for its own sake. It is about constructing the frameworks, capabilities, and governance that allow organizations to lead with clarity in a rapidly transforming digital economy. Soothsayer is the builder of institutional capability that embeds data-driven intelligence into the core of your operations, workforce, and strategic decision-making.",
                "AI & Digital competency is the ability of an enterprise to identify, integrate, govern, and scale digital technologies in alignment with its core objectives. Without this competency, AI initiatives stall at the proof-of-concept stage and remain disconnected from business value. With it, AI becomes a leapfrog operationally, culturally, and strategically.",
                "Competency is what makes transformation permanent.",
              ]}</Paras>
            </ReadMore>
            <p className="mt-6"><a href={LINKS.contact} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 underline-offset-4 hover:underline">Start Building the Right Foundation</a></p>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="h-section">Build Lasting Competency</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">Digital Transformation is not a product. It is a capability that requires discipline & alignment, not siloed improvisation. Above all, it requires the commitment to build systems that endure long after the pilot ends. Soothsayer Analytics exists to build that foundation. Permanently. Strategically. Without compromise.</p>
          <div className="mt-8"><LinkButton href={LINKS.contact}>Contact Us</LinkButton></div>
        </div>
      </Section>

      <Section id="our-approach">
        <Heading sub="Architecting Enduring Capability">Our Approach</Heading>
        <Paras className="mt-6 max-w-3xl text-ink-soft">{[
          "Every engagement with Soothsayer is designed to build internal strength. Our work transforms isolated digital efforts into a coherent, future-ready operating model.",
          "Here is how we do it:",
        ]}</Paras>
        <div id="the-framework" className="mt-10">
          <Lottie src={LOTTIE.approachH} ratio={1290 / 375} className="hidden md:block" />
          <Lottie src={LOTTIE.approachV} ratio={279 / 555} className="mx-auto max-w-[300px] md:hidden" />
        </div>
        <div className="mt-10 text-ink-soft">
          <ReadMore label="Explore How We Can Help">
            <Paras>{[
              "We recognize that many organizations struggle to translate the promise of AI into durable results. Data remains trapped in silos. Initiatives often fragment across business units. Trust in AI outputs is low. Skills gaps and change resistance slow progress. Leadership may lack a unified mandate or clear roadmap. These are not technical obstacles; they are organizational.",
              "Soothsayer addresses these challenges through structured transformation. We help organizations move beyond experimentation and into institutional strength.",
              "Our focus is lasting capability, not short-term delivery. With Soothsayer, AI becomes more than a toolset. It becomes part of how your organization thinks, decides, and evolves.",
            ]}</Paras>
          </ReadMore>
          <p className="mt-6"><a href={LINKS.contact} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 underline-offset-4 hover:underline">Discover How We Drive Real Transformation</a></p>
        </div>
      </Section>

      <Section tone="mist" id="building-self-reliance">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading sub="Building Competency, Not Dependence">Building Self-Reliance Since 2014</Heading>
            <Paras className="mt-6 text-ink-soft">{[
              "Soothsayer’s mission is to leave your organization stronger, not reliant. We hand over not just solutions, but the capability to grow and lead independently. Our work ends when your momentum does not.",
              "We focus on internal enablement from day one.",
              "This includes:",
            ]}</Paras>
          </div>
          <Lottie src={LOTTIE.self} ratio={729 / 678} className="mx-auto max-w-[560px]" />
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
