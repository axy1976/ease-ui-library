"use client";

import {
  forwardRef,
  useContext,
  useState,
  type InputHTMLAttributes,
} from "react";
import { cn } from "../../utils";
import { FieldContext } from "./field";
import { EyeOpenIcon, EyeClosedIcon } from "../../icons";

export interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "disabled" | "children"
> {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  invalid?: boolean;
  /** Show the reveal toggle. Default true. */
  revealable?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      size = "md",
      disabled,
      invalid,
      revealable = true,
      className,
      id,
      "aria-invalid": ai,
      "aria-describedby": ad,
      "aria-labelledby": al,
      ...rest
    },
    ref,
  ) {
    const [showing, setShowing] = useState(false);
    const field = useContext(FieldContext);
    const resolvedInvalid = invalid || field?.invalid || false;
    const resolvedDisabled = disabled || field?.disabled || false;

    const toggle = revealable && !resolvedDisabled;

    return (
      <div
        className={cn("ease-password-input", className)}
        style={{ display: "flex", alignItems: "stretch", position: "relative" }}
      >
        <input
          ref={ref}
          type={showing ? "text" : "password"}
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
          data-ease="input"
          data-size={size}
          data-invalid={resolvedInvalid ? "true" : undefined}
          data-disabled={resolvedDisabled ? "true" : undefined}
          style={{
            flex: 1,
            minWidth: 0,
            paddingRight: toggle ? "2.5rem" : undefined,
          }}
          {...rest}
        />
        {toggle ? (
          <button
            type="button"
            onClick={() => setShowing((s) => !s)}
            aria-label={showing ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              insetInlineEnd: "0.5rem",
              display: "inline-flex",
              border: 0,
              background: "none",
              cursor: "pointer",
              color: "var(--ease-color-text-subtle)",
              padding: 4,
              borderRadius: "var(--ease-radius-sm)",
            }}
          >
            {showing ? <EyeClosedIcon size={16} /> : <EyeOpenIcon size={16} />}
          </button>
        ) : null}
      </div>
    );
  },
);
