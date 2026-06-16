import { useState } from 'preact/hooks'
import { useAsyncEffect } from '@kamod-ch/hooks'

export default function UseAsyncEffectDemo() {
  const [query, setQuery] = useState('kamod')
  const [status, setStatus] = useState('idle')

  useAsyncEffect(async () => {
    setStatus('loading')
    await new Promise((resolve) => window.setTimeout(resolve, 500))
    setStatus('loaded for ' + query)
  }, [query])

  return (
    <div>
      <input value={query} onInput={(event) => setQuery(event.currentTarget.value)} />
      <p><strong>Status:</strong> {status}</p>
    </div>
  )
}
