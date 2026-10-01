import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface InlineProps extends HTMLAttributes<HTMLSpanElement> {
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  align?: React.CSSProperties["alignItems"];
}

/** Inline flex wrapper for icon + label + badge groups. */
export const Inline = forwardRef<HTMLSpanElement, InlineProps>(function Inline(
  { gap = 2, align = "center", className, style, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn("ease-inline", className)}
      style={{
        gap: gap === 0 ? undefined : `var(--ease-spacing-${gap})`,
        alignItems: align,
        ...style,
      }}
      data-ease="inline"
      {...rest}
    >
      {children}
    </span>
  );
});
