// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { act, createElement, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { AppBridge } from "@modelcontextprotocol/ext-apps/app-bridge";
import { InMemoryTransport } from "@modelcontextprotocol/client";
import { bridge } from "./bridge";
import { App } from "./app";
import counter from "./testing/counter-app.json";
import * as executor from "./pyodide/executor";

// Only browser layout APIs are shimmed; the bridge, renderer, and state are real.
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

let root: Root;
let host: AppBridge;
afterEach(async () => {
  await act(async () => root?.unmount());
  document.body.innerHTML = "";
  vi.useRealTimers();
  // Let the SDK's pending size notification finish while its transport is open.
  await new Promise<void>((resolve) =>
    window.requestAnimationFrame(() => resolve()),
  );
  await bridge.app?.close();
  await host?.close();
  vi.restoreAllMocks();
});

it.each(["sendToolInput", "sendToolInputPartial"] as const)(
  "installs app tools from streamed Python through %s before any tool result",
  async (method) => {
    vi.spyOn(executor, "loadPyodideRuntime").mockImplementation(
      async (status) => {
        status("ready");
        return {} as executor.PyodideInterface;
      },
    );
    vi.spyOn(executor, "executePrefabCode").mockResolvedValue({
      tree: counter.view,
      state: counter.state,
      tools: counter.tools,
    });
    host = new AppBridge(null, { name: "Streaming test", version: "1" }, {});
    const [appTransport, hostTransport] = InMemoryTransport.createLinkedPair();
    await host.connect(hostTransport);
    await bridge.connect(appTransport);
    const container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    await act(async () => root.render(createElement(App)));
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    await act(async () => {
      await host[method]({ arguments: { code: method } });
      await vi.advanceTimersByTimeAsync(50);
    });
    vi.useRealTimers();
    expect(container.textContent).toContain("Increment");
    expect((await host.listTools({})).tools).toHaveLength(2);
    await act(async () => container.querySelector("button")!.click());
    expect(
      (await host.callTool({ name: "get_count" })).structuredContent,
    ).toEqual({ count: 1 });
    await act(async () =>
      host.sendToolResult({
        content: [],
        structuredContent: { view: counter.view, state: { count: 9 } },
      }),
    );
    expect((await host.listTools({})).tools).toEqual([]);
  },
);

it("renders a Python payload delivered by the host and shares human/model state", async () => {
  host = new AppBridge(null, { name: "Renderer test", version: "1" }, {});
  const [appTransport, hostTransport] = InMemoryTransport.createLinkedPair();
  await host.connect(hostTransport);
  await bridge.connect(appTransport);
  expect(host.getAppCapabilities()?.tools).toEqual({ listChanged: true });
  expect((await host.listTools({})).tools).toEqual([]);
  // Standard MCP tool-result delivery, deliberately before React mounts.
  await host.sendToolInput({ arguments: {} });
  await host.sendToolResult({ content: [], structuredContent: counter });
  const container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () =>
    root.render(createElement(StrictMode, null, createElement(App))),
  );
  expect((await host.listTools({})).tools).toHaveLength(2);
  expect(container.querySelector("span")?.textContent).toBe("0");

  await act(async () => container.querySelector("button")!.click());
  expect(container.querySelector("span")?.textContent).toBe("1");
  expect(
    (await host.callTool({ name: "get_count" })).structuredContent,
  ).toEqual({ count: 1 });

  await act(async () => {
    expect(
      (await host.callTool({ name: "increment", arguments: { amount: 4 } }))
        .structuredContent,
    ).toEqual({ count: 5 });
  });
  expect(container.querySelector("span")?.textContent).toBe("5");
  await act(async () => container.querySelector("button")!.click());
  expect(
    (await host.callTool({ name: "get_count" })).structuredContent,
  ).toEqual({ count: 6 });

  await act(async () =>
    host.sendToolResult({
      content: [],
      structuredContent: {
        ...counter,
        state: { count: 20 },
        tools: [counter.tools[0]],
      },
    }),
  );
  expect(container.querySelector("span")?.textContent).toBe("20");
  expect(
    (await host.callTool({ name: "increment", arguments: { amount: 1 } }))
      .isError,
  ).toBe(true);
  await act(async () => root.unmount());
  expect((await host.listTools({})).tools).toEqual([]);
  await host.sendToolResult({ content: [], structuredContent: counter });
  expect((await host.listTools({})).tools).toEqual([]);
});
