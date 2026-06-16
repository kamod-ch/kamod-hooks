import { useState } from 'preact/hooks'
import { useTimeout } from '@kamod-ch/hooks'

export default function UseTimeoutDemo() {
  const [armed, setArmed] = useState(false)
  const [status, setStatus] = useState('idle')
  useTimeout(() => { if (armed) setStatus('completed') }, armed ? 1000 : undefined)

  return (
    <div>
      <p><strong>Status:</strong> {status}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => { setStatus('waiting'); setArmed(true) }}>Start timeout</button>
        <button type="button" onClick={() => { setArmed(false); setStatus('cancelled') }}>Cancel</button>
      </div>
    </div>
  )
}
