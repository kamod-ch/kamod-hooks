import { useEffect, useRef } from 'preact/hooks'
import { useUrlState } from '@kamod-ch/hooks'

export default function UseUrlStateDemo() {
  const original = useRef('')
  useEffect(() => {
    original.current = window.location.search
  }, [])

  const [state, setState] = useUrlState({ khDemoView: 'cards', khDemoFilter: 'all' }, { navigateMode: 'replace' })

  return (
    <div>
      <p><strong>Query state:</strong> {JSON.stringify(state)}</p>
      <p><strong>Current search:</strong> {window.location.search || '(empty)'}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => setState((current) => ({ ...current, khDemoView: current.khDemoView === 'cards' ? 'table' : 'cards' }))}>Toggle view</button>
        <button type="button" onClick={() => setState({ khDemoView: 'cards', khDemoFilter: 'all' })}>Reset params</button>
        <button type="button" onClick={() => window.history.replaceState(window.history.state, '', window.location.pathname + original.current + window.location.hash)}>Restore original URL</button>
      </div>
    </div>
  )
}
