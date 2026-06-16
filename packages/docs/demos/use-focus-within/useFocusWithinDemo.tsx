import { useRef } from 'preact/hooks'
import { useFocusWithin } from '@kamod-ch/hooks'

export default function UseFocusWithinDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const focused = useFocusWithin(ref)

  return (
    <div>
      <div ref={ref} class="demo-target-box">
        <input placeholder="Focus me" />
        <button type="button">Focusable button</button>
      </div>
      <p><strong>Focus within:</strong> {String(focused)}</p>
    </div>
  )
}
