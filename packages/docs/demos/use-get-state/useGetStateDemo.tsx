import { useGetState } from '@kamod-ch/hooks'

export default function UseGetStateDemo() {
  const [value, setValue, getValue] = useGetState('fresh state')

  return (
    <div>
      <label>
        Value
        <input value={value} onInput={(event) => setValue(event.currentTarget.value)} />
      </label>
      <p><strong>Getter result:</strong> {getValue()}</p>
    </div>
  )
}
