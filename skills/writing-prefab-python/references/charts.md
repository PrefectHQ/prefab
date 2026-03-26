# Prefab Charts

All charts live in `prefab_ui.components.charts`. Every cartesian chart
(Bar, Line, Area, Scatter) uses `ChartSeries` to define what to plot.

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

**LineChart** — connected data points.
- `curve`: "linear", "smooth", or "step"
- `show_dots`: show points at data values

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
- `y_axis_format`: "auto" or "compact" (60K instead of 60000)
- `show_grid`: cartesian grid lines
- `height`: chart height in pixels
