import { type HTMLAttributes, type ReactNode } from "react";
import { Spinner } from "./spinner";

export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  children?: ReactNode;
}

/**
 * Covers a positioned ancestor (a Card, a panel, a page) with a scrim +
 * spinner while content reloads in place. The parent must be `position:
 * relative`.
 */
export function LoadingOverlay({
  label,
  className,
  children,
  ...rest
}: LoadingOverlayProps) {
  return (
    <div
      className={className}
      data-ease="loading-overlay"
      role="status"
      aria-live="polite"
      {...rest}
    >
      <span
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--ease-spacing-2)",
          color: "var(--ease-color-text-muted)",
        }}
      >
        <Spinner size="lg" />
        {label ? (
          <span style={{ fontSize: "var(--ease-font-size-xs)" }}>{label}</span>
        ) : null}
      </span>
      {children}
    </div>
  );
}
