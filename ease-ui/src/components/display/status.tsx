import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import type { StatusKind } from "./badge";

export interface StatusProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "status"
> {
  status: StatusKind;
  /** Pulse the dot for live/running indicators. */
  pulse?: boolean;
  children?: ReactNode;
}

/**
 * Status dot + label. The dot is color+shape (not color alone): a screen
 * reader also hears the label, and a low-vision user sees the dot's position
 * in the row. Pair with Badge for dense table cells.
 */
export const Status = forwardRef<HTMLSpanElement, StatusProps>(function Status(
  { status, pulse, children, className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn("ease-status", className)}
      data-ease="status"
      data-status={status}
      data-pulse={pulse ? "true" : undefined}
      {...rest}
    >
      <span data-ease-status="dot" aria-hidden="true" />
      {children}
    </span>
  );
});
