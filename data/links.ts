/**
 * Every outbound destination on the landing page lives here.
 * These are the exact URLs the current site uses. Do not invent new ones:
 * when a page migrates, change its constant and every link follows.
 */
export const LINKS = {
  // Contact
  phone: "tel:844-44-76684",
  email: "mailto:info@soothsayeranalytics.com",

  // Top bar / Company
  about: "https://soothsayeranalytics.com/about-us",
  contact: "https://soothsayeranalytics.com/contact-us",
  careers: "https://soothsayeranalytics.com/careers",

  // Capabilities
  generativeAI: "https://soothsayeranalytics.com/generative-ai",
  patternRecognition: "https://soothsayeranalytics.com/pattern-recognition",
  predictiveAnalytics: "https://soothsayeranalytics.com/predictive-analytics",
  optimization: "https://soothsayeranalytics.com/optimization",
  unstructuredData: "https://soothsayeranalytics.com/unstructured-data",
  textAnalyticsNLP: "https://soothsayeranalytics.com/text-analytics-nlp",
  computerVision: "https://soothsayeranalytics.com/computer-vision",
  iotBigData: "https://soothsayeranalytics.com/iot-big-data",
  dataScienceConsulting: "https://soothsayeranalytics.com/data-science-consulting",
  strategyBlueprint: "https://soothsayeranalytics.com/strategy-blueprint",
  researchDevelopment: "https://soothsayeranalytics.com/research-and-development",
  corporateTraining: "https://soothsayeranalytics.com/corporate-training",
  aiDlCourse: "https://soothsayeranalytics.com/artificial-intelligence-deep-learning-accelerated-certificate-course",
  advancedCertificate: "https://soothsayeranalytics.com/education-certification-advanced-certification-program",
  blockchainWorkshop: "https://soothsayeranalytics.com/blockchain-for-cxos-workshop",
  iotLeadership: "https://soothsayeranalytics.com/leadership-seminar-internet-of-things-iot",

  // Industries
  manufacturing: "https://soothsayeranalytics.com/manufacturing-and-automotive",
  supplyChainRetail: "https://soothsayeranalytics.com/specialized-consulting-retail",
  insurance: "https://soothsayeranalytics.com/insurance",
  utilities: "https://soothsayeranalytics.com/specialized-consulting-utilities",
  healthcare: "https://soothsayeranalytics.com/specialized-consulting-healthcare",

  // Solutions
  augent: "https://soothsayeranalytics.com/augent-guided-evolution-of-neural-transformation",
  esgAnalytics: "https://soothsayeranalytics.com/solutions",
  genAIBusiness: "https://soothsayeranalytics.com/gen-ai-for-business-transformation",
  multilingualVA: "https://soothsayeranalytics.com/multilingual-virtual-assistant",

  // Resources
  media: "https://soothsayeranalytics.com/media",
  videos: "https://soothsayeranalytics.com/videos",
  blog: "https://soothsayeranalytics.com/blog",
  caseStudies: "https://soothsayeranalytics.com/case-studies",
  podcasts: "https://soothsayeranalytics.com/podcasts",
  webinars: "https://www.soothsayeranalytics.ai/webinars",
  philanthropy: "https://soothsayeranalytics.com/philanthropy",

  // Homepage CTAs
  services: "https://soothsayeranalytics.com/services",
  bespokeAI: "https://soothsayeranalytics.com/bespoke-a-i-solutions",
  digitalCompetency: "https://www.soothsayeranalytics.ai/digital-competency",
  responsibleAI: "https://www.soothsayeranalytics.ai/responsible-ai",
  augentExternal: "https://www.augent.ai/",
  idp: "https://www.augent.ai/intelligent-document-processing",

  // Case study cards
  caseStudy1: "https://soothsayeranalytics.com/case-studies/ai-driven-demand-and-price-prediction-for-raw-materials-for-a-global-chemical-manufacturer",
  caseStudy2: "https://soothsayeranalytics.com/case-studies/ai-based-underwriting-model-forecasting-claim-expenses-for-a-leading-healthcare-insurance-provider",
  caseStudy3: "https://soothsayeranalytics.com/case-studies/artificial-intelligence-ai-driven-multivariate-revenue-forecasting-for-a-very-large-fiber-composites-manufacturer",
  caseStudy4: "https://soothsayeranalytics.com/case-studies/ship-from-store-optimization-for-a-leading-retailer",
  caseStudy5: "https://soothsayeranalytics.com/case-studies/enterprise-chat-gpt-for-largest-system-supplier-for-food-beverage-and-pharmaceutical-sectors",
  caseStudy6: "https://soothsayeranalytics.com/case-studies/increasing-efficiency-of-furnaces-and-quench-towers-for-a-fortune-500-chemical-manufacturer",

  // Legal
  privacy: "https://soothsayeranalytics.com/privacy-policy/",
  terms: "https://soothsayeranalytics.com/terms-conditions/",
  employeeReferral: "https://soothsayeranalytics.com/employee-referral-program",

  // Social
  facebook: "https://www.facebook.com/SoothsayerAnalytics",
  instagram: "https://www.instagram.com/soothsayeranalytics",
  twitter: "https://twitter.com/RealDataScience",
  linkedin: "https://www.linkedin.com/company/soothsayer-analytics/",
  youtube: "https://www.youtube.com/@SoothsayerAnalytics",
} as const;

export type LinkKey = keyof typeof LINKS;
