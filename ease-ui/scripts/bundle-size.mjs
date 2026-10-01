#!/usr/bin/env node
/**
 * Bundle-size report + CI gate.
 *
 * Measures the built `dist/` output and compares it against the thresholds
 * below. Fails (non-zero exit) when a budget is exceeded, so CI can block a PR
 * that bloats the library without justification.
 *
 * Run with: `npm run size`  (build first: `npm run build`)
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, "..", "dist");

// Realistic v0.1.0 budgets (uncompressed, as built by tsup — minified is ~1/3).
// These track the *unminified* ESM + CSS totals so the gate is stable across
// tooling. Bump deliberately, with a note in the PR, when justified.
const BUDGET = {
  jsTotalKB: 160, // all dist/**/*.js (uncompressed)
  jsMaxFileKB: 145, // largest single JS file (guards the root barrel)
  cssTotalKB: 120, // all dist/styles/*.css
};

function sizeKB(file) {
  try {
    return readFileSync(file).length / 1024;
  } catch {
    return 0;
  }
}

function walkSync(dir, ext) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walkSync(full, ext));
    else if (entry.endsWith(ext) && !entry.endsWith(".map")) out.push(full);
  }
  return out;
}

const jsFiles = walkSync(dist, ".js");
const cssFiles = walkSync(join(dist, "styles"), ".css");

const jsTotal = jsFiles.reduce((s, f) => s + sizeKB(f), 0);
const jsMax = jsFiles.reduce((m, f) => Math.max(m, sizeKB(f)), 0);
const cssTotal = cssFiles.reduce((s, f) => s + sizeKB(f), 0);

console.log("\nEase UI bundle size report\n");
console.log(
  `  JS  files: ${jsFiles.length},  total ${jsTotal.toFixed(1)} KB,  largest ${jsMax.toFixed(1)} KB`,
);
console.log(
  `  CSS files: ${cssFiles.length},  total ${cssTotal.toFixed(1)} KB`,
);
console.log("");

const checks = [
  { name: "JS total", actual: jsTotal, budget: BUDGET.jsTotalKB },
  { name: "JS largest file", actual: jsMax, budget: BUDGET.jsMaxFileKB },
  { name: "CSS total", actual: cssTotal, budget: BUDGET.cssTotalKB },
];

let failed = false;
for (const c of checks) {
  const ok = c.actual <= c.budget;
  console.log(
    `  [${ok ? "PASS" : "FAIL"}] ${c.name}: ${c.actual.toFixed(1)} KB (budget ${c.budget} KB)`,
  );
  if (!ok) failed = true;
}

if (failed) {
  console.error(
    "\nBundle size budget exceeded. Justify the increase in the PR or trim it.",
  );
  process.exit(1);
}
console.log("\nAll bundle size checks passed.\n");
