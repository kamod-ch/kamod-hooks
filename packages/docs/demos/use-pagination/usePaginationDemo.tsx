import { usePagination } from '@kamod-ch/hooks'

async function service({ current, pageSize }: { current: number; pageSize: number }) {
  await new Promise((resolve) => window.setTimeout(resolve, 200))
  const total = 42
  const start = (current - 1) * pageSize
  return { total, list: Array.from({ length: pageSize }, (_, index) => 'Item ' + (start + index + 1)) }
}

export default function UsePaginationDemo() {
  const result = usePagination(service)

  return (
    <div>
      <p><strong>Page:</strong> {result.pagination.current} / {result.pagination.totalPage}</p>
      <ul>{(result.data?.list ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
      <div class="demo-actions">
        <button type="button" onClick={() => result.pagination.changeCurrent(Math.max(1, result.pagination.current - 1))}>Previous</button>
        <button type="button" onClick={() => result.pagination.changeCurrent(result.pagination.current + 1)}>Next</button>
      </div>
    </div>
  )
}
