import { useState } from 'preact/hooks'
import { useIsomorphicLayoutEffect } from '@kamod-ch/hooks'

export default function UseIsomorphicLayoutEffectDemo() {
  const [width, setWidth] = useState(0)
  useIsomorphicLayoutEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  return <p><strong>Measured width after mount:</strong> {width}</p>
}
