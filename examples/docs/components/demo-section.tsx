import type { ReactNode } from "react";
import { Card, CardContent, Stack, Badge } from "ease-ui";

/**
 * A documented component section: name, optional status badge, description,
 * a live preview box, and an optional code sample. Kept deliberately simple so
 * every page shares identical structure and rhythm.
 */
export function DemoSection({
  title,
  note,
  status,
  children,
}: {
  title: string;
  note?: string;
  status?: "client" | "server";
  children: ReactNode;
}) {
  return (
    <section
      style={{ marginBottom: "var(--ease-spacing-8)" }}
      aria-labelledby={`h-${title}`}
    >
      <Stack gap={3}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--ease-spacing-2)",
            flexWrap: "wrap",
          }}
        >
          <h3
            id={`h-${title}`}
            style={{
              margin: 0,
              fontSize: "var(--ease-font-size-md)",
              fontWeight: 600,
              color: "var(--ease-color-text)",
            }}
          >
            {title}
          </h3>
          {status ? (
            <Badge status={status === "client" ? "info" : "neutral"}>
              {status === "client" ? "Client" : "Server"}
            </Badge>
          ) : null}
        </div>
        {note ? (
          <p
            style={{
              margin: 0,
              fontSize: "var(--ease-font-size-sm)",
              color: "var(--ease-color-text-muted)",
            }}
          >
            {note}
          </p>
        ) : null}
        <div
          style={{
            border: "1px solid var(--ease-color-border)",
            borderRadius: "var(--ease-radius-md)",
            background: "var(--ease-color-bg)",
            padding: "var(--ease-spacing-4)",
          }}
        >
          {children}
        </div>
      </Stack>
    </section>
  );
}

/** Full-page documentation layout: title + description + content, max width. */
export function DocPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="ease-docs-prose"
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "var(--ease-spacing-6)",
      }}
    >
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
      {children}
    </div>
  );
}

/** A live demo wrapped in a card, for use inside a grid of examples. */
export function ExampleCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardContent>
        <div
          style={{
            fontSize: "var(--ease-font-size-sm)",
            fontWeight: 500,
            color: "var(--ease-color-text-muted)",
            marginBottom: "var(--ease-spacing-2)",
          }}
        >
          {title}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
