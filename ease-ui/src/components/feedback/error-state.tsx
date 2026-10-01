import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { Box } from "../foundations/box";
import { ErrorIcon } from "../../icons";

export interface ErrorStateProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title" | "description" | "action"
> {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
}

/**
 * Failure placeholder that explains what happened and offers a recovery path.
 * Use for page-level or panel-level errors; for a single field use <Field
 * error=...> instead.
 */
export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(
  function ErrorState(
    { title, description, action, icon, className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn("ease-error-state", className)}
        data-ease="error-state"
        role="alert"
        {...rest}
      >
        <span data-ease-error="icon">{icon ?? <ErrorIcon size={20} />}</span>
        <Box
          data-ease-error="title"
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
            data-ease-error="description"
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
        {action ? <span data-ease-error="action">{action}</span> : null}
      </div>
    );
  },
);

export type InlineErrorProps = HTMLAttributes<HTMLSpanElement>;

/** Small red inline message for compact error slots (not inside a Field). */
export const InlineError = forwardRef<HTMLSpanElement, InlineErrorProps>(
  function InlineError({ className, children, ...rest }, ref) {
    return (
      <span
        ref={ref}
        role="alert"
        className={cn("ease-inline-error", className)}
        data-ease="inline-error"
        {...rest}
      >
        {children}
      </span>
    );
  },
);
