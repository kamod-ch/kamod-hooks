import { useState } from 'preact/hooks'
import { useRequest } from '@kamod-ch/hooks'

async function loadUser(shouldFail: boolean) {
  await new Promise((resolve) => window.setTimeout(resolve, 700))
  if (shouldFail) throw new Error('Demo request failed')
  return { id: 1, name: 'Kamod User' }
}

export default function UseRequestDemo() {
  const [shouldFail, setShouldFail] = useState(false)
  const request = useRequest(() => loadUser(shouldFail), { manual: true, retryCount: 1 })

  return (
    <div>
      <label class="demo-option">
        <input type="checkbox" checked={shouldFail} onInput={(event) => setShouldFail(event.currentTarget.checked)} />
        Fail next request
      </label>
      <pre>{JSON.stringify({ loading: request.loading, data: request.data, error: request.error?.message ?? null }, null, 2)}</pre>
      <div class="demo-actions">
        <button type="button" onClick={() => request.run()}>Run</button>
        <button type="button" onClick={() => request.refresh()}>Refresh</button>
        <button type="button" onClick={() => request.cancel()}>Cancel</button>
      </div>
    </div>
  )
}
