import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface TableToolbarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Title / current view label. */
  title?: ReactNode;
  /** Contextual info ("128 resources", "2 selected"). */
  meta?: ReactNode;
  children?: ReactNode;
}

/**
 * The bar above a table: view title, live counts, and actions (search,
 * filters, bulk actions that activate on selection).
 */
export const TableToolbar = forwardRef<HTMLDivElement, TableToolbarProps>(
  function TableToolbar({ title, meta, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("ease-table-toolbar", className)}
        data-ease="table-toolbar"
        {...rest}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--ease-spacing-2)",
            flexWrap: "wrap",
          }}
        >
          {title ? (
            <strong
              style={{
                fontSize: "var(--ease-font-size-sm)",
                fontWeight: "var(--ease-font-weight-semibold)",
              }}
            >
              {title}
            </strong>
          ) : null}
          {meta ? (
            <span
              style={{
                fontSize: "var(--ease-font-size-xs)",
                color: "var(--ease-color-text-muted)",
              }}
            >
              {meta}
            </span>
          ) : null}
        </div>
        {children ? (
          <div data-ease-table-toolbar="actions">{children}</div>
        ) : null}
      </div>
    );
  },
);
