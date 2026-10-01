import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Field } from "./field";
import { Input } from "./input";
import { Select } from "./select";
import { Switch } from "./switch";
import { Checkbox } from "./checkbox";
import { RadioGroup, Radio } from "./radio";

describe("Field composition", () => {
  it("links label to a Select control and passes description", () => {
    const { container } = render(
      <Field label="Region" description="Where the resource lives.">
        <Select
          placeholder="Choose…"
          options={[{ value: "us", label: "US East" }]}
        />
      </Field>,
    );
    const select = screen.getByRole("combobox");
    expect(screen.getByText("Region")).toHaveAttribute(
      "for",
      select.getAttribute("id"),
    );
    expect(
      container.querySelector(`#${select.getAttribute("aria-describedby")!}`),
    ).toHaveTextContent("Where the resource lives.");
  });

  it("renders a required marker and required attribute", () => {
    render(
      <Field label="Name" required>
        <Input placeholder="Name" />
      </Field>,
    );
    expect(screen.getByPlaceholderText("Name")).toBeRequired();
  });

  it("disables the control when the field is disabled", () => {
    render(
      <Field label="Email" disabled>
        <Input placeholder="Email" />
      </Field>,
    );
    expect(screen.getByPlaceholderText("Email")).toBeDisabled();
  });

  it("shows a role=alert error wired via aria-describedby", () => {
    const { container } = render(
      <Field label="API key" error="Key is invalid">
        <Input placeholder="Key" />
      </Field>,
    );
    const input = screen.getByPlaceholderText("Key");
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Key is invalid");
    expect(
      container.querySelector(`#${input.getAttribute("aria-describedby")!}`),
    ).toBe(alert);
  });
});

describe("Switch", () => {
  it("toggles on click and announces state", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Field label="Autoscaling">
        <Switch
          onChange={(checked) => onChange(checked)}
          label="Enable autoscaling"
        />
      </Field>,
    );
    const input = screen.getByRole("switch") as HTMLInputElement;
    expect(input.checked).toBe(false);
    await user.click(input);
    expect(input.checked).toBe(true);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("Checkbox", () => {
  it("checks on click and supports indeterminate", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    await user.click(input);
    expect(input.checked).toBe(true);
  });
});

describe("RadioGroup", () => {
  it("selects the checked option and reports the value", async () => {
    const user = userEvent.setup();
    let selected: string | null = null;
    render(
      <RadioGroup label="Visibility" onValueChange={(v) => (selected = v)}>
        <Radio value="public" label="Public" />
        <Radio value="private" label="Private" />
      </RadioGroup>,
    );
    await user.click(screen.getByLabelText("Private"));
    expect((screen.getByLabelText("Private") as HTMLInputElement).checked).toBe(
      true,
    );
    expect(selected).toBe("private");
  });
});
