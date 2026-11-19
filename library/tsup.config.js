import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm", "cjs"],
  clean: true,
  dts: false,
  entry: [
    "src/index.js",
    "src/utils/browser/index.ts",
    "src/utils/performance/index.ts",
    "src/utils/general/index.ts",
  ],
  external: ["react"],
});
