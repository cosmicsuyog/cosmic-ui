import { defineConfig } from "tsup";


export default defineConfig({
    format: ["esm", "cjs"],
    clean: true,
    dts: false,
    entry: ["src/index.js"],
    external: ["react"],
})