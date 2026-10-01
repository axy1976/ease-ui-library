"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { Chip } from "../display/chip";
import type { ChipTone } from "../display/chip";
import { SearchInput } from "../forms/search-input";

export interface ActionBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Left side: selection summary or context ("3 resources selected"). */
  info?: ReactNode;
  children?: ReactNode;
}

/**
 * Contextual action strip that appears over a list (e.g. when rows are
 * selected, or above a filtered table): summary on the left, actions on the
 * right.
 */
export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  function ActionBar({ info, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("ease-action-bar", className)}
        data-ease="action-bar"
        {...rest}
      >
        {info ? <span data-ease-action-bar="info">{info}</span> : null}
        {children ? (
          <span data-ease-action-bar="actions">{children}</span>
        ) : null}
      </div>
    );
  },
);

export interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * `plain` (default) — a bare row of filter controls (search, selects,
   * toggles). Use when the active filters are rendered elsewhere or are
   * self-evident.
   *
   * `chips` — a structured filter bar that shows a leading label, a search
   * input, and a row of removable `FilterChip`s for active filters, plus an
   * optional "Clear all" button. Use for the AWS-style filter toolbar where
   * each applied filter is visible and removable.
   */
  variant?: "plain" | "chips";
  /** Leading label (chips variant). e.g. "Filters" or "2 active". */
  label?: ReactNode;
  /**
   * Active filters shown as removable chips. Each chip has a label and an
   * `onRemove` callback. Only rendered in the `chips` variant.
   */
  activeFilters?: Array<{
    id: string;
    label: string;
    tone?: ChipTone;
    onRemove: () => void;
  }>;
  /** "Clear all filters" action. Only rendered in the `chips` variant and only
   * when at least one filter is active. */
  onClearAll?: () => void;
  /**
   * Search input for the `chips` variant. Rendered when `showSearch` is
   * true (default). Omit by passing `showSearch={false}` or providing your
   * own search inside `children`.
   */
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
  /** Optional trailing action node (e.g. "Save filter" dropdown). */
  trailing?: ReactNode;
}

/**
 * Row of filter controls above a table. Two variants:
 *
 * - `plain` — a bare horizontal row of your own filter controls.
 * - `chips` — a structured bar with a label, a search input, removable
 *   filter chips, and an optional "Clear all" button.
 *
 * Both variants share the same layout (leading / middle / trailing) and the
 * same spacing tokens.
 */
export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  function FilterBar(
    {
      variant = "plain",
      label,
      activeFilters,
      onClearAll,
      showSearch = true,
      searchPlaceholder = "Filter…",
      onSearch,
      searchValue,
      trailing,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    if (variant === "chips") {
      const hasFilters = (activeFilters?.length ?? 0) > 0;
      return (
        <div
          ref={ref}
          className={cn("ease-filter-bar", className)}
          data-ease="filter-bar"
          data-variant="chips"
          data-has-filters={hasFilters ? "true" : undefined}
          {...rest}
        >
          {label ? <span data-ease-filter-bar="label">{label}</span> : null}
          {showSearch ? (
            <SearchInput
              value={searchValue}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder={searchPlaceholder}
              data-ease-filter-bar="search"
              style={{ flex: "1 1 220px", minWidth: 0 }}
            />
          ) : null}
          {hasFilters ? (
            <div
              data-ease-filter-bar="chips"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--ease-spacing-2)",
                flex: "1 1 auto",
                minWidth: 0,
              }}
            >
              {activeFilters!.map((f) => (
                <FilterChip
                  key={f.id}
                  label={f.label}
                  tone={f.tone}
                  onRemove={f.onRemove}
                />
              ))}
            </div>
          ) : null}
          {hasFilters && onClearAll ? (
            <FilterBarClear onClick={onClearAll} />
          ) : null}
          {trailing ? (
            <span data-ease-filter-bar="trailing">{trailing}</span>
          ) : null}
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("ease-filter-bar", className)}
        data-ease="filter-bar"
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export interface FilterChipProps {
  label: string;
  tone?: ChipTone;
  onRemove: () => void;
  /** Accessible name for the remove button (defaults to "Remove {label}"). */
  removeLabel?: string;
  className?: string;
}

/**
 * A single active filter with a remove affordance. Use inside `FilterBar`
 * with `variant="chips"` or in any toolbar where applied filters should be
 * visible and removable.
 *
 * Internally composes the library's `Chip` (with `onRemove`) so the look and
 * behavior stay consistent with other chip uses.
 */
export const FilterChip = forwardRef<HTMLSpanElement, FilterChipProps>(
  function FilterChip(
    { label, tone = "info", onRemove, removeLabel: _rl, className, ...rest },
    ref,
  ) {
    return (
      <Chip
        ref={ref}
        tone={tone}
        variant="soft"
        onRemove={onRemove}
        className={cn("ease-filter-chip", className)}
        data-ease="filter-chip"
        {...rest}
      >
        {label}
      </Chip>
    );
  },
);

export interface FilterBarClearProps {
  onClick: () => void;
  label?: string;
}

/** A small "Clear all" text button used in the `chips` FilterBar variant. */
export function FilterBarClear({
  onClick,
  label = "Clear all",
  ...rest
}: FilterBarClearProps) {
  return (
    <button
      type="button"
      data-ease-filter-bar="clear"
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  );
}
