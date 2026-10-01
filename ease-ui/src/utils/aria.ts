/**
 * Merge ARIA string props, skipping null/undefined so callers can write
 * `aria-label={cnAria(...)}`-style conditionals without `undefined || undefined`.
 */
export function ariaLabel(
  ...parts: Array<string | null | undefined | false>
): string | undefined {
  const joined = parts.filter((p): p is string => Boolean(p)).join(" ");
  return joined || undefined;
}

/**
 * Standard focusables selector for focus trapping and arrow-key navigation in
 * menus and dialogs.
 */
export const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "details",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
  "audio[controls]",
  "video[controls]",
  '[contenteditable="true"]',
].join(",");

export function focusableIn<T extends HTMLElement = HTMLElement>(
  root: T | null,
): HTMLElement[] {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (el) => el.getClientRects().length > 0 || el === document.activeElement,
  );
}
