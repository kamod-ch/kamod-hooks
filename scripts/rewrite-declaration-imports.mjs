#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../packages/core/dist");
const typeCompatPath = join(distDir, "utils/types-compat");
const relativeImportPattern =
  /((?:from\s+|import\s*)["'])(\.{1,2}\/[^"']+)(["'])/g;
const inlineImportTypePattern = /(import\(["'])(\.{1,2}\/[^"']+)(["']\))/g;

function toSpecifier(fromFile, toPath) {
  const fromDir = dirname(fromFile);
  const relativePath = relative(fromDir, toPath).split(sep).join("/");
  return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
}

function listDeclarationFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      return listDeclarationFiles(path);
    }

    if (entry.isFile() && path.endsWith(".d.ts")) {
      return [path];
    }

    return [];
  });
}

function hasKnownExtension(specifier) {
  return /\.[cm]?js$|\.json$/.test(specifier);
}

function toNodeSpecifier(fromFile, specifier) {
  if (hasKnownExtension(specifier)) {
    return specifier;
  }

  const resolved = resolve(dirname(fromFile), specifier);

  if (existsSync(`${resolved}.d.ts`)) {
    return `${specifier}.js`;
  }

  if (existsSync(join(resolved, "index.d.ts"))) {
    return `${specifier}/index.js`;
  }

  return `${specifier}.js`;
}

for (const file of listDeclarationFiles(distDir)) {
  if (!statSync(file).isFile()) continue;

  let nextContent = readFileSync(file, "utf8");

  if (nextContent.includes("#types")) {
    const typeCompatSpecifier = toSpecifier(file, typeCompatPath);
    nextContent = nextContent.replaceAll(/(['"])#types\1/g, `$1${typeCompatSpecifier}$1`);
  }

  nextContent = nextContent.replaceAll(relativeImportPattern, (match, prefix, specifier, suffix) => {
    return `${prefix}${toNodeSpecifier(file, specifier)}${suffix}`;
  });
  nextContent = nextContent.replaceAll(inlineImportTypePattern, (match, prefix, specifier, suffix) => {
    return `${prefix}${toNodeSpecifier(file, specifier)}${suffix}`;
  });

  const content = readFileSync(file, "utf8");
  if (nextContent !== content) {
    writeFileSync(file, nextContent);
  }
}
