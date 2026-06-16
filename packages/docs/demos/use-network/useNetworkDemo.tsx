import { useNetwork } from '@kamod-ch/hooks'

export default function UseNetworkDemo() {
  const network = useNetwork()
  return <pre>{JSON.stringify(network, null, 2)}</pre>
}
