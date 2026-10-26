# Prefab Charts

All charts live in `prefab_ui.components.charts`. Every cartesian chart
(Bar, Line, Area, Scatter) uses `ChartSeries` to define what to plot.

Charts animate literal data by default. When `data` is an `Rx` binding or
interpolation string, animation defaults to off because replacing reactive data
mid-animation can make Recharts v2 enter a render loop. Pass `animate=True`
explicitly to override this safety default. PieChart also defaults animation off
when `aggregate_except` is a reactive binding.

## ChartSeries

```python
from prefab_ui.components.charts import BarChart, ChartSeries

BarChart(
    data=[
        {"month": "Jan", "revenue": 100, "cost": 60},
        {"month": "Feb", "revenue": 200, "cost": 80},
    ],
    series=[
        ChartSeries(data_key="revenue", label="Revenue", color="#22c55e"),
        ChartSeries(data_key="cost", label="Cost", color="#ef4444"),
    ],
    x_axis="month",
)
```

`data_key` selects which field in each data row to plot. `label` appears
in legends/tooltips. `color` is any CSS color.

## Chart Types

All accept `data`, `series`, `x_axis`, `height` (default 300),
`show_legend`, `show_tooltip` (default True), `show_grid` (default True).

**BarChart** — vertical or horizontal bars.
- `stacked`: stack bars instead of grouping
- `horizontal`: rotate 90°
- `bar_radius`: corner radius on bars
- `x_axis_label`, `y_axis_label`: category and value axis titles. Horizontal
  bars put the category title on the left and the value title below.
  `show_y_axis=False` also hides the value-axis title.

**LineChart** — connected data points.
- `curve`: "linear", "smooth", or "step"
- `show_dots`: show points at data values
- `x_axis_label`, `y_axis_label`: category and value axis titles.
  `show_y_axis=False` also hides the value-axis title.
- `series`: a static `list[ChartSeries]`, or an `Rx` / sole interpolation
  template resolving to a list of series dictionaries. Use wire keys such
  as `dataKey` in dictionaries stored in state.

```python
from prefab_ui.rx import Rx

LineChart(
    data=monthly_data,
    series=Rx("chart_series").selectattr("visible"),
    x_axis="month",
)
```

For example, `chart_series` in app state can contain
`{"dataKey": "revenue", "label": "Revenue", "color": "var(--chart-1)", "visible": True}`.
Changing `visible` updates the plotted series. Automatic palette colors follow
the resolved list's order; set `color` on each stored series when its color must
stay the same across filtering or reordering. Other chart types still take
static `ChartSeries` lists.

**AreaChart** — filled area under lines.
- `curve`, `show_dots` (same as LineChart)
- `stacked`: stack areas

**ScatterChart** — individual data points.
- Each series needs `data_key` for Y values; `x_axis` is the X field.

```python
from prefab_ui.components.charts import LineChart, AreaChart, ChartSeries

# Multi-series line chart
LineChart(
    data=monthly_data,
    series=[
        ChartSeries(data_key="revenue", label="Revenue"),
        ChartSeries(data_key="expenses", label="Expenses"),
    ],
    x_axis="month",
    curve="smooth",
    show_y_axis=True,
    height=250,
)

# Stacked area chart
AreaChart(
    data=monthly_data,
    series=[
        ChartSeries(data_key="mobile", label="Mobile"),
        ChartSeries(data_key="desktop", label="Desktop"),
    ],
    x_axis="month",
    stacked=True,
)
```

## Non-Series Charts

**PieChart** — uses `data_key` and `name_key` directly (no ChartSeries):
```python
from prefab_ui.components.charts import PieChart

PieChart(
    data=[{"name": "Chrome", "share": 65}, {"name": "Firefox", "share": 20}],
    data_key="share",
    name_key="name",
    inner_radius=60,  # >0 makes it a donut
)
```

PieChart can combine categories into an `Other` slice while preserving the
original total. Choose one aggregation rule:

- `aggregate_below=0.2` combines slices below 20% of the original total. A slice
  exactly at the cutoff stays separate; a zero total leaves rows unchanged.
- `aggregate_except=["US", "MX"]` keeps those `name_key` values individually and
  combines the rest. Bind it to `STATE.selected_countries` for interactive
  selection. An empty list combines every row.

Both options default to `None` and are mutually exclusive. Aggregation uses
finite, non-negative numeric values and distinct `name_key`/`data_key` fields.
Existing `Other` rows join the combined bucket when one is needed; no bucket
is added when no rows are combined.

```python
from prefab_ui.components.charts import PieChart
from prefab_ui.rx import STATE

PieChart(
    data=STATE.sales,
    name_key="country",
    data_key="revenue",
    aggregate_except=STATE.selected_countries,
)
```

**RadarChart** — spider/radar with series:
```python
from prefab_ui.components.charts import RadarChart, ChartSeries

RadarChart(
    data=[{"skill": "Python", "level": 90}, {"skill": "JS", "level": 70}],
    series=[ChartSeries(data_key="level", label="Skill Level")],
    x_axis="skill",
)
```

**RadialChart** — concentric rings (no ChartSeries):
```python
from prefab_ui.components.charts import RadialChart

RadialChart(
    data=[{"name": "CPU", "value": 73}, {"name": "Memory", "value": 55}],
    data_key="value",
    name_key="name",
)
```

**WaterfallChart** — floating bars showing sequential increases/decreases
building to a total (no ChartSeries — uses `data_key`/`name_key` like
PieChart/RadialChart):
```python
from prefab_ui.components.charts import WaterfallChart

WaterfallChart(
    data=[
        {"label": "Starting Cash", "value": 50000, "total": True},
        {"label": "Sales", "value": 32000},
        {"label": "Payroll", "value": -21000},
        {"label": "Ending Cash", "value": 61000, "total": True},
    ],
    data_key="value",
    name_key="label",
    total_key="total",  # marks a row as a total: drawn from zero, resets the running sum
)
```
Bars are colored automatically (increase/decrease/total) and connected by
dashed "bridge" lines by default — set `show_connectors=False` to hide them.
Override colors with `increase_color`, `decrease_color`, `total_color`.

## Sparkline

Compact inline chart for trends. Takes a flat list of numbers:

```python
from prefab_ui.components.charts import Sparkline

Sparkline(data=[10, 25, 18, 30, 22, 35], height=36, variant="success")
```

Props: `data` (list of numbers), `height`, `variant` (success/warning/
destructive/info/default), `fill` (shade area), `curve` ("linear"/"smooth").

## Common Props

All cartesian charts share:
- `show_y_axis`: show Y-axis labels
- `value_format`: expression pipe format for value-axis ticks and tooltip values, such as "compact", "compact:0", "currency", "currency:EUR", "percent", or "percent:1". Percent values use fractional input, so `0.8` renders as `80%`.
- `show_grid`: cartesian grid lines
- `height`: chart height in pixels

Pie and radial charts use the same `value_format` pipe strings for tooltip
values.
