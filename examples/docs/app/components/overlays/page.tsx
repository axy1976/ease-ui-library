"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Stack,
  Badge,
  Grid,
} from "ease-ui";
import { Demo } from "@/components/demo";
import { DocPage } from "@/components/demo-section";

function DemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function OverlaysPage() {
  return (
    <DocPage
      title="Overlays"
      description="Dialog, Drawer, Popover, Tooltip, Dropdown, Command, and Confirm — all client-only. Every overlay traps focus, closes on Escape, locks body scroll, portals to the document, and returns focus to its trigger."
    >
      <Stack gap={3}>
        <DemoCard
          title="Dialog"
          description="Modal. Focus trapped, Escape closes, backdrop dismiss."
        >
          <Demo kind="dialog" />
        </DemoCard>
        <DemoCard
          title="Drawer"
          description="Edge-anchored panel for inspectors and filters."
        >
          <Demo kind="drawer" />
        </DemoCard>
        <DemoCard
          title="Popover"
          description="Anchored panel toggled from a trigger; focus-trapped while open."
        >
          <Demo
            kind="popover"
            trigger={
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--ease-spacing-2)",
                  border: "1px solid var(--ease-color-border-strong)",
                  borderRadius: "var(--ease-radius-md)",
                  padding: "var(--ease-spacing-2) var(--ease-spacing-3)",
                  cursor: "pointer",
                  fontSize: "var(--ease-font-size-sm)",
                }}
              >
                Click me ▾
              </span>
            }
          >
            <div
              style={{ fontSize: "var(--ease-font-size-sm)", maxWidth: 220 }}
            >
              A small anchored panel. Click outside or press Escape to close.
            </div>
          </Demo>
        </DemoCard>
        <DemoCard
          title="Tooltip"
          description="Supplemental info on hover/focus. Never the only channel for essential info."
        >
          <Demo
            kind="tooltip"
            content="Deploys to us-east-1"
            children={
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--ease-spacing-2)",
                  border: "1px solid var(--ease-color-border-strong)",
                  borderRadius: "var(--ease-radius-md)",
                  padding: "var(--ease-spacing-2) var(--ease-spacing-3)",
                  cursor: "pointer",
                  fontSize: "var(--ease-font-size-sm)",
                }}
              >
                Hover or focus
              </span>
            }
          />
        </DemoCard>
        <DemoCard
          title="Dropdown menu"
          description="Roving-focus keyboard menu."
        >
          <Demo kind="dropdown-menu" />
        </DemoCard>
        <DemoCard
          title="Command menu"
          description="⌘K-style palette with search and arrow navigation."
        >
          <Demo kind="command-menu" />
        </DemoCard>
        <DemoCard
          title="Confirm dialog"
          description="Pre-wired destructive confirm with a loading state."
        >
          <Demo kind="confirm-dialog" />
        </DemoCard>
      </Stack>
    </DocPage>
  );
}
