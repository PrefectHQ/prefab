/**
 * Auto-naming for stateful components.
 *
 * When a stateful component (Input, Slider, Checkbox, etc.) appears in the
 * JSON tree without a `name` prop, the renderer assigns one automatically.
 * This mirrors Python's eager name generation so protocol/JSON authors
 * don't need to supply names manually.
 */

/**
 * Stateful component types that get auto-generated names when `name` is
 * missing.  Mirrors the Python `StatefulMixin` subclass list.
 */
export const STATEFUL_TYPES = new Set([
  "Input",
  "Textarea",
  "Checkbox",
  "Switch",
  "Slider",
  "Calendar",
  "DatePicker",
  "DropZone",
  "Select",
  "RadioGroup",
  "Combobox",
  "Tabs",
  "Pages",
]);

/** Counter for auto-generated component names, reset per RenderTree call. */
let _autoNameCounter = 0;

/**
 * Reset the auto-name counter. Called at the start of each RenderTree pass.
 */
export function resetAutoNameCounter(): void {
  _autoNameCounter = 0;
}

/**
 * Auto-assign a name to a stateful component if it doesn't already have one.
 * Mutates `props` in place and returns the (possibly generated) name.
 * Returns `undefined` for non-stateful types or when a name already exists.
 */
export function autoAssignName(
  type: string,
  props: Record<string, unknown>,
): string | undefined {
  if (STATEFUL_TYPES.has(type) && !("name" in props)) {
    const name = `${type.toLowerCase()}-${++_autoNameCounter}`;
    props.name = name;
    return name;
  }
  return undefined;
}
