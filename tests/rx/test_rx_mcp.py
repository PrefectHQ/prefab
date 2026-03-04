"""Tests for MCP-specific reactive references."""

from prefab_ui.rx.mcp import HOST


class TestHostRx:
    def test_host_key(self):
        assert HOST.key == "$host"

    def test_host_str(self):
        assert str(HOST) == "{{ $host }}"

    def test_display_mode(self):
        assert str(HOST.displayMode) == "{{ $host.displayMode }}"

    def test_theme(self):
        assert str(HOST.theme) == "{{ $host.theme }}"

    def test_available_display_modes(self):
        assert str(HOST.availableDisplayModes) == "{{ $host.availableDisplayModes }}"

    def test_comparison(self):
        expr = HOST.displayMode == "fullscreen"
        assert str(expr) == "{{ $host.displayMode == 'fullscreen' }}"

    def test_ternary(self):
        expr = (HOST.displayMode == "fullscreen").then("Exit", "Fullscreen")
        assert (
            str(expr)
            == "{{ $host.displayMode == 'fullscreen' ? 'Exit' : 'Fullscreen' }}"
        )
