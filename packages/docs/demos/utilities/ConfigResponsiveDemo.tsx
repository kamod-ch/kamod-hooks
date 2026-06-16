import { useEffect, useState } from 'preact/hooks'
import { configResponsive, useResponsive } from '@kamod-ch/hooks'

export default function ConfigResponsiveDemo() {
  const info = useResponsive()
  const [width, setWidth] = useState(0)

  useEffect(() => {
    configResponsive({ compact: 0, comfy: 720, wide: 1080 })
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div>
      <p><strong>Window width:</strong> {width}</p>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </div>
  )
}
