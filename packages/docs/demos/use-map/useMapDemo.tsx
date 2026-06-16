import { useMap } from '@kamod-ch/hooks'

export default function UseMapDemo() {
  const [map, actions] = useMap([['status', 'ready']])

  return (
    <div>
      <pre>{JSON.stringify(Object.fromEntries(map), null, 2)}</pre>
      <div class="demo-actions">
        <button type="button" onClick={() => actions.set('status', 'loading')}>Set loading</button>
        <button type="button" onClick={() => actions.set('theme', 'dark')}>Add theme</button>
        <button type="button" onClick={() => actions.remove('status')}>Remove status</button>
        <button type="button" onClick={actions.reset}>Reset</button>
      </div>
    </div>
  )
}
