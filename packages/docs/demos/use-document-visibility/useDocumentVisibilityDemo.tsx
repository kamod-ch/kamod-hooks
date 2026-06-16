import { useDocumentVisibility } from '@kamod-ch/hooks'

export default function UseDocumentVisibilityDemo() {
  const visibility = useDocumentVisibility()
  return <p><strong>document.visibilityState:</strong> {visibility ?? 'unsupported'}</p>
}
