import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export type StatusKind = "neutral" | "info" | "success" | "warning" | "danger";

export type BadgeVariant = "soft" | "solid";

export interface BadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "status"
> {
  status?: StatusKind;
  /**
   * Visual weight. `soft` (default) is a tinted chip; `solid` is a filled
   * chip for the few states that need emphasis. Both use the shared status
   * vocabulary.
   */
  variant?: BadgeVariant;
  /** Render a <button> when set; required for interactive badges. */
  interactive?: boolean;
  onClick?: React.MouseEventHandler;
}

/**
 * Compact status label. The same `status` vocabulary is shared by Badge,
 * Alert, Toast, and Status so a "running" concept looks identical everywhere.
 * `neutral` is always emitted so the chip has a consistent resting tint.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    status = "neutral",
    variant = "soft",
    interactive,
    onClick,
    className,
    children,
    ...rest
  },
  ref,
) {
  const Tag: "span" | "button" = interactive ? "button" : "span";
  return (
    // Polymorphic span|button: the two elements have slightly different event
    // prop types, so we cast the dynamic tag to keep the shared props legal.
    <Tag
      ref={ref as never}
      onClick={interactive ? onClick : undefined}
      type={interactive ? "button" : undefined}
      className={cn("ease-badge", className)}
      data-ease="badge"
      data-status={status}
      data-variant={variant === "solid" ? "solid" : undefined}
      data-interactive={interactive ? "true" : undefined}
      {...(rest as Record<string, unknown>)}
    >
      {children as ReactNode}
    </Tag>
  );
});
