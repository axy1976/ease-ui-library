import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("renders a decorative spinner by default", () => {
    render(<Spinner size="sm" />);
    const el = document.querySelector<SVGSVGElement>('[data-ease="spinner"]');
    expect(el).not.toBeNull();
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveAttribute("data-size", "sm");
  });

  it("exposes an accessible status when a label is provided", () => {
    render(<Spinner label="Saving" />);
    expect(screen.getByRole("status", { name: "Saving" })).toBeInTheDocument();
  });
});
