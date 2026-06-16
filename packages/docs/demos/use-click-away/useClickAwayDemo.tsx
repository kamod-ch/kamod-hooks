import { useRef, useState } from 'preact/hooks'
import { useClickAway } from '@kamod-ch/hooks'

export default function UseClickAwayDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [outsideClicks, setOutsideClicks] = useState(0)
  useClickAway(() => setOutsideClicks((value) => value + 1), ref)

  return (
    <div class="demo-click-away-wrap">
      <div ref={ref} class="demo-target-box">Click inside this box.</div>
      <button type="button">Click outside target</button>
      <p><strong>Outside clicks:</strong> {outsideClicks}</p>
    </div>
  )
}
