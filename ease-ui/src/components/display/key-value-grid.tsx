import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export type KeyValLayout = "stack" | "grid" | "inline";
export type KeyValAlign = "start" | "center" | "end";

export interface KeyValueRow {
  key: ReactNode;
  value: ReactNode;
  /** Optional helper text under the value. */
  hint?: ReactNode;
  /** Optional copy affordance on the value. */
  copyable?: boolean;
}

export interface KeyValueProps extends Omit<
  HTMLAttributes<HTMLDListElement>,
  "align"
> {
  rows: KeyValueRow[];
  /**
   * `grid` (default) is a two-column description list; `stack` is a
   * vertical list for mobile; `inline` is a compact horizontal run.
   */
  layout?: KeyValLayout;
  /** Align the value column. Default `end` for a property-panel look. */
  valueAlign?: KeyValAlign;
  /** Column width (grid layout) in CSS units. */
  keyWidth?: string;
}

/**
 * A description list for properties, metadata, and settings. The default
 * two-column layout mirrors what you'd see in a cloud console property
 * panel — key on the left, value on the right, with an optional hint below
 * the value.
 *
 * Uses a real `<dl>` / `<dt>` / `<dd>` so it reads correctly to screen
 * readers without any ARIA scaffolding.
 */
export const KeyValue = forwardRef<HTMLDListElement, KeyValueProps>(
  function KeyValue(
    { rows, layout = "grid", valueAlign = "end", keyWidth, className, ...rest },
    ref,
  ) {
    return (
      <dl
        ref={ref}
        data-ease="key-value"
        data-layout={layout}
        data-value-align={valueAlign}
        className={cn("ease-key-value", className)}
        style={
          keyWidth
            ? ({
                ["--ease-key-value-key-width" as string]: keyWidth,
              } as React.CSSProperties)
            : undefined
        }
        {...rest}
      >
        {rows.map((row, i) => (
          <div key={i} data-ease-key-value="row">
            <dt data-ease-key-value="key">{row.key}</dt>
            <dd data-ease-key-value="value">
              <span data-ease-key-value="value-text">{row.value}</span>
              {row.copyable ? (
                <button
                  type="button"
                  data-ease-key-value="copy"
                  aria-label={`Copy ${typeof row.key === "string" ? row.key : "value"}`}
                >
                  ⧉
                </button>
              ) : null}
              {row.hint ? (
                <span data-ease-key-value="hint">{row.hint}</span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    );
  },
);
