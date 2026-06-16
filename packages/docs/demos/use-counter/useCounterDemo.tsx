import { useCounter } from '@kamod-ch/hooks'

export default function UseCounterDemo() {
  const [count, actions] = useCounter(2, { min: 0, max: 10 })

  return (
    <div>
      <p><strong>Count:</strong> {count}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => actions.dec()}>-1</button>
        <button type="button" onClick={() => actions.inc()}>+1</button>
        <button type="button" onClick={() => actions.set(8)}>Set 8</button>
        <button type="button" onClick={actions.reset}>Reset</button>
      </div>
    </div>
  )
}
