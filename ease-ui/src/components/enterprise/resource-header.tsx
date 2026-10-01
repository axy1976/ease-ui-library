"use client";

import {
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import { Status } from "../display/status";
import type { StatusKind } from "../display/badge";
import { CopyIcon } from "../../icons";
import { IconButton } from "../button/icon-button";

export interface ResourceHeaderProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  /** Stable identifier (id, arn, slug). */
  id?: string;
  status?: { kind: StatusKind; label: string; pulse?: boolean };
  /** Extra badges / tags (region, environment). */
  meta?: ReactNode;
  actions?: ReactNode;
}

/**
 * Identity block for a resource detail page: name, copyable id, status,
 * metadata, and primary actions in one consistent header.
 */
export function ResourceHeader({
  name,
  id,
  status,
  meta,
  actions,
  className,
  ...rest
}: ResourceHeaderProps) {
  return (
    <div
      className={cn("ease-resource-header", className)}
      data-ease="resource-header"
      {...rest}
    >
      <div data-ease-resource-header="identity">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ease-spacing-2)",
              flexWrap: "wrap",
            }}
          >
            <span data-ease-resource-header="name">{name}</span>
            {status ? (
              <Status status={status.kind} pulse={status.pulse}>
                {status.label}
              </Status>
            ) : null}
          </div>
          {id ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--ease-spacing-1)",
              }}
            >
              <span data-ease-resource-header="id">{id}</span>
              <CopyIconButton text={id} label={`Copy ${name} id`} />
            </span>
          ) : null}
        </div>
      </div>
      {meta ? <div data-ease-resource-header="meta">{meta}</div> : null}
      {actions ? (
        <div data-ease-resource-header="actions">{actions}</div>
      ) : null}
    </div>
  );
}

function CopyIconButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);
  return (
    <IconButton
      size="xs"
      aria-label={label}
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        setCopied(true);
      }}
    >
      {copied ? (
        <span style={{ fontSize: 10, color: "var(--ease-color-success)" }}>
          Copied
        </span>
      ) : (
        <CopyIcon size={13} />
      )}
    </IconButton>
  );
}
