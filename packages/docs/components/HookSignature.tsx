interface HookSignatureProps {
  signature: string
}

export function HookSignature({ signature }: HookSignatureProps) {
  return (
    <div class="hook-signature">
      <div class="hook-signature-label">TypeScript signature</div>
      <pre><code>{signature}</code></pre>
    </div>
  )
}
