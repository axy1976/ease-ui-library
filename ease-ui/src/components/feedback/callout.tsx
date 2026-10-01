import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import type { StatusKind } from "../display/badge";

export interface CalloutProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "status" | "title"
> {
  status?: Exclude<StatusKind, "neutral">;
  /** Emphasis weight. `default` is the standard tint; `subtle` is quieter. */
  emphasis?: "default" | "subtle";
  title?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  dismissable?: boolean;
  children?: ReactNode;
}

/**
 * Inline, block-level callout. Visually quieter than `Alert` — a callout
 * reads as "here's a note" (e.g. an info strip in a settings page or a
 * pricing hint in a checkout). Use `Alert` for page-level or section-level
 * messages that need to be seen.
 */
export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  function Callout(
    {
      status = "info",
      emphasis = "default",
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
        role={status === "danger" ? "alert" : "note"}
        data-ease="callout"
        data-status={status}
        data-emphasis={emphasis}
        data-dismissable={dismissable ? "true" : undefined}
        className={cn("ease-callout", className)}
        {...rest}
      >
        <div data-ease-callout="content">
          {title ? <div data-ease-callout="title">{title}</div> : null}
          {children ? <div data-ease-callout="body">{children}</div> : null}
        </div>
        {action ? <div data-ease-callout="action">{action}</div> : null}
        {dismissable ? (
          <button
            type="button"
            data-ease-callout="close"
            aria-label="Dismiss"
            onClick={onDismiss}
          >
            ×
          </button>
        ) : null}
      </div>
    );
  },
);
