import { useToggle } from '@kamod-ch/hooks'

export default function UseToggleDemo() {
  const [value, actions] = useToggle('list', 'grid')

  return (
    <div>
      <p><strong>Layout:</strong> {value}</p>
      <div class="demo-actions">
        <button type="button" onClick={actions.toggle}>Toggle</button>
        <button type="button" onClick={actions.setLeft}>Set list</button>
        <button type="button" onClick={actions.setRight}>Set grid</button>
      </div>
    </div>
  )
}
