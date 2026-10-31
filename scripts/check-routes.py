"""
Checks vercel.json rewrites without deploying.

Vercel applies rewrites on its own servers, so they cannot run locally. This script
re-implements the small subset of path matching the file uses (:name, :name*, :name+),
then for every path in the original sitemap and the launch checklist:

  1. finds the first rewrite that matches (first match wins, as on Vercel),
  2. builds the destination URL,
  3. fetches it and expects HTTP 200.

It also fails if a destination host is the deployment itself (a proxy loop).

    python scripts/check-routes.py                 # needs network
    python scripts/check-routes.py --no-fetch      # only check the mapping
"""
import json, re, ssl, sys, urllib.request, urllib.error, concurrent.futures as cf

ROOT = __file__.replace("\\", "/").rsplit("/scripts/", 1)[0]
CFG = json.load(open(f"{ROOT}/vercel.json", encoding="utf-8"))
AI = "https://www.soothsayeranalytics.ai"
COM = "https://soothsayeranalytics.com"
SELF_HOSTS = {"soothsayer-new.vercel.app"}  # add the production domain here once it points at Vercel
UA = {"User-Agent": "Mozilla/5.0 (route-check)"}
CTX = ssl.create_default_context()


def compile_source(src):
    """:name* -> optional /rest, :name+ -> required /rest, :name -> one segment."""
    out, i = "", 0
    while i < len(src):
        m = re.match(r"/:(\w+)\*", src[i:])
        if m:
            out += f"(?:/(?P<{m.group(1)}>.*))?"; i += m.end(); continue
        m = re.match(r"/:(\w+)\+", src[i:])
        if m:
            out += f"/(?P<{m.group(1)}>.+)"; i += m.end(); continue
        m = re.match(r":(\w+)", src[i:])
        if m:
            out += f"(?P<{m.group(1)}>[^/]+)"; i += m.end(); continue
        out += re.escape(src[i]); i += 1
    return re.compile("^" + out + "/?$")


RULES = [(compile_source(r["source"]), r["source"], r["destination"]) for r in CFG["rewrites"]]


def resolve(path):
    for rx, src, dest in RULES:
        m = rx.match(path)
        if not m:
            continue
        url = dest
        for name, val in m.groupdict().items():
            if val:
                url = url.replace(f":{name}*", val).replace(f":{name}+", val).replace(f":{name}", val)
            else:  # zero-segment match: drop the preceding slash too
                url = url.replace(f"/:{name}*", "")
        return src, url
    return None, None


def fetch(url):
    try:
        r = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=25, context=CTX)
        return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:  # noqa: BLE001
        return f"ERR {str(e)[:40]}"


# ---- the paths to prove ------------------------------------------------------------
sitemap = [l for l in open(f"{ROOT}/scripts/sitemap-paths.txt", encoding="utf-8").read().split() if l.startswith("/")]
checklist = {
    "/": ("NEXT", None),
    "/webinars": ("rule", f"{AI}/webinars"),
    "/webinars/ai-in-procurement": ("rule", f"{AI}/webinars/ai-in-procurement"),
    "/digital-competency": ("rule", f"{AI}/digital-competency"),
    "/responsible-ai": ("rule", f"{AI}/responsible-ai"),
    "/case-studies": ("rule", f"{COM}/case-studies"),
    "/case-studies/ship-from-store-optimization-for-a-leading-retailer": ("rule", f"{AI}/case-studies/ship-from-store-optimization-for-a-leading-retailer"),
    "/about": ("rule", f"{AI}/soothsayer-new/about"),
    "/soothsayer-new/home": ("rule", f"{AI}/soothsayer-new/home"),
    "/uae/soothgpt": ("rule", f"{AI}/uae/soothgpt"),
    "/soothgpt": ("rule", f"{AI}/soothgpt"),
    "/robots.txt": ("rule", f"{AI}/robots.txt"),
    "/sitemap.xml": ("rule", f"{AI}/sitemap.xml"),
}

fails = []
print("== launch checklist ==")
jobs = []
for p, (kind, want) in checklist.items():
    src, url = resolve(p)
    if kind == "NEXT":
        ok = url == f"{AI}/" or src is None  # "/" must never match a rewrite
        print(("OK  " if ok else "FAIL"), p.ljust(70), "-> served by the Next.js app")
        if not ok:
            fails.append((p, "root is rewritten"))
        continue
    ok = url == want
    if not ok:
        fails.append((p, f"expected {want}, got {url}"))
    jobs.append((p, src, url, ok))

print("\n== sitemap coverage ==")
for p in sitemap:
    src, url = resolve(p)
    want = f"{COM}/case-studies" if p == "/case-studies" else AI + p
    if url != want:
        fails.append((p, f"expected {want}, got {url}"))
    jobs.append((p, src, url, url == want))

loops = [(p, u) for p, _, u, _ in jobs if u and any(h in u for h in SELF_HOSTS)]
fails += [(p, "destination is this deployment (loop)") for p, _ in loops]

if "--no-fetch" not in sys.argv:
    with cf.ThreadPoolExecutor(8) as ex:
        codes = list(ex.map(lambda j: fetch(j[2]), jobs))
else:
    codes = ["-"] * len(jobs)

for (p, src, url, mapped), code in zip(jobs, codes):
    good = mapped and (code == "-" or code == 200)
    if not good and not any(f[0] == p for f in fails):
        fails.append((p, f"destination returned {code}"))
    if p in checklist or not good:
        print(("OK  " if good else "FAIL"), str(code).ljust(4), p.ljust(66), "via", src, "->", url)

print(f"\n{len(jobs)} paths checked | {len(sitemap)} from the original sitemap | loops: {len(loops)} | failures: {len(fails)}")
for f in fails:
    print("  FAIL", f)
sys.exit(1 if fails else 0)
