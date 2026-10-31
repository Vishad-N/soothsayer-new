import { cn, linkProps } from "@/lib/cn";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "outline-dark" | "outline-light";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_8px_20px_-10px_rgb(0_180_216/0.8)] hover:bg-brand-600 hover:shadow-[0_12px_24px_-10px_rgb(0_180_216/0.9)]",
  "outline-dark": "border border-white/25 text-white hover:border-brand hover:text-brand-300",
  "outline-light": "border border-line bg-white text-ink hover:border-brand hover:text-brand",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  size?: "md" | "sm";
};

/** Link styled as a button. External links open in a new tab. */
export function LinkButton({ href, children, variant = "primary", arrow = true, className, size = "md" }: Props) {
  return (
    <a
      {...linkProps(href)}
      className={cn(
        "group inline-flex shrink-0 items-center justify-center gap-2 rounded-[6px] font-medium whitespace-nowrap transition-[background-color,box-shadow,transform,color,border-color] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0",
        size === "md" ? "h-11 px-5 text-[15px]" : "h-9 px-4 text-sm",
        styles[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </a>
  );
}

/** Square prev / next control used by the carousels. */
export function ArrowButton({
  dir,
  onClick,
  disabled,
  label,
  className,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "grid size-11 place-items-center rounded-[6px] border border-line bg-white text-ink transition duration-200 hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink",
        className,
      )}
    >
      <ArrowRight className={cn("size-[18px]", dir === "prev" && "rotate-180")} />
    </button>
  );
}
