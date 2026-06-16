---
title: Getting started
description: Render your first hook-backed Preact component.
---

```tsx
import { render } from 'preact'
import { useToggle } from '@kamod-ch/hooks'

function Demo() {
  const [enabled, actions] = useToggle(false)

  return (
    <button type="button" onClick={actions.toggle}>
      {enabled ? 'Enabled' : 'Disabled'}
    </button>
  )
}

render(<Demo />, document.getElementById('app')!)
```

## Suggested workflow

1. browse `/hooks` for the hook you need
2. copy a demo that matches your use case
3. check the generated type signature on the hook page
4. review SSR notes for browser-only hooks before using them in static or server-rendered apps
