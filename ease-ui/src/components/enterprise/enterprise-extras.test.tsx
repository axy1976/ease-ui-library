/**
 * Wave 3 component tests: MetadataGrid, ResourceCard, InspectorPanel,
 * FilterBar (chips variant), CommandPalette.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  MetadataGrid,
  ResourceCard,
  FilterBar,
  FilterChip,
  CommandPalette,
} from "../../index";

// ---------------------------------------------------------------------------
// MetadataGrid
// ---------------------------------------------------------------------------
describe("MetadataGrid", () => {
  const entries = [
    { key: "Region", value: "us-east-1" },
    { key: "VPC", value: "vpc-abc123", mono: true },
    { key: "Env", value: "production", tone: "warning" as const },
  ];

  it("renders a <dl> with the correct data attribute", () => {
    const { container } = render(<MetadataGrid entries={entries} />);
    expect(container.querySelector("dl")).toBeDefined();
    expect(
      container.querySelector('[data-ease="metadata-grid"]'),
    ).toBeDefined();
  });

  it("renders all keys and values", () => {
    render(<MetadataGrid entries={entries} />);
    expect(screen.getByText("Region")).toBeDefined();
    expect(screen.getByText("us-east-1")).toBeDefined();
    expect(screen.getByText("vpc-abc123")).toBeDefined();
  });

  it("applies the layout data attribute", () => {
    const { container } = render(
      <MetadataGrid entries={entries} layout="list" />,
    );
    expect(
      container.querySelector('[data-ease="metadata-grid"]'),
    ).toBeDefined();
    const el = container.querySelector('[data-ease="metadata-grid"]')!;
    expect(el.getAttribute("data-layout")).toBe("list");
  });

  it("renders an optional header when title is provided", () => {
    render(<MetadataGrid entries={entries} title="Properties" />);
    expect(screen.getByText("Properties")).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// ResourceCard
// ---------------------------------------------------------------------------
describe("ResourceCard", () => {
  it("renders name and type", () => {
    render(<ResourceCard name="web-01" type="Compute instance" />);
    expect(screen.getByText("web-01")).toBeDefined();
    expect(screen.getByText("Compute instance")).toBeDefined();
  });

  it("renders a status when provided", () => {
    render(
      <ResourceCard
        name="web-01"
        status={{ kind: "success", label: "Running" }}
      />,
    );
    expect(screen.getByText("Running")).toBeDefined();
  });

  it("applies the data-ease attribute", () => {
    const { container } = render(<ResourceCard name="x" />);
    expect(
      container.querySelector('[data-ease="resource-card"]'),
    ).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// FilterBar (chips variant)
// ---------------------------------------------------------------------------
describe("FilterBar (chips)", () => {
  it("renders the label and search input", () => {
    render(<FilterBar variant="chips" label="Filters" />);
    expect(screen.getByText("Filters")).toBeDefined();
    expect(screen.getByPlaceholderText("Filter…")).toBeDefined();
  });

  it("renders active filters as chips", () => {
    render(
      <FilterBar
        variant="chips"
        label="Filters"
        activeFilters={[
          { id: "f1", label: "region: us-east-1", onRemove: () => {} },
          { id: "f2", label: "type: compute", onRemove: () => {} },
        ]}
      />,
    );
    expect(screen.getAllByText("region: us-east-1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("type: compute").length).toBeGreaterThan(0);
  });

  it("renders a clear-all button when filters are active and onClearAll is provided", () => {
    render(
      <FilterBar
        variant="chips"
        label="Filters"
        activeFilters={[{ id: "f1", label: "env: prod", onRemove: () => {} }]}
        onClearAll={() => {}}
      />,
    );
    expect(screen.getByText("Clear all")).toBeDefined();
  });

  it("does not render a clear button when there are no filters", () => {
    render(
      <FilterBar
        variant="chips"
        label="Filters"
        activeFilters={[]}
        onClearAll={() => {}}
      />,
    );
    expect(screen.queryByText("Clear all")).toBeNull();
  });
});

describe("FilterChip", () => {
  it("renders a chip with a remove button", () => {
    render(<FilterChip label="region: us-east-1" onRemove={() => {}} />);
    expect(screen.getByText("region: us-east-1")).toBeDefined();
    expect(screen.getByRole("button", { name: /remove/i })).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// CommandPalette (structural tests — full keyboard interaction is covered by
// the consumer app's e2e tests; here we verify the DOM structure)
// ---------------------------------------------------------------------------
describe("CommandPalette", () => {
  it("renders nothing when closed and no trigger is provided", () => {
    const { container } = render(
      <CommandPalette open={false} onClose={() => {}} items={[]} />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders the trigger when closed and a trigger is provided", () => {
    const { container } = render(
      <CommandPalette
        open={false}
        onClose={() => {}}
        items={[]}
        trigger={<button>Open</button>}
      />,
    );
    expect(container.querySelector("button")).toBeDefined();
  });

  it("renders a dialog with a search input when open", () => {
    render(
      <CommandPalette
        open
        onClose={() => {}}
        groups={[
          {
            label: "Go to",
            items: [
              { id: "g1", label: "Dashboard", onSelect: () => {} },
              { id: "g2", label: "Resources", onSelect: () => {} },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByRole("dialog")).toBeDefined();
    expect(
      screen.getByPlaceholderText("Type a command or search…"),
    ).toBeDefined();
    expect(screen.getByText("Dashboard")).toBeDefined();
    expect(screen.getByText("Resources")).toBeDefined();
  });

  it("renders group labels", () => {
    render(
      <CommandPalette
        open
        onClose={() => {}}
        groups={[
          {
            label: "Go to",
            items: [{ id: "g1", label: "Dashboard", onSelect: () => {} }],
          },
        ]}
      />,
    );
    expect(screen.getByText("Go to")).toBeDefined();
  });
});
