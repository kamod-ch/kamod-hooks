import { useHistoryTravel } from '@kamod-ch/hooks'

export default function UseHistoryTravelDemo() {
  const history = useHistoryTravel('draft')

  return (
    <div>
      <label>
        Value
        <input value={history.value} onInput={(event) => history.setValue(event.currentTarget.value)} />
      </label>
      <p><strong>Back:</strong> {history.backLength} · <strong>Forward:</strong> {history.forwardLength}</p>
      <div class="demo-actions">
        <button type="button" onClick={history.back} disabled={!history.backLength}>Undo</button>
        <button type="button" onClick={history.forward} disabled={!history.forwardLength}>Redo</button>
        <button type="button" onClick={() => history.reset('draft')}>Reset</button>
      </div>
    </div>
  )
}
