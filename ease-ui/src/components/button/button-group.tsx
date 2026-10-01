import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export type ButtonGroupProps = HTMLAttributes<HTMLDivElement>;

/**
 * Joins adjacent buttons into one segmented control (split buttons, toolbars).
 * Children should be plain Buttons of the same size/variant.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup({ className, role = "group", ...rest }, ref) {
    return (
      <div
        ref={ref}
        role={role}
        className={cn("ease-button-group", className)}
        data-ease="button-group"
        {...rest}
      />
    );
  },
);
