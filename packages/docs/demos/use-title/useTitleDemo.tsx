import { useState } from 'preact/hooks'
import { useTitle } from '@kamod-ch/hooks'

export default function UseTitleDemo() {
  const [title, setTitle] = useState('Kamod Hooks demo title')
  useTitle(title, { restoreOnUnmount: false })

  return (
    <div>
      <input value={title} onInput={(event) => setTitle(event.currentTarget.value)} />
      <p><strong>document.title:</strong> {title}</p>
    </div>
  )
}
