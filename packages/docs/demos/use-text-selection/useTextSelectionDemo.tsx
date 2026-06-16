import { useRef } from 'preact/hooks'
import { useTextSelection } from '@kamod-ch/hooks'

export default function UseTextSelectionDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const selection = useTextSelection(ref)

  return (
    <div>
      <div ref={ref} class="demo-target-box">Select some text inside this paragraph to inspect the current selection.</div>
      <p><strong>Selected text:</strong> {selection.text || 'none'}</p>
    </div>
  )
}
