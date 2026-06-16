import { useState } from 'preact/hooks'
import { useInterval } from '@kamod-ch/hooks'

export default function UseIntervalDemo() {
  const [running, setRunning] = useState(false)
  const [ticks, setTicks] = useState(0)
  useInterval(() => setTicks((value) => value + 1), running ? 1000 : undefined)

  return (
    <div>
      <p><strong>Ticks:</strong> {ticks}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => setRunning((value) => !value)}>{running ? 'Stop' : 'Start'}</button>
        <button type="button" onClick={() => setTicks(0)}>Reset</button>
      </div>
    </div>
  )
}
