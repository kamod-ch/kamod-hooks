import { useResetState } from '@kamod-ch/hooks'

export default function UseResetStateDemo() {
  const [message, setMessage, reset] = useResetState('Hello hooks')

  return (
    <div>
      <label>
        Message
        <input value={message} onInput={(event) => setMessage(event.currentTarget.value)} />
      </label>
      <p><strong>Preview:</strong> {message}</p>
      <button type="button" onClick={reset}>Reset</button>
    </div>
  )
}
