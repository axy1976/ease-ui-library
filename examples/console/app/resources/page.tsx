"use client";

import { useState } from "react";
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
  CardDescription,
  DataTable,
  TableToolbar,
  FilterBar,
  Status,
  EmptyState,
  ResourceCard,
  MetadataGrid,
  InspectorPanel,
  CommandPalette,
  useCommandPaletteShortcut,
} from "ease-ui";
import type { ResourceStatus, Resource } from "@/lib/data";
import { resources } from "@/lib/data";

function kind(s: ResourceStatus) {
  return s === "running"
    ? "success"
    : s === "error"
      ? "danger"
      : s === "pending"
        ? "warning"
        : "neutral";
}

export default function ResourcesPage() {
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );
  const [paletteOpen, setPaletteOpen] = useState(false);
  useCommandPaletteShortcut(() => setPaletteOpen(true), !paletteOpen);

  const [activeFilters, setActiveFilters] = useState<
    Array<{ id: string; label: string; onRemove: () => void }>
  >([]);

  function openInspector(res: Resource) {
    setSelectedResource(res);
    setInspectorOpen(true);
  }

  return (
    <Page
      breadcrumb={[
        { label: "Console", href: "/dashboard" },
        { label: "Resources" },
      ]}
    >
      <PageHeader
        title="Resources"
        description="All compute, storage, and data resources across regions."
        actions={
          <PageActions>
            <Button variant="primary" onClick={() => setPaletteOpen(true)}>
              ⌘K
            </Button>
            <Button variant="primary">Create resource</Button>
          </PageActions>
        }
      />

      <PageContent>
        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
            <CardDescription>{resources.length} total</CardDescription>
          </CardHeader>
          <CardContent>
            <FilterBar
              variant="chips"
              label="Filters"
              activeFilters={activeFilters}
              onClearAll={() => setActiveFilters([])}
              searchPlaceholder="Filter by name…"
            />
            <DataTable
              columns={[
                {
                  id: "name",
                  header: "Name",
                  cell: (r) => <strong>{r.name}</strong>,
                  sortAccessor: (r) => r.name,
                },
                { id: "type", header: "Type", cell: (r) => r.type },
                { id: "region", header: "Region", cell: (r) => r.region },
                {
                  id: "vcpus",
                  header: "vCPU",
                  cell: (r) => (r.vcpus === 0 ? "—" : String(r.vcpus)),
                  align: "end",
                },
                {
                  id: "status",
                  header: "Status",
                  cell: (r) => (
                    <Status
                      status={kind(r.status)}
                      pulse={r.status === "running"}
                    >
                      {r.status}
                    </Status>
                  ),
                },
                {
                  id: "actions",
                  header: "",
                  cell: (r) => (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openInspector(r)}
                    >
                      Inspect
                    </Button>
                  ),
                },
              ]}
              rows={resources}
              rowKey={(r) => r.id}
              selectable
              empty={
                <EmptyState
                  title="No resources"
                  description="Create your first resource to get started."
                />
              }
            />
          </CardContent>
        </Card>

        {/* Resource cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--ease-spacing-4)",
            marginTop: "var(--ease-spacing-6)",
          }}
        >
          {resources.slice(0, 4).map((r) => (
            <ResourceCard
              key={r.id}
              name={r.name}
              type={r.type}
              status={{
                kind: kind(r.status),
                label: r.status,
                pulse: r.status === "running",
              }}
              meta={`${r.region} · ${r.vcpus} vCPU`}
              footer={
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openInspector(r)}
                >
                  View
                </Button>
              }
            />
          ))}
        </div>
      </PageContent>

      {/* Inspector panel (anchored = inline flow) */}
      <InspectorPanel
        open={inspectorOpen && selectedResource !== null}
        onClose={() => setInspectorOpen(false)}
        title={selectedResource ? selectedResource.name : ""}
        subtitle={selectedResource ? selectedResource.type : undefined}
        width="md"
        anchored
        footer={
          <Button variant="primary" size="sm">
            Apply
          </Button>
        }
      >
        {selectedResource ? (
          <MetadataGrid
            title="Properties"
            entries={[
              { key: "ID", value: selectedResource.id, mono: true },
              { key: "Region", value: selectedResource.region },
              { key: "vCPU", value: String(selectedResource.vcpus) },
              {
                key: "Status",
                value: selectedResource.status,
                tone:
                  kind(selectedResource.status) === "success"
                    ? "success"
                    : kind(selectedResource.status) === "danger"
                      ? "danger"
                      : "warning",
              },
            ]}
          />
        ) : null}
      </InspectorPanel>

      {/* Command palette */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        groups={[
          {
            label: "Go to",
            items: [
              {
                id: "nav-dashboard",
                label: "Dashboard",
                keywords: ["home", "overview"],
                onSelect: () => {},
              },
              {
                id: "nav-resources",
                label: "Resources",
                keywords: ["instances", "compute"],
                onSelect: () => {},
              },
              {
                id: "nav-deployments",
                label: "Deployments",
                keywords: ["releases", "deploys"],
                onSelect: () => {},
              },
              {
                id: "nav-settings",
                label: "Settings",
                keywords: ["preferences", "config"],
                onSelect: () => {},
              },
            ],
          },
          {
            label: "Actions",
            items: [
              {
                id: "act-create",
                label: "Create resource",
                keywords: ["new", "add"],
                onSelect: () => {},
              },
              {
                id: "act-delete",
                label: "Delete selected",
                keywords: ["remove"],
                onSelect: () => {},
                disabled: true,
              },
            ],
          },
        ]}
      />
    </Page>
  );
}
