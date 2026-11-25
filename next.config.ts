import type { NextConfig } from "next";

/** 301s for the pages the Services section replaces (Services pages content, 11-25-2026). */
const SERVICE_REDIRECTS: [string, string][] = [
  ["/data-science-consulting", "/services"],
  ["/strategy-blueprint", "/services/ai-strategy-roadmap"],
  ["/digital-competency", "/services/ai-capability-building"],
  ["/corporate-training", "/services/ai-capability-building"],
  ["/artificial-intelligence-deep-learning-accelerated-certificate-course", "/services/ai-capability-building"],
  ["/education-certification-advanced-certification-program", "/services/ai-capability-building"],
  ["/blockchain-for-cxos-workshop", "/services/ai-capability-building"],
  ["/leadership-seminar-internet-of-things-iot", "/services/ai-capability-building"],
  ["/research-and-development", "/services/applied-ai-research"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return SERVICE_REDIRECTS.map(([source, destination]) => ({ source, destination, statusCode: 301 }));
  },
  images: {
    // Brand imagery is served from the client's existing CDNs, so nothing has
    // to be copied into /public. Add a host here before using a new one.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "soothsayeranalytics.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
