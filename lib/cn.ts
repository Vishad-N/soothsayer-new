/** Join class names, skipping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** True for absolute http(s) links, which open in a new tab. */
export const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Props for an anchor that may leave the site. */
export const linkProps = (href: string) =>
  isExternal(href) ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
