import type { Metadata } from "next";
import { FoundationArt } from "@/components/foundation/FoundationArt";
import { PageShell } from "@/components/page/PageShell";
import { Heading, Section } from "@/components/page/Shared";
import { Breadcrumb } from "@/components/services/ServicePage";
import { CornerRings } from "@/components/ui/CornerRings";
import { KeycapButton } from "@/components/ui/KeycapButton";
import { Reveal } from "@/components/ui/Reveal";

const TITLE = "Soothsayer Foundation | Soothsayer Analytics";
const DESC =
  "Soothsayer Foundation is a 501(c)(3) nonprofit based in Livonia, Michigan, supporting quality education, access to healthcare and environmental restoration.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/philanthropy" },
  openGraph: { title: TITLE, description: DESC, url: "/philanthropy" },
  twitter: { title: TITLE, description: DESC },
};

const EMAIL = "info@soothsayerfoundation.org";
const ADDRESS = "20361 Middlebelt Rd, Livonia, MI 48152";
const PHONE = "844-44-SOOTH, ext. 8";

const CAUSES = [
  {
    title: "Quality education",
    icon: <g><path d="M-13 -8c4.5-2.5 9-2 13 1 4-3 8.5-3.5 13-1v17c-4.5-2.5-9-2-13 1-4-3-8.5-3.5-13-1z" /><path d="M0 -7v17" /></g>,
  },
  {
    title: "Access to healthcare",
    icon: <path d="M0 11C-14 2-12-9-5-9c3 0 5 2 5 4.5 0-2.5 2-4.5 5-4.5 7 0 9 11-5 20z" />,
  },
  {
    title: "Environmental restoration",
    icon: <g><path d="M-10 10C-10-3-2-10 12-11 12 3 3 10-10 10z" /><path d="M-10 10L3-3" /></g>,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Soothsayer Foundation",
  email: EMAIL,
  telephone: "+1-844-447-6684",
  address: { "@type": "PostalAddress", streetAddress: "20361 Middlebelt Rd", addressLocality: "Livonia", addressRegion: "MI", postalCode: "48152", addressCountry: "US" },
};

const Pin = () => <g><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.5" /></g>;
const Phone = () => <path d="M6 4h3l1.5 4-2 1.5a10 10 0 005 5L15 12.5 19 14v3a2 2 0 01-2 2C10 19 5 14 5 7a2 2 0 011-3z" />;
const Mail = () => <g><rect x="3.5" y="5.500" width="17" height="13" rx="2" /><path d="M4 7l8 6 8-6" /></g>;

function ContactItem({ icon, label, href, children }: { icon: React.ReactNode; label: string; href?: string; children: React.ReactNode }) {
  const body = (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-full border border-brand-300/40 bg-brand-300/10 text-brand-300">
        <svg aria-hidden viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </span>
      <span className="min-w-0 [overflow-wrap:anywhere]">
        <span className="block font-mono text-[12px] uppercase tracking-[0.16em] text-brand-300">{label}</span>
        <span className="mt-1 block text-[15px] font-medium leading-snug text-white sm:text-[17px]">{children}</span>
      </span>
    </>
  );
  const cls = "flex items-center gap-4 rounded-[12px] border border-white/10 bg-white/[0.05] p-5 transition-colors";
  return href ? <a href={href} className={`${cls} hover:border-brand-300/60`}>{body}</a> : <div className={cls}>{body}</div>;
}

export default function PhilanthropyPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* hero */}
      <section className="relative isolate overflow-hidden bg-abyss text-white">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(90%_100%_at_72%_45%,#0b3a44_0%,#061f26_55%,#04141a_90%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_80%_at_70%_40%,#000,transparent_80%)]" />
          <div className="absolute right-[-10%] top-1/2 h-[520px] w-[640px] max-w-[120vw] -translate-y-1/2 rounded-full bg-brand/25 blur-[130px]" />
        </div>
        <div className="container-page pb-24 pt-28 sm:pb-28 sm:pt-32 lg:pb-36 lg:pt-36">
          <Breadcrumb crumbs={[{ name: "Home", href: "/" }, { name: "Philanthropy" }]} />
          <div className="mt-8 grid items-center gap-12 lg:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
            <div>
              <Reveal delay={0.05}>
                <h1 className="bg-gradient-to-b from-white from-40% to-brand-100/80 bg-clip-text text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] text-transparent xs:text-[44px] sm:text-[56px] xl:text-[64px]">
                  Soothsayer Foundation
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-[22px] font-medium leading-[1.3] text-brand-100 sm:text-[26px]">Helping the World</p>
                <p className="mt-6 max-w-[620px] text-[16px] leading-[1.7] text-white/75 sm:text-[17px]">
                  Soothsayer Foundation is a 501(c)(3) nonprofit organization based in Livonia, Michigan. We were built on the fundamentals of hard work and teamwork, because problems of this scale are never solved by one person acting alone.
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-7">
                <KeycapButton href={`mailto:${EMAIL}`} fullWidthMobile>Get involved</KeycapButton>
              </Reveal>
            </div>
            <Reveal delay={0.2} y={24}>
              <div className="relative mx-auto w-full max-w-[560px]">
                <div aria-hidden className="absolute -inset-4 rounded-[32px] bg-brand/20 blur-3xl" />
                <FoundationArt className="relative" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* what the Foundation supports */}
      <Section edge beforeDark>
        <Heading>Our philanthropy supports</Heading>
        <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
          {CAUSES.map((c, i) => (
            <li key={c.title} className="group relative flex flex-col overflow-hidden rounded-[12px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-8">
              <CornerRings />
              <span className="grid size-16 place-items-center rounded-full border border-brand/40 bg-brand-50 text-brand transition-transform duration-300 group-hover:scale-105">
                <svg aria-hidden viewBox="-16 -16 32 32" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
              </span>
              <span aria-hidden className="mt-6 font-mono text-sm tracking-widest text-[#007a96]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">{c.title}</h3>
            </li>
          ))}
        </ul>
      </Section>

      {/* get involved */}
      <Section tone="dark" edge>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="h-section text-white">We are currently rebuilding this page.</h2>
          <p className="mx-auto mt-6 max-w-[680px] text-lg leading-[1.7] text-white/80 sm:text-xl">
            To learn more about the Foundation or to get involved, reach us at{" "}
            <a href={`mailto:${EMAIL}`} className="[overflow-wrap:anywhere] text-brand-300 underline underline-offset-4 hover:text-white">{EMAIL}</a>.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          <li><ContactItem icon={<Pin />} label="Address">{ADDRESS}</ContactItem></li>
          <li><ContactItem icon={<Phone />} label="Phone" href="tel:+18444476684,8">{PHONE}</ContactItem></li>
          <li><ContactItem icon={<Mail />} label="Email" href={`mailto:${EMAIL}`}>{EMAIL}</ContactItem></li>
        </ul>
      </Section>
    </PageShell>
  );
}
