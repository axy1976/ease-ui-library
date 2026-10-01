import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "../../utils";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

/** Semantic link with library focus/underline treatment. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cn("ease-link", className)}
      data-ease="link"
      {...rest}
    />
  );
});
