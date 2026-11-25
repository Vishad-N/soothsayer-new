import type { Metadata } from "next";
import { ServicesHubView } from "@/components/services/ServicesHub";
import { HUB } from "@/data/services";

export const metadata: Metadata = {
  title: { absolute: HUB.metaTitle },
  description: HUB.metaDescription,
  alternates: { canonical: "/services" },
  openGraph: { title: HUB.metaTitle, description: HUB.metaDescription, url: "/services" },
  twitter: { title: HUB.metaTitle, description: HUB.metaDescription },
};

export default function ServicesPage() {
  return <ServicesHubView />;
}
