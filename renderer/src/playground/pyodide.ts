/**
 * Lazy Pyodide loader and Python executor for the playground.
 *
 * Loads Pyodide from CDN on first use, then installs prefab-ui directly
 * from PyPI via micropip, then executes user code and extracts the
 * component JSON via to_json().
 */

import type { ComponentNode } from "../renderer";

declare const __LOCAL_BUNDLE__: boolean;

declare global {
  interface Window {
    loadPyodide: () => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  loadPackage: (packages: string[]) => Promise<void>;
  FS: {
    mkdirTree: (path: string) => void;
    writeFile: (path: string, data: string) => void;
  };
  runPythonAsync: (code: string) => Promise<unknown>;
}

type PyodideStatus = "idle" | "loading" | "ready" | "error";

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

    const isLocal =
      location.hostname === "localhost" || location.hostname === "127.0.0.1";

    if (__LOCAL_BUNDLE__ && isLocal) {
      // Local dev build: write the bundled source tree to the Pyodide FS so
      // the playground reflects local code changes without a PyPI publish.
      const { default: BUNDLE } = await import("./bundle.json");
      const bundle = BUNDLE as Record<string, string>;
      await py.loadPackage(["pydantic"]);
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
      await py.loadPackage(["micropip"]);
      await py.runPythonAsync(`
import micropip
await micropip.install("prefab-ui")
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
  error?: string;
}

/**
 * Execute Python code and return the component JSON tree.
 *
 * Wraps user code in a harness that:
 * 1. Resets the component stack
 * 2. Creates a root Div context
 * 3. Executes user code inside it
 * 4. Calls to_json() on the root to extract the tree
 */
export async function executePython(code: string): Promise<ExecuteResult> {
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

# Track all created components
_pg_created = []
from prefab_ui.components.base import Component as _PgComponent
_pg_real_post_init = _PgComponent.model_post_init

def _pg_tracking_post_init(self, ctx):
    _pg_real_post_init(self, ctx)
    _pg_created.append(self)

_PgComponent.model_post_init = _pg_tracking_post_init

try:
    exec(${JSON.stringify(code)})
finally:
    _PgComponent.model_post_init = _pg_real_post_init

# Find root components (not children of any container)
_pg_all_children = set()
for _c in _pg_created:
    if isinstance(_c, ContainerComponent):
        for _ch in _c.children:
            _pg_all_children.add(id(_ch))

_pg_roots = [_c for _c in _pg_created if id(_c) not in _pg_all_children]

if not _pg_roots:
    raise ValueError("No components created")

_pg_tree = _pg_roots[0].to_json() if len(_pg_roots) == 1 else {
    "type": "Column",
    "children": [r.to_json() for r in _pg_roots],
}

_pg_result = {"tree": _pg_tree}
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
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    // Extract the last line of Python tracebacks for a cleaner message
    const lines = message.split("\n").filter((l) => l.trim());
    const short = lines[lines.length - 1] || message;
    return { error: short };
  }
}
