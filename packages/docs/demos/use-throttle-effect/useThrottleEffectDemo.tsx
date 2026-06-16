import { useState } from 'preact/hooks'
import { useThrottleEffect } from '@kamod-ch/hooks'

export default function UseThrottleEffectDemo() {
  const [query, setQuery] = useState('')
  const [runs, setRuns] = useState(0)

  useThrottleEffect(() => {
    if (query) setRuns((value) => value + 1)
  }, [query], { wait: 500 })

  return (
    <div>
      <input value={query} onInput={(event) => setQuery(event.currentTarget.value)} placeholder="Type quickly" />
      <p><strong>Throttled effect runs:</strong> {runs}</p>
    </div>
  )
}
