import { renderHook } from '@testing-library/preact';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BasicTarget } from '../../utils/domTarget';
import type { Options } from '../index';
import useDrag from '../index';

const setup = <T>(data: T, target: BasicTarget, options?: Options) =>
  renderHook((newData: T) => useDrag(newData ? newData : data, target, options));

const events: Record<string, (event: any) => void> = {};
const mockTarget = {
  addEventListener: vi.fn((event, callback) => {
    events[event] = callback;
  }),
  removeEventListener: vi.fn((event) => {
    Reflect.deleteProperty(events, event);
  }),
  setAttribute: vi.fn(),
  removeAttribute: vi.fn(),
};

describe('useDrag', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('should add/remove listener on mount/unmount', () => {
    const { unmount } = setup(1, mockTarget as any);
    expect(mockTarget.addEventListener).toHaveBeenCalled();
    expect(mockTarget.addEventListener.mock.calls[0][0]).toBe('dragstart');
    expect(mockTarget.addEventListener.mock.calls[1][0]).toBe('dragend');
    expect(mockTarget.setAttribute).toHaveBeenCalledWith('draggable', 'true');
    unmount();
    expect(mockTarget.removeEventListener).toHaveBeenCalled();
    expect(mockTarget.removeAttribute).toHaveBeenCalledWith('draggable');
  });

  test('should trigger drag callback', () => {
    const onDragStart = vi.fn();
    const onDragEnd = vi.fn();
    const mockEvent = {
      dataTransfer: {
        setData: vi.fn(),
      },
    };
    const hook = setup(1, mockTarget as any, {
      onDragStart,
      onDragEnd,
    });
    events.dragstart(mockEvent);
    expect(onDragStart).toHaveBeenCalled();
    expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('custom', '1');
    events.dragend(mockEvent);
    expect(onDragEnd).toHaveBeenCalled();

    hook.rerender(2);

    events.dragstart(mockEvent);
    expect(onDragStart).toHaveBeenCalled();
    expect(mockEvent.dataTransfer.setData).toHaveBeenLastCalledWith('custom', '2');
    events.dragend(mockEvent);
    expect(onDragEnd).toHaveBeenCalled();
  });

  test(`should not work when target don't support addEventListener method`, () => {
    const brokenTarget = {
      setAttribute: vi.fn(),
      removeAttribute: vi.fn(),
    };
    Object.defineProperty(brokenTarget, 'addEventListener', {
      get() {
        return false;
      },
    });
    setup(1, brokenTarget as any);
    expect(brokenTarget.setAttribute).not.toHaveBeenCalled();
  });

  test('should set custom drag image on dragstart', () => {
    const imageElement = document.createElement('img');
    const setDragImage = vi.fn();
    const mockEvent = {
      dataTransfer: {
        setData: vi.fn(),
        setDragImage,
      },
    };

    setup(1, mockTarget as any, {
      dragImage: { image: imageElement, offsetX: 4, offsetY: 8 },
    });

    events.dragstart(mockEvent);
    expect(setDragImage).toHaveBeenCalledWith(imageElement, 4, 8);
  });
});
