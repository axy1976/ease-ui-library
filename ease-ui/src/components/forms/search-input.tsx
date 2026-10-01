import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { SearchIcon, CloseIcon } from "../../icons";

export interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "disabled" | "children"
> {
  size?: "sm" | "md" | "lg";
  /** Placeholder text; a magnifier icon is always shown, so label this for SR. */
  placeholder?: string;
  /** Show a clear (×) button when the input has a value. */
  clearable?: boolean;
  onClear?: () => void;
  disabled?: boolean;
  /** Optional leading icon override. */
  icon?: ReactNode;
}

/**
 * Search field with a built-in magnifier affordance and optional clear
 * button. Expects `aria-label` when there is no visible label next to it.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      size = "md",
      placeholder = "Search…",
      clearable,
      onClear,
      disabled,
      icon,
      value,
      className,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        className={cn("ease-search-input", className)}
        data-ease="input-group"
        style={{ display: "flex", alignItems: "stretch" }}
      >
        <span
          data-ease-input-affix="icon"
          style={{
            display: "inline-flex",
            alignItems: "center",
            paddingInline: "var(--ease-spacing-2)",
            border: "1px solid var(--ease-color-border-strong)",
            borderInlineEnd: "none",
            borderRadius: "var(--ease-radius-md) 0 0 var(--ease-radius-md)",
            color: "var(--ease-color-text-subtle)",
          }}
        >
          {icon ?? <SearchIcon size={14} />}
        </span>
        <input
          ref={ref}
          type="search"
          role="searchbox"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          aria-label={ariaLabel ?? placeholder}
          data-ease="input"
          data-size={size}
          data-disabled={disabled ? "true" : undefined}
          style={{
            flex: 1,
            minWidth: 0,
            border: "1px solid var(--ease-color-border-strong)",
            borderInlineStart: "none",
            borderStartEndRadius:
              clearable && String(value ?? "").length > 0
                ? 0
                : "var(--ease-radius-md)",
            borderEndEndRadius:
              clearable && String(value ?? "").length > 0
                ? 0
                : "var(--ease-radius-md)",
            background: "var(--ease-color-surface)",
            color: "var(--ease-color-text)",
            fontFamily: "inherit",
            fontSize: "var(--ease-font-size-sm)",
            height: "var(--ease-control-height-md)",
          }}
          {...rest}
        />
        {clearable && String(value ?? "").length > 0 ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            disabled={disabled}
            style={{
              border: "1px solid var(--ease-color-border-strong)",
              borderInlineStart: "none",
              borderRadius: "0 var(--ease-radius-md) var(--ease-radius-md) 0",
              background: "var(--ease-color-surface-subtle)",
              color: "var(--ease-color-text-subtle)",
              cursor: "pointer",
              padding: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "var(--ease-control-height-md)",
            }}
          >
            <CloseIcon size={14} />
          </button>
        ) : null}
      </div>
    );
  },
);
