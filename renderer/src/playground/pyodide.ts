/**
 * Re-exports from the shared Pyodide executor for playground use.
 *
 * The actual implementation lives in `../pyodide/executor.ts` and is
 * shared with the generative renderer.
 */

export {
  loadPyodideRuntime,
  executePrefabCode as executePython,
  type ExecuteResult,
  type PyodideStatus,
} from "../pyodide/executor";
