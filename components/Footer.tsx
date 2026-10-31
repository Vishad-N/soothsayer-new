import Image from "next/image";
import { FOOTER } from "@/data/content";
import { IMAGES } from "@/data/images";
import { linkProps } from "@/lib/cn";
import { SOCIAL_ICONS } from "./ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-coal text-white" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Site footer</h2>
      <div className="container-page grid gap-12 pb-12 pt-16 lg:grid-cols-[340px_1fr] lg:gap-16 lg:pt-20">
        <div>
          <a href="#top" aria-label="Back to top">
            <Image src={IMAGES.logoWhite} alt="Soothsayer Analytics" width={232} height={60} unoptimized className="h-[88px] w-auto" />
          </a>
          <p className="mt-8 max-w-[300px] text-base leading-[1.7] text-white/75 md:text-[14.5px]">{FOOTER.blurb}</p>
          <ul className="mt-6 space-y-1.5 text-base text-white/75 md:text-[14px]">
            {FOOTER.contact.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="inline-flex min-h-11 items-center transition-colors hover:text-brand-300 md:min-h-0">{c.label}</a>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex gap-3">
            {FOOTER.social.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <li key={s.label}>
                  <a
                    {...linkProps(s.href)}
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-brand/40 bg-white/[0.03] text-white transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-[18px] font-medium">{col.title}</h3>
              <span aria-hidden className="mt-3 block h-0.5 w-6 bg-brand" />
              <ul className="mt-5 space-y-3 max-md:space-y-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a {...linkProps(l.href)} className="text-base text-white/80 transition-colors hover:text-brand-300 max-md:flex max-md:min-h-11 max-md:items-center md:text-[14.5px]">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="container-page border-t border-white/10 py-6 text-center text-[14px] text-white/70">
        © {year} Soothsayer Analytics. All rights reserved.
      </div>
    </footer>
  );
}
