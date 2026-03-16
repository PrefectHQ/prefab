---
name: Budget allocator build plan
description: Components needed to build the budget allocator screen, tracked as a todo list
type: project
---

## Budget Allocator — Component Backlog

From the budget allocator screen design session (2026-03-15):

### Done
- [x] Sparkline component (line + area modes, variants, indicator_class, curve interpolation)

### To Do
- [ ] **DataTable component cells** — cells must support rendering components (Sparkline, Badge, Progress, etc.), not just `String(value)`. Currently `cell: ({ getValue }) => String(value)` in the renderer. This is a blocker for real dashboard use.
- [ ] Indicator lights (colored dots next to category names)
- [ ] Brighter badge variants
- [ ] Colored slider handle variants
- [ ] Slider constraint system — sliders that sum to 100%. Needs design discussion: deferred calc, client-side JS, or server-side enforcement?
- [ ] Sparkline bar mode (`mode="bar"`)
- [ ] **Bold/heading font** — the default font looks bad at bold weights and in headings (H1s, Metric values). Needs a better font for display/headline use.
- [ ] **Badge variants for dashboards** — reference: https://shadcnstore.com/blocks/application/widgets — tinted outline pills (green/red) with trend icons. Needed for Metric delta display and general dashboard use.
- [ ] **Metric trend indicator wrapping** — the value + delta row in Metric doesn't wrap, so the delta clips on narrow cards. Should `flex-wrap` or move delta below value at narrow widths. This is related to the broader trend indicator redesign.
- [ ] **Metric trend indicator redesign** — current trend indicator (squiggly arrow + colored text inline with the value) looks like an afterthought and bleeds off awkwardly. Replace with a proper badge-style pill: green/red background (or outline), containing the trend icon + delta text. Reference: the "Top Performers" and "Top Products" screenshots — rounded pill badges with light tinted backgrounds, trend arrow inside, text colored to match. This is really a Badge variant question — need `success`/`destructive` outline badges with trend icons built in, or a way to compose Badge + icon easily.

- [ ] **Playground line numbers** — error messages don't show line numbers, making indentation errors hard to debug
- [ ] **Dead link in Grid docs** — line 371 of `grid.mdx` links to `/css#responsive-layout-props` which doesn't exist. Need to either create the page or remove/redirect the link.
- [ ] **Broken link checks** — verify Mintlify's built-in broken link detection is enabled, or add a CI check. Multiple dead links may exist beyond the Grid one.
- [ ] **Grid responsive breakpoints are viewport-scoped** — `md:grid-cols-3` uses viewport width, not container width. In docs (which have a sidebar eating ~300px), this means breakpoints fire at the wrong size. Consider container queries or documenting the workaround.

**Why:** The budget allocator screen is the motivating use case, but these are general-purpose gaps. DataTable component cells in particular blocks any dashboard that wants inline visualizations.
