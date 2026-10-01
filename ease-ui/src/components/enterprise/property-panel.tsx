import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { KeyValue } from "../display/key-value";

export interface PropertyPanelProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title: ReactNode;
  children?: ReactNode;
}

/**
 * Bordered panel for a grouped set of properties. Pass <KeyValue> rows (or
 * arbitrary content) — the header and frame stay consistent across inspectors.
 */
export const PropertyPanel = forwardRef<HTMLDivElement, PropertyPanelProps>(
  function PropertyPanel({ title, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("ease-property-panel", className)}
        data-ease="property-panel"
        {...rest}
      >
        <div data-ease-property-panel="header">{title}</div>
        <div
          data-ease-property-panel="content"
          style={{ padding: "var(--ease-spacing-2) var(--ease-spacing-4)" }}
        >
          {children}
        </div>
      </div>
    );
  },
);

/** Convenience: render a list of key/value pairs inside a panel. */
export function PropertyPanelList({
  title,
  items,
}: {
  title: ReactNode;
  items: Array<{ label: ReactNode; value: ReactNode; mono?: boolean }>;
}) {
  return (
    <PropertyPanel title={title}>
      {items.map((item, i) => {
        const rowKey = `${String(item.label)}-${i}`;
        return (
          <KeyValue
            key={rowKey}
            key-content={item.label}
            value={item.value}
            mono={item.mono}
          />
        );
      })}
    </PropertyPanel>
  );
}
