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

const SORTABLE_HEADER_ALIGN_CLASSES = {
  "text-left": ["w-full", "justify-start", "flex-row"],
  "text-center": ["w-full", "justify-center", "flex-row"],
  "text-right": ["w-full", "justify-start", "flex-row-reverse"],
};

/**
 * Convert text alignment classes from the header cell into flex layout classes
 * for the sortable header button.
 */
export function sortableHeaderButtonClass(headerClass?: string): string {
  if (!headerClass) return "";

  const classes: string[] = [];
  for (const token of headerClass.split(/\s+/)) {
    if (!token) continue;

    const separatorIndex = token.lastIndexOf(":");
    const prefix =
      separatorIndex === -1 ? "" : `${token.slice(0, separatorIndex)}:`;
    const base =
      separatorIndex === -1 ? token : token.slice(separatorIndex + 1);
    const alignClasses =
      SORTABLE_HEADER_ALIGN_CLASSES[
        base as keyof typeof SORTABLE_HEADER_ALIGN_CLASSES
      ];

    if (alignClasses) {
      classes.push(...alignClasses.map((className) => `${prefix}${className}`));
    }
  }

  return Array.from(new Set(classes)).join(" ");
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
