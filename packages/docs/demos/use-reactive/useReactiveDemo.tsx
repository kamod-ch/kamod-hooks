import { useReactive } from '@kamod-ch/hooks'

export default function UseReactiveDemo() {
  const state = useReactive({ count: 0, nested: { label: 'draft' } })

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div class="demo-actions">
        <button type="button" onClick={() => state.count++}>Increment</button>
        <button type="button" onClick={() => { state.nested.label = state.nested.label === 'draft' ? 'published' : 'draft' }}>Toggle label</button>
      </div>
    </div>
  )
}
