import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import type { ChipTone } from "./chip";

export type MetadataLayout = "grid" | "list" | "inline";

export interface MetadataEntry {
  /** Key name — rendered as `<dt>`. */
  key: ReactNode;
  /** Value — rendered as `<dd>`. */
  value: ReactNode;
  /** Mark the value monospace. Useful for ids, arns, endpoint URLs. */
  mono?: boolean;
  /** Optional tone applied to the value chip. */
  tone?: ChipTone;
  /** Show a copy affordance next to the value. */
  copyable?: boolean;
}

export interface MetadataGridProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> {
  entries: MetadataEntry[];
  /**
   * `grid` (default) — responsive auto-fit grid for property panels.
   * `list` — stacked key above value, best for narrow / mobile.
   * `inline` — space-separated key:value pairs, for dense inline context.
   */
  layout?: MetadataLayout;
  /** Grid layout column width hint (defaults to minmax(160px, 1fr)). */
  columnWidth?: string;
  /** Optional leading heading rendered in an associated `<header>`. */
  title?: ReactNode;
}

/**
 * A dense, responsive description list for tags, environment variables,
 * resource metadata, and properties. Uses real `<dl>` / `<dt>` / `<dd>`
 * semantics so screen readers get the correct pairing for free.
 *
 * Denser than `KeyValueGrid` — intended for many short pairs. Use `KeyValueGrid`
 * when each row has a hint or needs a full-width description.
 */
export const MetadataGrid = forwardRef<HTMLDivElement, MetadataGridProps>(
  function MetadataGrid(
    { entries, layout = "grid", columnWidth, title, className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-ease="metadata-grid"
        data-layout={layout}
        className={cn("ease-metadata-grid", className)}
        style={
          columnWidth
            ? ({
                ["--ease-metadata-col" as string]: columnWidth,
              } as React.CSSProperties)
            : undefined
        }
        {...rest}
      >
        {title ? (
          <header data-ease-metadata-grid="header">
            <span>{title}</span>
          </header>
        ) : null}
        <dl data-ease-metadata-grid="list">
          {entries.map((entry, i) => (
            <div key={i} data-ease-metadata-grid="row">
              <dt data-ease-metadata-grid="key">{entry.key}</dt>
              <dd
                data-ease-metadata-grid="value"
                data-mono={entry.mono ? "true" : undefined}
                data-tone={entry.tone}
              >
                {entry.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  },
);
