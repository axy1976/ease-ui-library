import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip, ChipGroup } from "./chip";
import { Stat as StatTile, MetricRow } from "./stat-tile";
import { KeyValue as KeyValueGrid } from "./key-value-grid";
import { Panel } from "../layout/panel";

describe("Chip", () => {
  it("renders a label with tone + variant", () => {
    render(
      <Chip tone="info" variant="soft">
        us-east-1
      </Chip>,
    );
    const el = screen.getByText("us-east-1").closest("[data-ease='chip']")!;
    expect(el).toHaveAttribute("data-tone", "info");
    expect(el).toHaveAttribute("data-variant", "soft");
  });

  it("fires onRemove from the remove button", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Chip onRemove={onRemove}>region:eu</Chip>);
    await user.click(screen.getByRole("button", { name: /Remove region:eu/ }));
    expect(onRemove).toHaveBeenCalled();
  });

  it("wraps a group of chips", () => {
    render(
      <ChipGroup>
        <Chip>a</Chip>
        <Chip>b</Chip>
      </ChipGroup>,
    );
    expect(screen.getAllByText("a").length).toBeGreaterThan(0);
    expect(screen.getAllByText("b").length).toBeGreaterThan(0);
  });
});

describe("StatTile", () => {
  it("renders label + value + delta", () => {
    render(<StatTile label="Requests" value="12.4k" delta={8} suffix="/s" />);
    expect(screen.getByText("Requests")).toBeInTheDocument();
    expect(screen.getByText("12.4k")).toBeInTheDocument();
    const delta = document.querySelector('[data-ease-stat="delta"]');
    expect(delta).not.toBeNull();
    expect(delta!.textContent).toContain("8");
  });

  it("MetricRow wraps its children in a grid", () => {
    render(
      <MetricRow>
        <StatTile label="A" value="1" />
        <StatTile label="B" value="2" />
      </MetricRow>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});

describe("KeyValueGrid", () => {
  it("renders a dl with dt/dd rows", () => {
    render(
      <KeyValueGrid
        rows={[
          { key: "Name", value: "api-gateway" },
          { key: "Region", value: "us-east-1", hint: "N. Virginia" },
        ]}
      />,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("api-gateway")).toBeInTheDocument();
    expect(screen.getByText("N. Virginia")).toBeInTheDocument();
  });

  it("renders a copy button when a row is copyable", () => {
    render(
      <KeyValueGrid
        rows={[{ key: "ARN", value: "arn:...", copyable: true }]}
      />,
    );
    expect(
      screen.getByRole("button", { name: /Copy ARN/ }),
    ).toBeInTheDocument();
  });
});

describe("Panel", () => {
  it("renders title + body + footer", () => {
    render(
      <Panel
        title="Properties"
        subtitle="api-gateway"
        footer={<button>Close</button>}
      >
        <p>Body content</p>
      </Panel>,
    );
    expect(screen.getByText("Properties")).toBeInTheDocument();
    expect(screen.getByText("api-gateway")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("collapses the body when toggled", async () => {
    const user = userEvent.setup();
    render(
      <Panel title="Settings" collapsible defaultOpen>
        <p>Hidden body</p>
      </Panel>,
    );
    expect(screen.getByText("Hidden body")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Collapse panel" }));
    expect(screen.queryByText("Hidden body")).toBeNull();
  });
});
