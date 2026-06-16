import { useState } from 'preact/hooks'
import { useDebounce } from '@kamod-ch/hooks'

export default function UseDebounceDemo() {
  const [value, setValue] = useState('')
  const debounced = useDebounce(value, { wait: 400 })

  return (
    <div>
      <input value={value} onInput={(event) => setValue(event.currentTarget.value)} placeholder="Type quickly" />
      <p><strong>Immediate:</strong> {value || '—'}</p>
      <p><strong>Debounced:</strong> {debounced || '—'}</p>
    </div>
  )
}
