import { defineConfig } from "tsup";
import { cp, mkdir } from "node:fs/promises";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/button/index": "src/components/button/index.ts",
    "icons/index": "src/icons/index.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  treeshake: true,
  platform: "neutral",
  target: "es2022",
  outExtension: () => ({ js: ".js" }),
  external: ["react", "react-dom"],
  async onSuccess() {
    // Copy token/theme/component CSS into dist so package export paths resolve.
    await mkdir("dist/styles", { recursive: true });
    await cp("src/styles/tokens.css", "dist/styles/tokens.css");
    await cp("src/styles/themes.css", "dist/styles/themes.css");
    await cp("src/styles/components.css", "dist/styles/components.css");
    await cp("src/styles/ease-ui.css", "dist/styles/ease-ui.css");
  },
});
