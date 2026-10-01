import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export type ChipVariant = "soft" | "solid" | "outline";
export type ChipTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface ChipProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  tone?: ChipTone;
  variant?: ChipVariant;
  /** Add a remove button; pass `onRemove` to handle it. */
  onRemove?: () => void;
  children?: ReactNode;
}

/**
 * A small, rounded label. `Chip` is the rounded sibling of `Badge` (square)
 * and `Tag` (rectangular). Use chips for:
 *   - multi-select filter values in a toolbar ("region:us-east-1")
 *   - selected values inside a combobox / search input
 *   - free-form labels the user typed
 */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  {
    tone = "neutral",
    variant = "soft",
    onRemove,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <span
      ref={ref}
      data-ease="chip"
      data-tone={tone}
      data-variant={variant}
      className={cn("ease-chip", className)}
      {...rest}
    >
      <span data-ease-chip="label">{children}</span>
      {onRemove ? (
        <button
          type="button"
          data-ease-chip="remove"
          aria-label={`Remove ${typeof children === "string" ? children : "chip"}`}
          onClick={onRemove}
        >
          ×
        </button>
      ) : null}
    </span>
  );
});

/**
 * A wrapping row of chips. Chips flow into multiple rows as they exceed the
 * container width. Use inside a `SearchInput`-like container or a toolbar
 * to show active filters.
 */
export function ChipGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("ease-chip-group", className)} data-ease="chip-group">
      {children}
    </div>
  );
}
