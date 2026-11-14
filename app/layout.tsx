import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const SITE = "https://www.soothsayeranalytics.ai";
const TITLE = "Soothsayer Analytics | Enterprise AI from Strategy to Production";
const DESCRIPTION =
  "Bespoke AI and data science solutions that turn complex challenges into better business decisions. Strategy, generative and agentic AI, LLMOps, and responsible AI governance.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s | Soothsayer Analytics" },
  description: DESCRIPTION,
  keywords: [
    "enterprise AI",
    "AI consulting",
    "generative AI",
    "agentic AI",
    "data science consulting",
    "responsible AI",
    "AuGENT",
    "intelligent document processing",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Soothsayer Analytics",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: "@RealDataScience",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#061a20",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Soothsayer Analytics",
  url: SITE,
  email: "info@soothsayeranalytics.com",
  telephone: "844-44-76684",
  sameAs: [
    "https://www.facebook.com/SoothsayerAnalytics",
    "https://www.instagram.com/soothsayeranalytics",
    "https://twitter.com/RealDataScience",
    "https://www.linkedin.com/company/soothsayer-analytics/",
    "https://www.youtube.com/@SoothsayerAnalytics",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={interTight.variable}>
      <head>
        {/* General Sans is a Fontshare face (not on Google Fonts). */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
        {/* Analytics placeholders: set NEXT_PUBLIC_GTM_ID and/or NEXT_PUBLIC_GA_ID in Vercel to enable. */}
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
