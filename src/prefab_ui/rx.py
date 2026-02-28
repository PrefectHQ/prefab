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

Rx objects support Python operators and pipe methods, each of which
returns a new Rx with the compiled ``{{ }}`` expression::

    price = Rx("price")
    quantity = Rx("quantity")

    price * quantity              # {{ price * quantity }}
    (price * quantity).currency() # {{ price * quantity | currency }}
    quantity > 0                  # {{ quantity > 0 }}
"""

from __future__ import annotations

from contextvars import ContextVar

# ── Auto-name counter ────────────────────────────────────────────────

_counter: ContextVar[dict[str, int]] = ContextVar("_rx_counter")


def _generate_key(prefix: str) -> str:
    """Return a deterministic sequential key like ``slider_1``."""
    counters = _counter.get(None)
    if counters is None:
        counters = {}
        _counter.set(counters)
    n = counters.get(prefix, 0) + 1
    counters[prefix] = n
    return f"{prefix}_{n}"


def reset_counter() -> None:
    """Reset the auto-name counter.  Call in test fixtures for isolation."""
    _counter.set({})


# ── Precedence levels (higher = tighter binding) ─────────────────────

_PREC_PIPE = 1
_PREC_TERNARY = 2
_PREC_OR = 3
_PREC_AND = 4
_PREC_NOT = 5
_PREC_COMP = 6
_PREC_ADD = 7
_PREC_MUL = 8
_PREC_UNARY = 9
_PREC_ATOM = 10


# ── Helpers ──────────────────────────────────────────────────────────


def _format_value(value: object, min_prec: int = 0) -> str:
    """Format a Python value as an expression token.

    Strings → single-quoted, numbers → bare, bools → true/false,
    None → null, Rx → raw key (wrapped in parens if below min_prec).
    """
    if isinstance(value, Rx):
        return value._wrap(min_prec)
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    if value is None:
        return "null"
    if isinstance(value, str):
        return f"'{value}'"
    return str(value)


def _format_pipe_arg(value: object) -> str:
    """Format a pipe argument (after the colon).

    Unlike expression tokens, pipe args are bare tokens — strings are
    NOT quoted unless they contain spaces (then use single quotes).
    """
    if isinstance(value, (int, float)):
        return str(value)
    s = str(value)
    if " " in s:
        return f"'{s}'"
    return s


# ── Rx ────────────────────────────────────────────────────────────────


class Rx:
    """A reactive reference to a client-side state key.

    Serializes to ``{{ key }}`` via ``__str__`` / ``__format__``.

    Supports Python operators that compile to template expressions::

        count = Rx("count")
        count + 1              # → {{ count + 1 }}
        count > 0              # → {{ count > 0 }}
        (count > 0).then("yes", "no")  # → {{ count > 0 ? 'yes' : 'no' }}

    Pipe methods format values for display::

        Rx("revenue").currency()       # → {{ revenue | currency }}
        Rx("name").upper().truncate(20) # → {{ name | upper | truncate:20 }}
    """

    __slots__ = ("_key", "_prec")

    def __init__(self, key: str, _prec: int = _PREC_ATOM) -> None:
        object.__setattr__(self, "_key", key)
        object.__setattr__(self, "_prec", _prec)

    def __setattr__(self, name: str, value: object) -> None:
        raise AttributeError("Rx objects are immutable")

    @property
    def key(self) -> str:
        """The raw state key string."""
        return object.__getattribute__(self, "_key")

    @property
    def prec(self) -> int:
        """Operator precedence level."""
        return object.__getattribute__(self, "_prec")

    def _wrap(self, min_prec: int) -> str:
        """Return key, wrapped in parens if precedence is too low."""
        if self.prec < min_prec:
            return f"({self.key})"
        return self.key

    # ── String conversion ────────────────────────────────────────────

    def __str__(self) -> str:
        return "{{ " + self.key + " }}"

    def __repr__(self) -> str:
        return f"Rx({self.key!r})"

    def __format__(self, format_spec: str) -> str:
        return str(self)

    # ── Dot-path access ──────────────────────────────────────────────

    def __getattr__(self, name: str) -> Rx:
        if name.startswith("_"):
            raise AttributeError(name)
        return Rx(f"{self.key}.{name}")

    # ── Arithmetic ───────────────────────────────────────────────────

    def __add__(self, other: object) -> Rx:
        return Rx(f"{self._wrap(_PREC_ADD)} + {_format_value(other)}", _PREC_ADD)

    def __radd__(self, other: object) -> Rx:
        return Rx(f"{_format_value(other)} + {self._wrap(_PREC_ADD)}", _PREC_ADD)

    def __sub__(self, other: object) -> Rx:
        return Rx(f"{self._wrap(_PREC_ADD)} - {_rhs(other, _PREC_ADD)}", _PREC_ADD)

    def __rsub__(self, other: object) -> Rx:
        return Rx(f"{_format_value(other)} - {self._wrap(_PREC_ADD)}", _PREC_ADD)

    def __mul__(self, other: object) -> Rx:
        return Rx(f"{self._wrap(_PREC_MUL)} * {_format_value(other)}", _PREC_MUL)

    def __rmul__(self, other: object) -> Rx:
        return Rx(f"{_format_value(other)} * {self._wrap(_PREC_MUL)}", _PREC_MUL)

    def __truediv__(self, other: object) -> Rx:
        return Rx(f"{self._wrap(_PREC_MUL)} / {_rhs(other, _PREC_MUL)}", _PREC_MUL)

    def __rtruediv__(self, other: object) -> Rx:
        return Rx(f"{_format_value(other)} / {self._wrap(_PREC_MUL)}", _PREC_MUL)

    def __neg__(self) -> Rx:
        return Rx(f"-{self._wrap(_PREC_UNARY)}", _PREC_UNARY)

    def __pos__(self) -> Rx:
        return Rx(f"+{self._wrap(_PREC_UNARY)}", _PREC_UNARY)

    # ── Comparison ───────────────────────────────────────────────────

    def __eq__(self, other: object) -> Rx:  # type: ignore[override]
        return Rx(f"{self._wrap(_PREC_COMP)} == {_format_value(other)}", _PREC_COMP)

    def __ne__(self, other: object) -> Rx:  # type: ignore[override]
        return Rx(f"{self._wrap(_PREC_COMP)} != {_format_value(other)}", _PREC_COMP)

    def __gt__(self, other: object) -> Rx:
        return Rx(f"{self._wrap(_PREC_COMP)} > {_format_value(other)}", _PREC_COMP)

    def __ge__(self, other: object) -> Rx:
        return Rx(f"{self._wrap(_PREC_COMP)} >= {_format_value(other)}", _PREC_COMP)

    def __lt__(self, other: object) -> Rx:
        return Rx(f"{self._wrap(_PREC_COMP)} < {_format_value(other)}", _PREC_COMP)

    def __le__(self, other: object) -> Rx:
        return Rx(f"{self._wrap(_PREC_COMP)} <= {_format_value(other)}", _PREC_COMP)

    # ── Logical ──────────────────────────────────────────────────────

    def __and__(self, other: object) -> Rx:
        return Rx(f"{self._wrap(_PREC_AND)} && {_rhs(other, _PREC_AND)}", _PREC_AND)

    def __rand__(self, other: object) -> Rx:
        return Rx(f"{_format_value(other)} && {self._wrap(_PREC_AND)}", _PREC_AND)

    def __or__(self, other: object) -> Rx:
        return Rx(f"{self._wrap(_PREC_OR)} || {_rhs(other, _PREC_OR)}", _PREC_OR)

    def __ror__(self, other: object) -> Rx:
        return Rx(f"{_format_value(other)} || {self._wrap(_PREC_OR)}", _PREC_OR)

    def __invert__(self) -> Rx:
        # Wrap anything that isn't a simple atom for readability
        return Rx(f"!{self._wrap(_PREC_ATOM)}", _PREC_NOT)

    # ── Ternary ──────────────────────────────────────────────────────

    def then(self, if_true: object, if_false: object) -> Rx:
        """Ternary conditional: ``condition ? if_true : if_false``."""
        # Use _PREC_TERNARY + 1 so nested ternaries in branches get wrapped
        branch_prec = _PREC_TERNARY + 1
        return Rx(
            f"{self._wrap(_PREC_TERNARY)} ? "
            f"{_format_value(if_true, branch_prec)} : "
            f"{_format_value(if_false, branch_prec)}",
            _PREC_TERNARY,
        )

    # ── Pipes ────────────────────────────────────────────────────────

    def _pipe(self, name: str, arg: object = None) -> Rx:
        """Apply a pipe: ``key | name`` or ``key | name:arg``."""
        if arg is not None:
            return Rx(f"{self.key} | {name}:{_format_pipe_arg(arg)}", _PREC_PIPE)
        return Rx(f"{self.key} | {name}", _PREC_PIPE)

    # Number pipes
    def currency(self, code: str | None = None) -> Rx:
        return self._pipe("currency", code)

    def percent(self, decimals: int | None = None) -> Rx:
        return self._pipe("percent", decimals)

    def number(self, decimals: int | None = None) -> Rx:
        return self._pipe("number", decimals)

    def round(self, decimals: int) -> Rx:
        return self._pipe("round", decimals)

    def abs(self) -> Rx:
        return self._pipe("abs")

    # Date pipes
    def date(self, format: str | None = None) -> Rx:
        return self._pipe("date", format)

    def time(self) -> Rx:
        return self._pipe("time")

    def datetime(self) -> Rx:
        return self._pipe("datetime")

    # String pipes
    def upper(self) -> Rx:
        return self._pipe("upper")

    def lower(self) -> Rx:
        return self._pipe("lower")

    def truncate(self, max_length: int) -> Rx:
        return self._pipe("truncate", max_length)

    def pluralize(self, word: str | None = None) -> Rx:
        return self._pipe("pluralize", word)

    # Array pipes
    def length(self) -> Rx:
        return self._pipe("length")

    def join(self, separator: str | None = None) -> Rx:
        return self._pipe("join", separator)

    def first(self) -> Rx:
        return self._pipe("first")

    def last(self) -> Rx:
        return self._pipe("last")

    def selectattr(self, attr: str) -> Rx:
        return self._pipe("selectattr", attr)

    def rejectattr(self, attr: str) -> Rx:
        return self._pipe("rejectattr", attr)

    # Default
    def default(self, value: object) -> Rx:
        return self._pipe("default", value)


def _rhs(value: object, min_prec: int) -> str:
    """Format a right-hand operand, wrapping in parens if needed.

    For non-commutative operators (-, /), the RHS needs parens if it's
    an expression at the same precedence level to avoid ambiguity:
    ``a - (b - c)`` vs ``a - b - c``.
    """
    if isinstance(value, Rx):
        if value.prec <= min_prec:
            return f"({value.key})"
        return value.key
    return _format_value(value)


def _coerce_rx(value: object) -> object:
    """Recursively convert Rx instances to their string form."""
    if isinstance(value, Rx):
        return str(value)
    if isinstance(value, dict):
        return {k: _coerce_rx(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_coerce_rx(v) for v in value]
    return value


# ── Built-in reactive variables ──────────────────────────────────────

#: The current iteration item inside a :class:`ForEach` loop.
#: Chains via dot-path: ``Item.title`` → ``{{ $item.title }}``.
ITEM: Rx = Rx("$item")

#: The iteration index inside a :class:`ForEach` loop.
INDEX: Rx = Rx("$index")

#: The event value in ``on_change`` / ``on_submit`` handlers.
EVENT: Rx = Rx("$event")

#: The error message in ``on_error`` handlers.
ERROR: Rx = Rx("$error")
