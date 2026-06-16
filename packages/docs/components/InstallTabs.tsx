import { useState } from 'preact/hooks'

const commands = {
  pnpm: 'pnpm add @kamod-ch/hooks preact',
  npm: 'npm install @kamod-ch/hooks preact',
  yarn: 'yarn add @kamod-ch/hooks preact'
}

export function InstallTabs() {
  const [manager, setManager] = useState<keyof typeof commands>('pnpm')

  return (
    <div class="install-tabs">
      <div class="install-tabs-buttons">
        {(Object.keys(commands) as Array<keyof typeof commands>).map((name) => (
          <button key={name} type="button" class={name === manager ? 'active' : ''} onClick={() => setManager(name)}>
            {name}
          </button>
        ))}
      </div>
      <pre><code>{commands[manager]}</code></pre>
    </div>
  )
}
