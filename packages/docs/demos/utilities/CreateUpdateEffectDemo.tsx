import { useEffect, useState } from 'preact/hooks'
import { createUpdateEffect } from '@kamod-ch/hooks'

const useUpdateOnlyEffect = createUpdateEffect(useEffect)

export default function CreateUpdateEffectDemo() {
  const [value, setValue] = useState(0)
  const [runs, setRuns] = useState(0)

  useUpdateOnlyEffect(() => {
    setRuns((count) => count + 1)
  }, [value])

  return (
    <div>
      <p><strong>Value:</strong> {value}</p>
      <p><strong>Update-only runs:</strong> {runs}</p>
      <button type="button" onClick={() => setValue((count) => count + 1)}>Increment</button>
    </div>
  )
}
