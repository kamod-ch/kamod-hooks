import { useRef, useState } from 'preact/hooks'
import { useDrag, useDrop } from '@kamod-ch/hooks'

export default function UseDropDemo() {
  const sourceRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const [dropped, setDropped] = useState('nothing yet')
  useDrag({ label: 'Dragged payload' }, sourceRef)
  useDrop(targetRef, { onDom: (content) => setDropped(content?.label ?? 'received data') })

  return (
    <div class="demo-grid">
      <div ref={sourceRef} class="demo-target-box">Drag this payload</div>
      <div ref={targetRef} class="demo-target-box">Drop target</div>
      <p><strong>Drop result:</strong> {dropped}</p>
    </div>
  )
}
