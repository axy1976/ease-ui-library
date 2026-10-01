import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast } from "./toast-card";
import { Callout } from "./callout";
import { Banner } from "./banner";

describe("Toast", () => {
  it("renders a status + body + action", () => {
    render(
      <Toast status="success" title="Saved" action={<button>Undo</button>}>
        Your changes were saved.
      </Toast>,
    );
    expect(screen.getByRole("status")).toHaveAttribute(
      "data-status",
      "success",
    );
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes were saved.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });

  it("fires onDismiss from the close button", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Toast title="Note" onDismiss={onDismiss}>
        Body
      </Toast>,
    );
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it("omits the body when there are no children", () => {
    const { container } = render(<Toast title="One-liner" />);
    expect(container.querySelector('[data-ease-toast="body"]')).toBeNull();
  });
});

describe("Callout", () => {
  it("renders a titled note with a body", () => {
    render(
      <Callout status="info" title="Heads up">
        The deployment will be interrupted.
      </Callout>,
    );
    expect(screen.getByRole("note")).toHaveAttribute("data-status", "info");
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(
      screen.getByText("The deployment will be interrupted."),
    ).toBeInTheDocument();
  });

  it("renders as role=alert for danger", () => {
    render(
      <Callout status="danger" title="Error">
        Body
      </Callout>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});

describe("Banner", () => {
  it("renders a strip with tone + actions", () => {
    render(
      <Banner
        tone="warning"
        title="Maintenance"
        action={<button>Details</button>}
      >
        02:00–04:00 UTC
      </Banner>,
    );
    expect(screen.getByRole("status")).toHaveAttribute("data-tone", "warning");
    expect(screen.getByText("Maintenance")).toBeInTheDocument();
    expect(screen.getByText("02:00–04:00 UTC")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Details" })).toBeInTheDocument();
  });
});
