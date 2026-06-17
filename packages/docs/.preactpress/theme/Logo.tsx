import type { FunctionalComponent } from 'preact'

interface LogoProps {
  class?: string
  label: string
}

const Logo: FunctionalComponent<LogoProps> = ({ class: className, label }) => (
  <span class={`kh-logo ${className ?? ''}`.trim()} aria-label={label}>
    <svg aria-hidden="true" viewBox="0 0 48 48" width="48" height="48">
      <rect x="4" y="4" width="40" height="40" fill="currentColor" opacity="0.16" />
      <rect x="7" y="7" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M17 12h5v10h4V12h5v24h-5v-9h-4v9h-5z" fill="currentColor" />
    </svg>
    <span>{label}</span>
  </span>
)

export default Logo
