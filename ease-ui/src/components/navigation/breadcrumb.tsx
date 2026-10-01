import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type NavigationElement = HTMLElement;
import { cn } from "../../utils";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  /** Final segment: rendered as a plain current-location marker. */
  current?: boolean;
}

export interface BreadcrumbProps extends HTMLAttributes<NavigationElement> {
  items: BreadcrumbItem[];
  /** Prefix label read by screen readers, e.g. "Breadcrumbs". */
  label?: string;
}

/**
 * Contextual location trail. The last item is announced as the current page;
 * earlier items are links. Use in a page header for orienting the user.
 */
export const Breadcrumb = forwardRef<NavigationElement, BreadcrumbProps>(
  function Breadcrumb(
    { items, label = "Breadcrumb", className, ...rest },
    ref,
  ) {
    return (
      <nav
        ref={ref as never}
        aria-label={label}
        className={cn("ease-breadcrumb", className)}
        data-ease="breadcrumb"
        {...(rest as object)}
      >
        <ol>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i}>
                {item.href && !item.current ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    data-current={isLast ? "true" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);
