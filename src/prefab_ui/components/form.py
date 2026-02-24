"""Form component with Pydantic model integration.

Forms group inputs with labels. The ``from_model()`` classmethod generates
a complete form from a Pydantic model's field definitions, using Pydantic
``Field()`` metadata for labels, descriptions, constraints, and UI hints.

Example::

    from pydantic import BaseModel, Field
    from prefab_ui.components import Form

    class UserProfile(BaseModel):
        name: str = Field(title="Full Name", min_length=1)
        email: str
        age: int = Field(ge=0, le=150)
        active: bool = True

    Form.from_model(UserProfile, on_submit=CallTool("save_profile"))
"""

from __future__ import annotations

import datetime
import types
from typing import Any, Literal, Union, get_args, get_origin, overload

import annotated_types
from pydantic import BaseModel, Field, SecretStr
from pydantic.fields import FieldInfo
from pydantic_core import PydanticUndefined

from prefab_ui.actions import Action
from prefab_ui.actions.mcp import CallTool
from prefab_ui.actions.ui import ShowToast
from prefab_ui.components.base import (
    ContainerComponent,
    _compile_layout_classes,
    _merge_css_classes,
    defer,
)


class Form(ContainerComponent):
    """Form container that groups labeled inputs.

    Use ``Form.from_model()`` to auto-generate a form from a Pydantic model,
    or build forms manually with context-manager syntax.

    Example::

        with Form():
            Label("Name")
            Input(name="name", placeholder="Your name")
            Button("Submit", on_click=CallTool("save"))
    """

    type: Literal["Form"] = "Form"
    gap: int = Field(default=4, exclude=True)
    on_submit: Action | list[Action] | None = Field(
        default=None,
        alias="onSubmit",
        description="Action(s) to execute when the form is submitted",
    )

    def model_post_init(self, __context: Any) -> None:
        layout = _compile_layout_classes(gap=self.gap)
        self.css_class = _merge_css_classes(layout, self.css_class)
        super().model_post_init(__context)

    @overload
    @classmethod
    def from_model(
        cls,
        model: type[BaseModel],
        *,
        fields_only: Literal[True],
        submit_label: str = "Submit",
        on_submit: Action | list[Action] | None = None,
        css_class: str | None = None,
    ) -> list[Any]: ...

    @overload
    @classmethod
    def from_model(
        cls,
        model: type[BaseModel],
        *,
        fields_only: Literal[False] = ...,
        submit_label: str = "Submit",
        on_submit: Action | list[Action] | None = None,
        css_class: str | None = None,
    ) -> Form: ...

    @classmethod
    def from_model(
        cls,
        model: type[BaseModel],
        *,
        fields_only: bool = False,
        submit_label: str = "Submit",
        on_submit: Action | list[Action] | None = None,
        css_class: str | None = None,
    ) -> Form | list[Any]:
        """Generate a form from a Pydantic model.

        Introspects the model's fields and creates appropriate input
        components for each, using Pydantic ``Field()`` metadata:

        - ``title`` → label text (falls back to humanized field name)
        - ``description`` → placeholder / help text
        - ``min_length`` / ``max_length`` → HTML input constraints
        - ``ge`` / ``le`` / ``gt`` / ``lt`` → number min/max
        - ``json_schema_extra={"ui": {"type": "textarea"}}`` → textarea
        - ``SecretStr`` → password input
        - ``exclude=True`` → skip field

        Type mapping:

        - ``str`` → text input (email/password/tel/url detected by name)
        - ``int`` / ``float`` → number input
        - ``bool`` → checkbox
        - ``datetime.date`` → date input
        - ``datetime.time`` → time input
        - ``datetime.datetime`` → datetime-local input
        - ``Literal[...]`` → select dropdown
        - ``SecretStr`` → password input

        When ``on_submit`` is a single ``CallTool`` with no ``arguments``,
        arguments are auto-filled from the model's fields under a ``data``
        key. This enables the self-calling tool pattern::

            Form.from_model(Contact, on_submit=CallTool("create_contact"))
            # auto-generates: arguments={"data": {"name": "{{ name }}", ...}}

        A default ``on_error`` toast is added if not already specified.

        When ``fields_only=True``, only the field components (labeled
        inputs) are created — no ``Form`` wrapper and no submit button.
        The fields auto-parent to whatever context manager is active,
        letting you compose them into custom layouts::

            with Form(on_submit=CallTool("save")):
                with CardContent():
                    Form.from_model(Contact, fields_only=True)
                with CardFooter():
                    Button("Submit")

        Args:
            model: Pydantic model class to generate from.
            fields_only: If True, generate only field components without
                a Form wrapper or submit button. Returns a list of the
                created components.
            submit_label: Text for the submit button.
            on_submit: Action(s) fired on submit. A ``CallTool`` with no
                arguments gets auto-filled from model fields.
            css_class: Additional CSS classes on the form container.
        """
        from prefab_ui.components.base import _component_stack
        from prefab_ui.components.button import Button

        if fields_only:
            # Suppress auto-parenting during creation to avoid duplicates
            # (Labels/Inputs would otherwise auto-parent to both the
            # Column AND the outer context). Then manually add the
            # top-level field components to the active context.
            saved_stack = _component_stack.get()
            with defer():
                children: list[Any] = []
                for name, field_info in model.model_fields.items():
                    component = _field_to_component(name, field_info)
                    if component is not None:
                        children.append(component)

            if saved_stack:
                for child in children:
                    saved_stack[-1].children.append(child)

            return children

        on_submit = _maybe_enrich_tool_call(on_submit, model)

        # Form is created with the stack active so it auto-parents to any
        # outer context manager (e.g. ``with Card(): Form.from_model(...)``).
        form = cls(on_submit=on_submit, css_class=css_class)

        # Suppress auto-parenting while building internal components so
        # they don't also get auto-added to the outer container.
        with defer():
            children = []

            for name, field_info in model.model_fields.items():
                component = _field_to_component(name, field_info)
                if component is not None:
                    children.append(component)

            if on_submit is not None:
                children.append(Button(submit_label, on_click=on_submit))

        form.children = children
        return form


def _maybe_enrich_tool_call(
    on_submit: Action | list[Action] | None,
    model: type[BaseModel],
) -> Action | list[Action] | None:
    """Auto-fill CallTool arguments from model fields when empty.

    Only triggers when on_submit is a single CallTool with no arguments.
    Wraps field templates under a ``data`` key so the receiving tool gets
    ``data: Model`` as a single parameter.
    """
    if not isinstance(on_submit, CallTool):
        return on_submit
    if on_submit.arguments:
        return on_submit

    field_templates = {
        name: "{{ " + name + " }}"
        for name in model.model_fields
        if not (model.model_fields[name].exclude)
    }

    kwargs: dict[str, Any] = {
        "tool": on_submit.tool,
        "arguments": {"data": field_templates},
    }
    if on_submit.result_key is not None:
        kwargs["result_key"] = on_submit.result_key
    if on_submit.on_success is not None:
        kwargs["on_success"] = on_submit.on_success
    if on_submit.on_error is not None:
        kwargs["on_error"] = on_submit.on_error
    else:
        kwargs["on_error"] = ShowToast("{{ $error }}", variant="error")

    return CallTool(**kwargs)


def _humanize(name: str) -> str:
    """Convert snake_case field name to Title Case label."""
    return name.replace("_", " ").title()


def _unwrap_optional(annotation: Any) -> tuple[Any, bool]:
    """Strip Optional/Union[X, None] wrapper, returning (inner_type, is_optional)."""
    origin = get_origin(annotation)
    if origin is Union or origin is types.UnionType:
        args = [a for a in get_args(annotation) if a is not type(None)]
        if len(args) == 1:
            return args[0], True
    return annotation, False


def _is_literal(annotation: Any) -> bool:
    return get_origin(annotation) is Literal


def _extract_constraints(field_info: FieldInfo) -> dict[str, Any]:
    """Extract numeric and string constraints from Pydantic field metadata."""
    constraints: dict[str, Any] = {}
    for meta in field_info.metadata:
        if isinstance(meta, annotated_types.MinLen):
            constraints["min_length"] = meta.min_length
        elif isinstance(meta, annotated_types.MaxLen):
            constraints["max_length"] = meta.max_length
        elif isinstance(meta, annotated_types.Ge):
            constraints["min"] = meta.ge
        elif isinstance(meta, annotated_types.Le):
            constraints["max"] = meta.le
        elif isinstance(meta, annotated_types.Gt):
            constraints["min"] = meta.gt
        elif isinstance(meta, annotated_types.Lt):
            constraints["max"] = meta.lt
        elif isinstance(meta, annotated_types.MultipleOf):
            constraints["step"] = meta.multiple_of
        elif hasattr(meta, "pattern") and not isinstance(meta, type):
            constraints["pattern"] = meta.pattern
    return constraints


def _get_ui_hints(field_info: FieldInfo) -> dict[str, Any]:
    """Extract UI hints from json_schema_extra."""
    extra = field_info.json_schema_extra
    if isinstance(extra, dict):
        ui = extra.get("ui")  # type: ignore[union-attr]
        if isinstance(ui, dict):
            return ui
    return {}


def _field_to_component(name: str, field_info: FieldInfo) -> Any:
    """Map a single Pydantic field to the appropriate form component(s)."""
    from prefab_ui.components.checkbox import Checkbox
    from prefab_ui.components.column import Column
    from prefab_ui.components.input import Input
    from prefab_ui.components.label import Label
    from prefab_ui.components.select import Select, SelectOption
    from prefab_ui.components.textarea import Textarea

    annotation = field_info.annotation
    if annotation is None:
        return None

    if field_info.exclude:
        return None

    inner, is_optional = _unwrap_optional(annotation)
    required = not is_optional and field_info.is_required()

    label_text = field_info.title or _humanize(name)
    placeholder = field_info.description or label_text
    default = (
        field_info.default if field_info.default is not PydanticUndefined else None
    )
    constraints = _extract_constraints(field_info)
    ui_hints = _get_ui_hints(field_info)

    # UI hint override: textarea
    if ui_hints.get("type") == "textarea":
        rows = ui_hints.get("rows")
        value = str(default) if isinstance(default, str) else None
        col = Column(gap=2)
        col.children = [
            Label(label_text),
            Textarea(
                name=name,
                placeholder=placeholder,
                value=value,
                rows=rows,
                required=required,
                min_length=constraints.get("min_length"),
                max_length=constraints.get("max_length"),
            ),
        ]
        return col

    # Literal → Select dropdown
    if _is_literal(inner):
        options = get_args(inner)
        select = Select(name=name, placeholder=placeholder, required=required)
        for opt in options:
            opt_str = str(opt)
            select.children.append(
                SelectOption(
                    value=opt_str,
                    label=_humanize(opt_str),
                    selected=default == opt,
                )
            )
        col = Column(gap=2)
        col.children = [Label(label_text), select]
        return col

    # bool → Checkbox
    if inner is bool:
        checked = bool(default) if default is not None else False
        return Checkbox(label=label_text, name=name, checked=checked)

    # SecretStr → password input
    if inner is SecretStr:
        col = Column(gap=2)
        col.children = [
            Label(label_text),
            Input(
                input_type="password",
                name=name,
                placeholder=placeholder,
                required=required,
                min_length=constraints.get("min_length"),
                max_length=constraints.get("max_length"),
            ),
        ]
        return col

    # date/time types → specialized input
    if inner is datetime.date:
        col = Column(gap=2)
        col.children = [
            Label(label_text),
            Input(input_type="date", name=name, required=required),
        ]
        return col

    if inner is datetime.time:
        col = Column(gap=2)
        col.children = [
            Label(label_text),
            Input(input_type="time", name=name, required=required),
        ]
        return col

    if inner is datetime.datetime:
        col = Column(gap=2)
        col.children = [
            Label(label_text),
            Input(input_type="datetime-local", name=name, required=required),
        ]
        return col

    # int / float → number input
    if inner in (int, float):
        value = str(default) if default is not None else None
        col = Column(gap=2)
        col.children = [
            Label(label_text),
            Input(
                input_type="number",
                name=name,
                placeholder=placeholder,
                value=value,
                required=required,
                min=constraints.get("min"),
                max=constraints.get("max"),
                step=constraints.get("step"),
            ),
        ]
        return col

    # Skip unsupported complex types (lists, dicts, nested models)
    origin = get_origin(inner)
    if origin in (list, dict, set, frozenset, tuple):
        return None
    if isinstance(inner, type) and issubclass(inner, BaseModel):
        return None

    # str (default) → text input, detect email by field name
    input_type = "text"
    if "email" in name.lower():
        input_type = "email"
    elif "password" in name.lower():
        input_type = "password"
    elif "phone" in name.lower() or "tel" in name.lower():
        input_type = "tel"
    elif "url" in name.lower() or "website" in name.lower():
        input_type = "url"

    value = str(default) if isinstance(default, str) else None
    col = Column(gap=2)
    col.children = [
        Label(label_text),
        Input(
            input_type=input_type,
            name=name,
            placeholder=placeholder,
            value=value,
            required=required,
            min_length=constraints.get("min_length"),
            max_length=constraints.get("max_length"),
            pattern=constraints.get("pattern"),
        ),
    ]
    return col
