import { act, renderHook } from '@testing-library/preact';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useUrlState from '../index';

describe('useUrlState', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/?foo=bar');
  });

  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  test('merges URL query with base defaults', () => {
    const { result } = renderHook(() => useUrlState({ baz: 'default' } as Record<string, string>));
    expect(result.current[0].foo).toBe('bar');
    expect(result.current[0].baz).toBe('default');
  });

  test('setState updates URL via pushState by default', () => {
    const pushState = vi.spyOn(window.history, 'pushState');
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current[1]({ foo: 'updated' });
    });

    expect(pushState).toHaveBeenCalled();
    expect(window.location.search).toContain('foo=updated');
  });

  test('setState can use replaceState when configured', () => {
    const replaceState = vi.spyOn(window.history, 'replaceState');
    const { result } = renderHook(() => useUrlState(undefined, { navigateMode: 'replace' }));

    act(() => {
      result.current[1]({ hello: 'world' });
    });

    expect(replaceState).toHaveBeenCalled();
    expect(window.location.search).toContain('hello=world');
  });

  test('reacts to popstate', () => {
    const { result } = renderHook(() => useUrlState());
    expect(result.current[0].foo).toBe('bar');

    act(() => {
      window.history.replaceState({}, '', '/?foo=pop');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current[0].foo).toBe('pop');
  });
});
