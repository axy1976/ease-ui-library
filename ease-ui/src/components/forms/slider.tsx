import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils";

export interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "disabled"
> {
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  /** Accessible name (label text or aria-label). */
  "aria-label"?: string;
}

/**
 * Range slider. Native input[type=range] gives keyboard, screen reader, and
 * touch behavior for free; we only style the track and thumb.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    min = 0,
    max = 100,
    step = 1,
    disabled,
    className,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  return (
    <div
      className={cn("ease-slider", className)}
      data-ease="slider"
      data-disabled={disabled ? "true" : undefined}
    >
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-label={ariaLabel}
        {...rest}
      />
    </div>
  );
});
