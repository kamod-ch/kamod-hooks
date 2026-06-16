import { useState } from 'preact/hooks'
import { useLatest } from '@kamod-ch/hooks'

export default function UseLatestDemo() {
  const [value, setValue] = useState('initial')
  const latest = useLatest(value)

  return (
    <div>
      <input value={value} onInput={(event) => setValue(event.currentTarget.value)} />
      <p><strong>latest.current:</strong> {latest.current}</p>
    </div>
  )
}
