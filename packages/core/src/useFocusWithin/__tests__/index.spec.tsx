import { renderHook } from "@testing-library/preact";
import { describe, expect, test } from "vitest";
import { useRef } from "preact/hooks";
import useFocusWithin from "../index";

describe("useFocusWithin", () => {
  test("mounts with a DOM ref without throwing", () => {
    const el = document.createElement("div");
    const { unmount } = renderHook(() => useFocusWithin({ current: el }, {}));
    unmount();
    expect(true).toBe(true);
  });
});
