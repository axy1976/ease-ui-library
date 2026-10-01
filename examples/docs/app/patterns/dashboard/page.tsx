"use client";
import * as React from "react";
import {
  Page,
  PageHeader,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Stack,
  Stat,
  DataTable,
  Status,
  Badge,
  Progress,
  EmptyState,
  Button,
  SearchInput,
  Select,
} from "ease-ui";
import type { DataTableColumn } from "ease-ui";

type Deploy = {
  id: string;
  name: string;
  env: string;
  version: string;
  status: "running" | "pending" | "error" | "stopped";
  memory: number;
};
const deploys: Deploy[] = [
  {
    id: "d1",
    name: "api-gateway",
    env: "prod",
    version: "v2.18.0",
    status: "running",
    memory: 82,
  },
  {
    id: "d2",
    name: "worker-queue",
    env: "prod",
    version: "v1.9.3",
    status: "running",
    memory: 41,
  },
  {
    id: "d3",
    name: "billing-svc",
    env: "staging",
    version: "v0.8.1",
    status: "pending",
    memory: 12,
  },
  {
    id: "d4",
    name: "metrics-aggr",
    env: "prod",
    version: "v3.2.0",
    status: "error",
    memory: 91,
  },
];
type StatusKind = "neutral" | "info" | "success" | "warning" | "danger";
const kind = (s: Deploy["status"]): StatusKind =>
  s === "running"
    ? "success"
    : s === "error"
      ? "danger"
      : s === "pending"
        ? "warning"
        : "neutral";

export default function DashboardPatternPage() {
  const [q, setQ] = React.useState("");
  const rows = deploys.filter((d) =>
    d.name.toLowerCase().includes(q.toLowerCase()),
  );
  const columns: DataTableColumn<Deploy>[] = [
    {
      id: "name",
      header: "Service",
      cell: (r) => <strong>{r.name}</strong>,
      sortAccessor: (r) => r.name,
    },
    {
      id: "env",
      header: "Environment",
      cell: (r) => (
        <Badge status={r.env === "prod" ? "info" : "neutral"}>{r.env}</Badge>
      ),
    },
    { id: "version", header: "Version", cell: (r) => r.version },
    {
      id: "status",
      header: "Status",
      cell: (r) => (
        <Status status={kind(r.status)} pulse={r.status === "running"}>
          {r.status}
        </Status>
      ),
    },
    {
      id: "mem",
      header: "Memory",
      align: "end",
      cell: (r) => (
        <Progress
          value={r.memory}
          label={`${r.name} memory`}
          status={r.memory > 85 ? "danger" : undefined}
        />
      ),
    },
  ];
  return (
    <div
      className="ease-docs-prose"
      style={{
        maxWidth: 1160,
        margin: "0 auto",
        padding: "var(--ease-spacing-6)",
      }}
    >
      <h1>Monitoring dashboard</h1>
      <p>
        Metrics, a searchable + sortable resource table, and capacity — the
        shape of most operations consoles.
      </p>

      <div style={{ marginTop: "var(--ease-spacing-6)" }}>
        <Page>
          <PageHeader
            title="Platform overview"
            description="Live health across the workspace."
            actions={<Button variant="primary">New deployment</Button>}
          />

          <Grid gap={3}>
            <Stat
              label="Requests / min"
              value="12,480"
              trend="+4.2%"
              trendDirection="up"
            />
            <Stat
              label="p95 latency"
              value="212ms"
              trend="-8ms"
              trendDirection="up"
            />
            <Stat
              label="Error rate"
              value="0.42%"
              trend="+0.1%"
              trendDirection="up"
              status="danger"
            />
            <Stat label="Active services" value="24" />
          </Grid>

          <Card style={{ marginTop: "var(--ease-spacing-4)" }}>
            <CardHeader>
              <CardTitle>Deployments</CardTitle>
              <div
                style={{
                  display: "flex",
                  gap: "var(--ease-spacing-2)",
                  justifyContent: "flex-end",
                  marginTop: 8,
                }}
              >
                <div style={{ width: 200 }}>
                  <SearchInput
                    size="sm"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    aria-label="Filter services"
                  />
                </div>
                <Select
                  size="sm"
                  aria-label="Environment"
                  defaultValue="all"
                  options={[
                    { value: "all", label: "All envs" },
                    { value: "prod", label: "Production" },
                    { value: "staging", label: "Staging" },
                  ]}
                  style={{ width: 140 }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                rows={rows}
                stickyHeader
                empty={
                  <EmptyState
                    title="No services"
                    description="No services match your filter."
                    action={
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setQ("")}
                      >
                        Clear filter
                      </Button>
                    }
                  />
                }
              />
            </CardContent>
          </Card>
        </Page>
      </div>
    </div>
  );
}
