"""Prefab test configuration."""

from __future__ import annotations

import os
import sys
from pathlib import Path

os.environ.setdefault("PREFAB_RENDERER_URL", "http://localhost:3333")

# Make scripts/ importable for contract tests
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
