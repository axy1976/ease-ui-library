import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface SplitPanelProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "size"
> {
  /** Fraction of the width for the first panel (0–1). Default 0.62. */
  primary?: number;
  children: [ReactNode, ReactNode];
}

/**
 * Two-pane layout (list + detail, editor + preview). The first pane takes
 * `primary` of the width, the second the remainder; they stack vertically
 * below the mobile breakpoint.
 */
export const SplitPanel = forwardRef<HTMLDivElement, SplitPanelProps>(
  function SplitPanel({ primary = 0.62, className, children, ...rest }, ref) {
    const [first, second] = children;
    return (
      <div
        ref={ref}
        className={cn("ease-split-panel", className)}
        data-ease="split-panel"
        {...rest}
      >
        <div data-ease-split="panel" style={{ flex: `${primary} 1 0%` }}>
          {first}
        </div>
        <div data-ease-split="divider" aria-hidden="true" />
        <div data-ease-split="panel" style={{ flex: `${1 - primary} 1 0%` }}>
          {second}
        </div>
      </div>
    );
  },
);
