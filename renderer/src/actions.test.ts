import { describe, it, expect, vi, beforeEach } from "vitest";
import type { App } from "@modelcontextprotocol/ext-apps";
import { createStateStore } from "./testing/state-store";
import { createMockApp, type MockApp } from "./testing/mock-app";
import { executeAction, executeActions, type ActionSpec } from "./actions";

// Mock sonner to avoid DOM access
vi.mock("sonner", () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  }),
}));

// Import the mocked toast for assertion
import { toast } from "sonner";

describe("executeAction", () => {
  let app: MockApp;
  let appAsApp: App;

  beforeEach(() => {
    vi.clearAllMocks();
    app = createMockApp();
    appAsApp = app as unknown as App;
  });

  // ── Client actions ──────────────────────────────────────────

  describe("setState", () => {
    it("sets key and value in state", async () => {
      const state = createStateStore();
      const action: ActionSpec = { action: "setState", key: "count", value: 5 };

      await executeAction(action, null, state);

      expect(state.get("count")).toBe(5);
    });

    it("uses $event when value is {{ $event }}", async () => {
      const state = createStateStore();
      const action: ActionSpec = {
        action: "setState",
        key: "query",
        value: "{{ $event }}",
      };

      await executeAction(action, null, state, "hello");

      expect(state.get("query")).toBe("hello");
    });
  });

  describe("toggleState", () => {
    it("flips true to false", async () => {
      const state = createStateStore({ show: true });
      const action: ActionSpec = { action: "toggleState", key: "show" };

      await executeAction(action, null, state);

      expect(state.get("show")).toBe(false);
    });

    it("flips false to true", async () => {
      const state = createStateStore({ show: false });
      const action: ActionSpec = { action: "toggleState", key: "show" };

      await executeAction(action, null, state);

      expect(state.get("show")).toBe(true);
    });

    it("treats undefined as false", async () => {
      const state = createStateStore();
      const action: ActionSpec = { action: "toggleState", key: "new" };

      await executeAction(action, null, state);

      expect(state.get("new")).toBe(true);
    });
  });

  describe("showToast", () => {
    it("calls default toast", async () => {
      const state = createStateStore();
      const action: ActionSpec = {
        action: "showToast",
        message: "Hello",
      };

      await executeAction(action, null, state);

      expect(toast).toHaveBeenCalledWith("Hello", {
        description: undefined,
        duration: undefined,
      });
    });

    it("calls variant-specific toast", async () => {
      const state = createStateStore();
      const action: ActionSpec = {
        action: "showToast",
        message: "Saved!",
        variant: "success",
      };

      await executeAction(action, null, state);

      expect(toast.success).toHaveBeenCalledWith("Saved!", {
        description: undefined,
        duration: undefined,
      });
    });
  });

  // ── Server actions ──────────────────────────────────────────

  describe("toolCall", () => {
    it("calls app.callServerTool with correct args", async () => {
      const state = createStateStore();
      const action: ActionSpec = {
        action: "toolCall",
        tool: "search",
        arguments: { q: "test" },
      };

      await executeAction(action, appAsApp, state);

      expect(app.callServerTool).toHaveBeenCalledWith({
        name: "search",
        arguments: { q: "test" },
      });
    });

    it("returns true on success", async () => {
      const state = createStateStore();
      const action: ActionSpec = { action: "toolCall", tool: "test" };

      const result = await executeAction(action, appAsApp, state);

      expect(result).toBe(true);
    });

    it("returns false on error", async () => {
      app.callServerTool.mockResolvedValueOnce({ isError: true });
      const state = createStateStore();
      const action: ActionSpec = { action: "toolCall", tool: "failing" };

      const result = await executeAction(action, appAsApp, state);

      expect(result).toBe(false);
    });

    it("handles null app gracefully", async () => {
      const state = createStateStore();
      const action: ActionSpec = { action: "toolCall", tool: "test" };

      const result = await executeAction(action, null, state);

      expect(result).toBe(true);
    });

    it("writes result to state via resultKey", async () => {
      app.callServerTool.mockResolvedValueOnce({
        structuredContent: {
          version: "0.2",
          view: { type: "Text" },
          state: { users: [{ name: "Alice" }] },
        },
      });
      const state = createStateStore();
      const action: ActionSpec = {
        action: "toolCall",
        tool: "get_users",
        resultKey: "users",
      };

      await executeAction(action, appAsApp, state);

      // Single state key gets unwrapped
      expect(state.get("users")).toEqual([{ name: "Alice" }]);
    });

    it("extracts state from envelope, ignoring protocol keys", async () => {
      app.callServerTool.mockResolvedValueOnce({
        structuredContent: {
          version: "0.2",
          view: { type: "Column" },
          state: { items: [1, 2], total: 2 },
        },
      });
      const state = createStateStore();
      const action: ActionSpec = {
        action: "toolCall",
        tool: "fetch",
        resultKey: "data",
      };

      await executeAction(action, appAsApp, state);

      // Multiple state keys → object with both
      const data = state.get("data") as Record<string, unknown>;
      expect(data).toEqual({ items: [1, 2], total: 2 });
    });

    it("interpolates arguments from state", async () => {
      const state = createStateStore({ query: "hello" });
      const action: ActionSpec = {
        action: "toolCall",
        tool: "search",
        arguments: { q: "{{ query }}" },
      };

      await executeAction(action, appAsApp, state);

      expect(app.callServerTool).toHaveBeenCalledWith({
        name: "search",
        arguments: { q: "hello" },
      });
    });
  });

  describe("sendMessage", () => {
    it("calls app.sendMessage", async () => {
      const state = createStateStore();
      const action: ActionSpec = {
        action: "sendMessage",
        content: "Hello AI",
      };

      await executeAction(action, appAsApp, state);

      expect(app.sendMessage).toHaveBeenCalledWith({
        role: "user",
        content: [{ type: "text", text: "Hello AI" }],
      });
    });
  });

  describe("openLink", () => {
    it("calls app.openLink", async () => {
      const state = createStateStore();
      const action: ActionSpec = {
        action: "openLink",
        url: "https://example.com",
      };

      await executeAction(action, appAsApp, state);

      expect(app.openLink).toHaveBeenCalledWith({
        url: "https://example.com",
      });
    });

    it("returns false on error", async () => {
      app.openLink.mockResolvedValueOnce({ isError: true });
      const state = createStateStore();
      const action: ActionSpec = {
        action: "openLink",
        url: "https://bad.com",
      };

      const result = await executeAction(action, appAsApp, state);

      expect(result).toBe(false);
    });
  });

  // ── Callbacks ─────────────────────────────────────────────────

  describe("onSuccess callback", () => {
    it("fires after successful action", async () => {
      const state = createStateStore();
      const action: ActionSpec = {
        action: "setState",
        key: "a",
        value: 1,
        onSuccess: { action: "setState", key: "b", value: 2 },
      };

      await executeAction(action, null, state);

      expect(state.get("a")).toBe(1);
      expect(state.get("b")).toBe(2);
    });

    it("does not fire onError on success", async () => {
      const state = createStateStore();
      const action: ActionSpec = {
        action: "setState",
        key: "a",
        value: 1,
        onError: { action: "setState", key: "err", value: true },
      };

      await executeAction(action, null, state);

      expect(state.get("err")).toBeUndefined();
    });
  });

  describe("onError callback", () => {
    it("fires after failed action", async () => {
      app.callServerTool.mockResolvedValueOnce({ isError: true });
      const state = createStateStore();
      const action: ActionSpec = {
        action: "toolCall",
        tool: "fail",
        onError: { action: "setState", key: "failed", value: true },
      };

      await executeAction(action, appAsApp, state);

      expect(state.get("failed")).toBe(true);
    });

    it("does not fire onSuccess on failure", async () => {
      app.callServerTool.mockResolvedValueOnce({ isError: true });
      const state = createStateStore();
      const action: ActionSpec = {
        action: "toolCall",
        tool: "fail",
        onSuccess: { action: "setState", key: "ok", value: true },
      };

      await executeAction(action, appAsApp, state);

      expect(state.get("ok")).toBeUndefined();
    });
  });

  describe("$error variable", () => {
    it("passes error text to onError callbacks via $error", async () => {
      app.callServerTool.mockResolvedValueOnce({
        isError: true,
        content: [
          { type: "text", text: "Validation failed: name is required" },
        ],
      });
      const state = createStateStore();
      const action: ActionSpec = {
        action: "toolCall",
        tool: "fail",
        onError: { action: "setState", key: "err_msg", value: "{{ $error }}" },
      };

      await executeAction(action, appAsApp, state);

      expect(state.get("err_msg")).toBe("Validation failed: name is required");
    });

    it("provides 'Unknown error' when no content", async () => {
      app.callServerTool.mockResolvedValueOnce({ isError: true });
      const state = createStateStore();
      const action: ActionSpec = {
        action: "toolCall",
        tool: "fail",
        onError: { action: "setState", key: "err_msg", value: "{{ $error }}" },
      };

      await executeAction(action, appAsApp, state);

      expect(state.get("err_msg")).toBe("Unknown error");
    });

    it("$error is available in showToast onError", async () => {
      app.callServerTool.mockResolvedValueOnce({
        isError: true,
        content: [{ type: "text", text: "Server error" }],
      });
      const state = createStateStore();
      const action: ActionSpec = {
        action: "toolCall",
        tool: "fail",
        onError: {
          action: "showToast",
          message: "{{ $error }}",
          variant: "error",
        },
      };

      await executeAction(action, appAsApp, state);

      expect(toast.error).toHaveBeenCalledWith("Server error", {
        description: undefined,
        duration: undefined,
      });
    });
  });

  describe("recursive callbacks", () => {
    it("chains nested callbacks", async () => {
      const state = createStateStore();
      const action: ActionSpec = {
        action: "setState",
        key: "a",
        value: 1,
        onSuccess: {
          action: "setState",
          key: "b",
          value: 2,
          onSuccess: { action: "setState", key: "c", value: 3 },
        },
      };

      await executeAction(action, null, state);

      expect(state.get("a")).toBe(1);
      expect(state.get("b")).toBe(2);
      expect(state.get("c")).toBe(3);
    });
  });

  // ── Depth limit ───────────────────────────────────────────────

  it("returns false when depth limit exceeded", async () => {
    const state = createStateStore();
    const action: ActionSpec = { action: "setState", key: "a", value: 1 };

    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = await executeAction(action, null, state, undefined, 11);
    warn.mockRestore();

    expect(result).toBe(false);
  });
});

describe("executeActions", () => {
  let app: MockApp;
  let appAsApp: App;

  beforeEach(() => {
    vi.clearAllMocks();
    app = createMockApp();
    appAsApp = app as unknown as App;
  });

  it("executes single action", async () => {
    const state = createStateStore();
    await executeActions(
      { action: "setState", key: "x", value: 1 },
      null,
      state,
    );
    expect(state.get("x")).toBe(1);
  });

  it("executes action array sequentially", async () => {
    const state = createStateStore();
    await executeActions(
      [
        { action: "setState", key: "a", value: 1 },
        { action: "setState", key: "b", value: 2 },
        { action: "setState", key: "c", value: 3 },
      ],
      null,
      state,
    );
    expect(state.getAll()).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("short-circuits on first failure", async () => {
    app.callServerTool.mockResolvedValueOnce({ isError: true });
    const state = createStateStore();

    await executeActions(
      [
        { action: "setState", key: "a", value: 1 },
        { action: "toolCall", tool: "fail" },
        { action: "setState", key: "b", value: 2 },
      ],
      appAsApp,
      state,
    );

    expect(state.get("a")).toBe(1);
    expect(state.get("b")).toBeUndefined(); // never reached
  });

  it("runs onError of failing action before stopping", async () => {
    app.callServerTool.mockResolvedValueOnce({ isError: true });
    const state = createStateStore();

    await executeActions(
      [
        { action: "setState", key: "a", value: 1 },
        {
          action: "toolCall",
          tool: "fail",
          onError: { action: "setState", key: "error_handled", value: true },
        },
        { action: "setState", key: "b", value: 2 },
      ],
      appAsApp,
      state,
    );

    expect(state.get("a")).toBe(1);
    expect(state.get("error_handled")).toBe(true);
    expect(state.get("b")).toBeUndefined();
  });

  it("passes event to first action", async () => {
    const state = createStateStore();
    await executeActions(
      { action: "setState", key: "val", value: "{{ $event }}" },
      null,
      state,
      42,
    );
    expect(state.get("val")).toBe(42);
  });
});
