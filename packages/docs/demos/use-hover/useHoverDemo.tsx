import { useRef } from 'preact/hooks'
import { useHover } from '@kamod-ch/hooks'

export default function UseHoverDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const hovering = useHover(ref)

  return (
    <div>
      <div ref={ref} class="demo-target-box">Hover this area</div>
      <p><strong>Hovering:</strong> {String(hovering)}</p>
    </div>
  )
}
