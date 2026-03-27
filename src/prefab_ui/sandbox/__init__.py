"""Sandboxed execution of LLM-generated Prefab code.

The sandbox takes untrusted Python, executes it safely, and returns
Prefab wire protocol JSON. The default implementation uses Pyodide
(CPython compiled to WASM) via a Deno subprocess.

**Usage:**

```python
from prefab_ui.sandbox import Sandbox

async with Sandbox() as sandbox:
    result = await sandbox.run('''
        with Column(gap=4) as view:
            Heading("Dashboard")
            slider = Slider(value=75, name="conf")
            Text(f"Confidence: {slider.rx}%")
        app = PrefabApp(view=view, state={"conf": 75})
    ''')
```
"""

from prefab_ui.sandbox._pyodide import PyodideSandbox

# Default sandbox implementation
Sandbox = PyodideSandbox

__all__ = ["PyodideSandbox", "Sandbox"]
