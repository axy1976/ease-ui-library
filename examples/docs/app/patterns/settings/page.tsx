"use client";
import * as React from "react";
import {
  Page,
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Stack,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Field,
  Input,
  Select,
  Switch,
  NumberInput,
  PasswordInput,
  Button,
  Badge,
  ConfirmDialog,
} from "ease-ui";

export default function SettingsPatternPage() {
  const [tab, setTab] = React.useState("general");
  const [confirm, setConfirm] = React.useState(false);
  return (
    <div
      className="ease-docs-prose"
      style={{
        maxWidth: 1040,
        margin: "0 auto",
        padding: "var(--ease-spacing-6)",
      }}
    >
      <h1>Settings page</h1>
      <p>
        Tabs, a form with mixed controls, a save action, and a danger zone with
        a confirm dialog.
      </p>

      <div style={{ marginTop: "var(--ease-spacing-6)" }}>
        <Page>
          <PageHeader
            title="Settings"
            description="Manage your workspace configuration."
          />

          <Tabs value={tab} onValueChange={setTab} variant="line">
            <TabList>
              <Tab value="general">General</Tab>
              <Tab value="billing">Billing</Tab>
              <Tab value="team">Team</Tab>
            </TabList>
            <TabPanel value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack gap={4}>
                    <Field label="Workspace name">
                      <Input defaultValue="ease-platform" />
                    </Field>
                    <Field label="Default region">
                      <Select
                        defaultValue="us-east-1"
                        options={[
                          { value: "us-east-1", label: "US East" },
                          { value: "eu-west-1", label: "EU West" },
                          { value: "ap-south-1", label: "Asia South" },
                        ]}
                      />
                    </Field>
                    <Field label="Default instance count">
                      <NumberInput defaultValue={3} min={1} max={12} />
                    </Field>
                    <Switch label="Enable audit logging" defaultChecked />
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button variant="primary">Save changes</Button>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing</CardTitle>
                  <CardContent></CardContent>
                </CardHeader>
                <CardContent>
                  <Stack gap={4}>
                    <Field label="Card on file">
                      <Input placeholder="•••• 4242" disabled />
                    </Field>
                    <Field label="Payment email">
                      <Input type="email" defaultValue="billing@example.com" />
                    </Field>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button variant="primary">Save</Button>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel value="team">
              <Card>
                <CardHeader>
                  <CardTitle>API access</CardTitle>
                  <Badge status="warning">Sensitive</Badge>
                </CardHeader>
                <CardContent>
                  <Stack gap={4}>
                    <Field
                      label="API token"
                      description="Rotate this to invalidate existing sessions."
                    >
                      <PasswordInput placeholder="paste new token" />
                    </Field>
                  </Stack>
                </CardContent>
              </Card>
              <Card
                style={{
                  marginTop: "var(--ease-spacing-4)",
                  borderColor: "var(--ease-color-danger)",
                }}
              >
                <CardHeader>
                  <CardTitle>Danger zone</CardTitle>
                  <CardDescription>Irreversible actions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Stack gap={3}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "var(--ease-font-size-sm)",
                        color: "var(--ease-color-text-muted)",
                      }}
                    >
                      Deleting the workspace removes all resources, logs, and
                      billing. This cannot be undone.
                    </p>
                    <Button
                      variant="destructive"
                      onClick={() => setConfirm(true)}
                    >
                      Delete workspace
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </TabPanel>
          </Tabs>
        </Page>
        <ConfirmDialog
          open={confirm}
          onClose={() => setConfirm(false)}
          onConfirm={() => setConfirm(false)}
          title="Delete workspace?"
          description="All resources, logs, and billing data will be permanently removed."
          confirmLabel="Delete permanently"
        />
      </div>
    </div>
  );
}
