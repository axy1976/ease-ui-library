import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export type BannerTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface BannerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  tone?: BannerTone;
  /** Left accent stripe for the tone. Always on. */
  stripe?: boolean;
  title?: ReactNode;
  action?: ReactNode;
  dismissable?: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
}

/**
 * Full-width horizontal strip. Use for global page-level announcements
 * (maintenance windows, quota warnings, feature flags) — not for row-level
 * or inline feedback. Pair with `Alert` for section-level and `Callout`
 * for inline notes.
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  {
    tone = "info",
    stripe = true,
    title,
    action,
    dismissable,
    onDismiss,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      role={tone === "danger" ? "alert" : "status"}
      data-ease="banner"
      data-tone={tone}
      data-stripe={stripe ? "true" : "false"}
      className={cn("ease-banner", className)}
      {...rest}
    >
      <div data-ease-banner="content">
        {title ? <span data-ease-banner="title">{title}</span> : null}
        {children ? <span data-ease-banner="body">{children}</span> : null}
      </div>
      {action ? <div data-ease-banner="actions">{action}</div> : null}
      {dismissable ? (
        <button
          type="button"
          data-ease-banner="close"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          ×
        </button>
      ) : null}
    </div>
  );
});
