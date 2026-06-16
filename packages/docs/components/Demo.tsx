import type { ComponentChildren } from 'preact'

export function Demo({ children }: { children: ComponentChildren }) {
  return <div class="demo-inline">{children}</div>
}
