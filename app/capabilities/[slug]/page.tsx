import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilityPageView } from "@/components/capability/CapabilityPage";
import { CAPABILITY_PAGES, capabilityHref, getCapability } from "@/data/capabilities";

type Props = { params: Promise<{ slug: string }> };

// Only the six known slugs exist; anything else is a 404 rather than a runtime render.
export const dynamicParams = false;

export function generateStaticParams() {
  return CAPABILITY_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getCapability(slug);
  if (!page) return {};
  const url = capabilityHref(page.slug);
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url },
    twitter: { title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function CapabilityPage({ params }: Props) {
  const { slug } = await params;
  const page = getCapability(slug);
  if (!page) notFound();
  return <CapabilityPageView page={page} />;
}
