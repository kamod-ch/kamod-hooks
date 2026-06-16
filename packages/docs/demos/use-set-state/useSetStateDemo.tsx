import { useSetState } from '@kamod-ch/hooks'

export default function UseSetStateDemo() {
  const [state, setState] = useSetState({ name: 'Ada', role: 'Maintainer' })

  return (
    <div>
      <label>
        Name
        <input value={state.name} onInput={(event) => setState({ name: event.currentTarget.value })} />
      </label>
      <label>
        Role
        <input value={state.role} onInput={(event) => setState({ role: event.currentTarget.value })} />
      </label>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}
