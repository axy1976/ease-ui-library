"use client";

import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import type { StatusKind } from "../display/badge";
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  CloseIcon,
} from "../../icons";

const STATUS_ICON: Record<Exclude<StatusKind, "neutral">, typeof InfoIcon> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: ErrorIcon,
};

export interface AlertProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "status" | "title"
> {
  status?: StatusKind;
  title?: ReactNode;
  description?: ReactNode;
  /** Adds a close button; the alert unmounts itself after close. */
  dismissable?: boolean;
  onDismiss?: () => void;
}

/**
 * Inline callout for page-level or section-level messages. The status tints
 * the background and icon; the text always carries the meaning so color is
 * never the only channel.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    status = "info",
    title,
    description,
    dismissable,
    onDismiss,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;
  const Icon = STATUS_ICON[status === "neutral" ? "info" : status];

  return (
    <div
      ref={ref}
      className={cn("ease-alert", className)}
      role={status === "danger" ? "alert" : "status"}
      data-ease="alert"
      data-status={status}
      data-dismissable={dismissable ? "true" : undefined}
      {...rest}
    >
      <span data-ease-alert="icon">
        <Icon size={16} />
      </span>
      <div data-ease-alert="content">
        {title ? <div data-ease-alert="title">{title}</div> : null}
        {description || children ? (
          <div data-ease-alert="description">{description ?? children}</div>
        ) : null}
      </div>
      {dismissable ? (
        <button
          type="button"
          data-ease-alert="close"
          aria-label="Dismiss notification"
          onClick={() => {
            setClosed(true);
            onDismiss?.();
          }}
        >
          <CloseIcon size={14} />
        </button>
      ) : null}
    </div>
  );
});

/** Convenience presets so the common states read intentionally. */
export const InfoState = (p: AlertProps) => <Alert status="info" {...p} />;
export const SuccessState = (p: AlertProps) => (
  <Alert status="success" {...p} />
);
export const WarningState = (p: AlertProps) => (
  <Alert status="warning" {...p} />
);
export const DangerState = (p: AlertProps) => <Alert status="danger" {...p} />;
