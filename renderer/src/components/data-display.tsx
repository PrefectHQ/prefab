/**
 * Data display components — DataTable wrapper around @tanstack/react-table.
 *
 * Renders a flat columns + rows API with optional sorting, filtering,
 * pagination, and row click actions using shadcn Table primitives.
 */

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { interpolateString } from "../interpolation";
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
  format?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  headerClass?: string;
  cellClass?: string;
}

/** Format a cell value using the expression pipe system. */
function formatCellValue(value: unknown, format: string): unknown {
  return interpolateString(`{{ _v | ${format} }}`, { _v: value });
}

interface DataTableProps {
  columns: DataTableColumnSpec[];
  rows: Record<string, unknown>[];
  search?: boolean;
  paginated?: boolean;
  pageSize?: number;
  onRowClick?: (rowData: Record<string, unknown>) => void;
  className?: string;
}

export function PrefabDataTable({
  columns: columnSpecs,
  rows,
  search = false,
  paginated = false,
  pageSize = 10,
  onRowClick,
  className,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [clickedRowId, setClickedRowId] = useState<string | null>(null);
  const renderNode = useRenderNode();

  const dataColumns = useMemo<ColumnDef<Record<string, unknown>>[]>(
    () =>
      columnSpecs.map((spec) => {
        const colStyle: React.CSSProperties = {};
        if (spec.width) colStyle.width = spec.width;
        if (spec.minWidth) colStyle.minWidth = spec.minWidth;
        if (spec.maxWidth) colStyle.maxWidth = spec.maxWidth;
        const hasColStyle = Object.keys(colStyle).length > 0;

        return {
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
            if (spec.format !== undefined && value != null) {
              return formatCellValue(value, spec.format);
            }
            return value != null ? String(value) : "";
          },
          meta: {
            headerClass: spec.headerClass,
            cellClass: spec.cellClass,
            colStyle: hasColStyle ? colStyle : undefined,
          },
        };
      }),
    [columnSpecs, renderNode],
  );

  const table = useReactTable({
    data: rows,
    columns: dataColumns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: search ? getFilteredRowModel() : undefined,
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    initialState: paginated ? { pagination: { pageSize } } : undefined,
  });

  const colCount = dataColumns.length;
  const isClickable = !!onRowClick;

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
                  | { headerClass?: string; colStyle?: React.CSSProperties }
                  | undefined;
                return (
                  <TableHead
                    key={header.id}
                    className={meta?.headerClass}
                    style={meta?.colStyle}
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
              {table.getRowModel().rows.map((row) => {
                const isSelected = clickedRowId === row.id;
                return (
                  <TableRow
                    key={row.id}
                    data-state={isSelected ? "selected" : undefined}
                    className={isClickable ? "cursor-pointer" : undefined}
                    onClick={
                      isClickable
                        ? () => {
                            setClickedRowId(row.id);
                            onRowClick(row.original);
                          }
                        : undefined
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta as
                        | { cellClass?: string; colStyle?: React.CSSProperties }
                        | undefined;
                      return (
                        <TableCell
                          key={cell.id}
                          className={meta?.cellClass}
                          style={meta?.colStyle}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
