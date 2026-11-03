"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NAV, isGroup, type NavGroup } from "@/data/content";
import { LINKS } from "@/data/links";
import { IMAGES } from "@/data/images";
import { cn, linkProps } from "@/lib/cn";
import { LinkButton } from "./ui/Button";
import { ArrowRight, Chevron, Close, Menu } from "./ui/Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        // Below lg the bar floats as an inset glass pill.
        "max-lg:inset-x-3 max-lg:top-3 max-lg:overflow-hidden max-lg:rounded-full max-lg:border max-lg:border-brand-300/25 max-lg:bg-abyss/55 max-lg:shadow-[0_12px_40px_-12px_rgb(0_0_0/0.7)] max-lg:backdrop-blur-xl",
        scrolled
          ? "border-b border-white/10 bg-abyss/85 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl max-lg:border-brand-300/40 max-lg:bg-abyss/80 max-lg:shadow-[0_14px_44px_-10px_rgb(34_211_238/0.28)]"
          : "border-b border-white/10 bg-transparent",
      )}
    >
      <nav aria-label="Main" className="container-page flex h-20 items-center justify-between gap-6 max-lg:h-[68px] max-lg:pl-5 max-lg:pr-2 lg:h-24">
        <a href="#top" className="relative z-10 shrink-0" aria-label="Soothsayer Analytics home">
          <Image
            src={IMAGES.logoWhite}
            alt="Soothsayer Analytics"
            width={232}
            height={60}
            priority
            unoptimized
            className="h-[72px] w-auto max-lg:h-[60px] lg:h-[80px]"
          />
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) =>
            isGroup(item) ? (
              <Dropdown key={item.label} group={item} />
            ) : (
              <li key={item.label}>
                <a
                  {...linkProps(item.href)}
                  className="rounded-md px-3 py-2 text-[15px] text-white/90 transition-colors hover:text-brand-300"
                >
                  {item.label}
                </a>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <LinkButton href={LINKS.contact} size="sm">Get in Touch</LinkButton>
          </span>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md text-white max-lg:flex max-lg:size-auto max-lg:items-center max-lg:gap-2 max-lg:rounded-full max-lg:border max-lg:border-brand-300/40 max-lg:bg-brand-300/15 max-lg:py-2.5 max-lg:pl-4 max-lg:pr-3.5 max-lg:text-[14px] max-lg:font-semibold max-lg:tracking-wide max-lg:shadow-[0_0_24px_-4px_rgb(34_211_238/0.55)] max-lg:active:scale-95 xl:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <span className="relative hidden size-2 max-lg:block" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-300/70" />
              <span className="absolute inset-0 rounded-full bg-brand-300" />
            </span>
            <span className="hidden max-lg:inline">Menu</span>
            <Menu className="size-6 max-lg:size-[18px]" />
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

/* Desktop dropdown: opens on hover, focus, or click; closes on Escape or outside click. */
function Dropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wide = group.items.length > 6;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => !ref.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        // Hover already opened it for mouse users, so a click only ever opens.
        // Escape, mouse-out and outside clicks close it.
        onClick={show}
        className={cn(
          "flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-[15px] transition-colors xl:px-3",
          open ? "text-brand-300" : "text-white/90 hover:text-brand-300",
        )}
      >
        {group.label}
        <Chevron className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3",
              wide ? "w-[520px]" : "w-[300px]",
            )}
          >
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white p-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)]">
              <ul className={cn("grid", wide && "grid-cols-2")}>
                {group.items.map((l) => (
                  <li key={l.label}>
                    <a
                      {...linkProps(l.href)}
                      className="block rounded-lg px-3 py-2.5 text-[14px] text-ink-soft transition-colors hover:bg-brand-50 hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              {group.footer && (
                <a
                  {...linkProps(group.footer.href)}
                  className="group mt-1 flex items-center justify-between rounded-lg bg-mist px-3 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-brand-100"
                >
                  {group.footer.label}
                  <ArrowRight className="size-4 text-brand transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

const listVariants = { open: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } }, closed: {} };
const rowVariants = {
  closed: { opacity: 0, y: 28 },
  open: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Portal to <body>: the header's backdrop-filter would otherwise trap these fixed layers inside it.
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="panel"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-abyss text-white xl:hidden"
          // Circular reveal that grows out of the menu pill's corner.
          initial={{ clipPath: "circle(0px at calc(100% - 64px) 46px)" }}
          animate={{ clipPath: "circle(1800px at calc(100% - 64px) 46px)" }}
          exit={{ clipPath: "circle(0px at calc(100% - 64px) 46px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-brand-300/20 blur-[110px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 size-[360px] rounded-full bg-brand-300/10 blur-[110px]" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(180deg,#000,transparent_70%)]"
          />

          <div className="relative mx-3 mt-3 flex h-[68px] shrink-0 items-center justify-between rounded-full border border-brand-300/25 bg-white/[0.03] pl-5 pr-2">
            <Image src={IMAGES.logoWhite} alt="Soothsayer Analytics" width={232} height={60} unoptimized className="h-[60px] w-auto" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex items-center gap-2 rounded-full border border-brand-300/40 bg-brand-300/15 py-2.5 pl-4 pr-3.5 text-[14px] font-semibold tracking-wide shadow-[0_0_24px_-4px_rgb(34_211_238/0.55)] active:scale-95"
            >
              Close
              <Close className="size-[18px]" />
            </button>
          </div>

          <motion.ul
            variants={listVariants}
            initial="closed"
            animate="open"
            className="relative flex-1 overflow-y-auto px-6 pb-4 pt-6"
          >
            {NAV.map((item, i) => {
              const rowClass = "flex min-h-[68px] w-full items-center gap-4 text-left text-[30px] font-semibold leading-none tracking-tight";
              const num = (
                <span className="w-7 shrink-0 font-mono text-[12px] font-normal tracking-widest text-brand-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              );
              return isGroup(item) ? (
                <motion.li key={item.label} variants={rowVariants} className="border-b border-white/10">
                  <button
                    type="button"
                    className={cn(rowClass, "transition-colors", expanded === item.label && "text-brand-300")}
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                  >
                    {num}
                    <span className="flex-1">{item.label}</span>
                    <Chevron className={cn("size-5 text-white/60 transition-transform", expanded === item.label && "rotate-180 text-brand-300")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded === item.label && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pl-11"
                      >
                        {[...item.items, ...(item.footer ? [item.footer] : [])].map((l) => (
                          <li key={l.label}>
                            <a {...linkProps(l.href)} className="flex min-h-12 items-center text-[17px] text-white/75 hover:text-brand-300">
                              {l.label}
                            </a>
                          </li>
                        ))}
                        <li className="h-3" />
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              ) : (
                <motion.li key={item.label} variants={rowVariants} className="border-b border-white/10">
                  <a {...linkProps(item.href)} className={rowClass}>
                    {num}
                    {item.label}
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="relative space-y-4 border-t border-white/10 p-6">
            <div className="flex flex-col gap-1 text-base text-white/75 [&>a]:flex [&>a]:min-h-11 [&>a]:items-center">
              <a href={LINKS.phone} className="hover:text-brand-300">844-44-76684</a>
              <a href={LINKS.email} className="hover:text-brand-300">info@soothsayeranalytics.com</a>
            </div>
            <LinkButton href={LINKS.contact} className="w-full">Get in Touch</LinkButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
