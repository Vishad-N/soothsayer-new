import type { Metadata } from "next";
import { PageShell } from "@/components/page/PageShell";
import { JourneyPath } from "@/components/illustrations/JourneyPath";
import { LINKS } from "@/data/links";
import { LinkButton } from "@/components/ui/Button";
import { Tabs } from "@/components/page/Client";
import { ContactBand, GlobalPresence, Heading, PageHero, Paras, Section, WF_BASE } from "@/components/page/Shared";

const TITLE = "Responsible AI Solutions for Ethical & Transparent Systems";
const DESC =
  "Build ethical, transparent, and trustworthy AI with Soothsayer Analytics. Our Responsible AI approach ensures governance, oversight, and long-term success.";
const OG = `${WF_BASE}68a585aad53916f731b9c87a_Soothsayer%20Open%20Graph%20Image.jpg`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/responsible-ai" },
  openGraph: { title: TITLE, description: DESC, url: "/responsible-ai", images: [OG] },
  twitter: { title: TITLE, description: DESC, images: [OG] },
};

const VIDEO = (id: string) => `https://video.wixstatic.com/video/${id}/1080p/mp4/file.mp4`;
const BANNER = `${WF_BASE}686fa65073c73c3cd80b029c_file%20%283%29-transcode.mp4`;

/** The live page repeats this one passage in all four tabs; kept as published. */
const TAB_BODY = (
  <div className="max-w-3xl">
    <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">Speed must not replace design.</h3>
    <p className="mt-4 text-lg leading-relaxed text-white/80">
      Many organizations prioritize rapid deployment over thoughtful architecture. The result is fragile prototypes masquerading as finished systems. Responsible AI requires the same discipline as physical engineering: upfront planning, iterative validation, and lifecycle accountability.
    </p>
  </div>
);

const TABS = ["Human Oversight", "Thoughtful Design", "AI Governance", "Resource Efficiency"].map((label) => ({ label, content: TAB_BODY }));

function Video({ src }: { src: string }) {
  return (
    <video className="aspect-video w-full rounded-xl bg-ink object-cover" autoPlay muted loop playsInline preload="none" aria-hidden>
      <source src={src} type="video/mp4" />
    </video>
  );
}

const ReadMoreLink = () => <LinkButton href={LINKS.contact} variant="outline-light" className="mt-6">Read More</LinkButton>;

export default function ResponsibleAIPage() {
  return (
    <PageShell>
      <PageHero
        art={<JourneyPath variant="trust" className="w-full" />}
        title={<>Reliable by Design.<br />Responsible by Default.</>}
        sub="Turn AI risk into resilience with systems that explain, adapt, and perform."
        video={BANNER}
      />

      <Section>
        <Heading>Ensuring Integrity, Efficiency, and Long-Term Value in Enterprise AI</Heading>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${WF_BASE}686f940cd25a8523da84e4e1_Group%201321314844.jpg`} alt="" loading="lazy" className="w-full rounded-xl" />
          <div className="text-ink-soft">
            <Paras>{[
              "As Artificial Intelligence advances from innovation to infrastructure, the consequences of its deployment – technical, ethical, environmental – are too significant to ignore. Responsible AI is no longer a theoretical ideal; it is an operational imperative. For enterprises, it represents the difference between short-term automation & sustainable transformation.",
              "Soothsayer Analytics enables organizations to operationalize Responsible AI through the strategic development of internal capabilities. We go beyond point solutions to embed the practices, structures, and thinking necessary for AI to succeed at enterprise scale.",
            ]}</Paras>
            <ReadMoreLink />
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Video src={VIDEO("53d759_a44cd6d4e1a34ea6a07949c89b1bbb07")} />
          <div className="text-ink-soft">
            <h2 className="h-section text-ink">A Business-Critical Approach to Responsibility</h2>
            <Paras className="mt-6">{[
              "Responsible AI refers to the principled design, implementation, and governance of AI systems to ensure they operate reliably, equitably, and transparently in live business environments. It is about more than regulatory compliance or algorithmic accuracy. It is about ensuring systems reflect human values, manage risk, and align with institutional goals across time.",
              "For enterprises, this means designing AI that is explainable to regulators, interpretable by users, resilient under changing conditions, and efficient across cost & energy use. The reputational, legal, and financial stakes demand no less.",
            ]}</Paras>
            <ReadMoreLink />
          </div>
        </div>
      </Section>

      <Section>
        <Heading sub="Soothsayer’s Strategic Role">Capability Over Compliance</Heading>
        <div className="mt-6 max-w-3xl text-ink-soft">
          <Paras>{[
            "Soothsayer is not a vendor of tools. We are a partner in enterprise transformation. Our focus is on equipping internal teams with the structures and mindsets to scale AI responsibly & sustainably across departments, use cases, and time.",
            "We help enterprises move beyond experimentation and toward maturity. Through embedded advisory, co-creation, and capacity building, we ensure that Responsible AI is not a checklist, but an operating model.",
          ]}</Paras>
          <ReadMoreLink />
        </div>
      </Section>

      <Section tone="dark">
        <Tabs tabs={TABS} initial={1} dark />
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-ink-soft">
            <h2 className="h-section text-ink">Responsibility as a Strategic Capability</h2>
            <Paras className="mt-6">{[
              "In a competitive, regulated, and interconnected world, Responsible AI is not a luxury. It is a source of resilience. Systems built without transparency or foresight break under scrutiny, strain budgets, and undermine trust. In contrast, systems designed responsibly earn adoption, adapt to change, and generate lasting value.",
              "Soothsayer equips organizations with the frameworks, tools, and internal fluency to lead responsibly – not just deploy rapidly.",
            ]}</Paras>
            <ReadMoreLink />
          </div>
          <Video src={VIDEO("53d759_e3ef32f725f341fc9f5618ac23ab7cdb")} />
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Video src={VIDEO("53d759_20c83685cc3745c2bea7ec3836421422")} />
          <div className="text-ink-soft">
            <h2 className="h-section text-ink">Lead with Intelligence & Integrity</h2>
            <Paras className="mt-6">{[
              "Responsible AI is not about restricting innovation. It is about enabling it safely, strategically, and sustainably.",
              "If your organization is ready to build intelligent systems that perform, endure, and align with your values, Soothsayer is ready to help.",
            ]}</Paras>
            <p className="mt-6 text-xl font-medium text-brand-600">Contact us to begin a conversation</p>
            <ReadMoreLink />
          </div>
        </div>
      </Section>

      <GlobalPresence
        title="Our global presence"
        paras={["Soothsayer Analytics has a global presence, providing advanced Data Science & AI solutions to Fortune 1000 & Global 2000 companies in over a dozen countries."]}
      />
      <ContactBand title="Schedule a consultation" />
    </PageShell>
  );
}
