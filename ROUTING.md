# Routing: how paths reach the right page

Every page of the site is a native Next.js page. Nothing is proxied to the old
`www.soothsayeranalytics.ai` Webflow site any more. The only external rewrites left
in [`vercel.json`](vercel.json) go to the `.com` site, for two pages that are not built here yet.

## Native pages

| Area | Paths | Content lives in |
|------|-------|------------------|
| Home | `/` | `data/content.ts` |
| Capabilities | `/capabilities`, `/capabilities/<slug>` (6) | `data/capabilities.ts`, `components/capability/` |
| Services | `/services`, `/services/<slug>` (8) | `data/services.ts`, `components/services/` |
| Webinars | `/webinars`, `/webinars/<slug>` (12) | `data/webinars.ts` + `data/webinars.json`, `components/webinars/` |
| Foundation | `/philanthropy` | `app/philanthropy/page.tsx` |
| Guides and session pages | `/<slug>` (9 webinar session pages and the guides), `/uae/*` (4) | `data/site-pages.json`, `components/flow/` |
| Case studies | `/case-studies/<slug>` (18) | `data/site-pages.json`, `components/flow/` |
| Other | `/digital-twin-and-genai-a-manager-guide`, `/genai-adoption-strategies-for-leaders`, `/responsible-ai`, `/soothgpt` | `app/` |
| Search engines | `/robots.txt`, `/sitemap.xml` | `app/robots.ts`, `app/sitemap.ts` (the sitemap lists every page under `app/` plus the data-driven ones) |
| Forms | `POST /api/webinar-request` | `app/api/webinar-request/route.ts` |

## Rewrites that remain (`vercel.json`)

| Source | Destination | Why |
|--------|-------------|-----|
| `/case-studies` | `soothsayeranalytics.com/case-studies` | The listing of 57 studies is not built here; only 18 detail pages are |
| `/contact` | `soothsayeranalytics.com/contact-us` | The contact form lives on the `.com` site |

## Redirects (`next.config.ts`)

- **301, Services:** nine retired pages (`/strategy-blueprint`, `/digital-competency`, `/corporate-training`, `/research-and-development`, ...) go to their `/services/...` replacement.
- **301, Webinars:** the three old stand-alone landing pages (`/responsible-ai-webinar`, `/building-digital-competency-webinar`, `/ai-driven-digital-transformation-in-manufacturing-webinar`) go to their recap page under `/webinars/`.
- **307:** `/about` goes to `soothsayeranalytics.com/about-us` until an About page is built here.

Anything else that is not a page answers with a normal 404.

## Left out on purpose

The old site also published 13 Webflow preview pages under `/soothsayer-new/*`
(home, about, blogs, industries, ...). They were drafts, not part of the public
site, and now return 404.

## The webinar form

The "Download the Presentation" form posts to `/api/webinar-request`, which forwards
the submission as JSON to `WEBINAR_FORM_WEBHOOK_URL` (a CRM, Zapier, a mail relay: anything
that accepts a POST). **Set that variable in Vercel before launch.** Without it the endpoint
answers 503 and the form tells the visitor delivery failed and offers an e-mail address,
rather than claiming a submission that went nowhere.

## Checking the routing

    python scripts/check-routes.py                       # offline
    python scripts/check-routes.py --base http://localhost:3000   # also requests every path

The script fails if any rewrite or redirect points at the old `.ai` host, or if a path from
the old sitemap (`scripts/sitemap-paths.txt`) is no longer served.

## Before pointing the real domain at this project

With the proxy gone there is no longer a loop to worry about. Add the production domain in
Vercel, and set `WEBINAR_FORM_WEBHOOK_URL` and the analytics ids (`NEXT_PUBLIC_GTM_ID`,
`NEXT_PUBLIC_GA_ID`).
