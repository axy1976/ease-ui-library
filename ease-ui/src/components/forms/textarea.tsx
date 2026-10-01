"use client";

import { forwardRef, useContext, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils";
import { FieldContext } from "./field";

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "disabled" | "children"
> {
  invalid?: boolean;
  disabled?: boolean;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      invalid,
      disabled,
      rows = 4,
      className,
      id,
      "aria-invalid": ai,
      "aria-describedby": ad,
      "aria-labelledby": al,
      ...rest
    },
    ref,
  ) {
    const field = useContext(FieldContext);
    const resolvedInvalid = invalid || field?.invalid || false;
    const resolvedDisabled = disabled || field?.disabled || false;
    return (
      <textarea
        ref={ref}
        id={id ?? field?.id}
        rows={rows}
        disabled={resolvedDisabled}
        required={field?.required && !rest.required ? true : rest.required}
        className={cn("ease-textarea", className)}
        data-ease="textarea"
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
      />
    );
  },
);
