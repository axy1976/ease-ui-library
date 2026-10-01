import Link from "next/link";
import { ErrorState } from "ease-ui";

export default function NotFound() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        padding: "var(--ease-spacing-6)",
      }}
    >
      <ErrorState
        title="Page not found"
        description="The resource you were looking for doesn't exist or may have been deleted."
        action={
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "var(--ease-control-height-md)",
              paddingInline: "var(--ease-spacing-4)",
              borderRadius: "var(--ease-radius-md)",
              background: "var(--ease-color-primary)",
              color: "var(--ease-color-on-primary)",
              fontSize: "var(--ease-font-size-sm)",
              fontWeight: "var(--ease-font-weight-medium)",
              textDecoration: "none",
            }}
          >
            Go to dashboard
          </Link>
        }
      />
    </div>
  );
}
