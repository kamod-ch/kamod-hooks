import { useState } from 'preact/hooks'
import { useCountDown } from '@kamod-ch/hooks'

export default function UseCountDownDemo() {
  const [target, setTarget] = useState(() => Date.now() + 5000)
  const [left, formatted] = useCountDown({ targetDate: target })

  return (
    <div>
      <p><strong>Milliseconds left:</strong> {left}</p>
      <p><strong>Seconds:</strong> {formatted.seconds}</p>
      <button type="button" onClick={() => setTarget(Date.now() + 5000)}>Restart 5 second countdown</button>
    </div>
  )
}
