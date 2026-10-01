"use client";

import * as React from "react";
import type { ReactNode, ReactElement } from "react";
import {
  Button,
  IconButton,
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  Slider,
  PasswordInput,
  SearchInput,
  RadioGroup,
  Radio,
  NumberInput,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogCloseButton,
  ConfirmDialog,
  ButtonGroup,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  Tooltip,
  Popover,
  DropdownMenu,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  ContextMenu,
  CommandMenu,
  type CommandItem,
  ToastProvider,
  useToast,
  Alert,
} from "ease-ui";

/**
 * Renders a single interactive (client-only) component for the docs. Content
 * pages are Server Components, so they cannot render a client component inline;
 * they call this leaf demo instead, which lives in a client boundary.
 * `kind` selects the demo; any other props are passed through to the primitive.
 */
export function Demo({
  kind,
  ...props
}: { kind: string } & Record<string, unknown>) {
  switch (kind) {
    case "button":
      return <Button {...(props as Record<string, unknown>)} />;
    case "button-group":
      return <ButtonGroup {...(props as Record<string, unknown>)} />;
    case "icon-button":
      return (
        <IconButton
          aria-label={
            typeof props["aria-label"] === "string"
              ? props["aria-label"]
              : "demo"
          }
          {...(props as Record<string, unknown>)}
        >
          …
        </IconButton>
      );
    case "field-input":
      return (
        <Field
          label="Project name"
          description="Use a short internal identifier."
        >
          <Input placeholder="api-gateway" />
        </Field>
      );
    case "field-error":
      return (
        <Field label="Email" error="Please enter a valid email address.">
          <Input type="email" placeholder="you@example.com" />
        </Field>
      );
    case "input":
      return <Input {...(props as Record<string, unknown>)} />;
    case "textarea":
      return <Textarea {...(props as Record<string, unknown>)} />;
    case "select":
      return <Select {...(props as Record<string, unknown>)} />;
    case "checkbox":
      return <Checkbox {...(props as Record<string, unknown>)} />;
    case "switch":
      return <Switch {...(props as Record<string, unknown>)} />;
    case "slider":
      return <Slider {...(props as Record<string, unknown>)} />;
    case "radio-group":
      return (
        <RadioGroup
          defaultValue={String(props.value ?? "")}
          label={String(props.label ?? "Choice")}
        >
          {(
            props.options as { value: string; label: string }[] | undefined
          )?.map((o) => (
            <Radio key={o.value} value={o.value}>
              {o.label}
            </Radio>
          ))}
        </RadioGroup>
      );
    case "number-input":
      return <NumberInput {...(props as Record<string, unknown>)} />;
    case "search-input":
      return <SearchInput {...(props as Record<string, unknown>)} />;
    case "password-input":
      return <PasswordInput {...(props as Record<string, unknown>)} />;

    case "dialog":
      return <DialogDemo />;
    case "confirm-dialog":
      return <ConfirmDemo />;
    case "drawer":
      return <DrawerDemo />;
    case "tooltip":
      return (
        <Tooltip content={String(props.content ?? "More info")}>
          {(props.children as ReactElement) ?? (
            <Button variant="outline">Hover me</Button>
          )}
        </Tooltip>
      );
    case "popover":
      return (
        <Popover
          trigger={(props.trigger as ReactNode) ?? <span>Click me ▾</span>}
        >
          {props.children as ReactNode}
        </Popover>
      );
    case "dropdown-menu":
      return <DropdownDemo />;
    case "command-menu":
      return <CommandDemo />;
    case "toast":
      return <ToastDemo />;
    case "alert":
      return <Alert {...(props as Record<string, unknown>)} />;
    default:
      return null;
  }
}

function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Deploy service</DialogTitle>
          <DialogDescription>
            Choose an environment and version.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field label="Environment">
            <Select
              placeholder="Select…"
              options={[
                { value: "staging", label: "Staging" },
                { value: "production", label: "Production" },
              ]}
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogCloseButton>Cancel</DialogCloseButton>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Deploy
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function ConfirmDemo() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete resource
      </Button>
      <ConfirmDialog
        open={open}
        loading={loading}
        title="Delete api-gateway?"
        description="This will permanently remove the resource and cannot be undone."
        onConfirm={() => {
          setLoading(true);
          window.setTimeout(() => {
            setLoading(false);
            setOpen(false);
          }, 900);
        }}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} side="end">
        <DrawerHeader>
          <DrawerTitle>Details</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p
            style={{
              margin: 0,
              fontSize: "var(--ease-font-size-sm)",
              color: "var(--ease-color-text-muted)",
            }}
          >
            A side panel for detail views. Focus is trapped and the body scroll
            is locked while open.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--ease-spacing-2)",
            }}
          >
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Save
            </Button>
          </div>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

function DropdownDemo() {
  return (
    <DropdownMenu
      trigger={
        <Button variant="outline">
          Actions <span aria-hidden="true">▾</span>
        </Button>
      }
    >
      <MenuLabel>api-gateway</MenuLabel>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Copy ARN</MenuItem>
      <MenuSeparator />
      <MenuItem>Delete</MenuItem>
    </DropdownMenu>
  );
}

function CommandDemo() {
  const [open, setOpen] = React.useState(false);
  const items: CommandItem[] = [
    {
      id: "1",
      label: "Create a deployment",
      keywords: ["deploy", "new"],
      onSelect: () => setOpen(false),
    },
    {
      id: "2",
      label: "View logs",
      keywords: ["logs"],
      onSelect: () => setOpen(false),
    },
    {
      id: "3",
      label: "Open settings",
      keywords: ["settings", "config"],
      onSelect: () => setOpen(false),
    },
  ];
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open command menu
      </Button>
      <CommandMenu
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        title="Commands"
        placeholder="Search…"
      />
    </>
  );
}

function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButtons />
    </ToastProvider>
  );
}

function ToastButtons() {
  const toast = useToast();
  return (
    <ButtonGroup>
      <Button
        variant="primary"
        onClick={() => toast.success("Deployment completed")}
      >
        Success toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.warning("Quota nearly reached")}
      >
        Warning toast
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast.error("Deployment failed", "See logs for details.")
        }
      >
        Error toast
      </Button>
      <Button variant="ghost" onClick={() => toast.info("New notification")}>
        Info toast
      </Button>
    </ButtonGroup>
  );
}
