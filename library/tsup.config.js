import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm", "cjs"],
  clean: true,
  dts: false,
  entry: [
    "src/index.js",
    "src/utils/browser/index.ts",
    "src/utils/browser/clipboard.ts",
    "src/utils/browser/storage.ts",
    "src/utils/performance/index.ts",
    "src/utils/performance/debounce.ts",
    "src/utils/performance/throttle.ts",
    "src/utils/general/index.ts",
    "src/utils/general/otp.ts",
  ],
  external: ["react"],
});
