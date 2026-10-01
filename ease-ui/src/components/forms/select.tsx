"use client";

import { forwardRef, useContext, type SelectHTMLAttributes } from "react";
import { cn } from "../../utils";
import { FieldContext } from "./field";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size" | "disabled"
> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  disabled?: boolean;
  /** Convenience for simple option lists; full children also work. */
  options?: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      size = "md",
      invalid,
      disabled,
      options,
      placeholder,
      className,
      id,
      "aria-invalid": ai,
      "aria-describedby": ad,
      "aria-labelledby": al,
      children,
      ...rest
    },
    ref,
  ) {
    const field = useContext(FieldContext);
    const resolvedInvalid = invalid || field?.invalid || false;
    const resolvedDisabled = disabled || field?.disabled || false;
    return (
      <select
        ref={ref}
        id={id ?? field?.id}
        disabled={resolvedDisabled}
        required={field?.required && !rest.required ? true : rest.required}
        className={cn("ease-select", className)}
        data-ease="select"
        data-size={size}
        data-invalid={resolvedInvalid ? "true" : undefined}
        data-disabled={resolvedDisabled ? "true" : undefined}
        aria-invalid={ai ?? (resolvedInvalid || undefined)}
        aria-describedby={
          ad ??
          ([field?.descriptionId, field?.messageId].filter(Boolean).join(" ") ||
            undefined)
        }
        aria-labelledby={
          al ?? (field?.labelId ? field.id + " " + field.labelId : undefined)
        }
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options?.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
        {children}
      </select>
    );
  },
);
