// @vitest-environment jsdom
import { expect, it, vi } from "vitest";
import { createShadowSurface } from "./shadow-surface";
import { toSurfaceCss } from "./shadow-surface-styles";
vi.mock("./index.css?inline", () => ({
  default: ":root { --background: white; }",
}));
vi.mock("sonner/dist/styles.css?inline", () => ({
  default: "[data-sonner-toast] { color: red; }",
}));

it("updates CSS and links in both stable roots without touching the document", () => {
  const host = document.createElement("div");
  document.body.append(host);
  const unrelated = document.createElement("style");
  unrelated.textContent = ".external { color: red; }";
  document.head.append(unrelated);
  const surface = createShadowSurface(host, "playground");
  try {
    const mount = surface.mount;
    const portal = surface.portal;
    surface.setAssets(
      [
        ":root { --primary: red; }",
        ".pf-popover-content { border-width: 7px; }",
      ],
      ["https://example.com/font.css"],
    );
    for (const root of [host.shadowRoot!, portal.getRootNode() as ShadowRoot]) {
      expect(
        root.querySelectorAll("style[data-prefab-shadow-css]"),
      ).toHaveLength(2);
      expect(root.querySelector("link")?.getAttribute("href")).toBe(
        "https://example.com/font.css",
      );
      expect(root.textContent).toContain(":host { --primary: red; }");
      expect(root.textContent).toContain(
        ".pf-popover-content { border-width: 7px; }",
      );
      expect(root.textContent).toContain("data-sonner-toast");
    }
    surface.setDark(true);
    expect(host.classList.contains("dark")).toBe(false);
    expect(
      (portal.getRootNode() as ShadowRoot).host.classList.contains("dark"),
    ).toBe(false);
    expect(host.hasAttribute("data-prefab-dark")).toBe(true);
    expect(
      (portal.getRootNode() as ShadowRoot).host.hasAttribute(
        "data-prefab-dark",
      ),
    ).toBe(true);
    surface.setAssets([":root { --primary: blue; }"], []);
    expect(surface.mount).toBe(mount);
    expect(surface.portal).toBe(portal);
    for (const root of [host.shadowRoot!, portal.getRootNode() as ShadowRoot]) {
      expect(
        root.querySelectorAll("style[data-prefab-shadow-css]"),
      ).toHaveLength(1);
      expect(root.querySelector("link")).toBeNull();
      expect(root.textContent).not.toContain("--primary: red");
    }
    expect(document.head.contains(unrelated)).toBe(true);
    expect(document.head.querySelector("[data-prefab-shadow-css]")).toBeNull();
  } finally {
    surface.dispose();
    expect(
      document.querySelector("[data-prefab-shadow-portal-host]"),
    ).toBeNull();
    expect(host.hasAttribute("data-prefab-dark")).toBe(false);
    host.remove();
    unrelated.remove();
  }
});

it("supports setup/cleanup replay and independent ownership even with duplicate host ids", () => {
  const first = document.createElement("div");
  const second = document.createElement("div");
  first.id = second.id = "duplicate";
  document.body.append(first, second);
  const a = createShadowSurface(first, "docs");
  const b = createShadowSurface(second, "docs");
  a.dispose();
  expect(b.portal.isConnected).toBe(true);
  const replay = createShadowSurface(first, "docs");
  expect(
    first.shadowRoot!.querySelectorAll("[data-prefab-mount]"),
  ).toHaveLength(1);
  replay.dispose();
  b.dispose();
  first.remove();
  second.remove();
});

it("adapts each known dark selector without exposing a document dark class", () => {
  const css = toSurfaceCss(
    ":root { --x: 1; } .dark { --x: 2; } .dark .pf-button { color: red; }",
  );
  expect(css).not.toContain(":host(.dark)");
  expect(css.match(/data-prefab-dark/g)).toHaveLength(2);
  expect(css).toContain(".pf-button { color: red; }");
});
