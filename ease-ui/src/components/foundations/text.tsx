import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  weight?: "regular" | "medium" | "semibold";
  tone?: "default" | "muted" | "subtle";
  /** Monospace body (ids, code-ish values). */
  mono?: boolean;
  as?: "span" | "p" | "label" | "figcaption" | "small";
}

export const Text = forwardRef<HTMLSpanElement, TextProps>(function Text(
  {
    size = "md",
    weight,
    tone = "default",
    mono,
    as = "span",
    className,
    ...rest
  },
  ref,
) {
  const Element = as as React.ElementType;
  return (
    <Element
      ref={ref}
      className={cn("ease-text", className)}
      data-ease="text"
      data-size={size}
      data-weight={weight ?? undefined}
      data-tone={tone !== "default" ? tone : undefined}
      data-mono={mono ? "true" : undefined}
      {...rest}
    />
  );
});
