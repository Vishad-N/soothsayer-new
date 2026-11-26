import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebinarPageView } from "@/components/webinars/WebinarPage";
import { WEBINARS, getWebinar, webinarHref } from "@/data/webinars";

type Props = { params: Promise<{ slug: string }> };

// Only the known sessions exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return WEBINARS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = getWebinar(slug);
  if (!w) return {};
  const title = `Soothsayer Webinars | ${w.title}`;
  const description = w.description ?? w.subtitle ?? w.about[0]?.slice(0, 200);
  const url = webinarHref(w.slug);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, ...(w.hero ? { images: [w.hero] } : {}) },
    twitter: { title, description, ...(w.hero ? { images: [w.hero] } : {}) },
  };
}

export default async function WebinarPage({ params }: Props) {
  const { slug } = await params;
  const w = getWebinar(slug);
  if (!w) notFound();
  return <WebinarPageView w={w} />;
}
