import { useState } from 'preact/hooks'
import { useMount } from '@kamod-ch/hooks'

function Child({ onMount }: { onMount: () => void }) {
  useMount(onMount)
  return <p>Mounted child content.</p>
}

export default function UseMountDemo() {
  const [visible, setVisible] = useState(true)
  const [mounts, setMounts] = useState(1)

  return (
    <div>
      <p><strong>Mount count:</strong> {mounts}</p>
      <button type="button" onClick={() => setVisible((value) => !value)}>{visible ? 'Unmount' : 'Mount'}</button>
      {visible ? <Child onMount={() => setMounts((value) => value + 1)} /> : null}
    </div>
  )
}
