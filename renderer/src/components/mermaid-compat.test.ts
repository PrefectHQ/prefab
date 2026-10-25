// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it } from "vitest";
import mermaid from "mermaid";

const bounds = Object.getOwnPropertyDescriptor(SVGElement.prototype, "getBBox");

beforeEach(() => {
  Object.defineProperty(SVGElement.prototype, "getBBox", {
    configurable: true,
    value: () => ({ x: 0, y: 0, width: 100, height: 20 }),
  });
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "default",
  });
});

afterEach(() => {
  if (bounds) Object.defineProperty(SVGElement.prototype, "getBBox", bounds);
  else Reflect.deleteProperty(SVGElement.prototype, "getBBox");
});

it("renders ordinary and mathematical flowchart labels with patched KaTeX", async () => {
  const { svg } = await mermaid.render(
    "compat-math",
    'flowchart TD\nA["$$E=mc^2$$"] --> B["Ordinary label"]',
  );
  expect(svg).toContain("Ordinary label");
  expect(svg).toContain("katex");
  expect(svg).toContain("flowchart");
  document.getElementById("compat-math")?.remove();
});
