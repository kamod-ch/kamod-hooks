import { useBoolean } from '@kamod-ch/hooks'

export default function UseBooleanDemo() {
  const [value, actions] = useBoolean(false)

  return (
    <div>
      <p><strong>Current value:</strong> {String(value)}</p>
      <div class="demo-actions">
        <button type="button" onClick={actions.setTrue}>Set true</button>
        <button type="button" onClick={actions.setFalse}>Set false</button>
        <button type="button" onClick={actions.toggle}>Toggle</button>
      </div>
    </div>
  )
}
