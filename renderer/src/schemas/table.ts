/**
 * Table component schemas: Table, TableHeader, TableBody, TableFooter,
 * TableRow, TableHead, TableCell, TableCaption, DataTable.
 */

import { z } from "zod";
import { componentBase, containerBase } from "./base.ts";

export const tableSchema = containerBase.extend({
  type: z.literal("Table"),
});

export const tableHeaderSchema = containerBase.extend({
  type: z.literal("TableHeader"),
});

export const tableBodySchema = containerBase.extend({
  type: z.literal("TableBody"),
});

export const tableFooterSchema = containerBase.extend({
  type: z.literal("TableFooter"),
});

export const tableRowSchema = containerBase.extend({
  type: z.literal("TableRow"),
});

export const tableHeadSchema = containerBase.extend({
  type: z.literal("TableHead"),
  content: z.string().optional(),
});

export const tableCellSchema = containerBase.extend({
  type: z.literal("TableCell"),
  content: z.string().optional(),
});

export const tableCaptionSchema = componentBase.extend({
  type: z.literal("TableCaption"),
  content: z.string(),
});

const dataTableColumnSchema = z.object({
  key: z.string(),
  header: z.string(),
  sortable: z.boolean().optional(),
});

export const dataTableSchema = componentBase.extend({
  type: z.literal("DataTable"),
  columns: z.array(dataTableColumnSchema),
  rows: z
    .union([z.array(z.record(z.string(), z.unknown())), z.string()])
    .optional(),
  searchable: z.boolean().optional(),
  paginated: z.boolean().optional(),
  pageSize: z.number().int().optional(),
  caption: z.string().optional(),
});
