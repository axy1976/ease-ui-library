"use client";
import {
  Page,
  PageHeader,
  ButtonGroup,
  Button,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Stack,
  ResourceHeader,
  PropertyPanelList,
  ActivityLog,
  Status,
  Tag,
} from "ease-ui";
import { RefreshIcon, EditIcon, TrashIcon } from "ease-ui/icons";

export default function ResourcePatternPage() {
  return (
    <div
      className="ease-docs-prose"
      style={{
        maxWidth: 1040,
        margin: "0 auto",
        padding: "var(--ease-spacing-6)",
      }}
    >
      <h1>Resource detail page</h1>
      <p>
        A complete, server-renderable resource detail page: identity,
        properties, and an activity trail — all composed from Ease UI.
      </p>

      <div style={{ marginTop: "var(--ease-spacing-6)" }}>
        <Page
          breadcrumb={[
            { label: "Console", href: "/" },
            { label: "Resources", href: "/" },
            { label: "api-gateway", current: true },
          ]}
        >
          <PageHeader
            title="api-gateway"
            description="Edge gateway · us-east-1"
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
                <Button
                  size="sm"
                  variant="destructive"
                  icon={<TrashIcon size={14} />}
                >
                  Delete
                </Button>
              </ButtonGroup>
            }
          />

          <ResourceHeader
            name="api-gateway"
            id="arn:ease:gw:us-east-1:api-gateway"
            status={{ kind: "success", label: "running", pulse: true }}
            meta={
              <>
                <Tag>us-east-1</Tag>
                <Tag>prod</Tag>
                <Tag>v2.18.0</Tag>
              </>
            }
          />

          <Grid
            columns={3}
            gap={4}
            style={{ marginTop: "var(--ease-spacing-6)" }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyPanelList
                  title="Identity"
                  items={[
                    { label: "Type", value: "gateway" },
                    { label: "Region", value: "us-east-1" },
                    { label: "Version", value: "v2.18.0" },
                    {
                      label: "ARN",
                      value: "arn:ease:gw:us-east-1:api-gateway",
                      mono: true,
                    },
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityLog
                  entries={[
                    {
                      id: "a1",
                      title: "Deployment succeeded",
                      detail: "v2.18.0",
                      time: "2026-07-08 14:21",
                      status: "success",
                    },
                    {
                      id: "a2",
                      title: "Memory scaled",
                      detail: "to 8 GiB",
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
          </Grid>
        </Page>
      </div>
    </div>
  );
}
