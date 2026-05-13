import type { DebouncedFunc } from "./debounce";
import { debounce } from "./debounce";

export interface ThrottleSettings {
  leading?: boolean;
  trailing?: boolean;
}

/** Lodash-style throttle implemented via debounce(maxWait = wait). */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: ThrottleSettings = {}
): DebouncedFunc<T> {
  return debounce(func, wait, {
    leading: options.leading ?? true,
    trailing: options.trailing ?? true,
    maxWait: wait
  });
}
