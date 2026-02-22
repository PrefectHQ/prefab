/**
 * Zod schemas for Dashboard and DashboardItem.
 */

import { z } from "zod";
import { containerBase } from "./base.ts";

export const dashboardSchema = containerBase.extend({
  type: z.literal("Dashboard"),
  columns: z.number().optional(),
  rowHeight: z.union([z.number(), z.string()]).optional(),
  rows: z.number().optional(),
});

export const dashboardItemSchema = containerBase.extend({
  type: z.literal("DashboardItem"),
  col: z.number().optional(),
  row: z.number().optional(),
  colSpan: z.number().optional(),
  rowSpan: z.number().optional(),
  zIndex: z.number().optional(),
});
