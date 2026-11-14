import raw from "@/data/site-pages.json";

/** Inline text run. `br` is a line break; `href` marks a link. */
export type Seg = { t?: string; href?: string; br?: 1 };

export type Block =
  | { k: "p"; s: Seg[] }
  | { k: "h"; l: number; s: Seg[] }
  | { k: "img"; src: string; alt: string }
  | { k: "video"; src: string; poster: string }
  | { k: "cta"; label: string; href: string }
  | { k: "group"; items: Block[][] }
  | { k: "link"; href: string; b: Block[] }
  | { k: "tabs"; labels: Block[][]; panes: Block[][] };

export type SitePage = {
  title: string;
  description: string | null;
  og: string | null;
  pre: Block[];
  submit: string[];
  blocks: Block[];
};

export const PAGES = raw as unknown as Record<string, SitePage>;
export const getPage = (key: string): SitePage => {
  const p = PAGES[key];
  if (!p) throw new Error(`No extracted content for "${key}"`);
  return p;
};

/** Plain text of a block's inline runs. */
export const segText = (s: Seg[]) => s.map((x) => (x.br ? " " : x.t ?? "")).join("").replace(/\s+/g, " ").trim();
export const blockText = (b: Block) => (b.k === "p" || b.k === "h" ? segText(b.s) : "");
