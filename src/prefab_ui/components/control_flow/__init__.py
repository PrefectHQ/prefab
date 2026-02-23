"""Control flow components for conditional and iterative rendering.

These components control *what* renders rather than *how* it looks.
``ForEach`` repeats children over a list, while ``If``/``Elif``/``Else``
express conditional branches that the renderer evaluates at display time.

Example::

    from prefab_ui.components.control_flow import ForEach, If, Else

    with ForEach("items"):
        with If("price > 100"):
            Badge("Premium")
        with Else():
            Badge("Standard")
"""

from prefab_ui.components.control_flow.conditional import Elif, Else, If
from prefab_ui.components.control_flow.foreach import ForEach

__all__ = [
    "Elif",
    "Else",
    "ForEach",
    "If",
]
