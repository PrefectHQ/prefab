"""Base classes for MCP Apps UI components."""

from __future__ import annotations

import contextlib
import re
from collections.abc import Generator
from contextlib import contextmanager
from contextvars import ContextVar
from typing import Annotated, Any, ClassVar, Literal

from pydantic import BaseModel, BeforeValidator, Field, model_validator
from typing_extensions import Self

from prefab_ui.css import Responsive
from prefab_ui.rx import Rx, _coerce_rx, _generate_key

_component_stack: ContextVar[list[ContainerComponent] | None] = ContextVar(
    "_component_stack", default=None
)
_defer_next_component: ContextVar[bool] = ContextVar(
    "_defer_next_component", default=False
)


@contextmanager
def defer() -> Generator[None, None, None]:
    """Create components without attaching them to the current parent.

    Components created inside a ``defer()`` block are **not** automatically
    appended as children to any enclosing context manager.  Use
    :func:`insert` later to place them in the tree::

        with Column() as outer:
            with defer():
                sidebar = Column()
                with sidebar:
                    Text("child of sidebar, not outer")
            insert(sidebar)

        assert len(outer.children) == 2
    """
    saved = _component_stack.get()
    _component_stack.set(None)
    try:
        yield
    finally:
        _component_stack.set(saved)


def insert(component: Component) -> Component:
    """Insert a deferred component into the current parent context.

    Use this to place a component that was created outside the tree
    (either before any ``with`` block or inside a ``defer()`` block)
    as a child of the current container::

        volume = Slider(value=75, defer=True)

        with Column():
            Text(f"{volume.rx.number()}%")
            insert(volume)  # volume becomes a child of Column here

    Raises :class:`RuntimeError` if called outside a container context
    or if the component is already a child of another container.
    """
    stack = _component_stack.get() or []
    if not stack:
        raise RuntimeError(
            "insert() must be called inside a container context manager "
            "(e.g. inside a `with Column():` block)"
        )

    # Check if already attached to a parent
    for parent in stack:
        if any(c is component for c in parent.children):
            raise RuntimeError(
                "This component is already a child of a container. "
                "Use model_copy() to create an independent copy."
            )

    stack[-1].children.append(component)
    return component


# ── Gap / Align / Justify ──────────────────────────────────────────────


def _coerce_gap(v: Any) -> int | tuple[int | None, int | None] | Responsive | None:
    """Normalize gap values: None, int, (int,), (x, y), or Responsive."""
    if v is None or isinstance(v, Responsive):
        return v
    if isinstance(v, (list, tuple)):
        if len(v) == 1:
            return int(v[0])
        if len(v) == 2:
            x = int(v[0]) if v[0] is not None else None
            y = int(v[1]) if v[1] is not None else None
            return (x, y)
        raise ValueError("gap must have 1 or 2 values")
    return int(v)


Gap = Annotated[
    int | tuple[int | None, int | None] | Responsive | None,
    BeforeValidator(_coerce_gap),
]

Align = Literal["start", "center", "end", "stretch", "baseline"] | None

Justify = (
    Literal["start", "center", "end", "between", "around", "evenly", "stretch"] | None
)


# ── Layout class compilation ───────────────────────────────────────────


def _gap_classes(gap: int | tuple[int | None, int | None]) -> str:
    """Return Tailwind gap classes for a plain gap value."""
    if isinstance(gap, tuple):
        parts: list[str] = []
        x, y = gap
        if x is not None:
            parts.append(f"gap-x-{x}")
        if y is not None:
            parts.append(f"gap-y-{y}")
        return " ".join(parts)
    return f"gap-{gap}"


def _compile_layout_classes(
    *,
    gap: int | tuple[int | None, int | None] | Responsive | None = None,
    columns: int | dict[str, int] | Responsive | None = None,
    align: str | None = None,
    justify: str | None = None,
) -> str | None:
    """Compile layout kwargs to a Tailwind class string."""
    parts: list[str] = []

    # Gap
    if gap is not None:
        if isinstance(gap, Responsive):
            parts.append(gap.compile_css(_gap_classes))
        else:
            parts.append(_gap_classes(gap))

    # Columns
    if columns is not None:
        if isinstance(columns, Responsive):
            parts.append(columns.compile_css(lambda n: f"grid-cols-{n}"))
        elif isinstance(columns, dict):
            parts.append(Responsive(**columns).compile_css(lambda n: f"grid-cols-{n}"))
        else:
            parts.append(f"grid-cols-{columns}")

    if align is not None:
        parts.append(f"items-{align}")
    if justify is not None:
        parts.append(f"justify-{justify}")
    return " ".join(parts) if parts else None


def _merge_css_classes(*classes: str | None) -> str | None:
    """Merge multiple class strings, returning None if empty."""
    merged = " ".join(c for c in classes if c)
    return merged or None


def _coerce_css_class(v: Any) -> str | None:
    """Compile css_class to a flat string.

    Accepts a plain string, a Responsive object, or a list mixing both.
    """
    if v is None:
        return None
    if isinstance(v, list):
        parts: list[str] = []
        for item in v:
            if isinstance(item, Responsive):
                compiled = item.compile_css(lambda s: str(s))
                if compiled:
                    parts.append(compiled)
            elif item:
                parts.append(str(item))
        return " ".join(parts) or None
    if isinstance(v, Responsive):
        compiled = v.compile_css(lambda s: str(s))
        return compiled or None
    return str(v)


_VALID_STATE_KEY = re.compile(r"^[a-zA-Z_$][a-zA-Z0-9_$]*$")


class StatefulMixin:
    """Mixin for components that support reactive state binding via ``.rx``.

    Stateful components (Slider, Input, Checkbox, etc.) inherit from this
    mixin to gain the ``.rx`` property, which returns an ``Rx`` object
    serializing to ``{{ name }}`` for template expressions.
    """

    _auto_name: ClassVar[str]

    def __init_subclass__(cls, **kwargs: Any) -> None:
        super().__init_subclass__(**kwargs)

    def _validate_state_key_name(self) -> None:
        """Raise ValueError if name is not a valid expression identifier."""
        name: str | None = getattr(self, "name", None)
        if name is not None and not _VALID_STATE_KEY.match(name):
            raise ValueError(
                f"Invalid state key name {name!r}: must be a valid identifier "
                f"(letters, digits, underscores — no hyphens). "
                f"'{{{{ {name} }}}}' would be parsed as arithmetic."
            )

    @property
    def rx(self) -> Rx:
        """Reactive reference to this component's state value.

        Returns an ``Rx`` object that serializes to ``{{ key }}`` and can
        be passed to any string-typed component field or used in f-strings.
        """
        name: str | None = getattr(self, "name", None)
        if name is None:
            raise ValueError(
                f"{type(self).__name__}.rx requires a name — "
                f"set _auto_name on the class or pass name= explicitly"
            )
        return Rx(name)


class Component(BaseModel):
    """Base class for all UI components.

    Components serialize to JSON via ``to_json()`` for the React renderer.
    When created inside a ``ContainerComponent`` context manager, they
    automatically append themselves to the parent's children list.
    """

    model_config = {"populate_by_name": True, "arbitrary_types_allowed": True}

    _auto_name: ClassVar[str | None] = None
    """Subclasses set this to a prefix string (e.g. ``"slider"``) to opt in
    to automatic name generation.  When set, components without an explicit
    ``name`` receive a deterministic sequential key like ``slider-1``."""

    css_class: Annotated[str | None, BeforeValidator(_coerce_css_class)] = Field(
        default=None,
        alias="cssClass",
        description="CSS/Tailwind classes for styling. Accepts a Responsive() for breakpoint-aware classes.",
    )

    @model_validator(mode="before")
    @classmethod
    def _coerce_rx_values(cls, data: Any) -> Any:
        """Recursively convert any Rx values in the input dict to strings.

        Also extracts the ``defer`` kwarg (not a model field) and stores it
        in ``_deferred`` for :meth:`model_post_init` to check.
        """
        if isinstance(data, dict):
            data = {k: _coerce_rx(v) for k, v in data.items()}
            if data.pop("defer", False):
                _defer_next_component.set(True)
        return data

    def model_post_init(self, __context: Any) -> None:
        # Auto-generate name for stateful components when not provided
        if self._auto_name is not None and "name" in type(self).model_fields:
            if getattr(self, "name", None) is None:
                object.__setattr__(self, "name", _generate_key(self._auto_name))

        # Validate state key names on stateful components
        if isinstance(self, StatefulMixin):
            self._validate_state_key_name()

        # Skip auto-attach when defer=True was passed
        if _defer_next_component.get():
            _defer_next_component.set(False)
            return

        stack = _component_stack.get() or []
        if stack:
            stack[-1].children.append(self)

    def to_json(self) -> dict[str, Any]:
        """Serialize to JSON format for the React renderer.

        Produces ``{"type": "ClassName", ...props}`` with ``None`` values
        excluded. Children are serialized recursively.
        """
        return self.model_dump(by_alias=True, exclude_none=True)


class ContainerComponent(Component):
    """Component that can contain child components.

    Use as a context manager to build nested layouts::

        with Column():
            Text("hello")
            Text("world")
    """

    children: list[Component] = Field(default_factory=list)
    let: dict[str, Any] | None = Field(
        default=None,
        description="Scoped bindings available to children. Values are template strings.",
    )

    def model_post_init(self, __context: Any) -> None:
        # When children= is passed explicitly, those children were already
        # auto-attached to the *outer* stack parent during their own __init__.
        # Remove them from that parent so they only belong to this component.
        stack = _component_stack.get() or []
        if stack and self.children:
            parent_children = stack[-1].children
            for child in self.children:
                with contextlib.suppress(ValueError):
                    parent_children.remove(child)
        super().model_post_init(__context)

    def __enter__(self) -> Self:
        stack = _component_stack.get() or []
        _component_stack.set([*stack, self])
        return self

    def __exit__(self, *args: Any) -> None:
        stack = _component_stack.get() or []
        _component_stack.set(stack[:-1])

    def to_json(self) -> dict[str, Any]:
        d = super().to_json()
        # model_dump includes children=[] (not None), so always replace with
        # recursive serialization or remove the key when empty.
        d.pop("children", None)
        if self.children:
            d["children"] = _serialize_children(self.children)
        return d


def _to_case(node: Component) -> dict[str, Any]:
    """Convert an If or Elif node to a Condition case entry."""
    condition = getattr(node, "condition", "")
    stripped = condition.strip()
    if not (stripped.startswith("{{") and stripped.endswith("}}")):
        condition = f"{{{{ {condition} }}}}"
    case: dict[str, Any] = {"when": condition}
    children = getattr(node, "children", [])
    if children:
        case["children"] = _serialize_children(children)
    return case


def _serialize_children(children: list[Component]) -> list[dict[str, Any]]:
    """Serialize children, grouping If/Elif/Else chains into Condition nodes."""
    result: list[dict[str, Any]] = []
    i = 0
    while i < len(children):
        child = children[i]
        child_type = getattr(child, "type", None)

        if child_type == "If":
            cases: list[dict[str, Any]] = [_to_case(child)]
            else_children: list[dict[str, Any]] | None = None
            i += 1
            while i < len(children):
                t = getattr(children[i], "type", None)
                if t == "Elif":
                    cases.append(_to_case(children[i]))
                    i += 1
                elif t == "Else":
                    inner = getattr(children[i], "children", [])
                    else_children = _serialize_children(inner)
                    i += 1
                    break
                else:
                    break
            node: dict[str, Any] = {"type": "Condition", "cases": cases}
            if else_children:
                node["else"] = else_children
            result.append(node)

        elif child_type in ("Elif", "Else"):
            raise ValueError(
                f"{child_type} without preceding If — "
                f"Elif and Else must immediately follow an If or Elif"
            )

        else:
            result.append(child.to_json())
            i += 1

    return result
