import { useState } from 'preact/hooks'
import { useTrackedEffect } from '@kamod-ch/hooks'

export default function UseTrackedEffectDemo() {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [changed, setChanged] = useState<number[]>([])

  useTrackedEffect((changes) => {
    setChanged(changes ?? [])
  }, [left, right])

  return (
    <div>
      <p><strong>Left:</strong> {left} · <strong>Right:</strong> {right}</p>
      <p><strong>Changed dependency indexes:</strong> {changed.join(', ') || 'none yet'}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => setLeft((value) => value + 1)}>Change left</button>
        <button type="button" onClick={() => setRight((value) => value + 1)}>Change right</button>
      </div>
    </div>
  )
}
