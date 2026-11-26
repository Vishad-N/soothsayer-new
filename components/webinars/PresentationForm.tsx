"use client";

import { useId, useState } from "react";
import { FORM } from "@/data/webinars";
import { LINKS } from "@/data/links";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "done" | "error";
type Errors = Partial<Record<"name" | "email" | "company" | "consent", string>>;

const field = "w-full rounded-[8px] border border-white/15 bg-white/[0.06] px-4 py-3 text-[16px] text-white placeholder:text-white/40 transition-colors focus:border-brand-300 focus:bg-white/[0.09] focus:outline-none";
const label = "mb-2 block text-[14px] font-medium text-white/85";

/**
 * The "Download the Presentation" request. It sends to /api/webinar-request, which forwards to whatever
 * the team has configured; if delivery fails the visitor is told so and given an email address instead,
 * never a false "received".
 */
export function PresentationForm({ webinar }: { webinar: string }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email?.trim() ?? "")) next.email = "Please enter a valid e-mail address.";
    if (!data.company?.trim()) next.company = "Please enter your company.";
    if (!data.consent) next.consent = "Please confirm you agree to continue.";
    setErrors(next);
    if (Object.keys(next).length) {
      // wait one tick so the invalid state has rendered, then move focus to the first problem
      setTimeout(() => (form.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus(), 0);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/webinar-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, webinar }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const id = (n: string) => `${uid}-${n}`;
  const err = (k: keyof Errors) => errors[k];
  const aria = (k: keyof Errors) => ({ "aria-invalid": !!err(k), "aria-describedby": err(k) ? id(k + "-err") : undefined });
  const Err = ({ k }: { k: keyof Errors }) => (err(k) ? <p id={id(k + "-err")} className="mt-1.5 text-[14px] text-[#ffb4a8]">{err(k)}</p> : null);

  if (status === "done") {
    return (
      <div role="status" className="grid min-h-[320px] place-items-center rounded-[14px] border border-brand-300/30 bg-brand-300/10 p-8 text-center">
        <div>
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand text-white shadow-[0_0_0_10px_rgb(0_180_216/0.2)]">
            <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
          <p className="mt-6 text-2xl font-semibold text-white">{FORM.success}</p>
          <p className="mt-2 text-white/75">{FORM.formSub}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[14px] border border-white/10 bg-white/[0.05] p-6 sm:p-8">
      <h3 className="text-[24px] font-semibold leading-tight text-white">{FORM.formTitle}</h3>
      <p className="mt-1 text-white/70">{FORM.formSub}</p>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={label}>Name</label>
          <input id={id("name")} name="name" autoComplete="name" required className={field} {...aria("name")} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor={id("email")} className={label}>E-mail</label>
          <input id={id("email")} name="email" type="email" autoComplete="email" required className={field} {...aria("email")} />
          <Err k="email" />
        </div>
        <div>
          <label htmlFor={id("mobile")} className={label}>Mobile Number</label>
          <input id={id("mobile")} name="mobile" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor={id("company")} className={label}>Company</label>
          <input id={id("company")} name="company" autoComplete="organization" required className={field} {...aria("company")} />
          <Err k="company" />
        </div>
        <div>
          <label htmlFor={id("title")} className={label}>Job Title</label>
          <input id={id("title")} name="jobTitle" autoComplete="organization-title" className={field} />
        </div>
        <div>
          <label htmlFor={id("hear")} className={label}>How did you hear about this workshop?</label>
          <select id={id("hear")} name="hear" defaultValue="" className={cn(field, "appearance-none")}>
            <option value="" className="text-ink">Select one...</option>
            {FORM.hear.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={id("maturity")} className={label}>What is your Digital / AI Maturity Level</label>
          <select id={id("maturity")} name="maturity" defaultValue="" className={cn(field, "appearance-none")}>
            <option value="" className="text-ink">Select one...</option>
            {FORM.maturity.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={id("projects")} className={label}>AI/Analytics projects are in-house/outsourced?</label>
          <select id={id("projects")} name="projects" defaultValue="" className={cn(field, "appearance-none")}>
            <option value="" className="text-ink">Select one...</option>
            {FORM.projects.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor={id("comments")} className={label}>Comments/Your expectations from the event</label>
          <textarea id={id("comments")} name="comments" rows={4} className={field} />
        </div>
        {/* spam trap: real visitors never see or fill this */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug text-white/80">
          <input type="checkbox" name="consent" value="yes" className="mt-0.5 size-5 shrink-0 accent-[#00b4d8]" {...aria("consent")} />
          <span>
            I have read and agree to the{" "}
            <a href={LINKS.privacy} target="_blank" rel="noopener noreferrer" className="text-brand-300 underline underline-offset-2 hover:text-white">Privacy Policy</a> and{" "}
            <a href={LINKS.terms} target="_blank" rel="noopener noreferrer" className="text-brand-300 underline underline-offset-2 hover:text-white">Terms &amp; Conditions</a>.
          </span>
        </label>
        <Err k="consent" />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-[6px] bg-brand px-6 text-[16px] font-medium text-white shadow-[0_8px_20px_-10px_rgb(0_180_216/0.8)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === "sending" ? "Sending…" : "Request the presentation"}
        </button>
        <div aria-live="polite" className="min-h-6 text-[15px]">
          {status === "error" && (
            <p className="text-[#ffb4a8]">
              {FORM.error}{" "}
              <a href={`mailto:info@soothsayeranalytics.com?subject=${encodeURIComponent("Presentation request: " + webinar)}`} className="underline underline-offset-2 hover:text-white">E-mail us instead</a>.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
