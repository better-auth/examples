import { defineConfig } from "tsdown";

export default defineConfig({
    format: ["esm", "cjs"],
    dts: true,
    entry: [
        "./src/index.ts",
        "./src/client/react.ts",
        "./src/client/solid.ts",
        "./src/types.ts",
    ],
    external: ["better-auth", "solid-js"],
})