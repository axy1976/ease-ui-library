import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Button", () => {
  it("renders with the default secondary variant and md size", () => {
    render(<Button>Save</Button>);
    const btn = screen.getByRole("button", { name: "Save" });
    expect(btn).toHaveAttribute("data-variant", "secondary");
    expect(btn).toHaveAttribute("data-size", "md");
  });

  it("applies the requested variant and size", () => {
    render(
      <Button variant="primary" size="sm">
        Deploy
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Deploy" });
    expect(btn).toHaveAttribute("data-variant", "primary");
    expect(btn).toHaveAttribute("data-size", "sm");
  });

  it("is disabled and inert when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Nope" });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("data-disabled", "true");
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is inert and announces busy while loading", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button loading onClick={onClick}>
        Deploy
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Deploy" });
    expect(btn).toHaveAttribute("data-state", "loading");
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toBeDisabled();
    // label must remain in the DOM so the layout does not jump
    expect(btn).toHaveTextContent("Deploy");
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("fires onClick when enabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders an icon and honors iconPosition", () => {
    render(
      <Button icon={<span data-icon="plus" />} iconPosition="end">
        Add
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Add" });
    const icon = btn.querySelector("[data-icon]");
    expect(icon).not.toBeNull();
    // icon comes after the text node
    expect(btn.lastElementChild?.querySelector("[data-icon]")).not.toBeNull();
  });

  it("defaults to type=button to avoid accidental form submission", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("warns in dev when an icon-only button lacks an accessible name", () => {
    // Spy before render: the warning fires synchronously from the ref callback
    // when the button mounts with no visible text and no aria-label.
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Button>{<span data-icon="x" />}</Button>);
    expect(spy).toHaveBeenCalled();
  });
});
