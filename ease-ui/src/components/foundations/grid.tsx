import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Responsive column count. A number sets `grid-template-columns: repeat(n, 1fr)`.
   * Defaults to an auto-fit track (min 240px) that reflows naturally.
   */
  columns?: number;
  /** Minimum track width for auto-fit mode. */
  minColumnWidth?: string;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
}

/**
 * CSS grid with a sensible auto-fit default. Pass `columns` for fixed layouts;
 * leave it out for responsive card grids.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns, minColumnWidth, gap = 4, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("ease-grid", className)}
      style={{
        gridTemplateColumns: columns
          ? `repeat(${columns}, minmax(0, 1fr))`
          : undefined,
        gap: gap === 0 ? undefined : `var(--ease-spacing-${gap})`,
        ...(columns
          ? {}
          : ({ "--ease-grid-min": minColumnWidth } as React.CSSProperties)),
        ...style,
      }}
      data-ease="grid"
      {...rest}
    >
      {children}
    </div>
  );
});
