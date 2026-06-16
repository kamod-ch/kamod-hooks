import { useSet } from '@kamod-ch/hooks'

export default function UseSetDemo() {
  const [tags, actions] = useSet(['preact'])

  return (
    <div>
      <p><strong>Tags:</strong> {[...tags].join(', ') || 'none'}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => actions.add('hooks')}>Add hooks</button>
        <button type="button" onClick={() => actions.add('docs')}>Add docs</button>
        <button type="button" onClick={() => actions.remove('preact')}>Remove preact</button>
        <button type="button" onClick={actions.reset}>Reset</button>
      </div>
    </div>
  )
}
