import { forwardRef, type HTMLAttributes } from "react";

/**
 * Visually hidden but still announced by screen readers. Use for
 * supplementary text ("Search results (12 items)") or icon button names that
 * must exist in the accessibility tree.
 */
export const VisuallyHidden = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function VisuallyHidden({ children, ...rest }, ref) {
  return (
    <span ref={ref} data-ease="visually-hidden" {...rest}>
      {children}
    </span>
  );
});
