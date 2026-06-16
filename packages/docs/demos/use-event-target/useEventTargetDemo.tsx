import { useEventTarget } from '@kamod-ch/hooks'

export default function UseEventTargetDemo() {
  const [value, actions] = useEventTarget<string>({ initialValue: 'typed value' })

  return (
    <div>
      <input value={value} onInput={(event) => actions.onChange({ target: { value: event.currentTarget.value } })} />
      <p><strong>Current value:</strong> {value}</p>
      <button type="button" onClick={actions.reset}>Reset</button>
    </div>
  )
}
