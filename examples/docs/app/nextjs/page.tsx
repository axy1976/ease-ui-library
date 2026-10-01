import type { Metadata } from "next";
import {
  Stack,
  CodeBlock,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "ease-ui";
import { DocPage } from "@/components/demo-section";

export const metadata: Metadata = { title: "Next.js integration" };

const server = `// Server Component — no "use client" needed
import { Card, CardContent, Button } from "ease-ui";

export default function Page() {
  return (
    <Card>
      <CardContent>
        <Button>Save</Button>
      </CardContent>
    </Card>
  );
}`;

const client = `"use client";
import { useState } from "react";
import { Button } from "ease-ui";

export function DeployButton() {
  const [deploying, setDeploying] = useState(false);
  return (
    <Button variant="primary" loading={deploying} onClick={() => setDeploying(true)}>
      Deploy
    </Button>
  );
}`;

export default function NextJsPage() {
  return (
    <DocPage
      title="Next.js integration"
      description="Ease UI is built for the App Router. Static UI stays in Server Components; interactive behavior lives in clearly-marked Client Components."
    >
      <Stack gap={4}>
        <div>
          <h2>Server / client split</h2>
          <p>
            Each component decides its own boundary. A file only becomes a
            Client Component if it imports a client-only component (overlays,
            toast, theme, interactive form state).
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Stays a Server Component</CardTitle>
              <CardContent>
                Box, Stack, Grid, Card, Badge, Table, Page, Typography, and
                static <code>Button</code>.
              </CardContent>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Becomes a Client Component</CardTitle>
              <CardContent>
                Dialog, Drawer, Popover, Tooltip, Dropdown, CommandMenu, Toast,
                Tabs, interactive form controls, EaseProvider.
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div>
          <h2>Examples</h2>
          <div style={{ display: "grid", gap: "var(--ease-spacing-4)" }}>
            <div>
              <Badge status="neutral">Server Component</Badge>
              <CodeBlock language="tsx">{server}</CodeBlock>
            </div>
            <div>
              <Badge status="info">Client Component</Badge>
              <CodeBlock language="tsx">{client}</CodeBlock>
            </div>
          </div>
        </div>
        <div>
          <h2>Rules to keep in mind</h2>
          <ul style={{ color: "var(--ease-color-text-muted)" }}>
            <li>
              Never pass a <em>function</em> across the server→client boundary
              (e.g. a DataTable <code>cell: (row) =&gt; …</code>) — make the
              table a client component or compute cells server-side.
            </li>
            <li>
              Interactive components carry <code>"use client"</code> internally;
              you don't add it to the package root.
            </li>
            <li>
              <code>suppressHydrationWarning</code> on <code>&lt;html&gt;</code>{" "}
              avoids a flash when the theme resolves from storage.
            </li>
          </ul>
        </div>
      </Stack>
    </DocPage>
  );
}
