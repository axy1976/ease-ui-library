import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { CheckIcon } from "../../icons";

export interface StepperStep {
  label: ReactNode;
}

export interface StepperProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  steps: StepperStep[];
  /** 0-based index of the current step. */
  current: number;
  /** Optional on-step-click for completed steps (jumping back). */
  onStepClick?: (index: number) => void;
}

type StepState = "complete" | "current" | "upcoming";

/**
 * Linear progress indicator for multi-step flows. Steps before `current` are
 * complete, `current` is highlighted, the rest upcoming.
 */
export const Stepper = forwardRef<HTMLElement, StepperProps>(function Stepper(
  { steps, current, onStepClick, className, ...rest },
  ref,
) {
  return (
    <ol
      ref={ref as never}
      className={cn("ease-stepper", className)}
      data-ease="stepper"
      aria-label="Progress"
      {...rest}
    >
      {steps.map((step, i) => {
        const state: StepState =
          i < current ? "complete" : i === current ? "current" : "upcoming";
        const clickable = state === "complete" && onStepClick;
        const inner = (
          <>
            <span data-ease-step="marker" aria-hidden="true">
              {state === "complete" ? <CheckIcon size={12} /> : i + 1}
            </span>
            <span
              data-ease-step="label"
              aria-current={state === "current" ? "step" : undefined}
            >
              {step.label}
            </span>
          </>
        );
        return (
          <li
            key={i}
            data-ease-step
            data-state={state}
            style={clickable ? { cursor: "pointer" } : undefined}
            onClick={clickable ? () => onStepClick(i) : undefined}
          >
            {inner}
          </li>
        );
      })}
    </ol>
  );
});
