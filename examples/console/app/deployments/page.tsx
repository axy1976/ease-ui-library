"use client";

import {
  Page,
  PageHeader,
  PageActions,
  PageContent,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DataTable,
  Status,
  EmptyState,
} from "ease-ui";
import { deployments, type Deployment } from "@/lib/data";

function kind(s: Deployment["status"]) {
  return s === "success"
    ? "success"
    : s === "failed"
      ? "danger"
      : s === "running"
        ? "info"
        : "neutral";
}

export default function DeploymentsPage() {
  return (
    <Page
      breadcrumb={[
        { label: "Console", href: "/dashboard" },
        { label: "Deployments" },
      ]}
    >
      <PageHeader
        title="Deployments"
        description="Latest releases across environments."
        actions={
          <PageActions>
            <Button variant="primary">Deploy</Button>
          </PageActions>
        }
      />

      <PageContent>
        <Card>
          <CardHeader>
            <CardTitle>Recent deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                {
                  id: "name",
                  header: "Resource",
                  cell: (d) => <strong>{d.name}</strong>,
                  sortAccessor: (d) => d.name,
                },
                { id: "env", header: "Environment", cell: (d) => d.env },
                {
                  id: "version",
                  header: "Version",
                  cell: (d) => <code>{d.version}</code>,
                },
                {
                  id: "status",
                  header: "Status",
                  cell: (d) => (
                    <Status
                      status={kind(d.status)}
                      pulse={d.status === "running"}
                    >
                      {d.status}
                    </Status>
                  ),
                },
                {
                  id: "duration",
                  header: "Duration",
                  cell: (d) => d.duration,
                  align: "end",
                },
                { id: "author", header: "Author", cell: (d) => d.author },
              ]}
              rows={deployments}
              rowKey={(d) => d.id}
              empty={
                <EmptyState
                  title="No deployments"
                  description="Deploy your first application to get started."
                />
              }
            />
          </CardContent>
        </Card>
      </PageContent>
    </Page>
  );
}
