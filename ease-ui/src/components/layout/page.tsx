import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { Breadcrumb } from "../navigation/breadcrumb";
import type { BreadcrumbItem } from "../navigation/breadcrumb";

export interface PageProps extends HTMLAttributes<HTMLDivElement> {
  /** Contextual trail above the header. */
  breadcrumb?: BreadcrumbItem[];
}

/**
 * Top-level page scaffold: a centered, max-width column with standard gaps
 * between header and content. This is the frame every console page uses.
 */
export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  { breadcrumb, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("ease-page", className)}
      data-ease="page"
      {...rest}
    >
      {breadcrumb ? <Breadcrumb items={breadcrumb} /> : null}
      {children}
    </div>
  );
});

export interface PageHeaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned actions (primary CTA + secondary). */
  actions?: ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  function PageHeader(
    { title, description, actions, className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn("ease-page-header", className)}
        data-ease="page-header"
        {...rest}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 0,
          }}
        >
          <h1
            data-ease-page="title"
            style={{
              fontSize: "var(--ease-font-size-xl)",
              fontWeight: "var(--ease-font-weight-semibold)",
              lineHeight: "var(--ease-leading-tight)",
              letterSpacing: "var(--ease-tracking-wide)",
              margin: 0,
            }}
          >
            {title}
          </h1>
          {description ? (
            <p
              data-ease-page="description"
              style={{
                fontSize: "var(--ease-font-size-sm)",
                color: "var(--ease-color-text-muted)",
                margin: 0,
              }}
            >
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div data-ease-page="actions">{actions}</div> : null}
      </div>
    );
  },
);

/** Named aliases matching the spec's PageTitle / PageActions vocabulary. */
export const PageTitle = (p: { children: ReactNode }) => (
  <h1
    data-ease-page="title"
    style={{
      fontSize: "var(--ease-font-size-xl)",
      fontWeight: "var(--ease-font-weight-semibold)",
      margin: 0,
    }}
  >
    {p.children}
  </h1>
);
export const PageActions = (p: { children: ReactNode }) => (
  <div data-ease-page="actions">{p.children}</div>
);
export const PageContent = (p: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--ease-spacing-6)",
    }}
  >
    {p.children}
  </div>
);
