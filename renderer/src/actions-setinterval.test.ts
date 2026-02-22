import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createStateStore } from "./testing/state-store";
import { executeAction, clearAllIntervals, type ActionSpec } from "./actions";

// Mock sonner to avoid DOM access
vi.mock("sonner", () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  }),
}));

describe("setInterval action", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    clearAllIntervals();
    vi.useRealTimers();
  });

  it("executes onTick after each interval", async () => {
    const state = createStateStore({ ticks: 0 });
    const action: ActionSpec = {
      action: "setInterval",
      duration: 1000,
      count: 3,
      onTick: { action: "setState", key: "ticks", value: "{{ $event }}" },
    };

    await executeAction(action, null, state);

    await vi.advanceTimersByTimeAsync(1000);
    expect(state.get("ticks")).toBe(1);

    await vi.advanceTimersByTimeAsync(1000);
    expect(state.get("ticks")).toBe(2);

    await vi.advanceTimersByTimeAsync(1000);
    expect(state.get("ticks")).toBe(3);
  });

  it("stops after count ticks", async () => {
    const state = createStateStore({ ticks: 0 });
    const action: ActionSpec = {
      action: "setInterval",
      duration: 100,
      count: 2,
      onTick: { action: "setState", key: "ticks", value: "{{ $event }}" },
    };

    await executeAction(action, null, state);

    await vi.advanceTimersByTimeAsync(100);
    await vi.advanceTimersByTimeAsync(100);
    await vi.advanceTimersByTimeAsync(100); // beyond count

    expect(state.get("ticks")).toBe(2);
  });

  it("fires onComplete when count is exhausted", async () => {
    const state = createStateStore();
    const action: ActionSpec = {
      action: "setInterval",
      duration: 100,
      count: 1,
      onComplete: { action: "setState", key: "done", value: true },
    };

    await executeAction(action, null, state);
    expect(state.get("done")).toBeUndefined();

    await vi.advanceTimersByTimeAsync(100);
    expect(state.get("done")).toBe(true);
  });

  it("stops when while condition becomes false", async () => {
    const state = createStateStore({ running: true, ticks: 0 });
    const action: ActionSpec = {
      action: "setInterval",
      duration: 100,
      while: "{{ running }}",
      onTick: { action: "setState", key: "ticks", value: "{{ $event }}" },
      onComplete: { action: "setState", key: "finished", value: true },
    };

    await executeAction(action, null, state);

    await vi.advanceTimersByTimeAsync(100);
    expect(state.get("ticks")).toBe(1);

    // Stop the interval by flipping the condition
    state.set("running", false);
    await vi.advanceTimersByTimeAsync(100);

    expect(state.get("finished")).toBe(true);
  });

  it("returns true immediately (fire-and-forget)", async () => {
    const state = createStateStore();
    const action: ActionSpec = {
      action: "setInterval",
      duration: 10000,
      count: 100,
    };

    const result = await executeAction(action, null, state);
    expect(result).toBe(true);
  });

  it("does not start if while condition is initially false", async () => {
    const state = createStateStore({ go: false });
    const action: ActionSpec = {
      action: "setInterval",
      duration: 100,
      while: "{{ go }}",
      onTick: { action: "setState", key: "ticked", value: true },
      onComplete: { action: "setState", key: "done", value: true },
    };

    await executeAction(action, null, state);

    // onComplete fires immediately, no tick
    expect(state.get("done")).toBe(true);
    expect(state.get("ticked")).toBeUndefined();
  });

  it("one-shot delay: count=1 with onComplete", async () => {
    const state = createStateStore();
    const action: ActionSpec = {
      action: "setInterval",
      duration: 3000,
      count: 1,
      onComplete: { action: "setState", key: "delayed", value: true },
    };

    await executeAction(action, null, state);
    expect(state.get("delayed")).toBeUndefined();

    await vi.advanceTimersByTimeAsync(3000);
    expect(state.get("delayed")).toBe(true);
  });

  it("clearAllIntervals stops all active intervals", async () => {
    const state = createStateStore({ ticks: 0 });
    const action: ActionSpec = {
      action: "setInterval",
      duration: 100,
      onTick: { action: "setState", key: "ticks", value: "{{ $event }}" },
    };

    await executeAction(action, null, state);

    await vi.advanceTimersByTimeAsync(100);
    expect(state.get("ticks")).toBe(1);

    clearAllIntervals();

    await vi.advanceTimersByTimeAsync(100);
    expect(state.get("ticks")).toBe(1); // stopped
  });

  it("runs indefinitely without count or while", async () => {
    const state = createStateStore({ ticks: 0 });
    const action: ActionSpec = {
      action: "setInterval",
      duration: 100,
      onTick: { action: "setState", key: "ticks", value: "{{ $event }}" },
    };

    await executeAction(action, null, state);

    for (let i = 0; i < 10; i++) {
      await vi.advanceTimersByTimeAsync(100);
    }
    expect(state.get("ticks")).toBe(10);
  });

  it("while expression evaluates against current state each tick", async () => {
    // Countdown: start at 3, decrement each tick, stop at 0
    const state = createStateStore({ seconds: 3 });
    const action: ActionSpec = {
      action: "setInterval",
      duration: 100,
      while: "{{ seconds > 0 }}",
      onTick: {
        action: "setState",
        key: "seconds",
        value: "{{ seconds - 1 }}",
      },
      onComplete: { action: "setState", key: "expired", value: true },
    };

    await executeAction(action, null, state);

    await vi.advanceTimersByTimeAsync(100); // seconds: 3→2
    expect(state.get("seconds")).toBe(2);

    await vi.advanceTimersByTimeAsync(100); // seconds: 2→1
    expect(state.get("seconds")).toBe(1);

    await vi.advanceTimersByTimeAsync(100); // seconds: 1→0, stops
    expect(state.get("seconds")).toBe(0);
    expect(state.get("expired")).toBe(true);

    // Should not continue ticking
    await vi.advanceTimersByTimeAsync(100);
    expect(state.get("seconds")).toBe(0);
  });

  it("$event in onTick is the tick count", async () => {
    const state = createStateStore();
    const action: ActionSpec = {
      action: "setInterval",
      duration: 100,
      count: 3,
      onTick: { action: "setState", key: "tick", value: "{{ $event }}" },
    };

    await executeAction(action, null, state);

    await vi.advanceTimersByTimeAsync(100);
    expect(state.get("tick")).toBe(1);

    await vi.advanceTimersByTimeAsync(100);
    expect(state.get("tick")).toBe(2);

    await vi.advanceTimersByTimeAsync(100);
    expect(state.get("tick")).toBe(3);
  });

  it("while and count together — stops on whichever comes first", async () => {
    const state = createStateStore({ go: true });
    const action: ActionSpec = {
      action: "setInterval",
      duration: 100,
      while: "{{ go }}",
      count: 100, // high count — while_ should stop it first
      onTick: { action: "setState", key: "t", value: "{{ $event }}" },
    };

    await executeAction(action, null, state);

    await vi.advanceTimersByTimeAsync(100);
    await vi.advanceTimersByTimeAsync(100);

    state.set("go", false);
    await vi.advanceTimersByTimeAsync(100);

    // Stopped at tick 2 (third tick ran onTick but then shouldContinue=false)
    expect(state.get("t")).toBe(3);

    // No more ticks
    await vi.advanceTimersByTimeAsync(100);
    expect(state.get("t")).toBe(3);
  });
});
