import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
      "#types": resolve(__dirname, "src/utils/types-compat.ts")
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/__tests__/*.spec.ts", "src/**/__tests__/*.spec.tsx"],
    reporters: ["default"]
  }
});
