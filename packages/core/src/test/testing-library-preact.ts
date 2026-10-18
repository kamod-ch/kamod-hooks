import {
  act,
  cleanup as baseCleanup,
  fireEvent,
  render as baseRender,
  renderHook as baseRenderHook,
} from '@testing-library/preact/pure';

export * from '@testing-library/dom';

type Unmountable = { unmount: () => void };

function withActUnmount<T extends Unmountable>(result: T): T {
  const { unmount } = result;
  return {
    ...result,
    unmount: () => {
      act(() => {
        unmount();
      });
    },
  };
}

export function render(...args: Parameters<typeof baseRender>) {
  return withActUnmount(baseRender(...args));
}

export function renderHook(...args: Parameters<typeof baseRenderHook>) {
  return withActUnmount(baseRenderHook(...args));
}

export function cleanup() {
  act(() => {
    baseCleanup();
  });
}

export { act, fireEvent };
