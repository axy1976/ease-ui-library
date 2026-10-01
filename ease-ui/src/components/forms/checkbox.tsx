"use client";

import {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  type InputHTMLAttributes,
} from "react";
import { cn } from "../../utils";
import { FieldContext } from "./field";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "disabled" | "children"
> {
  disabled?: boolean;
  /** Tri-state: renders the box in its "partially checked" state. */
  indeterminate?: boolean;
  label?: string | React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Native checkbox with the library's visual box. `indeterminate` is set on
 * the DOM property (not an attribute) in an effect, so it stays in sync
 * without fighting React's attribute diffing.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      disabled,
      indeterminate,
      label,
      children,
      className,
      id,
      "aria-invalid": ai,
      "aria-describedby": ad,
      "aria-labelledby": al,
      ...rest
    },
    ref,
  ) {
    const inner = useRef<HTMLInputElement>(null);
    const field = useContext(FieldContext);
    const resolvedDisabled = disabled || field?.disabled || false;
    const resolvedInvalid = field?.invalid || false;

    useEffect(() => {
      if (inner.current) inner.current.indeterminate = !!indeterminate;
    }, [indeterminate]);

    // Merge forwarded ref with our internal ref so consumers can still read it.
    useEffect(() => {
      if (typeof ref === "function") ref(inner.current);
      else if (ref && typeof ref === "object") ref.current = inner.current;
    }, [ref]);

    return (
      <label
        className={cn("ease-checkbox", className)}
        data-ease="checkbox"
        data-disabled={resolvedDisabled ? "true" : undefined}
      >
        <input
          ref={inner}
          type="checkbox"
          id={id ?? field?.id}
          disabled={resolvedDisabled}
          aria-invalid={ai ?? (resolvedInvalid || undefined)}
          aria-describedby={
            ad ??
            ([field?.descriptionId, field?.messageId]
              .filter(Boolean)
              .join(" ") ||
              undefined)
          }
          aria-labelledby={
            al ?? (field?.labelId ? field.id + " " + field.labelId : undefined)
          }
          {...rest}
        />
        {(label || children) ? <span>{label || children}</span> : null}
      </label>
    );
  },
);
