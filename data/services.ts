/**
 * Copy for the Services hub and its eight service pages, from
 * "Soothsayer Website - Services Pages Content" (11-25-2026). Text is verbatim;
 * layout lives in components/services/. Section order follows the document.
 */

export type Card = { title: string; text: string; href?: string };
export type Step = { label: string; text: string };
export type Faq = { q: string; a: string };
export type Story = { name: string; text: string };
export type Quote = { role: string; company: string; quote: string };

export type ArtKey =
  | "hub" | "strategy" | "leadership" | "caio" | "proof" | "embedded" | "managed" | "capability" | "research";

export type ServicePage = {
  slug: string;
  nav: string;
  name: string;
  /** Breadcrumb parent between "Services" and this page (the CAIO page sits under Fractional AI Leadership). */
  parent?: { name: string; slug: string };
  icon: string;
  art: ArtKey;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subhead: string;
  body: string;
  cta: string;
  when: string[];
  /** Heading of the "what you get" block differs per page ("Roles we fill", "What your CAIO owns"...). */
  getHeading: string;
  get: Card[];
  how: {
    heading: string;
    intro?: { before: string; link: { text: string; href: string }; after: string };
    steps: Step[];
    closing?: string;
  };
  options?: { heading: string; items: Card[] };
  stories: Story[];
  quotes?: Quote[];
  faqs: Faq[];
  related: { services: string[]; capabilities: string[] };
  closing: { heading: string; button: string };
};

export const SERVICES_BASE = "/services";
export const serviceHref = (slug: string) => `${SERVICES_BASE}/${slug}`;

/** Capability slugs by the display names the document uses in its "Related" lines. */
export const CAPABILITY_BY_NAME: Record<string, string> = {
  "AI Strategy & Transformation": "ai-strategy-transformation",
  "Data & AI Foundations": "data-ai-foundations",
  "GenAI Solutions": "generative-ai-solutions",
  "Agentic AI & Multi-Agent Systems": "agentic-ai",
  "AI Reliability Engineering & LLMOps": "ai-reliability-llmops",
  "Responsible AI & Governance": "responsible-ai-governance",
};
const cap = (...names: string[]) => names.map((n) => CAPABILITY_BY_NAME[n]);

/* ------------------------------------------------------------- hub --- */

export const HUB = {
  metaTitle: "AI Consulting Services | Soothsayer Analytics",
  metaDescription:
    "AI strategy and roadmaps, fractional AI leadership, proof of value builds, embedded engineering teams, managed AI services and AI capability building, from one team that builds and runs AI in production.",
  h1: "Senior AI leadership and delivery from one team.",
  subhead: "Plan where AI will pay off, put someone in charge of it, and build and run it in production with the same team.",
  body: "Most AI pilots never reach production or show up in the P&L. The usual causes are ownership, data, workflow change and support after launch. We cover all four, and the people who advise you stay with the work through delivery.",
  cta: "Book a 30-minute call",
  secondaryCta: "See where to start",
  stages: {
    heading: "From strategy to scale.",
    intro: "Each service maps to a stage of an AI program. A fractional AI leader can own the work across every stage.",
    items: [
      { stage: "Discover", line: "Decide where AI pays off and in what order.", services: ["ai-strategy-roadmap"] },
      { stage: "Build", line: "Prove value on your own data.", services: ["proof-of-value"] },
      { stage: "Deploy and Automate", line: "Put systems and agents into daily use.", services: ["embedded-delivery-team"] },
      { stage: "Scale", line: "Keep systems working and grow your own team.", services: ["ai-managed-services", "ai-capability-building"] },
    ],
    across: {
      stage: "Across every stage",
      line: "One senior leader who owns AI from start to finish.",
      services: ["ai-leadership", "fractional-chief-ai-officer"],
    },
    note: "Applied AI R&D sits outside this path and is listed with the other services below.",
  },
  ways: {
    heading: "Ways to work with us.",
    intro:
      "Start with a strategy and roadmap, add senior AI leadership, build and run systems in production, and build your own team's capability. Each service works on its own or alongside the others.",
    items: [
      { slug: "ai-strategy-roadmap", duration: "From 3 weeks", line: "Decide where AI will pay off and what to do first.", points: ["Ranked use case portfolio", "Data readiness review", "AI use and risk inventory", "Roadmap and business cases"] },
      { slug: "ai-leadership", duration: "Monthly", line: "Fractional and interim AI roles that fill a specific gap in your team.", points: ["Fractional CTO", "AI Transformation Office lead", "AI Product Owner", "AI Governance Lead"] },
      { slug: "fractional-chief-ai-officer", duration: "90-day mandate", line: "A senior AI leader on your leadership team, part time, backed by our delivery team.", points: ["AI roadmap and portfolio", "Governance and policy", "Build, buy and vendor calls", "Value tracking and board reporting"] },
      { slug: "proof-of-value", duration: "From 12 weeks", line: "A working system on your data, measured against a baseline you agree up front.", points: ["Agreed success criteria", "Working build on real data", "Measured results", "Costed production plan"] },
      { slug: "embedded-delivery-team", duration: "Monthly", line: "Our engineers and data scientists working inside your teams to build and ship AI.", points: ["Team shaped to the work", "Two-week release cycles", "Built on your cloud and tools", "Knowledge transfer"] },
      { slug: "ai-managed-services", duration: "Monthly", line: "Hypercare, support, monitoring and improvement for AI systems after go-live.", points: ["Hypercare after launch", "Support and maintenance", "Accuracy and cost monitoring", "Continuous improvement"] },
      { slug: "ai-capability-building", duration: "Half day to multi-month", line: "The skills, structure and team to run AI on your own.", points: ["AI maturity assessment", "Operating model and center of excellence", "Executive and team training", "Adoption support"] },
      { slug: "applied-ai-research", duration: "Project", line: "Co-development of new AI products and IP, with ownership agreed up front.", points: ["Feasibility studies", "Prototypes", "Product engineering", "IP and ownership terms"] },
    ],
  },
  start: {
    heading: "Three ways to start",
    items: [
      { title: "A 30-minute call", text: "Talk through your priorities with a senior AI lead. No preparation needed.", button: "Book a call", href: "booking" },
      { title: "An AI Opportunity Assessment", text: "A fixed-scope, 3 to 4 week review that ends with a ranked plan and a clear first step.", button: "Scope an assessment", href: "/services/ai-strategy-roadmap" },
      { title: "A Fractional CAIO conversation", text: "For companies that need someone to own AI at the leadership table.", button: "Talk about AI leadership", href: "booking" },
    ],
  },
  proof: {
    heading: "Proof",
    figures: [
      { value: "$150 Mn+", label: "procurement impact" },
      { value: "70%", label: "manual process reduction" },
      { value: "25,000+", label: "leaders and professionals trained" },
    ],
    stories: [
      { name: "HUD-insured healthcare lender.", text: "As fractional CTO, Soothsayer mapped the loan origination workflow and led the build of AI drafting for third-party review reports, now used by analysts on live deals." },
      { name: "Global manufacturing group.", text: "Invoice processing automated from inbound document to ERP entry, with low-confidence extractions routed to a person for review." },
      { name: "Fortune 500 chemical manufacturer.", text: "Opportunity assessment across furnace and quench tower operations, sequenced into an optimization program." },
    ] as Story[],
  },
  split: {
    services: { title: "Services: how we engage.", text: "The ways to work with us, from a first assessment to ongoing support." },
    capabilities: { title: "Capabilities: what we build.", text: "The systems we design and run, from data foundations to agentic AI.", link: "Explore capabilities" },
  },
  faqs: [
    {
      q: "We do not have an AI strategy yet. Where should we start?",
      a: "Most companies in that position start with the AI Opportunity Assessment, the first step of our AI Strategy and Roadmap service. In 3 to 4 weeks you get a ranked list of opportunities, a view of your data and a 90-day plan. If you also need someone to own AI going forward, the assessment can be the first step of a Fractional Chief AI Officer mandate.",
    },
    {
      q: "Can we use you for only part of the journey?",
      a: "Yes. Each service stands on its own. Some clients bring us in only to plan, some only to build, and some to support a system their own team built.",
    },
    {
      q: "What size of company do you work with?",
      a: "Our clients range from Fortune 500 manufacturers to mid-sized lenders and distributors. We size each engagement to the problem and the budget.",
    },
    {
      q: "Will our data leave our environment?",
      a: "No. We work inside your cloud tenancy on Azure, AWS or Google Cloud, under your security and access rules.",
    },
  ] as Faq[],
  closing: { heading: "Tell us where AI is stuck in your business.", button: "Book a 30-minute call" },
};

/* ----------------------------------------------------------- pages --- */

export const SERVICE_PAGES: ServicePage[] = [
  /* ------------------------------------------------------------ 1 --- */
  {
    slug: "ai-strategy-roadmap",
    nav: "AI Strategy and Roadmap",
    name: "AI Strategy and Roadmap",
    icon: "map",
    art: "strategy",
    metaTitle: "AI Strategy and Roadmap Consulting | Soothsayer Analytics",
    metaDescription:
      "Decide where AI will pay off and in what order. Start with a fixed-scope, 3 to 4 week AI Opportunity Assessment or a full AI strategy and roadmap engagement.",
    h1: "Know where AI will pay off before you invest.",
    subhead: "An AI strategy and roadmap built on your processes, your data and your numbers, starting with a fixed-scope assessment.",
    body: "We interview the people who own the decisions, review the data behind each idea and take stock of the AI tools already in use. You get a ranked portfolio of use cases, a view of data readiness and a roadmap with owners, business cases and decision points.",
    cta: "Scope an assessment",
    when: [
      "The board has asked for an AI plan and nobody owns the answer",
      "You have a long list of AI ideas and no shared way to rank them",
      "Teams are buying AI tools on their own and nobody has the full picture",
      "A vendor is pitching a platform and you want an independent view first",
      "You are not sure your data can support what is being proposed",
    ],
    getHeading: "What you get",
    get: [
      { title: "Ranked opportunity portfolio", text: "Each candidate use case is scored on business value, data readiness, delivery effort and how much work changes for the people involved. Value is tied to a revenue, cost or risk line your finance team recognizes." },
      { title: "Data and systems readiness", text: "For the top candidates, we profile the data they depend on, check quality and access, and list the foundation work needed before a build can start." },
      { title: "AI use and risk inventory", text: "A list of the AI tools and models already in use across the business, who uses them, what data they touch and where the risks sit." },
      { title: "Roadmap and business cases", text: "A sequenced roadmap with owners, business cases and decision points, a recommended first Proof of Value with success criteria, and a working session with your leadership team." },
    ],
    how: {
      heading: "How the assessment works",
      intro: {
        before: "Idea intake and scoring use the same AI-assisted method described on our ",
        link: { text: "AI Strategy & Transformation", href: "/capabilities/ai-strategy-transformation" },
        after: " page, so our team spends its time on judgment and data.",
      },
      steps: [
        { label: "Week 1: Discover", text: "Leadership and process-owner interviews, idea intake, access to data and systems." },
        { label: "Week 2: Assess", text: "Data profiling for the top candidates, inventory of current AI use, value sizing." },
        { label: "Week 3: Prioritize", text: "Scoring, sequencing and a draft plan reviewed with your sponsor." },
        { label: "Week 4: Decide", text: "Executive readout and agreement on the first Proof of Value." },
      ],
    },
    options: {
      heading: "Engagement options",
      items: [
        { title: "AI Opportunity Assessment", text: "3 to 4 weeks, fixed scope. Ranked portfolio, data readiness review, AI use inventory, 90-day plan and an executive readout. The usual first step." },
        { title: "Full AI Strategy and Roadmap", text: "For companies that need a complete strategy: business cases for each priority, AI operating model and governance, funding plan and a multi-year roadmap." },
        { title: "Ongoing roadmap ownership", text: "A Fractional Chief AI Officer who owns the roadmap after it is written, keeps it current and reports progress to leadership.", href: "/services/fractional-chief-ai-officer" },
      ],
    },
    stories: [
      { name: "PE-backed trailer components manufacturer.", text: "Use case portfolio built across customer churn, invoice processing and tariff exposure, then sequenced into a multi-year program." },
      { name: "Fortune 500 chemical manufacturer.", text: "Opportunity assessment across furnace and quench tower operations, sequenced into an optimization program." },
      { name: "Global manufacturing group.", text: "AI-guided idea intake so improvement ideas from every plant are scored on the same criteria." },
    ],
    faqs: [
      { q: "How is this different from your AI Strategy & Transformation capability?", a: "The capability page describes how we do strategy work. This page describes how you can buy it, starting with a fixed-scope assessment." },
      { q: "What do you need from us?", a: "A sponsor, short interviews with the people who own the main processes, and read access to the data behind the top candidates. We keep the time asked of your team low and agree the schedule in week one." },
      { q: "Are the scope and fee fixed?", a: "For the assessment, yes. Scope, fee and timeline are agreed before we start. A full strategy engagement is scoped after the assessment, based on what it finds." },
      { q: "Do we have to use you for the build?", a: "No. The roadmap is written so your own team or another firm can carry it out." },
      { q: "What if AI is not the right answer yet?", a: "Then the roadmap says so, and lists what needs to be in place first. That is a useful result." },
    ],
    related: { services: ["fractional-chief-ai-officer", "proof-of-value", "ai-capability-building"], capabilities: cap("AI Strategy & Transformation", "Data & AI Foundations") },
    closing: { heading: "Find out which AI ideas are worth funding.", button: "Scope an assessment" },
  },

  /* ------------------------------------------------------------ 2 --- */
  {
    slug: "ai-leadership",
    nav: "Fractional AI Leadership",
    name: "Fractional AI Leadership",
    icon: "flag",
    art: "leadership",
    metaTitle: "Fractional and Interim AI Leadership | Soothsayer Analytics",
    metaDescription:
      "Fractional Chief AI Officer, fractional CTO, AI transformation office and AI governance leads for companies that need AI leadership without a full-time executive hire.",
    h1: "Senior AI leadership, when and where you need it.",
    subhead: "Fractional and interim AI roles that fill a specific gap in your leadership team, backed by a delivery team that can build what they recommend.",
    body: "A full-time AI executive is a large commitment, and many companies do not yet know what the role should cover. Our leaders join for a defined mandate, own clear outcomes and hand over to your team or a permanent hire when the time is right.",
    cta: "Talk about AI leadership",
    when: [
      "AI sits with the CIO or CTO on top of everything else, and nobody owns it end to end",
      "Several AI efforts are running with no common priorities, budget or tracking",
      "You need to show the board an AI plan within a quarter",
      "You are weighing a full-time AI executive and are not sure what the role should be",
      "A vendor decision is coming up and you want independent technical judgment",
    ],
    getHeading: "Roles we fill",
    get: [
      { title: "Fractional Chief AI Officer", text: "Owns the AI roadmap, governance, vendor decisions and value tracking as part of your leadership team.", href: "/services/fractional-chief-ai-officer" },
      { title: "Fractional CTO for AI-led businesses", text: "For companies without a technology leader where AI is becoming central to operations. Sets technology direction, manages vendors and directs delivery." },
      { title: "AI Transformation Office Lead", text: "Runs the AI program across business units, with one intake, one set of priorities and one way of tracking value." },
      { title: "Fractional AI Product Owner", text: "Owns an AI system after launch: adoption, user feedback, KPIs and the improvement backlog." },
      { title: "AI Governance Lead", text: "Sets AI policy, runs risk reviews and puts in place the inventory and controls described on our Responsible AI & Governance capability page." },
      { title: "Independent AI Advisor", text: "Vendor-neutral judgment on platform and vendor choices, or on the AI claims of a company you plan to acquire." },
    ],
    how: {
      heading: "How it works",
      steps: [
        { label: "Defined mandate", text: "Every role starts with a written mandate: the outcomes, the decisions the role owns, the time commitment and how success is measured." },
        { label: "Backed by a team", text: "Our leaders draw on Soothsayer engineers, data scientists and the AuGENT platform, so recommendations can be tested and built quickly." },
        { label: "Planned exit", text: "Each mandate ends in renewal, a step down to an advisory role, or handover to a permanent hire we help you define and interview." },
      ],
    },
    stories: [
      { name: "HUD-insured healthcare lender.", text: "As fractional CTO, Soothsayer mapped the loan origination workflow, led AI drafting of third-party review reports now used by analysts on live deals, built structured capture of deal data and offered vendor-neutral input on a competing platform." },
    ],
    faqs: [
      { q: "What does fractional mean in practice?", a: "A set number of days a month, agreed in the mandate. Your leader joins your meetings and messaging channels and is accountable for the outcomes in the mandate." },
      { q: "How is this different from hiring a consultant?", a: "A consultant delivers recommendations. A fractional leader owns decisions and results over time, sits in your leadership meetings and is measured against agreed KPIs." },
      { q: "Will you push us to buy Soothsayer services?", a: "The mandate states which decisions the leader owns. On build and vendor choices, we set out the options, including ones that do not involve us, and you decide." },
      { q: "Can the role become permanent?", a: "A fractional mandate is a good way to learn what a permanent role should cover. When you are ready to hire, we help write the job description, interview candidates and hand over." },
    ],
    related: { services: ["fractional-chief-ai-officer", "ai-strategy-roadmap", "ai-capability-building"], capabilities: cap("AI Strategy & Transformation", "Responsible AI & Governance") },
    closing: { heading: "Tell us where AI leadership is missing.", button: "Talk about AI leadership" },
  },

  /* ------------------------------------------------------------ 3 --- */
  {
    slug: "fractional-chief-ai-officer",
    nav: "Fractional Chief AI Officer",
    name: "Fractional Chief AI Officer",
    parent: { name: "Fractional AI Leadership", slug: "ai-leadership" },
    icon: "award",
    art: "caio",
    metaTitle: "Fractional Chief AI Officer (CAIO) Services | Soothsayer Analytics",
    metaDescription:
      "A senior AI leader on your leadership team part time. Owns your AI roadmap, governance and vendor decisions, backed by a team that builds and runs AI in production.",
    h1: "A Chief AI Officer, part time, backed by a delivery team.",
    subhead: "A senior Soothsayer AI leader joins your leadership team, owns your AI roadmap and governance, and directs delivery through to production.",
    body: "You get executive ownership of AI without the cost and delay of a full-time hire. Your fractional CAIO sets priorities, makes build and buy calls, sets policy, tracks value and reports to the board. When something needs building, our engineers are already in place.",
    cta: "Book a CAIO conversation",
    when: [
      "AI is on the board agenda and nobody on the leadership team owns it",
      "Pilots keep starting and none reach production",
      "Business units are buying AI tools separately and the total cost is hard to see",
      "Private equity owners or investors want an AI value plan",
      "You want to define the role before hiring a full-time AI executive",
    ],
    getHeading: "What your CAIO owns",
    get: [
      { title: "AI roadmap and portfolio", text: "A ranked, funded portfolio of AI initiatives tied to business targets, reviewed monthly with a steering group your CAIO chairs." },
      { title: "Governance and policy", text: "An AI policy, an inventory of systems in use and controls matched to risk, so legal and risk teams can approve deployments." },
      { title: "Build, buy and vendor decisions", text: "Independent evaluation of platforms and vendors, and clear calls on what to build, what to buy and what to stop." },
      { title: "Value tracking and board reporting", text: "KPIs for every initiative, measured against a baseline, with regular updates to leadership and the board." },
    ],
    how: {
      heading: "Your first 90 days",
      steps: [
        { label: "Days 1 to 30: Discover", text: "Leadership interviews, process and data review, inventory of current AI use, two or three quick wins identified." },
        { label: "Days 31 to 60: Plan", text: "Prioritized roadmap with business cases, AI policy and governance model, first Proof of Value scoped." },
        { label: "Days 61 to 90: Deliver", text: "First use case in build, KPI tracking live, team and hiring plan agreed." },
      ],
      closing: "After 90 days, the mandate renews quarterly.",
    },
    options: {
      heading: "Engagement options",
      items: [
        { title: "Advisor", text: "A few days a month. Strategy, governance and board reporting." },
        { title: "Embedded", text: "One to two days a week. Owns roadmap, governance and vendor decisions with your leadership team." },
        { title: "Embedded plus delivery", text: "The embedded CAIO plus a Soothsayer build team on a monthly retainer, for companies that want leadership and execution together." },
      ],
    },
    stories: [
      { name: "HUD-insured healthcare lender.", text: "Soothsayer has served as fractional CTO since 2025. AI drafting of third-party review reports moved from discovery to use by analysts on live deals, followed by structured capture of deal data into a database." },
    ],
    faqs: [
      { q: "How much time does a fractional CAIO spend with us?", a: "It depends on the option, from a few days a month to two days a week. The commitment is written into the mandate, and you can change options at each quarterly renewal." },
      { q: "Who will our CAIO be?", a: "A senior Soothsayer leader with experience delivering AI in production, matched to your industry and priorities. You meet them before the mandate starts." },
      { q: "How is it priced?", a: "A fixed monthly fee for each option, agreed up front. Build work is scoped separately or included in the Embedded plus delivery option." },
      { q: "What happens to our data and IP?", a: "Systems are deployed in your own cloud environment. IP ownership is set out in the agreement before work starts." },
      { q: "What if we later hire a full-time CAIO?", a: "We help define the role and interview candidates, then hand over the roadmap, governance and portfolio in a planned transition." },
    ],
    related: { services: ["ai-leadership", "ai-strategy-roadmap", "embedded-delivery-team"], capabilities: cap("AI Strategy & Transformation", "Responsible AI & Governance") },
    closing: { heading: "Put an experienced leader in charge of AI this quarter.", button: "Book a CAIO conversation" },
  },

  /* ------------------------------------------------------------ 4 --- */
  {
    slug: "proof-of-value",
    nav: "Proof of Value",
    name: "Proof of Value",
    icon: "target",
    art: "proof",
    metaTitle: "AI Proof of Value: Pilot to Production Decision | Soothsayer Analytics",
    metaDescription:
      "An engagement of 12 weeks or more that builds a working AI system on your data, measures it in real use against an agreed baseline and ends with a production plan.",
    h1: "Prove AI value on your own data and workflow.",
    subhead: "A build of 12 weeks or more that tests one use case on real data with real users, measured against a baseline you agree up front.",
    body: "Many pilots run on clean samples, impress in a demo and then stall. A Proof of Value runs on your actual data and inside your workflow, with success criteria agreed before we start. At the end you have measured results, a working system and a costed plan for production.",
    cta: "Scope a Proof of Value",
    when: [
      "You have picked a use case and need evidence before funding a full rollout",
      "A previous pilot impressed in a demo and never reached daily use",
      "Leadership wants a measured result before approving more AI spend",
      "You need to compare a custom build with an off-the-shelf product",
    ],
    getHeading: "What you get",
    get: [
      { title: "Agreed success criteria", text: "Baseline, target and how results will be measured, signed off by the business owner before the build starts." },
      { title: "Working system", text: "Built on your data, connected to the systems the workflow depends on where access allows, and used by a small group of real users." },
      { title: "Measured results", text: "Accuracy, time saved or cost impact against the baseline, reported with the test cases so your team can check them." },
      { title: "Production plan", text: "What it takes to run the system at scale, covering integration, security, support, running cost and timeline, with a clear recommendation to scale, adjust or stop." },
    ],
    how: {
      heading: "How it works",
      steps: [
        { label: "Weeks 1 to 3: Scope, access and baseline", text: "Confirm the use case, users and success criteria. Secure data access and security approvals. Measure the current process." },
        { label: "Weeks 4 to 9: Build and test", text: "Short build cycles with a demo every week. Real users try it on real cases and their feedback shapes each release." },
        { label: "Weeks 10 to 12: Measure in real use and decide", text: "The system runs on live work. Results against the baseline, production plan and a decision meeting with your sponsor." },
      ],
    },
    stories: [
      { name: "HUD-insured healthcare lender.", text: "AI drafting of third-party review report sections, checked figure by figure against the source reports on test properties before moving into live-deal use." },
      { name: "Global manufacturing group.", text: "Invoice processing automated from inbound document to ERP entry, with low-confidence extractions routed to a person." },
      { name: "Large manufacturing group.", text: "Sales order processing automated from incoming orders to system entry." },
    ],
    faqs: [
      { q: "Why does it take at least 12 weeks?", a: "Getting data access and security approvals, building on real data and measuring results in real use each take time. Shorter pilots usually show that a demo works, not that the business benefits. More complex use cases can take longer, and we agree the timeline in the first weeks." },
      { q: "Which use cases suit a Proof of Value?", a: "Ones with a clear business owner, a measurable baseline and data you can give us access to. Document processing, forecasting, agent-assisted workflows and knowledge assistants are common examples." },
      { q: "Will the work be thrown away afterwards?", a: "We build on the architecture we would use in production, so most of what we build carries forward if the result is positive." },
      { q: "What if the results fall short?", a: "You get the measured results and the reasons. Sometimes the fix is data, sometimes scope, and sometimes the right call is to stop. Either way, the decision rests on evidence." },
      { q: "Does our data leave our environment?", a: "No. We deploy in your cloud tenancy and model calls route through your own endpoints." },
    ],
    related: { services: ["ai-strategy-roadmap", "embedded-delivery-team", "ai-managed-services"], capabilities: cap("GenAI Solutions", "Agentic AI & Multi-Agent Systems", "Data & AI Foundations") },
    closing: { heading: "Pick one use case and test it on your own data.", button: "Scope a Proof of Value" },
  },

  /* ------------------------------------------------------------ 5 --- */
  {
    slug: "embedded-delivery-team",
    nav: "Embedded Delivery Team",
    name: "Embedded Delivery Team",
    icon: "users",
    art: "embedded",
    metaTitle: "Embedded AI Engineering Teams | Soothsayer Analytics",
    metaDescription:
      "AI engineers and data scientists who work inside your teams to build, ship and improve AI systems on your data and cloud.",
    h1: "AI engineers who work inside your business.",
    subhead: "A cross-functional Soothsayer team that joins your business and technology teams to build, ship and improve AI systems on your data and cloud.",
    body: "AI systems often struggle after the demo, when they meet messy data, undocumented workflows and real users. Our engineers sit close to the people doing the work, learn the process first-hand and ship in short cycles. Your team learns alongside them, so the capability stays when we step back.",
    cta: "Talk to an engineering lead",
    when: [
      "You have an AI roadmap and not enough people to deliver it",
      "Your data team is strong on reporting and new to production AI",
      "Several use cases share the same data, platform and integration work",
      "You need a team that can start within weeks",
    ],
    getHeading: "What you get",
    get: [
      { title: "A team shaped to the work", text: "An engagement lead with data scientists, AI and data engineers and a solution architect as needed, adjusted as the work changes." },
      { title: "Delivery in short cycles", text: "Two-week release cycles, a weekly demo and a backlog that your product owner controls." },
      { title: "Built on your stack", text: "Work runs in your cloud and tools under your security and access rules. Where it speeds things up, we deploy the AuGENT platform inside your environment." },
      { title: "Knowledge transfer", text: "Documentation, pairing with your engineers and a planned handover, so your team can run and extend what we build." },
    ],
    how: {
      heading: "How it works",
      steps: [
        { label: "Mobilize (first two weeks)", text: "Agree the backlog, access and team shape, and ship a first small release." },
        { label: "Deliver", text: "Two-week cycles against the roadmap, with progress and value reported monthly." },
        { label: "Transition", text: "Handover to your team, or a move into AI Managed Services." },
      ],
    },
    stories: [
      { name: "PE-backed trailer components manufacturer.", text: "Invoice processing and tariff exposure detection built as part of a sequenced AI program." },
      { name: "Auto glass repair and replacement company.", text: "Training pipeline automated so part prediction models retrain on new data without manual work." },
      { name: "HUD-insured healthcare lender.", text: "Report drafting and deal data capture built and extended vendor by vendor while analysts used the system on live deals." },
    ],
    faqs: [
      { q: "How is this different from staff augmentation?", a: "We take responsibility for the delivery outcomes agreed in the backlog, bring our own engineering standards and leadership, and work as one team with yours." },
      { q: "Can you work with our existing vendors and platforms?", a: "Yes. We work with the cloud, data platform and model licenses you already have." },
      { q: "How large is a typical team?", a: "We size the team to the backlog. A small team with a clear first release is usually the best start, and it can grow once the work is proven." },
      { q: "Who owns the code?", a: "Ownership is set out in the agreement before work starts." },
    ],
    related: { services: ["proof-of-value", "ai-managed-services", "fractional-chief-ai-officer"], capabilities: cap("Data & AI Foundations", "GenAI Solutions", "Agentic AI & Multi-Agent Systems") },
    closing: { heading: "Add a team that has shipped AI in production.", button: "Talk to an engineering lead" },
  },

  /* ------------------------------------------------------------ 6 --- */
  {
    slug: "ai-managed-services",
    nav: "AI Managed Services",
    name: "AI Managed Services",
    icon: "refresh",
    art: "managed",
    metaTitle: "AI Managed Services and Support | Soothsayer Analytics",
    metaDescription:
      "Hypercare, support, monitoring and continuous improvement for AI systems in production, covering accuracy, drift, usage and cost.",
    h1: "Keep your AI systems accurate after go-live.",
    subhead: "Hypercare, support, monitoring and steady improvement for AI systems in production, whether we built them or someone else did.",
    body: "AI systems change after launch. Documents change format, prompts drift, models are updated and costs move with usage. We watch accuracy, cost and usage, fix what breaks and keep improving the system against the KPIs agreed at launch. You get a monthly report on how it performed.",
    cta: "Talk to us about support",
    when: [
      "A system is live and nobody is clearly responsible for its accuracy",
      "Model or token costs are growing faster than usage",
      "A model update changed outputs and you found out from users",
      "Your team built a pilot and does not have the capacity to run it",
    ],
    getHeading: "What you get",
    get: [
      { title: "Hypercare", text: "Close support for the first three months after go-live, with fast fixes, tuning on real usage and weekly check-ins." },
      { title: "Support and maintenance", text: "A support plan, typically for 12 months, with a monthly hours allowance, agreed response times and a single point of contact." },
      { title: "Monitoring", text: "Accuracy, drift, usage, response time and cost tracked against thresholds, with alerts before users notice a problem." },
      { title: "Continuous improvement", text: "Prompt, model and data updates, new document types or vendors, and small enhancements from the backlog." },
    ],
    how: {
      heading: "How it works",
      steps: [
        { label: "Onboard", text: "For systems we did not build, a short review of architecture, code, data and current performance before support starts." },
        { label: "Run", text: "Monitoring, fixes and improvements within the monthly allowance." },
        { label: "Review", text: "A monthly report and a quarterly review of KPIs, cost and the improvement backlog." },
      ],
    },
    stories: [
      { name: "HUD-insured healthcare lender.", text: "Ongoing support and refinement after go-live, extending AI report drafting to additional appraisal and property-condition report vendors." },
    ],
    faqs: [
      { q: "Do you support systems built by other firms?", a: "Yes. We start with a short review so we know what we are taking on, then agree the support plan." },
      { q: "Can you host the system for us?", a: "Yes. We can run it in your cloud or host it in Soothsayer's Azure environment." },
      { q: "How is support priced?", a: "A monthly fee with an hours allowance, and an agreed rate for work beyond it." },
      { q: "What does the monthly report show?", a: "Accuracy against target, usage, cost, incidents and the changes made that month." },
    ],
    related: { services: ["embedded-delivery-team", "proof-of-value", "ai-leadership"], capabilities: cap("AI Reliability Engineering & LLMOps", "Responsible AI & Governance") },
    closing: { heading: "Make sure your AI systems keep working.", button: "Talk to us about support" },
  },

  /* ------------------------------------------------------------ 7 --- */
  {
    slug: "ai-capability-building",
    nav: "AI Capability Building",
    name: "AI Capability Building",
    icon: "cap",
    art: "capability",
    metaTitle: "AI Capability Building and Training | Soothsayer Analytics",
    metaDescription:
      "Build the skills, operating model and team to run AI on your own. AI maturity assessment, center of excellence setup, executive and team training, and adoption support.",
    h1: "Build the AI capability to lead on your own.",
    subhead: "Skills, operating model and team structure so your organization can run and grow AI without depending on outside firms, including us.",
    body: "Lasting results from AI come from people who know how to choose, build, govern and use it in their own work. We assess where your organization stands, set up the team and operating model to run AI, and train leaders and staff. More than 25,000 leaders and professionals have trained with us.",
    cta: "Plan your capability program",
    when: [
      "Your AI work depends on one or two people, or on outside firms",
      "Teams use AI tools at work without guidance or a policy",
      "Leadership needs a shared understanding of AI before setting priorities",
      "You want to set up an AI center of excellence or an internal AI team",
      "A new AI system is going live and you need people to trust and use it",
    ],
    getHeading: "What you get",
    get: [
      { title: "AI maturity assessment", text: "Where you stand on strategy, data, skills, governance and adoption, measured against our Digital Competency Framework, with the gaps ranked by impact." },
      { title: "Operating model and center of excellence", text: "Roles, decision rights, intake and funding for AI work, and the setup of a small central team that supports the business units." },
      { title: "Talent plan", text: "Which roles to hire, which to grow internally and how to structure the team, with job descriptions and help with interviews." },
      { title: "Training programs", text: "Executive and board sessions, role-based upskilling for business teams, and hands-on technical courses on GenAI, agents, evaluation and running AI in production." },
      { title: "Adoption support", text: "Champions networks, guides and floor support when a new AI system launches, plus usage reporting to show where help is needed." },
    ],
    how: {
      heading: "How it works",
      steps: [
        { label: "Assess", text: "Maturity assessment, interviews and a review of current skills, tools and policies." },
        { label: "Design", text: "Operating model, team structure, talent plan and a training plan tailored to your tools, policies and examples from your business." },
        { label: "Build", text: "Set up the central team, run the training programs and support the first AI launches." },
        { label: "Hand over", text: "Your team runs the operating model, with follow-up clinics and progress measured against the assessment." },
      ],
    },
    options: {
      heading: "Engagement options",
      items: [
        { title: "Training sessions and cohorts", text: "Half-day or full-day executive and team sessions, or multi-week cohort programs with practical work on real tasks." },
        { title: "Capability program", text: "Maturity assessment, operating model, center of excellence setup, talent plan and training, run over several months." },
        { title: "Launch support", text: "Training and adoption support tied to the go-live of a specific AI system." },
      ],
    },
    // The document lists no success stories for this page; it asks for two testimonials instead.
    stories: [],
    quotes: [
      {
        role: "CIO",
        company: "Fortune 1000 Manufacturer",
        quote:
          "The session was my gateway into understanding more about the advancement of analytics and the relevance to our industry. The session was enlightening and brought plenty of practical examples to solidify the concepts being presented. Dr. Murthy did a great job of orienting the subject to the industries represented in the room. In addition, he was passionate about the subject. The session attracted industry leaders at varying levels of implementation maturity which further enriched the conversation.",
      },
      {
        role: "Head of Analytics",
        company: "Fortune 1000 Retailer",
        quote:
          "The training was amazing and extremely well received across the board. This speaks to Soothsayer’s ability to tackle complex topics and break them down in a way that people at every level can understand and appreciate. Many participants reported that it was the best training that they had ever attended. Multiple use cases, tactical improvements, and the ability to leverage state-of-the-art Analytic techniques have come out of it.",
      },
    ],
    faqs: [
      { q: "How is this different from Fractional AI Leadership?", a: "A fractional leader runs AI for you for a period of time. Capability building sets up your own people and structure so you can run it yourselves. The two work well together, with the fractional leader handing over to the team we help you build." },
      { q: "Can you tailor training to our tools and policies?", a: "Yes. Every program uses your approved tools, your AI policy and examples from your own business." },
      { q: "Do you train in person or online?", a: "Both. Executive sessions usually work best in person, and cohort programs often mix the two." },
      { q: "How do you measure progress?", a: "Against the maturity assessment at the start, with before and after skills assessments for training and usage data for adoption programs." },
    ],
    related: { services: ["ai-leadership", "ai-strategy-roadmap", "embedded-delivery-team"], capabilities: cap("AI Strategy & Transformation", "Responsible AI & Governance") },
    closing: { heading: "Build an organization that can run AI itself.", button: "Plan your capability program" },
  },

  /* ------------------------------------------------------------ 8 --- */
  {
    slug: "applied-ai-research",
    nav: "Applied AI R&D",
    name: "Applied AI R&D",
    icon: "rocket",
    art: "research",
    metaTitle: "Applied AI Research and Product Development | Soothsayer Analytics",
    metaDescription:
      "Co-develop new AI products, features and IP with a team that has taken AI from research to production. IP terms agreed before work starts.",
    h1: "Turn an AI product idea into a working product.",
    subhead: "Co-development of new AI products, features and intellectual property for companies building AI into what they sell or how they engineer.",
    body: "Some problems have no off-the-shelf answer. We work with product and R&D teams to test feasibility, build prototypes and take the strongest into production. Ownership of the IP is agreed before work starts. Our own AuGENT platform came out of the same kind of work.",
    cta: "Discuss a project",
    when: [
      "You want to add AI features to a product you sell",
      "An engineering problem needs research-grade methods rather than an existing tool",
      "You need to know whether an idea is technically feasible before funding it",
      "Simulation, testing or inspection cycles take too long",
    ],
    getHeading: "What you get",
    get: [
      { title: "Feasibility studies", text: "Short, focused research to test whether an approach can meet the required accuracy, speed or cost, ending in a clear recommendation." },
      { title: "Prototypes", text: "Working prototypes on your data that product teams and customers can try." },
      { title: "Product engineering", text: "Hardening, integration and scaling of a prototype into a product feature or a standalone product." },
      { title: "IP and ownership", text: "Ownership, licensing and publication terms agreed in writing before work starts." },
    ],
    how: {
      heading: "How it works",
      steps: [
        { label: "Feasibility", text: "Test the core idea against the accuracy, speed or cost it needs to hit." },
        { label: "Prototype", text: "Build a working version on real data and put it in front of users." },
        { label: "Product", text: "Engineer it for production, with a decision gate before each stage." },
      ],
    },
    stories: [
      { name: "Engineering simulation.", text: "AI used to reduce the cost and time of simulation runs." },
      { name: "Automotive testing.", text: "Deep learning used to detect cracks in brake rotors during testing." },
      { name: "Appliance manufacturer.", text: "Deep learning vision system for quality inspection." },
    ],
    faqs: [
      { q: "Who owns the IP?", a: "It is agreed in writing before work starts. Options range from full client ownership to shared or licensed models, depending on what each side brings." },
      { q: "Can you work alongside our R&D team?", a: "Yes. Most projects run as one joint team, with your engineers and ours working from the same backlog." },
      { q: "What if the feasibility study says no?", a: "You find out early and at low cost, with a clear explanation of why and what would need to change." },
    ],
    related: { services: ["proof-of-value", "embedded-delivery-team"], capabilities: cap("Data & AI Foundations", "Agentic AI & Multi-Agent Systems") },
    closing: { heading: "Test whether your AI product idea will work.", button: "Discuss a project" },
  },
];

export const getService = (slug: string) => SERVICE_PAGES.find((p) => p.slug === slug);
