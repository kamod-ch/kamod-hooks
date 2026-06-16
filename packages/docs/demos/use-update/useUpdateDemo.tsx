import { useState } from 'preact/hooks'
import { useUpdate } from '@kamod-ch/hooks'

export default function UseUpdateDemo() {
  const [renders, setRenders] = useState(1)
  const forceUpdate = useUpdate()

  return (
    <div>
      <p><strong>Tracked value:</strong> {renders}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => setRenders((value) => value + 1)}>Change state</button>
        <button type="button" onClick={forceUpdate}>Force render</button>
      </div>
    </div>
  )
}
