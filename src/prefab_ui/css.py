"""CSS utilities for Tailwind class composition.

Helpers for building css_class values without repeating variant prefixes.

Pseudo-state helpers prefix each space-separated class:

```python
from prefab_ui.css import Hover, FocusVisible

css_class=["p-4 border-0", Hover("bg-blue-500 scale-105")]
# → "p-4 border-0 hover:bg-blue-500 hover:scale-105"

css_class=["ring-0 border-0", FocusVisible("border-b border-border")]
# → "ring-0 border-0 focus-visible:border-b focus-visible:border-border"
```

Responsive maps Tailwind breakpoints to values:

```python
from prefab_ui.css import Responsive

Grid(columns=Responsive(default=1, md=2, lg=3))
Button("Go", css_class=Responsive(default="w-full", md="w-auto"))
```
"""

from __future__ import annotations

import re
from collections.abc import Iterable
from typing import Any

# ── Responsive ─────────────────────────────────────────────────────────

_BREAKPOINTS = ("default", "sm", "md", "lg", "xl", "2xl")

_BreakpointFormatter = Any  # Callable[[Any], str] — avoid import complexity


class Responsive:
    """Breakpoint-aware values for responsive layouts.

    Maps Tailwind breakpoints to values. At compile time, each entry is
    prefixed with its breakpoint (`default` emits unprefixed classes).

    **Usage:**

    ```python
    Grid(columns=Responsive(default=1, md=2, lg=3))
    Row(gap=Responsive(default=2, md=4))
    Button("Go", css_class=Responsive(default="w-full", md="w-auto"))
    ```
    """

    __slots__ = ("_values",)

    def __init__(self, **kwargs: Any) -> None:
        invalid = set(kwargs) - set(_BREAKPOINTS)
        if invalid:
            raise ValueError(
                f"Invalid breakpoint(s): {', '.join(sorted(invalid))}. "
                f"Valid breakpoints: {', '.join(_BREAKPOINTS)}"
            )
        if not kwargs:
            raise ValueError("Responsive() requires at least one breakpoint value")
        self._values: dict[str, Any] = kwargs

    def __repr__(self) -> str:
        inner = ", ".join(f"{k}={v!r}" for k, v in self._values.items())
        return f"Responsive({inner})"

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Responsive):
            return self._values == other._values
        return NotImplemented

    @property
    def values(self) -> dict[str, Any]:
        return dict(self._values)

    def compile_css(self, formatter: _BreakpointFormatter) -> str:
        """Compile to a space-separated Tailwind class string.

        The *formatter* is called once per breakpoint entry and should
        return one or more CSS utility classes for the given value.
        """
        parts: list[str] = []
        for bp in _BREAKPOINTS:
            if bp not in self._values:
                continue
            classes = formatter(self._values[bp])
            if not classes:
                continue
            if bp == "default":
                parts.append(classes)
            else:
                for cls in classes.split():
                    parts.append(f"{bp}:{cls}")
        return " ".join(parts)


# ── Variant helpers ───────────────────────────────────────────────────


def _prefixed(prefix: str, classes: str) -> str:
    """Prefix each space-separated class with a Tailwind variant."""
    return " ".join(f"{prefix}:{cls}" for cls in classes.split())


def Hover(classes: str) -> str:
    """Prefix classes with `hover:`.

    **Example:**

    ```python
    css_class=["p-4", Hover("bg-blue-500 scale-105")]
    # → "p-4 hover:bg-blue-500 hover:scale-105"
    ```
    """
    return _prefixed("hover", classes)


def Focus(classes: str) -> str:
    """Prefix classes with `focus:`."""
    return _prefixed("focus", classes)


def FocusVisible(classes: str) -> str:
    """Prefix classes with `focus-visible:`."""
    return _prefixed("focus-visible", classes)


def FocusWithin(classes: str) -> str:
    """Prefix classes with `focus-within:`."""
    return _prefixed("focus-within", classes)


def Active(classes: str) -> str:
    """Prefix classes with `active:`."""
    return _prefixed("active", classes)


def Disabled(classes: str) -> str:
    """Prefix classes with `disabled:`."""
    return _prefixed("disabled", classes)


# ── Breakpoint helpers ────────────────────────────────────────────────


def Sm(classes: str) -> str:
    """Prefix classes with `sm:` (≥640px)."""
    return _prefixed("sm", classes)


def Md(classes: str) -> str:
    """Prefix classes with `md:` (≥768px)."""
    return _prefixed("md", classes)


def Lg(classes: str) -> str:
    """Prefix classes with `lg:` (≥1024px)."""
    return _prefixed("lg", classes)


def Xl(classes: str) -> str:
    """Prefix classes with `xl:` (≥1280px)."""
    return _prefixed("xl", classes)


def Xxl(classes: str) -> str:
    """Prefix classes with `2xl:` (≥1536px)."""
    return _prefixed("2xl", classes)


# ── Arbitrary value CSS generation ───────────────────────────────────

# Mapping from Tailwind utility prefix to one or more CSS properties.
_ARBITRARY_PREFIX_MAP: dict[str, tuple[str, ...]] = {
    "h": ("height",),
    "w": ("width",),
    "min-h": ("min-height",),
    "min-w": ("min-width",),
    "max-h": ("max-height",),
    "max-w": ("max-width",),
    "size": ("width", "height"),
    "p": ("padding",),
    "px": ("padding-left", "padding-right"),
    "py": ("padding-top", "padding-bottom"),
    "pt": ("padding-top",),
    "pr": ("padding-right",),
    "pb": ("padding-bottom",),
    "pl": ("padding-left",),
    "m": ("margin",),
    "mx": ("margin-left", "margin-right"),
    "my": ("margin-top", "margin-bottom"),
    "mt": ("margin-top",),
    "mr": ("margin-right",),
    "mb": ("margin-bottom",),
    "ml": ("margin-left",),
    "gap": ("gap",),
    "gap-x": ("column-gap",),
    "gap-y": ("row-gap",),
    "top": ("top",),
    "right": ("right",),
    "bottom": ("bottom",),
    "left": ("left",),
    "inset": ("inset",),
    "rounded": ("border-radius",),
    "text": ("font-size",),
    "basis": ("flex-basis",),
    "z": ("z-index",),
    "opacity": ("opacity",),
}

_ARBITRARY_RE = re.compile(r"^(.+?)-\[(.+)]$")


def collect_classes(tree: dict[str, Any]) -> set[str]:
    """Recursively extract all CSS class tokens from a serialized view tree."""
    classes: set[str] = set()
    _walk_tree(tree, classes)
    return classes


def _walk_tree(node: Any, out: set[str]) -> None:
    if isinstance(node, dict):
        css = node.get("cssClass")
        if isinstance(css, str):
            out.update(css.split())
        for value in node.values():
            _walk_tree(value, out)
    elif isinstance(node, list):
        for item in node:
            _walk_tree(item, out)


def generate_arbitrary_css(classes: Iterable[str]) -> str:
    """Generate CSS rules for Tailwind arbitrary value classes.

    Parses tokens like ``h-[500px]`` and emits corresponding CSS rules.
    Standard classes (without ``[...]`` syntax) are silently ignored.
    """
    rules: list[str] = []
    seen: set[str] = set()

    for token in classes:
        if token in seen:
            continue
        seen.add(token)

        m = _ARBITRARY_RE.match(token)
        if not m:
            continue

        prefix, value = m.group(1), m.group(2)
        props = _ARBITRARY_PREFIX_MAP.get(prefix)
        if not props:
            continue

        selector = _escape_selector(token)
        declarations = " ".join(f"{prop}: {value};" for prop in props)
        rules.append(f".{selector} {{ {declarations} }}")

    return "\n".join(rules)


def _escape_selector(cls: str) -> str:
    """Escape special characters for use in a CSS selector."""
    return re.sub(r"([\[\]:%/.,#()!])", r"\\\1", cls)


def collect_css_classes(*sources: Any) -> list[str]:
    """Collect all CSS class tokens from components or serialized view dicts.

    Accepts Component instances, serialized view dicts, or any mix of both.
    Returns a flat list of individual class tokens, suitable for passing as
    ``extra_classes`` on ``PrefabApp``.

    Useful for collecting classes from dynamic content that might fill a
    ``Slot`` or be injected at runtime:

    ```python
    variant_a = Div(css_class="h-[500px]")
    variant_b = Column(css_class="w-[800px]")

    app = PrefabApp(
        view=main_view,
        extra_classes=collect_css_classes(variant_a, variant_b),
    )
    ```
    """
    classes: set[str] = set()
    for source in sources:
        if isinstance(source, dict):
            tree = source
        elif hasattr(source, "to_json"):
            tree = source.to_json()
        else:
            raise TypeError(
                f"Expected a Component or dict, got {type(source).__name__}"
            )
        classes.update(collect_classes(tree))
    return sorted(classes)
