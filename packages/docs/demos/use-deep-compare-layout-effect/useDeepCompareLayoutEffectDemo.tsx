import { useState } from 'preact/hooks'
import { useDeepCompareLayoutEffect } from '@kamod-ch/hooks'

export default function UseDeepCompareLayoutEffectDemo() {
  const [count, setCount] = useState(0)
  const [runs, setRuns] = useState(0)
  const config = { dense: true, columns: ['name', 'status'] }

  useDeepCompareLayoutEffect(() => {
    setRuns((value) => value + 1)
  }, [config])

  return (
    <div>
      <p><strong>Unrelated count:</strong> {count}</p>
      <p><strong>Layout effect runs:</strong> {runs}</p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>Re-render with deep-equal deps</button>
    </div>
  )
}
