/**
 * Native Fullscreen API with a screenfull-like surface (for useFullscreen + tests).
 */
export const domFullscreen = {
  get isEnabled(): boolean {
    return typeof document !== "undefined" && !!document.fullscreenEnabled;
  },
  get element(): Element | null {
    return typeof document !== "undefined" ? document.fullscreenElement : null;
  },
  request(el: Element): Promise<void> {
    const r = (el as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> })
      .requestFullscreen?.() ??
      (el as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> })
        .webkitRequestFullscreen?.();
    return r ?? Promise.resolve();
  },
  exit(): Promise<void> {
    return document.exitFullscreen?.() ?? Promise.resolve();
  },
  on(_event: "change", fn: () => void): void {
    document.addEventListener("fullscreenchange", fn);
  },
  off(_event: "change", fn: () => void): void {
    document.removeEventListener("fullscreenchange", fn);
  }
};

export default domFullscreen;
