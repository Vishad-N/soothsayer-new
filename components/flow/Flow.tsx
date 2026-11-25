import { Fragment } from "react";
import type { Metadata } from "next";
import { LINKS } from "@/data/links";
import { cn } from "@/lib/cn";
import { PageShell } from "../page/PageShell";
import { KeycapButton } from "../ui/KeycapButton";
import { LinkButton } from "../ui/Button";
import { HelixField } from "../ui/HelixField";
import { PixelEdge } from "../ui/PixelEdge";
import { Reveal } from "../ui/Reveal";
import { FlowTabs } from "./FlowClient";
import { PAGES, blockText, getPage, segText, type Block, type Seg, type SitePage } from "./types";

const MAP = "https://cdn.prod.website-files.com/6687c738a732506c2bf59c22/686feef50e3e1a0a66c7b9f6_Map.svg";
const CONSULT = /^(schedule a consultation|register now|contact us)$/i;

/* ----------------------------------------------------------- helpers --- */

/** Links to other .ai pages stay internal; consultation/registration CTAs go to the .com contact page. */
function mapHref(href: string, label?: string) {
  if (label && CONSULT.test(label.trim())) return LINKS.contact;
  const m = href.match(/^https?:\/\/(?:www\.)?soothsayeranalytics\.ai(\/.*)?$/);
  if (m) return m[1] || "/";
  if (href.startsWith("#")) return LINKS.contact;
  return href;
}
const isExt = (h: string) => /^https?:\/\//.test(h);
const linkAttrs = (h: string) => (isExt(h) ? { target: "_blank", rel: "noopener noreferrer" } : {});

function Inline({ s }: { s: Seg[] }) {
  return (
    <>
      {s.map((x, i) =>
        x.br ? (
          <br key={i} />
        ) : x.href ? (
          <a key={i} href={mapHref(x.href)} {...linkAttrs(mapHref(x.href))} className="il underline underline-offset-4">{x.t}</a>
        ) : (
          <Fragment key={i}>{x.t}</Fragment>
        ),
      )}
    </>
  );
}

const trim = (s: Seg[]): Seg[] => {
  const c = s.map((x) => ({ ...x }));
  const f = c.find((x) => x.t !== undefined);
  if (f?.t) f.t = f.t.replace(/^\s+/, "");
  const l = [...c].reverse().find((x) => x.t !== undefined);
  if (l?.t) l.t = l.t.replace(/\s+$/, "");
  return c;
};

/** CMS headings arrive as "abstract", "webinar Details" or "SPEAKER"; show them in consistent title case. */
const SMALL = /^(a|an|and|of|the|for|in|on|to|with|vs|or)$/i;
function tidyText(t: string) {
  const bare = t.trim();
  if (!bare || !(/^[a-z]/.test(bare) || (bare === bare.toUpperCase() && /[A-Z]{3}/.test(bare)))) return t;
  return t.toLowerCase().replace(/\S+/g, (w, i: number) => (i > 0 && SMALL.test(w) ? w : w[0].toUpperCase() + w.slice(1)));
}
const tidy = (s: Seg[]): Seg[] => s.map((x) => (x.t && !x.href ? { ...x, t: tidyText(x.t) } : x));

/** Brand cyan fails contrast on white, so light sections use a deeper teal for accent text. */
const accent = (dark: boolean) => (dark ? "text-brand-300" : "text-[#007a96]");

/** A few client logos are white or tiny artwork; fix those individually so every tile reads. */
const LOGO_FIX: [RegExp, string][] = [
  [/american-electric/i, "brightness-0"],
  [/dun-/i, "scale-[2.2]"],
];
const logoFix = (src: string) => LOGO_FIX.find(([re]) => re.test(src))?.[1];

const isSvg = (b: Block) => b.k === "img" && /\.svg(\?|$)/i.test(b.src);
const isRaster = (b: Block) => b.k === "img" && !isSvg(b);
const heading = (b: Block) => b.k === "h";
const ps = (bs: Block[]) => bs.filter((b): b is Extract<Block, { k: "p" }> => b.k === "p");

/* ------------------------------------------------------- page layout --- */

type Section = { head?: Block & { k: "h" }; blocks: Block[] };

function splitHero(blocks: Block[]) {
  let i = 0;
  const title: Block[] = [];
  if (blocks[0]?.k === "h") {
    const lvl = (blocks[0] as Extract<Block, { k: "h" }>).l;
    if (lvl === 1) {
      title.push(blocks[0]);
      i = 1;
    } else {
      while (blocks[i]?.k === "h" && (blocks[i] as Extract<Block, { k: "h" }>).l === lvl) title.push(blocks[i++]);
    }
  }
  const hero: Block[] = [];
  let metaOpen = false;
  for (; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.k === "h" && b.l <= 2) break;
    // a lower heading only belongs to the hero when it labels an icon (date / time / place)
    if (b.k === "h" && !metaOpen) break;
    if (isSvg(b)) metaOpen = true;
    if (b.k === "group" && hero.length > 0 && !hero.some(isSvg)) break;
    if (b.k === "tabs") break;
    if (b.k === "p" && /^Trusted by/.test(blockText(b))) break;
    hero.push(b);
  }
  return { title, hero, rest: blocks.slice(i) };
}

function splitSections(blocks: Block[]): Section[] {
  const out: Section[] = [];
  let cur: Section = { blocks: [] };
  let seen = false;
  for (const b of blocks) {
    // a page that opens its body with a lower heading (e.g. "The Background") gets a normal section head
    if (b.k === "h" && (b.l <= 2 || (!seen && !cur.head && !cur.blocks.length))) {
      seen = true;
      if (cur.head || cur.blocks.length) out.push(cur);
      cur = { head: b, blocks: [] };
    } else if (b.k === "p" && blockText(b) === "No items found.") {
      continue; // empty CMS list on the live page
    } else cur.blocks.push(b);
  }
  if (cur.head || cur.blocks.length) out.push(cur);
  return out;
}

const isTestimonialGroup = (g: Extract<Block, { k: "group" }>) =>
  g.items.every((it) => ps(it).length === 3 && blockText(ps(it)[2]).length > 100);

function mergeGroups(blocks: Block[]): Block[] {
  const out: Block[] = [];
  for (const b of blocks) {
    const prev = out[out.length - 1];
    if (b.k === "group" && prev?.k === "group" && isTestimonialGroup(b) && isTestimonialGroup(prev)) {
      out[out.length - 1] = { k: "group", items: [...prev.items, ...b.items] };
    } else out.push(b);
  }
  return out;
}

/* ----------------------------------------------------------- pieces --- */

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium backdrop-blur-md sm:text-sm", dark ? "border-brand-300/30 bg-white/[0.06] text-brand-100" : "border-brand/30 bg-brand-50 text-ink")}>
      <span className="size-2 rounded-full bg-brand shadow-[0_0_10px_var(--color-brand)]" />
      {children}
    </span>
  );
}

function VideoFrame({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ambient = /wixstatic|Banner|banner/.test(src);
  return (
    <video
      className={cn("aspect-video w-full bg-ink object-cover", className)}
      {...(ambient ? { autoPlay: true, muted: true, loop: true } : { controls: true })}
      playsInline
      preload="metadata"
      poster={poster || undefined}
    >
      <source src={ambient ? src : `${src}#t=0.5`} type="video/mp4" />
    </video>
  );
}

function CtaButton({ label, href, dark }: { label: string; href: string; dark?: boolean }) {
  const to = mapHref(href, label);
  return dark ? <KeycapButton href={to}>{label}</KeycapButton> : <LinkButton href={to}>{label}</LinkButton>;
}

/* ------------------------------------------------------------- hero --- */

function Hero({ page, title, hero, eyebrow, leadText, ctaLabel }: { page: SitePage; title: Block[]; hero: Block[]; eyebrow?: string; leadText?: string; ctaLabel?: string }) {
  const pre = page.pre;
  const preText = pre.filter((b) => b.k === "p").map((b) => blockText(b)).join(" ").trim();
  const preImg = pre.find((b) => b.k === "img") as Extract<Block, { k: "img" }> | undefined;

  const video = hero.find((b) => b.k === "video") as Extract<Block, { k: "video" }> | undefined;
  const image = !video ? (hero.find(isRaster) as Extract<Block, { k: "img" }> | undefined) : undefined;
  const ctas: { label: string; href: string }[] = [];
  const sub: Block[] = [];
  const meta: Block[][] = [];
  let curMeta: Block[] | null = null;
  for (const b of hero) {
    if (b.k === "cta") ctas.push(b);
    else if (b.k === "link" && ps(b.b).length && ps(b.b).every((p) => CONSULT.test(blockText(p)))) ctas.push({ label: blockText(ps(b.b)[0]), href: b.href });
    else if (isSvg(b)) {
      curMeta = [b];
      meta.push(curMeta);
    } else if (heading(b) && curMeta) curMeta.push(b);
    else if (b.k === "p") {
      curMeta = null;
      sub.push(b);
    }
  }
  const first = ctas[0] ?? (ctaLabel ? { label: ctaLabel, href: LINKS.contact } : undefined);
  const heads = title.map((h) => (h as Extract<Block, { k: "h" }>).s);
  // "Webinar⏎Real title": a short first line is a kicker, not part of the headline
  let kicker: string | null = null;
  if (heads.length === 1 && heads[0].some((x) => x.br)) {
    const bi = heads[0].findIndex((x) => x.br);
    const head = segText(heads[0].slice(0, bi));
    if (head.length > 0 && head.length < 22) {
      kicker = head;
      heads[0] = trim(heads[0].slice(bi + 1));
    }
  }
  const lead = sub[0]?.k === "p" && blockText(sub[0]).length < 220 ? sub[0] : undefined;
  const notes = sub.filter((b) => b !== lead);
  const framed = video || image;
  const headLen = heads.reduce((n, h) => n + segText(h).length, 0);

  return (
    <section className={cn("relative isolate z-10 bg-abyss text-white", framed ? "pb-4" : "pb-16 sm:pb-24")}>
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#0b323a_0%,#061f26_45%,#04141a_80%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_0%,#000,transparent_80%)]" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[920px] max-w-[160vw] -translate-x-1/2 rounded-full bg-brand/25 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,#6fdcf0_1px,transparent_1.4px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_65%_75%_at_50%_35%,#000,transparent_80%)]" />
        <svg className="absolute left-1/2 top-[38%] size-[1100px] max-w-none -translate-x-1/2 -translate-y-1/2 text-brand-300" viewBox="0 0 1100 1100" fill="none" stroke="currentColor">
          <circle cx="550" cy="550" r="250" opacity="0.1" />
          <circle cx="550" cy="550" r="400" opacity="0.07" />
          <circle cx="550" cy="550" r="545" opacity="0.05" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-abyss" />
      </div>

      <div className="container-page flex flex-col items-center pt-32 text-center sm:pt-40 lg:pt-44">
        {pre.filter((b): b is Extract<Block, { k: "link" }> => b.k === "link").map((l, i) => (
          <a key={i} href={mapHref(l.href)} className="mb-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-brand-300 transition-colors hover:text-white sm:self-center">
            <span aria-hidden>←</span>
            {ps(l.b).map((p) => blockText(p)).join(" ")}
          </a>
        ))}
        {(preText || preImg || kicker || eyebrow) && (
          <Reveal y={12}>
            <Eyebrow dark>
              {kicker ?? (preText || eyebrow)}
              {preImg && !kicker && /* eslint-disable-next-line @next/next/no-img-element */ <img src={preImg.src} alt={preImg.alt} className="h-5 w-auto" />}
            </Eyebrow>
            {kicker && preText && <p className="mt-3 text-sm text-white/70">{preText}</p>}
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <h1 className={cn("mx-auto mt-5 max-w-[920px] bg-gradient-to-b from-white from-40% to-brand-100/80 bg-clip-text font-semibold leading-[1.1] tracking-[-0.025em] text-transparent", headLen > 70 ? "text-[28px] xs:text-[34px] sm:text-[42px] lg:text-[50px]" : headLen > 44 ? "text-[30px] xs:text-[38px] sm:text-[46px] lg:text-[56px]" : "text-[34px] xs:text-[42px] sm:text-[54px] lg:text-[66px]")}>
            {heads.map((s, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                <Inline s={trim(s)} />
              </Fragment>
            ))}
          </h1>
        </Reveal>

        {!lead && leadText && (
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-[680px] text-[17px] leading-[1.55] text-white/80 sm:text-xl">{leadText}</p>
          </Reveal>
        )}
        {lead && (
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-[680px] text-[17px] leading-[1.55] text-white/80 sm:text-xl"><Inline s={trim(lead.s)} /></p>
          </Reveal>
        )}

        {first && (
          <Reveal delay={0.2} className="mt-9">
            <KeycapButton href={mapHref(first.href, first.label)} fullWidthMobile>{first.label}</KeycapButton>
          </Reveal>
        )}

        {meta.length > 0 && (
          <Reveal delay={0.25} className="mt-10 grid w-full max-w-[1040px] gap-3 text-left sm:grid-cols-3">
            {meta.map((m, i) => (
              <div key={i} className="flex items-start gap-3.5 rounded-[12px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={(m[0] as Extract<Block, { k: "img" }>).src} alt="" className="size-10 shrink-0 rounded-[10px] bg-white/90 p-2" />
                <div className="min-w-0 text-[15px] leading-snug">
                  {m.slice(1).map((h, k) => (
                    <p key={k} className={cn("break-words", k === 0 ? "font-semibold text-white" : "mt-1 text-white/70")}>
                      <Inline s={trim((h as Extract<Block, { k: "h" }>).s)} />
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        )}

        {notes.length > 0 && (
          <Reveal delay={0.3} className="mt-8 w-full max-w-[860px] rounded-[12px] border border-brand-300/20 bg-brand-300/[0.06] px-5 py-4 text-left text-[15px] leading-relaxed text-white/85 backdrop-blur-md">
            {notes.map((n, i) => (
              <p key={i} className={i ? "mt-3" : ""}><Inline s={trim((n as Extract<Block, { k: "p" }>).s)} /></p>
            ))}
          </Reveal>
        )}

        {framed && (
          <Reveal delay={0.3} y={40} className="relative z-10 mt-12 w-full max-w-[1040px] translate-y-12 sm:translate-y-20">
            <div className="rounded-[18px] border border-white/20 bg-[#0b2a33] p-2 shadow-[0_40px_120px_-30px_rgb(0_180_216/0.55)] sm:p-3">
              <div className="overflow-hidden rounded-[12px] border border-white/10 bg-abyss">
                {video ? (
                  <VideoFrame src={video.src} poster={video.poster} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image!.src} alt={image!.alt} className="aspect-video w-full object-cover" />
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- content --- */

type Ctx = { dark: boolean; id: string };

function HeadingText({ h, dark }: { h: Extract<Block, { k: "h" }>; dark?: boolean }) {
  const long = segText(h.s).length > 56;
  return (
    <h2 className={cn("font-display font-semibold tracking-[-0.015em]", long ? "text-[26px] leading-[1.18] sm:text-[34px] lg:text-[40px]" : "h-section")}>
      <Inline s={tidy(trim(h.s))} />
    </h2>
  );
}

function GroupView({ g, ctx }: { g: Extract<Block, { k: "group" }>; ctx: Ctx }) {
  const { dark } = ctx;
  const muted = dark ? "text-white/75" : "text-ink-soft";
  const items = g.items;

  // Testimonials: [role, company, quote]
  if (isTestimonialGroup(g)) {
    return (
      <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((it, i) => {
          const [a, b, q] = ps(it);
          return (
            <figure key={i} className="break-inside-avoid rounded-[12px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.7)] backdrop-blur-sm">
              <span aria-hidden className="font-display text-5xl leading-none text-brand">“</span>
              <blockquote className="-mt-2 text-[15px] leading-[1.7] text-white/85"><Inline s={trim(q.s)} /></blockquote>
              <figcaption className="mt-5 border-t border-white/10 pt-4">
                <p className="font-semibold text-white"><Inline s={trim(a.s)} /></p>
                <p className="text-sm text-brand-300"><Inline s={trim(b.s)} /></p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    );
  }

  // Speakers
  if (items.some((it) => ps(it).some((p) => blockText(p) === "Speaker"))) {
    return (
      <div className="grid gap-8">
        {items.map((it, i) => {
          const img = it.find(isRaster) as Extract<Block, { k: "img" }> | undefined;
          const body = it.filter((b) => b !== img && blockText(b) !== "Speaker");
          const name = body.find(heading) as Extract<Block, { k: "h" }> | undefined;
          return (
            <div key={i} className={cn("grid items-start gap-6 rounded-[14px] border p-6 sm:p-8 md:grid-cols-[220px_1fr] md:gap-10", dark ? "border-white/10 bg-white/[0.04]" : "border-line bg-white shadow-card")}>
              {img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img.src} alt={name ? segText(name.s) : ""} loading="lazy" className="aspect-square w-full max-w-[220px] rounded-[12px] object-cover" />
              )}
              <div className="min-w-0">
                <p className={cn("text-sm font-semibold uppercase tracking-wider", accent(dark))}>Speaker</p>
                <BlockList blocks={body} ctx={ctx} speaker />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const numbered = items.some((it) => ps(it).some((p) => /^\d{1,2}$/.test(blockText(p))));
  const five = items.length === 5;
  const cols = five ? "sm:grid-cols-2 lg:grid-cols-6" : items.length === 6 ? "sm:grid-cols-2 lg:grid-cols-3" : items.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : items.length === 3 ? "md:grid-cols-3" : items.length === 2 ? "md:grid-cols-2" : "";
  const wide = items.some((it) => it.length > 6 || it.reduce((n, b) => n + blockText(b).length, 0) > 700);

  return (
    <div className={cn("grid gap-5", wide ? "md:grid-cols-2" : cols)}>
      {items.map((it, i) => {
        const icon = it[0] && isSvg(it[0]) ? (it[0] as Extract<Block, { k: "img" }>) : undefined;
        const rest = it.filter((b) => b !== icon && !(b.k === "p" && /^\d{1,2}$/.test(blockText(b))));
        const num = it.find((b) => b.k === "p" && /^\d{1,2}$/.test(blockText(b)));
        const ticks = rest.some(isSvg);
        const hasHead = rest.some(heading);
        const ptxt = rest.filter((b) => b.k === "p");
        // [label, body] cards: the short first line is the title
        const titleFirst = !hasHead && ptxt.length >= 2 && blockText(ptxt[0]).length < 60 && blockText(ptxt[1]).length > blockText(ptxt[0]).length;
        const ordered = hasHead ? [...rest.filter(heading), ...rest.filter((b) => !heading(b))] : rest;
        return (
          <div key={i} className={cn("group relative min-w-0 overflow-hidden rounded-[12px] border p-6 transition duration-300 hover:-translate-y-0.5", dark ? "border-white/10 bg-white/[0.04] hover:border-brand/50" : "border-line bg-white shadow-card hover:shadow-lift", five && !wide && "lg:col-span-2", five && !wide && i === 3 && "lg:col-start-2", five && !wide && i === 4 && "sm:col-span-2", wide && items.length % 2 === 1 && i === items.length - 1 && "md:col-span-2")}>
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand to-brand-300 opacity-60 transition-opacity group-hover:opacity-100" />
            {icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={icon.src} alt="" loading="lazy" className="mb-4 size-12" />
            )}
            {num && <span className={cn("mb-3 block font-display text-3xl font-semibold", accent(dark))}>{blockText(num)}</span>}
            {ticks ? <TickList blocks={rest} muted={muted} /> : <BlockList blocks={ordered} ctx={ctx} card titleFirst={titleFirst} />}
          </div>
        );
      })}
    </div>
  );
}

/** img(tick) + text rows, as used by the UAE procurement showcase. */
function TickList({ blocks, muted }: { blocks: Block[]; muted: string }) {
  const head = blocks.filter(heading);
  const rows: Block[][] = [];
  for (const b of blocks) {
    if (heading(b)) continue;
    if (isSvg(b)) rows.push([]);
    else rows[rows.length - 1]?.push(b);
  }
  return (
    <div>
      {head.map((h, i) => (
        <h3 key={i} className="mb-5 font-display text-xl font-semibold leading-snug"><Inline s={trim((h as Extract<Block, { k: "h" }>).s)} /></h3>
      ))}
      <ul className="space-y-3.5">
        {rows.map((r, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
              <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.5 6.2l2.4 2.3 4.6-4.8" /></svg>
            </span>
            <span className={cn("text-[16px] leading-relaxed", muted)}>
              {r.map((p, k) => (p.k === "p" ? <Fragment key={k}>{k > 0 && " "}<Inline s={trim(p.s)} /></Fragment> : null))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlockList({ blocks, ctx, card, speaker, titleFirst }: { blocks: Block[]; ctx: Ctx; card?: boolean; speaker?: boolean; titleFirst?: boolean }) {
  const { dark } = ctx;
  const muted = dark ? "text-white/75" : "text-ink-soft";
  const items = mergeGroups(blocks);
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let paraIdx = 0;
  while (i < items.length) {
    const b = items[i];
    // consecutive raster/svg logos become one strip
    if (b.k === "img" && items.slice(i).filter((x, k) => k < 12 && x.k === "img").length >= 4 && items[i + 1]?.k === "img") {
      const logos: Extract<Block, { k: "img" }>[] = [];
      while (items[i]?.k === "img") logos.push(items[i++] as Extract<Block, { k: "img" }>);
      nodes.push(
        <ul key={`l${i}`} className="grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((l, k) => (
            <li key={k} className="flex h-16 items-center justify-center rounded-[10px] bg-white/95 px-5 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.alt} loading="lazy" className={cn("max-h-full max-w-full object-contain opacity-90 transition hover:opacity-100", logoFix(l.src) ?? (/\.svg(\?|$)/i.test(l.src) ? "brightness-0" : "grayscale hover:grayscale-0"))} />
            </li>
          ))}
        </ul>,
      );
      continue;
    }
    // consecutive link cards share a grid
    if (b.k === "link" && b.b.some(isRaster)) {
      const cards: Extract<Block, { k: "link" }>[] = [];
      while (items[i]?.k === "link" && (items[i] as Extract<Block, { k: "link" }>).b.some(isRaster)) cards.push(items[i++] as Extract<Block, { k: "link" }>);
      nodes.push(
        <ul key={`c${i}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, k) => {
            const img = c.b.find(isRaster) as Extract<Block, { k: "img" }>;
            const txt = ps(c.b);
            const href = mapHref(c.href);
            return (
              <li key={k}>
                <a href={href} {...linkAttrs(href)} className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-white text-ink shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <span className="flex flex-1 flex-col gap-2 p-5">
                    {txt.map((p, n) => (
                      <span key={n} className={cn("block", n === 0 && txt.length > 1 ? "text-[15px] leading-snug text-ink-soft" : "font-display text-lg font-semibold leading-snug")}>
                        <Inline s={trim(p.s)} />
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>,
      );
      continue;
    }
    nodes.push(<BlockView key={i} b={b} ctx={ctx} muted={muted} card={card} speaker={speaker} first={paraIdx++ === 0} titleFirst={titleFirst} />);
    i++;
  }
  return <div className={cn("min-w-0", card ? "space-y-3" : "space-y-6")}>{nodes}</div>;
}

function BlockView({ b, ctx, muted, card, speaker, first, titleFirst }: { b: Block; ctx: Ctx; muted: string; card?: boolean; speaker?: boolean; first?: boolean; titleFirst?: boolean }) {
  const { dark } = ctx;
  switch (b.k) {
    case "h": {
      const t = segText(b.s);
      if (speaker) return <h3 className="mt-1 font-display text-2xl font-semibold sm:text-3xl"><Inline s={tidy(trim(b.s))} /></h3>;
      if (b.l <= 2 && card) return <p className={cn("font-display text-sm font-semibold tracking-wide", accent(dark))}><Inline s={tidy(trim(b.s))} /></p>;
      if (b.l <= 2) return <HeadingText h={b} dark={dark} />;
      if (t.length > 90) return <p className={cn("max-w-3xl text-xl leading-[1.55]", dark ? "text-white/90" : "text-ink")}><Inline s={tidy(trim(b.s))} /></p>;
      if (speaker) return <h3 className="mt-1 font-display text-2xl font-semibold"><Inline s={tidy(trim(b.s))} /></h3>;
      return <h3 className={cn("font-display font-semibold leading-snug", card ? "text-lg" : "text-xl")}><Inline s={tidy(trim(b.s))} /></h3>;
    }
    case "p": {
      const t = blockText(b);
      if (/^[“"]/.test(t)) {
        return (
          <blockquote className={cn("relative max-w-3xl border-l-4 border-brand py-1 pl-6 text-lg italic leading-[1.7]", dark ? "text-white/85" : "text-ink-soft")}>
            <Inline s={trim(b.s)} />
          </blockquote>
        );
      }
      if (speaker && first) return <p className={cn("mt-1 text-base font-medium", accent(dark))}><Inline s={trim(b.s)} /></p>;
      if (card && titleFirst && first) return <h3 className="font-display text-lg font-semibold leading-snug"><Inline s={trim(b.s)} /></h3>;
      return <p className={cn("max-w-3xl text-[16px] leading-[1.75] sm:text-[17px]", card && "text-[16px] leading-[1.65]", muted)}><Inline s={trim(b.s)} /></p>;
    }
    case "img":
      if (/Background(%20| )Hero/i.test(b.src)) return null; // decorative leftover from the CMS hero, renders as a black square
      return isSvg(b) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={b.src} alt={b.alt} loading="lazy" className="size-12" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={b.src} alt={b.alt} loading="lazy" className="w-full max-w-4xl rounded-[12px] border border-line object-cover" />
      );
    case "video":
      return <VideoFrame src={b.src} poster={b.poster} className="max-w-4xl rounded-[12px]" />;
    case "cta":
      return <CtaButton label={b.label} href={b.href} dark={dark} />;
    case "link": {
      const href = mapHref(b.href, ps(b.b).map(blockText).find((x) => CONSULT.test(x)));
      const label = ps(b.b).find((p) => CONSULT.test(blockText(p)));
      if (label && ps(b.b).every((p) => CONSULT.test(blockText(p)))) return <CtaButton label={blockText(label)} href={b.href} dark={dark} />;
      // a card that links to another guide
      return (
        <a href={href} {...linkAttrs(href)} className={cn("group block max-w-4xl rounded-[14px] border p-6 transition duration-300 hover:-translate-y-0.5 sm:p-8", dark ? "border-white/10 bg-white/[0.04] hover:border-brand/60" : "border-line bg-white shadow-card hover:shadow-lift")}>
          <BlockList blocks={b.b.filter((x) => !(x.k === "p" && blockText(x) === "Learn More"))} ctx={ctx} card />
          <span className={cn("mt-5 inline-flex items-center gap-2 font-semibold", accent(dark))}>Learn More <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></span>
        </a>
      );
    }
    case "group":
      return <GroupView g={b} ctx={ctx} />;
    case "tabs":
      return (
        <FlowTabs
          id={ctx.id}
          dark={dark}
          logoTabs={b.labels.some((l) => l.some((x) => x.k === "img"))}
          labels={b.labels.map((l, i) => <LabelView key={i} blocks={l} dark={dark} />)}
          panes={b.panes.map((p, i) => <BlockList key={i} blocks={p} ctx={ctx} />)}
        />
      );
  }
}

function LabelView({ blocks, dark }: { blocks: Block[]; dark: boolean }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.k === "img" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={b.src} alt={b.alt} className="h-8 w-auto max-w-full" />
        ) : b.k === "h" ? (
          <span key={i} className="font-display text-[15px] font-semibold text-brand"><Inline s={trim(b.s)} /></span>
        ) : b.k === "p" ? (
          <span key={i} className={cn("text-[14px] leading-snug", dark ? "text-white/80" : "text-ink")}><Inline s={trim(b.s)} /></span>
        ) : null,
      )}
    </>
  );
}

/* ---------------------------------------------------------- sections --- */

const TONE = {
  light: { bg: "bg-white text-ink [&_a.il]:text-brand-600", color: "#ffffff" },
  mist: { bg: "bg-mist text-ink [&_a.il]:text-brand-600", color: "var(--color-mist)" },
  dark: { bg: "bg-deep text-white [&_a.il]:text-brand-300", color: "var(--color-deep)" },
  abyss: { bg: "bg-abyss text-white [&_a.il]:text-brand-300", color: "var(--color-abyss)" },
} as const;
type Tone = keyof typeof TONE;

function SectionView({ sec, tone, prev, idx, spaced, beforeDark }: { sec: Section; tone: Tone; prev: Tone | "hero"; idx: number; spaced?: boolean; beforeDark?: boolean }) {
  const dark = tone === "dark" || tone === "abyss";
  const ctx: Ctx = { dark, id: `s${idx}` };
  const edge = prev !== tone && prev !== "hero" && (dark || prev === "dark" || prev === "abyss");
  const empty = !!sec.head && sec.blocks.length === 0;
  const prose = !!sec.head && sec.blocks.length > 0 && sec.blocks.every((b) => b.k === "p");
  const rule = <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-gradient-to-r from-brand to-brand-300" />;
  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", empty && "py-12 sm:py-14 lg:py-16", TONE[tone].bg, spaced && "pt-24 sm:pt-32 lg:pt-36", beforeDark && "pb-28 sm:pb-32 lg:pb-40")}>
      {edge && <PixelEdge color={TONE[tone].color} accent={dark} />}
      <div className="container-page">
        <Reveal>
          {prose ? (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div className="self-start lg:sticky lg:top-28">
                {rule}
                <HeadingText h={sec.head!} dark={dark} />
              </div>
              <div className={cn("border-l-2 pl-6 sm:pl-8", dark ? "border-brand-300/40" : "border-brand/30", dark ? "[&_p:first-child]:text-white" : "[&_p:first-child]:text-ink", "[&_p:first-child]:text-[18px] [&_p:first-child]:leading-[1.65] sm:[&_p:first-child]:text-[20px]")}>
                <BlockList blocks={sec.blocks} ctx={ctx} />
              </div>
            </div>
          ) : (
            <>
              {sec.head && (
                <div className={cn("max-w-3xl", empty ? "" : "mb-10")}>
                  {rule}
                  <HeadingText h={sec.head} dark={dark} />
                </div>
              )}
              <SectionContent blocks={sec.blocks} ctx={ctx} />
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Text next to a portrait/figure when a section is just prose plus one picture. */
function SectionContent({ blocks, ctx }: { blocks: Block[]; ctx: Ctx }) {
  const imgs = blocks.filter(isRaster);
  const hasGroup = blocks.some((b) => b.k === "group" || b.k === "tabs" || b.k === "link");
  if (imgs.length === 1 && !hasGroup && ps(blocks).length >= 2 && blocks.filter(isRaster).length === 1 && blocks.length <= 8) {
    const img = imgs[0] as Extract<Block, { k: "img" }>;
    return (
      <div className="grid items-start gap-8 md:grid-cols-[1fr_280px] md:gap-12">
        <BlockList blocks={blocks.filter((b) => b !== img)} ctx={ctx} speaker />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/5] w-full max-w-[280px] rounded-[14px] object-cover md:order-last" />
      </div>
    );
  }
  return <BlockList blocks={blocks} ctx={ctx} />;
}

/** Closing call to action, in the homepage's horizon-glow panel. */
function CtaPanel({ sec, label, href }: { sec: Section; label: string; href: string }) {
  return (
    <section aria-label="Call to action" className="relative bg-coal px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
      <PixelEdge color="var(--color-coal)" />
      <Reveal data-helix-host className="relative isolate mx-auto max-w-[1240px] overflow-hidden rounded-[14px] border border-white/10 bg-[#071419] px-6 py-16 text-center text-white sm:py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -bottom-[75%] left-1/2 h-[120%] w-[150%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#4cc3e6_0%,#17607b_40%,transparent_100%)] opacity-80" />
          <HelixField className="absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_70%_75%_at_50%_50%,rgba(0,0,0,0.28)_0%,#000_78%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_48%,rgba(7,20,25,0.72)_0%,transparent_100%)]" />
        </div>
        {sec.head && <h2 className="mx-auto max-w-[760px] font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] sm:text-[44px]"><Inline s={tidy(trim(sec.head.s))} /></h2>}
        {sec.blocks.map((b, i) =>
          b.k === "p" || b.k === "h" ? (
            <p key={i} className={cn("mx-auto mt-5 max-w-[640px] leading-[1.65]", b.k === "h" ? "text-lg text-white/90" : "text-base text-white/80")}><Inline s={trim(b.s)} /></p>
          ) : null,
        )}
        <KeycapButton href={href} fullWidthMobile className="mt-9">{label}</KeycapButton>
        <p className="mx-auto mt-8 max-w-[520px] text-xs text-white/60">
          I have read and agree to the{" "}
          <a href={LINKS.privacy} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-300">Privacy Policy</a> and{" "}
          <a href={LINKS.terms} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-300">Terms &amp; Conditions</a>.
        </p>
      </Reveal>
    </section>
  );
}

function PresenceSection({ sec, tone, prev, idx, beforeDark }: { sec: Section; tone: Tone; prev: Tone | "hero"; idx: number; beforeDark?: boolean }) {
  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", TONE[tone].bg, beforeDark && "pb-28 sm:pb-32 lg:pb-40")}>
      {prev !== tone && prev === "dark" && <PixelEdge color={TONE[tone].color} accent={false} />}
      <div className="container-page">
        <Reveal className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            {sec.head && <h2 className="h-section text-brand-600"><Inline s={trim(sec.head.s)} /></h2>}
            <div className="mt-6"><BlockList blocks={sec.blocks.filter((b) => b.k === "p")} ctx={{ dark: false, id: `p${idx}` }} /></div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MAP} alt="" loading="lazy" className="w-full" />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- case studies --- */

const isCaseKey = (k: string) => k.startsWith("case-studies/");
const pageTitle = (key: string) => {
  const h = PAGES[key]?.blocks.find((b) => b.k === "h") as Extract<Block, { k: "h" }> | undefined;
  return h ? segText(h.s) : key;
};

/** Pull "what" and "for whom" out of titles shaped like "Demand Forecasting for a Large Distributor". */
function splitCaseTitle(title: string) {
  const m = title.match(/^(.*?)\s+for\s+(.+)$/i);
  if (!m) return { what: title, who: null as string | null };
  const who = m[2].replace(/^(a|an|the)\s+/i, (x) => x.toLowerCase());
  return { what: m[1], who: who[0].toUpperCase() + who.slice(1) };
}

/** Breaks one long paragraph into a lead sentence followed by short two-sentence paragraphs. */
function paragraphise(text: string) {
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z“"(])/).filter(Boolean);
  if (sentences.length < 3) return [text];
  const out = [sentences[0]];
  for (let i = 1; i < sentences.length; i += 2) out.push(sentences.slice(i, i + 2).join(" "));
  return out;
}

function CaseBackground({ sec, pageKey }: { sec: Section; pageKey: string }) {
  const { what, who } = splitCaseTitle(pageTitle(pageKey));
  const text = sec.blocks.filter((b) => b.k === "p").map(blockText).join(" ");
  const paras = paragraphise(text);
  const keys = Object.keys(PAGES).filter(isCaseKey);
  const at = keys.indexOf(pageKey);
  const more = [1, 2, 3].map((n) => keys[(at + n) % keys.length]).filter((k) => k !== pageKey);
  const facts = [
    { label: "Solution", value: what },
    ...(who ? [{ label: "Client", value: who }] : []),
  ];

  return (
    <>
      <section className={cn("relative bg-white py-16 sm:py-20 lg:py-24")}>
        <div className="container-page">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            <div>
              <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-gradient-to-r from-brand to-brand-300" />
              <h2 className="h-section">{sec.head ? <Inline s={tidy(trim(sec.head.s))} /> : "The Background"}</h2>
              <div className="mt-8 space-y-6">
                {paras.map((p, i) =>
                  i === 0 ? (
                    <p key={i} className="max-w-3xl border-l-2 border-brand/40 pl-5 text-[20px] leading-[1.6] text-ink sm:pl-6 sm:text-[22px]">{p}</p>
                  ) : (
                    <p key={i} className="max-w-3xl text-[17px] leading-[1.8] text-ink-soft">{p}</p>
                  ),
                )}
              </div>
            </div>

            <aside className="space-y-5 self-start lg:sticky lg:top-28">
              <div className="rounded-[14px] border border-line bg-mist p-6 shadow-card">
                <p className="font-mono text-sm font-medium uppercase tracking-widest text-[#007a96]">At a glance</p>
                <dl className="mt-5 space-y-5">
                  {facts.map((f) => (
                    <div key={f.label} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                      <dt className="text-sm text-ink-mute">{f.label}</dt>
                      <dd className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-[14px] bg-deep p-6 text-white">
                <p className="font-display text-xl font-semibold leading-snug">Facing a similar challenge?</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">Tell us about it and we will show you what a comparable approach could look like for your data.</p>
                <div className="mt-5"><KeycapButton href={LINKS.contact}>Talk to an Expert</KeycapButton></div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {more.length > 0 && (
        <section className="relative border-t border-line bg-white py-16 sm:py-20">
          <div className="container-page">
            <Reveal>
              <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-gradient-to-r from-brand to-brand-300" />
              <h2 className="h-section">More case studies</h2>
              <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {more.map((k, i) => (
                  <li key={k}>
                    <a href={`/${k}`} className="group flex h-full flex-col rounded-[14px] border border-line bg-mist p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:border-brand/40 hover:shadow-lift">
                      <span className="font-mono text-sm font-medium tracking-widest text-[#007a96]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{pageTitle(k)}</span>
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-[#007a96]">Read case study <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

/* -------------------------------------------------------------- page --- */

export function flowMetadata(key: string, path: string): Metadata {
  const p = getPage(key);
  const firstP = p.blocks.find((b) => b.k === "p" && blockText(b).length > 60);
  const description = p.description?.trim() || (firstP ? blockText(firstP).slice(0, 160) : undefined);
  return {
    title: { absolute: p.title },
    description,
    alternates: { canonical: path },
    openGraph: { title: p.title, description, url: path, images: p.og ? [p.og] : undefined },
    twitter: { title: p.title, description, images: p.og ? [p.og] : undefined },
  };
}

export function FlowPage({ pageKey }: { pageKey: string }) {
  const page = getPage(pageKey);
  const { title, hero, rest } = splitHero(page.blocks);
  const sections = splitSections(rest);
  const framed = hero.some((b) => b.k === "video") || hero.some(isRaster);
  const caseStudy = isCaseKey(pageKey);
  const caseWho = caseStudy ? splitCaseTitle(pageTitle(pageKey)).who : null;
  const ctaLabel = (page.blocks.find((b) => b.k === "cta") as Extract<Block, { k: "cta" }> | undefined)?.label ?? (caseStudy ? "Request the Full Case Study" : "Contact Us");

  const isCta = (sec: Section) => /^(register now|interested in learning more\??|schedule a consultation)$/i.test(sec.head ? segText(sec.head.s) : "");
  const body = sections.filter((s) => !isCta(s));
  const ctaSec = sections.find(isCta) ?? null;

  // pass 1: choose a tone per section (dark for testimonials and the logo band, otherwise alternate)
  const tones: Tone[] = [];
  let last: Tone = "mist";
  body.forEach((sec, i) => {
    const logoBand = !sec.head && sec.blocks.filter((b) => b.k === "img").length >= 4;
    const hasTestimonials = sec.blocks.some((b) => b.k === "group" && isTestimonialGroup(b));
    let t: Tone = logoBand ? "abyss" : hasTestimonials ? "dark" : last === "light" ? "mist" : "light";
    if ((last === "dark" || last === "abyss") && t !== "dark" && t !== "abyss") t = "light";
    tones.push(t);
    last = t;
  });

  // pass 2: render
  const nodes = body.map((sec, i) => {
    const t = tones[i];
    const prev: Tone | "hero" = i === 0 ? "hero" : tones[i - 1];
    const next: Tone | "cta" | undefined = i + 1 < body.length ? tones[i + 1] : ctaSec ? "cta" : undefined;
    const beforeDark = next === "dark" || next === "abyss" || next === "cta" || ((t === "dark" || t === "abyss") && next !== undefined);
    const h = sec.head ? segText(sec.head.s) : "";
    if (caseStudy && /background/i.test(h)) return <CaseBackground key={i} sec={sec} pageKey={pageKey} />;
    return /global presence/i.test(h) ? (
      <PresenceSection key={i} sec={sec} tone={t} prev={prev} idx={i} beforeDark={beforeDark} />
    ) : (
      <SectionView key={i} sec={sec} tone={t} prev={prev} idx={i} spaced={i === 0 && framed} beforeDark={beforeDark} />
    );
  });

  return (
    <PageShell>
      <Hero
        page={page}
        title={title}
        hero={hero}
        eyebrow={caseStudy ? "Case Study" : undefined}
        leadText={caseWho ? `A look at how we worked with ${caseWho[0].toLowerCase()}${caseWho.slice(1)}.` : undefined}
        ctaLabel={caseStudy ? "Discuss a Similar Project" : undefined}
      />
      {nodes}
      {ctaSec && <CtaPanel sec={ctaSec} label={ctaLabel} href={LINKS.contact} />}
    </PageShell>
  );
}
