"use client";
import Link from "next/link";
import {
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Stack,
  Badge,
} from "ease-ui";
import { PlusIcon, SettingsIcon } from "ease-ui/icons";
import { docsSections } from "@/lib/nav";

const pillars = [
  {
    title: "Precise, not decorative",
    body: "Subtle borders, controlled elevation, tight spacing. No gradients, glassmorphism, or oversized cards.",
  },
  {
    title: "Information-dense",
    body: "Compact controls and readable tables tuned for admin dashboards and cloud tools.",
  },
  {
    title: "Accessible by default",
    body: "Keyboard nav, focus traps, Escape, reduced-motion, and states that never rely on color alone.",
  },
  {
    title: "Lightweight",
    body: "Zero runtime dependencies. Static CSS + tokens, full tree-shaking, tiny per-component chunks.",
  },
];

export default function IndexPage() {
  return (
    <div
      className="ease-docs-prose"
      style={{
        maxWidth: 1040,
        margin: "0 auto",
        padding: "var(--ease-spacing-6)",
      }}
    >
      <Stack gap={4}>
        <Badge status="info">v0.1.0</Badge>
        <h1>Ease UI</h1>
        <p style={{ maxWidth: "60ch" }}>
          A lightweight, token-driven, accessible React UI library for Next.js.
          Ease UI gives you the precision, density, and restraint of
          cloud-infrastructure software — without the weight of a heavyweight UI
          framework.
        </p>
        <div
          style={{
            display: "flex",
            gap: "var(--ease-spacing-2)",
            flexWrap: "wrap",
          }}
        >
          <Button variant="primary" icon={<PlusIcon size={16} />}>
            <Link
              href="/installation"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Get started
            </Link>
          </Button>
          <Button variant="secondary" icon={<SettingsIcon size={16} />}>
            <Link
              href="/components/buttons"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Browse components
            </Link>
          </Button>
        </div>
      </Stack>

      <h2>Why Ease UI</h2>
      <Grid gap={4}>
        {pillars.map((p) => (
          <Card key={p.title}>
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                style={{
                  margin: 0,
                  color: "var(--ease-color-text-muted)",
                  fontSize: "var(--ease-font-size-sm)",
                }}
              >
                {p.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </Grid>

      <h2>Explore</h2>
      <Grid gap={4}>
        {docsSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.items.length} pages</CardDescription>
            </CardHeader>
            <CardContent>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  display: "grid",
                  gap: "0.4rem",
                }}
              >
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </Grid>

      <Card>
        <CardHeader>
          <CardTitle>Quick start</CardTitle>
        </CardHeader>
        <CardContent>
          <pre
            style={{
              margin: 0,
              fontSize: "var(--ease-font-size-xs)",
              overflowX: "auto",
            }}
          >
            {`npm install ease-ui`}
          </pre>
          <p style={{ marginTop: "var(--ease-spacing-3)" }}>
            Import the stylesheet once, then pull only the components you need.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
