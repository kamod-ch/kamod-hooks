import type { ComponentChildren } from 'preact'
import { DemoErrorBoundary } from './DemoErrorBoundary'
import { DemoSource } from './DemoSource'

interface DemoContainerProps {
  title: string
  description: string
  source: string
  children: ComponentChildren
  resetLabel?: string
  onReset?: () => void
  browserOnly?: boolean
}

export function DemoContainer({ title, description, source, children, resetLabel = 'Reset', onReset, browserOnly }: DemoContainerProps) {
  return (
    <section class="demo-card">
      <div class="demo-card-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {onReset ? <button type="button" onClick={onReset}>{resetLabel}</button> : null}
      </div>
      {browserOnly ? <p class="demo-note">Browser-only demo</p> : null}
      <DemoErrorBoundary>
        <div class="demo-preview">{children}</div>
      </DemoErrorBoundary>
      <DemoSource source={source} />
    </section>
  )
}
