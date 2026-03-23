"""Sandboxed execution of LLM-generated Prefab code.

Executes untrusted Python in a Pyodide WASM sandbox (via Deno) with
the full Prefab library pre-loaded. Context managers, ``.rx``, Pydantic
validation — everything works identically to native Python.

Usage::

    from prefab_ui.sandbox import Sandbox

    async with Sandbox() as sandbox:
        result = await sandbox.run('''
            with Column(gap=4) as view:
                Heading("Dashboard")
                slider = Slider(value=75, name="conf")
                Text(f"Confidence: {slider.rx}%")
            app = PrefabApp(view=view, state={"conf": 75})
        ''')
"""

from prefab_ui.sandbox._sandbox import Sandbox

__all__ = ["Sandbox"]
