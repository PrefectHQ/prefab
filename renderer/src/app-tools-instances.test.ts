// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { act, createElement, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { AppBridge } from "@modelcontextprotocol/ext-apps/app-bridge";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { App as SdkApp } from "@modelcontextprotocol/ext-apps";
import counter from "./testing/backend-counter-app.json";

vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
vi.stubGlobal(
  "ResizeObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
);
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }),
});
const mounted: Array<{ root: Root; host: AppBridge; app: SdkApp }> = [];
afterEach(async () => {
  for (const { root, host, app } of mounted.splice(0)) {
    await act(async () => root.unmount());
    await Promise.all([host.close(), app.close()]);
  }
  document.body.innerHTML = "";
});

it("routes two standard renderer instances with identical tool names through their own buttons and bridges", async () => {
  const counts = new Map([
    ["counter-a", 0],
    ["counter-b", 100],
  ]);
  const calls: Array<{ name: string; id: string }> = [];
  async function mount(id: string) {
    // Separate module instances mirror the independent JS realms of two iframes.
    // Both run the actual App, bridge, renderer, dispatcher, and React StateStore.
    vi.resetModules();
    const { bridge } = await import("./bridge");
    const { App } = await import("./app");
    const host = new AppBridge(
      null,
      { name: "Host", version: "1" },
      { serverTools: {} },
    );
    host.oncalltool = async ({ name, arguments: args }) => {
      const counterId = args?.counter_id as string;
      expect(name).toBe("counters_increment_abc123");
      expect(counts.has(counterId)).toBe(true);
      calls.push({ name, id: counterId });
      const amount = (args?.amount as number | undefined) ?? 1;
      if (amount < 0)
        return {
          isError: true,
          content: [{ type: "text", text: "Amount must be positive" }],
        };
      const count = counts.get(counterId)! + amount;
      counts.set(counterId, count);
      return { content: [], structuredContent: { count } };
    };
    const [appTransport, hostTransport] = InMemoryTransport.createLinkedPair();
    await host.connect(hostTransport);
    await bridge.connect(appTransport);
    const payload = {
      ...counter,
      state: { ...counter.state, counter_id: id, count: counts.get(id)! },
    };
    await host.sendToolResult({ content: [], structuredContent: payload });
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    mounted.push({ root, host, app: bridge.app! });
    await act(async () =>
      root.render(createElement(StrictMode, null, createElement(App))),
    );
    return { root, host, container, payload };
  }
  const a = await mount("counter-a");
  const b = await mount("counter-b");
  const displayed = (instance: typeof a) =>
    instance.container.querySelector("span")?.textContent;
  expect((await a.host.listTools({})).tools.map((t) => t.name)).toEqual([
    "get_count",
    "increment",
  ]);
  expect((await b.host.listTools({})).tools.map((t) => t.name)).toEqual([
    "get_count",
    "increment",
  ]);
  await act(async () => a.container.querySelector("button")!.click());
  expect(displayed(a)).toBe("1");
  expect(displayed(b)).toBe("100");
  await act(async () => {
    expect(
      (await b.host.callTool({ name: "increment", arguments: { amount: 5 } }))
        .structuredContent,
    ).toEqual({ count: 105 });
  });
  expect(displayed(a)).toBe("1");
  expect(displayed(b)).toBe("105");
  await act(async () => b.container.querySelector("button")!.click());
  await act(async () => {
    expect(
      (await a.host.callTool({ name: "increment", arguments: { amount: 2 } }))
        .structuredContent,
    ).toEqual({ count: 3 });
  });
  expect(displayed(a)).toBe("3");
  expect(displayed(b)).toBe("106");
  expect(calls.map((c) => c.id)).toEqual([
    "counter-a",
    "counter-b",
    "counter-b",
    "counter-a",
  ]);
  await act(async () => {
    const failure = await a.host.callTool({
      name: "increment",
      arguments: { amount: -1 },
    });
    expect(failure.isError).toBe(true);
  });
  expect(a.container.textContent).toContain("Amount must be positive");
  expect(b.container.textContent).not.toContain("Amount must be positive");
  // Re-delivery replaces registrations without duplicating names or callbacks.
  await act(async () =>
    b.host.sendToolResult({
      content: [],
      structuredContent: {
        ...b.payload,
        state: { ...b.payload.state, count: 106 },
      },
    }),
  );
  expect((await b.host.listTools({})).tools).toHaveLength(2);
  await act(async () => a.root.unmount());
  expect((await a.host.listTools({})).tools).toEqual([]);
  await act(async () => {
    expect(
      (await b.host.callTool({ name: "increment", arguments: {} }))
        .structuredContent,
    ).toEqual({ count: 107 });
  });
  expect(displayed(b)).toBe("107");
});
