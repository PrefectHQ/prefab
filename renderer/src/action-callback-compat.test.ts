import { expect, it } from "vitest";
import { executeActions, type ActionSpec } from "./actions";
import { AppTools } from "./app-tools";
import { createStateStore } from "./testing/state-store";

const app = {
  callServerTool: async ({ name }: { name: string }) =>
    name === "fail"
      ? {
          isError: true,
          content: [{ type: "text", text: "Validation failed" }],
        }
      : { content: [], structuredContent: { ok: true } },
};
const failure: ActionSpec = {
  action: "toolCall",
  tool: "fail",
  onError: { action: "setState", key: "handled", value: true },
};
const cleanup: ActionSpec = {
  action: "setState",
  key: "loading",
  value: false,
};

it("preserves ordinary UI continuation after a handled nested success-callback failure", async () => {
  const state = createStateStore({ loading: true, handled: false });
  await executeActions(
    [{ action: "toolCall", tool: "ok", onSuccess: failure }, cleanup],
    app as never,
    state,
  );
  expect(state.get("handled")).toBe(true);
  expect(state.get("loading")).toBe(false);
});

it("still stops ordinary UI lists after a direct failure and its error callback", async () => {
  const state = createStateStore({ loading: true, handled: false });
  await executeActions([failure, cleanup], app as never, state);
  expect(state.get("handled")).toBe(true);
  expect(state.get("loading")).toBe(true);
});

it.each([false, true])(
  "keeps app-tool failures strict and stops outer actions (nested: %s)",
  async (nested) => {
    const state = createStateStore({ loading: true, handled: false });
    const tools = new AppTools(app as never);
    tools.replace(
      [
        {
          name: "save",
          inputSchema: { type: "object" },
          actions: [
            nested
              ? { action: "toolCall", tool: "ok", onSuccess: failure }
              : failure,
            cleanup,
          ],
          result: { loading: "{{ loading }}" },
        },
      ],
      state,
    );
    try {
      const result = await tools.call("save");
      expect(result.isError).toBe(true);
      expect(result.content).toEqual([
        { type: "text", text: "Validation failed" },
      ]);
      expect(state.get("handled")).toBe(true);
      expect(state.get("loading")).toBe(true);
    } finally {
      tools.clear();
    }
  },
);
