import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStateStore } from "./testing/state-store";
import { executeAction, type ActionSpec } from "./actions";

describe("executeAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

    it("interpolates template expression in key", async () => {
      const state = createStateStore({ target: "volume" });
      const action: ActionSpec = {
        action: "setState",
        key: "{{ target }}",
        value: 75,
      };

      await executeAction(action, null, state);

      expect(state.get("volume")).toBe(75);
    });

    it("interpolates composite template key", async () => {
      const state = createStateStore({ group: "audio", field: "volume" });
      const action: ActionSpec = {
        action: "setState",
        key: "{{ group }}_{{ field }}",
        value: 50,
      };

      await executeAction(action, null, state);

      expect(state.get("audio_volume")).toBe(50);
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

    it("interpolates template expression in key", async () => {
      const state = createStateStore({ target: "darkMode", darkMode: false });
      const action: ActionSpec = { action: "toggleState", key: "{{ target }}" };

      await executeAction(action, null, state);

      expect(state.get("darkMode")).toBe(true);
    });
  });

  describe("appendState", () => {
    it("appends to existing array", async () => {
      const state = createStateStore({ items: ["a", "b"] });
      const action: ActionSpec = {
        action: "appendState",
        key: "items",
        value: "c",
      };

      await executeAction(action, null, state);

      expect(state.get("items")).toEqual(["a", "b", "c"]);
    });

    it("creates array when key is missing", async () => {
      const state = createStateStore();
      const action: ActionSpec = {
        action: "appendState",
        key: "items",
        value: "first",
      };

      await executeAction(action, null, state);

      expect(state.get("items")).toEqual(["first"]);
    });

    it("inserts at index when specified", async () => {
      const state = createStateStore({ items: ["a", "c"] });
      const action: ActionSpec = {
        action: "appendState",
        key: "items",
        value: "b",
        index: 1,
      };

      await executeAction(action, null, state);

      expect(state.get("items")).toEqual(["a", "b", "c"]);
    });

    it("prepends with index=0", async () => {
      const state = createStateStore({ items: ["b", "c"] });
      const action: ActionSpec = {
        action: "appendState",
        key: "items",
        value: "a",
        index: 0,
      };

      await executeAction(action, null, state);

      expect(state.get("items")).toEqual(["a", "b", "c"]);
    });

    it("handles negative index", async () => {
      const state = createStateStore({ items: ["a", "c"] });
      const action: ActionSpec = {
        action: "appendState",
        key: "items",
        value: "b",
        index: -1,
      };

      await executeAction(action, null, state);

      // -1 on length 2 → index 1
      expect(state.get("items")).toEqual(["a", "b", "c"]);
    });

    it("warns when key is not an array", async () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const state = createStateStore({ items: "not-array" });
      const action: ActionSpec = {
        action: "appendState",
        key: "items",
        value: "x",
      };

      await executeAction(action, null, state);

      expect(warn).toHaveBeenCalled();
      expect(state.get("items")).toBe("not-array");
      warn.mockRestore();
    });

    it("uses $event as value", async () => {
      const state = createStateStore({ items: [] });
      const action: ActionSpec = {
        action: "appendState",
        key: "items",
        value: "{{ $event }}",
      };

      await executeAction(action, null, state, "new-item");

      expect(state.get("items")).toEqual(["new-item"]);
    });

    it("interpolates template expression in key", async () => {
      const state = createStateStore({ listName: "todos", todos: ["a"] });
      const action: ActionSpec = {
        action: "appendState",
        key: "{{ listName }}",
        value: "b",
      };

      await executeAction(action, null, state);

      expect(state.get("todos")).toEqual(["a", "b"]);
    });
  });

  describe("popState", () => {
    it("removes item at index", async () => {
      const state = createStateStore({ items: ["a", "b", "c"] });
      const action: ActionSpec = {
        action: "popState",
        key: "items",
        index: 1,
      };

      await executeAction(action, null, state);

      expect(state.get("items")).toEqual(["a", "c"]);
    });

    it("removes first item", async () => {
      const state = createStateStore({ items: ["a", "b", "c"] });
      const action: ActionSpec = {
        action: "popState",
        key: "items",
        index: 0,
      };

      await executeAction(action, null, state);

      expect(state.get("items")).toEqual(["b", "c"]);
    });

    it("handles negative index", async () => {
      const state = createStateStore({ items: ["a", "b", "c"] });
      const action: ActionSpec = {
        action: "popState",
        key: "items",
        index: -1,
      };

      await executeAction(action, null, state);

      // -1 → index 2 (last item)
      expect(state.get("items")).toEqual(["a", "b"]);
    });

    it("warns when key is not an array", async () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const state = createStateStore({ items: "not-array" });
      const action: ActionSpec = {
        action: "popState",
        key: "items",
        index: 0,
      };

      await executeAction(action, null, state);

      expect(warn).toHaveBeenCalled();
      expect(state.get("items")).toBe("not-array");
      warn.mockRestore();
    });

    it("warns when key is missing", async () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const state = createStateStore();
      const action: ActionSpec = {
        action: "popState",
        key: "missing",
        index: 0,
      };

      await executeAction(action, null, state);

      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });

    it("interpolates template expression in key", async () => {
      const state = createStateStore({
        listName: "tasks",
        tasks: ["a", "b", "c"],
      });
      const action: ActionSpec = {
        action: "popState",
        key: "{{ listName }}",
        index: 1,
      };

      await executeAction(action, null, state);

      expect(state.get("tasks")).toEqual(["a", "c"]);
    });
  });
});
