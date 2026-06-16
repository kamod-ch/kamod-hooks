import { useState } from 'preact/hooks'
import { useDebounceFn } from '@kamod-ch/hooks'

export default function UseDebounceFnDemo() {
  const [count, setCount] = useState(0)
  const { run, cancel, flush } = useDebounceFn(() => setCount((value) => value + 1), { wait: 500 })

  return (
    <div>
      <p><strong>Debounced count:</strong> {count}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => { run(); run(); run() }}>Queue burst</button>
        <button type="button" onClick={flush}>Flush</button>
        <button type="button" onClick={cancel}>Cancel</button>
      </div>
    </div>
  )
}
