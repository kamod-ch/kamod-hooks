import { useState } from 'preact/hooks'
import { useRafInterval } from '@kamod-ch/hooks'

export default function UseRafIntervalDemo() {
  const [running, setRunning] = useState(false)
  const [ticks, setTicks] = useState(0)
  useRafInterval(() => setTicks((value) => value + 1), running ? 300 : undefined)

  return (
    <div>
      <p><strong>Frame ticks:</strong> {ticks}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => setRunning((value) => !value)}>{running ? 'Stop' : 'Start'}</button>
        <button type="button" onClick={() => setTicks(0)}>Reset</button>
      </div>
    </div>
  )
}
