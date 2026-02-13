"""CSS utilities for Tailwind class composition.

Helpers for building css_class values without repeating variant prefixes.

Pseudo-state helpers prefix each space-separated class::

    from prefab_ui.css import Hover, FocusVisible

    css_class=["p-4 border-0", Hover("bg-blue-500 scale-105")]
    # → "p-4 border-0 hover:bg-blue-500 hover:scale-105"

    css_class=["ring-0 border-0", FocusVisible("border-b border-border")]
    # → "ring-0 border-0 focus-visible:border-b focus-visible:border-border"

Responsive maps Tailwind breakpoints to values::

    from prefab_ui.css import Responsive

    Grid(columns=Responsive(default=1, md=2, lg=3))
    Button("Go", css_class=Responsive(default="w-full", md="w-auto"))
"""

from __future__ import annotations

from typing import Any

# ── Responsive ─────────────────────────────────────────────────────────

_BREAKPOINTS = ("default", "sm", "md", "lg", "xl", "2xl")

_BreakpointFormatter = Any  # Callable[[Any], str] — avoid import complexity


class Responsive:
    """Breakpoint-aware values for responsive layouts.

    Maps Tailwind breakpoints to values. At compile time, each entry is
    prefixed with its breakpoint (``default`` emits unprefixed classes).

    Usage::

        Grid(columns=Responsive(default=1, md=2, lg=3))
        Row(gap=Responsive(default=2, md=4))
        Button("Go", css_class=Responsive(default="w-full", md="w-auto"))
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
    """Prefix classes with ``hover:``.

    Example::

        css_class=["p-4", Hover("bg-blue-500 scale-105")]
        # → "p-4 hover:bg-blue-500 hover:scale-105"
    """
    return _prefixed("hover", classes)


def Focus(classes: str) -> str:
    """Prefix classes with ``focus:``."""
    return _prefixed("focus", classes)


def FocusVisible(classes: str) -> str:
    """Prefix classes with ``focus-visible:``."""
    return _prefixed("focus-visible", classes)


def FocusWithin(classes: str) -> str:
    """Prefix classes with ``focus-within:``."""
    return _prefixed("focus-within", classes)


def Active(classes: str) -> str:
    """Prefix classes with ``active:``."""
    return _prefixed("active", classes)


def Disabled(classes: str) -> str:
    """Prefix classes with ``disabled:``."""
    return _prefixed("disabled", classes)


# ── Breakpoint helpers ────────────────────────────────────────────────


def Sm(classes: str) -> str:
    """Prefix classes with ``sm:`` (≥640px)."""
    return _prefixed("sm", classes)


def Md(classes: str) -> str:
    """Prefix classes with ``md:`` (≥768px)."""
    return _prefixed("md", classes)


def Lg(classes: str) -> str:
    """Prefix classes with ``lg:`` (≥1024px)."""
    return _prefixed("lg", classes)


def Xl(classes: str) -> str:
    """Prefix classes with ``xl:`` (≥1280px)."""
    return _prefixed("xl", classes)


def Xxl(classes: str) -> str:
    """Prefix classes with ``2xl:`` (≥1536px)."""
    return _prefixed("2xl", classes)
