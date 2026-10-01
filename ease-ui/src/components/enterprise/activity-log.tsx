import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { Status } from "../display/status";
import type { StatusKind } from "../display/badge";

export interface ActivityEntry {
  id: string;
  title: ReactNode;
  time: ReactNode;
  status?: StatusKind;
  detail?: ReactNode;
}

export interface ActivityLogProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title?: ReactNode;
  entries: ActivityEntry[];
}

/**
 * Timestamped event feed (deployments, audit trail, lifecycle changes).
 * Newest first; each entry carries an optional status dot for a quick scan.
 */
export const ActivityLog = forwardRef<HTMLDivElement, ActivityLogProps>(
  function ActivityLog(
    { title = "Activity", entries, className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn("ease-activity-log", className)}
        data-ease="activity-log"
        {...rest}
      >
        <div data-ease-activity-log="header">{title}</div>
        <ul data-ease-activity-log="list">
          {entries.map((entry) => (
            <li key={entry.id} data-ease-activity-log="entry">
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--ease-spacing-2)",
                  }}
                >
                  {entry.status ? (
                    <Status status={entry.status}>{""}</Status>
                  ) : null}
                  <strong
                    style={{
                      fontSize: "var(--ease-font-size-sm)",
                      fontWeight: "var(--ease-font-weight-medium)",
                    }}
                  >
                    {entry.title}
                  </strong>
                </span>
                {entry.detail ? (
                  <span
                    style={{
                      fontSize: "var(--ease-font-size-xs)",
                      color: "var(--ease-color-text-muted)",
                    }}
                  >
                    {entry.detail}
                  </span>
                ) : null}
              </span>
              <time data-ease-activity-log="time">{entry.time}</time>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
