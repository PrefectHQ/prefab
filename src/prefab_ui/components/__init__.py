"""Prefab component library.

UI and layout components are importable from this package directly::

    from prefab_ui.components import Card, Badge, H1, Grid

Charts and control flow have dedicated submodules::

    from prefab_ui.components.charts import BarChart, ChartSeries
    from prefab_ui.components.control_flow import ForEach, If, Else
"""

from prefab_ui.components.alert import Alert, AlertDescription, AlertTitle
from prefab_ui.components.badge import Badge
from prefab_ui.components.base import (
    Component,
    ContainerComponent,
    StatefulMixin,
    detached,
)
from prefab_ui.rx import Rx
from prefab_ui.components.button import Button
from prefab_ui.components.calendar import Calendar
from prefab_ui.components.button_group import ButtonGroup
from prefab_ui.components.card import (
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
)
from prefab_ui.components.checkbox import Checkbox
from prefab_ui.components.combobox import Combobox, ComboboxOption
from prefab_ui.components.code import Code
from prefab_ui.components.column import Column
from prefab_ui.components.container import Container
from prefab_ui.components.dashboard import Dashboard, DashboardItem
from prefab_ui.components.data_table import DataTable, DataTableColumn
from prefab_ui.components.date_picker import DatePicker
from prefab_ui.components.dialog import Dialog
from prefab_ui.components.div import Div, Span
from prefab_ui.components.drop_zone import DropZone
from prefab_ui.components.accordion import Accordion, AccordionItem
from prefab_ui.components.field import Field
from prefab_ui.components.form import Form
from prefab_ui.components.grid import Grid
from prefab_ui.components.heading import Heading
from prefab_ui.components.histogram import Histogram
from prefab_ui.components.hover_card import HoverCard
from prefab_ui.components.icon import Icon
from prefab_ui.components.image import Image
from prefab_ui.components.input import Input
from prefab_ui.components.label import Label
from prefab_ui.components.markdown import Markdown
from prefab_ui.components.metric import Metric
from prefab_ui.components.pages import Page, Pages
from prefab_ui.components.popover import Popover
from prefab_ui.components.progress import Progress
from prefab_ui.components.radio import Radio, RadioGroup
from prefab_ui.components.row import Row
from prefab_ui.components.select import Select, SelectOption
from prefab_ui.components.separator import Separator
from prefab_ui.components.slot import Slot
from prefab_ui.components.slider import Slider
from prefab_ui.components.loader import Loader
from prefab_ui.components.switch import Switch
from prefab_ui.components.tabs import Tab, Tabs
from prefab_ui.components.tooltip import Tooltip
from prefab_ui.components.table import (
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
)
from prefab_ui.components.text import Text
from prefab_ui.components.textarea import Textarea
from prefab_ui.components.typography import (
    H1,
    H2,
    H3,
    H4,
    BlockQuote,
    InlineCode,
    Large,
    Lead,
    Muted,
    P,
    Small,
)

__all__ = [
    "H1",
    "H2",
    "H3",
    "H4",
    "Accordion",
    "AccordionItem",
    "Alert",
    "AlertDescription",
    "AlertTitle",
    "Badge",
    "BlockQuote",
    "Button",
    "ButtonGroup",
    "Calendar",
    "Card",
    "CardContent",
    "CardDescription",
    "CardFooter",
    "CardHeader",
    "CardTitle",
    "Checkbox",
    "Code",
    "Column",
    "Combobox",
    "ComboboxOption",
    "Component",
    "Container",
    "ContainerComponent",
    "Dashboard",
    "DashboardItem",
    "DataTable",
    "DataTableColumn",
    "DatePicker",
    "Dialog",
    "Div",
    "DropZone",
    "Field",
    "Form",
    "Grid",
    "Heading",
    "Histogram",
    "HoverCard",
    "Icon",
    "Image",
    "InlineCode",
    "Input",
    "Label",
    "Large",
    "Lead",
    "Loader",
    "Markdown",
    "Metric",
    "Muted",
    "P",
    "Page",
    "Pages",
    "Popover",
    "Progress",
    "Radio",
    "RadioGroup",
    "Row",
    "Rx",
    "Select",
    "SelectOption",
    "Separator",
    "Slider",
    "Slot",
    "Small",
    "Span",
    "StatefulMixin",
    "Switch",
    "Tab",
    "Table",
    "TableBody",
    "TableCaption",
    "TableCell",
    "TableFooter",
    "TableHead",
    "TableHeader",
    "TableRow",
    "Tabs",
    "Text",
    "Textarea",
    "Tooltip",
    "detached",
]
