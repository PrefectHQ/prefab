import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { RenderNode, type ComponentNode } from "./renderer";
import { createStateStore } from "./testing/state-store";

vi.mock("./components/registry", () => ({
  REGISTRY: {
    ForEach: () => null,
    Text: ({ children }: { children: string }) =>
      createElement("span", null, children),
  },
}));

function renderLoop(key: string, data: Record<string, unknown>) {
  const node: ComponentNode = {
    type: "ForEach",
    key,
    children: [{ type: "Text", content: "{{ $item.name }}" }],
  };
  return renderToStaticMarkup(
    createElement(RenderNode, {
      node,
      state: createStateStore(data),
      scope: {},
      app: null,
    }),
  );
}

const items = [
  { name: "alpha", active: true },
  { name: "bravo", active: false },
  { name: "charlie", active: true },
];

describe("ForEach expression sources", () => {
  it.each(["items | selectattr:active", "{{ items | selectattr:active }}"])(
    "renders a filtered list from %s",
    (key) => {
      expect(renderLoop(key, { items })).toBe(
        '<div class="contents"><span>alpha</span><span>charlie</span></div>',
      );
    },
  );

  it("supports rejectattr", () => {
    expect(renderLoop("items | rejectattr:active", { items })).toContain(
      "bravo",
    );
    expect(renderLoop("items | rejectattr:active", { items })).not.toContain(
      "alpha",
    );
  });

  it.each(["items", "{{ items }}", "groups.{{ selected }}.items"])(
    "preserves existing list and dynamic path sources: %s",
    (key) => {
      expect(
        renderLoop(key, { items, selected: 0, groups: [{ items }] }),
      ).toContain("<span>alpha</span><span>bravo</span><span>charlie</span>");
    },
  );

  it("preserves plain keys containing hyphens", () => {
    expect(renderLoop("my-items", { "my-items": items })).toContain("alpha");
  });

  it.each(["missing", "items |", "{{ 42 }}", "items | compact"])(
    "renders no children for invalid/non-list source %s",
    (key) => {
      expect(renderLoop(key, { items })).toBe("");
    },
  );
});
