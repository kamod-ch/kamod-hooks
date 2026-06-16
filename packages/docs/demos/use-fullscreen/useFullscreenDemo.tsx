import { useRef } from 'preact/hooks'
import { useFullscreen } from '@kamod-ch/hooks'

export default function UseFullscreenDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [isFullscreen, actions] = useFullscreen(ref)

  return (
    <div>
      <div ref={ref} class="demo-target-box demo-large-box">Fullscreen target</div>
      <p><strong>Fullscreen:</strong> {String(isFullscreen)} · <strong>Supported:</strong> {String(actions.isEnabled)}</p>
      <div class="demo-actions">
        <button type="button" onClick={actions.enterFullscreen}>Enter</button>
        <button type="button" onClick={actions.exitFullscreen}>Exit</button>
      </div>
    </div>
  )
}
