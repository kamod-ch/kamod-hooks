#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve('..', '..')
const docsRoot = path.resolve('.')
const coreIndex = path.join(repoRoot, 'packages/core/src/index.ts')
const hooksDir = path.join(docsRoot, 'hooks')
const demosDir = path.join(docsRoot, 'demos')

const source = fs.readFileSync(coreIndex, 'utf8')
const hookMatches = [...source.matchAll(/\b(use[A-Z][A-Za-z0-9]+)\b/g)].map((match) => match[1])
const utilityMatches = [...source.matchAll(/\b(clearCache|configResponsive|createUpdateEffect)\b/g)].map((match) => match[1])
const hooks = [...new Set(hookMatches)].sort()
const utilities = [...new Set(utilityMatches)].sort()

const slug = (name) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
const failures = []

for (const hook of hooks) {
  const pagePath = path.join(hooksDir, `${slug(hook)}.mdx`)
  const demoPath = path.join(demosDir, slug(hook), `${hook}Demo.tsx`)
  if (!fs.existsSync(pagePath)) failures.push(`missing hook page: ${path.relative(process.cwd(), pagePath)}`)
  if (!fs.existsSync(demoPath)) failures.push(`missing demo file: ${path.relative(process.cwd(), demoPath)}`)

  if (fs.existsSync(pagePath)) {
    const page = fs.readFileSync(pagePath, 'utf8')
    if (!page.includes(`../demos/${slug(hook)}/${hook}Demo`)) failures.push(`hook page does not import its demo: ${path.relative(process.cwd(), pagePath)}`)
    if (!page.includes(`../demos/${slug(hook)}/${hook}Demo.tsx?raw`)) failures.push(`hook page does not raw-import its source: ${path.relative(process.cwd(), pagePath)}`)
  }

  if (fs.existsSync(demoPath)) {
    const demo = fs.readFileSync(demoPath, 'utf8')
    if (/from ['"]react['"]/.test(demo) || /from ['"]react\//.test(demo)) failures.push(`demo imports React: ${path.relative(process.cwd(), demoPath)}`)
  }
}

const hookPages = fs.readdirSync(hooksDir).filter((file) => file.endsWith('.mdx') && file !== 'index.mdx')
for (const file of hookPages) {
  const expected = `${file.replace(/\.mdx$/, '')}`
  if (!hooks.some((hook) => slug(hook) === expected)) failures.push(`stale hook page: ${path.relative(process.cwd(), path.join(hooksDir, file))}`)
}

for (const dir of fs.readdirSync(demosDir)) {
  if (dir === 'utilities') continue
  const files = fs.readdirSync(path.join(demosDir, dir)).filter((file) => file.endsWith('.tsx'))
  if (!hooks.some((hook) => slug(hook) === dir)) failures.push(`stale demo directory: ${path.relative(process.cwd(), path.join(demosDir, dir))}`)
  for (const file of files) {
    const full = path.join(demosDir, dir, file)
    const text = fs.readFileSync(full, 'utf8')
    if (/from ['"]react['"]/.test(text) || /from ['"]react\//.test(text)) failures.push(`demo imports React: ${path.relative(process.cwd(), full)}`)
  }
}

const utilityPages = {
  clearCache: path.join(docsRoot, 'utilities/clear-cache.mdx'),
  configResponsive: path.join(docsRoot, 'utilities/config-responsive.mdx'),
  createUpdateEffect: path.join(docsRoot, 'utilities/create-update-effect.mdx')
}
for (const utility of utilities) {
  if (!fs.existsSync(utilityPages[utility])) failures.push(`missing utility page: ${path.relative(process.cwd(), utilityPages[utility])}`)
}

for (const file of [
  'demos/utilities/ClearCacheDemo.tsx',
  'demos/utilities/ConfigResponsiveDemo.tsx',
  'demos/utilities/CreateUpdateEffectDemo.tsx'
]) {
  const full = path.join(docsRoot, file)
  if (!fs.existsSync(full)) failures.push(`missing utility demo: ${path.relative(process.cwd(), full)}`)
}

if (failures.length) {
  console.error('Documentation check failed:')
  for (const failure of failures) console.error('-', failure)
  process.exit(1)
}

console.log(`Documentation check passed for ${hooks.length} hooks and ${utilities.length} utilities.`)
