import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/services/ServicePage";
import { SERVICE_PAGES, getService, serviceHref } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

// Only the eight known slugs exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) return {};
  const url = serviceHref(page.slug);
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url },
    twitter: { title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) notFound();
  return <ServicePageView page={page} />;
}
