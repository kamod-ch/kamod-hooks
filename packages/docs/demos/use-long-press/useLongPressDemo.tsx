import { useRef, useState } from 'preact/hooks'
import { useLongPress } from '@kamod-ch/hooks'

export default function UseLongPressDemo() {
  const ref = useRef<HTMLButtonElement>(null)
  const [count, setCount] = useState(0)
  useLongPress(() => setCount((value) => value + 1), ref, { delay: 600 })

  return (
    <div>
      <button ref={ref} type="button">Press and hold me</button>
      <p><strong>Long presses:</strong> {count}</p>
    </div>
  )
}
