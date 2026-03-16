---
name: Budget allocator build plan
description: Components needed to build the budget allocator screen, tracked as a todo list
type: project
---

## Budget Allocator — Component Backlog

From the budget allocator screen design session (2026-03-15/16):

### Done
- [x] Sparkline component (line + area + bar modes, variants, indicator_class, smooth/step/linear curves)
- [x] DataTable component cells (render Sparkline, Badge, etc. in cells)
- [x] Colored slider handle variants + handle_class
- [x] Sparkline bar mode (`mode="bar"`)
- [x] Metric trend indicator → Badge pill
- [x] Playground line numbers + error line info
- [x] Broken doc links fixed + CI check added
- [x] Reactive variants (Literal | RxStr on all variant fields)
- [x] DataTable: search prop (renamed from searchable), column widths/alignment/styling, cell formatting via expression pipes, on_row_click, DataFrame support

### To Do — Components
- [ ] Indicator lights (colored dots next to category names)
- [ ] Slider constraint system — sliders that sum to 100%. Needs design discussion: deferred calc, client-side JS, or server-side enforcement?
- [ ] **Bold/heading font** — the default font looks bad at bold weights. Needs a better font for display/headline use.

### To Do — DataTable
- [ ] **Row selection + TableState** — checkboxes need state-syncing (like Slider's `.rx`) so other components can read selected rows. Requires a `TableState` class and renderer-side state writes.
- [ ] **Column resizing** — drag to resize columns
- [ ] **Per-column filters** — filter UI per column, not just global search

### To Do — Tooling/Docs
- [ ] **Better error for missing renderer deps** — `prefab dev build-docs` fails with `sh: vite: command not found` if `renderer/node_modules` is missing.
- [ ] **Grid responsive breakpoints are viewport-scoped** — consider container queries or documenting the workaround.
