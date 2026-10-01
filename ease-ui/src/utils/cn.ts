/**
 * Tiny className merge utility — replaces a dependency like `clsx`.
 *
 * Joins conditionally-present class values, skipping null, undefined, false,
 * and empty strings. Arrays and objects (mapping of className -> presence)
 * are supported, the same shape most React projects already write.
 *
 *   cn("btn", isDisabled && "btn--disabled", { "btn--sm": size === "sm" });
 *   // => "btn btn--sm"
 */
type ClassValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | ClassValue[]
  | Record<string, unknown>;

export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (typeof value === "string" || typeof value === "number") {
      const str = String(value).trim();
      if (str !== "") out.push(str);
    } else if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested !== "") out.push(nested);
    } else if (value && typeof value === "object") {
      for (const [key, present] of Object.entries(value)) {
        if (present && key) out.push(key);
      }
    }
    // booleans: false/true with no key are simply skipped
  }

  return out.join(" ");
}
