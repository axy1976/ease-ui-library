import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "size"
> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** How many page buttons to show around the current page. */
  siblingCount?: number;
  "aria-label"?: string;
}

/**
 * Paged navigation with ellipsis for long ranges. Announces the current page
 * via aria-current="page".
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      page,
      pageCount,
      onPageChange,
      siblingCount = 1,
      className,
      "aria-label": ariaLabel = "Pagination",
      ...rest
    },
    ref,
  ) {
    const siblings = new Set<number>();
    for (let i = page - siblingCount; i <= page + siblingCount; i++) {
      if (i >= 1 && i <= pageCount) siblings.add(i);
    }
    const items: (number | "ellipsis-start" | "ellipsis-end")[] = [];
    let last = 0;
    const sorted = [...siblings].sort((a, b) => a - b);
    for (const n of sorted) {
      if (last && n - last > 1)
        items.push(n === sorted[0] ? "ellipsis-start" : "ellipsis-end");
      items.push(n);
      last = n;
    }
    if (last < pageCount) items.push("ellipsis-end");

    return (
      <nav
        ref={ref as never}
        aria-label={ariaLabel}
        className={cn("ease-pagination", className)}
        data-ease="pagination"
        {...rest}
      >
        {items.map((item, i) => {
          if (item === "ellipsis-start" || item === "ellipsis-end") {
            return (
              <span
                key={`${item}-${i}`}
                data-ease-pagination="ellipsis"
                aria-hidden="true"
              >
                …
              </span>
            );
          }
          return (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={item === page ? "page" : undefined}
              aria-label={`Page ${item}`}
              data-ease-pagination="item"
              data-current={item === page ? "true" : undefined}
            >
              {item}
            </button>
          );
        })}
      </nav>
    );
  },
);
