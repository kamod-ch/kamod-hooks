import { useCallback, useEffect, useRef } from 'preact/hooks';
import useLatest from '../useLatest';
import { isNumber } from '../utils';

interface Handle {
  id: ReturnType<typeof setInterval> | ReturnType<typeof requestAnimationFrame>;
  mode: 'interval' | 'raf';
}

const setRafInterval = (callback: () => void, delay: number = 0): Handle => {
  if (typeof requestAnimationFrame === 'undefined') {
    return {
      id: setInterval(callback, delay),
      mode: 'interval',
    };
  }
  let start = Date.now();
  const handle: Handle = {
    id: 0,
    mode: 'raf',
  };
  const loop = () => {
    const current = Date.now();
    handle.id = requestAnimationFrame(loop);
    if (current - start >= delay) {
      callback();
      start = Date.now();
    }
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

const clearRafInterval = (handle: Handle) => {
  if (handle.mode === 'interval') {
    clearInterval(handle.id as ReturnType<typeof setInterval>);
    return;
  }
  cancelAnimationFrame(handle.id as number);
};

function useRafInterval(
  fn: () => void,
  delay: number | undefined,
  options?: {
    immediate?: boolean;
  },
) {
  const immediate = options?.immediate;

  const fnRef = useLatest(fn);
  const timerRef = useRef<Handle>(undefined);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearRafInterval(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) {
      return;
    }
    if (immediate) {
      fnRef.current();
    }
    timerRef.current = setRafInterval(() => {
      fnRef.current();
    }, delay);
    return clear;
  }, [delay]);

  return clear;
}

export default useRafInterval;
