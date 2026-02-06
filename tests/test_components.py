"""Tests for Prefab component serialization and context-manager nesting."""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field, SecretStr

from prefab_ui.actions import (
    SetState,
    ShowToast,
)
from prefab_ui.actions.mcp import ToolCall
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
    DataTable,
    DataTableColumn,
    DatePicker,
    Dialog,
    ForEach,
    Form,
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
        j = Input(type="email", placeholder="you@example.com", name="email").to_json()
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
# Form component + from_model
# ---------------------------------------------------------------------------


class TestFormComponent:
    def test_form_serializes_as_container(self):
        with Form() as f:
            Label("Name")
            Input(name="name")
        j = f.to_json()
        assert j["type"] == "Form"
        assert j["gap"] == 4
        assert len(j["children"]) == 2

    def test_from_model_basic_fields(self):
        class Profile(BaseModel):
            name: str
            age: int
            active: bool = True

        form = Form.from_model(Profile)
        j = form.to_json()
        assert j["type"] == "Form"
        assert len(j["children"]) == 3

        name_col = j["children"][0]
        assert name_col["type"] == "Column"
        assert name_col["children"][0]["type"] == "Label"
        assert name_col["children"][1]["inputType"] == "text"
        assert name_col["children"][1]["name"] == "name"

        age_col = j["children"][1]
        assert age_col["children"][1]["inputType"] == "number"

        checkbox = j["children"][2]
        assert checkbox["type"] == "Checkbox"
        assert checkbox["checked"] is True

    def test_from_model_email_detection(self):
        class Contact(BaseModel):
            email: str

        form = Form.from_model(Contact)
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["inputType"] == "email"

    def test_from_model_literal_becomes_select(self):
        class Pref(BaseModel):
            size: Literal["sm", "md", "lg"]

        form = Form.from_model(Pref)
        j = form.to_json()
        col = j["children"][0]
        select = col["children"][1]
        assert select["type"] == "Select"
        assert len(select["children"]) == 3
        assert select["children"][0]["value"] == "sm"

    def test_from_model_with_submit(self):
        class Simple(BaseModel):
            name: str

        form = Form.from_model(Simple, on_submit=ToolCall("save"))
        j = form.to_json()
        assert len(j["children"]) == 2
        assert j["children"][1]["type"] == "Button"
        assert j["children"][1]["label"] == "Submit"

    def test_from_model_date_field(self):
        import datetime

        class Event(BaseModel):
            date: datetime.date
            time: datetime.time

        form = Form.from_model(Event)
        j = form.to_json()
        assert j["children"][0]["children"][1]["inputType"] == "date"
        assert j["children"][1]["children"][1]["inputType"] == "time"


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
        with Accordion(accordion_type="multiple") as acc:
            with AccordionItem("First"):
                Text(content="Content 1")
            with AccordionItem("Second"):
                Text(content="Content 2")

        j = acc.to_json()
        assert j["type"] == "Accordion"
        assert j["accordionType"] == "multiple"
        assert len(j["children"]) == 2
        assert j["children"][0]["title"] == "First"

    def test_accordion_item_positional(self):
        item = AccordionItem("Getting Started")
        assert item.title == "Getting Started"

    def test_accordion_default_single(self):
        acc = Accordion()
        j = acc.to_json()
        assert j["accordionType"] == "single"
        assert j["collapsible"] is True


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
# visible_when
# ---------------------------------------------------------------------------


class TestVisibleWhen:
    def test_visible_when_serializes(self):
        t = Text(content="Secret", visible_when="showSecret")
        j = t.to_json()
        assert j["visibleWhen"] == "showSecret"

    def test_visible_when_excluded_when_none(self):
        t = Text(content="Always visible")
        j = t.to_json()
        assert "visibleWhen" not in j


# ---------------------------------------------------------------------------
# Input/Textarea constraint props
# ---------------------------------------------------------------------------


class TestInputConstraintProps:
    def test_input_min_max_length(self):
        j = Input(name="x", min_length=1, max_length=100).to_json()
        assert j["minLength"] == 1
        assert j["maxLength"] == 100

    def test_input_number_constraints(self):
        j = Input(type="number", name="age", min=0, max=150, step=1).to_json()
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
# from_model() metadata enrichment
# ---------------------------------------------------------------------------


class TestFromModelMetadata:
    def test_title_becomes_label(self):
        class M(BaseModel):
            name: str = Field(title="Full Name")

        form = Form.from_model(M)
        j = form.to_json()
        label = j["children"][0]["children"][0]
        assert label["text"] == "Full Name"

    def test_description_becomes_placeholder(self):
        class M(BaseModel):
            name: str = Field(description="Enter your name")

        form = Form.from_model(M)
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["placeholder"] == "Enter your name"

    def test_secret_str_becomes_password(self):
        class M(BaseModel):
            password: SecretStr

        form = Form.from_model(M)
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["inputType"] == "password"

    def test_min_length_constraint(self):
        class M(BaseModel):
            name: str = Field(min_length=1, max_length=50)

        form = Form.from_model(M)
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["minLength"] == 1
        assert input_j["maxLength"] == 50

    def test_ge_le_constraints_on_number(self):
        class M(BaseModel):
            age: int = Field(ge=0, le=150)

        form = Form.from_model(M)
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["min"] == 0
        assert input_j["max"] == 150

    def test_json_schema_extra_textarea(self):
        class M(BaseModel):
            bio: str = Field(
                default="",
                json_schema_extra={"ui": {"type": "textarea", "rows": 5}},
            )

        form = Form.from_model(M)
        j = form.to_json()
        textarea = j["children"][0]["children"][1]
        assert textarea["type"] == "Textarea"
        assert textarea["rows"] == 5

    def test_excluded_field_skipped(self):
        class M(BaseModel):
            visible: str
            hidden: str = Field(exclude=True)

        form = Form.from_model(M)
        j = form.to_json()
        assert len(j["children"]) == 1

    def test_required_field_detection(self):
        class M(BaseModel):
            required_field: str
            optional_field: str = "default"

        form = Form.from_model(M)
        j = form.to_json()
        required_input = j["children"][0]["children"][1]
        optional_input = j["children"][1]["children"][1]
        assert required_input.get("required") is True
        assert optional_input.get("required") is not True

    def test_list_field_skipped(self):
        class M(BaseModel):
            name: str
            tags: list[str] = []

        form = Form.from_model(M)
        j = form.to_json()
        assert len(j["children"]) == 1

    def test_nested_model_field_skipped(self):
        class Address(BaseModel):
            street: str

        class M(BaseModel):
            name: str
            address: Address | None = None

        form = Form.from_model(M)
        j = form.to_json()
        assert len(j["children"]) == 1


# ---------------------------------------------------------------------------
# Auto-fill convention
# ---------------------------------------------------------------------------


class TestAutoFillConvention:
    def test_empty_toolcall_gets_auto_filled(self):
        class Contact(BaseModel):
            name: str
            email: str

        form = Form.from_model(Contact, on_submit=ToolCall("save"))
        j = form.to_json()
        on_submit = j["onSubmit"]
        assert on_submit["action"] == "toolCall"
        assert on_submit["tool"] == "save"
        assert on_submit["arguments"] == {
            "data": {"name": "{{ name }}", "email": "{{ email }}"}
        }

    def test_explicit_arguments_preserved(self):
        class Contact(BaseModel):
            name: str

        form = Form.from_model(
            Contact,
            on_submit=ToolCall("save", arguments={"custom": "value"}),
        )
        j = form.to_json()
        assert j["onSubmit"]["arguments"] == {"custom": "value"}

    def test_default_on_error_added(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=ToolCall("save"))
        j = form.to_json()
        on_error = j["onSubmit"]["onError"]
        assert on_error["action"] == "showToast"
        assert on_error["message"] == "{{ $error }}"
        assert on_error["variant"] == "error"

    def test_explicit_on_error_preserved(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(
            M,
            on_submit=ToolCall(
                "save",
                on_error=ShowToast("Custom error"),
            ),
        )
        j = form.to_json()
        assert j["onSubmit"]["onError"]["message"] == "Custom error"

    def test_callbacks_preserved(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(
            M,
            on_submit=ToolCall(
                "save",
                result_key="result",
                on_success=ShowToast("Saved!"),
            ),
        )
        j = form.to_json()
        assert j["onSubmit"]["resultKey"] == "result"
        assert j["onSubmit"]["onSuccess"]["message"] == "Saved!"

    def test_action_list_not_auto_filled(self):
        class M(BaseModel):
            name: str

        actions = [SetState("loading", True), ToolCall("save")]
        form = Form.from_model(M, on_submit=actions)
        j = form.to_json()
        assert j["onSubmit"][0]["action"] == "setState"

    def test_non_toolcall_not_auto_filled(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=ShowToast("hi"))
        j = form.to_json()
        assert j["onSubmit"]["action"] == "showToast"

    def test_excluded_fields_not_in_arguments(self):
        class M(BaseModel):
            name: str
            internal: str = Field(exclude=True)

        form = Form.from_model(M, on_submit=ToolCall("save"))
        j = form.to_json()
        assert "internal" not in j["onSubmit"]["arguments"]["data"]

    def test_button_gets_same_action(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=ToolCall("save"))
        j = form.to_json()
        button = j["children"][-1]
        assert button["type"] == "Button"
        assert button["onClick"]["tool"] == "save"
        assert "data" in button["onClick"]["arguments"]

    def test_form_on_submit_set(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=ToolCall("save"))
        j = form.to_json()
        assert j["onSubmit"]["tool"] == "save"
