"""Tests for Prefab component serialization and context-manager nesting."""

from __future__ import annotations

import pytest

from prefab_ui.components import (
    H1,
    Accordion,
    AccordionItem,
    Badge,
    Button,
    Calendar,
    Checkbox,
    Code,
    Column,
    Container,
    DataTable,
    DataTableColumn,
    DatePicker,
    Dialog,
    Div,
    ForEach,
    Heading,
    Image,
    Input,
    Label,
    Markdown,
    P,
    Page,
    Pages,
    Popover,
    Progress,
    Radio,
    RadioGroup,
    Row,
    Select,
    SelectOption,
    Separator,
    Slider,
    Slot,
    Span,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tabs,
    Text,
    Textarea,
    Tooltip,
)

# ---------------------------------------------------------------------------
# Component serialization
# ---------------------------------------------------------------------------


class TestComponentSerialization:
    def test_text_to_json(self):
        t = Text(content="hello")
        j = t.to_json()
        assert j["type"] == "Text"
        assert j["content"] == "hello"
        assert "cssClass" not in j

    def test_text_bold_italic(self):
        t = Text(content="important", bold=True, italic=True)
        j = t.to_json()
        assert j["bold"] is True
        assert j["italic"] is True

        t2 = Text(content="plain")
        j2 = t2.to_json()
        assert "bold" not in j2
        assert "italic" not in j2

    def test_typography_bold_italic(self):
        h = H1("Title", bold=True)
        j = h.to_json()
        assert j["bold"] is True
        assert "italic" not in j

        p = P("body", italic=True)
        j = p.to_json()
        assert j["italic"] is True
        assert "bold" not in j

    def test_heading_to_json(self):
        h = Heading(content="Title", level=2, css_class="mb-4")
        j = h.to_json()
        assert j["type"] == "Heading"
        assert j["content"] == "Title"
        assert j["level"] == 2
        assert j["cssClass"] == "mb-4"

    def test_markdown_to_json(self):
        m = Markdown(content="**bold**")
        j = m.to_json()
        assert j["type"] == "Markdown"
        assert j["content"] == "**bold**"

    def test_code_to_json(self):
        c = Code(content="print('hi')", language="python")
        j = c.to_json()
        assert j["type"] == "Code"
        assert j["content"] == "print('hi')"
        assert j["language"] == "python"

    def test_code_without_language(self):
        c = Code(content="hello")
        j = c.to_json()
        assert "language" not in j

    def test_image_to_json(self):
        img = Image(src="https://img.example.com/pic.png", alt="A picture")
        j = img.to_json()
        assert j["type"] == "Image"
        assert j["src"] == "https://img.example.com/pic.png"
        assert j["alt"] == "A picture"

    def test_row_empty(self):
        r = Row()
        j = r.to_json()
        assert j["type"] == "Row"
        assert "children" not in j

    def test_column_empty(self):
        c = Column()
        j = c.to_json()
        assert j["type"] == "Column"
        assert "children" not in j

    def test_container_empty(self):
        c = Container()
        j = c.to_json()
        assert j["type"] == "Container"
        assert "children" not in j

    def test_container_with_children(self):
        with Container() as c:
            Text(content="hello")
        j = c.to_json()
        assert j["type"] == "Container"
        assert len(j["children"]) == 1

    def test_container_css_class(self):
        c = Container(css_class="max-w-2xl")
        j = c.to_json()
        assert j["cssClass"] == "max-w-2xl"


class TestContextManagerNesting:
    def test_single_level(self):
        with Column() as col:
            Text(content="a")
            Text(content="b")
        assert len(col.children) == 2
        assert col.children[0].content == "a"  # type: ignore[attr-defined]
        assert col.children[1].content == "b"  # type: ignore[attr-defined]

    def test_nested(self):
        with Column() as root:
            Heading(content="Top")
            with Row() as row:
                Text(content="left")
                Text(content="right")
        assert len(root.children) == 2
        assert isinstance(root.children[0], Heading)
        assert isinstance(root.children[1], Row)
        assert len(row.children) == 2

    def test_deeply_nested(self):
        with Column() as root:
            with Row():
                with Column() as inner:
                    Text(content="deep")
        assert len(root.children) == 1
        row_child = root.children[0]
        assert isinstance(row_child, Row)
        assert len(row_child.children) == 1
        assert isinstance(row_child.children[0], Column)
        assert len(inner.children) == 1

    def test_serialization_with_children(self):
        with Column(css_class="p-4") as col:
            Heading(content="Hello")
            Text(content="World")
        j = col.to_json()
        assert j["type"] == "Column"
        assert j["cssClass"] == "p-4"
        assert len(j["children"]) == 2
        assert j["children"][0]["type"] == "Heading"
        assert j["children"][1]["type"] == "Text"

    def test_no_auto_append_outside_context(self):
        col = Column()
        Text(content="orphan")
        assert len(col.children) == 0


# ---------------------------------------------------------------------------
# Form component serialization
# ---------------------------------------------------------------------------


class TestFormComponentSerialization:
    def test_input_serializes(self):
        j = Input(
            input_type="email", placeholder="you@example.com", name="email"
        ).to_json()
        assert j["type"] == "Input"
        assert j["inputType"] == "email"
        assert j["placeholder"] == "you@example.com"
        assert j["name"] == "email"

    def test_input_none_fields_excluded(self):
        j = Input(placeholder="Search").to_json()
        assert "value" not in j
        assert "name" not in j
        assert "onChange" not in j
        assert j["type"] == "Input"

    def test_slider_serializes(self):
        j = Slider(min=0, max=100, value=50, step=5).to_json()
        assert j["type"] == "Slider"
        assert j["min"] == 0
        assert j["max"] == 100
        assert j["value"] == 50
        assert j["step"] == 5

    def test_checkbox_serializes(self):
        j = Checkbox(label="Accept terms", checked=True).to_json()
        assert j["type"] == "Checkbox"
        assert j["label"] == "Accept terms"
        assert j["checked"] is True

    def test_switch_serializes(self):
        j = Switch(label="Enable notifications").to_json()
        assert j["type"] == "Switch"
        assert j["label"] == "Enable notifications"

    def test_select_with_options(self):
        with Select(placeholder="Pick one", name="choice") as sel:
            SelectOption(value="a", label="Alpha")
            SelectOption(value="b", label="Beta")
        j = sel.to_json()
        assert j["type"] == "Select"
        assert j["placeholder"] == "Pick one"
        assert len(j["children"]) == 2
        assert j["children"][0]["value"] == "a"
        assert j["children"][1]["label"] == "Beta"

    def test_radio_group(self):
        with RadioGroup(name="size") as group:
            Radio(value="sm", label="Small")
            Radio(value="lg", label="Large")
        j = group.to_json()
        assert j["type"] == "RadioGroup"
        assert j["name"] == "size"
        assert len(j["children"]) == 2
        assert j["children"][0]["value"] == "sm"

    def test_textarea_serializes(self):
        j = Textarea(placeholder="Enter text", name="body").to_json()
        assert j["type"] == "Textarea"
        assert j["placeholder"] == "Enter text"

    def test_label_serializes(self):
        j = Label("Username").to_json()
        assert j["type"] == "Label"
        assert j["text"] == "Username"

    def test_separator_serializes(self):
        j = Separator(orientation="vertical").to_json()
        assert j["type"] == "Separator"
        assert j["orientation"] == "vertical"

    def test_badge_serializes(self):
        j = Badge("New", variant="destructive").to_json()
        assert j["type"] == "Badge"
        assert j["label"] == "New"
        assert j["variant"] == "destructive"


# ---------------------------------------------------------------------------
# ForEach serialization
# ---------------------------------------------------------------------------


class TestForEachSerialization:
    def test_positional_key(self):
        fe = ForEach("items")
        assert fe.key == "items"

    def test_serializes_with_children(self):
        with ForEach("users") as fe:
            Text(content="{{ name }}")
        j = fe.to_json()
        assert j["type"] == "ForEach"
        assert j["key"] == "users"
        assert len(j["children"]) == 1
        assert j["children"][0]["content"] == "{{ name }}"

    def test_nested_children(self):
        with ForEach("users") as fe:
            with Column():
                Text(content="{{ name }}")
                Text(content="{{ email }}")
        j = fe.to_json()
        child = j["children"][0]
        assert child["type"] == "Column"
        assert len(child["children"]) == 2


# ---------------------------------------------------------------------------
# Phase 2 components
# ---------------------------------------------------------------------------


class TestProgressComponent:
    def test_progress_to_json(self):
        p = Progress(value=75)
        j = p.to_json()
        assert j["type"] == "Progress"
        assert j["value"] == 75

    def test_progress_with_max(self):
        p = Progress(value=3, max=10)
        j = p.to_json()
        assert j["value"] == 3
        assert j["max"] == 10


class TestMarkdownPositionalArg:
    def test_markdown_positional(self):
        m = Markdown("# Hello")
        assert m.content == "# Hello"

    def test_markdown_keyword(self):
        m = Markdown(content="**bold**")
        assert m.content == "**bold**"


class TestTableComponents:
    def test_table_structure(self):
        with Table() as table:
            TableCaption("Invoices")
            with TableHeader():
                with TableRow():
                    TableHead("Name")
                    TableHead("Amount")
            with TableBody():
                with TableRow():
                    TableCell("Alice")
                    TableCell("$100")

        j = table.to_json()
        assert j["type"] == "Table"
        assert len(j["children"]) == 3
        assert j["children"][0]["type"] == "TableCaption"
        assert j["children"][0]["content"] == "Invoices"
        assert j["children"][1]["type"] == "TableHeader"
        assert j["children"][2]["type"] == "TableBody"

    def test_table_cell_positional(self):
        c = TableCell("$250.00")
        j = c.to_json()
        assert j["content"] == "$250.00"

    def test_table_head_positional(self):
        h = TableHead("Name")
        j = h.to_json()
        assert j["content"] == "Name"

    def test_table_caption_positional(self):
        c = TableCaption("A list of items")
        j = c.to_json()
        assert j["content"] == "A list of items"


class TestDataTableComponent:
    def test_data_table_to_json(self):
        dt = DataTable(
            columns=[
                DataTableColumn(key="name", header="Name", sortable=True),
                DataTableColumn(key="email", header="Email"),
            ],
            rows=[{"name": "Alice", "email": "alice@example.com"}],
            searchable=True,
            paginated=True,
            page_size=25,
        )
        j = dt.to_json()
        assert j["type"] == "DataTable"
        assert len(j["columns"]) == 2
        assert j["columns"][0]["key"] == "name"
        assert j["columns"][0]["sortable"] is True
        assert j["columns"][1]["sortable"] is False
        assert j["searchable"] is True
        assert j["paginated"] is True
        assert j["pageSize"] == 25
        assert len(j["rows"]) == 1


class TestTabsComponents:
    def test_tabs_structure(self):
        with Tabs(default_value="general") as tabs:
            with Tab("General"):
                Text(content="General content")
            with Tab("Advanced", disabled=True):
                Text(content="Advanced content")

        j = tabs.to_json()
        assert j["type"] == "Tabs"
        assert j["defaultValue"] == "general"
        assert len(j["children"]) == 2
        assert j["children"][0]["type"] == "Tab"
        assert j["children"][0]["title"] == "General"
        assert j["children"][1]["disabled"] is True

    def test_tab_positional_title(self):
        t = Tab("Settings")
        assert t.title == "Settings"

    def test_tab_value_defaults_to_none(self):
        t = Tab("Settings")
        j = t.to_json()
        assert "value" not in j


class TestAccordionComponents:
    def test_accordion_structure(self):
        with Accordion(multiple=True) as acc:
            with AccordionItem("First"):
                Text(content="Content 1")
            with AccordionItem("Second"):
                Text(content="Content 2")

        j = acc.to_json()
        assert j["type"] == "Accordion"
        assert j["multiple"] is True
        assert len(j["children"]) == 2
        assert j["children"][0]["title"] == "First"

    def test_accordion_item_positional(self):
        item = AccordionItem("Getting Started")
        assert item.title == "Getting Started"

    def test_accordion_default_single(self):
        acc = Accordion()
        j = acc.to_json()
        assert j["multiple"] is False
        assert j["collapsible"] is True

    def test_accordion_default_open_items_int(self):
        with Accordion(default_open_items=0) as acc:
            with AccordionItem("First"):
                Text(content="Content 1")
            with AccordionItem("Second"):
                Text(content="Content 2")

        j = acc.to_json()
        assert j["defaultValues"] == ["First"]

    def test_accordion_default_open_items_list(self):
        with Accordion(multiple=True, default_open_items=[0, 1]) as acc:
            with AccordionItem("First"):
                Text(content="Content 1")
            with AccordionItem("Second"):
                Text(content="Content 2")

        j = acc.to_json()
        assert j["defaultValues"] == ["First", "Second"]

    def test_accordion_default_open_items_str(self):
        with Accordion(default_open_items="faq") as acc:
            with AccordionItem("FAQ", value="faq"):
                Text(content="Content")

        j = acc.to_json()
        assert j["defaultValues"] == ["faq"]


class TestPagesComponents:
    def test_pages_structure(self):
        with Pages(name="currentPage", default_value="home") as pages:
            with Page("Home"):
                Text(content="Home content")
            with Page("Settings"):
                Text(content="Settings content")

        j = pages.to_json()
        assert j["type"] == "Pages"
        assert j["name"] == "currentPage"
        assert j["defaultValue"] == "home"
        assert len(j["children"]) == 2
        assert j["children"][0]["title"] == "Home"

    def test_page_positional(self):
        p = Page("Profile")
        assert p.title == "Profile"


class TestTooltipComponent:
    def test_tooltip_to_json(self):
        with Tooltip("Save changes", side="top") as tip:
            Button(label="Save")

        j = tip.to_json()
        assert j["type"] == "Tooltip"
        assert j["content"] == "Save changes"
        assert j["side"] == "top"
        assert len(j["children"]) == 1

    def test_tooltip_positional(self):
        t = Tooltip("Hover text")
        assert t.content == "Hover text"


class TestPopoverComponent:
    def test_popover_to_json(self):
        p = Popover(title="Settings", description="Configure options")
        j = p.to_json()
        assert j["type"] == "Popover"
        assert j["title"] == "Settings"
        assert j["description"] == "Configure options"


class TestDialogComponent:
    def test_dialog_to_json(self):
        d = Dialog(title="Confirm", description="Are you sure?")
        j = d.to_json()
        assert j["type"] == "Dialog"
        assert j["title"] == "Confirm"
        assert j["description"] == "Are you sure?"


class TestCalendarComponent:
    def test_calendar_to_json(self):
        c = Calendar(name="selectedDate")
        j = c.to_json()
        assert j["type"] == "Calendar"
        assert j["name"] == "selectedDate"
        assert j["mode"] == "single"

    def test_calendar_range_mode(self):
        c = Calendar(mode="range", name="dateRange")
        j = c.to_json()
        assert j["mode"] == "range"


class TestDatePickerComponent:
    def test_date_picker_to_json(self):
        dp = DatePicker(placeholder="Select date", name="deadline")
        j = dp.to_json()
        assert j["type"] == "DatePicker"
        assert j["placeholder"] == "Select date"
        assert j["name"] == "deadline"

    def test_date_picker_default_placeholder(self):
        dp = DatePicker(name="date")
        j = dp.to_json()
        assert j["placeholder"] == "Pick a date"


# ---------------------------------------------------------------------------
# Input/Textarea constraint props
# ---------------------------------------------------------------------------


class TestInputConstraintProps:
    def test_input_min_max_length(self):
        j = Input(name="x", min_length=1, max_length=100).to_json()
        assert j["minLength"] == 1
        assert j["maxLength"] == 100

    def test_input_number_constraints(self):
        j = Input(input_type="number", name="age", min=0, max=150, step=1).to_json()
        assert j["min"] == 0
        assert j["max"] == 150
        assert j["step"] == 1

    def test_input_pattern(self):
        j = Input(name="code", pattern=r"[A-Z]{3}").to_json()
        assert j["pattern"] == "[A-Z]{3}"

    def test_constraint_props_excluded_when_none(self):
        j = Input(name="x").to_json()
        assert "minLength" not in j
        assert "maxLength" not in j
        assert "min" not in j
        assert "max" not in j
        assert "step" not in j
        assert "pattern" not in j

    def test_textarea_min_max_length(self):
        j = Textarea(name="bio", min_length=10, max_length=500).to_json()
        assert j["minLength"] == 10
        assert j["maxLength"] == 500


# ---------------------------------------------------------------------------
# Slot component
# ---------------------------------------------------------------------------


class TestSlotComponent:
    def test_slot_positional_name(self):
        s = Slot("detail_view")
        j = s.to_json()
        assert j["type"] == "Slot"
        assert j["name"] == "detail_view"

    def test_slot_no_children_excluded(self):
        j = Slot("chart").to_json()
        assert "children" not in j

    def test_slot_with_fallback_children(self):
        with Slot("chart") as s:
            Text(content="No chart loaded")

        j = s.to_json()
        assert j["type"] == "Slot"
        assert j["name"] == "chart"
        assert len(j["children"]) == 1
        assert j["children"][0]["type"] == "Text"
        assert j["children"][0]["content"] == "No chart loaded"

    def test_slot_with_css_class(self):
        j = Slot("content", css_class="min-h-40").to_json()
        assert j["cssClass"] == "min-h-40"

    def test_slot_in_container(self):
        with Column() as col:
            Text(content="Header")
            Slot("dynamic_content")

        j = col.to_json()
        assert len(j["children"]) == 2
        assert j["children"][1]["type"] == "Slot"
        assert j["children"][1]["name"] == "dynamic_content"


# ---------------------------------------------------------------------------
# Div / Span style prop
# ---------------------------------------------------------------------------


class TestDivStyle:
    def test_style_serializes(self):
        d = Div(
            style={"mask-image": "linear-gradient(to bottom, black 70%, transparent)"}
        )
        j = d.to_json()
        assert j["style"] == {
            "mask-image": "linear-gradient(to bottom, black 70%, transparent)"
        }

    def test_style_excluded_when_none(self):
        d = Div()
        j = d.to_json()
        assert "style" not in j

    def test_style_alongside_css_class(self):
        d = Div(css_class="overflow-hidden", style={"max-height": "800px"})
        j = d.to_json()
        assert j["cssClass"] == "overflow-hidden"
        assert j["style"] == {"max-height": "800px"}


class TestSpanStyle:
    def test_style_serializes(self):
        s = Span("hello", style={"color": "red"})
        j = s.to_json()
        assert j["style"] == {"color": "red"}

    def test_style_excluded_when_none(self):
        s = Span("hello")
        j = s.to_json()
        assert "style" not in j


class TestTextAlign:
    @pytest.mark.parametrize("cls", [Text, H1, P, Heading], ids=lambda c: c.__name__)
    def test_align_compiles_to_css_class(self, cls):
        if cls is Heading:
            t = cls("hello", level=2, align="center")
        else:
            t = cls("hello", align="center")
        assert t.css_class == "text-center"

    @pytest.mark.parametrize("value", ["left", "center", "right", "justify"])
    def test_all_values(self, value):
        t = Text("hello", align=value)
        assert t.css_class == f"text-{value}"

    def test_align_excluded_from_json(self):
        t = Text("hello", align="center")
        j = t.to_json()
        assert "align" not in j
        assert j["cssClass"] == "text-center"

    def test_align_merges_with_css_class(self):
        t = Text("hello", align="center", css_class="font-bold")
        assert "text-center" in (t.css_class or "")
        assert "font-bold" in (t.css_class or "")

    def test_no_align_no_css_class(self):
        t = Text("hello")
        assert t.css_class is None

    def test_heading_inherits_bold_italic(self):
        h = Heading("title", level=1, bold=True, italic=True)
        j = h.to_json()
        assert j["bold"] is True
        assert j["italic"] is True
