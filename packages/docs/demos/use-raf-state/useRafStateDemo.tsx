import { useRafState } from '@kamod-ch/hooks'

export default function UseRafStateDemo() {
  const [value, setValue] = useRafState(0)

  return (
    <div>
      <p><strong>Value:</strong> {value}</p>
      <button type="button" onClick={() => { setValue((count) => count + 1); setValue((count) => count + 1) }}>Queue two RAF updates</button>
    </div>
  )
}
