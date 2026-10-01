import { forwardRef, type SVGProps } from "react";
import { cn } from "../../utils";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";

export interface SpinnerProps extends Omit<SVGProps<SVGSVGElement>, "size"> {
  size?: SpinnerSize;
  tone?: "default" | "muted";
  /** Accessible status text; a lone spinner is usually decorative. */
  label?: string;
}

/**
 * Indeterminate circular spinner. Keep it paired with text ("Saving…") for
 * anything longer than a second — a bare spinner with no context is an
 * accessibility antipattern.
 */
export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
  { size = "md", tone = "default", label, className, ...rest },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      className={cn("ease-spinner", className)}
      data-ease="spinner"
      data-size={size}
      data-tone={tone === "muted" ? "muted" : undefined}
      role={label ? "status" : "presentation"}
      aria-hidden={label ? undefined : "true"}
      {...rest}
    >
      {label ? <title>{label}</title> : null}
      <path d="M12 3a9 9 0 1 1-9 9" />
    </svg>
  );
});
