"use client";

import {
  Page,
  PageHeader,
  Grid,
  Stat,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DataTable,
  Status,
  EmptyState,
} from "ease-ui";
import { resources, getMetric, type ResourceStatus } from "@/lib/data";

function statusKind(s: ResourceStatus) {
  return s === "running"
    ? "success"
    : s === "error"
      ? "danger"
      : s === "pending"
        ? "warning"
        : "neutral";
}

export default function DashboardPage() {
  return (
    <Page>
      <PageHeader
        title="Dashboard"
        description="A quick look at your infrastructure."
      />

      <Grid
        columns={4}
        gap={4}
        style={{ marginBottom: "var(--ease-spacing-6)" }}
      >
        <Stat
          label={getMetric("resources").label}
          value={getMetric("resources").value}
          trend={getMetric("resources").trend}
          trendDirection={getMetric("resources").direction}
        />
        <Stat
          label={getMetric("running").label}
          value={getMetric("running").value}
          trend={getMetric("running").trend}
          trendDirection={getMetric("running").direction}
        />
        <Stat
          label={getMetric("errors").label}
          value={getMetric("errors").value}
          trend={getMetric("errors").trend}
          trendDirection={getMetric("errors").direction}
          status={getMetric("errors").status}
        />
        <Stat
          label={getMetric("spend").label}
          value={getMetric("spend").value}
          trend={getMetric("spend").trend}
          trendDirection={getMetric("spend").direction}
        />
      </Grid>

      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              {
                id: "name",
                header: "Name",
                cell: (r) => r.name,
                sortAccessor: (r) => r.name,
              },
              { id: "type", header: "Type", cell: (r) => r.type },
              { id: "region", header: "Region", cell: (r) => r.region },
              {
                id: "status",
                header: "Status",
                cell: (r) => (
                  <Status
                    status={statusKind(r.status)}
                    pulse={r.status === "running"}
                  >
                    {r.status}
                  </Status>
                ),
              },
            ]}
            rows={resources}
            rowKey={(r) => r.id}
            empty={
              <EmptyState
                title="No resources"
                description="Create your first resource to get started."
              />
            }
          />
        </CardContent>
      </Card>
    </Page>
  );
}
