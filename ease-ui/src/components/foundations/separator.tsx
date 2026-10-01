import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    { orientation = "horizontal", decorative, className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role={decorative ? "presentation" : "separator"}
        aria-orientation={orientation}
        className={cn("ease-separator", className)}
        data-ease="separator"
        data-orientation={orientation}
        {...rest}
      />
    );
  },
);
