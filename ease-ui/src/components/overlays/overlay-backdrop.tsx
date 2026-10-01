import { type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface OverlayBackdropProps extends HTMLAttributes<HTMLDivElement> {
  onBackdropClick?: () => void;
}

/**
 * Dimmed full-viewport backdrop behind a modal. Clicking it (when a handler
 * is provided) closes the overlay — the standard user expectation.
 */
export function OverlayBackdrop({
  onBackdropClick,
  className,
  ...rest
}: OverlayBackdropProps) {
  return (
    <div
      className={cn("ease-overlay-backdrop", className)}
      data-ease="overlay-backdrop"
      onMouseDown={(e) => {
        // Only a click that *started* on the backdrop closes; a drag that
        // began inside the dialog and released on the backdrop should not.
        if (e.target === e.currentTarget) onBackdropClick?.();
      }}
      {...rest}
    />
  );
}
