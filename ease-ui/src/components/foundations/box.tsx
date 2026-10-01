import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  /** Rendered as a different element when provided. */
  as?: keyof HTMLElementTagNameMap | React.ElementType;
}

/**
 * Primitive layout container. No visual defaults beyond `display: block` —
 * compose with Stack, Grid, and Container rather than stacking Boxes for
 * spacing (that's what the gap-based primitives are for).
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { as, className, children, ...rest },
  ref,
) {
  const Element = (as ?? "div") as React.ElementType;
  return (
    <Element
      ref={ref}
      className={cn("ease-box", className)}
      {...rest}
      data-ease="box"
    >
      {children}
    </Element>
  );
});
