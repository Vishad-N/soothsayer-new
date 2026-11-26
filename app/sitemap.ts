import type { MetadataRoute } from "next";
import { CAPABILITY_PAGES, capabilityHref } from "@/data/capabilities";
import { SERVICE_PAGES, serviceHref } from "@/data/services";
import { WEBINARS, webinarHref } from "@/data/webinars";
import sitePages from "@/data/site-pages.json";

const SITE = "https://www.soothsayeranalytics.ai";

export const dynamic = "force-static";

/** Pages that are not driven by a data file. Retired URLs (they redirect) are deliberately absent. */
const STATIC_PATHS = ["/", "/capabilities", "/services", "/webinars", "/philanthropy", "/responsible-ai", "/soothgpt", "/uae/procurement", "/uae/soothgpt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>([
    ...STATIC_PATHS,
    // the guide, session, case-study and /uae pages rendered from data/site-pages.json
    ...Object.keys(sitePages).map((k) => `/${k}`),
    ...CAPABILITY_PAGES.map((p) => capabilityHref(p.slug)),
    ...SERVICE_PAGES.map((p) => serviceHref(p.slug)),
    ...WEBINARS.map((w) => webinarHref(w.slug)),
  ]);
  return [...paths].sort().map((p) => ({ url: `${SITE}${p === "/" ? "" : p}` }));
}
