import { useRef, useState } from 'preact/hooks'
import { useKeyPress } from '@kamod-ch/hooks'

export default function UseKeyPressDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [last, setLast] = useState('none')

  useKeyPress('k', (event, key) => {
    setCount((value) => value + 1)
    setLast(String(key || event.key))
  }, { target: ref })

  return (
    <div>
      <div ref={ref} class="demo-target-box" tabIndex={0}>Focus here and press the “k” key.</div>
      <p><strong>Last key:</strong> {last}</p>
      <p><strong>Recognized presses:</strong> {count}</p>
    </div>
  )
}
