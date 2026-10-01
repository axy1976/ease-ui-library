"use client";

import {
  forwardRef,
  useContext,
  useId,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import { FieldContext } from "./field";

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "disabled" | "checked" | "onChange" | "defaultChecked" | "children"
> {
  /**
   * Current state. Pass `undefined` (and `defaultChecked`) for uncontrolled
   * use; it's a plain checkbox with role="switch" under the hood.
   */
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  children?: ReactNode;
  onChange?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * On/off toggle backed by a real checkbox input (role="switch"). Keyboard:
 * Space/Enter toggle; focus is visible on the track.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked,
    disabled,
    label,
    children,
    className,
    id,
    onChange,
    onCheckedChange,
    "aria-invalid": ai,
    "aria-describedby": ad,
    "aria-labelledby": al,
    ...rest
  },
  ref,
) {
  const field = useContext(FieldContext);
  const autoId = useId();
  const inputId = id ?? field?.id ?? autoId;
  const controlled = checked !== undefined;
  const resolvedDisabled = disabled || field?.disabled || false;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.checked;
    onChange?.(next);
    onCheckedChange?.(next);
  }

  return (
    <label
      className={cn("ease-switch", className)}
      data-ease="switch"
      data-state={(controlled ? checked : defaultChecked) ? "on" : "off"}
      data-disabled={resolvedDisabled ? "true" : undefined}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        id={inputId}
        {...(controlled ? { checked } : { defaultChecked })}
        disabled={resolvedDisabled}
        onChange={handleChange}
        aria-invalid={ai}
        aria-labelledby={
          al ?? (field?.labelId ? field.id + " " + field.labelId : undefined)
        }
        aria-describedby={
          ad ??
          ([field?.descriptionId, field?.messageId].filter(Boolean).join(" ") ||
            undefined)
        }
        className="ease-switch__input"
        data-ease-switch="input"
        {...rest}
      />
      <span data-ease-switch="track" aria-hidden="true" />
      {(label || children) ? <span>{label || children}</span> : null}
    </label>
  );
});
