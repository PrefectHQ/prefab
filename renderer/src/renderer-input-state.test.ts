// @vitest-environment jsdom
import { act, createElement as h } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { RenderTree, type ComponentNode } from "./renderer";
import { useStateStore, type StateStore } from "./state";

let root: Root;
let container: HTMLDivElement;
let state: StateStore;
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
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }));
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});
async function render(node: ComponentNode, initial: Record<string, unknown>) {
  function Harness() {
    state = useStateStore(initial);
    return h(RenderTree, { tree: node, state, app: null });
  }
  await act(async () => root.render(h(Harness)));
}
async function type(value: string) {
  const input = container.querySelector("input,textarea") as
    HTMLInputElement | HTMLTextAreaElement;
  const proto =
    input instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(proto, "value")!.set!.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

it.each(["Input", "Textarea", "Checkbox", "Switch"])(
  "syncs named %s before its on_change actions",
  async (typeName) => {
    const toggle = typeName === "Checkbox" || typeName === "Switch";
    const value = toggle ? false : "";
    const next = toggle ? true : "typed";
    await render(
      {
        type: typeName,
        name: "field",
        value,
        onChange: [
          { action: "setState", key: "seen", value: "{{ field }}" },
          { action: "setState", key: "event", value: "{{ $event }}" },
        ],
      },
      { field: value },
    );
    if (toggle)
      await act(async () =>
        container
          .querySelector<HTMLElement>(
            `[role="${typeName === "Checkbox" ? "checkbox" : "switch"}"]`,
          )!
          .click(),
      );
    else await type(String(next));
    expect(state.get("field")).toBe(next);
    expect(state.get("seen")).toBe(next);
    expect(state.get("event")).toBe(next);
    if (!toggle) {
      expect(
        (container.querySelector("input,textarea") as HTMLInputElement).value,
      ).toBe(next);
      await type("typed again");
      expect(state.get("field")).toBe("typed again");
    }
  },
);

it("syncs nested state paths before handlers and lets explicit actions override the new value", async () => {
  await render(
    {
      type: "Input",
      name: "profile.query",
      onChange: [
        { action: "setState", key: "seen", value: "{{ profile.query }}" },
        { action: "setState", key: "profile.query", value: "explicit" },
      ],
    },
    { profile: { query: "", untouched: 7 } },
  );
  await type("typed");
  expect(state.get("seen")).toBe("typed");
  expect(state.get("profile.query")).toBe("explicit");
  expect(state.get("profile.untouched")).toBe(7);
  expect((container.querySelector("input") as HTMLInputElement).value).toBe(
    "explicit",
  );
});

it.each(["Select", "RadioGroup", "Combobox"])(
  "syncs %s selection before its existing handler",
  async (typeName) => {
    const children = ["a", "b"].map((value) =>
      typeName === "RadioGroup"
        ? { type: "Radio", option: value, label: value }
        : {
            type: typeName === "Select" ? "SelectOption" : "ComboboxOption",
            value,
            label: value,
          },
    );
    await render(
      {
        type: typeName,
        name: "field",
        value: "a",
        children,
        onChange: [
          { action: "setState", key: "seen", value: "{{ field }}" },
          { action: "setState", key: "event", value: "{{ $event }}" },
        ],
      },
      { field: "a" },
    );
    if (typeName === "RadioGroup")
      await act(async () =>
        container.querySelectorAll<HTMLElement>('[role="radio"]')[1].click(),
      );
    else {
      await act(async () => container.querySelector("button")!.click());
      await act(async () =>
        Array.from(document.querySelectorAll<HTMLElement>('[role="option"]'))
          .find((option) => option.textContent === "b")!
          .click(),
      );
    }
    expect(state.get("field")).toBe("b");
    expect(state.get("seen")).toBe("b");
    expect(state.get("event")).toBe("b");
  },
);

it.each(["Calendar", "DatePicker"])(
  "syncs %s date selection before its existing handler",
  async (typeName) => {
    const now = new Date();
    const initial = new Date(now.getFullYear(), now.getMonth(), 1);
    const next = new Date(now.getFullYear(), now.getMonth(), 14);
    await render(
      {
        type: typeName,
        name: "field",
        onChange: [
          { action: "setState", key: "seen", value: "{{ field }}" },
          { action: "setState", key: "event", value: "{{ $event }}" },
        ],
      },
      { field: initial.toISOString() },
    );
    await act(async () => {
      await vi.dynamicImportSettled();
    });
    if (typeName === "DatePicker")
      await act(async () => container.querySelector("button")!.click());
    const day = document.querySelector<HTMLButtonElement>(
      `button[data-day="${next.toLocaleDateString()}"]`,
    )!;
    expect(day).not.toBeNull();
    await act(async () => day.click());
    expect(state.get("field")).toBe(next.toISOString());
    expect(state.get("seen")).toBe(next.toISOString());
    expect(state.get("event")).toBe(next.toISOString());
  },
);

it.each([false, true])(
  "syncs DropZone files before its handler and retains accumulation semantics (multiple:%s)",
  async (multiple) => {
    const previous = {
      name: "previous.txt",
      data: "b2xk",
      type: "text/plain",
      size: 3,
    };
    await render(
      {
        type: "DropZone",
        name: "field",
        multiple,
        onChange: [
          { action: "setState", key: "seen", value: "{{ field }}" },
          { action: "setState", key: "event", value: "{{ $event }}" },
        ],
      },
      { field: [previous] },
    );
    const input =
      container.querySelector<HTMLInputElement>('input[type="file"]')!;
    await act(async () => {
      Object.defineProperty(input, "files", {
        value: [new File(["fixture"], "fixture.txt", { type: "text/plain" })],
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));
      await vi.waitFor(() => expect(state.get("event")).toBeDefined());
    });
    const uploaded = {
      name: "fixture.txt",
      data: btoa("fixture"),
      type: "text/plain",
      size: 7,
    };
    const expected = multiple ? [previous, uploaded] : [uploaded];
    expect(state.get("field")).toEqual(expected);
    expect(state.get("seen")).toEqual(expected);
    expect(state.get("event")).toEqual([uploaded]);
  },
);
