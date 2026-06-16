import { useMemo, useState } from 'preact/hooks'
import { useExternal } from '@kamod-ch/hooks'

export default function UseExternalDemo() {
  const [enabled, setEnabled] = useState(false)
  const scriptUrl = useMemo(() => {
    const blob = new Blob(["window.__kamodHooksExternalLoaded = 'ready'"], { type: 'text/javascript' })
    return URL.createObjectURL(blob)
  }, [])
  const status = useExternal(enabled ? scriptUrl : undefined)

  return (
    <div>
      <p><strong>Status:</strong> {status}</p>
      <button type="button" onClick={() => setEnabled(true)}>Load script</button>
    </div>
  )
}
