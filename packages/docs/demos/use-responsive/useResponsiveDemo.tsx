import { useEffect, useState } from 'preact/hooks'
import { configResponsive, useResponsive } from '@kamod-ch/hooks'

export default function UseResponsiveDemo() {
  const [width, setWidth] = useState(0)
  const info = useResponsive()

  useEffect(() => {
    configResponsive({ mobile: 0, tablet: 640, desktop: 1024 })
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div>
      <p><strong>Window width:</strong> {width}</p>
      <pre>{JSON.stringify(info, null, 2)}</pre>
      <p>Resize the browser window to see the flags update.</p>
    </div>
  )
}
