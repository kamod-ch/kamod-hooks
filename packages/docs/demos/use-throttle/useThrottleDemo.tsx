import { useState } from 'preact/hooks'
import { useThrottle } from '@kamod-ch/hooks'

export default function UseThrottleDemo() {
  const [value, setValue] = useState(0)
  const throttled = useThrottle(value, { wait: 500 })

  return (
    <div>
      <input type="range" min={0} max={100} value={value} onInput={(event) => setValue(Number(event.currentTarget.value))} />
      <p><strong>Immediate:</strong> {value}</p>
      <p><strong>Throttled:</strong> {throttled}</p>
    </div>
  )
}
