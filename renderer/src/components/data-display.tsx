/**
 * Data display components — DataTable wrapper around @tanstack/react-table.
 *
 * Renders a flat columns + rows API with optional sorting, filtering,
 * and pagination using shadcn Table primitives.
 */

import { useState, useMemo } from "react";
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
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps {
  columns: DataTableColumnSpec[];
  rows: Record<string, unknown>[];
  search?: boolean;
  paginated?: boolean;
  pageSize?: number;
  className?: string;
}

export function PrefabDataTable({
  columns: columnSpecs,
  rows,
  search = false,
  paginated = false,
  pageSize = 10,
  className,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const renderNode = useRenderNode();

  // Build @tanstack/react-table column defs from our flat spec
  const columns = useMemo<ColumnDef<Record<string, unknown>>[]>(
    () =>
      columnSpecs.map((spec) => {
        const alignClass =
          spec.align === "right"
            ? "text-right"
            : spec.align === "center"
              ? "text-center"
              : undefined;
        const sizeStyle: React.CSSProperties = {};
        if (spec.width) sizeStyle.width = spec.width;
        if (spec.minWidth) sizeStyle.minWidth = spec.minWidth;
        if (spec.maxWidth) sizeStyle.maxWidth = spec.maxWidth;
        const hasSizeStyle = Object.keys(sizeStyle).length > 0;

        return {
          accessorKey: spec.key,
          header: ({ column }) => {
            const content = spec.sortable ? (
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
            ) : (
              spec.header
            );
            return content;
          },
          cell: ({ getValue }) => {
            const value = getValue();
            if (renderNode && isComponentNode(value)) {
              return renderNode(value);
            }
            return value != null ? String(value) : "";
          },
          meta: { alignClass, sizeStyle: hasSizeStyle ? sizeStyle : undefined },
        };
      }),
    [columnSpecs, renderNode],
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: search ? getFilteredRowModel() : undefined,
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    initialState: paginated ? { pagination: { pageSize } } : undefined,
  });

  return (
    <div className={cn("w-full min-w-0", className)}>
      {search && (
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
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as
                  | { alignClass?: string; sizeStyle?: React.CSSProperties }
                  | undefined;
                return (
                  <TableHead
                    key={header.id}
                    className={meta?.alignClass}
                    style={meta?.sizeStyle}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as
                      | { alignClass?: string; sizeStyle?: React.CSSProperties }
                      | undefined;
                    return (
                      <TableCell
                        key={cell.id}
                        className={meta?.alignClass}
                        style={meta?.sizeStyle}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              {/* Pad short pages with empty rows so auto-resize stays stable */}
              {paginated &&
                table.getRowModel().rows.length < pageSize &&
                Array.from({
                  length: pageSize - table.getRowModel().rows.length,
                }).map((_, i) => (
                  <TableRow key={`pad-${i}`} className="border-transparent">
                    <TableCell colSpan={columns.length}>&nbsp;</TableCell>
                  </TableRow>
                ))}
            </>
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
