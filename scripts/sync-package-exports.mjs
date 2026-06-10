#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const coreRoot = join(root, "packages/core");
const srcDir = join(coreRoot, "src");
const packagePath = join(coreRoot, "package.json");
const publicCreateEntries = new Set(["createUpdateEffect"]);

function isPublicEntry(name) {
  return name.startsWith("use") || publicCreateEntries.has(name);
}

function listPublicEntries() {
  return readdirSync(srcDir)
    .filter(isPublicEntry)
    .filter((name) => {
      const entry = join(srcDir, name);
      try {
        return statSync(entry).isDirectory();
      } catch {
        return false;
      }
    })
    .filter((name) => {
      return existsSync(join(srcDir, name, "index.ts")) || existsSync(join(srcDir, name, "index.tsx"));
    })
    .sort();
}

const pkg = JSON.parse(readFileSync(packagePath, "utf8"));
const exportsMap = {
  ".": {
    types: "./dist/index.d.ts",
    import: "./dist/index.js",
  },
};

for (const entry of listPublicEntries()) {
  exportsMap[`./${entry}`] = {
    types: `./dist/${entry}/index.d.ts`,
    import: `./dist/${entry}/index.js`,
  };
}

pkg.exports = exportsMap;

writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
