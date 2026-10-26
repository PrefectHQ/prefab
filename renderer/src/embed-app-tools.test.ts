// @vitest-environment jsdom
import { act } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { mountPreview } from "./embed";
import counter from "./testing/counter-app.json";

// CSS compilation is covered by the embed build; keep this about live dispatch.
vi.mock("./index.css?inline", () => ({ default: "" }));
vi.mock("sonner/dist/styles.css?inline", () => ({ default: "" }));
vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
vi.stubGlobal("matchMedia", () => ({
  matches: false,
  addEventListener() {},
  removeEventListener() {},
}));

const mounted: ReturnType<typeof mountPreview>[] = [];
afterEach(async () => {
  await act(async () =>
    mounted.splice(0).forEach((handle) => handle.unmount()),
  );
  document.body.innerHTML = "";
  vi.useRealTimers();
});

it("runs isolated local app tools in shadow-root documentation previews", async () => {
  const hosts = [document.createElement("div"), document.createElement("div")];
  document.body.append(...hosts);
  const payload = structuredClone(counter);
  Object.assign(payload.view, {
    onMount: {
      action: "invokeAppTool",
      tool: "increment",
      arguments: { amount: 2 },
    },
  });
  await act(async () => {
    for (const host of hosts)
      mounted.push(mountPreview(host, JSON.stringify(payload)));
  });
  await act(async () => hosts[0].shadowRoot!.querySelector("button")!.click());
  expect(hosts[0].shadowRoot!.querySelector("span")?.textContent).toBe("3");
  expect(hosts[1].shadowRoot!.querySelector("span")?.textContent).toBe("2");
  await act(async () => mounted[0].setDark(true));
  expect(hosts[0].shadowRoot!.querySelector("span")?.textContent).toBe("3");
  await act(async () => mounted.shift()!.unmount());
  await act(async () => hosts[1].shadowRoot!.querySelector("button")!.click());
  expect(hosts[1].shadowRoot!.querySelector("span")?.textContent).toBe("3");
});

it.each([false, true])(
  "unmounting one preview preserves another interval (app tool: %s)",
  async (appTool) => {
    vi.useFakeTimers();
    const interval = {
      action: "setInterval",
      duration: 100,
      onTick: { action: "setState", key: "count", value: "{{ count + 1 }}" },
    };
    const payload = {
      view: {
        type: "Column",
        children: [
          { type: "Text", content: "{{ count }}" },
          {
            type: "Button",
            label: "Start",
            onClick: appTool
              ? { action: "invokeAppTool", tool: "start" }
              : interval,
          },
        ],
      },
      state: { count: 0 },
      tools: [
        {
          name: "start",
          inputSchema: { type: "object" },
          result: {},
          actions: interval,
        },
      ],
    };
    const hosts = [
      document.createElement("div"),
      document.createElement("div"),
    ];
    document.body.append(...hosts);
    await act(async () => {
      for (const host of hosts)
        mounted.push(mountPreview(host, JSON.stringify(payload)));
    });
    await act(async () => {
      for (const host of hosts)
        host.shadowRoot!.querySelector("button")!.click();
    });
    await act(async () => vi.advanceTimersByTimeAsync(100));
    expect(hosts[1].shadowRoot!.querySelector("span")?.textContent).toBe("1");
    await act(async () => mounted[1].setDark(true));
    expect(hosts[1].shadowRoot!.querySelector("span")?.textContent).toBe("1");
    await act(async () => mounted.shift()!.unmount());
    await act(async () => vi.advanceTimersByTimeAsync(100));
    expect(hosts[1].shadowRoot!.querySelector("span")?.textContent).toBe("2");
  },
);

it("applies theme assets to preview and portal roots while retaining the public dark handle", async () => {
  const host = document.createElement("div");
  document.body.append(host);
  let handle!: ReturnType<typeof mountPreview>;
  await act(async () => {
    handle = mountPreview(
      host,
      JSON.stringify({
        view: { type: "Text", content: "Preview" },
        css: [".pf-popover-content { border: 7px solid red; }"],
        stylesheets: ["https://example.com/font.css"],
      }),
    );
    mounted.push(handle);
  });
  const portalHost = document.querySelector<HTMLElement>(
    "[data-prefab-shadow-portal-host]",
  )!;
  expect(portalHost).not.toBeNull();
  for (const shadow of [host.shadowRoot!, portalHost.shadowRoot!]) {
    expect(
      shadow.querySelector("[data-prefab-shadow-css]")?.textContent,
    ).toContain(".pf-popover-content");
    expect(shadow.querySelector("link")?.getAttribute("href")).toBe(
      "https://example.com/font.css",
    );
  }
  handle.setDark(true);
  expect(host.hasAttribute("data-prefab-dark")).toBe(true);
  expect(portalHost.hasAttribute("data-prefab-dark")).toBe(true);
});
