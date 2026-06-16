import { useRef } from 'preact/hooks'
import { useScroll } from '@kamod-ch/hooks'

export default function UseScrollDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const position = useScroll(ref)

  return (
    <div>
      <div ref={ref} class="demo-scroll-box">{Array.from({ length: 20 }, (_, index) => <p key={index}>Scrollable row {index + 1}</p>)}</div>
      <p><strong>Top:</strong> {position?.top ?? 0}</p>
    </div>
  )
}
