import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  MenuItem,
  MenuSeparator,
  MenuLabel,
} from "./dropdown-menu";
import { CommandMenu } from "./command-menu";
import { ConfirmDialog } from "./confirm-dialog";
import { Drawer, DrawerBody, DrawerHeader, DrawerTitle } from "./drawer";
import { ContextMenu } from "./context-menu";

describe("DropdownMenu", () => {
  it("opens, exposes role=menu, and selects via item click", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(
      <DropdownMenu trigger="Actions">
        <MenuLabel>Row actions</MenuLabel>
        <MenuSeparator />
        <MenuItem onSelect={onEdit}>Edit</MenuItem>
      </DropdownMenu>,
    );
    const trigger = screen.getByRole("button", { name: /Actions/ });
    await user.click(trigger);
    const menu = screen.getByRole("menu");
    const edit = within(menu).getByRole("menuitem", { name: "Edit" });
    await user.click(edit);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape and returns focus to trigger", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu trigger="More">
        <MenuItem>Only</MenuItem>
      </DropdownMenu>,
    );
    const trigger = screen.getByRole("button", { name: /More/ });
    await user.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
    expect(trigger).toHaveFocus();
  });
});

describe("ContextMenu", () => {
  it("opens on contextmenu and closes on Escape", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ContextMenu>
        <div>Row surface</div>
        <MenuItem onSelect={onSelect}>Rename</MenuItem>
        <MenuItem danger onSelect={onSelect}>
          Delete
        </MenuItem>
      </ContextMenu>,
    );
    // Simulate a right-click via Shift+F10 (keyboard-equivalent) — React
    // synthetic events in jsdom don't bubble native contextmenu onto the
    // onContextMenu handler, so the keydown path is the reliable one here.
    const host = screen
      .getByText("Row surface")
      .closest<HTMLDivElement>("div[data-ease='context-menu-host']")!;
    host.focus();
    await user.keyboard("{Shift>}{F10}{/Shift}");
    expect(screen.getByRole("menu")).toBeInTheDocument();
    const rename = within(screen.getByRole("menu")).getByRole("menuitem", {
      name: "Rename",
    });
    await user.click(rename);
    expect(onSelect).toHaveBeenCalled();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("opens on Shift+F10 for keyboard users", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ContextMenu>
        <div data-testid="surface">
          <span>Row</span>
        </div>
        <MenuItem onSelect={onSelect}>Open</MenuItem>
      </ContextMenu>,
    );
    const host = screen
      .getByTestId("surface")
      .closest<HTMLDivElement>("div[data-ease='context-menu-host']")!;
    host.focus();
    await user.keyboard("{Shift>}{F10}{/Shift}");
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});

describe("CommandMenu", () => {
  it("filters items by query and activates with Enter", async () => {
    const user = userEvent.setup();
    const onSelectCreate = vi.fn();
    render(
      <CommandMenu
        open
        onClose={() => {}}
        items={[
          { id: "create", label: "Create resource", onSelect: onSelectCreate },
          {
            id: "delete",
            label: "Delete resource",
            keywords: ["remove"],
            onSelect: vi.fn(),
          },
        ]}
      />,
    );
    const input = screen.getByRole("textbox", { name: "Search commands" });
    await user.type(input, "create");
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent("Create resource");
    await user.keyboard("{Enter}");
    expect(onSelectCreate).toHaveBeenCalled();
  });
});

describe("ConfirmDialog", () => {
  it("renders a destructive confirm and safe cancel", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    render(
      <ConfirmDialog
        open
        onClose={onClose}
        onConfirm={onConfirm}
        title="Delete deployment"
        description="The deployment will be removed."
      />,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});

describe("Drawer", () => {
  it("renders an anchored modal", () => {
    render(
      <Drawer open onClose={() => {}} side="end" aria-label="Properties">
        <DrawerHeader>
          <DrawerTitle>Properties</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>Details here</DrawerBody>
      </Drawer>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Properties",
    );
    expect(screen.getByText("Details here")).toBeInTheDocument();
  });
});
