import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { AppTools } from "./app-tools";
import { clearAllIntervals } from "./actions";
import { createStateStore } from "./testing/state-store";

const schedule = {
  name: "schedule",
  inputSchema: { type: "object" },
  actions: {
    action: "setInterval",
    duration: 10,
    onTick: { action: "setState", key: "count", value: "{{ count + 1 }}" },
  },
  result: {},
};

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  clearAllIntervals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

it.each(["replace", "clear"] as const)(
  "disposes completed tool intervals on %s",
  async (operation) => {
    const state = createStateStore({ count: 0 });
    const tools = new AppTools(null);
    tools.replace([schedule], state);
    expect((await tools.call("schedule")).isError).not.toBe(true);
    expect(vi.getTimerCount()).toBe(1);

    if (operation === "replace") tools.replace([], state);
    else tools.clear();

    expect(vi.getTimerCount()).toBe(0);
    await vi.advanceTimersByTimeAsync(20);
    expect(state.get("count")).toBe(0);
  },
);

it("does not dispose another app instance's intervals", async () => {
  const first = createStateStore({ count: 0 });
  const second = createStateStore({ count: 0 });
  const a = new AppTools(null);
  const b = new AppTools(null);
  a.replace([schedule], first);
  b.replace([schedule], second);
  await a.call("schedule");
  await b.call("schedule");

  a.clear();

  expect(vi.getTimerCount()).toBe(1);
  await vi.advanceTimersByTimeAsync(10);
  expect(first.get("count")).toBe(0);
  expect(second.get("count")).toBe(1);
  b.clear();
});

it.each(["replace", "global cleanup"])(
  "aborts a deferred Fetch tick on %s",
  async (operation) => {
    let signal: AbortSignal | undefined;
    const fetcher = vi.spyOn(globalThis, "fetch").mockImplementation(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          signal = init?.signal ?? undefined;
          signal?.addEventListener(
            "abort",
            () => reject(new DOMException("Cancelled", "AbortError")),
            { once: true },
          );
        }),
    );
    const state = createStateStore({ count: 0 });
    const tools = new AppTools(null);
    tools.replace(
      [
        {
          ...schedule,
          actions: {
            ...schedule.actions,
            onTick: {
              action: "fetch",
              url: "https://example.com",
              onSuccess: { action: "setState", key: "count", value: 100 },
            },
          },
        },
      ],
      state,
    );
    await tools.call("schedule");
    await vi.advanceTimersByTimeAsync(10);
    expect(fetcher).toHaveBeenCalledTimes(1);

    if (operation === "replace") tools.replace([], state);
    else clearAllIntervals();

    expect(signal?.aborted).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
    await vi.advanceTimersByTimeAsync(20);
    expect(state.get("count")).toBe(0);
  },
);

it("allows natural completion callbacks before releasing owned resources", async () => {
  const state = createStateStore({ count: 0 });
  const tools = new AppTools(null);
  tools.replace(
    [
      {
        ...schedule,
        actions: {
          ...schedule.actions,
          count: 1,
          onComplete: { action: "setState", key: "done", value: true },
        },
      },
    ],
    state,
  );
  await tools.call("schedule");
  await vi.advanceTimersByTimeAsync(10);
  expect(state.get("count")).toBe(1);
  expect(state.get("done")).toBe(true);
  expect(vi.getTimerCount()).toBe(0);
  tools.clear();
});

it.each(["onTick", "onComplete"])(
  "does not hide an unrelated %s exception",
  async (callback) => {
    const base = createStateStore({ count: 0 });
    let fail = false;
    const state = {
      ...base,
      getAll: () => {
        if (fail) throw new Error("Unexpected state failure");
        return base.getAll();
      },
    };
    const timer = vi.spyOn(globalThis, "setInterval");
    const tools = new AppTools(null);
    tools.replace(
      [
        {
          ...schedule,
          actions: {
            action: "setInterval",
            duration: 10,
            count: 1,
            [callback]: schedule.actions.onTick,
          },
        },
      ],
      state,
    );
    await tools.call("schedule");
    const tick = timer.mock.calls[0][0] as () => Promise<void>;
    fail = true;
    await expect(tick()).rejects.toThrow("Unexpected state failure");
    tools.clear();
  },
);

it("keeps a nested scheduling tool alive after its caller returns normally", async () => {
  const state = createStateStore({ count: 0 });
  const tools = new AppTools(null);
  tools.replace(
    [
      schedule,
      {
        name: "outer",
        inputSchema: { type: "object" },
        actions: { action: "invokeAppTool", tool: "schedule" },
        result: {},
      },
    ],
    state,
  );
  expect((await tools.call("outer")).isError).not.toBe(true);
  expect(vi.getTimerCount()).toBe(1);
  await vi.advanceTimersByTimeAsync(10);
  expect(state.get("count")).toBe(1);
  tools.clear();
});

it("keeps an interval scheduled by a normal onComplete tool alive", async () => {
  const state = createStateStore({ count: 0 });
  const tools = new AppTools(null);
  tools.replace(
    [
      schedule,
      {
        name: "outer",
        inputSchema: { type: "object" },
        result: {},
        actions: {
          action: "setInterval",
          duration: 10,
          count: 1,
          onComplete: { action: "invokeAppTool", tool: "schedule" },
        },
      },
    ],
    state,
  );
  await tools.call("outer");
  await vi.advanceTimersByTimeAsync(10);
  expect(vi.getTimerCount()).toBe(1);
  await vi.advanceTimersByTimeAsync(10);
  expect(state.get("count")).toBe(1);
  tools.clear();
  expect(vi.getTimerCount()).toBe(0);
});

it("retains ownership of overlapping ticks after normal timer completion", async () => {
  let signal: AbortSignal | undefined;
  vi.spyOn(globalThis, "fetch")
    .mockImplementationOnce(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          signal = init?.signal ?? undefined;
          signal?.addEventListener(
            "abort",
            () => reject(new DOMException("Cancelled", "AbortError")),
            { once: true },
          );
        }),
    )
    .mockResolvedValue(
      new Response("{}", { headers: { "Content-Type": "application/json" } }),
    );
  const state = createStateStore({ count: 0, done: false });
  const tools = new AppTools(null);
  tools.replace(
    [
      {
        ...schedule,
        actions: {
          action: "setInterval",
          duration: 10,
          count: 2,
          onTick: {
            action: "fetch",
            url: "https://example.com",
            onSuccess: {
              action: "setState",
              key: "count",
              value: "{{ count + 1 }}",
            },
          },
          onComplete: { action: "setState", key: "done", value: true },
        },
      },
    ],
    state,
  );
  await tools.call("schedule");
  await vi.advanceTimersByTimeAsync(20);
  expect(state.get("done")).toBe(true);
  expect(signal?.aborted).toBe(false);
  expect(vi.getTimerCount()).toBe(0);
  tools.clear();
  expect(signal?.aborted).toBe(true);
  await vi.advanceTimersByTimeAsync(10);
  expect(state.get("count")).toBe(1);
});
