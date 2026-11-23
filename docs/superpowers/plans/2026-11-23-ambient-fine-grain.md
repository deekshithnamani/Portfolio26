# Ambient fine grain

Remove the pointer-warp adapter so the background follows its ambient motion
only. Keep all seven effects and per-visit selection. Request 2px desktop and 3px
mobile cells, snap to whole device pixels, and cap the canvas at 600,000 cells so
larger screens do not scale GPU work without bound. Lazy loading, 30fps rendering,
reduced-motion and visibility handling remain unchanged.

Validate ambient-only input, desktop sizing, 4K budget/coverage, fractional device
scales, existing navigation, type checking, lint, tests, and production build.
