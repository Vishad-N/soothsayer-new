import type { Metadata } from "next";
import { PageShell } from "@/components/page/PageShell";
import { JourneyPath } from "@/components/illustrations/JourneyPath";
import { LINKS } from "@/data/links";
import { PillarTabs } from "@/components/page/Client";
import { ContactBand, Cta, GlobalPresence, Glyph, Heading, IconChip, PageHero, Paras, Section, WF_BASE } from "@/components/page/Shared";

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

/** Framed, softly lit video used beside copy. */
function Video({ src }: { src: string }) {
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-4 rounded-[28px] bg-brand/15 blur-2xl" />
      <div className="relative rounded-[16px] border border-line bg-white p-2 shadow-lift">
        <video className="aspect-video w-full rounded-[10px] bg-[linear-gradient(135deg,#0d2530,#0e5262)] object-cover" autoPlay muted loop playsInline preload="metadata" aria-hidden>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

const PILLARS = [
  { label: "Human Oversight", icon: <Glyph name="person" /> },
  { label: "Thoughtful Design", icon: <Glyph name="pencil" /> },
  { label: "AI Governance", icon: <Glyph name="shield" /> },
  { label: "Resource Efficiency", icon: <Glyph name="leaf" /> },
];

const PILLAR_COPY = [
  {
    title: "People stay accountable for what AI decides.",
    body: "Models inform decisions; they do not own them. Responsible systems keep a person in the loop wherever outcomes affect customers, employees or compliance, with clear escalation paths and the context needed to challenge a result.",
  },
  {
    title: "Speed must not replace design.",
    body: "Many organizations prioritize rapid deployment over thoughtful architecture. The result is fragile prototypes masquerading as finished systems. Responsible AI requires the same discipline as physical engineering: upfront planning, iterative validation, and lifecycle accountability.",
  },
  {
    title: "Governance is an operating model, not a checklist.",
    body: "Clear ownership, documented decisions, monitoring and audit trails make AI explainable to regulators and interpretable by users. Governance that is built in from the first use case scales with every system that follows.",
  },
  {
    title: "Efficient AI is sustainable AI.",
    body: "Cost and energy use are design constraints, not afterthoughts. Right-sizing models, reusing components and measuring consumption keeps systems affordable to run and responsible in their footprint over time.",
  },
];

const PILLAR_PANELS = PILLAR_COPY.map((p) => (
  <div key={p.title}>
    <h3 className="font-display text-[28px] font-semibold leading-tight text-white sm:text-4xl lg:text-[42px]">{p.title}</h3>
    <p className="mt-5 max-w-3xl text-lg leading-[1.75] text-white/80 sm:text-xl">{p.body}</p>
  </div>
));
export default function ResponsibleAIPage() {
  return (
    <PageShell>
      <PageHero
        art={<JourneyPath variant="trust" className="w-full" />}
        title={<>Reliable by Design.<br />Responsible by Default.</>}
        sub="Turn AI risk into resilience with systems that explain, adapt, and perform."
        cta={{ label: "Talk to Our Team", href: LINKS.contact }}
        video={BANNER}
      />

      {/* 01 — Integrity */}
      <Section edge>
        <Heading index="01" className="max-w-4xl">Ensuring Integrity, Efficiency, and Long-Term Value in Enterprise AI</Heading>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="relative">
            <div aria-hidden className="absolute -inset-4 rounded-[28px] bg-brand/10 blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${WF_BASE}686f940cd25a8523da84e4e1_Group%201321314844.jpg`} alt="" loading="lazy" className="relative w-full rounded-[16px] border border-line shadow-lift" />
          </div>
          <div className="text-ink-soft">
            <Paras lead>{[
              "As Artificial Intelligence advances from innovation to infrastructure, the consequences of its deployment – technical, ethical, environmental – are too significant to ignore. Responsible AI is no longer a theoretical ideal; it is an operational imperative. For enterprises, it represents the difference between short-term automation & sustainable transformation.",
            ]}</Paras>
            <div className="mt-6 border-l-4 border-brand/60 pl-5">
              <Paras>{[
                "Soothsayer Analytics enables organizations to operationalize Responsible AI through the strategic development of internal capabilities. We go beyond point solutions to embed the practices, structures, and thinking necessary for AI to succeed at enterprise scale.",
              ]}</Paras>
            </div>
            <div className="mt-8"><Cta href={LINKS.contact}>Talk to Our Team</Cta></div>
          </div>
        </div>
      </Section>

      {/* 02 — Business-critical */}
      <Section tone="mist">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Video src={VIDEO("53d759_a44cd6d4e1a34ea6a07949c89b1bbb07")} />
          <div className="text-ink-soft">
            <Heading index="02">A Business-Critical Approach to Responsibility</Heading>
            <div className="mt-8 space-y-4">
              <div className="rounded-[14px] border border-line bg-white p-6 shadow-card">
                <Paras className="text-[16px]">{["Responsible AI refers to the principled design, implementation, and governance of AI systems to ensure they operate reliably, equitably, and transparently in live business environments. It is about more than regulatory compliance or algorithmic accuracy. It is about ensuring systems reflect human values, manage risk, and align with institutional goals across time."]}</Paras>
              </div>
              <div className="rounded-[14px] border border-brand/25 bg-brand-50 p-6">
                <Paras className="text-[16px] text-ink">{["For enterprises, this means designing AI that is explainable to regulators, interpretable by users, resilient under changing conditions, and efficient across cost & energy use. The reputational, legal, and financial stakes demand no less."]}</Paras>
              </div>
            </div>
            <div className="mt-8"><Cta href={LINKS.contact}>Discuss Your AI Governance</Cta></div>
          </div>
        </div>
      </Section>

      {/* 03 — Capability over compliance */}
      <Section beforeDark>
        <Heading index="03" sub="Soothsayer’s Strategic Role">Capability Over Compliance</Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[16px] border border-line bg-white p-7 shadow-card sm:p-8">
            <IconChip name="compass" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink">A partner, not a vendor</h3>
            <Paras className="mt-3 text-ink-soft">{["Soothsayer is not a vendor of tools. We are a partner in enterprise transformation. Our focus is on equipping internal teams with the structures and mindsets to scale AI responsibly & sustainably across departments, use cases, and time."]}</Paras>
          </div>
          <div className="rounded-[16px] border border-line bg-white p-7 shadow-card sm:p-8">
            <IconChip name="users" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink">From experiment to maturity</h3>
            <Paras className="mt-3 text-ink-soft">{["We help enterprises move beyond experimentation and toward maturity. Through embedded advisory, co-creation, and capacity building, we ensure that Responsible AI is not a checklist, but an operating model."]}</Paras>
          </div>
        </div>
        <div className="mt-8"><Cta href={LINKS.contact}>Build Your Operating Model</Cta></div>
      </Section>

      {/* Pillars */}
      <Section tone="dark" edge beforeDark>
        <PillarTabs items={PILLARS} panels={PILLAR_PANELS} />
      </Section>

      {/* 04 — Strategic capability */}
      <Section edge>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-ink-soft">
            <Heading index="04">Responsibility as a Strategic Capability</Heading>
            <div className="mt-8">
              <Paras lead>{["In a competitive, regulated, and interconnected world, Responsible AI is not a luxury. It is a source of resilience. Systems built without transparency or foresight break under scrutiny, strain budgets, and undermine trust. In contrast, systems designed responsibly earn adoption, adapt to change, and generate lasting value."]}</Paras>
              <p className="mt-6 border-l-4 border-brand pl-5 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">Soothsayer equips organizations with the frameworks, tools, and internal fluency to lead responsibly – not just deploy rapidly.</p>
            </div>
            <div className="mt-8"><Cta href={LINKS.contact}>Explore Responsible AI With Us</Cta></div>
          </div>
          <Video src={VIDEO("53d759_e3ef32f725f341fc9f5618ac23ab7cdb")} />
        </div>
      </Section>

      {/* 05 — Lead */}
      <Section tone="mist">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Video src={VIDEO("53d759_20c83685cc3745c2bea7ec3836421422")} />
          <div className="text-ink-soft">
            <Heading index="05">Lead with Intelligence & Integrity</Heading>
            <div className="mt-8">
              <Paras lead>{["Responsible AI is not about restricting innovation. It is about enabling it safely, strategically, and sustainably."]}</Paras>
              <Paras className="mt-5">{["If your organization is ready to build intelligent systems that perform, endure, and align with your values, Soothsayer is ready to help."]}</Paras>
            </div>
            <div className="mt-8 flex flex-col items-start gap-4 rounded-[14px] border border-brand/25 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-xl font-semibold text-ink">Contact us to begin a conversation</p>
              <Cta href={LINKS.contact}>Start the Conversation</Cta>
            </div>
          </div>
        </div>
      </Section>

      <GlobalPresence
        tone="light"
        title="Our global presence"
        paras={["Soothsayer Analytics has a global presence, providing advanced Data Science & AI solutions to Fortune 1000 & Global 2000 companies in over a dozen countries."]}
      />
      <ContactBand title="Schedule a consultation" />
    </PageShell>
  );
}
