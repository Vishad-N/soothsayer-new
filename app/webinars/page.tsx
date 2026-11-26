import type { Metadata } from "next";
import { WebinarsHubView } from "@/components/webinars/WebinarsHub";
import { HUB } from "@/data/webinars";

// Past and upcoming are decided by the date, so refresh the static page daily.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: { absolute: HUB.metaTitle },
  description: HUB.metaDescription,
  alternates: { canonical: "/webinars" },
  openGraph: { title: HUB.metaTitle, description: HUB.metaDescription, url: "/webinars" },
  twitter: { title: HUB.metaTitle, description: HUB.metaDescription },
};

export default function WebinarsPage() {
  return <WebinarsHubView />;
}
