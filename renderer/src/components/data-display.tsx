/**
 * Data display components — DataTable wrapper around @tanstack/react-table.
 *
 * Renders a flat columns + rows API with optional sorting, filtering,
 * and pagination using shadcn Table primitives.
 */

import { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useRenderNode, isComponentNode } from "../render-context";

interface DataTableColumnSpec {
  key: string;
  header: string;
  sortable?: boolean;
}

interface DataTableProps {
  columns: DataTableColumnSpec[];
  rows: Record<string, unknown>[];
  searchable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  selectable?: boolean;
  onSelect?: (selectedIndices: number[]) => void;
  className?: string;
}

export function PrefabDataTable({
  columns: columnSpecs,
  rows,
  searchable = false,
  paginated = false,
  pageSize = 10,
  selectable = false,
  onSelect,
  className,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const renderNode = useRenderNode();

  // Fire onSelect when selection changes, passing original row indices
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const prevSelectionRef = useRef<RowSelectionState>({});
  useEffect(() => {
    if (!selectable || !onSelectRef.current) return;
    // Skip the initial mount (no selection yet)
    if (rowSelection === prevSelectionRef.current) return;
    prevSelectionRef.current = rowSelection;
    const selectedIndices = Object.keys(rowSelection)
      .filter((k) => rowSelection[k])
      .map(Number);
    onSelectRef.current(selectedIndices);
  }, [rowSelection, selectable]);

  // Build @tanstack/react-table column defs from our flat spec
  const selectionColumn = useMemo<ColumnDef<Record<string, unknown>>>(
    () => ({
      id: "_select",
      header: ({ table }) => {
        const allSelected = table.getIsAllPageRowsSelected();
        const someSelected = table.getIsSomePageRowsSelected();
        return (
          <input
            type="checkbox"
            className="size-4 cursor-pointer accent-primary"
            checked={allSelected}
            ref={(el) => {
              if (el) el.indeterminate = !allSelected && someSelected;
            }}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="size-4 cursor-pointer accent-primary"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          aria-label="Select row"
        />
      ),
      size: 40,
    }),
    [],
  );

  const dataColumns = useMemo<ColumnDef<Record<string, unknown>>[]>(
    () =>
      columnSpecs.map((spec) => ({
        accessorKey: spec.key,
        header: ({ column }) => {
          if (spec.sortable) {
            return (
              <button
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                {spec.header}
                {column.getIsSorted() === "asc" ? (
                  <span className="text-xs">▲</span>
                ) : column.getIsSorted() === "desc" ? (
                  <span className="text-xs">▼</span>
                ) : (
                  <span className="text-xs text-muted-foreground/50">⇅</span>
                )}
              </button>
            );
          }
          return spec.header;
        },
        cell: ({ getValue }) => {
          const value = getValue();
          if (renderNode && isComponentNode(value)) {
            return renderNode(value);
          }
          return value != null ? String(value) : "";
        },
      })),
    [columnSpecs, renderNode],
  );

  const columns = useMemo(
    () => (selectable ? [selectionColumn, ...dataColumns] : dataColumns),
    [selectable, selectionColumn, dataColumns],
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: selectable,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: searchable ? getFilteredRowModel() : undefined,
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    initialState: paginated ? { pagination: { pageSize } } : undefined,
  });

  const colCount = columns.length;

  return (
    <div className={cn("w-full min-w-0", className)}>
      {searchable && (
        <div className="mb-4">
          <Input
            placeholder="Filter..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {/* Pad short pages with empty rows so auto-resize stays stable */}
              {paginated &&
                table.getRowModel().rows.length < pageSize &&
                Array.from({
                  length: pageSize - table.getRowModel().rows.length,
                }).map((_, i) => (
                  <TableRow key={`pad-${i}`} className="border-transparent">
                    <TableCell colSpan={colCount}>&nbsp;</TableCell>
                  </TableRow>
                ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={colCount} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {paginated && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
