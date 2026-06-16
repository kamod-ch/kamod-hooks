import { useEffect, useState } from 'preact/hooks'
import { useWebSocket } from '@kamod-ch/hooks'

class FakeWebSocket extends EventTarget {
  static CONNECTING = 0
  static OPEN = 1
  static CLOSING = 2
  static CLOSED = 3
  readyState = 0
  onopen = null
  onclose = null
  onerror = null
  onmessage = null
  constructor() {
    super()
    window.setTimeout(() => {
      this.readyState = 1
      const event = new Event('open')
      this.dispatchEvent(event)
      this.onopen?.(event)
    }, 60)
  }
  send(message: string) {
    window.setTimeout(() => {
      const event = new MessageEvent('message', { data: 'echo:' + message })
      this.dispatchEvent(event)
      this.onmessage?.(event)
    }, 120)
  }
  close() {
    this.readyState = 3
    const event = new CloseEvent('close')
    this.dispatchEvent(event)
    this.onclose?.(event)
  }
}

export default function UseWebSocketDemo() {
  const [patched, setPatched] = useState(false)

  useEffect(() => {
    const Original = window.WebSocket
    window.WebSocket = FakeWebSocket as unknown as typeof WebSocket
    setPatched(true)
    return () => { window.WebSocket = Original }
  }, [])

  const socket = useWebSocket('ws://simulated-kamod-hooks', { manual: !patched })

  return (
    <div>
      <p><strong>Transport:</strong> simulated in-browser WebSocket for the static docs build</p>
      <p><strong>Ready state:</strong> {socket.readyState}</p>
      <p><strong>Latest message:</strong> {socket.latestMessage?.data ?? 'none'}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => socket.connect()}>Connect</button>
        <button type="button" onClick={() => socket.sendMessage('hello')}>Send hello</button>
        <button type="button" onClick={() => socket.disconnect()}>Disconnect</button>
      </div>
    </div>
  )
}
