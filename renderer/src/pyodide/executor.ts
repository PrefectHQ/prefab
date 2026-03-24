/**
 * Shared Pyodide executor — loads Pyodide and executes Prefab Python code.
 *
 * Used by both the playground and the generative renderer. Handles:
 * - Lazy Pyodide loading from CDN
 * - Pydantic installation from Pyodide's built-in WASM packages
 * - Prefab source mounting (from bundled JSON or PyPI fallback)
 * - Code execution with component stack reset and root detection
 * - Error extraction with Python traceback formatting
 */

import type { ComponentNode } from "../renderer";

declare const __LOCAL_BUNDLE__: boolean;

declare global {
  interface Window {
    loadPyodide: () => Promise<PyodideInterface>;
  }
}

export interface PyodideInterface {
  loadPackage: (packages: string[]) => Promise<void>;
  FS: {
    mkdirTree: (path: string) => void;
    writeFile: (path: string, data: string) => void;
  };
  runPythonAsync: (code: string) => Promise<unknown>;
}

export type PyodideStatus = "idle" | "loading" | "ready" | "error";

let pyodide: PyodideInterface | null = null;
let loadPromise: Promise<PyodideInterface> | null = null;

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.27.4/full/pyodide.js";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

/**
 * Load and initialize Pyodide. Safe to call multiple times — only
 * loads once. Reports status changes via the callback.
 */
export function loadPyodideRuntime(
  onStatus: (status: PyodideStatus) => void,
): Promise<PyodideInterface> {
  if (pyodide) return Promise.resolve(pyodide);
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    onStatus("loading");

    await loadScript(PYODIDE_CDN);
    const py = await window.loadPyodide();

    // Pydantic must come from Pyodide's built-in packages (WASM build)
    // because pydantic-core is a Rust extension with no WASM wheel on PyPI.
    await py.loadPackage(["pydantic"]);

    if (typeof __LOCAL_BUNDLE__ !== "undefined" && __LOCAL_BUNDLE__) {
      // Bundle build: write bundled source to Pyodide FS.
      const { default: BUNDLE } = await import("../playground/bundle.json");
      const bundle = BUNDLE as Record<string, string>;
      const dirs = new Set<string>();
      for (const modulePath of Object.keys(bundle)) {
        const dir = modulePath.substring(0, modulePath.lastIndexOf("/"));
        if (dir && !dirs.has(dir)) {
          py.FS.mkdirTree(`/lib/python3.12/site-packages/${dir}`);
          dirs.add(dir);
        }
      }
      for (const [modulePath, source] of Object.entries(bundle)) {
        py.FS.writeFile(`/lib/python3.12/site-packages/${modulePath}`, source);
      }
    } else {
      // Fallback: install prefab-ui from PyPI, skipping deps since
      // pydantic is already loaded from Pyodide's built-in packages.
      await py.loadPackage(["micropip"]);
      await py.runPythonAsync(`
import micropip
await micropip.install("prefab-ui", deps=False)
`);
    }

    pyodide = py;
    onStatus("ready");
    return py;
  })().catch((err) => {
    loadPromise = null;
    onStatus("error");
    throw err;
  });

  return loadPromise;
}

export interface ExecuteResult {
  tree?: ComponentNode;
  state?: Record<string, unknown>;
  theme?: { light: string; dark: string; css: string; mode?: string };
  /** Short summary (last line + line number). */
  error?: string;
  /** Full Python traceback for expandable details. */
  errorDetail?: string;
}

/**
 * Execute Python code and return the component JSON tree.
 *
 * Wraps user code in a harness that:
 * 1. Resets the component stack
 * 2. Tracks created components and PrefabApp instances
 * 3. Finds the root component or PrefabApp
 * 4. Calls to_json() to extract the wire format
 */
export async function executePrefabCode(code: string): Promise<ExecuteResult> {
  if (!pyodide) {
    return { error: "Pyodide not loaded" };
  }

  const harness = `
import json as _json
from prefab_ui.components.base import _component_stack, ContainerComponent

# Reset the component stack
_component_stack.set(None)

# State capture (monkey-patched so importing from prefab_ui.app gets this version)
_pg_state = {}

def set_initial_state(**kwargs):
    _pg_state.update(kwargs)

import prefab_ui.app as _pg_app
_pg_app.set_initial_state = set_initial_state

# Track all created components and PrefabApp instances, with creation order
_pg_created = []
_pg_apps = []
_pg_order: dict = {}
_pg_counter = [0]
from prefab_ui.components.base import Component as _PgComponent
from prefab_ui.app import PrefabApp as _PrefabApp
_pg_real_post_init = _PgComponent.model_post_init

def _pg_tracking_post_init(self, ctx):
    _pg_real_post_init(self, ctx)
    _pg_created.append(self)
    _pg_order[id(self)] = _pg_counter[0]
    _pg_counter[0] += 1

_PgComponent.model_post_init = _pg_tracking_post_init

# Pydantic v2's Rust validator caches model_post_init at class creation,
# so patching it on PrefabApp has no effect. Patch __init__ instead.
_pg_real_app_init = _PrefabApp.__init__

def _pg_app_tracking_init(self, /, **data):
    _pg_real_app_init(self, **data)
    _pg_apps.append(self)
    _pg_order[id(self)] = _pg_counter[0]
    _pg_counter[0] += 1

_PrefabApp.__init__ = _pg_app_tracking_init

globals().pop("main", None)
try:
    exec(${JSON.stringify(code)})
finally:
    _PgComponent.model_post_init = _pg_real_post_init
    _PrefabApp.__init__ = _pg_real_app_init

# Find root components (not children of any container, Text, or DataTable row)
from prefab_ui.components.data_table import DataTable as _PgDataTable
from prefab_ui.components.text import Text as _PgText
_pg_all_children = set()
for _c in _pg_created:
    if isinstance(_c, ContainerComponent):
        for _ch in _c.children:
            _pg_all_children.add(id(_ch))
    if isinstance(_c, _PgText) and _c.children:
        for _ch in _c.children:
            _pg_all_children.add(id(_ch))
    if isinstance(_c, _PgDataTable) and isinstance(_c.rows, list):
        for _row in _c.rows:
            if isinstance(_row, dict):
                for _v in _row.values():
                    if isinstance(_v, _PgComponent):
                        _pg_all_children.add(id(_v))

_pg_roots = [_c for _c in _pg_created if id(_c) not in _pg_all_children]

# If main() is defined, call it — the return value is the render target.
# Otherwise pick whichever was created LAST: a root component or a PrefabApp.
_pg_main = globals().get("main")
if callable(_pg_main):
    _pg_target = _pg_main()
else:
    _pg_candidates = _pg_roots + _pg_apps
    _pg_candidates.sort(key=lambda _c: _pg_order.get(id(_c), -1))
    _pg_target = _pg_candidates[-1] if _pg_candidates else None

if _pg_target is None:
    raise ValueError("No components created")

if isinstance(_pg_target, _PrefabApp):
    _pg_wire = _pg_target.to_json()
    _pg_tree = _pg_wire.get("view")
    _pg_result = {"tree": _pg_tree}
    if _pg_wire.get("state"):
        _pg_result["state"] = _pg_wire["state"]
    elif _pg_state:
        _pg_result["state"] = _pg_state
    if "theme" in _pg_wire:
        _pg_result["theme"] = _pg_wire["theme"]
else:
    _pg_result = {"tree": _pg_target.to_json()}
    if _pg_state:
        _pg_result["state"] = _pg_state

_json.dumps(_pg_result)
`;

  try {
    const resultStr = (await pyodide.runPythonAsync(harness)) as string;
    const result = JSON.parse(resultStr);
    return {
      tree: result.tree as ComponentNode,
      state: result.state ?? {},
      theme: result.theme,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const allLines = message.split("\n");

    // Extract the Python traceback portion
    const pyStart = allLines.findIndex((l) =>
      l.trimStart().startsWith("Traceback"),
    );
    const pyTrace = pyStart >= 0 ? allLines.slice(pyStart).join("\n") : message;

    // Short summary: last non-empty line + line number from user code
    const nonEmpty = allLines.filter((l) => l.trim());
    const short = nonEmpty[nonEmpty.length - 1] || message;
    const lineMatch = message.match(/File "<string>", line (\d+)/g);
    const lastRef = lineMatch ? lineMatch[lineMatch.length - 1] : null;
    const lineNum = lastRef ? lastRef.match(/line (\d+)/)?.[1] : null;
    const summary = lineNum ? `Line ${lineNum}: ${short}` : short;

    return { error: summary, errorDetail: pyTrace };
  }
}
