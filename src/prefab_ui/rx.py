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

from collections.abc import Callable
from contextvars import ContextVar
from typing import Any, NamedTuple, Protocol, runtime_checkable

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


# ── Expression tree nodes ────────────────────────────────────────────


class _BinOp(NamedTuple):
    op: str  # "+", "-", "*", "/", "==", "!=", ">", ">=", "<", "<=", "&&", "||"
    left: object  # Rx or scalar
    right: object  # Rx or scalar


class _UnaryOp(NamedTuple):
    op: str  # "-", "+", "!"
    operand: Rx


class _Ternary(NamedTuple):
    cond: Rx
    if_true: object
    if_false: object


class _Pipe(NamedTuple):
    expr: Rx
    name: str
    arg: object  # None if no arg


class _DotPath(NamedTuple):
    expr: Rx
    attr: str


_Node = _BinOp | _UnaryOp | _Ternary | _Pipe | _DotPath

# Ops where RHS needs strict wrapping (parens at same precedence)
_STRICT_RHS_OPS = frozenset({"-", "/", "&&", "||"})


@runtime_checkable
class _HasRx(Protocol):
    """Structural check for components with a .rx property (StatefulMixin)."""

    @property
    def rx(self) -> Rx: ...


# ── Resolution ───────────────────────────────────────────────────────


def _format_scalar(value: object) -> str:
    """Format a non-Rx Python value as an expression token.

    Strings → single-quoted, numbers → bare, bools → true/false, None → null.
    """
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    if value is None:
        return "null"
    if isinstance(value, str):
        return f"'{value}'"
    return str(value)


def _resolve_operand(value: object, min_prec: int, *, strict: bool = False) -> str:
    """Resolve a child operand (Rx or scalar) for use in an expression.

    For Rx children: resolves the key, wraps in parens if the child's
    precedence is too low.  ``strict=True`` uses ``<=`` instead of ``<``
    for non-commutative RHS (e.g. ``a - (b - c)``).
    """
    if isinstance(value, Rx):
        key = value.key
        needs_parens = value.prec <= min_prec if strict else value.prec < min_prec
        return f"({key})" if needs_parens else key
    return _format_scalar(value)


def _resolve(raw: str | Callable[[], Rx] | _Node) -> str:
    """Walk an Rx's internal key to produce the expression string.

    Handles three cases:
    - ``str``: leaf key, returned as-is
    - ``_Node``: expression tree node, resolved recursively
    - ``callable``: forward reference, invoked and unwrapped
    """
    if isinstance(raw, str):
        return raw

    # Check node types before callable — NamedTuples are callable.
    if isinstance(raw, _BinOp):
        op_prec = _OP_PREC[raw.op]
        strict = raw.op in _STRICT_RHS_OPS
        left = _resolve_operand(raw.left, op_prec, strict=False)
        right = _resolve_operand(raw.right, op_prec, strict=strict)
        return f"{left} {raw.op} {right}"

    if isinstance(raw, _UnaryOp):
        wrap_prec = _PREC_ATOM if raw.op == "!" else _PREC_UNARY
        operand = _resolve_operand(raw.operand, wrap_prec)
        return f"{raw.op}{operand}"

    if isinstance(raw, _Ternary):
        branch_prec = _PREC_TERNARY + 1
        cond = _resolve_operand(raw.cond, _PREC_TERNARY)
        if_true = _resolve_operand(raw.if_true, branch_prec)
        if_false = _resolve_operand(raw.if_false, branch_prec)
        return f"{cond} ? {if_true} : {if_false}"

    if isinstance(raw, _Pipe):
        inner_key = raw.expr.key
        if raw.arg is not None:
            return f"{inner_key} | {raw.name}:{_format_pipe_arg(raw.arg)}"
        return f"{inner_key} | {raw.name}"

    if isinstance(raw, _DotPath):
        return f"{raw.expr.key}.{raw.attr}"

    # Callable: forward references like Rx(lambda: component)
    if callable(raw):
        resolved = raw()
        if isinstance(resolved, Rx):
            return resolved.key
        if isinstance(resolved, _HasRx):
            return resolved.rx.key
        return str(resolved)

    return str(raw)  # pragma: no cover


# Operator → precedence mapping (used by _resolve for _BinOp)
_OP_PREC: dict[str, int] = {
    "+": _PREC_ADD,
    "-": _PREC_ADD,
    "*": _PREC_MUL,
    "/": _PREC_MUL,
    "==": _PREC_COMP,
    "!=": _PREC_COMP,
    ">": _PREC_COMP,
    ">=": _PREC_COMP,
    "<": _PREC_COMP,
    "<=": _PREC_COMP,
    "&&": _PREC_AND,
    "||": _PREC_OR,
}


def _format_pipe_arg(value: object) -> str:
    """Format a pipe argument (after the colon).

    Unlike expression tokens, pipe args are bare tokens — strings are
    NOT quoted unless they contain spaces (then use single quotes).
    """
    if isinstance(value, bool):
        return "true" if value else "false"
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

    def __init__(
        self, key: str | Callable[[], Rx] | _Node, _prec: int = _PREC_ATOM
    ) -> None:
        object.__setattr__(self, "_key", key)
        object.__setattr__(self, "_prec", _prec)

    def __setattr__(self, name: str, value: object) -> None:
        raise AttributeError("Rx objects are immutable")

    @property
    def key(self) -> str:
        """The resolved expression string (without ``{{ }}`` wrapper).

        Resolution walks the expression tree: leaf nodes return their key,
        operator nodes recurse into their children, and callable nodes
        (forward references) invoke the callable on access.
        """
        return _resolve(object.__getattribute__(self, "_key"))

    @classmethod
    def __get_pydantic_core_schema__(cls, source_type: Any, handler: Any) -> Any:
        from pydantic_core import core_schema

        return core_schema.no_info_plain_validator_function(
            cls._pydantic_validate,
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda v: str(v),
                info_arg=False,
                return_schema=core_schema.str_schema(),
            ),
        )

    @classmethod
    def _pydantic_validate(cls, v: Any) -> Rx:
        if isinstance(v, cls):
            return v
        raise ValueError(f"Expected Rx, got {type(v)}")

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
        return Rx(_DotPath(self, name), _PREC_ATOM)

    # ── Arithmetic ───────────────────────────────────────────────────

    def __add__(self, other: object) -> Rx:
        return Rx(_BinOp("+", self, other), _PREC_ADD)

    def __radd__(self, other: object) -> Rx:
        return Rx(_BinOp("+", other, self), _PREC_ADD)

    def __sub__(self, other: object) -> Rx:
        return Rx(_BinOp("-", self, other), _PREC_ADD)

    def __rsub__(self, other: object) -> Rx:
        return Rx(_BinOp("-", other, self), _PREC_ADD)

    def __mul__(self, other: object) -> Rx:
        return Rx(_BinOp("*", self, other), _PREC_MUL)

    def __rmul__(self, other: object) -> Rx:
        return Rx(_BinOp("*", other, self), _PREC_MUL)

    def __truediv__(self, other: object) -> Rx:
        return Rx(_BinOp("/", self, other), _PREC_MUL)

    def __rtruediv__(self, other: object) -> Rx:
        return Rx(_BinOp("/", other, self), _PREC_MUL)

    def __neg__(self) -> Rx:
        return Rx(_UnaryOp("-", self), _PREC_UNARY)

    def __pos__(self) -> Rx:
        return Rx(_UnaryOp("+", self), _PREC_UNARY)

    # ── Comparison ───────────────────────────────────────────────────

    def __eq__(self, other: object) -> Rx:  # type: ignore[override]
        return Rx(_BinOp("==", self, other), _PREC_COMP)

    def __ne__(self, other: object) -> Rx:  # type: ignore[override]
        return Rx(_BinOp("!=", self, other), _PREC_COMP)

    def __gt__(self, other: object) -> Rx:
        return Rx(_BinOp(">", self, other), _PREC_COMP)

    def __ge__(self, other: object) -> Rx:
        return Rx(_BinOp(">=", self, other), _PREC_COMP)

    def __lt__(self, other: object) -> Rx:
        return Rx(_BinOp("<", self, other), _PREC_COMP)

    def __le__(self, other: object) -> Rx:
        return Rx(_BinOp("<=", self, other), _PREC_COMP)

    # ── Logical ──────────────────────────────────────────────────────

    def __and__(self, other: object) -> Rx:
        return Rx(_BinOp("&&", self, other), _PREC_AND)

    def __rand__(self, other: object) -> Rx:
        return Rx(_BinOp("&&", other, self), _PREC_AND)

    def __or__(self, other: object) -> Rx:
        return Rx(_BinOp("||", self, other), _PREC_OR)

    def __ror__(self, other: object) -> Rx:
        return Rx(_BinOp("||", other, self), _PREC_OR)

    def __invert__(self) -> Rx:
        return Rx(_UnaryOp("!", self), _PREC_NOT)

    # ── Ternary ──────────────────────────────────────────────────────

    def then(self, if_true: object, if_false: object) -> Rx:
        """Ternary conditional: ``condition ? if_true : if_false``."""
        return Rx(_Ternary(self, if_true, if_false), _PREC_TERNARY)

    # ── Pipes ────────────────────────────────────────────────────────

    def _pipe(self, name: str, arg: object = None) -> Rx:
        """Apply a pipe: ``key | name`` or ``key | name:arg``."""
        return Rx(_Pipe(self, name, arg), _PREC_PIPE)

    # Number pipes
    def currency(self, code: str | None = None) -> Rx:
        return self._pipe("currency", code)

    def percent(self, decimals: int | None = None) -> Rx:
        return self._pipe("percent", decimals)

    def number(self, decimals: int | None = None) -> Rx:
        return self._pipe("number", decimals)

    def round(self, decimals: int = 0) -> Rx:
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


class LoopItem(Rx):
    """Rx subclass returned by :class:`ForEach.__enter__`.

    Acts as an Rx keyed to an auto-generated ``let`` binding for ``$item``.
    Provides ``get_index()`` for the companion ``$index`` binding and
    supports tuple destructuring matching ``enumerate`` order::

        with ForEach("items") as (i, item):
            Text(f"{i + 1}. {item.name}")
    """

    __slots__ = ("_index_rx",)

    def __init__(self, item_key: str, index_key: str) -> None:
        super().__init__(item_key)
        object.__setattr__(self, "_index_rx", Rx(index_key))

    def get_index(self) -> Rx:
        """Return an Rx reference to this loop's iteration index."""
        return object.__getattribute__(self, "_index_rx")

    def __iter__(self):
        """Support ``as (idx, item)`` destructuring (enumerate order)."""
        yield object.__getattribute__(self, "_index_rx")
        yield Rx(self.key)


def _coerce_rx(value: object) -> object:
    """Recursively convert Rx instances to their string form."""
    if isinstance(value, Rx):
        return str(value)
    if isinstance(value, dict):
        return {k: _coerce_rx(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_coerce_rx(v) for v in value]
    return value


# ── Public type alias ────────────────────────────────────────────────

RxStr = str | Rx
"""A string that also accepts an ``Rx`` reactive reference.

Use this as the type annotation for component/action fields whose value
can be either a literal string or a reactive reference::

    class MyComponent(Component):
        label: RxStr = ""
"""

# ── State proxy ──────────────────────────────────────────────────────


class _StateProxy:
    """Proxy that creates top-level ``Rx`` references via attribute access.

    ``STATE.groups`` is equivalent to ``Rx("groups")``, providing a
    concise way to reference state keys without separate declarations::

        state = set_initial_state(groups=[...], count=0)
        state.groups          # Rx("groups")
        state.groups.name     # Rx("groups.name")  — chains via Rx.__getattr__
    """

    __slots__ = ()

    def __getattr__(self, name: str) -> Rx:
        if name.startswith("_"):
            raise AttributeError(name)
        return Rx(name)

    def __repr__(self) -> str:
        return "STATE"


#: Proxy for accessing state keys as reactive references.
#: ``STATE.count`` is equivalent to ``Rx("count")``.
STATE: _StateProxy = _StateProxy()


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
