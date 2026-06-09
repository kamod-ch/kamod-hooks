import { act, renderHook, waitFor } from '@testing-library/preact';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useInfiniteScroll from '../index';

describe('useInfiniteScroll', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    vi.spyOn(container, 'clientHeight', 'get').mockReturnValue(300);
    vi.spyOn(container, 'scrollHeight', 'get').mockReturnValue(1000);
    Object.defineProperty(container, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0,
    });
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('loads initial page on mount', async () => {
    const service = vi
      .fn()
      .mockResolvedValueOnce({ list: [1, 2], nextId: 2 })
      .mockResolvedValueOnce({ list: [3], nextId: undefined });

    const { result } = renderHook(() =>
      useInfiniteScroll(service, {
        target: () => container,
        isNoMore: (data) => data?.nextId === undefined,
      }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(service).toHaveBeenCalledTimes(1);
    expect(result.current.data?.list).toEqual([1, 2]);
  });

  test('loadMore appends next page', async () => {
    const service = vi
      .fn()
      .mockResolvedValueOnce({ list: [1], nextId: 1 })
      .mockResolvedValueOnce({ list: [2], nextId: undefined });

    const { result } = renderHook(() =>
      useInfiniteScroll(service, {
        target: () => container,
        isNoMore: (data) => data?.nextId === undefined,
      }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => expect(result.current.data?.list).toEqual([1, 2]));
    expect(service).toHaveBeenCalledTimes(2);
  });
});
