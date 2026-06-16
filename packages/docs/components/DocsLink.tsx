import type { ComponentChildren } from 'preact'
import { withBase } from '@kamod-ch/preactpress/client'

const base = '/kamod-hooks/'

interface DocsLinkProps {
  href: string
  class?: string
  children: ComponentChildren
}

export function DocsLink({ href, class: className, children }: DocsLinkProps) {
  return <a class={className} href={withBase(base, href)}>{children}</a>
}
