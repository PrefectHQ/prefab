# Presentation Examples

Slide-style examples using the Presentation theme.

## Individual slides

Each slide is a standalone app:

```bash
prefab serve examples/presentation/fleet_performance.py
prefab serve examples/presentation/cost_overview.py
```

## Slideshow

The slideshow combines slides with keyboard navigation. Run it from the `examples/presentation/` directory so the slide imports resolve:

```bash
cd examples/presentation
prefab serve slideshow.py
```

Arrow keys navigate between slides. Press `Shift+?` for the shortcuts dialog.

## Export

Any file can be exported as a static HTML:

```bash
prefab export examples/presentation/fleet_performance.py -o fleet.html
```
