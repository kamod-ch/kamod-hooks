import { useRef, useState } from 'preact/hooks'
import { useEventListener } from '@kamod-ch/hooks'

export default function UseEventListenerDemo() {
  const ref = useRef<HTMLButtonElement>(null)
  const [clicks, setClicks] = useState(0)
  useEventListener('click', () => setClicks((value) => value + 1), { target: ref })

  return (
    <div>
      <button ref={ref} type="button">Native listener target</button>
      <p><strong>Captured clicks:</strong> {clicks}</p>
    </div>
  )
}
