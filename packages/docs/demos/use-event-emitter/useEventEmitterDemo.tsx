import { useState } from 'preact/hooks'
import { useEventEmitter } from '@kamod-ch/hooks'

export default function UseEventEmitterDemo() {
  const emitter = useEventEmitter<string>()
  const [lastMessage, setLastMessage] = useState('nothing yet')
  emitter.useSubscription((value) => setLastMessage(value))

  return (
    <div>
      <p><strong>Last event:</strong> {lastMessage}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => emitter.emit('build started')}>Emit build started</button>
        <button type="button" onClick={() => emitter.emit('build finished')}>Emit build finished</button>
      </div>
    </div>
  )
}
