import { renderHook } from "@testing-library/preact";

export * from "@testing-library/preact";

const customRender: typeof renderHook = (ui, options) => renderHook(ui, { ...options });

export { customRender as renderHook };
