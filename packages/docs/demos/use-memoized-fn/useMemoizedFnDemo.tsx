import { useState } from 'preact/hooks'
import { useMemoizedFn } from '@kamod-ch/hooks'

export default function UseMemoizedFnDemo() {
  const [count, setCount] = useState(0)
  const increment = useMemoizedFn(() => setCount((value) => value + 1))

  return (
    <div>
      <p><strong>Count:</strong> {count}</p>
      <button type="button" onClick={increment}>Increment with stable callback</button>
    </div>
  )
}
