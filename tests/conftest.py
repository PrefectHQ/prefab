"""Prefab test configuration."""

from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest

from prefab_ui.rx import reset_counter

os.environ.setdefault("PREFAB_RENDERER_URL", "http://localhost:3333")

# Make scripts/ importable for contract tests
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))


@pytest.fixture(autouse=True)
def _reset_rx_counter() -> None:
    """Reset the auto-name counter before each test for deterministic keys."""
    reset_counter()
