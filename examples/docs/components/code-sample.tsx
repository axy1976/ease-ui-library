import { CodeBlock } from "ease-ui";

/**
 * A documentation code sample. Uses the library's own CodeBlock primitive so
 * docs content and library content share one visual language.
 */
export function DocsCode({ title, code }: { title: string; code: string }) {
  return (
    <div style={{ marginBlock: "1rem" }}>
      <div
        style={{
          fontSize: "var(--ease-font-size-xs)",
          fontWeight: 500,
          color: "var(--ease-color-text-muted)",
          marginBottom: "var(--ease-spacing-2)",
        }}
      >
        {title}
      </div>
      <CodeBlock>{code}</CodeBlock>
    </div>
  );
}
