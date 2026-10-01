import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface SectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  title?: ReactNode;
  /** Small helper line under the title. */
  description?: ReactNode;
  /** Right-aligned actions in the section header. */
  actions?: ReactNode;
  /** Render the header row at all (omit for a bare stacked section). */
  showHeader?: boolean;
}

/**
 * Named region within a page: title + optional description + actions, then
 * content. Use several per page to structure a dashboard without cards.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    title,
    description,
    actions,
    showHeader = Boolean(title || actions),
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <section
      ref={ref as never}
      className={cn("ease-section", className)}
      data-ease="section"
      {...(rest as object)}
    >
      {showHeader ? (
        <div data-ease-section="header">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 0,
            }}
          >
            {title ? (
              <h2
                data-ease-section="title"
                style={{
                  fontSize: "var(--ease-font-size-md)",
                  fontWeight: "var(--ease-font-weight-semibold)",
                  margin: 0,
                }}
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p
                style={{
                  fontSize: "var(--ease-font-size-xs)",
                  color: "var(--ease-color-text-muted)",
                  margin: 0,
                }}
              >
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div data-ease-section="actions">{actions}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
});

/** Aliases for the spec's naming. */
export const SectionHeader = (p: { title: ReactNode; actions?: ReactNode }) => (
  <div data-ease-section="header">
    <h2
      data-ease-section="title"
      style={{
        fontSize: "var(--ease-font-size-md)",
        fontWeight: "var(--ease-font-weight-semibold)",
        margin: 0,
      }}
    >
      {p.title}
    </h2>
    {p.actions ? <div data-ease-section="actions">{p.actions}</div> : null}
  </div>
);
export const SectionActions = (p: { children: ReactNode }) => (
  <div data-ease-section="actions">{p.children}</div>
);
