/**
 * Schema registry — maps JSON type names to Zod schemas.
 *
 * Parallels the component REGISTRY in registry.ts. Contract tests
 * verify these two registries stay in sync with each other and with
 * the Python component definitions.
 */

import type { z } from "zod";

// Re-export schemas and types for convenient access
export {
  HANDLED_ACTIONS,
  ACTION_SCHEMA_REGISTRY,
  actionOrList,
} from "./actions.ts";
export type {
  ToolCallWire,
  SendMessageWire,
  UpdateContextWire,
  OpenLinkWire,
  SetStateWire,
  ToggleStateWire,
  ShowToastWire,
  ActionWire,
  ActionOrListWire,
} from "./actions.ts";
export { componentBase, containerBase } from "./base.ts";
export type { ComponentBaseWire, ContainerBaseWire } from "./base.ts";

// One import per Python module — mirrors src/prefab_ui/components/*.py
import { accordionSchema, accordionItemSchema } from "./accordion.ts";
import {
  alertSchema,
  alertTitleSchema,
  alertDescriptionSchema,
} from "./alert.ts";
import { badgeSchema } from "./badge.ts";
import { buttonSchema } from "./button.ts";
import { buttonGroupSchema } from "./button_group.ts";
import { calendarSchema } from "./calendar.ts";
import {
  barChartSchema,
  lineChartSchema,
  areaChartSchema,
  pieChartSchema,
  radarChartSchema,
  radialChartSchema,
} from "./chart.ts";
import {
  cardSchema,
  cardHeaderSchema,
  cardTitleSchema,
  cardDescriptionSchema,
  cardContentSchema,
  cardFooterSchema,
} from "./card.ts";
import { checkboxSchema } from "./checkbox.ts";
import { codeSchema } from "./code.ts";
import { comboboxSchema, comboboxOptionSchema } from "./combobox.ts";
import { conditionSchema } from "./conditional.ts";
import { columnSchema } from "./column.ts";
import { containerSchema } from "./container.ts";
import { dashboardSchema, dashboardItemSchema } from "./dashboard.ts";
import { dataTableSchema } from "./data_table.ts";
import { datePickerSchema } from "./date_picker.ts";
import { dialogSchema } from "./dialog.ts";
import { divSchema, spanSchema } from "./div.ts";
import { dropZoneSchema } from "./drop_zone.ts";
import { fieldSchema } from "./field.ts";
import { forEachSchema } from "./foreach.ts";
import { formSchema } from "./form.ts";
import { gridSchema } from "./grid.ts";
import { headingSchema } from "./typography.ts";
import { hoverCardSchema } from "./hover_card.ts";
import { iconSchema } from "./icon.ts";
import { imageSchema } from "./image.ts";
import { inputSchema } from "./input.ts";
import { labelSchema } from "./label.ts";
import { markdownSchema } from "./markdown.ts";
import { pageSchema, pagesSchema } from "./pages.ts";
import { popoverSchema } from "./popover.ts";
import { progressSchema } from "./progress.ts";
import { radioGroupSchema, radioSchema } from "./radio.ts";
import { rowSchema } from "./row.ts";
import { selectSchema, selectOptionSchema } from "./select.ts";
import { separatorSchema } from "./separator.ts";
import { slotSchema } from "./slot.ts";
import { sliderSchema } from "./slider.ts";
import { loaderSchema } from "./loader.ts";
import { switchSchema } from "./switch.ts";
import {
  tableSchema,
  tableHeaderSchema,
  tableBodySchema,
  tableFooterSchema,
  tableRowSchema,
  tableHeadSchema,
  tableCellSchema,
  tableCaptionSchema,
} from "./table.ts";
import { tabsSchema, tabSchema } from "./tabs.ts";
import { textSchema } from "./typography.ts";
import { textareaSchema } from "./textarea.ts";
import { tooltipSchema } from "./tooltip.ts";
import {
  h1Schema,
  h2Schema,
  h3Schema,
  h4Schema,
  pSchema,
  leadSchema,
  largeSchema,
  smallSchema,
  mutedSchema,
  blockQuoteSchema,
  inlineCodeSchema,
} from "./typography.ts";

/**
 * Maps component type names to their Zod schemas.
 *
 * Keys MUST match the component REGISTRY in registry.ts and the
 * Python component `type` discriminator values.
 */
export const SCHEMA_REGISTRY: Record<string, z.ZodType> = {
  Accordion: accordionSchema,
  AccordionItem: accordionItemSchema,
  Alert: alertSchema,
  AlertTitle: alertTitleSchema,
  AlertDescription: alertDescriptionSchema,
  AreaChart: areaChartSchema,
  Badge: badgeSchema,
  BarChart: barChartSchema,
  BlockQuote: blockQuoteSchema,
  Button: buttonSchema,
  ButtonGroup: buttonGroupSchema,
  Calendar: calendarSchema,
  Card: cardSchema,
  CardHeader: cardHeaderSchema,
  CardTitle: cardTitleSchema,
  CardDescription: cardDescriptionSchema,
  CardContent: cardContentSchema,
  CardFooter: cardFooterSchema,
  Checkbox: checkboxSchema,
  Code: codeSchema,
  Combobox: comboboxSchema,
  ComboboxOption: comboboxOptionSchema,
  Condition: conditionSchema,
  Column: columnSchema,
  Container: containerSchema,
  Dashboard: dashboardSchema,
  DashboardItem: dashboardItemSchema,
  DataTable: dataTableSchema,
  DatePicker: datePickerSchema,
  Dialog: dialogSchema,
  Div: divSchema,
  DropZone: dropZoneSchema,
  Field: fieldSchema,
  ForEach: forEachSchema,
  Form: formSchema,
  Grid: gridSchema,
  H1: h1Schema,
  H2: h2Schema,
  H3: h3Schema,
  H4: h4Schema,
  Heading: headingSchema,
  HoverCard: hoverCardSchema,
  Icon: iconSchema,
  Image: imageSchema,
  InlineCode: inlineCodeSchema,
  Input: inputSchema,
  Label: labelSchema,
  Large: largeSchema,
  Lead: leadSchema,
  LineChart: lineChartSchema,
  Markdown: markdownSchema,
  Muted: mutedSchema,
  P: pSchema,
  Page: pageSchema,
  Pages: pagesSchema,
  PieChart: pieChartSchema,
  RadarChart: radarChartSchema,
  RadialChart: radialChartSchema,
  Popover: popoverSchema,
  Progress: progressSchema,
  Radio: radioSchema,
  RadioGroup: radioGroupSchema,
  Row: rowSchema,
  Select: selectSchema,
  SelectOption: selectOptionSchema,
  Separator: separatorSchema,
  Slider: sliderSchema,
  Slot: slotSchema,
  Small: smallSchema,
  Loader: loaderSchema,
  Span: spanSchema,
  Switch: switchSchema,
  Tab: tabSchema,
  Table: tableSchema,
  TableBody: tableBodySchema,
  TableCaption: tableCaptionSchema,
  TableCell: tableCellSchema,
  TableFooter: tableFooterSchema,
  TableHead: tableHeadSchema,
  TableHeader: tableHeaderSchema,
  TableRow: tableRowSchema,
  Tabs: tabsSchema,
  Text: textSchema,
  Textarea: textareaSchema,
  Tooltip: tooltipSchema,
};
