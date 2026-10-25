// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { act, createElement as h, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { McpOverlayPortal } from "./overlay-portal";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { PrefabCombobox } from "./components/combobox-wrapper";
const styles = ["src/style.css", "src/style-overlays.css"]
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");

let container: HTMLDivElement;
let root: Root;
let sheet: HTMLStyleElement;

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
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  sheet = document.createElement("style");
  sheet.textContent = styles;
  document.head.append(sheet);
});

afterEach(async () => {
  await act(async () => root.unmount());
  sheet.remove();
  container.remove();
  vi.unstubAllGlobals();
});

async function render(children: ReactNode) {
  await act(async () => root.render(h(McpOverlayPortal, null, children)));
}

function expectInteractive(selector: string) {
  const host = document.querySelector("[data-prefab-overlay-portal]")!;
  const element = host.querySelector(selector)!;
  expect(element).not.toBeNull();
  expect(getComputedStyle(host).pointerEvents).toBe("none");
  expect(getComputedStyle(element).pointerEvents).toBe("auto");
}

it("keeps dialog content and backdrop interactive", async () => {
  await render(
    h(
      Dialog,
      { open: true },
      h(
        DialogContent,
        null,
        h(DialogTitle, null, "Settings"),
        h("button", null, "Save"),
      ),
    ),
  );
  expectInteractive('[data-slot="dialog-content"]');
  expectInteractive('[data-slot="dialog-overlay"]');
});

it("keeps select options interactive", async () => {
  const change = vi.fn();
  await render(
    h(
      Select,
      { open: true, onValueChange: change },
      h(SelectTrigger, null, "Choose"),
      h(SelectContent, null, h(SelectItem, { value: "a" }, "Alpha")),
    ),
  );
  expectInteractive('[data-slot="select-content"]');
  await act(async () => {
    (document.querySelector('[role="option"]') as HTMLElement).click();
  });
  expect(change).toHaveBeenCalledWith("a");
});

it("keeps combobox options interactive", async () => {
  const change = vi.fn();
  await render(
    h(PrefabCombobox, {
      _items: [{ value: "a", label: "Alpha" }],
      onValueChange: change,
    }),
  );
  await act(async () => {
    (container.querySelector("button") as HTMLElement).click();
  });
  expectInteractive(".pf-combobox-content");
  await act(async () => {
    (document.querySelector('[role="option"]') as HTMLElement).click();
  });
  expect(change).toHaveBeenCalledWith("a");
});
