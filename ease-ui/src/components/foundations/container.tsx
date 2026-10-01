import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Constrain to a max width. Default true (72rem). */
  fluid?: boolean;
  maxWidth?: string;
}

/** Centered, max-width content column. */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    { fluid, maxWidth, className, style, children, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn("ease-container", className)}
        style={
          fluid
            ? { maxWidth: "none", ...style }
            : { maxWidth: maxWidth, ...style }
        }
        data-ease="container"
        {...rest}
      >
        {children}
      </div>
    );
  },
);
