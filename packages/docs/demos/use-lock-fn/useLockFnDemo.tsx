import { useState } from 'preact/hooks'
import { useLockFn } from '@kamod-ch/hooks'

export default function UseLockFnDemo() {
  const [runs, setRuns] = useState(0)
  const [inFlight, setInFlight] = useState(false)
  const locked = useLockFn(async () => {
    setInFlight(true)
    await new Promise((resolve) => window.setTimeout(resolve, 500))
    setRuns((value) => value + 1)
    setInFlight(false)
  })

  return (
    <div>
      <p><strong>Completed runs:</strong> {runs}</p>
      <p><strong>In flight:</strong> {String(inFlight)}</p>
      <button type="button" onClick={() => { locked(); locked(); locked() }}>Trigger three concurrent calls</button>
    </div>
  )
}
