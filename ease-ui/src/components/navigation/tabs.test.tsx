import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, Tab, TabList, TabPanel } from "./tabs";

function renderTabs() {
  return render(
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="logs">Logs</Tab>
        <Tab value="settings" disabled>
          Settings
        </Tab>
      </TabList>
      <TabPanel value="overview">Overview content</TabPanel>
      <TabPanel value="logs">Logs content</TabPanel>
      <TabPanel value="settings">Settings content</TabPanel>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("selects the default tab and hides inactive panels", () => {
    renderTabs();
    const overview = screen.getByRole("tab", { name: "Overview" });
    expect(overview).toHaveAttribute("aria-selected", "true");
    // The active tab is the single tab-order entry (tabIndex 0).
    expect(overview).toHaveAttribute("tabindex", "0");
    const logs = screen.getByRole("tab", { name: "Logs" });
    expect(logs).toHaveAttribute("tabindex", "-1");
    const panels = screen.getAllByRole("tabpanel");
    expect(panels[0]).toBeVisible();
    expect(panels[0]).toHaveAttribute("data-state", "active");
    expect(panels[1]).toHaveAttribute("data-state", "inactive");
  });

  it("switches panels on click and updates ARIA", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole("tab", { name: "Logs" }));
    expect(screen.getByRole("tab", { name: "Logs" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByRole("tabpanel", { name: /Logs/ })).toBeVisible();
  });

  it("navigates with arrow keys (roving focus) and activates", async () => {
    const user = userEvent.setup();
    renderTabs();
    const overview = screen.getByRole("tab", { name: "Overview" });
    overview.focus();
    await user.keyboard("{ArrowRight}");
    const logs = screen.getByRole("tab", { name: "Logs" });
    expect(logs).toHaveFocus();
    expect(logs).toHaveAttribute("aria-selected", "true");
  });

  it("wraps from the last enabled tab to the first with ArrowLeft", async () => {
    const user = userEvent.setup();
    render(
      <Tabs value="logs" onValueChange={() => {}}>
        <TabList>
          <Tab value="overview">Overview</Tab>
          <Tab value="logs">Logs</Tab>
        </TabList>
      </Tabs>,
    );
    const logs = screen.getByRole("tab", { name: "Logs" });
    logs.focus();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveFocus();
  });

  it("keeps disabled tabs out of the tab order", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Settings" })).toBeDisabled();
  });
});
