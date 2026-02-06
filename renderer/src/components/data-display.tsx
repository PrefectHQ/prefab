/**
 * Data display components — DataTable wrapper around @tanstack/react-table.
 *
 * Renders a flat columns + rows API with optional sorting, filtering,
 * and pagination using shadcn Table primitives.
 */

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/ui/table";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

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
  caption?: string;
  className?: string;
}

export function PrefabDataTable({
  columns: columnSpecs,
  rows,
  searchable = false,
  paginated = false,
  pageSize = 10,
  caption,
  className,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Build @tanstack/react-table column defs from our flat spec
  const columns = useMemo<ColumnDef<Record<string, unknown>>[]>(
    () =>
      columnSpecs.map((spec) => ({
        accessorKey: spec.key,
        header: ({ column }) => {
          if (spec.sortable) {
            return (
              <button
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
          return value != null ? String(value) : "";
        },
      })),
    [columnSpecs],
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: searchable ? getFilteredRowModel() : undefined,
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    initialState: paginated ? { pagination: { pageSize } } : undefined,
  });

  return (
    <div className={className}>
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
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
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
