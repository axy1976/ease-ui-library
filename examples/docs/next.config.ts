import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
// Resolve the library from its TypeScript source so the App Router honors each
// component's own "use client" directive (server-safe components stay server).
const easeUi = path.join(here, "..", "..", "ease-ui");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ease-ui"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "ease-ui": path.join(easeUi, "src", "index.ts"),
    };
    // Map the bundled CSS bundle to the source stylesheet.
    config.resolve.alias["ease-ui/styles"] = path.join(easeUi, "src", "styles");
    return config;
  },
};

export default nextConfig;
