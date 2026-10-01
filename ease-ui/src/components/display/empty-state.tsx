import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { Box } from "../foundations/box";

export interface EmptyStateProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title" | "description" | "action"
> {
  /** What is empty ("No deployments"). */
  title: string;
  /** Why it matters / what the user can do. */
  description?: ReactNode;
  /** Optional affordances (a Button, a Link). */
  action?: ReactNode;
  icon?: ReactNode;
}

/**
 * A calm, explanatory placeholder for empty collections. Every empty state
 * in the app should use this so "nothing here" never looks like a bug.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    { title, description, action, icon, className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn("ease-empty-state", className)}
        data-ease="empty-state"
        role="status"
        {...rest}
      >
        {icon ? <span data-ease-empty="icon">{icon}</span> : null}
        <Box
          data-ease-empty="title"
          as="p"
          style={{
            fontSize: "var(--ease-font-size-md)",
            fontWeight: "var(--ease-font-weight-semibold)",
            margin: 0,
          }}
        >
          {title}
        </Box>
        {description ? (
          <Box
            data-ease-empty="description"
            as="p"
            style={{
              fontSize: "var(--ease-font-size-sm)",
              color: "var(--ease-color-text-muted)",
              maxWidth: "28rem",
              margin: 0,
            }}
          >
            {description}
          </Box>
        ) : null}
        {action ? <span data-ease-empty="action">{action}</span> : null}
      </div>
    );
  },
);
