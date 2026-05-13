import { resolve } from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "esnext",
  esbuildOptions(options) {
    options.alias = {
      ...options.alias,
      "#types": resolve(__dirname, "src/utils/types-compat.ts")
    };
  }
});
