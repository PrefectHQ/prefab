import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  initHandlers,
  getCustomPipe,
  getCustomActionHandler,
  _resetHandlers,
} from "./custom-handlers";
import { evaluate } from "./expression";

describe("custom-handlers", () => {
  afterEach(() => {
    _resetHandlers();
    delete (globalThis as Record<string, unknown>).__prefab_handlers;
  });

  describe("initHandlers", () => {
    it("reads pipes from window.__prefab_handlers", () => {
      (globalThis as Record<string, unknown>).__prefab_handlers = {
        pipes: {
          double: (value: unknown) => Number(value) * 2,
        },
      };
      initHandlers();
      const fn = getCustomPipe("double");
      expect(fn).toBeDefined();
      expect(fn!(10)).toBe(20);
    });

    it("reads actions from window.__prefab_handlers", () => {
      (globalThis as Record<string, unknown>).__prefab_handlers = {
        actions: {
          myAction: (ctx: { state: Record<string, unknown> }) => ({
            result: ctx.state.x,
          }),
        },
      };
      initHandlers();
      const fn = getCustomActionHandler("myAction");
      expect(fn).toBeDefined();
      expect(fn!({ state: { x: 42 }, event: undefined })).toEqual({
        result: 42,
      });
    });

    it("returns undefined for unregistered pipe", () => {
      initHandlers();
      expect(getCustomPipe("nonexistent")).toBeUndefined();
    });

    it("returns undefined for unregistered action", () => {
      initHandlers();
      expect(getCustomActionHandler("nonexistent")).toBeUndefined();
    });

    it("handles missing window.__prefab_handlers gracefully", () => {
      initHandlers();
      expect(getCustomPipe("anything")).toBeUndefined();
      expect(getCustomActionHandler("anything")).toBeUndefined();
    });
  });

  describe("custom pipes in expression engine", () => {
    beforeEach(() => {
      _resetHandlers({
        pipes: {
          double: (value: unknown) => Number(value) * 2,
          suffix: (value: unknown, arg?: string) =>
            String(value) + (arg ?? "!"),
        },
      });
    });

    it("evaluates custom pipe", () => {
      expect(evaluate("val | double", { val: 5 })).toBe(10);
    });

    it("evaluates custom pipe with argument", () => {
      expect(evaluate("val | suffix:px", { val: 42 })).toBe("42px");
    });

    it("chains custom and built-in pipes", () => {
      expect(evaluate("val | double | number", { val: 1234 })).toBe("2,468");
    });

    it("does not shadow built-in pipes", () => {
      _resetHandlers({
        pipes: {
          number: () => "SHADOWED",
        },
      });
      // Built-in number pipe should still work
      expect(evaluate("val | number", { val: 1234 })).toBe("1,234");
    });
  });

  describe("custom action handlers", () => {
    it("handler receives state snapshot and event", () => {
      let receivedCtx: unknown;
      _resetHandlers({
        actions: {
          capture: (ctx) => {
            receivedCtx = ctx;
            return {};
          },
        },
      });
      const handler = getCustomActionHandler("capture")!;
      handler({
        state: { a: 1, b: 2 },
        event: "clicked",
        arguments: { extra: true },
      });
      expect(receivedCtx).toEqual({
        state: { a: 1, b: 2 },
        event: "clicked",
        arguments: { extra: true },
      });
    });

    it("handler returning void makes no updates", () => {
      _resetHandlers({
        actions: {
          noop: () => {},
        },
      });
      const handler = getCustomActionHandler("noop")!;
      const result = handler({ state: {}, event: undefined });
      expect(result).toBeUndefined();
    });

    it("handler returning object provides state updates", () => {
      _resetHandlers({
        actions: {
          compute: (ctx) => ({
            total: (ctx.state.a as number) + (ctx.state.b as number),
          }),
        },
      });
      const handler = getCustomActionHandler("compute")!;
      const result = handler({ state: { a: 10, b: 20 }, event: undefined });
      expect(result).toEqual({ total: 30 });
    });
  });
});
