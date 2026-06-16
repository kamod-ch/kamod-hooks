import { useState } from 'preact/hooks'
import { useFavicon } from '@kamod-ch/hooks'

const green = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%229%22 fill=%22%2310b981%22/%3E%3C/svg%3E'
const blue = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%229%22 fill=%22%233b82f6%22/%3E%3C/svg%3E'

export default function UseFaviconDemo() {
  const [href, setHref] = useState(green)
  useFavicon(href)

  return (
    <div>
      <p><strong>Active favicon:</strong> {href === green ? 'green square' : 'blue square'}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => setHref(green)}>Green</button>
        <button type="button" onClick={() => setHref(blue)}>Blue</button>
      </div>
    </div>
  )
}
