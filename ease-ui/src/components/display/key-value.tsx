import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface KeyValueProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "key"
> {
  /** The term. Named `key-content` because React reserves `key`. */
  "key-content": ReactNode;
  value: ReactNode;
  /** Monospace values (ids, hashes, ARNs). */
  mono?: boolean;
}

/** One row of a property list. Use inside a Stack for a clean KV grid. */
export const KeyValue = forwardRef<HTMLDivElement, KeyValueProps>(
  function KeyValue(
    { "key-content": keyContent, value, mono, className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn("ease-key-value", className)}
        data-ease="key-value"
        {...rest}
      >
        <span data-ease-kv="key">{keyContent}</span>
        <span
          data-ease-kv="value"
          style={
            mono
              ? {
                  fontFamily: "var(--ease-font-family-mono)",
                  fontSize: "var(--ease-font-size-xs)",
                }
              : undefined
          }
        >
          {value}
        </span>
      </div>
    );
  },
);

/**
 * Semantic <dl> for structured properties. Pairs naturally with
 * DescriptionList for longer documents.
 */
export function DescriptionList({
  items,
  className,
}: {
  items: Array<{ term: ReactNode; detail: ReactNode }>;
  className?: string;
}) {
  return (
    <dl
      className={cn("ease-description-list", className)}
      data-ease="description-list"
    >
      {items.map((item, i) => (
        <div key={i} style={{ display: "contents" }}>
          <dt>{item.term}</dt>
          <dd>{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
