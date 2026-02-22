# Component Reference

All props optional unless **(required)**. Every component supports
`cssClass` (string, Tailwind classes).
Container components support `children` (array). Wire format uses camelCase.

---

## Layout

**Column** [container] — Vertical flex. `cssClass` for gap: `"gap-4"`, `"gap-2 items-center"`.

**Row** [container] — Horizontal flex. `cssClass`: `"gap-2 justify-between"`.

**Grid** [container] — Auto-flow CSS grid. `cssClass`: `"grid-cols-3 gap-4"`.

**DashboardGrid** [container] — Explicit-placement grid. `columns` (default 12), `rowHeight` (default 120), `rows`, `cssClass` for gap. Children must be DashboardItem.

**DashboardItem** [container] — Positioned cell in DashboardGrid. `col`, `row` (1-indexed start), `colSpan`, `rowSpan` (size), `zIndex`.

```json
{"type": "DashboardGrid", "columns": 12, "rowHeight": 100, "cssClass": "gap-4", "children": [
  {"type": "DashboardItem", "col": 1, "row": 1, "colSpan": 8, "rowSpan": 3, "children": [...]},
  {"type": "DashboardItem", "col": 9, "row": 1, "colSpan": 4, "rowSpan": 1, "children": [...]}
]}
```

**Div** [container] — Generic block container.

**Span** — Inline text. `content` **(req)**.

## Typography

All accept `content` **(req)**, `bold` (bool), `italic` (bool):

`Heading` (also `level`: 1|2|3|4, default 1), `Text`, `P`, `H1`, `H2`,
`H3`, `H4`, `Lead`, `Large`, `Small`, `Muted`, `BlockQuote`, `Code`,
`InlineCode`, `Label`.

**Markdown** — `content` **(req)**, renders markdown to HTML.

**Image** — `src` **(req)**, `alt`.

**Icon** — `name` **(req)**, Lucide icon in kebab-case (e.g. `"arrow-right"`, `"search"`, `"x"`).

## Cards [all containers]

Compose: **Card** > **CardHeader** > **CardTitle** (`content`) + **CardDescription** (`content`), **Card** > **CardContent**, **Card** > **CardFooter**.

```json
{"type": "Card", "children": [
  {"type": "CardHeader", "children": [
    {"type": "CardTitle", "content": "Title"},
    {"type": "CardDescription", "content": "Subtitle"}
  ]},
  {"type": "CardContent", "children": [...]},
  {"type": "CardFooter", "children": [...]}
]}
```

## Form Controls

**Input** — `inputType` ("text"|"email"|"password"|"number"|"tel"|"url"|"search"|"date"|"time"|"datetime-local"|"file"), `name`, `placeholder`, `value`, `disabled`, `required`, `minLength`, `maxLength`, `min`, `max`, `step`, `pattern`, `onChange`.

**Textarea** — `name`, `placeholder`, `value`, `rows`, `disabled`, `required`, `minLength`, `maxLength`, `onChange`.

**Select** [container] — `name`, `placeholder`, `size` ("default"|"sm"), `disabled`, `required`, `onChange`. Children: **SelectOption** (`value` **(req)**, `label` **(req)**, `selected`).

```json
{"type": "Select", "name": "role", "children": [
  {"type": "SelectOption", "value": "admin", "label": "Admin"},
  {"type": "SelectOption", "value": "user", "label": "User"}
]}
```

**Checkbox** — `name`, `label`, `checked`, `disabled`, `required`, `onChange`.

**Switch** — `name`, `label`, `checked`, `disabled`, `onChange`.

**Slider** — `name`, `min` (default 0), `max` (default 100), `value`, `step` (default 1), `disabled`, `onChange`.

**RadioGroup** [container] — `name`, `defaultValue`, `onChange`. Children: **Radio** (`value` **(req)**, `label`, `disabled`).

**DatePicker** — `name`, `placeholder`, `onChange`.

**Calendar** — `name`, `onChange`.

**Combobox** [container] — searchable select. `name`, `placeholder`, `searchPlaceholder`, `emptyText`, `onChange`. Children: **ComboboxOption** (`value` **(req)**, `label` **(req)**, `selected`).

**Form** [container] — `onSubmit` (action). Default cssClass `"gap-4"`.

**Field** [container] — groups label + input. `label`, `description`.

## Data Display

**DataTable** — `columns` **(req)** (array of `{key, header, sortable?}`), `rows` **(req)** (array or `"{{ key }}"`), `searchable`, `paginated`, `pageSize` (default 10), `caption`.

**Table** [container] — manual table. Nest: Table > TableHeader > TableRow > **TableHead** (`content`), Table > TableBody > TableRow > **TableCell** (`content`). Also TableFooter, **TableCaption** (`content`).

**Badge** — `label` **(req)**, `variant` ("default"|"secondary"|"destructive"|"outline").

**Alert** [container] — `variant` ("default"|"destructive"|"success"|"warning"|"info"), `icon` (Lucide name). Children: **AlertTitle** (`content`), **AlertDescription** (`content`).

**Progress** — `value` **(req)** (0-100).

**Separator** — no props. **Spinner** — no props.

## Interactive

**Button** — `label` **(req)**, `variant` ("default"|"destructive"|"outline"|"secondary"|"ghost"|"link"|"success"|"warning"|"info"), `size` ("default"|"xs"|"sm"|"lg"|"icon"|"icon-xs"|"icon-sm"|"icon-lg"), `icon` (Lucide name), `disabled`, `onClick`.

**ButtonGroup** [container] — groups Buttons visually.

**Tabs** [container] — `variant` ("default"|"line"), `defaultValue`, `name` (state key), `onChange`. Children: **Tab** [container] (`title` **(req)**, `value`, `disabled`).

**Accordion** [container] — `multiple`, `collapsible` (default true), `defaultValues` (string array). Children: **AccordionItem** [container] (`title` **(req)**, `value`).

**Dialog** [container] — first child = trigger, rest = body. `title`, `description`.

**Popover** [container] — first child = trigger, rest = content. `title`, `description`, `side` ("top"|"right"|"bottom"|"left").

**Tooltip** — hover tooltip. `content` **(req)** (tooltip text). First child = trigger.

**Pages** [container] — only active page renders. `name` (state key), `defaultValue`. Children: **Page** [container] (`title` **(req)**, `value`). Navigate with `setState`.

## Charts

**BarChart**, **LineChart**, **AreaChart** — `data` **(req)** (array or `"{{ key }}"`), `series` **(req)** (array of `{dataKey, label?, color?}`), `xAxis`, `height` (default 300), `showLegend`, `showTooltip` (default true), `showGrid` (default true). BarChart adds `stacked`, `horizontal`, `barRadius`. LineChart/AreaChart add `curve` ("linear"|"smooth"|"step"), `showDots`. AreaChart adds `stacked`.

**PieChart** — `data` **(req)**, `dataKey` **(req)**, `nameKey` **(req)**, `height`, `innerRadius` (>0 for donut), `showLabel`, `paddingAngle`, `showLegend`, `showTooltip`.

**RadarChart** — `data` **(req)**, `series` **(req)**, `axisKey`, `height`, `filled` (default true), `showDots`, `showLegend`, `showTooltip`, `showGrid`.

**RadialChart** — `data` **(req)**, `dataKey` **(req)**, `nameKey` **(req)**, `height`, `innerRadius`, `startAngle`, `endAngle`, `showLegend`, `showTooltip`.

## Control Flow

**Condition** — Conditional rendering. `cases` **(req)** (array of `{when, children}`), `else` (children array). Each `when` is an expression; first truthy case renders.

```json
{"type": "Condition", "cases": [
  {"when": "status == 'error'", "children": [{"type": "Badge", "label": "Error", "variant": "destructive"}]}
], "else": [{"type": "Badge", "label": "OK"}]}
```

**ForEach** [container] — `key` **(req)** (state key of array). Children repeat per item; templates resolve against item fields. `$index` (zero-based position), `$item` (full item) available.

**State** [container] — `state` **(req)** (object). Scoped state for children; inner shadows outer.
