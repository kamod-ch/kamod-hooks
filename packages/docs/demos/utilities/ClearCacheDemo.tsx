import { useState } from 'preact/hooks'
import { clearCache, useRequest } from '@kamod-ch/hooks'

async function loadValue() {
  await new Promise((resolve) => window.setTimeout(resolve, 300))
  return { time: new Date().toISOString() }
}

export default function ClearCacheDemo() {
  const [key] = useState('kamod-hooks-demo-request-cache')
  const request = useRequest(loadValue, { cacheKey: key })

  return (
    <div>
      <pre>{JSON.stringify(request.data, null, 2)}</pre>
      <div class="demo-actions">
        <button type="button" onClick={() => request.refresh()}>Refresh</button>
        <button type="button" onClick={() => clearCache(key)}>Clear cache</button>
      </div>
    </div>
  )
}
