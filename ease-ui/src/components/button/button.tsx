import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { Spinner } from "../feedback/spinner";

export type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "size"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Replaces the button's normal behavior with a pending state. The label
   * stays in place (no layout jump) and the control becomes inert while the
   * spinner is visible.
   */
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
  /**
   * Accessible name used when the button has no visible text (icon-only).
   * Falls back to `aria-label`, `aria-labelledby`, or the visible label.
   */
  "aria-label"?: string;
}

/**
 * The single button primitive. All actions in the library go through one of
 * its six variants — never create PrimaryButton / DashboardButton forks.
 *
 * Loading keeps the exact footprint of the label, so surrounding layout does
 * not reflow while an action is in flight.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "secondary",
      size = "md",
      loading = false,
      disabled = false,
      icon,
      iconPosition = "start",
      fullWidth = false,
      type = "button",
      className,
      children,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    // Icon-only buttons must carry an accessible name or they are unusable by
    // screen readers. Surface this in dev rather than shipping a broken control.
    // We inspect the rendered DOM text (not String(children), which gives
    // "[object Object]" for React elements) to decide whether the button has
    // any visible text. Empty text + no aria-label/labelledby = icon-only without a name.
    const setButtonRef = (el: HTMLButtonElement | null) => {
      if (typeof ref === "function") ref(el);
      else if (ref && typeof ref === "object") ref.current = el;
      if (process.env.NODE_ENV === "production" || !el) return;
      const hasText = (el.textContent ?? "").trim().length > 0;
      const hasName =
        hasText || Boolean(ariaLabel) || Boolean(rest["aria-labelledby"]);
      if (!hasName) {
        console.warn(
          "[ease-ui] Button: icon-only buttons require an accessible name (aria-label or aria-labelledby).",
        );
      }
    };

    return (
      <button
        ref={setButtonRef}
        type={type}
        disabled={isDisabled}
        data-ease="button"
        data-variant={variant}
        data-size={size}
        data-state={loading ? "loading" : undefined}
        data-disabled={isDisabled ? "true" : undefined}
        data-full-width={fullWidth ? "true" : undefined}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        aria-label={ariaLabel}
        className={cn("ease-button", className)}
        {...rest}
      >
        {loading ? (
          <span className="ease-button__spinner">
            <Spinner size={size === "xs" ? "xs" : "sm"} tone="muted" />
          </span>
        ) : icon && iconPosition === "start" ? (
          <span className="ease-button__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {children}
        {icon && !loading && iconPosition === "end" ? (
          <span className="ease-button__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </button>
    );
  },
);
