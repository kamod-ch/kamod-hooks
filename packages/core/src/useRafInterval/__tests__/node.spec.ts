import { renderHook } from '@testing-library/preact';
import { beforeAll, afterAll, describe, test, expect, vi } from 'vitest';
import useRafInterval from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number | undefined;
  options?: { immediate: boolean };
}

const setUp = ({ fn, delay, options }: ParamsObj) =>
  renderHook(() => useRafInterval(fn, delay, options));

const FRAME_TIME = 16;
describe('useRafInterval', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  afterAll(() => {
    vi.restoreAllMocks();
  });
  test('should downgrade to setInterval when requstAnimationFrame is undefined', () => {
    const requestAnimationFrame = window.requestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame;

    Object.defineProperty(window, 'cancelAnimationFrame', { value: undefined, configurable: true });
    Object.defineProperty(window, 'requestAnimationFrame', {
      value: undefined,
      configurable: true,
    });
    const callback = vi.fn();
    const hook = setUp({ fn: callback, delay: FRAME_TIME });
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(FRAME_TIME * 1.5);
    expect(callback).toHaveBeenCalledTimes(1);

    Object.defineProperty(window, 'requestAnimationFrame', {
      value: requestAnimationFrame,
      configurable: true,
    });
    Object.defineProperty(window, 'cancelAnimationFrame', {
      value: cancelAnimationFrame,
      configurable: true,
    });
    hook.unmount();
  });
});
