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
