// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { AppTools } from "./app-tools";
import { createStateStore } from "./testing/state-store";

const definitions = [
  {
    name: "pick",
    inputSchema: { type: "object" },
    actions: { action: "openFilePicker" },
    result: {},
  },
  {
    name: "next",
    inputSchema: { type: "object" },
    actions: { action: "setState", key: "done", value: true },
    result: {},
  },
];
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  document.body.replaceChildren();
});
it.each(["host", "replace"])(
  "cleans up a picker on %s cancellation and advances the queue",
  async (operation) => {
    vi.useFakeTimers();
    vi.spyOn(HTMLInputElement.prototype, "click").mockImplementation(() => {});
    const removed = vi.spyOn(window, "removeEventListener");
    const state = createStateStore({ done: false });
    const tools = new AppTools(null);
    tools.replace(definitions, state);
    const controller = new AbortController();
    const pending = tools.call("pick", {}, { signal: controller.signal });
    await Promise.resolve();
    expect(document.querySelector('input[type="file"]')).not.toBeNull();
    window.dispatchEvent(new Event("focus"));
    if (operation === "host") controller.abort();
    else tools.replace(definitions, state);
    expect(document.querySelector('input[type="file"]')).toBeNull();
    expect(removed.mock.calls.some(([name]) => name === "focus")).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
    expect((await pending).isError).toBe(true);
    expect((await tools.call("next")).isError).not.toBe(true);
    expect(state.get("done")).toBe(true);
  },
);

it("aborts a selected file read without late success or DOM leftovers", async () => {
  vi.spyOn(HTMLInputElement.prototype, "click").mockImplementation(() => {});
  vi.spyOn(FileReader.prototype, "readAsDataURL").mockImplementation(() => {});
  const abort = vi.spyOn(FileReader.prototype, "abort");
  const state = createStateStore({ done: false });
  const tools = new AppTools(null);
  tools.replace(
    [
      {
        ...definitions[0],
        actions: {
          action: "openFilePicker",
          onSuccess: { action: "setState", key: "done", value: true },
        },
      },
    ],
    state,
  );
  const controller = new AbortController();
  const pending = tools.call("pick", {}, { signal: controller.signal });
  await Promise.resolve();
  const input = document.querySelector("input")!;
  Object.defineProperty(input, "files", {
    value: [new File(["test"], "fixture.txt")],
  });
  input.dispatchEvent(new Event("change"));
  controller.abort();
  expect((await pending).isError).toBe(true);
  expect(abort).toHaveBeenCalledTimes(1);
  expect(document.querySelector("input")).toBeNull();
  expect(state.get("done")).toBe(false);
});

it("removes the focus listener after a successful selection", async () => {
  vi.useFakeTimers();
  vi.spyOn(HTMLInputElement.prototype, "click").mockImplementation(() => {});
  const removed = vi.spyOn(window, "removeEventListener");
  const tools = new AppTools(null);
  tools.replace(definitions, createStateStore({}));
  const pending = tools.call("pick");
  await Promise.resolve();
  document.querySelector("input")!.dispatchEvent(new Event("change"));
  expect((await pending).isError).not.toBe(true);
  expect(document.querySelector("input")).toBeNull();
  expect(removed.mock.calls.some(([name]) => name === "focus")).toBe(true);
  window.dispatchEvent(new Event("focus"));
  expect(vi.getTimerCount()).toBe(0);
});
