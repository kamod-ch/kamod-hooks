import { useRef, useState } from 'preact/hooks'
import { useSize } from '@kamod-ch/hooks'

export default function UseSizeDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(220)
  const size = useSize(ref)

  return (
    <div>
      <input type="range" min={160} max={360} value={width} onInput={(event) => setWidth(Number(event.currentTarget.value))} />
      <div ref={ref} class="demo-target-box" style={{ width: width + 'px' }}>Observed box</div>
      <p><strong>Measured size:</strong> {size?.width ?? 0} × {size?.height ?? 0}</p>
    </div>
  )
}
