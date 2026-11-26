/**
 * Webinar content, merged from the two places it lived on the old site: the recap pages under
 * /webinars/<slug> (title, subtitle, date, summary) and the original session pages (abstract,
 * time zones, speaker, takeaways, audience). Source text is in webinars.json; this file types it,
 * resolves which source supplies which field, and holds the hub copy.
 */
import raw from "./webinars.json";

export type Speaker = { name: string; roles: string[]; bio: string[] };
export type Item = { title: string; text: string };
export type CoverMotif = "radar" | "stack" | "ascent";

export type Webinar = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  about: string[];
  /** "Wednesday, March 4, 2026" */
  date: string;
  year: number;
  /** ms since epoch, for ordering and for telling past from upcoming */
  timeMs: number;
  hero: string | null;
  /** Designed cover used when the source has no image. */
  cover: CoverMotif | null;
  zones: string[];
  duration?: string;
  speakers: Speaker[];
  takeawaysIntro: string[];
  takeaways: Item[];
  who: Item[];
  closing?: { heading: string; text: string[] };
};

type Raw = {
  slug: string; title: string; dateLabel: string; subtitle: string | null; description: string | null; about: string | null; hero: string | null;
  landing: null | {
    abstract?: string[]; time?: string[]; duration?: string; sub?: string | null;
    speakers?: { name: string; roles: string[]; bio: string[] }[];
    takeawaysIntro?: string[]; takeaways?: Item[]; who?: Item[]; closing?: { heading: string; text: string[] };
  };
};

const COVER: Record<string, CoverMotif> = {
  "agentic-ai-and-the-future-of-continuous-cyber-defense": "radar",
  "architecting-ai-at-scale": "stack",
  "how-to-make-ai-transformation-work": "ascent",
};

function build(r: Raw): Webinar {
  const l = r.landing;
  const lsub = l?.sub ?? null;
  const practitioner = (s: string | null) => !!s && s.startsWith("A practitioner-led");
  const parsed = new Date(r.dateLabel.replace(/^\w+,\s*/, "") + " 12:00 UTC");
  return {
    slug: r.slug,
    title: r.title,
    subtitle: r.subtitle ?? (lsub && !practitioner(lsub) ? lsub : undefined),
    description: r.description ?? (practitioner(lsub) ? lsub! : undefined),
    // The recap summary is written in the past tense, so it leads; the original abstract fills in where there is none.
    about: r.about ? [r.about] : l?.abstract ?? [],
    date: r.dateLabel,
    year: parsed.getUTCFullYear(),
    timeMs: parsed.getTime(),
    hero: r.hero,
    cover: r.hero ? null : COVER[r.slug] ?? "stack",
    zones: l?.time ?? [],
    duration: l?.duration,
    speakers: l?.speakers ?? [],
    takeawaysIntro: l?.takeawaysIntro ?? [],
    takeaways: l?.takeaways ?? [],
    who: l?.who ?? [],
    closing: l?.closing && l.closing.text.length ? l.closing : undefined,
  };
}

/** Newest first. */
export const WEBINARS: Webinar[] = (Object.values(raw) as unknown as Raw[]).map(build).sort((a, b) => b.timeMs - a.timeMs);
export const getWebinar = (slug: string) => WEBINARS.find((w) => w.slug === slug);
export const webinarHref = (slug: string) => `/webinars/${slug}`;
export const YEARS = [...new Set(WEBINARS.map((w) => w.year))].sort((a, b) => b - a);

/** Sessions still ahead of today (none right now: the calendar shows its empty state). */
export const upcomingWebinars = (now = Date.now()) => WEBINARS.filter((w) => w.timeMs >= now).reverse();
export const pastWebinars = (now = Date.now()) => WEBINARS.filter((w) => w.timeMs < now);

/** Neighbours for the previous / next links at the foot of a recap page. */
export function neighbours(slug: string) {
  const i = WEBINARS.findIndex((w) => w.slug === slug);
  return { newer: i > 0 ? WEBINARS[i - 1] : null, older: i >= 0 && i < WEBINARS.length - 1 ? WEBINARS[i + 1] : null };
}

/* ---------------------------------------------------------------- hub --- */

export const HUB = {
  metaTitle: "Soothsayer Webinars",
  metaDescription:
    "An executive forum for leaders and builders navigating the realities of enterprise AI. Explore the SoothSight briefings, speakers and takeaways from past Soothsayer webinars.",
  eyebrow: "Soothsayer Webinars",
  h1: "Where AI Strategy Meets Execution",
  body: "An executive forum for leaders and builders navigating the realities of enterprise AI. SoothSight distills the fast-moving landscape into the technical clarity and architectural foresight required to bridge the gap between emerging technology and institutional value.",
  cta: "Access the Briefings",
  trusted: "Trusted by Industry Leaders for Delivering Cutting-Edge, AI-Driven Solutions That Drive Success.",
  calendar: {
    title: "The SoothSight Intelligence Calendar",
    intro: "Strategic foresight and technical demonstrations scheduled for the coming months.",
    empty: "No items found.",
  },
  archive: {
    title: "Learn From What You Missed",
    sub: "Explore our repository of past sessions",
    intro: "Review the patterns and outcomes from our previous executive sessions to inform your own AI roadmap.",
  },
  foundation: {
    title: "A Foundation of Actionable Intelligence",
    body: "Our briefings are structured to bridge the gap between AI potential and operational reality, ensuring every session translates into immediate strategic utility for your organization. Engineering Clarity. Delivering Impact.",
    stats: [
      { value: 6, suffix: "+", label: "Strategic Briefings", text: "A rigorous repository of sessions covering the full lifecycle of AI integration, from initial demystification to advanced architectural deployment." },
      { value: 650, suffix: "+", label: "Industry Leaders", text: "A high-caliber community of C-Suite, technical architects, and engineers collaborating across the global enterprise landscape." },
      { value: 92, suffix: "%", label: "Strategic Utility", text: "Participants consistently report gaining actionable frameworks that directly inform their organizational roadmaps and technical stacks." },
      { value: 8, suffix: "+", label: "Case studies", text: "Deep-dives into real-world use cases and live demonstrations grounded in actual production environments, not theoretical roadmaps." },
    ],
  },
};

export const QA = {
  intro: "No fluff. Just sharp answers to the questions that actually matter when implementing AI.",
  title: "Quick Answers. Real Insights.",
  clips: [
    { id: "yuOgOePEEqg", q: "How does AI go from predicting words to completing entire workflows?", thumb: "/images/webinars/clip-q1.webp" },
    { id: "dPZbsJv0IyU", q: "How do you decide between a massive AI model and a specialised one?", thumb: "/images/webinars/clip-q2.webp" },
    { id: "5yumBwZlCZA", q: "Why do all four generations of AI exist side by side today?", thumb: "/images/webinars/clip-q3.webp" },
    { id: "4w0jllQmm8E", q: "Are you using the right type of AI for your problem?", thumb: "/images/webinars/clip-q4.webp" },
    { id: "5FVWiJzO_mQ", q: "Why 95% of project fail?", thumb: "/images/webinars/clip-q5.webp" },
  ],
};

export const FORM = {
  title: "Download the Presentation",
  intro: "Get access to the exact slides, frameworks, and resources used in this session.",
  formTitle: "Please Share your details",
  formSub: "We Will Get Back to You on Next Steps",
  hear: ["E-mail invitation", "Social Media", "Company Website", "Event Partner", "Online Advertisement", "Referral from a colleague", "Other"],
  maturity: ["Expert", "Intermediate", "Preliminary", "Prefer not to say"],
  projects: ["In-House", "Both", "None", "Prefer not to answer"],
  success: "Thank you! Your submission has been received!",
  error: "Oops! Something went wrong while submitting the form.",
};

export const ADVISORY = {
  title: "1-Hour AI Advisory Discussion",
  text: "Want tailored guidance? Book a 1-hour advisory session with our AI experts to identify opportunities and build a clear implementation roadmap.",
  button: "Book a 1-hour session",
};

export const CASES = {
  title: "Real Results. Real AI.",
  intro: "Explore how our AI solutions solve real business challenges, not just theoretical ones.",
};
