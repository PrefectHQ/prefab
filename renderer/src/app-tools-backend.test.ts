import { afterEach, expect, it, vi } from "vitest";
import { App } from "@modelcontextprotocol/ext-apps";
import { AppBridge } from "@modelcontextprotocol/ext-apps/app-bridge";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { AppTools } from "./app-tools";
import { clearAllIntervals, executeAction, type ActionSpec } from "./actions";
import { createStateStore } from "./testing/state-store";
import counter from "./testing/backend-counter-app.json";

const peers: Array<App | AppBridge> = [];
afterEach(async () => {
  clearAllIntervals();
  vi.useRealTimers();
  await Promise.all(peers.splice(0).map((peer) => peer.close()));
});
const click = counter.view.children[1].onClick as ActionSpec;

async function connect() {
  const app = new App(
    { name: "Counter", version: "1" },
    { tools: { listChanged: true } },
    { autoResize: false },
  );
  const host = new AppBridge(
    null,
    { name: "Host", version: "1" },
    { serverTools: {} },
  );
  peers.push(app, host);
  const state = createStateStore(counter.state);
  const tools = new AppTools(app);
  tools.replace(counter.tools, state);
  const calls: Array<{ name: string; arguments?: Record<string, unknown> }> =
    [];
  let count = 0;
  host.oncalltool = async (params) => {
    calls.push(params);
    if ((params.arguments?.amount as number) < 0) {
      return {
        isError: true,
        content: [{ type: "text", text: "Amount must be positive" }],
      };
    }
    count += (params.arguments?.amount as number | undefined) ?? 1;
    return {
      content: [],
      structuredContent: { count, backend_private: "not a model result" },
    };
  };
  const [a, h] = InMemoryTransport.createLinkedPair();
  await host.connect(h);
  await app.connect(a);
  tools.connected();
  return { app, host, state, tools, calls };
}

it("uses the same backend binding, response updates, and explicit result for both entry points", async () => {
  const { app, host, state, calls } = await connect();
  expect(
    await executeAction(
      {
        ...click,
        onSuccess: {
          action: "setState",
          key: "local_result",
          value: "{{ $result }}",
        },
      },
      app,
      state,
    ),
  ).toBe(true);
  expect(state.get("local_result")).toEqual({ count: 1 });
  expect(
    (await host.callTool({ name: "increment", arguments: { amount: 4 } }))
      .structuredContent,
  ).toEqual({ count: 5 });
  expect(state.get("count")).toBe(5);
  expect(
    calls.map(({ name, arguments: args }) => ({ name, arguments: args })),
  ).toEqual([
    {
      name: "counters_increment_abc123",
      arguments: { counter_id: "counter-a", amount: 1 },
    },
    {
      name: "counters_increment_abc123",
      arguments: { counter_id: "counter-a", amount: 4 },
    },
  ]);
});

it("leaves omitted optional parameters absent so backend defaults apply", async () => {
  const { app, host, state, calls } = await connect();
  expect(await executeAction({ ...click, arguments: {} }, app, state)).toBe(
    true,
  );
  expect(
    (await host.callTool({ name: "increment", arguments: {} }))
      .structuredContent,
  ).toEqual({ count: 2 });
  expect(calls.map((call) => call.arguments)).toEqual([
    { counter_id: "counter-a" },
    { counter_id: "counter-a" },
  ]);
});

it.each([
  { amount: "1" },
  { counter_id: "other", amount: 1 },
  { unexpected: true },
])(
  "rejects invalid input from both entry points before reaching the backend: %j",
  async (args) => {
    const { app, host, state, calls } = await connect();
    expect(await executeAction({ ...click, arguments: args }, app, state)).toBe(
      false,
    );
    expect(
      (await host.callTool({ name: "increment", arguments: args })).isError,
    ).toBe(true);
    expect(calls).toEqual([]);
    expect(state.get("count")).toBe(0);
  },
);

it("returns the backend failure after applying onError actions", async () => {
  const { app, host, state } = await connect();
  expect(
    await executeAction({ ...click, arguments: { amount: -1 } }, app, state),
  ).toBe(false);
  expect(state.get("error")).toBe("Amount must be positive");
  state.set("error", "");
  const result = await host.callTool({
    name: "increment",
    arguments: { amount: -1 },
  });
  expect(result).toEqual({
    isError: true,
    content: [{ type: "text", text: "Amount must be positive" }],
  });
  expect(state.get("error")).toBe("Amount must be positive");
  expect(state.get("count")).toBe(0);
});

it("serializes human and model invocations in the same queue", async () => {
  const { app, host, state } = await connect();
  const received: Array<Record<string, unknown> | undefined> = [];
  let release!: (result: CallToolResult) => void;
  let started!: () => void;
  const firstStarted = new Promise<void>((resolve) => {
    started = resolve;
  });
  host.oncalltool = async ({ arguments: args }) => {
    received.push(args);
    if (received.length === 1) {
      started();
      return new Promise((resolve) => {
        release = resolve;
      });
    }
    return { content: [], structuredContent: { count: 2 } };
  };
  const local = executeAction(click, app, state);
  await firstStarted;
  const remote = host.callTool({ name: "increment", arguments: { amount: 1 } });
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(received).toHaveLength(1);
  state.set("counter_id", "new-binding");
  release({ content: [], structuredContent: { count: 1 } });
  expect(await local).toBe(true);
  expect((await remote).structuredContent).toEqual({ count: 2 });
  expect(received[1]?.counter_id).toBe("new-binding");
});

it("supports nested local app-tool calls without rejoining its own queue", async () => {
  const { host, tools, state } = await connect();
  tools.replace(
    [
      ...counter.tools,
      {
        name: "twice",
        inputSchema: { type: "object" },
        actions: [click, click],
        result: { count: "{{ count }}" },
      },
    ],
    state,
  );
  expect((await host.callTool({ name: "twice" })).structuredContent).toEqual({
    count: 2,
  });
});

it("bounds recursive app-tool calls and returns the failure", async () => {
  const { host, tools, state } = await connect();
  tools.replace(
    [
      {
        name: "recursive",
        inputSchema: { type: "object" },
        actions: { action: "invokeAppTool", tool: "recursive" },
        result: {},
      },
    ],
    state,
  );
  const result = await host.callTool({ name: "recursive" });
  expect(result.isError).toBe(true);
  expect(result.content).toEqual([
    { type: "text", text: "Action callback depth limit exceeded" },
  ]);
});

it("reports failures in response actions with their actual error", async () => {
  const { host, tools, state } = await connect();
  tools.replace(
    [
      {
        ...counter.tools[1],
        actions: {
          ...counter.tools[1].actions,
          onSuccess: { action: "callHandler", handler: "missing" },
        },
      },
    ],
    state,
  );
  const result = await host.callTool({
    name: "increment",
    arguments: { amount: 1 },
  });
  expect(result.isError).toBe(true);
  expect(result.content).toEqual([
    { type: "text", text: 'Unknown handler: "missing"' },
  ]);
});

it("invalidates human requests and queued model calls when the app is replaced", async () => {
  const { app, host, tools, state } = await connect();
  let started!: () => void;
  let release!: (result: CallToolResult) => void;
  const firstStarted = new Promise<void>((resolve) => {
    started = resolve;
  });
  host.oncalltool = async () => {
    started();
    return new Promise((resolve) => {
      release = resolve;
    });
  };
  const local = executeAction(
    { ...click, onError: { action: "setState", key: "count", value: -999 } },
    app,
    state,
  );
  await firstStarted;
  const remote = tools.call("increment", { amount: 3 });
  state.reset({ counter_id: "replacement", count: 50 });
  tools.replace([counter.tools[0]], state);
  release({ content: [], structuredContent: { count: 999 } });
  expect(await local).toBe(false);
  expect((await remote).isError).toBe(true);
  expect(state.get("count")).toBe(50);
  expect(
    (await host.callTool({ name: "get_count" })).structuredContent,
  ).toEqual({ count: 50 });
});

it("runs browser-only interactions locally without an MCP connection", async () => {
  const state = createStateStore({ count: 0 });
  const tools = new AppTools(null);
  tools.replace(
    [
      {
        name: "increment",
        inputSchema: { type: "object" },
        actions: { action: "setState", key: "count", value: "{{ count + 1 }}" },
        result: { count: "{{ count }}" },
      },
    ],
    state,
  );
  expect(await executeAction(click, null, state)).toBe(true);
  expect(state.get("count")).toBe(1);
  tools.clear();
  expect(await executeAction(click, null, state)).toBe(false);
});

it("lets deferred local calls join the shared queue after their scheduling tool returns", async () => {
  const { host, tools, state } = await connect();
  vi.useFakeTimers();
  tools.replace(
    [
      ...counter.tools,
      {
        name: "schedule",
        inputSchema: { type: "object" },
        actions: {
          action: "setInterval",
          duration: 10,
          count: 1,
          onTick: click,
        },
        result: {},
      },
    ],
    state,
  );
  expect((await host.callTool({ name: "schedule" })).isError).not.toBe(true);
  await vi.advanceTimersByTimeAsync(10);
  expect(state.get("count")).toBe(1);
});
