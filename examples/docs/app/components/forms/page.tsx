"use client";
import {
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Stack,
  Badge,
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  Slider,
  Radio,
  RadioGroup,
  NumberInput,
  SearchInput,
  PasswordInput,
  CodeBlock,
  Inline,
} from "ease-ui";
import { Demo } from "@/components/demo";
import { DocPage } from "@/components/demo-section";

const fieldUsage = `import { Field, Input } from "ease-ui";

<Field label="Project name" description="Use a short identifier." error={errors.name} required>
  <Input placeholder="api-gateway" />
</Field>`;

function Control({
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

export default function FormsPage() {
  return (
    <DocPage
      title="Forms"
      description="Every control sits in a <Field> that wires label ↔ input, description, and error with correct ARIA. Controls read the field from context."
    >
      <Grid gap={3}>
        <Control title="Input" description="In a Field with a valid state.">
          <Field label="Display name">
            <Input placeholder="Ada Lovelace" />
          </Field>
        </Control>
        <Control
          title="Input"
          description="Invalid — the error is linked and announced."
        >
          <Demo kind="field-error" />
        </Control>
        <Control title="Textarea" description="Multi-line input.">
          <Field label="Description">
            <Textarea placeholder="Describe the resource…" rows={3} />
          </Field>
        </Control>
        <Control
          title="Select"
          description="options[] or raw <option> children."
        >
          <Field label="Region">
            <Select
              placeholder="Choose a region…"
              options={[
                { value: "us-east-1", label: "US East (N. Virginia)" },
                { value: "eu-west-1", label: "EU West (Ireland)" },
                { value: "ap-south-1", label: "Asia South (Mumbai)" },
              ]}
            />
          </Field>
        </Control>
        <Control title="Checkbox" description="Boolean with a label prop.">
          <Stack gap={3}>
            <Checkbox label="Enable monitoring" defaultChecked />
            <Checkbox label="Receive alerts" />
          </Stack>
        </Control>
        <Control title="Switch" description="role=switch on/off toggle.">
          <Switch label="Auto-scaling" defaultChecked />
        </Control>
        <Control
          title="Radio group"
          description="A managed set with roving behavior."
        >
          <RadioGroup defaultValue="balanced" label="Performance profile">
            <Radio value="minimal">Minimal</Radio>
            <Radio value="balanced">Balanced</Radio>
            <Radio value="performance">Performance</Radio>
          </RadioGroup>
        </Control>
        <Control title="Slider" description="Numeric range.">
          <Field label="Concurrency">
            <Slider defaultValue={50} min={0} max={100} />
          </Field>
        </Control>
        <Control title="Number input" description="Numeric with steppers.">
          <Field label="Instances">
            <NumberInput defaultValue={3} min={1} max={10} />
          </Field>
        </Control>
        <Control title="Search" description="Inline search affordance.">
          <SearchInput placeholder="Search resources…" />
        </Control>
        <Control title="Password" description="With reveal toggle.">
          <Field label="API token">
            <PasswordInput placeholder="paste token" />
          </Field>
        </Control>
      </Grid>
      <div style={{ marginTop: "var(--ease-spacing-6)" }}>
        <h2>Usage</h2>
        <p>
          <Inline>
            The canonical form pattern is a single control inside a wrapping
            Field; the control inherits the label, id, error, and disabled state
            automatically.
          </Inline>
        </p>
        <CodeBlock language="tsx">{fieldUsage}</CodeBlock>
      </div>
    </DocPage>
  );
}
