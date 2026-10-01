import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Collapse, Accordion, type AccordionItem } from "./collapse";

describe("Collapse", () => {
  it("renders a disclosure button wired to its region", () => {
    render(
      <Collapse header="Network settings">
        <div>Body</div>
      </Collapse>,
    );
    const button = screen.getByRole("button", { name: "Network settings" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("data-ease-collapse", "header");
    const panelId = button.getAttribute("aria-controls")!;
    const region = document.getElementById(panelId);
    expect(region).not.toBeNull();
    expect(region).toHaveAttribute("hidden");
  });

  it("opens on click and reveals the region", async () => {
    const user = userEvent.setup();
    render(
      <Collapse header="Details" defaultOpen>
        <p>Shown body</p>
      </Collapse>,
    );
    const button = screen.getByRole("button", { name: "Details" });
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Shown body")).toBeVisible();
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Shown body")).not.toBeVisible();
  });

  it("stays in the uncontrolled state after external re-render when uncontrolled", () => {
    const onOpenChange = vi.fn();
    render(
      <Collapse header="X" defaultOpen onOpenChange={onOpenChange}>
        <div>Y</div>
      </Collapse>,
    );
    const button = screen.getByRole("button", { name: "X" });
    fireEvent.click(button);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("respects disabled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Collapse header="Locked" disabled onOpenChange={onOpenChange}>
        <div>Body</div>
      </Collapse>,
    );
    const button = screen.getByRole("button", { name: "Locked" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("hides the chevron when showIcon is false", () => {
    const { container } = render(
      <Collapse header="No chevron" showIcon={false}>
        <div>Body</div>
      </Collapse>,
    );
    expect(
      container.querySelector('[data-ease-collapse="chevron"]'),
    ).toBeNull();
  });
});

describe("Accordion", () => {
  const items: AccordionItem[] = [
    { id: "a", header: "A", content: <span>content-a</span> },
    { id: "b", header: "B", content: <span>content-b</span> },
    { id: "c", header: "C", content: <span>content-c</span> },
  ];

  it("opens a single item and closes the others", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultValue="a" />);
    const a = screen.getByRole("button", { name: "A" });
    const b = screen.getByRole("button", { name: "B" });
    expect(a).toHaveAttribute("aria-expanded", "true");
    expect(b).toHaveAttribute("aria-expanded", "false");
    await user.click(b);
    expect(a).toHaveAttribute("aria-expanded", "false");
    expect(b).toHaveAttribute("aria-expanded", "true");
  });

  it("allows multiple items open at once when multiple is set", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} multiple defaultValue={["a"]} />);
    const a = screen.getByRole("button", { name: "A" });
    const b = screen.getByRole("button", { name: "B" });
    await user.click(b);
    expect(a).toHaveAttribute("aria-expanded", "true");
    expect(b).toHaveAttribute("aria-expanded", "true");
  });

  it("reports a single string in single mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Accordion items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "C" }));
    expect(onValueChange).toHaveBeenLastCalledWith("c");
  });

  it("reports an array in multiple mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Accordion
        items={items}
        multiple
        defaultValue={["a"]}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "B" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["a", "b"]);
  });

  it("supports controlled value", () => {
    render(<Accordion items={items} value="b" />);
    expect(screen.getByRole("button", { name: "B" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
