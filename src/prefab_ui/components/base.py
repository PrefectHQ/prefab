"""Base classes for MCP Apps UI components."""

from __future__ import annotations

from contextvars import ContextVar
from typing import Annotated, Any, Literal

from pydantic import BaseModel, BeforeValidator, Field
from typing_extensions import Self

from prefab_ui.css import Responsive

_component_stack: ContextVar[list[ContainerComponent] | None] = ContextVar(
    "_component_stack", default=None
)

_initial_state: ContextVar[dict[str, Any] | None] = ContextVar(
    "_initial_state", default=None
)


def set_initial_state(**kwargs: Any) -> None:
    """Declare initial client-side state for the current app.

    Called alongside component construction to define the starting
    values that templates like ``{{ name }}`` resolve against::

        set_initial_state(name="world")

        with Card():
            H3("Hello, {{ name }}!")
    """
    current = _initial_state.get()
    if current is None:
        current = {}
        _initial_state.set(current)
    current.update(kwargs)


def get_initial_state() -> dict[str, Any] | None:
    """Retrieve state set by :func:`set_initial_state`, or ``None``."""
    return _initial_state.get()


def clear_initial_state() -> None:
    """Reset the initial-state accumulator."""
    _initial_state.set(None)


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


class Component(BaseModel):
    """Base class for all UI components.

    Components serialize to JSON via ``to_json()`` for the React renderer.
    When created inside a ``ContainerComponent`` context manager, they
    automatically append themselves to the parent's children list.
    """

    model_config = {"populate_by_name": True, "arbitrary_types_allowed": True}

    css_class: Annotated[str | None, BeforeValidator(_coerce_css_class)] = Field(
        default=None,
        alias="cssClass",
        description="CSS/Tailwind classes for styling. Accepts a Responsive() for breakpoint-aware classes.",
    )

    def model_post_init(self, __context: Any) -> None:
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
