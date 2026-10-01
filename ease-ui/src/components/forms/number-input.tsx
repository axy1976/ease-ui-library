"use client";

import { forwardRef, useContext, type InputHTMLAttributes } from "react";
import { cn } from "../../utils";
import { FieldContext } from "./field";
import { ChevronUpIcon, ChevronDownIcon } from "../../icons";

export interface NumberInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "disabled" | "children"
> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Numeric input with explicit stepper buttons (native spinners are
 * inconsistent across platforms and often invisible). The value is a standard
 * input `value`/`onChange`; the steppers emit the clamped value.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      size = "md",
      invalid,
      disabled,
      min,
      max,
      step,
      value,
      onChange,
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

    function nudge(delta: number) {
      const current = value === undefined || value === "" ? 0 : Number(value);
      if (Number.isNaN(current)) return;
      let next = current + delta * (step ?? 1);
      if (min !== undefined) next = Math.max(min, next);
      if (max !== undefined) next = Math.min(max, next);
      onChange?.({
        target: { value: String(next) },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }

    return (
      <div
        className={cn("ease-number-input", className)}
        data-ease="input-group"
        style={{ display: "flex", alignItems: "stretch" }}
      >
        <input
          ref={ref}
          type="number"
          id={id ?? field?.id}
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={resolvedDisabled}
          onChange={onChange}
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
          data-ease="input"
          data-size={size}
          data-invalid={resolvedInvalid ? "true" : undefined}
          data-disabled={resolvedDisabled ? "true" : undefined}
          style={
            {
              flex: 1,
              minWidth: 0,
              appearance: "textfield",
            } as React.CSSProperties
          }
          {...rest}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            type="button"
            tabIndex={-1}
            disabled={resolvedDisabled}
            aria-label="Increase"
            onClick={() => nudge(1)}
            style={{
              flex: 1,
              border: "1px solid var(--ease-color-border-strong)",
              borderInlineStart: "none",
              borderStartEndRadius: "var(--ease-radius-md)",
              background: "var(--ease-color-surface-subtle)",
              color: "var(--ease-color-text-subtle)",
              cursor: "pointer",
              padding: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.75rem",
              borderBottom: "1px solid var(--ease-color-border-strong)",
            }}
          >
            <ChevronUpIcon size={12} />
          </button>
          <button
            type="button"
            tabIndex={-1}
            disabled={resolvedDisabled}
            aria-label="Decrease"
            onClick={() => nudge(-1)}
            style={{
              flex: 1,
              border: "1px solid var(--ease-color-border-strong)",
              borderInlineStart: "none",
              borderEndEndRadius: "var(--ease-radius-md)",
              background: "var(--ease-color-surface-subtle)",
              color: "var(--ease-color-text-subtle)",
              cursor: "pointer",
              padding: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.75rem",
            }}
          >
            <ChevronDownIcon size={12} />
          </button>
        </div>
      </div>
    );
  },
);
