import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";
import type { StatusKind } from "./badge";

export interface ProgressProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "value"
> {
  /** 0–100. Values outside are clamped. Ignored when `indeterminate`. */
  value: number;
  max?: number;
  status?: StatusKind;
  /** Accessible name; without it the bar is decorative (aria-hidden). */
  label?: string;
  /**
   * Animate an unknown total. The bar travels the track and no `aria-valuenow`
   * is announced. Use for "working, but I don't know how long."
   */
  indeterminate?: boolean;
}

/**
 * Determinate progress bar. Always provide `label` (or aria-label) for a
 * meaningful progress value — a bare bar with no context is an a11y gap.
 * Pass `indeterminate` when the total is unknown.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    { value, max = 100, status, label, indeterminate, className, ...rest },
    ref,
  ) {
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    return (
      <div
        ref={ref}
        role={label ? "progressbar" : undefined}
        aria-label={label}
        aria-valuenow={label && !indeterminate ? Math.round(value) : undefined}
        aria-valuemin={label && !indeterminate ? 0 : undefined}
        aria-valuemax={label && !indeterminate ? max : undefined}
        aria-busy={indeterminate ? "true" : undefined}
        aria-hidden={label ? undefined : "true"}
        className={cn("ease-progress", className)}
        data-ease="progress"
        data-status={status === "neutral" ? undefined : status}
        data-indeterminate={indeterminate ? "true" : undefined}
        {...rest}
      >
        <div
          data-ease-progress="bar"
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    );
  },
);
