import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { Button } from "../button/button";
import { Select } from "../forms/select";

export interface TablePaginationProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "size" | "onSelect"
> {
  /** 1-based current page. */
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
  /** 1-based page jump. */
  onPageChange?: (page: number) => void;
  /** "1–25 of 128" style summary. */
  rangeLabel?: ReactNode;
  /** Rows-per-page control. */
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
}

/**
 * Bottom table bar: result summary on one side, prev/next + page jump +
 * page-size selector on the other. Mirrors the toolbar at the top.
 */
export const TablePagination = forwardRef<HTMLDivElement, TablePaginationProps>(
  function TablePagination(
    {
      page,
      pageCount,
      onPrev,
      onNext,
      onPageChange,
      rangeLabel,
      pageSize,
      pageSizeOptions,
      onPageSizeChange,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn("ease-table-pagination", className)}
        data-ease="table-pagination"
        {...rest}
      >
        <span>{rangeLabel}</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--ease-spacing-2)",
          }}
        >
          {pageSizeOptions && onPageSizeChange ? (
            <Select
              size="sm"
              value={String(pageSize)}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              aria-label="Rows per page"
              style={{ width: "auto", minWidth: "6rem" }}
            >
              {pageSizeOptions.map((o) => (
                <option key={o} value={o}>
                  {o} / page
                </option>
              ))}
            </Select>
          ) : null}
          <Button
            size="sm"
            variant="outline"
            disabled={page <= 1}
            onClick={onPrev}
            aria-label="Previous page"
          >
            ←
          </Button>
          <span style={{ fontSize: "var(--ease-font-size-xs)" }}>
            Page {page} of {Math.max(1, pageCount)}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={page >= pageCount}
            onClick={onNext}
            aria-label="Next page"
          >
            →
          </Button>
          {onPageChange ? (
            <input
              type="number"
              aria-label="Go to page"
              min={1}
              max={pageCount}
              value={page}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (n >= 1 && n <= pageCount) onPageChange(n);
              }}
              style={{
                width: "3.5rem",
                height: "var(--ease-control-height-sm)",
                border: "1px solid var(--ease-color-border-strong)",
                borderRadius: "var(--ease-radius-md)",
                background: "var(--ease-color-surface)",
                color: "var(--ease-color-text)",
                fontFamily: "inherit",
                fontSize: "var(--ease-font-size-xs)",
                textAlign: "center",
              }}
            />
          ) : null}
        </div>
      </div>
    );
  },
);
