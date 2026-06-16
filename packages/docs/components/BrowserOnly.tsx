import type { ComponentChildren } from 'preact'
import { ClientOnly } from './ClientOnly'

interface BrowserOnlyProps {
  children: ComponentChildren
  fallback?: ComponentChildren
}

export function BrowserOnly({ children, fallback }: BrowserOnlyProps) {
  return <ClientOnly fallback={fallback ?? <div class="demo-placeholder">This demo starts after the page mounts in the browser.</div>}>{children}</ClientOnly>
}
