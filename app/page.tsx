import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { StrategyToScale } from "@/components/StrategyToScale";
import { Capabilities } from "@/components/Capabilities";
import { Expertise } from "@/components/Expertise";
import { ImpactStats } from "@/components/ImpactStats";
import { BusinessImpact } from "@/components/BusinessImpact";
import { AuGENT } from "@/components/AuGENT";
import { Testimonials } from "@/components/Testimonials";
import { Podcasts } from "@/components/Podcasts";
import { CustomerStories } from "@/components/CustomerStories";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

/** Section order follows the Figma frame top to bottom. */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustedBy />
        <StrategyToScale />
        <Capabilities />
        <Expertise />
        <ImpactStats />
        <BusinessImpact />
        <AuGENT />
        <Testimonials />
        <Podcasts />
        <CustomerStories />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
