import { defineConfig } from "tsdown";

export default defineConfig({
    format: ["esm", "cjs"],
    entry: [
        "./src/index.ts",
        "./src/utils.ts",
        "./src/env.ts",
    ],
    dts: true,
})