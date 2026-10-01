import Link from "next/link";
import { Button, EmptyState } from "ease-ui";

export default function NotFound() {
  return (
    <div
      className="ease-docs-prose"
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "var(--ease-spacing-8)",
      }}
    >
      <EmptyState
        title="Page not found"
        description="The page you’re looking for doesn’t exist or was moved."
        action={<Link href="/">Back to the docs</Link>}
      />
    </div>
  );
}
