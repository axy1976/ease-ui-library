import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

function renderDialog(onClose = vi.fn()) {
  return render(
    <Dialog open onClose={onClose} aria-label="Delete resource">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resource</DialogTitle>
          <DialogDescription>This cannot be undone.</DialogDescription>
          <DialogClose />
        </DialogHeader>
        <DialogBody>Are you sure?</DialogBody>
        <DialogFooter>
          <DialogCloseButton>Delete</DialogCloseButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  );
}

describe("Dialog", () => {
  it("renders a modal dialog with an accessible name", () => {
    renderDialog();
    const dialog = screen.getByRole("dialog", { name: "Delete resource" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderDialog(onClose);
    (document.activeElement as HTMLElement | null)?.blur?.();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("closes via the footer button", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderDialog(onClose);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("renders nothing when closed", () => {
    render(
      <Dialog open={false} onClose={() => {}} aria-label="Hidden">
        <DialogContent>
          <DialogTitle>Hidden</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("announces modal semantics", () => {
    renderDialog();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    // Header/footer/body slots are present for composition.
    expect(dialog.querySelector('[data-ease-dialog="header"]')).not.toBeNull();
    expect(dialog.querySelector('[data-ease-dialog="footer"]')).not.toBeNull();
  });
});
