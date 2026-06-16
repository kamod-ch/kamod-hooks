import { useState } from 'preact/hooks'
import { useUnmountedRef } from '@kamod-ch/hooks'

function Child() {
  const ref = useUnmountedRef()
  return <p><strong>Unmounted flag:</strong> {String(ref.current)}</p>
}

export default function UseUnmountedRefDemo() {
  const [visible, setVisible] = useState(true)
  return (
    <div>
      <button type="button" onClick={() => setVisible((value) => !value)}>{visible ? 'Unmount child' : 'Mount child'}</button>
      {visible ? <Child /> : <p>After unmount the ref inside the child becomes true.</p>}
    </div>
  )
}
