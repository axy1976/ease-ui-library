"use client";

import {
  createContext,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { cn } from "../../utils";

export type TableVariant = "default" | "striped" | "compact" | "divided";

export interface TableColumn<T> {
  id: string;
  header: ReactNode;
  /** How the cell renders a row. */
  cell: (row: T) => ReactNode;
  /** Enables the sortable header when provided. */
  sortAccessor?: (row: T) => string | number;
  align?: "start" | "center" | "end";
  width?: string;
  /** Hide this column below the given breakpoint class. */
  hidden?: boolean;
}

export interface TableProps extends Omit<
  HTMLAttributes<HTMLTableElement>,
  "size"
> {
  /** Opt-in visual variants; all share the same row/cell semantics. */
  variant?: TableVariant;
  /** Keep the header row fixed while the body scrolls. */
  stickyHeader?: boolean;
  children: ReactNode;
}

interface TableContextValue {
  selected: Set<string>;
  toggleRow: (key: string) => void;
  selectable: boolean;
}

const TableContext = createContext<TableContextValue | null>(null);

/**
 * Composable table core. Build the document tree explicitly (TableHeader /
 * TableBody / TableRow / TableCell) so you keep full control of semantics;
 * the variants only adjust density and borders.
 *
 * For data-driven tables, see the `DataTable` helper which turns a column
 * definition + rows into this exact structure.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { variant = "default", stickyHeader, className, children, ...rest },
  ref,
) {
  return (
    <table
      ref={ref}
      className={cn("ease-table", className)}
      data-ease="table"
      data-variant={variant === "default" ? undefined : variant}
      data-sticky-header={stickyHeader ? "true" : undefined}
      {...rest}
    >
      {children}
    </table>
  );
});

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableHeader({ className, ...rest }, ref) {
  return (
    <thead ref={ref} className={className} data-ease-table="head" {...rest} />
  );
});

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, ...rest }, ref) {
  return (
    <tbody ref={ref} className={className} data-ease-table="body" {...rest} />
  );
});

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableFooter({ className, ...rest }, ref) {
  return (
    <tfoot ref={ref} className={className} data-ease-table="foot" {...rest} />
  );
});

export interface TableRowProps extends Omit<
  HTMLAttributes<HTMLTableRowElement>,
  "selected"
> {
  selected?: boolean;
  hoverable?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ selected, hoverable, className, ...rest }, ref) {
    return (
      <tr
        ref={ref}
        className={className}
        data-ease-table="row"
        data-selected={selected ? "true" : undefined}
        data-hover={hoverable ? "true" : undefined}
        {...rest}
      />
    );
  },
);

export interface TableHeadCellProps extends Omit<
  ThHTMLAttributes<HTMLTableCellElement>,
  "align"
> {
  /** Marks the column header as sortable (adds a button affordance). */
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
  scope?: "col";
  align?: "start" | "center" | "end";
}

export const TableHeadCell = forwardRef<
  HTMLTableCellElement,
  TableHeadCellProps
>(function TableHeadCell(
  {
    sortable,
    sortDirection,
    onSort,
    scope = "col",
    align,
    className,
    children,
    ...rest
  },
  ref,
) {
  if (sortable) {
    return (
      <th
        ref={ref}
        scope={scope}
        aria-sort={
          sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
              ? "descending"
              : "none"
        }
        data-sortable="true"
        className={cn("ease-th", className)}
        style={align ? { textAlign: align } : undefined}
        onClick={onSort}
        {...rest}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
          }}
        >
          {children}
          <span
            aria-hidden="true"
            data-sort-indicator
            style={{ fontSize: 10, opacity: sortDirection ? 1 : 0.4 }}
          >
            {sortDirection === "asc"
              ? "▲"
              : sortDirection === "desc"
                ? "▼"
                : "↕"}
          </span>
        </span>
      </th>
    );
  }
  return (
    <th
      ref={ref}
      scope={scope}
      className={cn("ease-th", className)}
      style={align ? { textAlign: align } : undefined}
      {...rest}
    >
      {children}
    </th>
  );
});

export interface TableCellProps extends Omit<
  TdHTMLAttributes<HTMLTableCellElement>,
  "align"
> {
  align?: "start" | "center" | "end";
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ align, className, ...rest }, ref) {
    return (
      <td
        ref={ref}
        className={className}
        data-ease-table="cell"
        style={align ? { textAlign: align } : undefined}
        {...rest}
      />
    );
  },
);

/**
 * Scrollable wrapper that gives tables a bounded box with rounded corners and
 * (optionally) a sticky header. Wrap <Table> in this for wide content.
 */
export function TableScroll({
  children,
  stickyHeader,
  maxHeight,
  className,
}: {
  children: ReactNode;
  stickyHeader?: boolean;
  maxHeight?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("ease-table-scroll", className)}
      data-ease="table-scroll"
      data-sticky-header={stickyHeader ? "true" : undefined}
      style={maxHeight ? { maxHeight } : undefined}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * DataTable — data-driven convenience over the composable primitives.
 *
 * Handles: header render, row render, sortable columns, selectable rows,
 * loading and empty states. Everything is derived from a columns array so a
 * caller passes exactly two things: columns and rows.
 * ---------------------------------------------------------------------- */

export interface DataTableColumn<T> extends Omit<TableColumn<T>, "header"> {
  header: ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Stable row key. Required for selection; defaults to identity. */
  rowKey?: (row: T) => string;
  variant?: TableVariant;
  /** Enables the row selection checkbox column. */
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  /** Default sort applied on mount. */
  defaultSort?: { id: string; direction: "asc" | "desc" };
  loading?: boolean;
  /** Empty state content; default is the shared EmptyState. */
  empty?: ReactNode;
  className?: string;
  stickyHeader?: boolean;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey = (row) =>
    String(
      (row as Record<string, unknown>).id ??
        (row as Record<string, unknown>).name ??
        JSON.stringify(row),
    ),
  variant = "default",
  selectable = false,
  selectedKeys,
  onSelectionChange,
  defaultSort,
  loading,
  empty,
  className,
  stickyHeader,
}: DataTableProps<T>) {
  const [internalSelection, setInternalSelection] = useState<Set<string>>(
    new Set(),
  );
  const selection = selectedKeys ?? internalSelection;
  const [sort, setSort] = useState(defaultSort ?? null);

  const controlledSelection = selectedKeys !== undefined;

  function toggleRow(key: string) {
    if (controlledSelection) return;
    const next = new Set(internalSelection);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setInternalSelection(next);
  }

  function handleSort(column: DataTableColumn<T>) {
    if (!column.sortAccessor) return;
    setSort((prev) => {
      if (prev?.id !== column.id) return { id: column.id, direction: "asc" };
      if (prev.direction === "asc") return { id: column.id, direction: "desc" };
      return null; // asc → desc → none
    });
  }

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.id === sort.id);
    if (!column?.sortAccessor) return rows;
    const accessor = column.sortAccessor;
    return [...rows].sort((a, b) => {
      const av = accessor(a);
      const bv = accessor(b);
      if (av < bv) return sort.direction === "asc" ? -1 : 1;
      if (av > bv) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sort, columns]);

  const visibleColumns = columns.filter((c) => !c.hidden);

  return (
    <TableScroll className={className} stickyHeader={stickyHeader}>
      <Table variant={variant}>
        <TableContext.Provider
          value={{ selected: selection, toggleRow, selectable }}
        >
          <TableHeader>
            <TableRow>
              {selectable ? (
                <TableHeadCell style={{ width: 40 }}>
                  <CheckboxHeader
                    allSelected={
                      sortedRows.length > 0 &&
                      sortedRows.every((r) => selection.has(rowKey(r)))
                    }
                    someSelected={sortedRows.some((r) =>
                      selection.has(rowKey(r)),
                    )}
                    onToggleAll={() => {
                      if (controlledSelection) return;
                      const all = sortedRows.every((r) =>
                        selection.has(rowKey(r)),
                      );
                      setInternalSelection(
                        all ? new Set() : new Set(sortedRows.map(rowKey)),
                      );
                    }}
                  />
                </TableHeadCell>
              ) : null}
              {visibleColumns.map((col) => (
                <TableHeadCell
                  key={col.id}
                  align={col.align}
                  style={col.width ? { width: col.width } : undefined}
                  sortable={Boolean(col.sortAccessor)}
                  sortDirection={sort?.id === col.id ? sort.direction : null}
                  onSort={() => handleSort(col)}
                >
                  {col.header}
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`loading-${i}`}>
                  {selectable ? <TableCell /> : null}
                  {visibleColumns.map((col) => (
                    <TableCell key={col.id}>
                      <SkeletonCell />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : sortedRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={(selectable ? 1 : 0) + visibleColumns.length}
                >
                  {empty ?? (
                    <div
                      style={{
                        padding: "var(--ease-spacing-6)",
                        textAlign: "center",
                        color: "var(--ease-color-text-muted)",
                        fontSize: "var(--ease-font-size-sm)",
                      }}
                    >
                      No rows to display.
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              sortedRows.map((row) => {
                const key = rowKey(row);
                const isSelected = selection.has(key);
                return (
                  <TableRow key={key} selected={isSelected}>
                    {selectable ? (
                      <TableCell>
                        <RowCheckbox
                          checked={isSelected}
                          indeterminate={!isSelected && selection.size > 0}
                          onChange={() => {
                            if (controlledSelection) {
                              const next = new Set(selection);
                              if (next.has(key)) next.delete(key);
                              else next.add(key);
                              onSelectionChange?.(next);
                            } else {
                              toggleRow(key);
                            }
                          }}
                          ariaLabel={`Select row ${key}`}
                        />
                      </TableCell>
                    ) : null}
                    {visibleColumns.map((col) => (
                      <TableCell key={col.id} align={col.align}>
                        {col.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </TableContext.Provider>
      </Table>
    </TableScroll>
  );
}

function RowCheckbox({
  checked,
  indeterminate,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
      data-ease="row-checkbox"
      style={{ accentColor: "var(--ease-color-primary)" }}
    />
  );
}

function CheckboxHeader({
  allSelected,
  someSelected,
  onToggleAll,
}: {
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = someSelected && !allSelected;
  }, [allSelected, someSelected]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={allSelected}
      onChange={onToggleAll}
      aria-label="Select all rows"
      data-ease="row-checkbox"
      style={{ accentColor: "var(--ease-color-primary)" }}
    />
  );
}

function SkeletonCell() {
  return (
    <div
      data-ease="skeleton"
      style={{
        height: 12,
        borderRadius: "var(--ease-radius-md)",
        background: "var(--ease-color-surface-subtle)",
      }}
    />
  );
}

export { TableContext };
