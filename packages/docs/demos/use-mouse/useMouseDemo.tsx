import { useRef } from 'preact/hooks'
import { useMouse } from '@kamod-ch/hooks'

export default function UseMouseDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const mouse = useMouse(ref)

  return (
    <div>
      <div ref={ref} class="demo-target-box demo-large-box">Move the pointer here.</div>
      <p><strong>Element coordinates:</strong> {Math.round(mouse.elementX)}, {Math.round(mouse.elementY)}</p>
    </div>
  )
}
