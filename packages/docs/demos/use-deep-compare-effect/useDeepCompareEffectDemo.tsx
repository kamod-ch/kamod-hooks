import { useState } from 'preact/hooks'
import { useDeepCompareEffect } from '@kamod-ch/hooks'

export default function UseDeepCompareEffectDemo() {
  const [count, setCount] = useState(0)
  const [runs, setRuns] = useState(0)
  const config = { page: 1, filters: ['open'] }

  useDeepCompareEffect(() => {
    setRuns((value) => value + 1)
  }, [config])

  return (
    <div>
      <p><strong>Unrelated count:</strong> {count}</p>
      <p><strong>Effect runs:</strong> {runs}</p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>Re-render with deep-equal deps</button>
    </div>
  )
}
