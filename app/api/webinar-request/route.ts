import { NextResponse } from "next/server";

/**
 * Receives the "Download the Presentation" request and forwards it as JSON to the endpoint in
 * WEBINAR_FORM_WEBHOOK_URL (a CRM, Zapier, a mail relay, anything that accepts a POST).
 *
 * With no webhook configured it answers 503, so the form tells the visitor delivery failed and offers
 * an e-mail address instead of claiming a submission that went nowhere.
 */
export const runtime = "nodejs";

const FIELDS = ["name", "email", "mobile", "company", "jobTitle", "hear", "maturity", "projects", "comments", "webinar"] as const;
const MAX = 2000;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Answer as if it worked and drop the message.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const data: Record<string, string> = {};
  for (const k of FIELDS) {
    const v = body[k];
    data[k] = typeof v === "string" ? v.trim().slice(0, MAX) : "";
  }
  if (!data.name || !data.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || body.consent !== "yes") {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const hook = process.env.WEBINAR_FORM_WEBHOOK_URL;
  if (!hook) {
    console.warn("[webinar-request] WEBINAR_FORM_WEBHOOK_URL is not set; the request was not delivered.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, form: "Webinar presentation request", submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[webinar-request] delivery failed:", e);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
