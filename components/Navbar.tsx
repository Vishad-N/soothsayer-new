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
        scrolled
          ? "border-b border-white/10 bg-abyss/85 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl"
          : "border-b border-white/10 bg-transparent",
      )}
    >
      <nav aria-label="Main" className="container-page flex h-[72px] items-center justify-between gap-6 lg:h-20">
        <a href="#top" className="relative z-10 shrink-0" aria-label="Soothsayer Analytics home">
          <Image
            src={IMAGES.logoWhite}
            alt="Soothsayer Analytics"
            width={168}
            height={44}
            priority
            unoptimized
            className="h-11 w-auto lg:h-[52px]"
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
            className="grid size-10 place-items-center rounded-md text-white xl:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-6" />
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
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="panel"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-abyss text-white xl:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-4">
              <Image src={IMAGES.logoWhite} alt="Soothsayer Analytics" width={150} height={40} unoptimized className="h-9 w-auto" />
              <button type="button" aria-label="Close menu" onClick={onClose} className="grid size-10 place-items-center rounded-md">
                <Close className="size-6" />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto px-4 py-2">
              {NAV.map((item) =>
                isGroup(item) ? (
                  <li key={item.label} className="border-b border-white/10">
                    <button
                      type="button"
                      className="flex min-h-14 w-full items-center justify-between text-left text-[17px]"
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                    >
                      {item.label}
                      <Chevron className={cn("size-4 transition-transform", expanded === item.label && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === item.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          {[...item.items, ...(item.footer ? [item.footer] : [])].map((l) => (
                            <li key={l.label}>
                              <a {...linkProps(l.href)} className="flex min-h-11 items-center pl-3 text-[15px] text-white/70 hover:text-brand-300">
                                {l.label}
                              </a>
                            </li>
                          ))}
                          <li className="h-3" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.label} className="border-b border-white/10">
                    <a {...linkProps(item.href)} className="flex min-h-14 items-center text-[17px]">
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>

            <div className="space-y-4 border-t border-white/10 p-4">
              <div className="flex flex-col gap-1 text-sm text-white/70">
                <a href={LINKS.phone} className="hover:text-brand-300">844-44-76684</a>
                <a href={LINKS.email} className="hover:text-brand-300">info@soothsayeranalytics.com</a>
              </div>
              <LinkButton href={LINKS.contact} className="w-full">Get in Touch</LinkButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
