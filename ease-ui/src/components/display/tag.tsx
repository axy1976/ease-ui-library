import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { CloseIcon } from "../../icons";

export interface TagProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "status"
> {
  /** Adds a remove button; pass `onRemove` to handle it. */
  onRemove?: () => void;
}

/**
 * Removable metadata tag (labels, filters). Square-ish to read as a data
 * attribute, distinct from the pill-shaped Badge.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { onRemove, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn("ease-tag", className)}
      data-ease="tag"
      {...rest}
    >
      {children as ReactNode}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          data-ease-tag="remove"
          aria-label={`Remove ${typeof children === "string" ? children : "tag"}`}
        >
          <CloseIcon size={11} />
        </button>
      ) : null}
    </span>
  );
});
