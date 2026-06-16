import { useState } from 'preact/hooks'
import { useControllableValue } from '@kamod-ch/hooks'

function DemoField(props: { value: string; onChange: (value: string) => void }) {
  const [value, setValue] = useControllableValue(props)

  return <input value={value} onInput={(event) => setValue(event.currentTarget.value)} />
}

export default function UseControllableValueDemo() {
  const [value, setValue] = useState('controlled')

  return (
    <div>
      <DemoField value={value} onChange={setValue} />
      <p><strong>Parent value:</strong> {value}</p>
    </div>
  )
}
