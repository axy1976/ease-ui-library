import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils";

export interface ExampleProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** One-line description of this prop. */
  label?: string;
  children?: React.ReactNode;
}

/**
 * Example — <one sentence: what problem does it solve?>
 *
 * Accessibility: <keyboard / focus / ARIA notes>
 * Responsive: <mobile behavior>
 */
export const Example = forwardRef<HTMLDivElement, ExampleProps>(
  function Example({ label, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("ease-example", className)}
        data-ease="example"
        {...rest}
      >
        {label ? <span data-ease-example="label">{label}</span> : null}
        {children}
      </div>
    );
  },
);
