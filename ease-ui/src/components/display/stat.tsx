import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import type { StatusKind } from "./badge";

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  /** Small trend hint, e.g. "+4.2% vs last week". */
  trend?: ReactNode;
  trendDirection?: "up" | "down" | "flat";
  /** Status color for the value (e.g. error count → danger). */
  status?: StatusKind;
}

/**
 * Dashboard metric tile: label, big value, optional trend. Compose several
 * inside a Grid for a metrics row.
 */
export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat(
  { label, value, trend, trendDirection, status, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("ease-metric-card", className)}
      data-ease="metric-card"
      {...rest}
    >
      <span data-ease-metric="label">{label}</span>
      <span
        data-ease-metric="value"
        style={
          status && status !== "neutral"
            ? { color: `var(--ease-color-${status})` }
            : undefined
        }
      >
        {value}
      </span>
      {trend ? (
        <span
          data-ease-metric="trend"
          data-direction={trendDirection}
          aria-label={typeof trend === "string" ? `Trend: ${trend}` : undefined}
        >
          {trend}
        </span>
      ) : null}
    </div>
  );
});
