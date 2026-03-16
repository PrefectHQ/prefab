import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

const dataTableColumnSchema = z.object({
  key: z.string(),
  header: z.string(),
  sortable: z.boolean().optional(),
  format: z.string().optional(),
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
  selectable: z.boolean().optional(),
  onRowClick: actionOrList.optional(),
});

export type DataTableWire = z.infer<typeof dataTableSchema>;
