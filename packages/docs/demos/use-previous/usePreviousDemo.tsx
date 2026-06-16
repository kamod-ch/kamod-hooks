import { useState } from 'preact/hooks'
import { usePrevious } from '@kamod-ch/hooks'

export default function UsePreviousDemo() {
  const [value, setValue] = useState('first')
  const previous = usePrevious(value)

  return (
    <div>
      <input value={value} onInput={(event) => setValue(event.currentTarget.value)} />
      <p><strong>Current:</strong> {value}</p>
      <p><strong>Previous:</strong> {previous ?? 'none'}</p>
    </div>
  )
}
