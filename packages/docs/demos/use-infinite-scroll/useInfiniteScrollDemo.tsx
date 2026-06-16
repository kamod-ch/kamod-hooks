import { useRef } from 'preact/hooks'
import { useInfiniteScroll } from '@kamod-ch/hooks'

const total = 18
async function load(current?: { list: string[]; cursor: number }) {
  await new Promise((resolve) => window.setTimeout(resolve, 300))
  const cursor = current?.cursor ?? 0
  const next = Array.from({ length: 6 }, (_, index) => 'Item ' + (cursor + index + 1))
  return { list: next, cursor: cursor + next.length }
}

export default function UseInfiniteScrollDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const result = useInfiniteScroll(load, {
    target: ref,
    isNoMore: (data) => (data?.cursor ?? 0) >= total
  })

  return (
    <div>
      <div ref={ref} class="demo-scroll-box">
        {(result.data?.list ?? []).map((item) => <p key={item}>{item}</p>)}
        <p>{result.loadingMore ? 'Loading more…' : result.noMore ? 'No more items.' : 'Scroll to the bottom.'}</p>
      </div>
      <button type="button" onClick={result.reload}>Reload</button>
    </div>
  )
}
