"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/** Tab set whose label and pane markup is rendered on the server and passed in. */
/** `logoTabs`: the labels are logo artwork drawn for dark backgrounds, so the buttons stay dark. */
export function FlowTabs({ labels, panes, dark, id, logoTabs }: { labels: React.ReactNode[]; panes: React.ReactNode[]; dark?: boolean; id: string; logoTabs?: boolean }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div role="tablist" className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr))]">
        {labels.map((l, n) => (
          <button
            key={n}
            role="tab"
            type="button"
            id={`${id}-tab-${n}`}
            aria-selected={i === n}
            aria-controls={`${id}-panel-${n}`}
            onClick={() => setI(n)}
            className={cn(
              "flex min-h-[72px] flex-col items-start justify-center gap-1.5 rounded-[10px] border p-4 text-left transition-colors",
              logoTabs
                ? cn("bg-deep", i === n ? "border-brand shadow-[0_0_0_1px_var(--color-brand)]" : "border-white/10 opacity-80 hover:border-brand/60 hover:opacity-100")
                : i === n
                ? "border-brand bg-brand/10 shadow-[0_0_0_1px_var(--color-brand)]"
                : dark
                  ? "border-white/15 bg-white/[0.03] hover:border-brand/60"
                  : "border-line bg-white hover:border-brand/60",
            )}
          >
            {l}
          </button>
        ))}
      </div>
      {panes.map((p, n) => (
        <div key={n} role="tabpanel" id={`${id}-panel-${n}`} aria-labelledby={`${id}-tab-${n}`} hidden={i !== n} className="mt-8">
          {p}
        </div>
      ))}
    </div>
  );
}
