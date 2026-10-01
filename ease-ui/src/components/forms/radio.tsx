"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import { FieldContext } from "./field";

interface RadioGroupContextValue {
  name: string;
  value: string | null;
  onValueChange?: (value: string) => void;
  disabled: boolean;
  labelId?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "disabled" | "value" | "children"
> {
  value: string;
  disabled?: boolean;
  label?: string;
  children?: ReactNode;
}

export interface RadioGroupProps {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  label?: ReactNode;
  name?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Manages a set of Radio controls. Uses a hidden <fieldset>/<legend> for the
 * group semantics and roving `name` for native radio behavior.
 */
export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  disabled,
  label,
  name,
  className,
  children,
}: RadioGroupProps) {
  const autoName = useId();
  const [internal, setInternal] = useState(defaultValue ?? null);
  const current = value !== undefined ? value : internal;
  const labelId = useId();

  function handleChange(next: string) {
    setInternal(next);
    onValueChange?.(next);
  }

  return (
    <fieldset
      className={cn("ease-field", className)}
      data-ease="field"
      disabled={disabled || undefined}
      aria-labelledby={label ? labelId : undefined}
      style={{
        border: 0,
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--ease-spacing-2)",
      }}
    >
      {label ? (
        <legend
          id={labelId}
          data-ease-field="label"
          style={{
            fontSize: "var(--ease-font-size-sm)",
            fontWeight: "var(--ease-font-weight-medium)",
          }}
        >
          {label}
        </legend>
      ) : null}
      <RadioGroupContext.Provider
        value={{
          name: name ?? autoName,
          value: current,
          onValueChange: handleChange,
          disabled: !!disabled,
          labelId: label ? labelId : undefined,
        }}
      >
        {children}
      </RadioGroupContext.Provider>
    </fieldset>
  );
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, disabled, label, className, id, children, "aria-labelledby": al, ...rest },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const field = useContext(FieldContext);
  const resolvedDisabled =
    disabled || group?.disabled || field?.disabled || false;
  const checked = group ? group.value === value : rest.checked;

  return (
    <label
      className={cn("ease-radio", className)}
      data-ease="radio"
      data-disabled={resolvedDisabled ? "true" : undefined}
    >
      <input
        ref={ref}
        type="radio"
        name={group?.name}
        value={value}
        checked={checked}
        disabled={resolvedDisabled}
        id={id ?? field?.id}
        aria-labelledby={
          al ?? (field?.labelId ? field.id + " " + field.labelId : undefined)
        }
        onChange={(e) => {
          rest.onChange?.(e);
          group?.onValueChange?.(value);
        }}
        {...rest}
      />
      {(label || children) ? <span>{label || children}</span> : null}
    </label>
  );
});
