import { useState } from 'preact/hooks'
import { useUpdateEffect } from '@kamod-ch/hooks'

export default function UseUpdateEffectDemo() {
  const [value, setValue] = useState(0)
  const [runs, setRuns] = useState(0)

  useUpdateEffect(() => {
    setRuns((count) => count + 1)
  }, [value])

  return (
    <div>
      <p><strong>Value:</strong> {value}</p>
      <p><strong>Effect runs after mount:</strong> {runs}</p>
      <button type="button" onClick={() => setValue((count) => count + 1)}>Increment</button>
    </div>
  )
}
