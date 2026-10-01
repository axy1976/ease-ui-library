import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { Status } from "./status";
import type { StatusKind } from "./badge";

export interface ResourceCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Human-readable name of the resource. */
  name: string;
  /** Optional type/label (e.g. "EC2 Instance", "S3 Bucket"). */
  type?: ReactNode;
  /** Optional leading icon (custom SVG or a library icon). */
  icon?: ReactNode;
  /** Current status; renders a Status dot + label. */
  status?: { kind: StatusKind; label: string; pulse?: boolean };
  /** Secondary metadata lines (region, id, age, owner). */
  meta?: ReactNode;
  /** Right-aligned footer actions (e.g. detail / menu). */
  footer?: ReactNode;
  /** Extra classes/attributes spread onto the footer actions container. */
  footerClassName?: string;
}

/**
 * A single-tile card for one resource: icon + name + status, a small metadata
 * block, and optional footer actions. Pairs with `ResourceHeader` (detail)
 * and `MetricRow` / `StatTile` (KPI tiles) for the full resource vocabulary.
 *
 * For navigation, wrap in a link from the consumer; the card itself stays a
 * presentational div so it composes cleanly inside grids, cards, and tables.
 */
export const ResourceCard = forwardRef<HTMLDivElement, ResourceCardProps>(
  function ResourceCard(
    {
      name,
      type,
      icon,
      status,
      meta,
      footer,
      footerClassName,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn("ease-resource-card", className)}
        data-ease="resource-card"
        {...rest}
      >
        <div data-ease-resource-card="top">
          {icon ? (
            <span data-ease-resource-card="icon" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <div data-ease-resource-card="identity" style={{ minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--ease-spacing-2)",
                flexWrap: "wrap",
              }}
            >
              <span data-ease-resource-card="name">{name}</span>
              {status ? (
                <Status
                  status={status.kind}
                  pulse={status.pulse}
                  style={{ fontSize: "var(--ease-font-size-xs)" }}
                >
                  {status.label}
                </Status>
              ) : null}
            </div>
            {type ? <span data-ease-resource-card="type">{type}</span> : null}
          </div>
        </div>
        {meta ? <div data-ease-resource-card="meta">{meta}</div> : null}
        {footer ? (
          <div data-ease-resource-card="footer" className={footerClassName}>
            {footer}
          </div>
        ) : null}
      </div>
    );
  },
);
