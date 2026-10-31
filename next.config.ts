import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
