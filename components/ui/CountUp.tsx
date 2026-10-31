"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const fmt = new Intl.NumberFormat("en-US");

/** Counts from 0 to `value` once it scrolls into view. Renders the final value on the server. */
export function CountUp({ value, prefix = "", suffix = "", className }: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const started = useRef(false);

  // Server HTML carries the real number; reset to 0 on the client before it is seen.
  useEffect(() => {
    if (!reduce && !started.current) setShown(0);
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      <span>{prefix}{fmt.format(shown)}</span>
      <span className="text-brand-300">{suffix}</span>
    </span>
  );
}
