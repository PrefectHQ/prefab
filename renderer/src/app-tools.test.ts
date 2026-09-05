import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "@modelcontextprotocol/ext-apps";
import { AppBridge } from "@modelcontextprotocol/ext-apps/app-bridge";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { ToolListChangedNotificationSchema } from "@modelcontextprotocol/sdk/types.js";
import { AppTools } from "./app-tools";
import { createStateStore } from "./testing/state-store";
import counter from "./testing/counter-app.json";

const peers: Array<App | AppBridge> = [];
afterEach(async () => {
  await Promise.all(peers.splice(0).map((peer) => peer.close()));
  vi.restoreAllMocks();
});

async function connect(initial?: unknown) {
  const app = new App(
    { name: "Prefab test", version: "1" },
    { tools: { listChanged: true } },
    { autoResize: false },
  );
  const tools = new AppTools(app);
  const state = createStateStore({ count: 0, private: "not a result" });
  if (initial) tools.replace(initial, state);
  const host = new AppBridge(null, { name: "Test host", version: "1" }, {});
  peers.push(app, host);
  const changed = vi.fn();
  host.setNotificationHandler(ToolListChangedNotificationSchema, changed);
  const [appTransport, hostTransport] = InMemoryTransport.createLinkedPair();
  await host.connect(hostTransport);
  await app.connect(appTransport);
  tools.connected();
  return { app, host, tools, state, changed };
}

describe("app-provided tools over the actual AppBridge", () => {
  it("advertises before a payload, then notifies and discovers late tools", async () => {
    const { host, tools, state, changed } = await connect();
    expect(host.getAppCapabilities()?.tools).toEqual({ listChanged: true });
    expect((await host.listTools({})).tools).toEqual([]);
    tools.replace(counter.tools, state);
    const listed = (await host.listTools({})).tools;
    expect(changed).toHaveBeenCalled();
    expect(listed.map((tool) => tool.name)).toEqual(["get_count", "increment"]);
    expect(listed[1].inputSchema).toEqual(counter.tools[1].inputSchema);
    expect(listed[1]).not.toHaveProperty("actions");
    expect(listed[1]).not.toHaveProperty("result");
  });

  it("supports tools loaded before connecting and returns only explicit results", async () => {
    const { host } = await connect(counter.tools);
    const result = await host.callTool({
      name: "increment",
      arguments: { amount: 4 },
    });
    expect(result).toEqual({
      content: [{ type: "text", text: '{"count":4}' }],
      structuredContent: { count: 4 },
    });
  });

  it.each([
    {},
    { amount: "2" },
    { amount: 1.5 },
    { amount: true },
    { amount: 2, extra: 1 },
  ])("rejects invalid arguments without changing state: %j", async (args) => {
    const { host, state } = await connect(counter.tools);
    const result = await host.callTool({ name: "increment", arguments: args });
    expect(result.isError).toBe(true);
    expect(result.content).toEqual([
      expect.objectContaining({
        text: expect.stringContaining("Invalid arguments"),
      }),
    ]);
    expect(state.get("count")).toBe(0);
  });

  it("validates nested Pydantic refs and numeric constraints", async () => {
    const { host, tools, state } = await connect();
    tools.replace(
      [
        {
          name: "nested",
          result: { amount: "{{ $event.input.amount }}" },
          inputSchema: {
            type: "object",
            required: ["input"],
            properties: { input: { $ref: "#/$defs/Input" } },
            $defs: {
              Input: {
                type: "object",
                required: ["amount"],
                properties: {
                  amount: { type: "integer", minimum: 1, maximum: 10 },
                },
              },
            },
          },
        },
      ],
      state,
    );
    expect(
      (
        await host.callTool({
          name: "nested",
          arguments: { input: { amount: 0 } },
        })
      ).isError,
    ).toBe(true);
    expect(
      (
        await host.callTool({
          name: "nested",
          arguments: { input: { amount: 3 } },
        })
      ).structuredContent,
    ).toEqual({ amount: 3 });
  });

  it.each([
    { action: "callHandler", handler: "missing" },
    { action: "notAnAction" },
    { action: "setState", value: 1 },
    {
      action: "setState",
      key: "count",
      value: 2,
      onSuccess: { action: "callHandler", handler: "missing" },
    },
  ])(
    "returns execution failures and stops action chains: %j",
    async (action) => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
      const { host, tools, state } = await connect();
      tools.replace(
        [
          {
            name: "fail",
            inputSchema: { type: "object" },
            actions: [
              action,
              { action: "setState", key: "after", value: true },
            ],
            result: {},
          },
        ],
        state,
      );
      expect((await host.callTool({ name: "fail" })).isError).toBe(true);
      expect(state.get("after")).toBeUndefined();
    },
  );

  it("replaces registrations and clears omitted tools", async () => {
    const { host, tools, state } = await connect(counter.tools);
    state.reset({ count: 20 });
    tools.replace([counter.tools[0]], state);
    expect((await host.listTools({})).tools.map((tool) => tool.name)).toEqual([
      "get_count",
    ]);
    expect(
      (await host.callTool({ name: "increment", arguments: { amount: 1 } }))
        .isError,
    ).toBe(true);
    expect(
      (await host.callTool({ name: "get_count" })).structuredContent,
    ).toEqual({ count: 20 });
    tools.replace(undefined, state);
    expect((await host.listTools({})).tools).toEqual([]);
    expect((await host.callTool({ name: "get_count" })).isError).toBe(true);
  });

  it.each([[counter.tools[0], counter.tools[0]], [{ name: "missing_result" }]])(
    "clears stale registrations on malformed replacement: %j",
    async (...specs) => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
      const { host, tools, state } = await connect(counter.tools);
      tools.replace(specs, state);
      expect((await host.listTools({})).tools).toEqual([]);
    },
  );

  it("prevents an old asynchronous invocation from changing the replacement app", async () => {
    const { host, tools, state } = await connect();
    let release!: (response: Response) => void;
    const fetching = vi.spyOn(globalThis, "fetch").mockImplementation(
      () =>
        new Promise((resolve) => {
          release = resolve;
        }),
    );
    tools.replace(
      [
        {
          name: "slow",
          inputSchema: { type: "object" },
          result: {},
          actions: {
            action: "fetch",
            url: "https://example.com",
            onSuccess: { action: "setState", key: "count", value: 99 },
          },
        },
      ],
      state,
    );
    const call = host.callTool({ name: "slow" });
    await vi.waitFor(() => expect(fetching).toHaveBeenCalled());
    tools.replace(counter.tools, state);
    state.reset({ count: 10 });
    expect(
      (await host.callTool({ name: "get_count" })).structuredContent,
    ).toEqual({ count: 10 });
    release(
      new Response("{}", { headers: { "Content-Type": "application/json" } }),
    );
    expect((await call).isError).toBe(true);
    expect(state.get("count")).toBe(10);
  });
});
