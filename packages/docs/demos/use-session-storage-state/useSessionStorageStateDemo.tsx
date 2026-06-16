import { useSessionStorageState } from '@kamod-ch/hooks'

const key = 'kamod-hooks-demo-use-session-storage-state'

export default function UseSessionStorageStateDemo() {
  const [value, setValue] = useSessionStorageState<string>(key, { defaultValue: 'session' })

  return (
    <div>
      <input value={value} onInput={(event) => setValue(event.currentTarget.value)} />
      <p><strong>Stored value:</strong> {value}</p>
      <button type="button" onClick={() => setValue(undefined)}>Clear</button>
    </div>
  )
}
