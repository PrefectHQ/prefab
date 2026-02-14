/**
 * Component registry — maps JSON type names to React components.
 *
 * Each Python component class (e.g., Button, Card, Row) serializes
 * to JSON with { "type": "Button", ... }. The renderer looks up the
 * type name here to find the corresponding React component.
 *
 * For components where Python's API differs from shadcn's multi-part
 * structure (Select, RadioGroup, Checkbox, Switch), we register
 * wrapper components from form.tsx that bridge the gap.
 */

import type { ComponentType } from "react";

// shadcn components (used directly when APIs match)
import { PrefabButton } from "./button-wrapper";
import { Badge } from "@/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/ui/card";
import { AlertTitle, AlertDescription } from "@/ui/alert";
import { PrefabAlert } from "./alert-wrapper";
import { PrefabCombobox } from "./combobox-wrapper";
import { PrefabField } from "./field-wrapper";
import { PrefabIcon } from "./icon-wrapper";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Label } from "@/ui/label";
import { Separator } from "@/ui/separator";
import { Spinner } from "@/ui/spinner";
import { Slider } from "@/ui/slider";
import { Progress } from "@/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/ui/table";

// Wrapper components (bridge Python API → shadcn internals)
import {
  PrefabSelect,
  PrefabRadioGroup,
  PrefabRadio,
  PrefabCheckbox,
  PrefabSwitch,
  PrefabButtonGroup,
} from "./form";

// Custom components
import { Row, Column, Grid, Div, Span, PrefabForm } from "./layout";
import {
  Text,
  Heading,
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  BlockQuote,
} from "./typography";
import { Code, Image, Markdown } from "./content";
import { Condition, ForEach } from "./control-flow";
import {
  PrefabBarChart,
  PrefabLineChart,
  PrefabAreaChart,
  PrefabPieChart,
  PrefabRadarChart,
  PrefabRadialChart,
} from "./charts";
import { PrefabDataTable } from "./data-display";
import {
  PrefabTabs,
  PrefabAccordion,
  PrefabPages,
  PrefabTooltip,
  PrefabPopover,
  PrefabDialog,
  PrefabCalendar,
  PrefabDatePicker,
} from "./compound";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const REGISTRY: Record<string, ComponentType<any>> = {
  // shadcn (direct — APIs match)
  Button: PrefabButton,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Alert: PrefabAlert,
  AlertTitle,
  AlertDescription,
  Input,
  Textarea,
  Label,
  Separator,
  Slider,
  Spinner,
  Progress,

  // Form wrappers (Python API → shadcn multi-part)
  Combobox: PrefabCombobox,
  ComboboxOption: () => null, // consumed by parent Combobox via _items
  Select: PrefabSelect,
  SelectOption: () => null, // consumed by parent Select via _items
  RadioGroup: PrefabRadioGroup,
  Radio: PrefabRadio, // standalone renders as native radio; inside RadioGroup consumed as data
  Checkbox: PrefabCheckbox,
  Switch: PrefabSwitch,
  ButtonGroup: PrefabButtonGroup,

  // Table (direct shadcn — 1:1 API match)
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,

  // Charts (wrappers around Recharts + shadcn ChartContainer)
  BarChart: PrefabBarChart,
  LineChart: PrefabLineChart,
  AreaChart: PrefabAreaChart,
  PieChart: PrefabPieChart,
  RadarChart: PrefabRadarChart,
  RadialChart: PrefabRadialChart,

  // DataTable (wrapper around @tanstack/react-table)
  DataTable: PrefabDataTable,

  // Field (choice card wrapper)
  Field: PrefabField,

  // Layout
  Row,
  Column,
  Form: PrefabForm,
  Grid,
  Div,
  Span,

  // Typography
  Text,
  Heading,
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  BlockQuote,

  // Content
  Code,
  Image,
  Markdown,
  Icon: PrefabIcon,

  // Control flow
  Condition,
  ForEach,

  // Compound containers (wrapper components decompose children into parts)
  Tabs: PrefabTabs,
  Tab: () => null, // consumed by parent Tabs
  Accordion: PrefabAccordion,
  AccordionItem: () => null, // consumed by parent Accordion
  Pages: PrefabPages,
  Page: () => null, // consumed by parent Pages

  // Overlay wrappers (first child = trigger, rest = content)
  Tooltip: PrefabTooltip,
  Popover: PrefabPopover,
  Dialog: PrefabDialog,

  // Calendar / DatePicker
  Calendar: PrefabCalendar,
  DatePicker: PrefabDatePicker,
};
