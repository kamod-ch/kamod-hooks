import { useMemo, useRef } from 'preact/hooks'
import { useVirtualList } from '@kamod-ch/hooks'

export default function UseVirtualListDemo() {
  const list = useMemo(() => Array.from({ length: 200 }, (_, index) => 'Row ' + (index + 1)), [])
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [visible, scrollTo] = useVirtualList(list, { containerTarget: containerRef, wrapperTarget: wrapperRef, itemHeight: 36, overscan: 4 })

  return (
    <div>
      <p><strong>Total items:</strong> {list.length} · <strong>Rendered items:</strong> {visible.length}</p>
      <button type="button" onClick={() => scrollTo(120)}>Scroll to item 121</button>
      <div ref={containerRef} class="demo-scroll-box" style={{ height: '220px' }}>
        <div ref={wrapperRef}>
          {visible.map((item) => <div key={item.index} class="demo-virtual-row">{item.data}</div>)}
        </div>
      </div>
    </div>
  )
}
