import {
  Children,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";

export interface ListProps extends HTMLAttributes<
  HTMLUListElement | HTMLOListElement
> {
  ordered?: boolean;
  divided?: boolean;
  bulleted?: boolean;
}

export function List({
  ordered,
  divided,
  bulleted,
  className,
  children,
  ...rest
}: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={cn("ease-list", className)}
      data-ease="list"
      data-divided={divided ? "true" : undefined}
      data-bulleted={bulleted ? "true" : undefined}
      {...(rest as React.HTMLAttributes<HTMLOListElement>)}
    >
      {Children.map(children, (child) =>
        isValidElement(child) ? (
          <li
            data-ease-list="item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ease-spacing-2)",
              minHeight: divided ? "2.5rem" : undefined,
              paddingBlock: divided ? "var(--ease-spacing-2)" : 0,
            }}
          >
            {child}
          </li>
        ) : (
          child
        ),
      )}
    </Tag>
  );
}

export const ListItem = forwardRef<HTMLLIElement, { children: ReactNode }>(
  function ListItem({ children }, ref) {
    // Only used when the consumer composes <li> manually.
    return <li ref={ref}>{children}</li>;
  },
);
