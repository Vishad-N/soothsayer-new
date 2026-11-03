/**
 * Page copy, kept apart from layout so marketing can edit text without
 * touching components. Copy follows the Figma file; where Figma only shows
 * one state (tabs, stepper), the other states use the live site's wording.
 */
import { LINKS } from "./links";
import { CASE_STUDY_IMAGES } from "./images";

/* ---------------------------------------------------------------- Nav --- */

export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; items: NavItem[]; footer?: NavItem };

export const NAV: (NavGroup | NavItem)[] = [
  {
    label: "Bespoke AI",
    items: [
      { label: "Generative AI", href: LINKS.generativeAI },
      { label: "Pattern Recognition", href: LINKS.patternRecognition },
      { label: "Predictive Analytics", href: LINKS.predictiveAnalytics },
      { label: "Optimization", href: LINKS.optimization },
      { label: "Unstructured Data", href: LINKS.unstructuredData },
      { label: "Text Analytics & NLP", href: LINKS.textAnalyticsNLP },
      { label: "Computer Vision", href: LINKS.computerVision },
      { label: "IoT & Big Data", href: LINKS.iotBigData },
    ],
    footer: { label: "All Bespoke AI solutions", href: LINKS.bespokeAI },
  },
  {
    label: "Services",
    items: [
      { label: "Data Science Consulting", href: LINKS.dataScienceConsulting },
      { label: "Strategy & Blueprint", href: LINKS.strategyBlueprint },
      { label: "Research & Development", href: LINKS.researchDevelopment },
      { label: "Corporate Training", href: LINKS.corporateTraining },
      { label: "A.I & D.L Accelerated Course", href: LINKS.aiDlCourse },
      { label: "Advanced Certificate Program", href: LINKS.advancedCertificate },
      { label: "Blockchain for CXO's Workshop", href: LINKS.blockchainWorkshop },
      { label: "IoT Leadership Seminar", href: LINKS.iotLeadership },
    ],
    footer: { label: "All services", href: LINKS.services },
  },
  {
    label: "Industries",
    items: [
      { label: "Manufacturing & Automotive", href: LINKS.manufacturing },
      { label: "Supply Chain & Retail", href: LINKS.supplyChainRetail },
      { label: "Insurance", href: LINKS.insurance },
      { label: "Energy / Utilities", href: LINKS.utilities },
      { label: "Healthcare", href: LINKS.healthcare },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "AuGENT™", href: LINKS.augent },
      { label: "ESG Analytics", href: LINKS.esgAnalytics },
      { label: "Generative AI for Business Transformation", href: LINKS.genAIBusiness },
      { label: "Multilingual Virtual Assistant", href: LINKS.multilingualVA },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Media", href: LINKS.media },
      { label: "Videos", href: LINKS.videos },
      { label: "Blog", href: LINKS.blog },
      { label: "Case Studies", href: LINKS.caseStudies },
      { label: "Podcast", href: LINKS.podcasts },
      { label: "Webinars", href: LINKS.webinars },
    ],
  },
  { label: "Philanthropy", href: LINKS.philanthropy },
];

export const isGroup = (n: NavGroup | NavItem): n is NavGroup => "items" in n;

/* --------------------------------------------------------------- Hero --- */

export const HERO = {
  eyebrow: "A new perspective on enterprise AI",
  title: "Enterprise AI built to move from strategy to production.",
  body: "Bespoke AI and data science solutions that turn complex challenges into better business decisions.",
  cta: { label: "Explore Our Solutions", href: LINKS.services },
  // Bottom ticker. Each entry links to the page that covers it.
  pillars: [
    { label: "Building Digital Competency", href: LINKS.digitalCompetency },
    { label: "Strategy & AI Roadmaps", href: LINKS.strategyBlueprint },
    { label: "Build and deploy production ready AI systems.", href: LINKS.genAIBusiness },
  ],
};

/* ---------------------------------------------- Strategy → Scale stepper --- */

export type Step = {
  key: string;
  label: string;
  title: string;
  body: string;
  tags: string[];
  icon: "strategy" | "foundation" | "genai" | "agents" | "scale" | "govern";
  href: string;
};

export const STRATEGY = {
  title: "Enterprise AI. From Strategy to Scale.",
  body: "Five delivery stages, with responsible AI at the centre of all of them, from the first use case through to production at scale.",
  footnote:
    "End-to-end partner for your enterprise AI journey, from ideation to implementation and continuous value realization.",
  steps: [
    {
      key: "discover",
      label: "Discover",
      title: "Discover",
      body: "Score opportunities on business value, data readiness and time to production.",
      tags: [],
      icon: "strategy",
      href: LINKS.strategyBlueprint,
    },
    {
      key: "build",
      label: "Build",
      title: "Build",
      body: "Stand up data foundations and train models on your own systems and history.",
      tags: [],
      icon: "foundation",
      href: LINKS.dataScienceConsulting,
    },
    {
      key: "deploy",
      label: "Deploy",
      title: "Deploy",
      body: "Put copilots and intelligent applications into the workflows teams already use.",
      tags: [],
      icon: "genai",
      href: LINKS.generativeAI,
    },
    {
      key: "automate",
      label: "Automate",
      title: "Automate",
      body: "Hand multi-step business processes to agents that plan and execute end to end.",
      tags: [],
      icon: "agents",
      href: LINKS.augent,
    },
    {
      key: "scale",
      label: "Scale",
      title: "Scale",
      body: "Hold accuracy, latency and cost steady as usage spreads across the enterprise.",
      tags: [],
      icon: "scale",
      href: LINKS.researchDevelopment,
    },
  ] satisfies Step[],
};

/* ---------------------------------------------------- Expertise tabs --- */

export type ExpertiseIcon =
  | "data" | "people" | "framework" | "risk" | "owner" | "compliance"
  | "target" | "map" | "layers" | "chart" | "compass" | "flag"
  | "cap" | "users" | "book" | "spark" | "award" | "refresh";

export type ExpertiseTab = {
  key: string;
  tab: string;
  title: string;
  body: string;
  points: { icon: ExpertiseIcon; label: string }[];
  cta: { label: string; href: string };
  art: "trust" | "blueprint" | "competency";
};

export const EXPERTISE = {
  eyebrow: "Our Expertise",
  title: "AI Transformation That Drives Business Growth",
  body: "We help enterprises define AI strategies, build intelligent solutions, and scale digital capabilities responsibly to achieve measurable business impact.",
  tabs: [
    {
      key: "responsible",
      tab: "Responsible AI",
      title: "Build AI you can trust.",
      body: "Embed accountability, transparency, and responsible decision-making into every stage of AI development",
      points: [
        { icon: "data", label: "Data quality and bias awareness" },
        { icon: "people", label: "Human-centred AI systems" },
        { icon: "framework", label: "Responsible AI frameworks" },
        { icon: "risk", label: "Risk and failure management" },
        { icon: "owner", label: "Clear ownership and oversight" },
        { icon: "compliance", label: "Governance and compliance" },
      ],
      cta: { label: "Explore Responsible AI", href: LINKS.responsibleAI },
      art: "trust",
    },
    {
      key: "blueprint",
      tab: "Strategy & Blueprint",
      title: "Turn AI ambition into a plan.",
      body: "Define your AI priorities, target architecture, roadmap, and governance model for a clear path from opportunity to execution.",
      points: [
        { icon: "target", label: "AI opportunity assessment" },
        { icon: "layers", label: "Target AI architecture" },
        { icon: "map", label: "Prioritized use-case roadmap" },
        { icon: "data", label: "Data readiness review" },
        { icon: "compliance", label: "Governance operating model" },
        { icon: "chart", label: "Value and ROI tracking" },
      ],
      cta: { label: "Explore Strategy & Blueprint", href: LINKS.strategyBlueprint },
      art: "blueprint",
    },
    {
      key: "competency",
      tab: "Building Digital Competency",
      title: "Build the skills to scale AI.",
      body: "Build enterprise AI capabilities through executive alignment, role-based enablement, and practical AI skills development.",
      points: [
        { icon: "compass", label: "Executive AI alignment" },
        { icon: "users", label: "Role-based enablement" },
        { icon: "spark", label: "Hands-on AI skills" },
        { icon: "flag", label: "AI readiness assessment" },
        { icon: "award", label: "Certification programs" },
        { icon: "refresh", label: "Change and adoption" },
      ],
      cta: { label: "Explore Digital Competency", href: LINKS.digitalCompetency },
      art: "competency",
    },
  ] satisfies ExpertiseTab[],
};

/* -------------------------------------------------------------- Stats --- */

export const STATS = {
  title: "Results that survive scrutiny",
  items: [
    { value: 40000, prefix: "", suffix: "+", label: "Hours automated annually through a single deployed agentic workflow." },
    { value: 14, prefix: "$", suffix: "M+", label: "Annual cost saved by one enterprise document processing deployment." },
    { value: 99, prefix: "", suffix: "%", label: "Extraction accuracy in production document processing." },
    { value: 90, prefix: "", suffix: "%", label: "Reduction in processing cycle time." },
  ],
};

/* ------------------------------------------------------ Business impact --- */

export type ImpactIcon = "dollar" | "hand" | "sliders" | "clock" | "bolt" | "chip" | "eye" | "trend" | "check" | "users" | "rocket" | "globe";

export const IMPACT = {
  eyebrow: "From AI investment to measurable outcomes",
  title: "AI built for business impact",
  body: "We help enterprises turn AI from experimentation into measurable operational, financial, and strategic value.",
  cta: { label: "Explore More", href: LINKS.idp },
  defaultTab: 1,
  tabs: [
    {
      tab: "Operational Efficiency",
      items: [
        { icon: "clock", title: "40,000+", body: "Hours automated annually through a deployed agentic AI workflow." },
        { icon: "bolt", title: "90%", body: "Reduction in processing cycle time through AI-powered document processing." },
        { icon: "chip", title: "Production-ready AI", body: "AI systems integrated into enterprise workflows, with MLOps and observability built in." },
      ],
    },
    {
      tab: "Cost Optimization",
      items: [
        { icon: "dollar", title: "$14M+", body: "Annual cost savings from a single enterprise document processing deployment." },
        { icon: "hand", title: "Less manual work", body: "Automate repetitive processes while reducing operational overhead." },
        { icon: "sliders", title: "Smarter resource allocation", body: "Use AI to optimise processes, capacity, and enterprise resources." },
      ],
    },
    {
      tab: "Faster Decision-Making",
      items: [
        { icon: "trend", title: "Predictive insight", body: "Forecast demand, prices, and risk early enough to act on them." },
        { icon: "eye", title: "Signal over noise", body: "Surface the patterns and anomalies that matter from complex data." },
        { icon: "check", title: "Decision support", body: "Put AI recommendations inside the workflows where teams already decide." },
      ],
    },
    {
      tab: "Intelligent Automation",
      items: [
        { icon: "check", title: "99%", body: "Extraction accuracy in production document processing." },
        { icon: "chip", title: "Agentic workflows", body: "AI agents that collaborate to execute business processes end-to-end." },
        { icon: "users", title: "Human in the loop", body: "Review and approval steps where judgement matters most." },
      ],
    },
    {
      tab: "Scalable AI Adoption",
      items: [
        { icon: "users", title: "25,000+", body: "Leaders trained to adopt and scale AI across the enterprise." },
        { icon: "rocket", title: "Pilot to production", body: "A repeatable path from proof of concept to deployed system." },
        { icon: "sliders", title: "LLMOps built in", body: "Monitoring, evaluation, and cost control for AI at scale." },
      ],
    },
    {
      tab: "Enterprise Intelligence",
      items: [
        { icon: "dollar", title: "$150 Mn+", body: "Procurement impact delivered through AI-driven forecasting." },
        { icon: "hand", title: "70%", body: "Reduction in manual processes." },
        { icon: "trend", title: "10x ROI", body: "Return on AI investment across client engagements." },
      ],
    },
  ] as { tab: string; items: { icon: ImpactIcon; title: string; body: string }[] }[],
};

/* ------------------------------------------------------------- AuGENT --- */

export const AUGENT = {
  kicker: "Meet",
  badge: "Enterprise Agentic AI, Built for Your Environment",
  lead: "A platform for deploying, orchestrating, and governing agentic AI within enterprise boundaries.",
  body: "AuGENT brings together multiple AI models, enterprise data, intelligent workflows, and governance in a production-ready platform designed for real business environments.",
  cta: { label: "See AuGENT in Action", href: LINKS.augentExternal },
};

/* ------------------------------------------------------- Testimonials --- */

export type Testimonial = { role: string; company: string; quote: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    role: "Sr. Architect, Innovation & Strategy",
    company: "Grange Insurance",
    quote:
      "Sometimes it’s the little things that make one partner stand out among the crowd. It’s been fun watching Soothsayer Analytics grow over the years. When I first met Christopher Dole, they were just a small startup among many in the data analytics and artificial intelligence space; now they are over 100+ people. But something drew me to them: possibly it was the sizable group of Ph.D. pioneers they’d assembled that crafted actual, and not just theoretical, solutions. Perhaps it was the customization of each of those solutions, and the willingness to adjust and be flexible, as my innovation roles have often demanded. But I think mostly it was the way they build relationships. I’ve never felt pressured to buy NOW, and it feels like they trust me. I really appreciate that; trust is so important in a partner relationship.",
  },
  {
    role: "Head of Data Science",
    company: "Abercrombie & Fitch",
    quote:
      "From day one, Soothsayer’s intellectual ability was obvious, but we have been most impressed with their uncanny ability to provide context to problems. Our client engagement has been a very positive experience in which Soothsayer has met and/or exceeded our expectations. We have subsequently started working with them on a few Data Science projects, and this has also been a positive experience. I would recommend them to any company looking for a strong intellectual Data Science partner.",
  },
  {
    role: "Chief Data Scientist",
    company: "Dun & Bradstreet",
    quote:
      "Soothsayer has the rare capacity to bring together people from disparate backgrounds and to help them find the common ground that allows magic to happen. I have benefited greatly from their ability to stay on a difficult problem and to drive teams of experts to the problem and opportunity formulation that allows for great collaboration. He and his team are patient, extremely responsive, and impressively eclectic in their skills and their thirst for data science. It is my great good fortune to work with Chris and the fine folks at Soothsayer Analytics.",
  },
  {
    role: "VP, Marketing",
    company: "Safelite AutoGlass",
    quote:
      "I had the good fortune to work with Chris and his team at Soothsayer while I was at Safelite. They helped us to address two very high-profile problems, part selection, and fraud detection. In both cases, they took the time to get an in-depth understanding of the business problem and then develop thoughtful, practical, AI/ML solutions that addressed the core issues. Given the opportunity, I would love to work with Chris and his team again!",
  },
  {
    role: "CIO",
    company: "Fortune 1000 Insurance Co.",
    quote:
      "I had the opportunity to work with the Soothsayer team on multiple Artificial Intelligence (AI) projects. The experience was a remarkable success, transforming operations and creating alternative pricing models. The initiatives created a simplified and more flexible operating environment and provided crucial insight and predictive pricing capabilities. Soothsayer’s ability to build data science solutions tailored to our needs and goals was impressive, and exploring and delivering value together was vital in achieving successful outcomes.",
  },
  {
    role: "R&D Director",
    company: "Fortune 1000 Manufacturer",
    quote:
      "Soothsayer’s executive overview of the current state of deep learning, what it is, how it works, what can be done with it and where is it headed is excellent. I highly recommend this for anyone who is interested in Artificial Intelligence and understanding the implications for their business.",
  },
];

/* ------------------------------------------------- AI in Action (pods) --- */

export type Episode = { id: string; title: string; guest: string; role: string };

export const PODCASTS = {
  title: "AI in Action",
  body: "Explore how Soothsayer applies AI in the real world through case studies, demos, podcasts, webinars, and conversations with industry experts.",
  viewAll: LINKS.podcasts,
  // YouTube ids from soothsayeranalytics.com/podcasts
  episodes: [
    { id: "krfml0ePDzU", title: "AI, Personalized Learning, and the Future of Work", guest: "Dr. Soumitra Dutta", role: "Dean, Saïd Business School, University of Oxford" },
    { id: "RSIpfbiC8Ug", title: "Sports Analytics: Beyond the Box Score", guest: "Paul Bessire", role: "Chief Data Officer, Coterie Insurance" },
    { id: "esevuq0zR4M", title: "AI’s Impact & The Regulatory Response", guest: "Julian Morris", role: "Senior Fellow, Reason Foundation, Senior Scholar, ICLE" },
    { id: "i9s4V7prMOA", title: "AI in Chemical Manufacturing", guest: "Dr. Lloyd Colegrove", role: "Director, Data Sciences & Fundamental Problem Solving" },
    { id: "0pNAnJvon20", title: "From Missiles to Models: Responsible AI", guest: "Dr. Murthy Kolluru", role: "SoothSight Season 2, Episode 4" },
    { id: "4puZzRESSp8", title: "Climate Uncertainty & Risk", guest: "Dr. Judith Curry", role: "SoothSight Season 2, Episode 3" },
    { id: "DbDwVKOjJRc", title: "AI in Forecasting, Procurement, and S&OP", guest: "SoothSight Podcast", role: "Season 2, Episode 2" },
  ] satisfies Episode[],
};

/* -------------------------------------------------------- Case studies --- */

export type CaseStudy = { title: string; industry: string; href: string; image: string };

export const CASE_STUDIES = {
  title: "Enterprise AI Case Studies",
  viewAll: LINKS.caseStudies,
  items: [
    {
      title: "Enterprise ChatGPT for the largest system supplier for food, beverage and pharmaceutical sectors",
      industry: "Manufacturing & Automotive",
      href: LINKS.caseStudy5,
      image: CASE_STUDY_IMAGES.chatbot,
    },
    {
      title: "AI Driven Demand and Price Prediction for Raw Materials for a Global Chemical Manufacturer",
      industry: "Manufacturing & Automotive",
      href: LINKS.caseStudy1,
      image: CASE_STUDY_IMAGES.rawMaterials,
    },
    {
      title: "AI Based Underwriting Model Forecasting Claim Expenses for a Healthcare Insurance Provider",
      industry: "Insurance",
      href: LINKS.caseStudy2,
      image: CASE_STUDY_IMAGES.underwriting,
    },
    {
      title: "AI Driven Multivariate Revenue Forecasting for a Very Large Fiber Composites Manufacturer",
      industry: "Manufacturing & Automotive",
      href: LINKS.caseStudy3,
      image: CASE_STUDY_IMAGES.revenue,
    },
    {
      title: "Ship from Store Optimization for a Leading Retailer",
      industry: "Supply Chain & Retail",
      href: LINKS.caseStudy4,
      image: CASE_STUDY_IMAGES.shipFromStore,
    },
    {
      title: "Increasing Efficiency of Furnaces and Quench Towers for a Fortune 500 Chemical Manufacturer",
      industry: "Energy & Utilities",
      href: LINKS.caseStudy6,
      image: CASE_STUDY_IMAGES.furnaces,
    },
  ] satisfies CaseStudy[],
};

/* ----------------------------------------------------------------- CTA --- */

export const CTA = {
  pill: "Let's Talk",
  title: "The easiest way to power up your business with AI",
  body: "Discover where AI can create measurable value for your enterprise. Tell us about your challenge and our team will map a practical path from opportunity to production.",
  cta: { label: "Schedule a Consultation", href: LINKS.contact },
};

/* -------------------------------------------------------------- Footer --- */

export const FOOTER = {
  blurb:
    "Soothsayer Analytics builds bespoke AI and data science solutions that help enterprises explain the unknown, predict the future, and optimize their business.",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Data Science Consulting", href: LINKS.dataScienceConsulting },
        { label: "Strategy & Blueprint", href: LINKS.strategyBlueprint },
        { label: "Research & Development", href: LINKS.researchDevelopment },
        { label: "Corporate Training", href: LINKS.corporateTraining },
      ],
    },
    {
      title: "Industries",
      links: [
        { label: "Manufacturing & Automotive", href: LINKS.manufacturing },
        { label: "Supply Chain & Retail", href: LINKS.supplyChainRetail },
        { label: "Insurance", href: LINKS.insurance },
        { label: "Utilities", href: LINKS.utilities },
        { label: "Healthcare", href: LINKS.healthcare },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Media", href: LINKS.media },
        { label: "Videos", href: LINKS.videos },
        { label: "Blog", href: LINKS.blog },
        { label: "Case Studies", href: LINKS.caseStudies },
        { label: "Podcasts", href: LINKS.podcasts },
        { label: "Webinars", href: LINKS.webinars },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: LINKS.about },
        { label: "Contact Us", href: LINKS.contact },
        { label: "Career", href: LINKS.careers },
        { label: "Privacy Policy", href: LINKS.privacy },
        { label: "Terms of Service", href: LINKS.terms },
        { label: "Employee Referral Program", href: LINKS.employeeReferral },
      ],
    },
  ],
  social: [
    { label: "Facebook", href: LINKS.facebook, icon: "facebook" },
    { label: "Instagram", href: LINKS.instagram, icon: "instagram" },
    { label: "X (Twitter)", href: LINKS.twitter, icon: "x" },
    { label: "LinkedIn", href: LINKS.linkedin, icon: "linkedin" },
    { label: "YouTube", href: LINKS.youtube, icon: "youtube" },
  ] as const,
  contact: [
    { label: "844-44-76684", href: LINKS.phone },
    { label: "info@soothsayeranalytics.com", href: LINKS.email },
  ],
};

/* ------------------------------------------------------- Capabilities --- */

export const CAPABILITIES = {
  eyebrow: "What We Deliver",
  title: "Capabilities we build and run.",
  body: "Practice areas spanning strategy, data foundations, generative AI, agentic systems and production reliability, combined to fit the problem.",
  items: [
    {
      icon: "compass",
      title: "AI Strategy & Transformation",
      body: "Decide where AI earns its keep, and in what order, before anything gets built.",
      points: ["AI Strategy", "Roadmaps", "Use Case Prioritization", "Change & Adoption"],
    },
    {
      icon: "data",
      title: "Data & AI Foundations",
      body: "The layer everything else depends on: your data, made usable, governed and model-ready.",
      points: ["Data Engineering", "RAG Pipelines", "Knowledge Graphs", "Model Development"],
    },
    {
      icon: "spark",
      title: "Generative AI Solutions",
      body: "Put language models to work on the documents, questions and busywork teams handle daily.",
      points: ["Enterprise Copilots", "Document Intelligence", "Knowledge Assistants", "Conversational Analytics"],
    },
    {
      icon: "chip",
      title: "Agentic AI & Multi-Agent Systems",
      body: "Systems that don’t just answer. They plan, act and carry a process to completion.",
      points: ["AI Agents", "Multi-Agent Orchestration", "Process Automation", "Decision Support"],
    },
    {
      icon: "refresh",
      title: "AI Reliability Engineering & LLMOps",
      body: "What keeps a working pilot working once real volume, real users and real cost arrive.",
      points: ["Monitoring & Observability", "Evaluation & Testing", "MLOps & CI/CD", "Cost & Performance"],
    },
    {
      icon: "framework",
      title: "Responsible AI & Governance",
      body: "Proof that a system behaves as intended, ready for audit, legal and the regulator.",
      points: ["Bias & Fairness Testing", "Security & Privacy", "Risk Management", "Compliance & Auditability"],
    },
  ],
};
