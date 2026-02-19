# @prefecthq/prefab-ui

The renderer and playground for [Prefab](https://prefab.prefect.io), the agentic frontend framework.

This package contains the bundled React renderer that turns Prefab's JSON wire format into a live interface. If you're building with Prefab in Python, you want the [`prefab-ui`](https://pypi.org/project/prefab-ui/) Python package instead.

## Usage

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@prefecthq/prefab-ui/dist/renderer.js"></script>
```

### Self-hosted

```js
import rendererUrl from "@prefecthq/prefab-ui/dist/renderer.js";
```

The renderer is a self-contained bundle (no external dependencies at runtime). Load it via a `<script>` tag and it will mount itself into `<div id="root">` automatically.

## Documentation

Full documentation at [prefab.prefect.io](https://prefab.prefect.io), including an interactive [playground](https://prefab.prefect.io/playground).

## License

Apache 2.0
