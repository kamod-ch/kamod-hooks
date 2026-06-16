import { useAntdTable } from '@kamod-ch/hooks'

async function service({ current, pageSize }: { current: number; pageSize: number }) {
  await new Promise((resolve) => window.setTimeout(resolve, 200))
  const total = 24
  const start = (current - 1) * pageSize
  return { total, list: Array.from({ length: pageSize }, (_, index) => ({ id: start + index + 1, name: 'Row ' + (start + index + 1) })) }
}

export default function UseAntdTableDemo() {
  const table = useAntdTable(service)

  return (
    <div>
      <p><strong>Page:</strong> {table.pagination.current}</p>
      <ul>{table.tableProps.dataSource.map((row) => <li key={row.id}>{row.name}</li>)}</ul>
      <div class="demo-actions">
        <button type="button" onClick={() => table.pagination.changeCurrent(Math.max(1, table.pagination.current - 1))}>Previous</button>
        <button type="button" onClick={() => table.pagination.changeCurrent(table.pagination.current + 1)}>Next</button>
      </div>
    </div>
  )
}
