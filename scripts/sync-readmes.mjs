import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const rootReadmePath = path.join(repoRoot, 'README.md')
const coreReadmePath = path.join(repoRoot, 'packages/core/README.md')

const githubRepoBase = 'https://github.com/kamod-ch/kamod-hooks/blob/main'
const githubRawBase = 'https://raw.githubusercontent.com/kamod-ch/kamod-hooks/main'

function toCoreReadme(content) {
  return content
    .replace(
      '[![License: MIT](https://img.shields.io/badge/license-MIT-0f766e.svg)](LICENSE)',
      `[![License: MIT](https://img.shields.io/badge/license-MIT-0f766e.svg)](${githubRepoBase}/LICENSE)`
    )
    .replace(
      '[![kamod-hooks docs preview](assets/readme-banner.svg)](https://kamod-ch.github.io/kamod-hooks/)',
      `[![kamod-hooks docs preview](${githubRawBase}/assets/readme-banner.svg)](https://kamod-ch.github.io/kamod-hooks/)`
    )
    .replaceAll(
      'Run the local demo/dev site:',
      'Run the local demo/dev site from the repository root:'
    )
    .replaceAll(
      'Run locally:',
      'Run locally from the repository root:'
    )
    .replaceAll(
      'See [LICENSE](LICENSE) and [NOTICE](NOTICE).',
      `See [LICENSE](${githubRepoBase}/LICENSE) and [NOTICE](${githubRepoBase}/NOTICE).`
    )
}

const rootReadme = await readFile(rootReadmePath, 'utf8')
const coreReadme = toCoreReadme(rootReadme)

await mkdir(path.dirname(coreReadmePath), { recursive: true })
await writeFile(coreReadmePath, coreReadme)

console.log(`Synced ${path.relative(repoRoot, coreReadmePath)} from ${path.relative(repoRoot, rootReadmePath)}`)
