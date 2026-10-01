"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Stack,
  Badge,
  Button,
  ButtonGroup,
  IconButton,
  PropertyPanel,
  PropertyPanelList,
  ActivityLog,
  ResourceHeader,
  Status,
  Tag,
} from "ease-ui";
import { RefreshIcon, EditIcon, TrashIcon, CopyIcon } from "ease-ui/icons";
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

export default function EnterprisePage() {
  return (
    <DocPage
      title="Enterprise patterns"
      description="Composite patterns for console and admin applications: resource identity, property inspectors, and activity trails."
    >
      <Stack gap={3}>
        <DemoCard
          title="Resource header"
          description="Identity + status + actions for a detail page."
        >
          <div
            style={{
              border: "1px solid var(--ease-color-border)",
              borderRadius: "var(--ease-radius-md)",
              padding: "var(--ease-spacing-4)",
              background: "var(--ease-color-surface)",
            }}
          >
            <ResourceHeader
              name="api-gateway"
              id="arn:ease:gw:us-east-1:api-gateway"
              status={{ kind: "success", label: "running", pulse: true }}
              meta={
                <>
                  <Tag>us-east-1</Tag>
                  <Tag>prod</Tag>
                </>
              }
              actions={
                <ButtonGroup>
                  <Button size="sm" icon={<RefreshIcon size={14} />}>
                    Restart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<EditIcon size={14} />}
                  >
                    Edit
                  </Button>
                  <IconButton aria-label="Delete api-gateway">
                    <TrashIcon size={16} />
                  </IconButton>
                </ButtonGroup>
              }
            />
          </div>
        </DemoCard>
        <DemoCard
          title="Property panel"
          description="Grouped key/value properties in a bordered panel."
        >
          <PropertyPanelList
            title="Properties"
            items={[
              { label: "Type", value: "gateway" },
              { label: "Region", value: "us-east-1" },
              {
                label: "ARN",
                value: "arn:ease:gw:us-east-1:api-gateway",
                mono: true,
              },
              { label: "Created", value: "2026-07-08" },
            ]}
          />
        </DemoCard>
        <DemoCard
          title="Activity log"
          description="Timestamped event feed with status dots."
        >
          <ActivityLog
            entries={[
              {
                id: "a1",
                title: "Deployment succeeded",
                detail: "v2.18.0 · api-gateway",
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
        </DemoCard>
      </Stack>
    </DocPage>
  );
}
