// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { act, createElement, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { AppBridge } from "@modelcontextprotocol/ext-apps/app-bridge";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { bridge } from "./bridge";
import { App } from "./app";
import counter from "./testing/counter-app.json";

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
  await bridge.app?.close();
  await host?.close();
  document.body.innerHTML = "";
});

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
