"use client";

import { forwardRef, useContext, type InputHTMLAttributes } from "react";
import { cn } from "../../utils";
import { FieldContext } from "./field";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "disabled"
> {
  size?: InputSize;
  /** Visual invalid state; usually set by a wrapping <Field error=...>. */
  invalid?: boolean;
  disabled?: boolean;
}

/**
 * Text input. Reads id/aria relationships from a wrapping <Field> so the
 * canonical usage is:
 *
 *   <Field label="Email" error={err}>
 *     <Input type="email" />
 *   </Field>
 *
 * The field's id is picked up automatically — you never pass htmlFor or
 * aria-describedby by hand in the common case.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = "md",
    invalid,
    disabled,
    className,
    id,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedby,
    "aria-labelledby": ariaLabelledby,
    ...rest
  },
  ref,
) {
  const field = useContext(FieldContext);
  const resolvedInvalid = invalid || field?.invalid || false;
  const resolvedDisabled = disabled || field?.disabled || false;

  return (
    <input
      ref={ref}
      id={id ?? field?.id}
      disabled={resolvedDisabled}
      required={field?.required && !rest.required ? true : rest.required}
      className={cn("ease-input", className)}
      data-ease="input"
      data-size={size}
      data-invalid={resolvedInvalid ? "true" : undefined}
      data-disabled={resolvedDisabled ? "true" : undefined}
      aria-invalid={ariaInvalid ?? (resolvedInvalid || undefined)}
      aria-describedby={
        ariaDescribedby ??
        ([field?.descriptionId, field?.messageId].filter(Boolean).join(" ") ||
          undefined)
      }
      aria-labelledby={
        ariaLabelledby ??
        (field?.labelId ? field.id + " " + field.labelId : undefined)
      }
      {...rest}
    />
  );
});
