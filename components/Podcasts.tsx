"use client";

import Image from "next/image";
import { useState } from "react";
import { PODCASTS, type Episode } from "@/data/content";
import { ytThumb } from "@/data/images";
import { ArrowButton, LinkButton } from "./ui/Button";
import { Play } from "./ui/Icons";
import { PixelEdge } from "./ui/PixelEdge";
import { Reveal } from "./ui/Reveal";
import { useCarousel } from "./ui/useCarousel";

/** Card shows a thumbnail; the YouTube player only loads after the user presses play. */
function EpisodeCard({ ep }: { ep: Episode }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article
      data-card
      className="group flex w-[78vw] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-[8px] border border-line bg-white shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:w-[340px]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-deep">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${ep.id}?autoplay=1&rel=0`}
            title={ep.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Image
            src={ytThumb(ep.id)}
            alt=""
            fill
            sizes="340px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-[19px] font-semibold leading-[1.3] tracking-[-0.005em] text-ink">{ep.title}</h3>
        <div className="mt-4 flex flex-1 items-end justify-between gap-3 border-t border-dashed border-line pt-4">
          <div>
            <p className="font-display text-[15px] font-semibold text-ink">{ep.guest}</p>
            <p className="mt-1 text-[13px] leading-[1.45] text-ink-soft">{ep.role}</p>
          </div>
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${ep.title}`}
            disabled={playing}
            className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white shadow-[0_8px_18px_-8px_rgb(0_180_216/0.9)] transition duration-200 hover:scale-110 hover:bg-brand-600 disabled:opacity-40"
          >
            <Play className="ml-0.5 size-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

/** "AI in Action": SoothSight podcast episodes. */
export function Podcasts() {
  const { ref, atStart, atEnd, prev, next } = useCarousel<HTMLDivElement>();
  return (
    <section id="podcasts" aria-labelledby="podcasts-title" className="relative overflow-x-clip bg-mist pt-20 pb-20 lg:pt-24 lg:pb-36 xl:pb-44">
      <PixelEdge color="var(--color-mist)" accent={false} />
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="podcasts-title" className="h-section">{PODCASTS.title}</h2>
            <p className="mt-4 max-w-[600px] text-[15px] leading-[1.65] text-ink-soft">{PODCASTS.body}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <LinkButton href={PODCASTS.viewAll} arrow={false}>View All</LinkButton>
            <ArrowButton dir="prev" label="Previous episode" onClick={prev} disabled={atStart} />
            <ArrowButton dir="next" label="Next episode" onClick={next} disabled={atEnd} />
          </div>
        </Reveal>

        <div
          ref={ref}
          role="region"
          aria-label="Podcast episodes"
          tabIndex={0}
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-1 sm:mx-0 sm:px-0 xl:-mr-[calc((100vw-1240px)/2)] xl:pr-[calc((100vw-1240px)/2)]"
        >
          {PODCASTS.episodes.map((ep) => <EpisodeCard key={ep.id} ep={ep} />)}
        </div>
      </div>
    </section>
  );
}
