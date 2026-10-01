import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Example } from "./example";

describe("Example", () => {
  it("renders with the default shape", () => {
    render(<Example label="Hello">Body</Example>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("applies the data attribute for styling hooks", () => {
    const { container } = render(<Example>Body</Example>);
    expect(container.querySelector('[data-ease="example"]')).not.toBeNull();
  });

  it("accepts a className", () => {
    const { container } = render(<Example className="custom">Body</Example>);
    expect(container.firstChild).toHaveClass("custom");
  });

  // Add: keyboard behavior, ARIA, controlled/uncontrolled, responsive, dark mode.
});
