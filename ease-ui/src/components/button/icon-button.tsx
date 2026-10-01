import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export type IconButtonSize = "xs" | "sm" | "md" | "lg";

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "disabled"
> {
  size?: IconButtonSize;
  variant?: "default" | "danger";
  disabled?: boolean;
  children: ReactNode;
  /**
   * Required. Icon-only buttons have no visible text, so an accessible name
   * is mandatory — this prevents shipping an unusable control.
   */
  "aria-label": string;
}

/**
 * Square icon-only button. Same sizing scale as Button so a toolbar row of
 * icon buttons aligns with a standard-height button next to it.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      size = "md",
      variant = "default",
      disabled,
      "aria-label": ariaLabel,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        data-ease="icon-button"
        data-size={size}
        data-variant={variant === "default" ? undefined : variant}
        data-disabled={disabled ? "true" : undefined}
        className={cn("ease-icon-button", className)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
