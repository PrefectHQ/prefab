import { describe, expect, it } from "vitest";
import {
  legacyThemeToCss,
  normalizeExecuteData,
  normalizeExecuteResult,
} from "./executor";

describe("Pyodide executor result normalization", () => {
  it("maps legacy theme wire data to CSS and mode", () => {
    const result = normalizeExecuteResult({
      tree: { type: "Text", text: "Hello" },
      theme: {
        light: "--background: white;",
        dark: "--background: black;",
        css: "@import url('https://example.com/font.css');\nbody { font-family: Inter; }",
        mode: "dark",
      },
    });

    expect(result.css).toEqual([
      "@import url('https://example.com/font.css');\n:root {\n  --background: white;\n}\n.dark {\n  --background: black;\n}\nbody { font-family: Inter; }\n",
    ]);
    expect(result.mode).toBe("dark");
  });

  it("prefers protocol CSS over legacy theme CSS", () => {
    const result = normalizeExecuteResult({
      tree: { type: "Text", text: "Hello" },
      css: [":root { --background: white; }"],
      theme: { light: "--background: black;" },
    });

    expect(result.css).toEqual([":root { --background: white; }"]);
  });

  it("drops invalid legacy theme modes", () => {
    expect(
      legacyThemeToCss({ light: "--background: white;", mode: "system" }).mode,
    ).toBeUndefined();
  });
});

describe("Pyodide executor data normalization", () => {
  it("preserves object data for injection as Python globals", () => {
    expect(normalizeExecuteData({ devices: [1, 2, 3] })).toEqual({
      devices: [1, 2, 3],
    });
  });

  it("parses JSON string data", () => {
    expect(normalizeExecuteData('{"devices":[1,2,3]}')).toEqual({
      devices: [1, 2, 3],
    });
  });

  it("ignores incomplete JSON string data during streaming", () => {
    expect(normalizeExecuteData('{"devices":[')).toEqual({});
  });
});
