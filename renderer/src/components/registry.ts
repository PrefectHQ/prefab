/**
 * Component registry — maps JSON type names to React components.
 *
 * Each Python component class (e.g., Button, Card, Row) serializes
 * to JSON with { "type": "Button", ... }. The renderer looks up the
 * type name here to find the corresponding React component.
 *
 * Heavy dependencies (recharts, highlight.js, react-markdown, date-fns)
 * are lazy-loaded so they only download when a component using them
 * actually appears in the tree.
 */

import { lazy, type ComponentType } from "react";

// ── Lazy-load helper ────────────────────────────────────────────────────
// React.lazy expects () => Promise<{ default: Component }>. This helper
// wraps a named export from a dynamic import into that shape. Multiple
// calls to the same module share the browser's module cache — each chunk
// is only fetched once.
function lazyNamed<T extends Record<string, unknown>>(
  factory: () => Promise<T>,
  name: keyof T & string,
): React.LazyExoticComponent<ComponentType<Record<string, unknown>>> {
  return lazy(() =>
    factory().then((m) => ({
      default: m[name] as ComponentType<Record<string, unknown>>,
    })),
  );
}

// ── Eager imports (lightweight) ─────────────────────────────────────────

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
import { Loader } from "@/ui/loader";
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

// File upload
import { PrefabDropZone } from "./drop-zone";

// Custom components
import { Row, Column, Container, Grid, Div, Span, PrefabForm } from "./layout";
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
import { Image } from "./image";
import { Condition, ForEach, Slot } from "./control-flow";
import { PrefabDataTable } from "./data-display";
import {
  PrefabTabs,
  PrefabAccordion,
  PrefabPages,
  PrefabTooltip,
  PrefabHoverCard,
  PrefabPopover,
  PrefabDialog,
} from "./compound";

// ── Lazy imports (heavy dependencies) ───────────────────────────────────

// Charts — recharts (~506 KB)
const chartsModule = () => import("./charts");
const LazyBarChart = lazyNamed(chartsModule, "PrefabBarChart");
const LazyLineChart = lazyNamed(chartsModule, "PrefabLineChart");
const LazyAreaChart = lazyNamed(chartsModule, "PrefabAreaChart");
const LazyPieChart = lazyNamed(chartsModule, "PrefabPieChart");
const LazyRadarChart = lazyNamed(chartsModule, "PrefabRadarChart");
const LazyRadialChart = lazyNamed(chartsModule, "PrefabRadialChart");

// Code + Markdown — highlight.js (~167 KB), react-markdown (~70 KB)
const contentModule = () => import("./content");
const LazyCode = lazyNamed(contentModule, "Code");
const LazyMarkdown = lazyNamed(contentModule, "Markdown");

// Calendar / DatePicker — date-fns (~169 KB)
const calendarModule = () => import("./compound-calendar");
const LazyCalendar = lazyNamed(calendarModule, "PrefabCalendar");
const LazyDatePicker = lazyNamed(calendarModule, "PrefabDatePicker");

// ── Registry ────────────────────────────────────────────────────────────

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
  Loader,
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

  // Charts (lazy — recharts)
  BarChart: LazyBarChart,
  LineChart: LazyLineChart,
  AreaChart: LazyAreaChart,
  PieChart: LazyPieChart,
  RadarChart: LazyRadarChart,
  RadialChart: LazyRadialChart,

  // DataTable (wrapper around @tanstack/react-table)
  DataTable: PrefabDataTable,

  // File upload
  DropZone: PrefabDropZone,

  // Field (choice card wrapper)
  Field: PrefabField,

  // Layout
  Row,
  Column,
  Container,
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

  // Content (lazy — highlight.js, react-markdown)
  Code: LazyCode,
  Image,
  Markdown: LazyMarkdown,
  Icon: PrefabIcon,

  // Control flow
  Condition,
  ForEach,
  Slot,

  // Compound containers (wrapper components decompose children into parts)
  Tabs: PrefabTabs,
  Tab: () => null, // consumed by parent Tabs
  Accordion: PrefabAccordion,
  AccordionItem: () => null, // consumed by parent Accordion
  Pages: PrefabPages,
  Page: () => null, // consumed by parent Pages

  // Overlay wrappers (first child = trigger, rest = content)
  Tooltip: PrefabTooltip,
  HoverCard: PrefabHoverCard,
  Popover: PrefabPopover,
  Dialog: PrefabDialog,

  // Calendar / DatePicker (lazy — date-fns)
  Calendar: LazyCalendar,
  DatePicker: LazyDatePicker,
};
