import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  tone?: "default" | "muted";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ level = 3, tone = "default", className, ...rest }, ref) {
    const Tag = `h${level}` as const;
    return (
      <Tag
        ref={ref}
        className={cn("ease-heading", className)}
        data-ease="heading"
        data-level={Math.min(level, 4)}
        data-tone={tone !== "default" ? tone : undefined}
        {...rest}
      />
    );
  },
);
