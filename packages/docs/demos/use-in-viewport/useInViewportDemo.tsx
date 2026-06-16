import { useRef } from 'preact/hooks'
import { useInViewport } from '@kamod-ch/hooks'

export default function UseInViewportDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [inViewport, ratio] = useInViewport(ref, { threshold: [0, 0.5, 1] })

  return (
    <div>
      <div class="demo-scroll-box">
        <div style={{ height: '180px' }} />
        <div ref={ref} class="demo-target-box">Observed target</div>
        <div style={{ height: '180px' }} />
      </div>
      <p><strong>Visible:</strong> {String(inViewport)} · <strong>Ratio:</strong> {ratio}</p>
    </div>
  )
}
