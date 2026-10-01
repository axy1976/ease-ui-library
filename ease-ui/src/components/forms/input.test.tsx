import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./input";
import { Field } from "./field";

describe("Input", () => {
  it("renders a plain input with the md size", () => {
    render(<Input placeholder="Email" />);
    const el = screen.getByPlaceholderText("Email");
    expect(el).toHaveAttribute("data-ease", "input");
    expect(el).toHaveAttribute("data-size", "md");
  });

  it("inherits its id, label, and description from a wrapping Field", () => {
    const { container } = render(
      <Field label="Project name" description="Short internal id.">
        <Input placeholder="Project" />
      </Field>,
    );
    const input = screen.getByPlaceholderText("Project");
    const label = screen.getByText("Project name");
    expect(input).toHaveAttribute("id");
    expect(label).toHaveAttribute("for", input.getAttribute("id"));
    // description is wired through aria-describedby
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(container.querySelector(`#${describedBy}`)).toHaveTextContent(
      "Short internal id.",
    );
  });

  it("wires an error message and marks itself invalid", () => {
    const { container } = render(
      <Field label="Name" error="Required">
        <Input placeholder="Name" />
      </Field>,
    );
    const input = screen.getByPlaceholderText("Name");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-invalid", "true");
    const message = screen.getByRole("alert");
    expect(message).toHaveTextContent("Required");
    expect(
      container.querySelector(`#${input.getAttribute("aria-describedby")!}`),
    ).toBe(message);
  });

  it("respects the disabled state", () => {
    render(<Input disabled placeholder="Locked" />);
    expect(screen.getByPlaceholderText("Locked")).toBeDisabled();
  });
});
