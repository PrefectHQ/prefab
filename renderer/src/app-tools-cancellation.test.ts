import { expect, it, vi } from "vitest";
import { AppTools } from "./app-tools";
import { createStateStore } from "./testing/state-store";

it.each(["pending", "late failure"])(
  "releases the queue after cancelling an SDK request with %s",
  async (outcome) => {
    let reject!: (error: Error) => void;
    const app = {
      sendMessage: vi.fn(
        () =>
          new Promise((_resolve, fail) => {
            reject = fail;
          }),
      ),
    };
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    const state = createStateStore({ done: false, stale: false });
    const tools = new AppTools(app as never);
    tools.replace(
      [
        {
          name: "send",
          inputSchema: { type: "object" },
          result: {},
          actions: {
            action: "sendMessage",
            content: "test",
            onError: { action: "setState", key: "stale", value: true },
          },
        },
        {
          name: "next",
          inputSchema: { type: "object" },
          result: {},
          actions: { action: "setState", key: "done", value: true },
        },
      ],
      state,
    );
    const controller = new AbortController();
    const first = tools.call("send", {}, { signal: controller.signal });
    await Promise.resolve();
    expect(app.sendMessage).toHaveBeenCalledTimes(1);
    const next = tools.call("next");
    controller.abort();
    // Flush a bounded number of microtasks; a hung promise must not time out the test.
    for (let i = 0; i < 20; i++) await Promise.resolve();
    expect(state.get("done")).toBe(true);
    expect((await first).isError).toBe(true);
    await next;
    if (outcome === "late failure") {
      reject(new Error("Late SDK failure"));
      for (let i = 0; i < 20; i++) await Promise.resolve();
      expect(warning).toHaveBeenCalledWith(
        "[Prefab] Action failed after cancellation",
        expect.objectContaining({ message: "Late SDK failure" }),
      );
    }
    expect(state.get("stale")).toBe(false);
    warning.mockRestore();
  },
);
