import { useCookieState } from '@kamod-ch/hooks'

const key = 'kamod-hooks-demo-use-cookie-state'

export default function UseCookieStateDemo() {
  const [value, setValue] = useCookieState(key, { defaultValue: 'cookie', path: '/' })

  return (
    <div>
      <input value={value ?? ''} onInput={(event) => setValue(event.currentTarget.value, { path: '/' })} />
      <p><strong>Cookie value:</strong> {value ?? 'undefined'}</p>
      <button type="button" onClick={() => setValue(undefined, { path: '/', expires: -1 })}>Delete cookie</button>
    </div>
  )
}
