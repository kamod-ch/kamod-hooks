import "@testing-library/jest-dom/vitest";
import { teardown } from "preact/test-utils";
import { afterEach } from "vitest";

afterEach(() => {
  teardown();
});

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  constructor(_cb: ResizeObserverCallback) {}
}

if (typeof globalThis.ResizeObserver === "undefined") {
  (globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver =
    ResizeObserverStub as unknown as typeof ResizeObserver;
}
