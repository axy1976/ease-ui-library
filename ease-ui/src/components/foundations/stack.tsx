import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Vertical gap token, e.g. "2" → var(--ease-spacing-2). Default "3". */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
}

/**
 * Flex column with a tokenized gap. The gap applies to children, not margins —
 * removing or reordering children never leaves phantom spacing.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap = 3, align, justify, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("ease-stack", className)}
      style={{
        gap: gap === 0 ? undefined : `var(--ease-spacing-${gap})`,
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      data-ease="stack"
      {...rest}
    >
      {children}
    </div>
  );
});
