import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

/**
 * Shimmer placeholder for content whose shape is known but whose value is not
 * yet. Prefer Skeleton over Spinner whenever the final layout is known — it
 * communicates "this slot is loading" without implying the whole view is.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton({ width, height, circle, className, style, ...rest }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn("ease-skeleton", className)}
        data-ease="skeleton"
        data-circle={circle ? "true" : undefined}
        style={{ width, height, ...style }}
        {...rest}
      />
    );
  },
);

/**
 * A row of placeholder lines. Use for list/table bodies:
 * `<SkeletonRows rows={5} />`
 */
export function SkeletonRows({
  rows = 4,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("ease-skeleton-rows", className)}
      aria-hidden="true"
      data-ease="skeleton-rows"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ease-spacing-3)",
      }}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} height={12} width={i % 2 ? "88%" : "100%"} />
      ))}
    </div>
  );
}
