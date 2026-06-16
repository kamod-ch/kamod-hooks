import { useState } from 'preact/hooks'
import { useUnmount } from '@kamod-ch/hooks'

function Child({ onUnmount }: { onUnmount: () => void }) {
  useUnmount(onUnmount)
  return <p>Hide this child to trigger cleanup.</p>
}

export default function UseUnmountDemo() {
  const [visible, setVisible] = useState(true)
  const [unmounts, setUnmounts] = useState(0)

  return (
    <div>
      <p><strong>Unmount count:</strong> {unmounts}</p>
      <button type="button" onClick={() => setVisible((value) => !value)}>{visible ? 'Unmount child' : 'Mount child'}</button>
      {visible ? <Child onUnmount={() => setUnmounts((value) => value + 1)} /> : null}
    </div>
  )
}
