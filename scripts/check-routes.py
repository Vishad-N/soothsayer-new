"""
Checks that nothing on this site depends on the old soothsayeranalytics.ai site any more.

    python scripts/check-routes.py                      # offline: reads vercel.json, next.config.ts and app/
    python scripts/check-routes.py --base http://localhost:3000   # also requests every path

What it proves:
  1. vercel.json has no rewrite to the old `.ai` host (the only remaining rewrites go to the .com site).
  2. Every path in scripts/sitemap-paths.txt (a snapshot of the old .ai sitemap) is now served here:
     by a page in app/, by a redirect in next.config.ts, or it is listed in DROPPED below on purpose.
"""
import json, re, sys, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OLD_HOST = "soothsayeranalytics.ai"

# Old Webflow preview pages (/soothsayer-new/*): never part of the public site, so they now 404.
DROPPED = re.compile(r"^/soothsayer-new/")

# Dynamic routes: prefix -> file that lists the valid slugs
DYNAMIC = {
    "/webinars/": "data/webinars.json",
    "/services/": "data/services.ts",
    "/capabilities/": "data/capabilities.ts",
}

fails = []

# 1. rewrites
cfg = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))
for r in cfg.get("rewrites", []):
    if OLD_HOST in r["destination"]:
        fails.append(f"vercel.json rewrite {r['source']} still points at the old site: {r['destination']}")
print("rewrites left in vercel.json:", [(r["source"], r["destination"]) for r in cfg.get("rewrites", [])])

# redirects declared in next.config.ts
nc = (ROOT / "next.config.ts").read_text(encoding="utf-8")
redirects = dict(re.findall(r'\["(/[^"]+)",\s*"([^"]+)"\]', nc))
redirects.update({m[0]: m[1] for m in re.findall(r'source:\s*"(/[^"]+)",\s*destination:\s*"([^"]+)"', nc)})
for src, dst in redirects.items():
    if OLD_HOST in dst:
        fails.append(f"redirect {src} points at the old site: {dst}")

# 2. coverage of the old sitemap
def served(path):
    p = path.strip("/")
    if (ROOT / "app" / p / "page.tsx").exists() or path == "/":
        return "page"
    if path in redirects:
        return "redirect"
    for prefix, f in DYNAMIC.items():
        if path.startswith(prefix):
            slug = path[len(prefix):]
            if slug and slug in (ROOT / f).read_text(encoding="utf-8"):
                return "dynamic page"
    if any(r["source"] == path for r in cfg.get("rewrites", [])):
        return "rewrite (.com)"
    return None

paths = [l for l in (ROOT / "scripts/sitemap-paths.txt").read_text(encoding="utf-8").split() if l.startswith("/")]
by = {}
for p in paths:
    if DROPPED.match(p):
        by.setdefault("dropped on purpose", []).append(p); continue
    how = served(p)
    if how is None:
        fails.append(f"{p} from the old sitemap is not served here")
    else:
        by.setdefault(how, []).append(p)
for how, ps in by.items():
    print(f"{len(ps):3d}  {how}")

# optional live request
if "--base" in sys.argv:
    base = sys.argv[sys.argv.index("--base") + 1].rstrip("/")
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *a, **k): return None
    opener = urllib.request.build_opener(NoRedirect)
    for p in paths:
        if DROPPED.match(p): continue
        try: code = opener.open(base + p, timeout=60).status
        except urllib.error.HTTPError as e: code = e.code
        except Exception as e: code = f"ERR {e}"
        if code not in (200, 301, 307, 308):
            fails.append(f"{p} answered {code}")

print(f"\n{len(paths)} paths checked | failures: {len(fails)}")
for f in fails: print("  FAIL", f)
sys.exit(1 if fails else 0)
