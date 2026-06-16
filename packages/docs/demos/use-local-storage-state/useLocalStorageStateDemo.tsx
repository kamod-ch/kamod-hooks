import { useLocalStorageState } from '@kamod-ch/hooks'

const key = 'kamod-hooks-demo-use-local-storage-state'

export default function UseLocalStorageStateDemo() {
  const [value, setValue] = useLocalStorageState<string>(key, { defaultValue: 'hello' })

  return (
    <div>
      <input value={value} onInput={(event) => setValue(event.currentTarget.value)} />
      <p><strong>Stored value:</strong> {value}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => setValue('reset')}>Set reset</button>
        <button type="button" onClick={() => setValue(undefined)}>Clear</button>
      </div>
    </div>
  )
}
