/**
 * Copy for the six capability pages, from "Soothsayer Website - Capability Pages" (Nov 2026).
 * Text is kept verbatim from the document; layout lives in components/capability/.
 * Optional sections (stories, tools) are simply omitted when the document gives none.
 */

export type Block = { title: string; text: string; icon: string };
export type Story = { name: string; text: string; href: string };
export type Faq = { q: string; a: string };

export type CapabilityPage = {
  slug: string;
  /** Label used in the nav dropdown and the "Related capabilities" row. */
  nav: string;
  icon: string;
  /** Breadcrumb / page name. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subhead: string;
  body: string;
  cta: string;
  when: string[];
  build: Block[];
  deliver: { intro?: string; steps?: { label: string; text: string }[]; blocks?: string[] };
  stories?: Story[];
  tools?: string[];
  faqs: Faq[];
  closing: { heading: string; button: string };
};

export const CAPABILITIES_BASE = "/capabilities";
const CASES = "/case-studies";

export const CAPABILITY_PAGES: CapabilityPage[] = [
  /* ------------------------------------------------------------ 1 --- */
  {
    slug: "ai-strategy-transformation",
    nav: "AI Strategy & Transformation",
    name: "AI Strategy & Transformation",
    icon: "compass",
    metaTitle: "AI Strategy and Adoption",
    metaDescription:
      "AI strategy, use case prioritization and roadmaps for C-suite and operations leaders. Every candidate scored on value, data readiness and change management, then sequenced into a roadmap ready to execute.",
    h1: "AI roadmaps built to be executed, not admired.",
    subhead:
      "AI strategy, use case prioritization and roadmaps for C Suite and operations leaders in industries like complex industrial manufacturing, insurance, finance and accounting sectors.",
    body: "We talk to the people who own the decisions, test what your data supports, and score every candidate on value and change management needs. You get a ranked portfolio and a roadmap ready to execute.",
    cta: "Book a strategy session",
    when: [
      "Your last strategy engagement left you with a polished deck and nothing running in production",
      "You have a backlog of ideas and no defensible way to rank them",
      "Budget is committed and nobody has checked whether your data supports the use cases",
      "Four business units are buying AI tools separately and nobody owns the total",
    ],
    build: [
      {
        title: "AI Strategy",
        icon: "compass",
        text: "We map where a model changes a decision someone already makes: turnaround planning at a refinery, claim triage at an insurer, bed allocation in a hospital, the month-end close, demand planning across a supply chain. Each candidate is sized against a revenue, cost or risk line your finance lead recognizes. The output is a sized opportunity map. Business owners are named on it.",
      },
      {
        title: "Roadmaps",
        icon: "map",
        text: "We order the work so data foundations land before the use cases that need them. The first delivery goes somewhere visible. Each phase carries an owner, a cost range and a decision gate, and the sequence is set so early phases fund later ones.",
      },
      {
        title: "Use Case Prioritization",
        icon: "target",
        text: "We score candidates on value, data readiness, delivery complexity and organizational absorption. Most frameworks skip the last one. A use case your planners, underwriters or clinicians will quietly work around scores low, however clean the modeling looks. You receive the scored portfolio and the reasoning behind every score.",
      },
      {
        title: "Change & Adoption",
        icon: "people",
        text: "A forecast nobody acts on is worth nothing. We identify who has to work differently, what currently stops them, and what evidence they need before trusting a model over their own judgement. This work runs during strategy. You receive an adoption plan naming the decisions and their owners.",
      },
    ],
    deliver: {
      intro:
        "We run AI strategy the way we tell clients to run their business: with AI and agents doing the heavy lifting. So our consultants spend their time on judgment, not legwork.",
      steps: [
        { label: "Capture", text: "Anyone can share an idea in plain language. A guided AI conversation turns it into a structured case." },
        { label: "Check", text: "Agents test each idea against your internal work, the market and your stated strategy, all in parallel." },
        { label: "Score", text: "Every idea is rated for originality, overlap, strategy fit and timing, with sources shown." },
        { label: "Test", text: "Our team puts the strongest candidates up against your real data." },
        { label: "Roadmap", text: "You get a sequenced plan, traceable to evidence and ready to execute." },
      ],
    },
    stories: [
      {
        name: "PE-backed trailer components manufacturer.",
        text: "Use case portfolio built across customer churn, invoice processing and tariff exposure, then sequenced into a multi-year program.",
        href: CASES,
      },
      {
        name: "Fortune 500 chemical manufacturer.",
        text: "Opportunity assessment across furnace and quench tower operations, sequenced into an optimization program.",
        href: "https://soothsayeranalytics.com/case-studies/increasing-efficiency-of-furnaces-and-quench-towers-for-a-fortune-500-chemical-manufacturer",
      },
      {
        name: "Global manufacturing group.",
        text: "Idea intake and vetting built so improvement ideas from every plant get scored on the same criteria.",
        href: CASES,
      },
    ],
    faqs: [
      {
        q: "How is this different from a Big Four AI strategy engagement?",
        a: "They staff strategy and delivery as separate practices, often separate contracts. We write roadmaps our own engineers execute. That changes what we are willing to put on paper, because we inherit every estimate in it.",
      },
      {
        q: "What if our data is not ready?",
        a: "That is a finding, not a blocker. The roadmap sequences the foundation work first and prices it, so you know that cost before committing to the use cases that depend on it.",
      },
      {
        q: "How do you size value for something we have never done?",
        a: "We size the decision, not the model. If your planners over-order by a known margin, or your adjusters spend a known number of hours on every claim, the value of doing it better is something you can calculate from your own history.",
      },
      {
        q: "Do we have to use you for the build?",
        a: "No. The roadmap is written so your internal team or another firm can execute it.",
      },
      {
        q: "How long before something is in production?",
        a: "The first build usually starts within weeks of the roadmap. Production inside a quarter is the target. Strategy that defers all delivery past month six rarely survives a budget cycle.",
      },
    ],
    closing: {
      heading: "Find out which use cases your data actually supports.",
      button: "Book a strategy session",
    },
  },

  /* ------------------------------------------------------------ 2 --- */
  {
    slug: "data-ai-foundations",
    nav: "Data & AI Foundations",
    name: "Data & AI Foundations",
    icon: "data",
    metaTitle: "Data Engineering and RAG Pipelines for AI | Soothsayer Analytics",
    metaDescription:
      "Data engineering, RAG pipelines, knowledge graphs and model development on Databricks, Unity Catalog and Azure. Built for the use case, not for a platform ideal.",
    h1: "Data your models can actually use.",
    subhead:
      "Data engineering, RAG pipelines, knowledge graphs and model development on any tool, any cloud, scoped to the use case you intend to run.",
    body: "Models need data at the right level of detail, fresh enough to act on, with enough history to learn from. We build pipelines to that standard. Governance and lineage go in from the start, on the cloud you already pay for, documented so your team can extend it.",
    cta: "Talk to an engineer",
    when: [
      "Every AI conversation in your business ends with someone saying the data is not ready",
      "Your models run in a notebook and nowhere else",
      "Two systems answer the same question differently and finance trusts neither",
      "A GenAI pilot retrieves the wrong documents and nobody can explain why",
      "You have a lake, a warehouse and a lakehouse, and no agreement on which is the source of truth",
    ],
    build: [
      {
        title: "Data Engineering",
        icon: "layers",
        text: "We build ingestion, transformation and serving layers for machine learning, on whatever platform you run. Governance and lineage go in from day one, and you get production pipelines with a documented feature layer.",
      },
      {
        title: "RAG Pipelines",
        icon: "search",
        text: "We build chunking, embedding, hybrid retrieval and re-ranking as one system, with measured recall. We test it on real queries from your users and show you the numbers.",
      },
      {
        title: "Knowledge Graphs",
        icon: "network",
        text: "When the meaning sits in relationships, a graph does what a table can't. We map parts to assemblies, policies to claims, patients to providers and equipment to failure modes, then make it queryable by people and models. That is often what makes retrieval accurate.",
      },
      {
        title: "Model Development",
        icon: "chart",
        text: "We build forecasting, classification, anomaly detection, optimization and computer vision models for a specific decision: a demand forecast, a fraud flag, a readmission risk score. We agree a baseline before training, and test that results arrive in time to act on.",
      },
    ],
    deliver: {
      blocks: [
        "We scope foundations to a use case, never to a platform ideal. We find the shortest path to the first working model, build the data layer that path requires, then generalize it from something that already runs.",
        "We work on your cloud. Databricks, Azure, AWS and Google Cloud are familiar ground, and we use Unity Catalog, MLflow and the governance tooling you already own rather than standing up a parallel stack beside it.",
      ],
    },
    stories: [
      {
        name: "Multinational chemical manufacturer.",
        text: "MRO spare parts deduplicated across a fragmented catalog, resolving the records that blocked accurate spend analysis.",
        href: `${CASES}/mro-spare-parts-deduplication-for-a-multinational-chemical-manufacturer`,
      },
      {
        name: "Auto glass repair and replacement company.",
        text: "Training pipeline automated so VIN-based part prediction models retrain on new data without anyone touching them.",
        href: CASES,
      },
      {
        name: "Large international manufacturer.",
        text: "Analytics environment built from scratch to serve reporting and modeling across plants.",
        href: CASES,
      },
    ],
    tools: [
      "Databricks", "Unity Catalog", "MLflow", "Spark", "Delta Lake", "Azure", "AWS", "Google Cloud",
      "Microsoft Fabric", "Snowflake", "Airflow", "dbt", "Neo4j", "pgvector", "Python", "scikit-learn", "PyTorch",
    ],
    faqs: [
      {
        q: "Do we need a data platform before we can do any AI?",
        a: "No. You need the slice your first use case depends on. We build that slice so it extends, which costs less than building everything and then finding out which parts nobody uses.",
      },
      {
        q: "Our data is messy. Is that a dealbreaker?",
        a: "Not at all. It is normal, whether it is sensor data from a plant, ten years of claims history or a general ledger after an ERP migration. Every engagement starts with profiling, so you know what you are working with before committing to a use case that depends on it.",
      },
      {
        q: "Why does retrieval need its own engineering effort?",
        a: "Retrieval quality sets the ceiling on answer quality. It is also measurable, so we measure it. Teams that skip this ship an assistant that is confidently wrong on the questions that matter most.",
      },
      {
        q: "When is a knowledge graph worth the effort?",
        a: "When your questions span relationships across several systems, and when the same part, customer, patient or asset appears under a different identity in each. Below that threshold a well-modelled warehouse is cheaper, and we will say so.",
      },
    ],
    closing: {
      heading: "Find out what your data can support today.",
      button: "Book a data readiness review session",
    },
  },

  /* ------------------------------------------------------------ 3 --- */
  {
    slug: "generative-ai-solutions",
    nav: "GenAI Solutions",
    name: "GenAI Solutions",
    icon: "spark",
    metaTitle: "Enterprise Copilots and Document Intelligence | Soothsayer Analytics",
    metaDescription:
      "Enterprise copilots, intelligent document processing (IDP) and knowledge assistants for manufacturing, supply chain, insurance, healthcare and energy teams. Deployed inside your tenancy with measured accuracy.",
    h1: "Less keying, less searching, more time for the cases that need a person.",
    subhead:
      "Copilots, document extraction, knowledge search and plain-language analytics, built into the systems your teams already use and deployed inside your tenancy.",
    body: "Shipping documents, claims, SOP lookups and product questions take up hours every day. We build systems that handle the routine ones, cite their sources and pass anything uncertain to a person. You see the accuracy on your own documents before you sign off.",
    cta: "Book a scoping call",
    when: [
      "Data from bills of lading, claims forms, lab reports and supplier certificates still gets keyed into core systems by hand",
      "A pilot impressed the steering committee and nobody uses it now",
      "Technicians, nurses and service reps cannot find the answer buried in manuals, SOPs and policy documents",
      "An off-the-shelf copilot cannot see your ERP, MES, CRM or patient records, which is where the answers are",
      "Plant, sales and operations leads wait days for an analyst to pull a number they could ask for in one sentence",
    ],
    build: [
      {
        title: "Enterprise Copilots",
        icon: "chat",
        text: "We ground assistants in your contracts, product data, policies, maintenance records, clinical guidelines and tickets. Every answer carries a citation. We scope them to one role and a defined task list, because an assistant that claims to do everything gets trusted for nothing, and you receive access controls and usage analytics with it.",
      },
      {
        title: "Document Intelligence",
        icon: "compliance",
        text: "This is intelligent document processing (IDP) built for production. We extract fields from invoices, purchase orders, bills of lading, insurance claims, medical records, contracts, well reports and certificates, including the scanned and the badly scanned. Nothing uncertain flows through silently. Confidence scoring routes low-certainty extractions to a person, and you receive the pipeline, the thresholds, the exception queue and accuracy reporting.",
      },
      {
        title: "Knowledge Assistants",
        icon: "book",
        text: "We build search across the documents your business has accumulated, answering in plain language with the passage that supports each claim. Permissions follow your existing entitlements. Someone in sales sees what sales is cleared to see, and you receive retrieval metrics rather than an assurance that it works.",
      },
      {
        title: "Conversational Analytics",
        icon: "chart",
        text: "Someone asks a question in plain language and gets an answer from governed data with the query shown. The semantic layer is where the real work sits. We build or harden it as part of delivery, because pointing a model at raw tables produces answers nobody should act on.",
      },
    ],
    // The document gives no "How we deliver it" for this page, so the section is omitted.
    deliver: {},
    stories: [
      {
        name: "Global manufacturing group.",
        text: "Invoice processing automated from inbound document through to ERP entry, with extraction routed by confidence and exceptions queued for review.",
        href: CASES,
      },
      {
        name: "Food, beverage and pharmaceutical systems supplier.",
        text: "Enterprise ChatGPT deployment and a multilingual legal assistance chatbot built over internal document sets.",
        href: `${CASES}/enterprise-chatgpt-for-largest-system-supplier-for-food-beverage-and-pharmaceutical-sectors`,
      },
      {
        name: "Fintech company.",
        text: "Fine-tuned LLM extractor pulling structured fields out of unstructured financial documents.",
        href: `${CASES}/fine-tuned-llm-based-information-extractor-for-fintech-company`,
      },
    ],
    tools: [
      "Azure OpenAI", "Anthropic Claude", "Google Gemini", "Open-weight models", "Azure Document Intelligence",
      "Azure AI Search", "LangChain", "LlamaIndex", "pgvector", "Databricks", "Python",
    ],
    faqs: [
      {
        q: "How do you stop it making things up?",
        a: "Answers are generated from retrieved source passages and shown with the source attached. Before go-live we measure how often the system is right on a held-out set of your own questions. You see that number and decide whether it clears your bar.",
      },
      {
        q: "Can we use our existing model licenses?",
        a: "Yes. We work with what you have already bought, and we benchmark alternatives only when there is a measurable reason to.",
      },
      {
        q: "Does our data leave our environment?",
        a: "No. We deploy inside your tenancy and model calls route through your own cloud endpoints.",
      },
      {
        q: "What extraction accuracy can we expect?",
        a: "Across our production deployments, we have consistently reached near-perfect accuracy on the fields that matter. The exact figure depends on document quality and field type, so we confirm it on a test data before deployment.",
      },
      {
        q: "How do we know people will use it?",
        a: "Each assistant is built for one role and a defined set of tasks, and every answer shows its source. Usage reporting shows who uses it and where it falls short.",
      },
    ],
    closing: {
      heading: "Send us a document type and we will test it.",
      button: "Book a scoping call",
    },
  },

  /* ------------------------------------------------------------ 4 --- */
  {
    slug: "agentic-ai",
    nav: "Agentic AI & Multi-Agent Systems",
    name: "Agentic AI & Multi-Agent Systems",
    icon: "chip",
    metaTitle: "Agentic AI and Multi-Agent Systems for the Enterprise | Soothsayer Analytics",
    metaDescription:
      "AI agents that read the document, decide, update the ERP and escalate what they should not decide. Action logging, approval gates and a kill switch included.",
    h1: "Move toward an autonomous enterprise without losing control.",
    subhead:
      "AI agents, multi-agent orchestration and process automation for order entry, insurance claims, shipment exceptions, maintenance work orders and prior authorizations. Built with action logging and a kill switch.",
    body: "We define which actions the agent takes alone, which need approval, and which it never takes. That boundary sets the architecture. Then we build the tool integrations, the retry behaviour, the escalation path and the action log, because risk and audit will see this system eventually.",
    cta: "Scope an agent",
    when: [
      "A process runs across four systems and a person is the integration layer",
      "Work arrives as email, moves through judgement, and ends in an update to the ERP, the claims system or the work order queue",
      "Your RPA bots break on every exception, so the exceptions became someone's full-time job",
      "You want AI to complete the task, not draft a suggestion for someone else to complete",
      "Nobody will approve unattended automation without an audit trail they can defend",
    ],
    build: [
      {
        title: "AI Agents",
        icon: "chip",
        text: "We scope an agent to one process with a defined goal, a defined toolset and defined limits on what it does alone. We build the integrations into your ERP, CRM, claims platform, maintenance system or ticketing tool, the retry and fallback behavior, and the escalation path. Every action is logged with its reasoning.",
      },
      {
        title: "Multi-Agent Orchestration",
        icon: "network",
        text: "When a process spans specialties, separate agents handle separate stages under an orchestration layer that routes work and holds shared state. In our experience it is shared state that breaks these systems, not reasoning. We design the coordination explicitly rather than hoping emergent behavior converges on something your team can support at 2am.",
      },
      {
        title: "Process Automation",
        icon: "bolt",
        text: "We automate the whole path, including intake in whatever form it arrives and the system update at the end.",
      },
      {
        title: "Decision Support",
        icon: "eye",
        text: "Some decisions stay with a person. These agents assemble the picture: pulling the relevant history, running the analysis, surfacing comparable cases, presenting options with the evidence behind each. The reasoning is inspectable rather than asserted, which is what brings an underwriter, a maintenance planner or a care coordinator back to it a second time.",
      },
    ],
    deliver: {
      blocks: [
        "We start with authority, not technology. Which actions the agent takes alone, which need approval and which it never takes are settled in week one. That avoids rebuilding the architecture later, when risk or compliance sees the system for the first time.",
        "Delivery runs in supervised stages. The agent first runs in shadow mode against live inputs while a person works normally, and we compare the two. Then it runs with approval on each action. Then it runs unattended within its authority, with sampling.",
        "Teams accept agentic automation after watching it be right for several weeks. Every agent ships with a kill switch, action-level logging and a tested rollback. Those are not afterthoughts. They are what makes approval possible.",
      ],
    },
    stories: [
      {
        name: "PE-backed trailer components manufacturer.",
        text: "Sales order processing automated from inbound document through to system entry, with exceptions routed to a reviewer.",
        href: CASES,
      },
      {
        name: "Global manufacturing group.",
        text: "Idea intake agent that captures, structures and scores improvement ideas submitted from across the business.",
        href: CASES,
      },
    ],
    tools: [
      "Anthropic Claude", "Azure OpenAI", "LangGraph", "Model Context Protocol", "Azure Functions", "Power Automate",
      "Databricks", "Snowflake", "Python", "REST and SOAP integrations into SAP, Oracle, Microsoft Dynamics 365 and other ERP, CRM and ticketing systems",
    ],
    faqs: [
      {
        q: "What stops an agent doing something expensive or wrong?",
        a: "It can only call the tools you grant it. Actions above a threshold you set require approval, every call is logged, and there is a kill switch. Those limits are configuration, not a promise in a slide.",
      },
      {
        q: "How is this different from RPA?",
        a: "RPA follows a fixed script and breaks when the input changes. An agent reads the input and decides what the situation calls for. Where your process genuinely never varies, RPA is cheaper and we will tell you so.",
      },
      {
        q: "Do we need multiple agents?",
        a: "Usually not at first. One well-scoped agent beats a multi-agent architecture designed before anyone has watched the single-agent version run for a month.",
      },
      {
        q: "How do we audit what it did?",
        a: "Every action carries a trace, the inputs it saw, the reasoning it gave and the result. That log is queryable and retained to your policy.",
      },
      {
        q: "What happens when it gets something wrong?",
        a: "It routes to the exception path, which gets designed before the happy path. Shadow running surfaces the failure modes while a person is still doing the work.",
      },
    ],
    closing: {
      heading: "Tell us the process and we will scope the agent.",
      button: "Scope an agent",
    },
  },

  /* ------------------------------------------------------------ 5 --- */
  {
    slug: "ai-reliability-llmops",
    nav: "AI Reliability & LLMOps",
    name: "AI Reliability Engineering & LLMOps",
    icon: "refresh",
    metaTitle: "LLMOps and Model Monitoring in Production | Soothsayer Analytics",
    metaDescription:
      "Drift detection, evaluation suites, MLOps and cost control for models already in production. Available as an audit, a build or a standing retainer.",
    h1: "Keep your copilots and agents as good as the day they launched.",
    subhead:
      "Models get updated, documents go out of date, prompts get tweaked and APIs change. We catch what that does to your copilots and agents before your users do.",
    body: "GenAI systems change even when your team doesn't touch them. A provider updates the model, the policy documents behind your assistant go out of date, an API your agent relies on changes its response. Answers get vaguer, an agent takes the wrong step, token bills climb, and often nobody notices for weeks. We test every prompt and model change against your own cases, trace what each agent does, and alert someone who can act.",
    cta: "Request a reliability audit",
    when: [
      "A model has been in production a year and nobody can say whether it still works",
      "Your GenAI spend is rising and nobody can attribute it to a use case",
      "Retraining happens when someone remembers",
      "A prompt changed last month and nobody knows whether it made things better",
      "Your planners or underwriters have started overriding the model and nobody logged why",
    ],
    build: [
      {
        title: "Monitoring & Observability",
        icon: "eye",
        text: "We instrument inputs, outputs, latency and cost, with drift detection on the distributions that matter. Alerts go to a person who can do something about them. We track the business metric alongside the model metric, because a model can hold its accuracy while the decision it supports quietly stops being made.",
      },
      {
        title: "Evaluation & Testing",
        icon: "check",
        text: "We build evaluation sets from your own data and regression tests, so a change cannot silently break a case that previously worked. For GenAI we score accuracy, grounding and format compliance. The gate is wired into deployment. Every prompt and model change runs the suite before shipping.",
      },
      {
        title: "MLOps & CI/CD",
        icon: "refresh",
        text: "We set up versioned models, reproducible training, automated deployment, staged rollout and a rollback that has been tested rather than assumed. Retraining stops being a project someone has to fund. Improvements ship in days instead of waiting for the next funded phase to open.",
      },
      {
        title: "AI FinOps",
        icon: "dollar",
        text: "We attribute token and inference cost by use case. Model choice is a cost lever. We tune caching, routing and model selection against measured quality, and most systems we audit are running a larger model than the task requires, which is the fastest saving available.",
      },
    ],
    deliver: {
      blocks: [
        "We start by looking at the AI you already have in production: what's deployed, what's being watched, what has drifted and what it's costing you. Most teams are surprised by what turns up.",
        "Then we measure before we change anything. Once you can see how each system is actually performing, the priorities usually look different, and the fixes that matter most become obvious.",
        "After that, we stay close. Your data changes, your prompts change and your business changes. We keep your AI in step, so what you rely on next year works as well as what you launched.",
      ],
    },
    stories: [
      {
        name: "Continuous process manufacturer, petrochemicals.",
        text: "Process drift detection built on live plant data, so deviation is caught as it emerges rather than in post-hoc review.",
        href: CASES,
      },
      {
        name: "Auto glass repair and replacement company.",
        text: "Model training pipeline automated so part prediction retrains on a schedule with no manual step.",
        href: CASES,
      },
      {
        name: "Global manufacturing group.",
        text: "Document processing pipeline instrumented for accuracy and cost per transaction across live volume.",
        href: CASES,
      },
    ],
    tools: [
      "MLflow", "Databricks", "Unity Catalog", "Azure ML", "LangSmith", "Prometheus", "Grafana", "Azure Monitor",
      "GitHub Actions", "Azure DevOps",
    ],
    faqs: [
      {
        q: "Where do we start?",
        a: "With what you already have in production. We look at what's running, what's being watched and where things have slipped, then agree with you on what to fix first.",
      },
      {
        q: "Do we have to change our tools or cloud?",
        a: "No. We work with the models, platforms and cloud you already use, and add only what's missing.",
      },
      {
        q: "Will our team be able to run it without you?",
        a: "Yes, if that's what you want. We build alongside your team so they know the setup as well as we do. Some clients keep us involved, others take it over completely.",
      },
    ],
    closing: {
      heading: "Find out whether your production models still work.",
      button: "Request a reliability audit",
    },
  },

  /* ------------------------------------------------------------ 6 --- */
  {
    slug: "responsible-ai-governance",
    nav: "Responsible AI & Governance",
    name: "Responsible AI & Governance",
    icon: "framework",
    metaTitle: "AI Governance, Bias Testing and Audit Evidence | Soothsayer Analytics",
    metaDescription: "Bias testing, security, risk classification and audit evidence for models in production.",
    h1: "AI your legal, risk and audit teams can sign off on.",
    subhead: "Every AI system you run, listed, rated by risk and backed by the controls and records to prove it.",
    body: "Sooner or later someone asks about your AI. A regulator wants to know which systems affect customers. A customer's procurement team wants to see how decisions get made. Your board wants to know who approved what. We start with an inventory of everything that's running, including tools you bought, and classify each system by risk. Then we set controls to match, so a customer-facing pricing model gets closer oversight than an internal search assistant. Access and data handling follow your existing permissions, and every decision can be traced back to its inputs and the person who signed it off.",
    cta: "Request a governance assessment",
    when: [
      "Legal or risk has blocked a deployment and you are negotiating rather than evidencing",
      "You have an AI policy document and no way to test whether systems comply with it",
      "A customer's procurement team has asked how your model makes its decisions",
      "Models are being built in three business units and nobody holds an inventory",
    ],
    build: [
      {
        title: "Bias & Fairness Testing",
        icon: "scale",
        text: "We test across the groups that matter in your context, whether patients, applicants, policyholders or customers, on the outcomes that matter, with thresholds agreed before testing rather than negotiated once results arrive. We test the deployed decision. Thresholds, overrides and downstream process all shift who is affected, so the model in isolation is the wrong unit.",
      },
      {
        title: "Security & Privacy",
        icon: "lock",
        text: "We run prompt injection and data exfiltration testing against GenAI systems and align access control to your existing entitlements. Policy documents enforce nothing. PII handling and retention get enforced in the pipeline, because an assistant that answers correctly to the wrong person is a breach.",
      },
      {
        title: "Risk Management",
        icon: "risk",
        text: "We build the AI inventory, classify each system by risk, and set controls proportionate to that classification. Proportionality is the point. A pricing model and an internal search assistant do not need the same oversight, and treating them alike either throttles the harmless or under-governs the consequential.",
      },
      {
        title: "Compliance & Auditability",
        icon: "compliance",
        text: "We produce model documentation, decision logs, lineage from an output back to its input and training data, and a review cadence. Auditors answer their own questions. That costs far less than assembling evidence under deadline once a request has already landed.",
      },
    ],
    deliver: {
      blocks: [
        "There are two entry points. We assess what you already run and tell you where the exposure is, or we build governance into a delivery engagement from the start.",
        "Assessments cover inventory, classification, control gaps and a prioritized remediation plan with effort estimates. On build engagements the work runs alongside delivery, so controls land with the system rather than after it.",
      ],
    },
    // Success stories deliberately omitted: the document makes each candidate conditional on proof
    // that has not been confirmed, and says to ship the page without the section rather than pad it.
    faqs: [
      {
        q: "Will this slow our projects down?",
        a: "Built in from the start it adds little. Retrofitted after legal blocks a launch it costs months. The slow path is the one where governance arrives last.",
      },
      {
        q: "What about models we bought rather than built?",
        a: "They go in the inventory and get classified the same way. Vendor models often carry less documentation than internal ones, which is itself a finding worth having.",
      },
    ],
    closing: {
      heading: "Find out which of your models would survive an audit.",
      button: "Request a governance assessment",
    },
  },
];

export const getCapability = (slug: string) => CAPABILITY_PAGES.find((p) => p.slug === slug);
export const capabilityHref = (slug: string) => `${CAPABILITIES_BASE}/${slug}`;
