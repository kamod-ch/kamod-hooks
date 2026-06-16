import { useRef, useState } from 'preact/hooks'
import { useDrag, useDrop } from '@kamod-ch/hooks'

export default function UseDragDemo() {
  const sourceRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const [dropped, setDropped] = useState('nothing yet')
  useDrag({ label: 'Dragged card' }, sourceRef)
  useDrop(targetRef, { onDom: (content) => setDropped(content?.label ?? 'received data') })

  return (
    <div class="demo-grid">
      <div ref={sourceRef} class="demo-target-box">Drag me</div>
      <div ref={targetRef} class="demo-target-box">Drop here</div>
      <p><strong>Last drop:</strong> {dropped}</p>
    </div>
  )
}
