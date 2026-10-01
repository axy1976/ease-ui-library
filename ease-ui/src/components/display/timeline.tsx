import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import type { StatusKind } from "./badge";

export interface TimelineItemProps extends Omit<
  HTMLAttributes<HTMLLIElement>,
  "title"
> {
  title: ReactNode;
  time?: ReactNode;
  status?: StatusKind;
  children?: ReactNode;
}

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  function TimelineItem({ title, time, status, children, ...rest }, ref) {
    return (
      <li
        ref={ref}
        data-ease-timeline="item"
        data-status={status === "neutral" ? undefined : status}
        {...rest}
      >
        <span
          data-ease-timeline="dot"
          style={
            status && status !== "neutral"
              ? { background: `var(--ease-color-${status})` }
              : undefined
          }
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flex: 1,
            minWidth: 0,
          }}
        >
          <strong
            style={{
              fontSize: "var(--ease-font-size-sm)",
              fontWeight: "var(--ease-font-weight-medium)",
            }}
          >
            {title}
          </strong>
          {children ? (
            <span
              style={{
                fontSize: "var(--ease-font-size-xs)",
                color: "var(--ease-color-text-muted)",
              }}
            >
              {children}
            </span>
          ) : null}
          {time ? (
            <time
              style={{
                fontSize: "var(--ease-font-size-xs)",
                color: "var(--ease-color-text-subtle)",
              }}
            >
              {time}
            </time>
          ) : null}
        </div>
      </li>
    );
  },
);

export type TimelineProps = HTMLAttributes<HTMLOListElement>;

/** Chronological event feed (deployments, audit trail, lifecycle). */
export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  function Timeline({ className, ...rest }, ref) {
    return (
      <ol
        ref={ref}
        className={cn("ease-timeline", className)}
        data-ease="timeline"
        {...rest}
      />
    );
  },
);
