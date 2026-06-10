import { existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { defineConfig } from "tsup";

const srcDir = "src";
const publicCreateEntries = new Set(["createUpdateEffect"]);

const hookEntries: Record<string, string> = Object.fromEntries(
  readdirSync(srcDir)
    .filter((name) => name.startsWith("use") || publicCreateEntries.has(name))
    .filter((name) => {
      const entry = join(srcDir, name);
      try {
        return statSync(entry).isDirectory();
      } catch {
        return false;
      }
    })
    .sort()
    .map((name) => {
      const indexPath = existsSync(join(srcDir, name, "index.tsx"))
        ? `${srcDir}/${name}/index.tsx`
        : `${srcDir}/${name}/index.ts`;

      return [`${name}/index`, indexPath];
    }),
);

export default defineConfig({
  entry: {
    index: "src/index.ts",
    ...hookEntries,
  },
  format: ["esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  splitting: true,
  treeshake: true,
  target: "esnext",
  external: ["preact", "preact/hooks", "preact/jsx-runtime"],
  esbuildOptions(options) {
    options.alias = {
      ...options.alias,
      "#types": resolve(__dirname, "src/utils/types-compat.ts")
    };
  }
});
