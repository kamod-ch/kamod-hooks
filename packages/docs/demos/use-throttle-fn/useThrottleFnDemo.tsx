import { useState } from 'preact/hooks'
import { useThrottleFn } from '@kamod-ch/hooks'

export default function UseThrottleFnDemo() {
  const [count, setCount] = useState(0)
  const { run, cancel, flush } = useThrottleFn(() => setCount((value) => value + 1), { wait: 500 })

  return (
    <div>
      <p><strong>Throttled count:</strong> {count}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => { run(); run(); run() }}>Trigger burst</button>
        <button type="button" onClick={flush}>Flush</button>
        <button type="button" onClick={cancel}>Cancel</button>
      </div>
    </div>
  )
}
