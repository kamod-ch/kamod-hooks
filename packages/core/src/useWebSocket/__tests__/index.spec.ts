import { act, renderHook, waitFor } from '@testing-library/preact';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useWebSocket, { ReadyState } from '../index';

class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  url: string;
  protocols?: string | string[];
  readyState = MockWebSocket.CONNECTING;
  onopen: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  send = vi.fn();
  close = vi.fn(() => {
    this.readyState = MockWebSocket.CLOSED;
    this.onclose?.({} as CloseEvent);
  });

  constructor(url: string, protocols?: string | string[]) {
    this.url = url;
    this.protocols = protocols;
    MockWebSocket.instances.push(this);
  }

  static instances: MockWebSocket[] = [];

  open() {
    this.readyState = MockWebSocket.OPEN;
    this.onopen?.({} as Event);
  }

  emitMessage(data: string) {
    this.onmessage?.({ data } as MessageEvent);
  }
}

describe('useWebSocket', () => {
  beforeEach(() => {
    MockWebSocket.instances = [];
    vi.stubGlobal('WebSocket', MockWebSocket);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('connects automatically and tracks open state', async () => {
    const onOpen = vi.fn();
    const { result } = renderHook(() =>
      useWebSocket('ws://localhost/test', { onOpen }),
    );

    expect(result.current.readyState).toBe(ReadyState.Connecting);
    expect(MockWebSocket.instances).toHaveLength(1);

    act(() => {
      MockWebSocket.instances[0].open();
    });

    await waitFor(() => expect(result.current.readyState).toBe(ReadyState.Open));
    expect(onOpen).toHaveBeenCalled();
  });

  test('sendMessage sends when open', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost/send'));

    act(() => {
      MockWebSocket.instances[0].open();
    });

    await waitFor(() => expect(result.current.readyState).toBe(ReadyState.Open));

    act(() => {
      result.current.sendMessage('hello');
    });

    expect(MockWebSocket.instances[0].send).toHaveBeenCalledWith('hello');
  });

  test('manual mode does not connect until connect is called', () => {
    const { result } = renderHook(() =>
      useWebSocket('ws://localhost/manual', { manual: true }),
    );

    expect(MockWebSocket.instances).toHaveLength(0);

    act(() => {
      result.current.connect();
    });

    expect(MockWebSocket.instances).toHaveLength(1);
  });

  test('stores latest message', async () => {
    const onMessage = vi.fn();
    const { result } = renderHook(() =>
      useWebSocket('ws://localhost/message', { onMessage }),
    );

    act(() => {
      MockWebSocket.instances[0].open();
      MockWebSocket.instances[0].emitMessage('payload');
    });

    await waitFor(() => expect(result.current.latestMessage?.data).toBe('payload'));
    expect(onMessage).toHaveBeenCalled();
  });
});
