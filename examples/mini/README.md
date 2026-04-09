# Mini Examples

Small, focused apps demonstrating individual Prefab features. Each is a self-contained `PrefabApp` you can serve or export:

```bash
prefab serve examples/mini/hello_world.py
prefab export examples/mini/reactive_binding.py -o reactive.html
```

| File | Feature |
|------|---------|
| `hello_world.py` | Reactive state with `Rx`, live-updating text |
| `reactive_binding.py` | Slider driving Ring, Progress bars, and text |
| `dynamic_list.py` | `ForEach` with add/remove items |
| `conditional.py` | `If`/`Else` rendering from switch state |
| `actions.py` | Action chains: `SetState`, `ShowToast`, `ToggleState` |
