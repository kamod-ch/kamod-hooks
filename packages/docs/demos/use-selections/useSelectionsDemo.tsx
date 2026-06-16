import { useSelections } from '@kamod-ch/hooks'

const items = ['Docs', 'Tests', 'Release']

export default function UseSelectionsDemo() {
  const selection = useSelections(items)

  return (
    <div>
      <fieldset>
        <legend>Tasks</legend>
        {items.map((item) => (
          <label key={item} class="demo-option">
            <input type="checkbox" checked={selection.isSelected(item)} onInput={() => selection.toggle(item)} />
            {item}
          </label>
        ))}
      </fieldset>
      <p><strong>Selected:</strong> {selection.selected.join(', ') || 'none'}</p>
      <div class="demo-actions">
        <button type="button" onClick={selection.selectAll}>Select all</button>
        <button type="button" onClick={selection.clearAll}>Clear</button>
      </div>
    </div>
  )
}
