"use client";
import {
  Stack,
  CodeBlock,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "ease-ui";
import { DocPage } from "@/components/demo-section";

const maps = [
  {
    from: "CustomButton / PrimaryButton / DashboardButton",
    to: "Button with variant + size",
    note: "One composable Button replaces every fork.",
  },
  {
    from: "CustomInput / TextField",
    to: "Input (inside <Field>)",
    note: "Field handles label, description, error, ARIA.",
  },
  {
    from: "CustomModal / Lightbox",
    to: "Dialog (+ DialogHeader/Title/Body/Footer)",
    note: "Focus trap, Escape, scroll lock, portal built in.",
  },
  {
    from: "SidePanel / Inspector",
    to: "Drawer",
    note: "Same overlay contract, anchored to an edge.",
  },
  {
    from: "Dropdown / ActionMenu",
    to: "DropdownMenu (+ MenuItem)",
    note: "Roving-focus keyboard menu.",
  },
  {
    from: "DataGrid / react-table wrapper",
    to: "DataTable (columns + rows)",
    note: "Sorting, selection, loading, empty, no dependency.",
  },
  {
    from: "CustomCard / Panel",
    to: "Card (+ Header/Title/Description/Content/Footer)",
    note: "Structural, composable.",
  },
  {
    from: "CustomBadge / StatusPill",
    to: "Badge / Status (shared status vocabulary)",
    note: "Same status reads the same everywhere.",
  },
  {
    from: "ToastManager / Notifications",
    to: "ToastProvider + useToast",
    note: "toast.success(...) / toast.error(...).",
  },
];

export default function MigrationPage() {
  return (
    <DocPage
      title="Migration guide"
      description="Replace duplicated project-level components with their Ease UI equivalents. The goal is one implementation per concept, themed by tokens."
    >
      <Stack gap={4}>
        <div>
          <h2>Common mappings</h2>
          <Card>
            <CardContent>
              <div style={{ display: "grid", gap: "var(--ease-spacing-4)" }}>
                {maps.map((m) => (
                  <div
                    key={m.from}
                    style={{
                      display: "grid",
                      gap: 4,
                      paddingBottom: "var(--ease-spacing-3)",
                      borderBottom: "1px solid var(--ease-color-border)",
                    }}
                  >
                    <code style={{ fontSize: "var(--ease-font-size-xs)" }}>
                      {m.from}
                    </code>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--ease-spacing-2)",
                        fontSize: "var(--ease-font-size-sm)",
                      }}
                    >
                      <span aria-hidden="true">↓</span>
                      <strong style={{ color: "var(--ease-color-text)" }}>
                        {m.to}
                      </strong>
                    </div>
                    <div
                      style={{
                        fontSize: "var(--ease-font-size-sm)",
                        color: "var(--ease-color-text-muted)",
                      }}
                    >
                      {m.note}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <h2>How to migrate a component</h2>
          <ol style={{ color: "var(--ease-color-text-muted)" }}>
            <li>Sweep the app for local copies (search for your old name).</li>
            <li>Import the Ease UI component and swap the tag.</li>
            <li>
              Move bespoke visuals onto CSS tokens rather than hardcoded styles.
            </li>
            <li>
              Keep any truly domain-specific logic in a thin wrapper that
              composes the Ease UI primitive.
            </li>
            <li>Delete the old local component once nothing references it.</li>
          </ol>
          <CodeBlock language="tsx">{`// Before: 6 bespoke buttons
// After: one component, six variants
import { Button } from "ease-ui";
<Button variant="primary">Save</Button>`}</CodeBlock>
        </div>
      </Stack>
    </DocPage>
  );
}
