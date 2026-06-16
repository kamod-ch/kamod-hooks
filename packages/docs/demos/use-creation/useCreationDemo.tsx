import { useState } from 'preact/hooks'
import { useCreation } from '@kamod-ch/hooks'

export default function UseCreationDemo() {
  const [seed, setSeed] = useState(1)
  const value = useCreation(() => ({ seed, createdAt: Date.now() }), [seed])

  return (
    <div>
      <pre>{JSON.stringify(value, null, 2)}</pre>
      <button type="button" onClick={() => setSeed((current) => current + 1)}>Recreate with new dep</button>
    </div>
  )
}
