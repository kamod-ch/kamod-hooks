import type { ComponentChildren } from 'preact'
import { BrowserOnly } from './BrowserOnly'
import { DemoContainer } from './DemoContainer'
import { DocsLink } from './DocsLink'
import { HookSignature } from './HookSignature'

interface HookDocProps {
  name: string
  description: string
  importCode: string
  signature: string
  source: string
  demoTitle?: string
  demoDescription?: string
  notes?: string[]
  ssr?: string
  browser?: string
  related?: { name: string; href: string }[]
  browserOnly?: boolean
  children: ComponentChildren
}

export function HookDoc({ name, description, importCode, signature, source, demoTitle = 'Basic demo', demoDescription = description, notes, ssr, browser, related, browserOnly, children }: HookDocProps) {
  return (
    <>
      <p>{description}</p>
      <h2>Import</h2>
      <pre><code>{importCode}</code></pre>
      <h2>Live demo</h2>
      <DemoContainer title={demoTitle} description={demoDescription} source={source} browserOnly={browserOnly}>
        {browserOnly ? <BrowserOnly>{children}</BrowserOnly> : children}
      </DemoContainer>
      <h2>API</h2>
      <HookSignature signature={signature} />
      {notes?.length ? (
        <>
          <h2>Notes</h2>
          <ul>{notes.map((note) => <li key={note}>{note}</li>)}</ul>
        </>
      ) : null}
      {ssr ? (
        <>
          <h2>SSR considerations</h2>
          <p>{ssr}</p>
        </>
      ) : null}
      {browser ? (
        <>
          <h2>Browser compatibility</h2>
          <p>{browser}</p>
        </>
      ) : null}
      {related?.length ? (
        <>
          <h2>Related hooks</h2>
          <ul>{related.map((item) => <li key={item.href}><DocsLink href={item.href}>{item.name}</DocsLink></li>)}</ul>
        </>
      ) : null}
    </>
  )
}
