# Background visibility and reading boundary

Hide Ripple and Contours using visibility flags, retaining their implementation
and manual query previews. Automatic selection uses Waves, Fire, Smoke, Plasma.

The old full-height reading stripe (3%) intersected with a footer fade (10%),
leaving the bottom center at 0.3% opacity. Replace that with an additive mask that
opens below the actual project-list bottom. Measure this boundary after layout
and update it on content reflow, resize, and scroll. Protect just the footer label
groups with a neutral backing. Keep the lower-center pattern visible.

Validate active vs retained effect pools, measured boundaries and cleanup,
actual Home wiring, focused source lint, type checking and the production build.
