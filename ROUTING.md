# Routing: how paths reach the right site

The Next.js app owns exactly one page, `/`. Every other path on the domain is
reverse-proxied (a Vercel **rewrite**, so the address bar keeps our URL) to the
original site. The rules live in [`vercel.json`](vercel.json). JSON has no
comments, so this file is the documentation.

## Order matters: the first matching rule wins

| # | Source | Destination | Why |
|---|--------|-------------|-----|
| 1 | `/webinars`, `/webinars/*` | `www.soothsayeranalytics.ai/webinars…` | Existing, kept as-is |
| 2 | `/digital-competency`, `/responsible-ai` | `www.soothsayeranalytics.ai/…` | Existing, kept as-is |
| 3 | `/case-studies` | `soothsayeranalytics.com/case-studies` | The real listing (57 studies). It does **not** exist on `.ai` (404). Safe to proxy: the page uses only absolute URLs |
| 4 | `/case-studies/<slug>` | `www.soothsayeranalytics.ai/case-studies/<slug>` | The 22 detail pages in the `.ai` sitemap |
| 5 | `/about` | `www.soothsayeranalytics.ai/soothsayer-new/about` | `.ai` only has About under `/soothsayer-new/` |
| 6 | `/soothsayer-new/*` | `www.soothsayeranalytics.ai/soothsayer-new/*` | Webflow preview pages |
| 7 | `/uae/*` | `www.soothsayeranalytics.ai/uae/*` | UAE pages |
| 8 | `/*` (anything else, one or more segments) | `www.soothsayeranalytics.ai/*` | Catch-all: the top-level article slugs (`/soothgpt`, `/ai-in-procurement`, …), `/robots.txt`, `/sitemap.xml` |

Rules 6 and 7 are covered by the catch-all too; they stay so the critical
prefixes are explicit and survive any future change to rule 8.

## Why `/` is safe

- `:path+` needs **at least one** segment, so `/` never matches a rewrite and is
  served by Next.js.
- Vercel applies rewrites **after** the filesystem. `/_next/*`, `/favicon/*` and
  anything in `public/` are served first and never reach the catch-all.
- Unknown paths fall through to Webflow, which returns its own 404.

## Before pointing the real domain at this project

Every destination uses the host `www.soothsayeranalytics.ai`. That is correct
**today**, while the site is on `soothsayer-new.vercel.app` and that host still
resolves to Webflow. Once `www.soothsayeranalytics.ai` itself points at Vercel,
those rewrites will call back into this project and **loop**.

Before the DNS cutover:

1. In Webflow, find the site's staging host (Site settings → Publishing →
   `<name>.webflow.io`). It is not guessable, and the `.ai` HTML does not expose it.
2. Replace `https://www.soothsayeranalytics.ai` with that host throughout
   `vercel.json` (one find-and-replace).
3. Add the production domain to `SELF_HOSTS` in
   `scripts/check-routes.py` so the loop check covers it.

The `.com` destination (rule 3) is a different server and needs no change.

## Checking the rules

Vercel rewrites cannot run locally, so `scripts/check-routes.py` re-implements
the matching and proves the mapping instead:

```bash
python scripts/check-routes.py              # resolves every path, fetches each destination (needs network)
python scripts/check-routes.py --no-fetch   # mapping only
```

It checks the launch checklist and every path in `scripts/sitemap-paths.txt`
(a copy of the original `.ai` sitemap), expects HTTP 200 from each destination,
and fails on a loop. To refresh the path list, regenerate it from
`https://www.soothsayeranalytics.ai/sitemap.xml`.

## Known limits

- `/case-studies/<slug>` uses the `.ai` slugs. A few studies have different slugs
  on `soothsayeranalytics.com` (for example `enterprise-chat-gpt-…` there versus
  `enterprise-chatgpt-…` on `.ai`). The homepage cards link straight to the `.com`
  URLs, so they are unaffected.
- The `.com` site's other pages are reached through the homepage's absolute links,
  not through these rewrites.
