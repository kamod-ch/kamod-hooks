import { useState } from 'preact/hooks'
import { useSafeState } from '@kamod-ch/hooks'

function Child() {
  const [value, setValue] = useSafeState('waiting')

  return (
    <div>
      <p><strong>Status:</strong> {value}</p>
      <button type="button" onClick={() => {
        setValue('loading')
        window.setTimeout(() => setValue('resolved safely'), 800)
      }}>Start async update</button>
    </div>
  )
}

export default function UseSafeStateDemo() {
  const [visible, setVisible] = useState(true)
  return (
    <div>
      <button type="button" onClick={() => setVisible((value) => !value)}>{visible ? 'Unmount child' : 'Mount child'}</button>
      {visible ? <Child /> : <p>Child removed before late updates can land.</p>}
    </div>
  )
}
