/**
 * Pyodide sandbox runner — executes untrusted Prefab code in WASM.
 *
 * Protocol (JSON lines over stdin/stdout):
 *   Request:  {"code": "...", "data": {"key": "value"}}
 *   Response: {"result": <PrefabApp JSON>} or {"error": "..."}
 *
 * The process stays warm between requests. Prefab is pre-loaded
 * from source files mounted into Pyodide's virtual filesystem.
 *
 * Security: Code runs inside Pyodide's WASM sandbox. The Deno process
 * has --allow-read (to load source) and --allow-net (for Pyodide CDN
 * on first run). No write, env, or FFI access.
 */

import { loadPyodide } from "npm:pyodide@0.27.4";
import { readLines } from "https://deno.land/std@0.224.0/io/read_lines.ts";
import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts";

// Suppress Pyodide's loadPackage logs from polluting stdout
const realLog = console.log;
console.log = (...args) => console.error("[pyodide]", ...args);

const pyodide = await loadPyodide();
await pyodide.loadPackage(["pydantic"]);

console.log = realLog;

// Mount Prefab source into Pyodide's virtual filesystem.
// The path is passed as the first CLI argument.
const prefabSrc = Deno.args[0];
if (!prefabSrc) {
  console.error("Usage: runner.js <path-to-prefab_ui-source>");
  Deno.exit(1);
}

const sitePackages = "/lib/python3.12/site-packages";
const createdDirs = new Set();

for await (const entry of walk(prefabSrc, { exts: [".py"] })) {
  if (!entry.isFile) continue;
  const relPath = entry.path.slice(prefabSrc.length).replaceAll("\\", "/");
  const target = `${sitePackages}/prefab_ui${relPath}`;
  const dir = target.slice(0, target.lastIndexOf("/"));
  if (!createdDirs.has(dir)) {
    pyodide.FS.mkdirTree(dir);
    createdDirs.add(dir);
  }
  pyodide.FS.writeFile(target, await Deno.readTextFile(entry.path));
}

// Verify Prefab loads
await pyodide.runPythonAsync("import prefab_ui");

console.error("pyodide:ready");

// ── Harness ─────────────────────────────────────────────────────────

const HARNESS = `
import json as _json
from prefab_ui.components.base import _component_stack
from prefab_ui.components.base import Component as _C, ContainerComponent as _CC
from prefab_ui.app import PrefabApp as _PA

def _execute_prefab(_code, _data):
    # Reset component stack between executions
    _component_stack.set(None)

    # Fresh namespace with injected data
    _ns = dict(_data)
    exec(_code, _ns)

    # Find result: prefer PrefabApp, then root components
    _apps = [v for k, v in _ns.items() if not k.startswith('_') and isinstance(v, _PA)]
    _comps = [v for k, v in _ns.items() if not k.startswith('_') and isinstance(v, _C)]

    # Filter to roots — components not children of any container
    _all_children = set()
    for _c in _comps:
        if isinstance(_c, _CC):
            for _ch in _c.children:
                _all_children.add(id(_ch))
    _roots = [_c for _c in _comps if id(_c) not in _all_children]

    _target = _apps[-1] if _apps else (_roots[-1] if _roots else None)

    if _target is None:
        raise ValueError("Code must assign a PrefabApp or Component to a variable")

    if isinstance(_target, _PA):
        return _target.to_json()
    return {"$prefab": {"version": "0.2"}, "view": _target.to_json()}
`;

await pyodide.runPythonAsync(HARNESS);

// ── Request loop ────────────────────────────────────────────────────

for await (const line of readLines(Deno.stdin)) {
  if (!line.trim()) continue;

  try {
    const { code, data } = JSON.parse(line);
    const resultStr = await pyodide.runPythonAsync(
      `_json.dumps({"result": _execute_prefab(${JSON.stringify(
        code,
      )}, _json.loads(${JSON.stringify(JSON.stringify(data || {}))}))})`,
    );
    realLog(resultStr);
  } catch (err) {
    const msg = String(err.message || err);
    const lines = msg.split("\n").filter((l) => l.trim());
    const short = lines[lines.length - 1] || msg;
    realLog(JSON.stringify({ error: short }));
  }
}
