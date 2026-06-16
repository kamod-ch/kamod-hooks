import { useState } from 'preact/hooks'
import { useDebounceEffect } from '@kamod-ch/hooks'

export default function UseDebounceEffectDemo() {
  const [query, setQuery] = useState('')
  const [runs, setRuns] = useState(0)

  useDebounceEffect(() => {
    if (query) setRuns((value) => value + 1)
  }, [query], { wait: 400 })

  return (
    <div>
      <input value={query} onInput={(event) => setQuery(event.currentTarget.value)} placeholder="Type quickly" />
      <p><strong>Debounced effect runs:</strong> {runs}</p>
    </div>
  )
}
