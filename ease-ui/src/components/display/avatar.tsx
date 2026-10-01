import { Children, forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "size"
> {
  /** Image source; if absent, initials are derived from `name`. */
  src?: string;
  /** Used for the initials fallback and the accessible name. */
  name?: string;
  size?: AvatarSize;
}

function initials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase() || "?";
}

/**
 * Circular avatar with an initials fallback. Always carries an accessible
 * name from `name` (or aria-label) so a stack of avatars is never silent.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, name, size = "md", className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn("ease-avatar", className)}
      data-ease="avatar"
      data-size={size === "md" ? undefined : size}
      role="img"
      aria-label={rest["aria-label"] ?? name ?? "Avatar"}
      {...rest}
    >
      {src ? <img src={src} alt="" /> : initials(name)}
    </span>
  );
});

export interface AvatarGroupProps extends HTMLAttributes<HTMLSpanElement> {
  /** Avatars beyond this many are collapsed into a +N chip. */
  max?: number;
}

export function AvatarGroup({
  max,
  className,
  children,
  ...rest
}: AvatarGroupProps) {
  const kids = Children.toArray(children);
  const shown = max ? kids.slice(0, max) : kids;
  const overflow = max ? kids.length - max : 0;
  return (
    <span
      className={cn("ease-avatar-group", className)}
      data-ease="avatar-group"
      {...rest}
    >
      {shown}
      {overflow > 0 ? (
        <span
          data-ease="avatar"
          data-size="md"
          aria-label={`${overflow} more`}
          style={{ background: "var(--ease-color-surface-raised)" }}
        >
          +{overflow}
        </span>
      ) : null}
    </span>
  );
}
