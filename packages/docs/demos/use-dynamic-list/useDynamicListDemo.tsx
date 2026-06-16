import { useDynamicList } from '@kamod-ch/hooks'

export default function UseDynamicListDemo() {
  const list = useDynamicList(['alpha', 'beta', 'gamma'])

  return (
    <div>
      <ol>{list.list.map((item, index) => <li key={list.getKey(index)}>{item}</li>)}</ol>
      <div class="demo-actions">
        <button type="button" onClick={() => list.push('delta')}>Push</button>
        <button type="button" onClick={() => list.remove(1)}>Remove second</button>
        <button type="button" onClick={() => list.move(0, list.list.length - 1)}>Move first to last</button>
        <button type="button" onClick={() => list.resetList(['alpha', 'beta', 'gamma'])}>Reset</button>
      </div>
    </div>
  )
}
