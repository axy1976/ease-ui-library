import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import type { StatusKind } from "./badge";

export type TileLayout = "vertical" | "horizontal";

export interface StatTileProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "value"
> {
  label: ReactNode;
  value: ReactNode;
  /** Optional numeric change vs. a previous period. */
  delta?: number;
  /** Direction of `delta`; "up" implies a positive tone by default. */
  deltaDirection?: "up" | "down" | "flat";
  /** Override the delta tone (e.g. a "down" that's still good = success). */
  deltaTone?: StatusKind;
  suffix?: ReactNode;
  /** Small label below the value, e.g. "vs. last 7 days". */
  caption?: ReactNode;
  icon?: ReactNode;
  layout?: TileLayout;
  /** Render the value in tabular numerals (recommended for metrics). */
  tabular?: boolean;
}

/**
 * A single metric card. `Stat` is the full card (label + value + optional
 * delta / caption / icon); use `Stat` inside a `Grid` or a `MetricRow` for
 * dashboard KPIs.
 *
 * The layout is strictly token-driven: spacing, radius, and border all come
 * from the design tokens, and the delta direction/tonal pair is independent
 * of the visual up/down (a memory "up" can still be a warning).
 */
export const Stat = forwardRef<HTMLDivElement, StatTileProps>(function Stat(
  {
    label,
    value,
    delta,
    deltaDirection = "flat",
    deltaTone,
    suffix,
    caption,
    icon,
    layout = "vertical",
    tabular = true,
    className,
    ...rest
  },
  ref,
) {
  const tone =
    deltaTone ??
    (deltaDirection === "up"
      ? "success"
      : deltaDirection === "down"
        ? "danger"
        : "neutral");
  const hasDelta = delta != null && Number.isFinite(delta);
  return (
    <div
      ref={ref}
      data-ease="stat"
      data-layout={layout}
      className={cn("ease-stat", className)}
      {...rest}
    >
      <div data-ease-stat="head">
        {icon ? <span data-ease-stat="icon">{icon}</span> : null}
        <span data-ease-stat="label">{label}</span>
      </div>
      <div data-ease-stat="value-row">
        <span
          data-ease-stat="value"
          className={tabular ? "ease-tabular" : undefined}
        >
          {value}
          {suffix ? <span data-ease-stat="suffix">{suffix}</span> : null}
        </span>
        {hasDelta ? (
          <span
            data-ease-stat="delta"
            data-direction={deltaDirection}
            data-tone={tone}
          >
            {delta > 0 ? "↑" : delta < 0 ? "↓" : "→"} {Math.abs(delta)}
          </span>
        ) : null}
      </div>
      {caption ? <div data-ease-stat="caption">{caption}</div> : null}
    </div>
  );
});

/**
 * A single row of `Stat` tiles. The grid tracks reflow naturally (auto-fit
 * min 220px) so the same markup works from mobile to 4K.
 */
export function MetricRow({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("ease-metric-row", className)}
      style={style}
      data-ease="metric-row"
    >
      {children}
    </div>
  );
}
