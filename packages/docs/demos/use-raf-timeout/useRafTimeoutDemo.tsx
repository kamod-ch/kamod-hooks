import { useState } from 'preact/hooks'
import { useRafTimeout } from '@kamod-ch/hooks'

export default function UseRafTimeoutDemo() {
  const [armed, setArmed] = useState(false)
  const [status, setStatus] = useState('idle')
  useRafTimeout(() => { if (armed) setStatus('completed') }, armed ? 600 : undefined)

  return (
    <div>
      <p><strong>Status:</strong> {status}</p>
      <button type="button" onClick={() => { setStatus('waiting'); setArmed(true) }}>Start RAF timeout</button>
    </div>
  )
}
