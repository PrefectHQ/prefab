"""Reactive references for Prefab components.

The ``Rx`` class provides type-safe reactive references that serialize to
``{{ }}`` template expressions.  Components with state bindings expose an
``.rx`` property returning an ``Rx`` object, which can be passed directly
to any string-typed component field or embedded in f-strings::

    slider = Slider(min=0, max=100)

    # Bare ref — Pydantic coerces Rx to str automatically
    Metric(value=slider.rx)

    # f-string — mixes reactive value with literal text
    Text(f"Value: {slider.rx}")
"""

from __future__ import annotations

from contextvars import ContextVar

# ── Auto-name counter ────────────────────────────────────────────────

_counter: ContextVar[dict[str, int]] = ContextVar("_rx_counter")


def _generate_key(prefix: str) -> str:
    """Return a deterministic sequential key like ``slider-1``."""
    counters = _counter.get(None)
    if counters is None:
        counters = {}
        _counter.set(counters)
    n = counters.get(prefix, 0) + 1
    counters[prefix] = n
    return f"{prefix}-{n}"


def reset_counter() -> None:
    """Reset the auto-name counter.  Call in test fixtures for isolation."""
    _counter.set({})


# ── Rx ────────────────────────────────────────────────────────────────


class Rx:
    """A reactive reference to a client-side state key.

    Serializes to ``{{ key }}`` via ``__str__`` / ``__format__``.
    Attribute access produces dot-path references::

        user = Rx("user")
        str(user.address.city)  # "{{ user.address.city }}"

    Rx objects are accepted anywhere a component field expects a string.
    """

    __slots__ = ("_key",)

    def __init__(self, key: str) -> None:
        object.__setattr__(self, "_key", key)

    # Prevent __setattr__ from going through __getattr__
    def __setattr__(self, name: str, value: object) -> None:
        raise AttributeError("Rx objects are immutable")

    @property
    def key(self) -> str:
        """The raw state key string."""
        return object.__getattribute__(self, "_key")

    def __str__(self) -> str:
        return "{{ " + self.key + " }}"

    def __repr__(self) -> str:
        return f"Rx({self.key!r})"

    def __format__(self, format_spec: str) -> str:
        return str(self)

    def __getattr__(self, name: str) -> Rx:
        # Guard against dunder / private attribute lookups (e.g. pickle, copy)
        if name.startswith("_"):
            raise AttributeError(name)
        return Rx(f"{self.key}.{name}")

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Rx):
            return self.key == other.key
        return NotImplemented

    def __hash__(self) -> int:
        return hash(self.key)


def _coerce_rx(value: object) -> object:
    """Recursively convert Rx instances to their string form."""
    if isinstance(value, Rx):
        return str(value)
    if isinstance(value, dict):
        return {k: _coerce_rx(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_coerce_rx(v) for v in value]
    return value
