"""Hitchhiker's Guide — shared data and operations.

Both the FastAPI and FastMCP servers import from here so they work
with the same in-memory dataset.
"""

from __future__ import annotations

ENTRIES: list[dict[str, str]] = [
    {
        "title": "Earth",
        "category": "Planets",
        "description": "Mostly harmless.",
    },
    {
        "title": "Towel",
        "category": "Items",
        "description": (
            "A towel is about the most massively useful thing "
            "an interstellar hitchhiker can have."
        ),
    },
    {
        "title": "Babel Fish",
        "category": "Creatures",
        "description": (
            "Small, yellow, leech-like — and probably the oddest thing in the Universe."
        ),
    },
    {
        "title": "Deep Thought",
        "category": "Computers",
        "description": "The second greatest computer in the Universe of Time and Space.",
    },
    {
        "title": "Magrathea",
        "category": "Planets",
        "description": "A planet whose inhabitants designed custom luxury planets.",
    },
    {
        "title": "Pan Galactic Gargle Blaster",
        "category": "Drinks",
        "description": (
            "The best drink in existence. The effect is like having "
            "your brains smashed out by a slice of lemon wrapped round "
            "a large gold brick."
        ),
    },
]


def search_entries(q: str = "") -> list[dict[str, str]]:
    """Filter entries by keyword across all fields."""
    if not q:
        return ENTRIES
    q_lower = q.lower()
    return [
        e
        for e in ENTRIES
        if q_lower in e["title"].lower()
        or q_lower in e["description"].lower()
        or q_lower in e["category"].lower()
    ]


def add_entry(
    title: str, category: str = "Uncategorized", description: str = ""
) -> dict[str, str]:
    """Add a new entry. Raises ValueError if title is empty."""
    title = title.strip()
    if not title:
        raise ValueError("Title is required")
    entry = {
        "title": title,
        "category": (category.strip() or "Uncategorized"),
        "description": description.strip(),
    }
    ENTRIES.append(entry)
    return entry


def delete_entry(title: str) -> None:
    """Remove an entry by title."""
    for i, e in enumerate(ENTRIES):
        if e["title"] == title:
            ENTRIES.pop(i)
            return
