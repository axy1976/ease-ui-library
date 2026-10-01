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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
  TableScroll,
  DataTable,
  TableToolbar,
  TablePagination,
  Status,
  Button,
  type DataTableColumn,
} from "ease-ui";
import { DocPage } from "@/components/demo-section";

const resources = [
  {
    id: "res-001",
    name: "api-gateway",
    type: "gateway",
    region: "us-east-1",
    status: "running" as const,
    vcpus: 4,
    memory: "8 GiB",
  },
  {
    id: "res-002",
    name: "worker-queue",
    type: "queue",
    region: "us-east-1",
    status: "running" as const,
    vcpus: 2,
    memory: "4 GiB",
  },
  {
    id: "res-003",
    name: "billing-svc",
    type: "service",
    region: "eu-west-1",
    status: "pending" as const,
    vcpus: 2,
    memory: "4 GiB",
  },
  {
    id: "res-004",
    name: "metrics-aggr",
    type: "service",
    region: "us-west-2",
    status: "error" as const,
    vcpus: 8,
    memory: "16 GiB",
  },
];

function statusKind(s: string) {
  return s === "running"
    ? "success"
    : s === "error"
      ? "danger"
      : s === "pending"
        ? "warning"
        : "neutral";
}

export default function TablesPage() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [showEmpty, setShowEmpty] = React.useState(false);

  const columns: DataTableColumn<(typeof resources)[number]>[] = [
    {
      id: "name",
      header: "Name",
      cell: (r) => <strong>{r.name}</strong>,
      sortAccessor: (r) => r.name,
    },
    {
      id: "type",
      header: "Type",
      cell: (r) => r.type,
      sortAccessor: (r) => r.type,
    },
    { id: "region", header: "Region", cell: (r) => r.region },
    {
      id: "status",
      header: "Status",
      cell: (r) => (
        <Status status={statusKind(r.status)} pulse={r.status === "running"}>
          {r.status}
        </Status>
      ),
    },
    {
      id: "vcpus",
      header: "vCPUs",
      align: "end",
      cell: (r) => r.vcpus,
      sortAccessor: (r) => r.vcpus,
    },
    { id: "memory", header: "Memory", align: "end", cell: (r) => r.memory },
  ];

  return (
    <DocPage
      title="Tables"
      description="Two APIs: composable Table primitives for full control, or a data-driven DataTable that handles sorting, selection, loading, and empty states with no dependency."
    >
      <Stack gap={4}>
        <Card>
          <CardHeader>
            <CardTitle>Composable</CardTitle>
            <CardDescription>
              Table · TableHeader · TableBody · TableRow · cells. Add
              stickyHeader, variant="compact|striped", or wrap in TableScroll.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TableScroll stickyHeader>
              <Table variant="compact">
                <TableHeader>
                  <TableRow>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Type</TableHeadCell>
                    <TableHeadCell align="end">vCPUs</TableHeadCell>
                    <TableHeadCell align="end">Memory</TableHeadCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.slice(0, 2).map((r) => (
                    <TableRow key={r.id} hoverable>
                      <TableCell>{r.name}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell align="end">{r.vcpus}</TableCell>
                      <TableCell align="end">{r.memory}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableScroll>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>DataTable</CardTitle>
            <CardDescription>
              <Badge status="info">Client</Badge> Data-driven: sortable columns,
              selectable rows, loading and empty states.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TableToolbar>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setLoading(true)}
              >
                Simulate loading
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowEmpty((v) => !v)}
              >
                {showEmpty ? "Show rows" : "Show empty"}
              </Button>
            </TableToolbar>
            <DataTable
              columns={columns}
              rows={showEmpty ? [] : resources}
              selectable
              stickyHeader
              defaultSort={{ id: "name", direction: "asc" }}
              loading={loading}
              empty={
                showEmpty ? (
                  <div
                    style={{
                      padding: "var(--ease-spacing-6)",
                      textAlign: "center",
                      color: "var(--ease-color-text-muted)",
                      fontSize: "var(--ease-font-size-sm)",
                    }}
                  >
                    No resources in this region.
                  </div>
                ) : undefined
              }
            />
            <TablePagination
              page={page}
              pageCount={3}
              onPageChange={setPage}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(3, p + 1))}
            />
          </CardContent>
        </Card>
      </Stack>
    </DocPage>
  );
}
