import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// React 19 requires IS_REACT_ACT_ENVIRONMENT to be true in the global scope
// for `act` to work. @testing-library/react does not set this in vitest +
// React 19 out of the box. We must mark it writable so RTL can restore it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as Record<string, any>).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  // Reset any environment stubs between tests.
  vi.unstubAllEnvs?.();
});
