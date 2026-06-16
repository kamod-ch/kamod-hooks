import { useEffect, useState } from 'preact/hooks'
import { useWhyDidYouUpdate } from '@kamod-ch/hooks'

function Child(props: { count: number; label: string }) {
  useWhyDidYouUpdate('WhyDidYouUpdateDemo', props)
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}

export default function UseWhyDidYouUpdateDemo() {
  const [count, setCount] = useState(0)
  const [label, setLabel] = useState('draft')
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const original = console.log
    console.log = (...args) => {
      if (args[0] === '[why-did-you-update]') {
        setLogs((value) => [JSON.stringify(args.slice(1)), ...value].slice(0, 3))
      }
      original(...args)
    }
    return () => {
      console.log = original
    }
  }, [])

  return (
    <div>
      <Child count={count} label={label} />
      <div class="demo-actions">
        <button type="button" onClick={() => setCount((value) => value + 1)}>Change count</button>
        <button type="button" onClick={() => setLabel((value) => value === 'draft' ? 'published' : 'draft')}>Change label</button>
      </div>
      <pre>{logs.join('\n') || 'No console log captured yet.'}</pre>
    </div>
  )
}
