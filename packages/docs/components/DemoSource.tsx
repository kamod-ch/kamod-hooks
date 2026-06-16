import { useState } from 'preact/hooks'

interface DemoSourceProps {
  source: string
  defaultOpen?: boolean
}

export function DemoSource({ source, defaultOpen = false }: DemoSourceProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div class="demo-source">
      <button type="button" class="demo-source-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        {open ? 'Hide source' : 'Show source'}
      </button>
      {open ? <pre><code>{source}</code></pre> : null}
    </div>
  )
}
