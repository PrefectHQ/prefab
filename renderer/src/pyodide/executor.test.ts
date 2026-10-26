// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import {
  legacyThemeToCss,
  normalizeExecuteData,
  normalizeExecuteResult,
} from "./executor";

describe("Pyodide executor result normalization", () => {
  it("preserves app tools for the standalone playground", () => {
    const tools = [
      {
        name: "reset",
        inputSchema: { type: "object" },
        actions: { action: "setState", key: "count", value: 0 },
        result: { count: "{{ count }}" },
      },
    ];
    expect(
      normalizeExecuteResult({
        tree: { type: "Text", content: "hello" },
        tools,
      }),
    ).toMatchObject({ tools });
  });

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

describe("Pyodide bootstrap compatibility", () => {
  it("loads the pinned patch runtime with the previous event-loop behavior", async () => {
    const py = {
      loadPackage: vi.fn(async () => {}),
      FS: { mkdirTree: vi.fn(), writeFile: vi.fn() },
      runPythonAsync: vi.fn(async () => undefined),
    };
    const loader = vi.fn(async () => py);
    window.loadPyodide = loader;
    vi.stubGlobal("__LOCAL_BUNDLE__", true);
    const append = document.head.appendChild.bind(document.head);
    const scripts: HTMLScriptElement[] = [];
    const spy = vi
      .spyOn(document.head, "appendChild")
      .mockImplementation((node) => {
        const result = append(node);
        if (node instanceof HTMLScriptElement) {
          scripts.push(node);
          queueMicrotask(() => node.dispatchEvent(new Event("load")));
        }
        return result;
      });
    try {
      const { loadPyodideRuntime } = await import("./executor");
      const status = vi.fn();
      await expect(loadPyodideRuntime(status)).resolves.toBe(py);
      expect(scripts[0].src).toBe(
        "https://cdn.jsdelivr.net/pyodide/v0.27.8/full/pyodide.js",
      );
      expect(loader).toHaveBeenCalledWith({ enableRunUntilComplete: false });
      expect(py.loadPackage).toHaveBeenCalledWith(["pydantic"]);
      expect(py.FS.writeFile).toHaveBeenCalledWith(
        expect.stringMatching(/^\/lib\/python3\.12\/site-packages\//),
        expect.any(String),
      );
      expect(status).toHaveBeenLastCalledWith("ready");
    } finally {
      spy.mockRestore();
      scripts.forEach((script) => script.remove());
      vi.unstubAllGlobals();
    }
  });
});
