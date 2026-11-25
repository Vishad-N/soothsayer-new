import type { Metadata } from "next";
import { CapabilityCard } from "@/components/Capabilities";
import { PageShell } from "@/components/page/PageShell";
import { ContactBand, PageHero, Section } from "@/components/page/Shared";
import { CAPABILITIES } from "@/data/content";
import { LINKS } from "@/data/links";

const TITLE = "AI Capabilities We Build and Run | Soothsayer Analytics";
const DESC =
  "Strategy, data foundations, generative AI, agentic systems, production reliability and governance: six capabilities, combined to fit the problem.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/capabilities" },
  openGraph: { title: TITLE, description: DESC, url: "/capabilities" },
  twitter: { title: TITLE, description: DESC },
};

export default function CapabilitiesHubPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={CAPABILITIES.eyebrow}
        title={CAPABILITIES.title}
        sub={CAPABILITIES.body}
        cta={{ label: "Talk to an engineer", href: LINKS.contact }}
      />
      <Section edge beforeDark reveal={false}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CAPABILITIES.items.map((c, i) => (
            <CapabilityCard key={c.title} c={c} index={i} />
          ))}
        </ul>
      </Section>
      <ContactBand title="Tell us the problem and we will point you to the right capability." />
    </PageShell>
  );
}
