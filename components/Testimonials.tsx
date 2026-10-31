"use client";

import { useState } from "react";
import { TESTIMONIALS, type Testimonial } from "@/data/content";
import { cn } from "@/lib/cn";
import { ArrowButton } from "./ui/Button";
import { Quote } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { useCarousel } from "./ui/useCarousel";

const initials = (s: string) =>
  s.replace(/[^A-Za-z& ]/g, "").split(/\s+/).filter((w) => w && w !== "&").slice(0, 2).map((w) => w[0]).join("");

function Card({ t }: { t: Testimonial }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      data-card
      className="flex w-[86vw] max-w-[400px] shrink-0 snap-start flex-col rounded-[10px] border border-line bg-white p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:w-[400px]"
    >
      <header className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-14 shrink-0 place-items-center rounded-[6px] bg-[linear-gradient(135deg,#0d2530,#0e5262)] font-display text-[17px] font-semibold text-brand-300"
        >
          {initials(t.company)}
        </span>
        <div>
          <p className="font-display text-[15px] font-semibold leading-tight text-ink">{t.role}</p>
          <p className="mt-1 text-[14px] text-ink-soft">{t.company}</p>
        </div>
      </header>
      <Quote className="mt-6 h-4 w-6 text-brand" />
      <blockquote className="mt-4 flex-1 text-[15px] leading-[1.75] text-ink-soft">
        <p className={cn(!open && "line-clamp-6")}>{t.quote}</p>
      </blockquote>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-3 self-start text-[14px] font-medium text-ink underline-offset-4 hover:text-brand hover:underline"
      >
        {open ? "Show less" : "Read More"}
      </button>
    </article>
  );
}

/** "Why they love working with us": client quotes from the live site. */
export function Testimonials() {
  const { ref, atStart, atEnd, prev, next } = useCarousel<HTMLDivElement>();
  return (
    <section
      aria-labelledby="testimonials-title"
      className="overflow-hidden bg-[linear-gradient(100deg,#f4f6f7_0%,#eef6f8_40%,#b9eef9_100%)] pt-20 pb-20 lg:pt-24 lg:pb-36 xl:pb-44"
    >
      <div className="container-page">
        <Reveal className="flex items-end justify-between gap-6">
          <h2 id="testimonials-title" className="h-section">Why they love working with us</h2>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <ArrowButton dir="prev" label="Previous testimonial" onClick={prev} disabled={atStart} />
            <ArrowButton dir="next" label="Next testimonial" onClick={next} disabled={atEnd} />
          </div>
        </Reveal>

        <div
          ref={ref}
          role="region"
          aria-label="Testimonials"
          tabIndex={0}
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-4 pb-6 pt-1 sm:mx-0 sm:px-0 lg:gap-6"
        >
          {TESTIMONIALS.map((t) => <Card key={t.company} t={t} />)}
        </div>

        <div className="mt-2 flex gap-2 sm:hidden">
          <ArrowButton dir="prev" label="Previous testimonial" onClick={prev} disabled={atStart} />
          <ArrowButton dir="next" label="Next testimonial" onClick={next} disabled={atEnd} />
        </div>
      </div>
    </section>
  );
}
