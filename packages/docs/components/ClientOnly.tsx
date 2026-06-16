import type { ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'

interface ClientOnlyProps {
  children: ComponentChildren
  fallback?: ComponentChildren
}

export function ClientOnly({ children, fallback = <div class="demo-placeholder">Loading demo…</div> }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <>{children}</> : <>{fallback}</>
}
