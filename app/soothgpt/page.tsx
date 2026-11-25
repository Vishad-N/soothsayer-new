import type { Metadata } from "next";
import { PageShell } from "@/components/page/PageShell";
import { BlueprintScene } from "@/components/illustrations/BlueprintScene";
import { LINKS } from "@/data/links";
import { FlowTabs } from "@/components/flow/FlowClient";
import { ScrollSpyNav } from "@/components/page/Client";
import { cn } from "@/lib/cn";
import { ContactBand, GlobalPresence, Glyph, Heading, IconChip, PageHero, Section, WF_BASE } from "@/components/page/Shared";

const TITLE = "SoothGPT";
const DESC =
  "Unlock advanced analytics and predictions with SoothGPT by Soothsayer Analytics. Harness AI-driven insights for better decision-making across various industries.";
const OG = `${WF_BASE}68a585aad53916f731b9c87a_Soothsayer%20Open%20Graph%20Image.jpg`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/soothgpt" },
  openGraph: { title: TITLE, description: DESC, url: "/soothgpt", images: [OG] },
  twitter: { title: TITLE, description: DESC, images: [OG] },
};

const BANNER = `${WF_BASE}66881e933d75a27701aac5a3_Banner%20Video-transcode.mp4`;
const COM_VIDEO = "https://soothsayeranalytics.com/public/home/assets/videos/";
const CASE_IMG = "https://cdn.prod.website-files.com/6687d7efd656f8849a5552ba/";
const CASE = "https://soothsayeranalytics.com/case-studies/";

const SUBNAV = [
  ["Benefits", "#benefits"], ["Modules", "#modules"], ["Case Studies", "#case-studies"],
  ["Demos", "#demos"], ["Podcasts", "#podcasts"], ["Schedule a Consultation", "#cta-form"],
] as const;

const BENEFITS = [
  "Smart Accelerator of Human Productivity",
  "Enhanced Security for Sensitive Information",
  "Intuitive User Experience",
  "Access Multiple Data Sources at Once",
  "Future-Proof Innovation - Open & Sustainable AI",
  "Easy to Adapt & Implement for Various Use Cases",
  "Seamless Interaction & Data Access",
  "Gain Access to Advanced RAG",
];

type Mod = {
  name: string; logo: string; intro?: string; problem: string; solution?: string;
  how?: string[]; benefits?: [string, string][];
};

const MODULES: Mod[] = [
  {
    name: "SoothDoc", logo: "668ff4b2f85a3fa5bfcd76be_Sooth%20Doc.svg",
    problem: "Understanding complex documents and extracting specific information in a timely manner can be a daunting task.",
    solution: "SoothDoc revolutionizes document interaction by enabling natural language interaction. Users can ask questions, receive summaries, and highlight key sections effortlessly.",
    benefits: [
      ["Faster Document Comprehension:", "SoothDoc accelerates the document review process, enabling users to grasp complex information quickly and efficiently."],
      ["Easier Information Retrieval:", "With GenAI's intuitive interface, users can retrieve specific information from documents with ease, saving valuable time and effort."],
      ["Time-Saving:", "Eliminate the need for manual document analysis with SoothDoc. By automating tedious tasks, it enables users to focus on high-value activities."],
    ],
  },
  {
    name: "SoothXtractor", logo: "668ff55fd2de2a567e328943_Sooth%20Xtractor.svg",
    problem: "Manual data extraction is a cumbersome and error-prone process, consuming valuable time and resources.",
    solution: "Our revolutionary GenAI solution simplifies data extraction from a variety of documents, regardless of complex jargon or formatting challenges.",
    benefits: [
      ["Reduced Labor Costs:", "By automating the extraction process, GenAI minimizes the need for manual intervention, leading to significant cost savings."],
      ["Enhanced Accuracy:", "Avoid human errors with GenAI. It ensures precise data extraction, reducing the risk of inaccuracies associated with manual methods."],
      ["Handles Complex Content:", "Whether it's intricate technical documents or diverse file formats, GenAI effortlessly handles complex content, providing reliable results every time."],
    ],
  },
  {
    name: "SoothSQL", logo: "669558d4159302c22847885b_Sooth%20SQL.svg",
    problem: "Accessing valuable data insights often requires specialized SQL knowledge, posing a challenge for non-technical users.",
    solution: "This solution bridges the gap by translating natural language queries into database queries, democratizing data access for all.",
    benefits: [
      ["Easier Data Access:", "With GenAI's intuitive interface, users can effortlessly retrieve data insights without the need for SQL expertise, streamlining the process for everyone."],
      ["Faster Decision-Making:", "By simplifying data access, GenAI enables faster decision-making, empowering organizations to act swiftly on valuable insights."],
      ["Works Across Database Structures:", "Whether it's SQL, NoSQL, or other database structures, GenAI seamlessly integrates, providing universal access to data insights."],
    ],
  },
  {
    name: "SoothVision", logo: "668ff5ab47ec9ed303339476_Sooth%20Vision.svg",
    problem: "Understanding image content, labeling objects, and finding similarities can be challenging without the right tools.",
    solution: "SoothVision offers comprehensive image analysis capabilities, enabling users to describe images, categorize objects, detect similarities, and generate detailed descriptions effortlessly.",
    benefits: [
      ["Faster Image Organization:", "SoothVision streamlines image management by categorizing objects and identifying similarities, facilitating efficient image organization."],
      ["Automated Visual Analysis:", "With SoothVision's advanced algorithms, users can automate visual analysis tasks, saving time and resources while gaining valuable insights."],
      ["Enhanced Image Searchability:", "SoothVision's descriptive capabilities improve image searchability, making it easier for users to find relevant images based on specific criteria."],
    ],
  },
  {
    name: "SoothBOT", logo: "668ff63b296f7e0842952e6c_Sooth%20Bot.svg",
    problem: "Low customer engagement and satisfaction can hinder business success, especially in a competitive market.",
    solution: "SoothBOT, a chatbot solution designed to deliver real-time customer inquiries, personalized experiences, and multilingual support, enhancing customer engagement and satisfaction.",
    benefits: [
      ["24/7 Availability:", "SoothBOT provides round-the-clock customer support, ensuring that customers can access assistance whenever they need it, boosting satisfaction levels."],
      ["Higher Customer Satisfaction:", "By delivering personalized experiences and timely responses, SoothBOT enhances customer satisfaction, fostering loyalty and retention."],
      ["Insights from Customer Conversations:", "SoothBOT captures valuable insights from customer interactions, providing businesses with actionable data to improve products and services."],
    ],
  },
  {
    name: "SoothCanvas", logo: "668ff5d8d2de2a567e32e585_Sooth%20Canvas.svg",
    problem: "Creating compelling visual content can be challenging, especially for individuals lacking design skills, time, or resources.",
    solution: "SoothCanvas transforms text descriptions into stunning, original images and illustrations.",
    benefits: [
      ["Visualize Ideas Quickly:", "SoothCanvas empowers users to bring their ideas to life visually, accelerating the creative process and fostering innovation."],
      ["Generate Unique Visuals:", "With SoothCanvas, users can create custom visuals tailored to their needs, ensuring originality and relevance in their content."],
      ["No Design Skills Needed:", "Break free from design constraints with SoothCanvas. It makes visual content creation accessible to everyone, eliminating the need for advanced design skills."],
    ],
  },
  {
    name: "AskLegal", logo: "668ff5efd03ecdd1cf4283ca_Ask%20Legal.svg",
    intro: "Ask Legal is not just a powerful AI-driven legal assistance platform – it is a versatile, company-specific, and customizable tool designed to transform the way companies manage legal inquiries.",
    problem: "Enterprises struggle in efficiently managing legal consultations. Despite having a comprehensive Legal Intranet site, many basic inquiries remain unresolved due to language barriers and the complexity of legal information access. This situation underscores the need for an innovative solution to streamline legal support, ensuring all employees have timely access to accurate, up-to-date legal resources, company policies, and go-to-lawyer information, thereby enhancing overall legal compliance and efficiency.",
    how: ["Ask Legal is a secure, scalable platform built on the power of advanced Large Language Model (LLM) technology. The platform efficiently handles both unstructured and structured legal data, responding to queries in multiple languages while maintaining up-to-date information through automatic data synchronization. By leveraging cutting-edge technology, we ensure the highest levels of accuracy and security, supported by robust authentication, authorization, and auditing protocols."],
  },
];

const CASES: [string, string, string][] = [
  ["enterprise-chat-gpt-for-largest-system-supplier-for-food-beverage-and-pharmaceutical-sectors", "Enterprise ChatGPT for largest system supplier for food, beverage and pharmaceutical sectors", "668b8e62a230f7d65342688c_Enterprise-ChatGPT-for-Worlds-Largest-System-Supplier.png"],
  ["multilingual-legal-assistance-chatbot-for-largest-system-supplier-for-food-beverage-and-pharmaceutical-sectors", "Multilingual Legal Assistance Chatbot for largest system supplier for food, beverage and pharmaceutical sectors", "668b8e7230dd022d83fdb334_Multilingual-Legal-Assistance-Chatbot-for-Worlds-Largest-System-supplier-new.png"],
  ["fine-tuned-llm-based-information-extractor-for-fin-tech-company", "Fine Tuned LLM based Information Extractor for FinTech Company", "668b8e8a330799edcada1b91_fine-tuned-llm-based.png"],
  ["cognitive-automation-of-resume-assessment-candidate-review-for-a-recruitment-process-outsourcing-service-provider", "Cognitive Automation Of Resume Assessment & Candidate Review For A Recruitment Process Outsourcing Service Provider", "668b8e9c936fc27c295ab13b_Cognitive-Automation-of-Resume-assessment.png"],
  ["building-foundational-cloud-capabilities-and-explaining-customer-behaviors-for-a-large-furniture-manufacturer", "Investigating The Nature And Measuring The Degree Of Presence Of Confounding Characteristics Of Text Data", "668b8ec51ed93c70c49c3573_Investigating-the-nature.png"],
  ["mro-spare-parts-deduplication-for-a-multinational-chemical-manufacturer", "MRO Spare Parts Deduplication For A Multinational Chemical Manufacturer", "66aa7f45e21597998eb58d6c_Approvel-how-our-model-saves.jpg"],
  ["taking-action-to-reduce-incurred-claims-handling-costs-for-a-major-insurance-co", "Taking Action To Reduce Incurred Claims & Handling Costs For A Major Insurance Co.", "668b8f378027a8f3f52daacf_Auto_Claim_Payout.jpg"],
  ["fake-proof-of-purchase-detection-for-a-large-auto-service-provider", "Fake Proof Of Purchase Detection For A Large Auto Service Provider", "668b8ef52fd2fee2f20783b6_Fake_PoP_Detection.jpg"],
  ["ai-chatbot-for-customer-representatives-for-a-medical-insurance-provider", "AI Chatbot For Customer Representatives For A Medical Insurance Provider", "668b8f01a3377c3689562778_AI_Chatbot1.jpg"],
  ["understanding-emergency-call-specifics-using-technician-notes-for-a-leading-utility-company", "Understanding Emergency Call Specifics Using Technician Notes For A Leading Utility Company", "668b8f15e18e604c50ddd40e_Case_Studies_0006_Layer_10.jpg"],
  ["market-intelligence-mining-emails-and-finding-actual-customer-sentiment-for-a-large-manufacturing-firm", "Market Intelligence – Mining Emails And Finding Actual Customer Sentiment For A Large Manufacturing Firm", "668b8f0c380b9c2227f88869_case-study-thumbnail.jpg"],
  ["unstructured-report-analysis-for-a-leading-chemical-manufacturer", "Unstructured Report Analysis For A Leading Chemical Manufacturer", "668b8f24f0e722aa9ad9c848_Case_Studies_0008_Layer_8.jpg"],
];

const DEMOS: [string, string][] = [
  ["GenAI-for-Vehicle-Breakdown-SoothGPT-Soothsayer-Analytics.mp4", "GenAI for Vehicle Breakdown"],
  ["GenAI-Driven-State-Governance-SoothGPT-Soothsayer-Analytics.mp4", "GenAI-Driven State Governance"],
  ["Accelerating-Material-Development-Via-Knowledge-Mining-Hypothesis-Generation-SoothGPT.mp4", "Accelerating Material Development via Knowledge Mining & Hypothesis Generation"],
  ["Renewable-Energy-Project-Proposals-SoothGPT-Soothsayer-Analytics.mp4", "Optimizing Renewal Energy with GenAI"],
  ["Electricity-Law-SoothGPT-Soothsayer-Analytics.mp4", "Simplifying Regulatory Processes with GenAI"],
  ["GenAI-Driven-Optimization-for-Oil-&-Gas-Operations.mp4", "GenAI-Driven Optimization for Oil & Gas Operations"],
  ["GenAI-Powered-Customer-Data-Hub.mp4", "GenAI-Powered Customer Data Hub"],
  ["GenAI-Driven-RFP.mp4", "GenAI-Driven RFP Response & Budget Estimate Generation"],
  ["Aftermarket-Assistance.mp4", "Aftermarket Assistance"],
  ["GenAI-Powered-Claims.mp4", "GenAI-Powered Claims Analysis"],
  ["Optimizing-Industrial-Energy.mp4", "Optimizing Industrial Energy Usage via GenAI"],
  ["Transforming-Cardiovascular-Data.mp4", "Transforming Cardiovascular Data into Actionable Health Insights"],
  ["Enhancing-Supplier-Management.mp4", "Enhancing Supplier Management with GenAI"],
];

const PODCASTS = [
  { img: "66abda3b0447f507391c0b56_Dr.%20Soumitra%20Dutta.png", title: "AI, Personalized Learning, and the Future of Work", who: "Dr. Soumitra Dutta", role: "Dean, Saïd Business School, University of Oxford", href: "https://www.youtube.com/watch?v=krfml0ePDzU&list=PL-U2olRYqY_-f_Mnh7leX-ALjyVFzlksx&index=18" },
  { img: "66abd93873ec711fad58690f_Paul%20Bessire.png", title: "Sports Analytics: Beyond the Box Score", who: "Paul Bessire", role: "Chief Data Officer, Coterie Insurance", href: "https://youtu.be/RSIpfbiC8Ug" },
  { img: "66abd96024f90252f09514ec_Julian-Morris.png", title: "Al's Impact & The Regulatory Response", who: "Julian Morris", role: "Senior Fellow, Reason Foundation, Senior Scholar, ICLE", href: "https://youtu.be/esevuq0zR4M" },
  { img: "66abd9a4c05c521de43fb10b_Dr%20Lloyd%20Colegrove.png", title: "AI in Chemical Manufacturing", who: "Dr Lloyd Colegrove", role: "Director, Data Services & Fundamental Problem Solving, Dow Chemical (retired)", href: "https://youtu.be/i9s4V7prMOA" },
];


const BENEFIT_ICONS = ["bolt", "lock", "cursor", "database", "leaf", "puzzle", "link", "search"];

/** One labelled card inside a module panel. */
function Card({ icon, label, tone = "white", children }: { icon: string; label: string; tone?: "white" | "mist" | "brand"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[14px] border p-6 sm:p-7",
        tone === "white" && "border-line bg-white shadow-card",
        tone === "mist" && "border-line bg-mist",
        tone === "brand" && "border-brand/25 bg-brand-50",
      )}
    >
      <div className="flex items-center gap-3">
        <IconChip name={icon} className="size-10" />
        <h3 className="font-display text-xl font-semibold text-ink">{label}</h3>
      </div>
      <div className="mt-4 space-y-3 text-[16px] leading-[1.7] text-ink-soft">{children}</div>
    </div>
  );
}

function ModulePanel({ m }: { m: Mod }) {
  return (
    <div>
      {m.intro && <p className="mb-6 rounded-[14px] border-l-4 border-brand bg-brand-50 p-6 text-lg leading-[1.65] text-ink">{m.intro}</p>}
      <div className={cn("grid gap-5", m.benefits ? "lg:grid-cols-3" : "md:grid-cols-2")}>
        <Card icon="alert" label="Problem" tone="mist">{m.problem}</Card>
        {m.solution && <Card icon="bolt" label="Solution" tone="brand">{m.solution}</Card>}
        {m.how && <Card icon="seed" label="How it works" tone="brand">{m.how.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</Card>}
        {m.benefits && (
          <Card icon="check" label="Benefits">
            <ul className="space-y-4">
              {m.benefits.map(([h, b]) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Glyph name="check" className="size-3" />
                  </span>
                  <span><strong className="font-semibold text-ink">{h}</strong> {b}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}

function ModuleLabel({ m }: { m: Mod }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`${WF_BASE}${m.logo}`} alt={m.name} loading="lazy" className="h-9 w-auto max-w-full" />;
}

export default function SoothGPTPage() {
  return (
    <PageShell>
      <PageHero
        art={<BlueprintScene className="w-full" />}
        split
        animated
        title={<>SoothGPT is Your Gateway to<br />Advanced GenAI Solutions</>}
        sub="Unleash the Power of Large Language Models (LLMs) With SoothGPT, a Comprehensive Platform-as-a-Service Designed to Meet All Your GenAI Needs."
        cta={{ label: "Schedule a Consultation", href: LINKS.contact }}
        video={BANNER}
      />

      <ScrollSpyNav items={SUBNAV} ctaLast />

      {/* Intro */}
      <Section edge>
        <div className="max-w-4xl">
          <h2 className="h-section text-ink">SoothGPT is not just a powerful Gen AI platform</h2>
          <p className="mt-5 text-xl leading-[1.55] text-ink-soft sm:text-2xl">It is a versatile, industry-agnostic & customizable tool designed to transform the way companies work.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[16px] border border-line bg-mist p-7 sm:p-9">
            <IconChip name="alert" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Problem It Solves</h3>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-soft">Enterprises are not able to exploit the full potential of generative AI due to security concerns and the specialized knowledge needed to build effective Gen AI solutions.</p>
          </div>
          <div className="rounded-[16px] border border-brand/25 bg-brand-50 p-7 sm:p-9">
            <IconChip name="bolt" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink">How It Works</h3>
            <div className="mt-4 space-y-4 text-[17px] leading-[1.7] text-ink-soft">
              <p>SoothGPT is a secure, scalable platform built on the power of GenAI technology. The platform enables harnessing unstructured and structured data across various formats as well as generating new data.</p>
              <p>While leveraging state of the art technology, we offer the highest levels of security through robust authentication, authorization, and auditing protocols.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Key benefits */}
      <Section tone="mist" id="benefits">
        <Heading index="01">Key Benefits</Heading>
        <ul className="mt-12 grid gap-3 xs:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <li key={b} className="group relative flex min-h-[150px] flex-col justify-between gap-5 overflow-hidden rounded-[14px] border border-line bg-white p-4 shadow-card sm:min-h-[170px] sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift">
              <span aria-hidden className="absolute right-4 top-4 font-mono text-xs tracking-widest text-ink-mute">{String(i + 1).padStart(2, "0")}</span>
              <IconChip name={BENEFIT_ICONS[i]} />
              <span className="font-display text-[18px] font-semibold leading-snug text-ink sm:text-[19px]">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Modules */}
      <Section id="modules" beforeDark>
        <Heading index="02">Modules</Heading>
        <div className="mt-12">
          <FlowTabs
            id="modules"
            logoTabs
            labels={MODULES.map((m) => <ModuleLabel key={m.name} m={m} />)}
            panes={MODULES.map((m) => <ModulePanel key={m.name} m={m} />)}
          />
        </div>
      </Section>

      {/* About */}
      <Section tone="dark" edge>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -left-20 top-0 size-80 rounded-full bg-brand/15 blur-[100px]" /></div>
          <Heading index="03" dark>About Us</Heading>
          <ul className="relative mt-10 grid gap-4 sm:grid-cols-3">
            {[["2014", "Year founded"], ["Fortune 1000", "Enterprise clients served"], ["12+", "Countries with active work"]].map(([v, l]) => (
              <li key={l} className="rounded-[14px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6">
                <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">{v}</p>
                <p className="mt-2 text-base text-white/75">{l}</p>
              </li>
            ))}
          </ul>
          <div className="relative mt-6 grid gap-6 md:grid-cols-2">
            <p className="rounded-[14px] border border-white/10 bg-white/[0.04] p-7 text-[17px] leading-[1.75] text-white/85">Founded in 2014, Soothsayer Analytics delivers AI solutions to Fortune 1000 and mid-market leaders. Our Data Scientists & Engineers specialize in developing user-centric AI systems for Pattern Recognition, Predictive Analytics, Computer Vision, NLP/GenAI, and IIoT.</p>
            <p className="rounded-[14px] border border-white/10 bg-white/[0.04] p-7 text-[17px] leading-[1.75] text-white/85">Beyond providing cutting-edge tools, we offer strategic advisory services and specialized AI training to align with your unique operational needs and empower your team. Soothsayer Analytics is more than an AI provider—we are a strategic partner driving efficiency, innovation, and competitive advantage.</p>
          </div>
        </div>
      </Section>

      {/* Case studies */}
      <Section id="case-studies" edge>
        <Heading index="04">Case Studies</Heading>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map(([slug, title, img]) => (
            <li key={slug}>
              <a href={`${CASE}${slug}`} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="block overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${CASE_IMG}${img}`} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="line-clamp-4 font-display text-lg font-semibold leading-snug text-ink">{title}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-[#007a96]">Read More <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* Demos */}
      <Section tone="mist" id="demos">
        <Heading index="05">Demos</Heading>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map(([file, title]) => (
            <li key={file} className="overflow-hidden rounded-[14px] border border-line bg-white shadow-card">
              <video controls preload="metadata" playsInline className="aspect-video w-full bg-[linear-gradient(135deg,#0d2530,#0e5262)] object-cover">
                {/* #t=0.5 makes the browser paint a preview frame instead of a black box */}
                <source src={`${COM_VIDEO}${file}#t=0.5`} type="video/mp4" />
              </video>
              <p className="p-5 font-display text-lg font-semibold leading-snug text-ink">{title}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Podcasts */}
      <Section id="podcasts">
        <Heading index="06">Podcasts</Heading>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PODCASTS.map((p) => (
            <li key={p.who}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block h-full overflow-hidden rounded-[14px] border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${CASE_IMG}${p.img}`} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                <span className="block p-5">
                  <span className="block font-display text-lg font-semibold leading-snug text-ink">{p.title}</span>
                  <span className="mt-3 block border-t border-dashed border-line pt-3 font-medium text-ink">{p.who}</span>
                  <span className="block text-[15px] leading-snug text-ink-soft">{p.role}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <GlobalPresence
        title="Our global presence"
        paras={["Soothsayer Analytics has a global presence, providing advanced Data Science & AI solutions to Fortune 1000 & Global 2000 companies in over a dozen countries."]}
      />
      <ContactBand title="Schedule a consultation" />
    </PageShell>
  );
}
