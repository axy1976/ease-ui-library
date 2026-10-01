import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export type ToastVariant = "solid" | "tinted";

export interface ToastProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "status" | "title"
> {
  /** Status color; `neutral` renders a quiet info tone. */
  status?: "neutral" | "info" | "success" | "warning" | "danger";
  /** Solid header + subtle body (default) or a soft tinted card. */
  variant?: ToastVariant;
  /** Heading. Omit for one-liner toasts. */
  title?: string;
  /** Optional action rendered in the footer. */
  action?: React.ReactNode;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

/**
 * Toast / notification card. Pair with `ToastProvider` + `useToast` for the
 * imperative `toast.success(...)` API, or render a `<Toast>` directly inside
 * a container for a self-managed stack.
 *
 * The toast is intentionally quiet: one status accent, a title, an optional
 * description, and an optional action + close. No gradients, no oversized
 * type — it reads as a notification, not a decoration.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    status = "info",
    variant = "solid",
    title,
    action,
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
      role="status"
      data-ease="toast"
      data-status={status}
      data-variant={variant}
      className={cn("ease-toast", className)}
      {...rest}
    >
      <div data-ease-toast="header">
        <span data-ease-toast="icon" aria-hidden="true" />
        {title ? <span data-ease-toast="title">{title}</span> : null}
        {onDismiss ? (
          <button
            type="button"
            data-ease-toast="close"
            aria-label="Dismiss"
            onClick={onDismiss}
          >
            ×
          </button>
        ) : null}
      </div>
      {children ? <div data-ease-toast="body">{children}</div> : null}
      {action ? <div data-ease-toast="action">{action}</div> : null}
    </div>
  );
});
