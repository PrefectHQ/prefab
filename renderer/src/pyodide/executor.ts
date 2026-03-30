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

/** Debug callback — set by the bridge to route messages to the UI. */
let debugFn: ((msg: string) => void) | null = null;
export function setExecutorDebug(fn: (msg: string) => void) {
  debugFn = fn;
}
function log(msg: string) {
  if (debugFn) debugFn(msg);
  console.log(`[Pyodide] ${msg}`);
}

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

    log("Loading script from CDN...");
    await loadScript(PYODIDE_CDN);
    log("Script loaded, initializing...");
    const py = await window.loadPyodide();
    log("Initialized, loading pydantic...");

    // Pydantic must come from Pyodide's built-in packages (WASM build)
    // because pydantic-core is a Rust extension with no WASM wheel on PyPI.
    await py.loadPackage(["pydantic"]);
    log("Pydantic loaded, installing prefab...");

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
      log("Prefab mounted from bundle");
    } else {
      // Fallback: install prefab-ui from PyPI, skipping deps since
      // pydantic is already loaded from Pyodide's built-in packages.
      log("Loading micropip...");
      await py.loadPackage(["micropip"]);
      log("Installing prefab-ui from PyPI...");
      await py.runPythonAsync(`
import micropip
await micropip.install("prefab-ui", deps=False)
`);
      log("Prefab installed from PyPI");
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
from prefab_ui.components.base import _component_stack, Component as _C, ContainerComponent as _CC
from prefab_ui.app import PrefabApp as _PA

# Reset the component stack
_component_stack.set(None)

# Track PrefabApp instances (may not be assigned to a variable)
_pg_app_instances = []
_pg_real_app_init = _PA.__init__
def _pg_app_init(self, /, **data):
    _pg_real_app_init(self, **data)
    _pg_app_instances.append(self)
_PA.__init__ = _pg_app_init

# Track all Component instances created during execution
_pg_all_instances = []
_pg_real_comp_init = _C.__init__
def _pg_comp_init(self, /, **kwargs):
    _pg_real_comp_init(self, **kwargs)
    _pg_all_instances.append(self)
_C.__init__ = _pg_comp_init

try:
    # Heal partial code: strip trailing lines until it compiles.
    # Fast path: reuse a previously valid floor line count when the
    # code prefix up to that floor is unchanged.
    # Fallback: if that fails (or prefix changed), do a full scan.
    _pg_code = ${JSON.stringify(code)}
    _pg_lines = _pg_code.split("\\n")
    _pg_healed = None
    _pg_floor = globals().get("_pg_seen_lines", 0)
    _pg_prev_lines = globals().get("_pg_prev_lines", [])

    if _pg_floor > len(_pg_lines):
        _pg_floor = 0
    elif _pg_floor > 0:
        if len(_pg_prev_lines) < _pg_floor or _pg_prev_lines[:_pg_floor] != _pg_lines[:_pg_floor]:
            _pg_floor = 0

    # Try from current length down to floor (inclusive) first.
    _pg_min = _pg_floor if _pg_floor > 0 else 1
    for _pg_n in range(len(_pg_lines), _pg_min - 1, -1):
        _pg_try = "\\n".join(_pg_lines[:_pg_n])
        try:
            compile(_pg_try, "<string>", "exec")
            _pg_healed = _pg_try
            _pg_seen_lines = _pg_n
            break
        except SyntaxError:
            continue

    # If fast path fails, fall back to full scan.
    if _pg_healed is None:
        for _pg_n in range(len(_pg_lines), 0, -1):
            _pg_try = "\\n".join(_pg_lines[:_pg_n])
            try:
                compile(_pg_try, "<string>", "exec")
                _pg_healed = _pg_try
                _pg_seen_lines = _pg_n
                break
            except SyntaxError:
                continue

    if _pg_healed is None:
        # No compilable prefix found (e.g. first line is mid-edit).
        # Raise the real syntax error from the current code so the UI
        # shows a useful line/message instead of a generic healer error.
        compile(_pg_code, "<string>", "exec")
        raise SyntaxError("Could not heal partial code")

    _pg_prev_lines = _pg_lines

    # Execute in a fresh namespace
    _pg_ns = {}
    exec(_pg_healed, _pg_ns)

    # Find result: prefer PrefabApp, then root components
    _pg_apps = _pg_app_instances or [v for k, v in _pg_ns.items() if not k.startswith("_") and isinstance(v, _PA)]
    _pg_comps = _pg_all_instances

    # Filter to roots — components not children of any container
    _pg_all_children = set()
    for _c in _pg_comps:
        if isinstance(_c, _CC):
            for _ch in _c.children:
                _pg_all_children.add(id(_ch))
    _pg_roots = [_c for _c in _pg_comps if id(_c) not in _pg_all_children]

    _pg_target = _pg_apps[-1] if _pg_apps else (_pg_roots[-1] if _pg_roots else None)

    if _pg_target is None:
        raise ValueError("No components created")

    # Always wrap in PrefabApp so the result gets default padding, theme, etc.
    if not isinstance(_pg_target, _PA):
        _pg_target = _PA(view=_pg_target)

    _pg_wire = _pg_target.to_json()
    _pg_result = {"tree": _pg_wire.get("view")}
    if _pg_wire.get("state"):
        _pg_result["state"] = _pg_wire["state"]
    if _pg_wire.get("theme"):
        _pg_result["theme"] = _pg_wire["theme"]

    _pg_json_result = _json.dumps(_pg_result)
finally:
    _PA.__init__ = _pg_real_app_init
    _C.__init__ = _pg_real_comp_init

_pg_json_result
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
