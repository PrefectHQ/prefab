// @vitest-environment jsdom
import { act, createElement, Suspense } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RenderNode, type ComponentNode } from "./renderer";
import { createStateStore } from "./testing/state-store";

let root: Root | null = null;
let container: HTMLDivElement;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("requestAnimationFrame", () => 0);
  vi.stubGlobal("cancelAnimationFrame", () => {});
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 600,
    bottom: 300,
    width: 600,
    height: 300,
    toJSON: () => ({}),
  });
  container = document.createElement("div");
  document.body.append(container);
});

afterEach(async () => {
  await act(async () => root?.unmount());
  root = null;
  container.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

async function render(node: ComponentNode, data: Record<string, unknown> = {}) {
  root ??= createRoot(container);
  const state = createStateStore(data);
  await act(async () => {
    root!.render(
      createElement(
        Suspense,
        { fallback: null },
        createElement(RenderNode, {
          node,
          state,
          scope: {},
          app: null,
        }),
      ),
    );
  });
  return state;
}

describe("accessible names through the renderer", () => {
  it("names a button independently of its visible text", async () => {
    await render({
      type: "Button",
      label: "Open",
      ariaLabel: "Open record 1042",
    });
    expect(container.querySelector("button")?.getAttribute("aria-label")).toBe(
      "Open record 1042",
    );
    expect(container.querySelector("button")?.textContent).toBe("Open");
  });

  it("interpolates an input name and external label reference", async () => {
    await render(
      {
        type: "Input",
        ariaLabel: "Search {{ record }}",
        ariaLabelledBy: "{{ label_id }}",
      },
      { record: 1042, label_id: "record-label" },
    );
    const input = container.querySelector("input");
    expect(input?.getAttribute("aria-label")).toBe("Search 1042");
    expect(input?.getAttribute("aria-labelledby")).toBe("record-label");
  });
});

const controls: [ComponentNode, string][] = [
  [{ type: "Input" }, "input"],
  [{ type: "Textarea" }, "textarea"],
  [{ type: "Checkbox", label: "Visible label" }, '[role="checkbox"]'],
  [{ type: "Switch", label: "Visible label" }, '[role="switch"]'],
  [{ type: "Slider", value: 25 }, 'input[type="range"]'],
  [
    {
      type: "Select",
      children: [{ type: "SelectOption", label: "Visible choice", value: "a" }],
    },
    '[role="combobox"]',
  ],
  [
    {
      type: "Combobox",
      children: [
        { type: "ComboboxOption", label: "Visible choice", value: "a" },
      ],
    },
    "button",
  ],
  [
    { type: "Radio", option: "a", label: "Visible choice" },
    'input[type="radio"]',
  ],
  [
    {
      type: "RadioGroup",
      children: [{ type: "Radio", option: "a", label: "Visible choice" }],
    },
    '[role="radiogroup"]',
  ],
  [{ type: "DropZone" }, '[role="button"]'],
  [{ type: "Form" }, "form"],
  [{ type: "Link", href: "/records", content: "Open" }, "a"],
  [
    { type: "ButtonGroup", children: [{ type: "Button", label: "Open" }] },
    '[role="group"]',
  ],
  [
    {
      type: "DataTable",
      columns: [{ key: "record", header: "Record" }],
      rows: [{ record: "Example" }],
    },
    "table",
  ],
  [{ type: "Video", src: "about:blank" }, "video"],
  [{ type: "Audio", src: "about:blank" }, "audio"],
  [{ type: "Embed", url: "about:blank" }, "iframe"],
];

it.each(controls)(
  "forwards names to the semantic surface of $type",
  async (node, selector) => {
    await render({
      ...node,
      ariaLabel: "Explicit name",
      ariaLabelledBy: "external-label",
    });
    const control = container.querySelector(selector);
    expect(control).not.toBeNull();
    expect(control?.getAttribute("aria-label")).toBe("Explicit name");
    expect(control?.getAttribute("aria-labelledby")).toBe("external-label");
  },
);

it("names each slider thumb without naming the layout wrapper", async () => {
  await render({
    type: "Slider",
    value: [10, 30],
    range: true,
    ariaLabel: "Price range",
  });
  const thumbs = container.querySelectorAll('input[type="range"]');
  expect(thumbs).toHaveLength(2);
  expect([...thumbs].map((thumb) => thumb.getAttribute("aria-label"))).toEqual([
    "Price range",
    "Price range",
  ]);
  expect(container.firstElementChild?.hasAttribute("aria-label")).toBe(false);
});

it("interpolates names on consumed tab children", async () => {
  await render(
    {
      type: "Tabs",
      ariaLabel: "Record views",
      children: [
        {
          type: "Tab",
          title: "Open",
          ariaLabel: "Open {{ record }}",
          children: [],
        },
      ],
    },
    { record: 1042 },
  );
  expect(
    container.querySelector('[role="tablist"]')?.getAttribute("aria-label"),
  ).toBe("Record views");
  expect(
    container.querySelector('[role="tab"]')?.getAttribute("aria-label"),
  ).toBe("Open 1042");
  expect(
    container.querySelector('[role="tab"]')?.getAttribute("aria-selected"),
  ).toBe("true");
});

it("names an accordion item's generated trigger", async () => {
  await render({
    type: "Accordion",
    children: [
      {
        type: "AccordionItem",
        title: "Details",
        ariaLabel: "Details for record 1042",
        children: [],
      },
    ],
  });
  expect(container.querySelector("button")?.getAttribute("aria-label")).toBe(
    "Details for record 1042",
  );
  expect(container.querySelector("button")?.getAttribute("aria-expanded")).toBe(
    "false",
  );
});

it("preserves explicit names on consumed radio items", async () => {
  await render({
    type: "RadioGroup",
    children: [
      {
        type: "Radio",
        option: "basic",
        label: "Basic",
        ariaLabel: "Basic monthly plan",
      },
    ],
  });
  expect(
    container.querySelector('[role="radio"]')?.getAttribute("aria-label"),
  ).toBe("Basic monthly plan");
});

it("does not invent a semantic role for a named layout container", async () => {
  await render({ type: "Column", ariaLabel: "Layout", children: [] });
  expect(container.firstElementChild?.getAttribute("aria-label")).toBe(
    "Layout",
  );
  expect(container.firstElementChild?.getAttribute("role")).toBeNull();
});

it("preserves absent naming attributes and existing visible text", async () => {
  await render({ type: "Button", label: "Open" });
  const button = container.querySelector("button");
  expect(button?.textContent).toBe("Open");
  expect(button?.hasAttribute("aria-label")).toBe(false);
  expect(button?.hasAttribute("aria-labelledby")).toBe(false);
});

it("converts a sole reactive scalar to an accessible string", async () => {
  await render(
    { type: "Button", label: "Open", ariaLabel: "{{ record }}" },
    { record: 1042 },
  );
  expect(container.querySelector("button")?.getAttribute("aria-label")).toBe(
    "1042",
  );
});

it("names the calendar's existing grid", async () => {
  await import("./components/compound-calendar");
  await render({
    type: "Calendar",
    value: "2026-10-25",
    ariaLabel: "Choose appointment date",
    ariaLabelledBy: "calendar-label",
  });
  const grid = container.querySelector('[role="grid"]');
  expect(grid?.getAttribute("aria-label")).toBe("Choose appointment date");
  expect(grid?.getAttribute("aria-labelledby")).toBe("calendar-label");
});

it("names the date picker's implicit trigger", async () => {
  await import("./components/compound-calendar");
  await render({
    type: "DatePicker",
    value: "2026-10-25",
    ariaLabel: "Choose appointment date",
  });
  expect(container.querySelector("button")?.getAttribute("aria-label")).toBe(
    "Choose appointment date",
  );
});

it("names the chart's existing semantic SVG", async () => {
  await import("./components/charts");
  await render({
    type: "BarChart",
    data: [{ month: "January", total: 12 }],
    series: [{ dataKey: "total" }],
    xAxis: "month",
    height: 200,
    animate: false,
    ariaLabel: "Revenue",
    ariaLabelledBy: "chart-label",
  });
  const svg = container.querySelector('svg[role="application"]');
  expect(svg?.getAttribute("aria-label")).toBe("Revenue");
  expect(svg?.getAttribute("aria-labelledby")).toBe("chart-label");
});

it.each(["Dialog", "Popover"])(
  "names %s content independently of its trigger",
  async (type) => {
    await render({
      type,
      title: "Automatic title",
      ariaLabel: "Explicit popup name",
      children: [
        { type: "Button", label: "Open", ariaLabel: "Open record 1042" },
        { type: "Text", content: "Popup content" },
      ],
    });
    const button =
      container.querySelector<HTMLButtonElement>("button[aria-label]");
    expect(button?.getAttribute("aria-label")).toBe("Open record 1042");
    await act(async () => button?.click());
    const popup = document.querySelector('[role="dialog"]');
    expect(popup?.getAttribute("aria-label")).toBe("Explicit popup name");
    expect(popup?.getAttribute("aria-labelledby")).toBeNull();
  },
);

it("keeps an explicit external label reference ahead of a popup label", async () => {
  await render({
    type: "Dialog",
    title: "Automatic title",
    ariaLabel: "Fallback name",
    ariaLabelledBy: "external-label",
    children: [
      { type: "Button", label: "Open" },
      { type: "Text", content: "Popup content" },
    ],
  });
  await act(async () => container.querySelector("button")?.click());
  const popup = document.querySelector('[role="dialog"]');
  expect(popup?.getAttribute("aria-label")).toBe("Fallback name");
  expect(popup?.getAttribute("aria-labelledby")).toBe("external-label");
});

it.each(["Dialog", "Popover"])(
  "composes a single native %s trigger and preserves actions",
  async (type) => {
    const state = await render({
      type,
      title: "Details",
      children: [
        {
          type: "Button",
          label: "Open",
          ariaLabel: "Open record",
          onClick: { action: "setState", key: "clicked", value: true },
        },
        { type: "Text", content: "Details content" },
      ],
    });
    expect(container.querySelectorAll("button")).toHaveLength(1);
    const button = container.querySelector("button")!;
    expect(button.getAttribute("aria-label")).toBe("Open record");
    expect(button.getAttribute("aria-haspopup")).toBe("dialog");
    await act(async () => button.click());
    expect(state.get("clicked")).toBe(true);
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    expect(button.getAttribute("aria-expanded")).toBe("true");
    await act(
      async () =>
        document
          .querySelector('[role="dialog"]')
          ?.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
          ),
    );
    expect(button.getAttribute("aria-expanded")).toBe("false");
  },
);

it("keeps noninteractive dialog trigger content wrapped in a native button", async () => {
  await render({
    type: "Dialog",
    title: "Details",
    children: [{ type: "Text", content: "Open details" }],
  });
  expect(container.querySelectorAll("button")).toHaveLength(1);
  expect(container.querySelector("button")?.textContent).toBe("Open details");
});

it("names the existing ring meter without changing its range", async () => {
  await render({ type: "Ring", value: 42, ariaLabel: "Budget used" });
  const meter = container.querySelector('[role="meter"]');
  expect(meter?.getAttribute("aria-label")).toBe("Budget used");
  expect(meter?.getAttribute("aria-valuenow")).toBe("42");
});

it("names the waterfall chart's semantic SVG", async () => {
  await import("./components/waterfall-chart");
  await render({
    type: "WaterfallChart",
    data: [{ month: "January", total: 12 }],
    dataKey: "total",
    nameKey: "month",
    height: 200,
    animate: false,
    ariaLabel: "Profit changes",
  });
  expect(
    container
      .querySelector('svg[role="application"]')
      ?.getAttribute("aria-label"),
  ).toBe("Profit changes");
});

it.each(["line", "bar"])(
  "names the %s sparkline's existing SVG",
  async (mode) => {
    await import("./components/sparkline");
    await render({
      type: "Sparkline",
      data: [1, 2, 3],
      mode,
      ariaLabel: "Trend",
    });
    expect(container.querySelector("svg")?.getAttribute("aria-label")).toBe(
      "Trend",
    );
  },
);

it("preserves a dialog's automatic title reference when no name is supplied", async () => {
  await render({
    type: "Dialog",
    title: "Automatic title",
    children: [{ type: "Button", label: "Open" }],
  });
  await act(async () => container.querySelector("button")?.click());
  const popup = document.querySelector('[role="dialog"]');
  expect(popup?.getAttribute("aria-label")).toBeNull();
  const titleId = popup?.getAttribute("aria-labelledby");
  expect(titleId).toBeTruthy();
  expect(document.getElementById(titleId!)?.textContent).toBe(
    "Automatic title",
  );
});

it("keeps an option's explicit name when Select consumes its child metadata", async () => {
  await render(
    {
      type: "Select",
      ariaLabel: "Choose record",
      children: [
        {
          type: "SelectOption",
          value: "a",
          label: "Visible option",
          ariaLabel: "Record {{ record }}",
        },
      ],
    },
    { record: 1042 },
  );
  await act(
    async () =>
      container.querySelector<HTMLButtonElement>('[role="combobox"]')?.click(),
  );
  const option = document.querySelector('[role="option"]');
  expect(option?.getAttribute("aria-label")).toBe("Record 1042");
  expect(option?.textContent).toBe("Visible option");
});
