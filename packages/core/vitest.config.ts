import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@testing-library\/preact$/,
        replacement: resolve(rootDir, "src/test/testing-library-preact.ts"),
      },
      { find: "src", replacement: resolve(rootDir, "src") },
      { find: "#types", replacement: resolve(rootDir, "src/utils/types-compat.ts") },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/__tests__/*.spec.ts", "src/**/__tests__/*.spec.tsx"],
    reporters: ["default"]
  }
});
