"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Stack,
  Badge,
  Breadcrumb,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Pagination,
  Stepper,
  SearchInput,
  Avatar,
  Button,
} from "ease-ui";
import { MenuIcon, SettingsIcon, ChevronRightIcon } from "ease-ui/icons";
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

export default function NavigationPage() {
  const [page, setPage] = React.useState(2);
  return (
    <DocPage
      title="Navigation"
      description="Orientation and movement: breadcrumbs, tabs, side nav, top nav, pagination, and step flows. Tabs is client-only (roving focus)."
    >
      <Stack gap={3}>
        <DemoCard title="Breadcrumb" description="Contextual trail.">
          <Breadcrumb
            items={[
              { label: "Console" },
              { label: "Resources" },
              { label: "api-gateway", current: true },
            ]}
          />
        </DemoCard>
        <DemoCard
          title="Tabs"
          description="Line or pills. Keyboard: ←/→, Home/End."
        >
          <Tabs defaultValue="overview" variant="line">
            <TabList>
              <Tab value="overview">Overview</Tab>
              <Tab value="metrics">Metrics</Tab>
              <Tab value="logs">Logs</Tab>
            </TabList>
            <TabPanel value="overview">
              <p style={{ margin: 0, fontSize: "var(--ease-font-size-sm)" }}>
                Overview content.
              </p>
            </TabPanel>
            <TabPanel value="metrics">
              <p style={{ margin: 0, fontSize: "var(--ease-font-size-sm)" }}>
                Metrics content.
              </p>
            </TabPanel>
            <TabPanel value="logs">
              <p style={{ margin: 0, fontSize: "var(--ease-font-size-sm)" }}>
                Logs content.
              </p>
            </TabPanel>
          </Tabs>
        </DemoCard>
        <DemoCard
          title="Sidebar"
          description="Structured side nav with sections, active state, and icons."
        >
          <div
            style={{
              border: "1px solid var(--ease-color-border)",
              borderRadius: "var(--ease-radius-md)",
              background: "var(--ease-color-surface)",
              padding: "var(--ease-spacing-2)",
              maxWidth: 220,
            }}
          >
            <div data-ease-sidebar="section">
              <div
                data-ease-sidebar="section-label"
                style={{
                  fontSize: "var(--ease-font-size-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "var(--ease-color-text-subtle)",
                  padding: "4px 8px",
                }}
              >
                Compute
              </div>
              <div style={{ display: "grid", gap: 2, padding: 4 }}>
                <a
                  href="#"
                  data-ease-sidebar="item"
                  data-active="true"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 8px",
                    borderRadius: 6,
                    textDecoration: "none",
                    background: "var(--ease-color-primary-subtle)",
                    color: "var(--ease-color-text)",
                    fontSize: "var(--ease-font-size-sm)",
                  }}
                >
                  <SettingsIcon size={14} /> Resources
                </a>
                <a
                  href="#"
                  data-ease-sidebar="item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 8px",
                    borderRadius: 6,
                    textDecoration: "none",
                    color: "var(--ease-color-text-muted)",
                    fontSize: "var(--ease-font-size-sm)",
                  }}
                >
                  <MenuIcon size={14} /> Deployments
                </a>
              </div>
            </div>
          </div>
        </DemoCard>
        <DemoCard
          title="Navbar"
          description="Compact top bar (brand + search + actions)."
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ease-spacing-3)",
              border: "1px solid var(--ease-color-border)",
              borderRadius: "var(--ease-radius-md)",
              padding: "var(--ease-spacing-2) var(--ease-spacing-3)",
              background: "var(--ease-color-surface)",
            }}
          >
            <span
              style={{ fontWeight: 600, fontSize: "var(--ease-font-size-sm)" }}
            >
              Ease UI
            </span>
            <div style={{ flex: 1, maxWidth: 280 }}>
              <SearchInput placeholder="Search…" size="sm" />
            </div>
            <Avatar name="Ada Lovelace" size="sm" />
          </div>
        </DemoCard>
        <DemoCard
          title="Pagination"
          description="Ellipsized page ranges, aria-current."
        >
          <Pagination page={page} pageCount={12} onPageChange={setPage} />
        </DemoCard>
        <DemoCard title="Stepper" description="Linear step flows.">
          <Stepper
            steps={[
              { label: "Identity" },
              { label: "Configuration" },
              { label: "Confirm" },
            ]}
            current={1}
          />
        </DemoCard>
      </Stack>
    </DocPage>
  );
}
