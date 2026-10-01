"use client";
import {
  Stack,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "ease-ui";
import { DocPage } from "@/components/demo-section";

const items = [
  {
    title: "Semantic HTML",
    body: "button, nav, main, table, dialog, fieldset, label, dl — used where they exist, with div only as a structural fallback.",
  },
  {
    title: "Keyboard",
    body: "Every interactive control is operable by keyboard. Tabs use roving tabindex with Arrow/Home/End; menus move with arrows.",
  },
  {
    title: "Focus management",
    body: "Overlays trap focus while open, close on Escape, and return focus to the trigger on close.",
  },
  {
    title: "Focus visibility",
    body: "A single, consistent focus ring (--ease-focus-ring) is applied to every focusable control.",
  },
  {
    title: "Status is not color-only",
    body: "Status pairs a color dot with text/icons so meaning survives for low-vision and color-blind users.",
  },
  {
    title: "Icons are named",
    body: "IconButton and icon-only Button require an accessible name; a dev warning fires if one is missing.",
  },
  {
    title: "Reduced motion",
    body: "Animations collapse under @media (prefers-reduced-motion: reduce).",
  },
  {
    title: "Disabled & invalid states",
    body: "Disabled controls are inert and labelled; invalid fields expose aria-invalid and link to the error message.",
  },
];

export default function AccessibilityPage() {
  return (
    <DocPage
      title="Accessibility"
      description="WCAG-oriented practices are the default, not an opt-in. Ease UI targets WCAG 2.1 AA for the common paths."
    >
      <Stack gap={4}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ease-spacing-2)",
              marginBottom: "var(--ease-spacing-3)",
            }}
          >
            <h2 style={{ margin: 0 }}>What is built in</h2>
            <Badge status="success">Ships by default</Badge>
          </div>
          <Card>
            <CardContent>
              <div style={{ display: "grid", gap: "var(--ease-spacing-3)" }}>
                {items.map((it) => (
                  <div key={it.title}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "var(--ease-font-size-sm)",
                        color: "var(--ease-color-text)",
                      }}
                    >
                      {it.title}
                    </div>
                    <div
                      style={{
                        fontSize: "var(--ease-font-size-sm)",
                        color: "var(--ease-color-text-muted)",
                      }}
                    >
                      {it.body}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <h2>Manual QA checklist</h2>
          <ul style={{ color: "var(--ease-color-text-muted)" }}>
            <li>
              Tab through a form and an overlay; confirm focus moves logically
              and is always visible.
            </li>
            <li>
              Open a dialog, then press Escape — focus should return to the
              trigger.
            </li>
            <li>
              Use a screen reader on a table with sortable and selectable rows.
            </li>
            <li>
              Toggle dark mode; confirm status colors keep sufficient contrast.
            </li>
            <li>
              Enable reduce-motion in the OS; confirm transitions are
              suppressed.
            </li>
          </ul>
        </div>
      </Stack>
    </DocPage>
  );
}
