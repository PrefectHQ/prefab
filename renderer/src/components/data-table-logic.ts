/**
 * Pure logic for DataTable behaviors — sorting, filtering, row selection.
 * Extracted for testability.
 */

/**
 * Global filter function for DataTable rows.
 * Matches if any non-internal column value contains the filter string.
 */
export function globalFilter(
  row: { getValue: (id: string) => unknown },
  columnId: string,
  filterValue: string,
): boolean {
  if (columnId === "_expand" || columnId === "_detail") return false;
  const value = row.getValue(columnId);
  if (value == null) return false;
  return String(value).toLowerCase().includes(filterValue.toLowerCase());
}

/**
 * Compute next sort state on header click.
 * Cycles: unsorted → asc → desc → unsorted.
 */
export function nextSortAction(
  current: false | "asc" | "desc",
): "asc" | "desc" | "clear" {
  if (current === false) return "asc";
  if (current === "asc") return "desc";
  return "clear";
}

/** Maps a text-alignment utility to the matching flex justification. */
const ALIGN_TO_JUSTIFY: Record<string, string> = {
  "text-right": "justify-end",
  "text-center": "justify-center",
  "text-left": "justify-start",
};

/**
 * Class string for a sortable column header's clickable button.
 *
 * A sortable header is a `flex` button (label + sort icon) nested
 * inside the `<th>`. A bare flex button shrinks to its content and
 * sits at the start of the cell, so `text-right`/`text-center` on the
 * `<th>` (set by a column's `align`) has nothing to act on — the
 * header label stays left while the column's values are aligned
 * elsewhere.
 *
 * When the column's `headerClass` carries a text-alignment utility,
 * the button is made `w-full` and its flex content justified to
 * match, so the header label tracks the column's `align` setting.
 *
 * `headerClass` is free-form, user-supplied Tailwind, so this matches
 * **exact, whole tokens** and **preserves any variant prefix**:
 * `sm:text-right` yields `sm:w-full sm:justify-end`, keeping the
 * alignment responsive instead of forcing it at every breakpoint.
 * A bare `text-*` token contributes the unprefixed pair.
 */
export function sortableHeaderClass(headerClass?: string): string {
  const base = "flex items-center gap-1 hover:text-foreground";
  if (!headerClass) return base;

  const extra: string[] = [];
  for (const token of headerClass.split(/\s+/)) {
    if (!token) continue;
    // Split a variant chain (e.g. "sm:dark:") from its final utility.
    const lastColon = token.lastIndexOf(":");
    const prefix = lastColon === -1 ? "" : token.slice(0, lastColon + 1);
    const utility = lastColon === -1 ? token : token.slice(lastColon + 1);
    const justify = ALIGN_TO_JUSTIFY[utility];
    if (justify) {
      extra.push(`${prefix}w-full`, `${prefix}${justify}`);
    }
  }

  return extra.length > 0 ? `${base} ${extra.join(" ")}` : base;
}

/**
 * Compute next row selection state on click.
 * Returns the new selected row ID (null to deselect).
 */
export function toggleRowSelection(
  clickedRowId: string | null,
  rowId: string,
): { selectedId: string | null; shouldFireAction: boolean } {
  const deselecting = clickedRowId === rowId;
  return {
    selectedId: deselecting ? null : rowId,
    shouldFireAction: !deselecting,
  };
}
