import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Page,
  Button,
  ButtonGroup,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PropertyPanelList,
  ActivityLog,
  ResourceHeader,
  Status,
  KeyValue,
  Stack,
  Panel,
  KeyValueGrid,
  StatTile,
  MetricRow,
  Banner,
  Callout,
  Toast,
  ChipGroup,
  Chip,
  Badge,
} from "ease-ui";
import {
  TrashIcon,
  EditIcon,
  RefreshIcon,
  PlusIcon,
  SettingsIcon,
} from "ease-ui/icons";
import { findResource, type ResourceStatus } from "@/lib/data";

function kind(s: ResourceStatus) {
  return s === "running"
    ? "success"
    : s === "error"
      ? "danger"
      : s === "pending"
        ? "warning"
        : "neutral";
}

export default function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const resource = findResource(id);
  if (!resource) notFound();

  return (
    <Page
      breadcrumb={[
        { label: "Console", href: "/dashboard" },
        { label: "Resources", href: "/resources" },
        { label: resource.name, current: true },
      ]}
    >
      {/* Global page-level announcement */}
      <Banner
        tone="warning"
        title="Scheduled maintenance"
        action={
          <Button size="sm" variant="link">
            Details
          </Button>
        }
      >
        The {resource.region} region is undergoing maintenance on 2026-09-30
        02:00–04:00 UTC.
      </Banner>

      <ResourceHeader
        name={resource.name}
        id={resource.id}
        status={{
          kind: kind(resource.status),
          label: resource.status,
          pulse: resource.status === "running",
        }}
        actions={
          <ButtonGroup>
            <Button
              variant="primary"
              size="sm"
              icon={<RefreshIcon size={14} />}
            >
              Restart
            </Button>
            <Button variant="outline" size="sm" icon={<EditIcon size={14} />}>
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<SettingsIcon size={14} />}
            >
              Settings
            </Button>
            <IconButton
              size="sm"
              aria-label={`Delete ${resource.name}`}
              variant="danger"
            >
              <TrashIcon size={14} />
            </IconButton>
          </ButtonGroup>
        }
      />

      {/* KPI row */}
      <MetricRow style={{ marginTop: "var(--ease-spacing-5)" }}>
        <StatTile
          label="Requests"
          value="12.4k"
          suffix="/s"
          delta={8}
          deltaDirection="up"
          caption="vs. last 7 days"
        />
        <StatTile
          label="p99 latency"
          value="142"
          suffix="ms"
          delta={-3}
          deltaDirection="down"
          deltaTone="success"
          caption="improved"
        />
        <StatTile
          label="Error rate"
          value="0.42"
          suffix="%"
          delta={1.1}
          deltaDirection="up"
          deltaTone="danger"
          caption="above SLO"
        />
        <StatTile
          label="Memory"
          value={resource.memory}
          icon={<SettingsIcon size={14} />}
          caption={`${resource.vcpus} vCPU`}
        />
      </MetricRow>

      <Grid columns={3} gap={4} style={{ marginTop: "var(--ease-spacing-5)" }}>
        <Stack gap={4} style={{ gridColumn: "span 1" }}>
          <Panel
            title="Properties"
            subtitle="Live configuration"
            icon={<SettingsIcon size={14} />}
          >
            <KeyValueGrid
              rows={[
                { key: "Type", value: resource.type },
                { key: "Region", value: resource.region },
                { key: "vCPUs", value: String(resource.vcpus) },
                { key: "Memory", value: resource.memory },
                { key: "Created", value: resource.createdAt },
              ]}
              keyWidth="8rem"
            />
          </Panel>

          <Panel
            title="Tags"
            collapsible
            defaultOpen
            footer={
              <Button size="sm" variant="ghost" icon={<PlusIcon size={12} />}>
                Add tag
              </Button>
            }
          >
            <ChipGroup>
              <Chip tone="info">team:platform</Chip>
              <Chip tone="neutral">env:prod</Chip>
              <Chip tone="warning" onRemove={() => {}}>
                cost-center:4471
              </Chip>
            </ChipGroup>
          </Panel>
        </Stack>

        <Stack gap={4} style={{ gridColumn: "span 2" }}>
          <Callout
            status="info"
            title="Auto-scaling is active"
            action={
              <Button size="sm" variant="outline">
                Configure
              </Button>
            }
          >
            This resource scales between 2 and 8 GiB based on CPU utilization.
            Last scale event: 14:21 UTC.
          </Callout>

          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <Badge status="neutral">last 30 days</Badge>
            </CardHeader>
            <CardContent>
              <ActivityLog
                entries={[
                  {
                    id: "a1",
                    title: "Deployment succeeded",
                    detail: `v2.18.0 · ${resource.name}`,
                    time: "2026-07-08 14:21",
                    status: "success",
                  },
                  {
                    id: "a2",
                    title: "Configuration changed",
                    detail: "Memory scaled to 8 GiB",
                    time: "2026-07-06 09:12",
                    status: "info",
                  },
                  {
                    id: "a3",
                    title: "Restart requested",
                    detail: "By ada",
                    time: "2026-07-02 16:40",
                    status: "neutral",
                  },
                ]}
              />
            </CardContent>
          </Card>

          {/* Sample toast preview — shown inline for the docs */}
          <Toast
            status="success"
            title="Deployment completed"
            action={
              <Button size="sm" variant="ghost">
                View logs
              </Button>
            }
          >
            The new version is live. 12.4k req/s · p99 142ms.
          </Toast>
        </Stack>
      </Grid>

      <p style={{ marginTop: "var(--ease-spacing-6)" }}>
        <Link href="/resources">Back to all resources</Link>
      </p>
    </Page>
  );
}
