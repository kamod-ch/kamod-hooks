import { useRef, useState } from 'preact/hooks'
import { useMutationObserver } from '@kamod-ch/hooks'

export default function UseMutationObserverDemo() {
  const ref = useRef<HTMLUListElement>(null)
  const [items, setItems] = useState(['first'])
  const [mutations, setMutations] = useState(0)

  useMutationObserver(() => setMutations((value) => value + 1), ref, { childList: true })

  return (
    <div>
      <ul ref={ref}>{items.map((item) => <li key={item}>{item}</li>)}</ul>
      <p><strong>Mutation callbacks:</strong> {mutations}</p>
      <button type="button" onClick={() => setItems((value) => [...value, 'item-' + (value.length + 1)])}>Append item</button>
    </div>
  )
}
