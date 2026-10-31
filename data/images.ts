/**
 * Image sources. All of these already exist on the client's CDNs.
 * To use a Figma export instead, drop the file in /public/images and change
 * the path here, e.g. heroArt: "/images/hero-chip.webp".
 */
const WF = "https://cdn.prod.website-files.com/6687c738a732506c2bf59c22/";
const WF_LOGOS = "https://cdn.prod.website-files.com/6866b1d280bd0335ad8ab61f/";
const COM = "https://soothsayeranalytics.com/public/home/assets/";

export const IMAGES = {
  logoWhite: `${COM}img/Soothsayer%20White%201.svg`,
  augentLogo: `${WF}6a79c9db5bf2abbaa6f61680_Augent%20Logo.svg`,
};

/** `fill: true` marks artwork with solid coloured shapes; it is greyed out instead of turned black. */
export type ClientLogo = { name: string; src: string; width: number; height: number; fill?: boolean };

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Dow", src: `${WF_LOGOS}6866b1d280bd0335ad8ab790_dow.png`, width: 300, height: 200, fill: true },
  { name: "Whirlpool", src: `${WF}68e2249f5f5241a3d339cbd6_Whirlpool.png`, width: 122, height: 41 },
  { name: "Abercrombie & Fitch", src: `${WF}68e2249f5f5241a3d339cbd8_Abercrombie%20Fitch%20Dark.png`, width: 171, height: 88 },
  { name: "SABIC", src: `${WF_LOGOS}6866b1d280bd0335ad8ab789_sabic.png`, width: 300, height: 200 },
  { name: "Wendy's", src: `${WF_LOGOS}6866b1d280bd0335ad8ab78b_wendy%27s.png`, width: 300, height: 200, fill: true },
  { name: "Ford", src: `${WF_LOGOS}6866b1d280bd0335ad8ab78f_Ford.png`, width: 300, height: 200, fill: true },
  { name: "GEA", src: `${WF_LOGOS}6866b1d280bd0335ad8ab78c_gea.png`, width: 300, height: 200 },
  { name: "DHL", src: `${WF_LOGOS}6866b1d280bd0335ad8ab78d_DHL.png`, width: 300, height: 200, fill: true },
  { name: "Dun & Bradstreet", src: `${WF_LOGOS}6866b1d280bd0335ad8ab78e_dun-%26-bradstreet.png`, width: 300, height: 200 },
];

/**
 * Case-study art: the originals from the live site's CDN (800 × 600), so the
 * expanded card (about 760 × 575) shows them near 1:1 instead of stretching a
 * 266 × 384 thumbnail almost 3×.
 */
export const CASE_STUDY_IMAGES = {
  chatbot: `${WF}66acbf25f6dde35184e29f66_Chat-bot.jpg`,
  rawMaterials: `${WF}66acbef0184b4ec374b23fd9_AI-Driven-Demand-And-Price-Prediction-For-Raw-Materials-For-A-Global-Chemical-Manufacturer.jpg`,
  underwriting: `${WF}66acbf031f85f7fd3415a7d1_Al-Based-Underwriting-model.jpg`,
  revenue: `${WF}66ab53b4b0019e2854ffc70e_3.png`,
  shipFromStore: `${WF}66acbf15c143f292ad5a30f8_Ship-From-Store-Optimization.jpg`,
  furnaces: `${WF}66ab53b4bf81bfba50e8ff8c_6.png`,
};

/** YouTube's own thumbnail for a video id. */
export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
