import type { ComponentChildren, ErrorInfo } from 'preact'
import { Component } from 'preact'

interface Props {
  children: ComponentChildren
}

interface State {
  error?: Error
  key: number
}

export class DemoErrorBoundary extends Component<Props, State> {
  override state: State = { key: 0 }

  static override getDerivedStateFromError(error: Error): Partial<State> {
    return { error }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Demo crashed', error, errorInfo)
  }

  private retry = () => {
    this.setState((state) => ({ error: undefined, key: state.key + 1 }))
  }

  override render() {
    if (this.state.error) {
      return (
        <div class="demo-error" role="alert">
          <strong>Demo error</strong>
          <p>{this.state.error.message}</p>
          <button type="button" onClick={this.retry}>Restart demo</button>
        </div>
      )
    }

    return <div key={this.state.key}>{this.props.children}</div>
  }
}
