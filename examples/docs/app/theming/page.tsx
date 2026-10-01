import type { Metadata } from "next";
import {
  Stack,
  CodeBlock,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "ease-ui";
import { DocPage } from "@/components/demo-section";

export const metadata: Metadata = { title: "Theming & tokens" };

const provider = `"use client";
import { EaseProvider, ThemeToggle } from "ease-ui";

export function ThemedApp({ children }: { children: React.ReactNode }) {
  return (
    <EaseProvider theme="system">
      <ThemeToggle />
      {children}
    </EaseProvider>
  );
}`;

const override = `/* Rebrand the library from CSS only — no source changes. */
.my-brand {
  --ease-color-primary: #7c3aed;
  --ease-color-primary-hover: #6d28d9;
  --ease-radius-md: 8px;
  --ease-control-height-md: 34px;
}`;

const tokenFamilies = [
  {
    title: "Color",
    body: "bg, surface, surface-subtle, border, border-strong, primary, success, warning, danger, info, text, text-muted, text-disabled.",
  },
  {
    title: "Typography",
    body: "font-family (sans + mono), font-size xs→2xl, line heights, weights, letter spacing.",
  },
  {
    title: "Spacing",
    body: "A 4px-based scale: spacing-1 through spacing-10.",
  },
  {
    title: "Radius",
    body: "radius-sm, radius-md, radius-lg — deliberately restrained.",
  },
  {
    title: "Elevation & focus",
    body: "shadow-sm/md/lg, focus-ring, hover, and subtle state surfaces.",
  },
  {
    title: "Motion",
    body: "duration-instant/fast/normal/slow + easing; disabled under prefers-reduced-motion.",
  },
];

export default function ThemingPage() {
  return (
    <DocPage
      title="Theming & tokens"
      description="Two themes (light, dark) plus a system option, all driven by CSS custom properties. The provider is optional — the CSS does the real work."
    >
      <Stack gap={4}>
        <div>
          <h2>Programmatic themes</h2>
          <p>
            <code>theme="light" | "dark" | "system"</code>. The choice is
            persisted to <code>localStorage</code> and the current value lands
            on <code>&lt;html data-ease-theme&gt;</code>. This is a client
            helper.
          </p>
          <CodeBlock language="tsx">{provider}</CodeBlock>
        </div>
        <div>
          <h2>Rebrand with tokens</h2>
          <p>
            Override any token on a scoped class to create a branded app while
            clearly still using Ease UI.
          </p>
          <CodeBlock language="css">{override}</CodeBlock>
        </div>
        <div>
          <h2>Token families</h2>
          <Grid gap={3}>
            {tokenFamilies.map((t) => (
              <Card key={t.title}>
                <CardHeader>
                  <CardTitle>{t.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "var(--ease-font-size-sm)",
                      color: "var(--ease-color-text-muted)",
                    }}
                  >
                    {t.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </div>
      </Stack>
    </DocPage>
  );
}
