"use client";

import {
  forwardRef,
  useId,
  createContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";

export interface FieldContextValue {
  id: string;
  labelId?: string;
  descriptionId?: string;
  messageId?: string;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
}

export const FieldContext = createContext<FieldContextValue | null>(null);

export interface FieldProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /**
   * Id of the control inside (or an external id). When the control renders
   * inside this Field, it will pick the id up automatically via context.
   */
  htmlFor?: string;
  label?: ReactNode;
  /** Helper text shown below the label. */
  description?: ReactNode;
  /** Error message. Shows the field in its invalid visual state. */
  error?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  children: ReactNode;
  /**
   * Id of the input that this field describes. Lets the <label> target the
   * control even when it is not a direct child.
   */
  inputId?: string;
}

/**
 * The one wrapper every form control sits in. It wires label ↔ input,
 * description, and error with correct ARIA relationships, and applies the
 * invalid/disabled visual state to anything that reads FieldContext.
 *
 *   <Field label="Project name" description="Use a short id." error={err}>
 *     <Input />
 *   </Field>
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  {
    label,
    description,
    error,
    disabled,
    required,
    htmlFor,
    inputId,
    className,
    children,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const id = htmlFor ?? inputId ?? autoId;
  const labelId = useId();
  const descriptionId = useId();
  const messageId = useId();
  const invalid = Boolean(error);

  const ctx: FieldContextValue = {
    id,
    labelId: label ? labelId : undefined,
    descriptionId: description ? descriptionId : undefined,
    messageId: error ? messageId : undefined,
    invalid,
    disabled: !!disabled,
    required: !!required,
  };

  return (
    <FieldContext.Provider value={ctx}>
      <div
        ref={ref}
        className={cn("ease-field", className)}
        data-ease="field"
        data-invalid={invalid ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        {...rest}
      >
        {label ? (
          <label htmlFor={id} data-ease-field="label" id={labelId}>
            {label}
            {required ? (
              <span
                aria-hidden="true"
                style={{ color: "var(--ease-color-danger)", marginLeft: 4 }}
              >
                *
              </span>
            ) : null}
          </label>
        ) : null}
        {description ? (
          <p data-ease-field="description" id={descriptionId}>
            {description}
          </p>
        ) : null}
        <div data-ease-field="controls">{children}</div>
        {error ? (
          <p data-ease-field="message" id={messageId} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
});
