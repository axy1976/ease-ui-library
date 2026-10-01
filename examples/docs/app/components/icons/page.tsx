"use client";
import type { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Stack,
  Grid,
  Badge,
  Icon,
  SearchIcon,
  PlusIcon,
  CheckIcon,
  ChevronDownIcon,
  TrashIcon,
  EditIcon,
  CopyIcon,
  RefreshIcon,
  InfoIcon,
  WarningIcon,
  ErrorIcon,
  SuccessIcon,
  MenuIcon,
  SettingsIcon,
  FilterIcon,
  DownloadIcon,
  UploadIcon,
} from "ease-ui";
import { DocPage } from "@/components/demo-section";

const set: Array<{ name: string; Cmp: ReactNode }> = [
  { name: "SearchIcon", Cmp: <SearchIcon size={20} /> },
  { name: "PlusIcon", Cmp: <PlusIcon size={20} /> },
  { name: "CheckIcon", Cmp: <CheckIcon size={20} /> },
  { name: "ChevronDownIcon", Cmp: <ChevronDownIcon size={20} /> },
  { name: "TrashIcon", Cmp: <TrashIcon size={20} /> },
  { name: "EditIcon", Cmp: <EditIcon size={20} /> },
  { name: "CopyIcon", Cmp: <CopyIcon size={20} /> },
  { name: "RefreshIcon", Cmp: <RefreshIcon size={20} /> },
  { name: "InfoIcon", Cmp: <InfoIcon size={20} /> },
  { name: "WarningIcon", Cmp: <WarningIcon size={20} /> },
  { name: "ErrorIcon", Cmp: <ErrorIcon size={20} /> },
  { name: "SuccessIcon", Cmp: <SuccessIcon size={20} /> },
  { name: "MenuIcon", Cmp: <MenuIcon size={20} /> },
  { name: "SettingsIcon", Cmp: <SettingsIcon size={20} /> },
  { name: "FilterIcon", Cmp: <FilterIcon size={20} /> },
  { name: "DownloadIcon", Cmp: <DownloadIcon size={20} /> },
  { name: "UploadIcon", Cmp: <UploadIcon size={20} /> },
];

export default function IconsPage() {
  return (
    <DocPage
      title="Icons"
      description="A small, inline-SVG icon set. Each icon is a standalone component so unused glyphs tree-shake. Import the specific icon you need; fall back to <Icon name> for dynamic cases."
    >
      <Stack gap={3}>
        <Card>
          <CardHeader>
            <CardTitle>The set</CardTitle>
            <CardDescription>
              <Badge status="info">~20 icons</Badge> Deliberately minimal —
              don't pull in a huge icon library by default.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Grid gap={3} columns={6}>
              {set.map((it) => (
                <div
                  key={it.name}
                  style={{
                    display: "grid",
                    placeItems: "center",
                    gap: "var(--ease-spacing-2)",
                    border: "1px solid var(--ease-color-border)",
                    borderRadius: "var(--ease-radius-md)",
                    padding: "var(--ease-spacing-3)",
                    color: "var(--ease-color-text-muted)",
                  }}
                >
                  {it.Cmp}
                  <span style={{ fontSize: 11 }}>{it.name}</span>
                </div>
              ))}
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>By name</CardTitle>
            <CardDescription>
              The registry for dynamic icon lookup.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap={2} align="start">
              <Icon name="search" size={20} />
              <Icon name="trash" size={20} />
              <Icon name="settings" size={20} />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </DocPage>
  );
}
