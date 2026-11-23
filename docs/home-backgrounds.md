# Homepage backgrounds

Home uses the dithercn WebGL engine with seven selected example fields. Each Home
visit, including a return from another page, picks a new effect. Re-renders on the
same visit keep the choice. Committed choices are remembered in memory and, when
available, session storage so the next visit or reload avoids an immediate repeat.
There is no timed rotation or background carousel.

The automatic rotation uses `waves`, `fire`, `smoke`, `plasma`, and `aurora`. Ripple and
Contours are hidden through `HOME_EFFECT_VISIBILITY` in the selection config;
their code and direct query previews remain available. Set their flags to true
to restore them to the rotation. `HOME_EFFECTS` retains all seven implemented names,
while `ACTIVE_HOME_EFFECTS` contains only the visible ones.
Flow Field, Tunnel, and Horizon remain as source references but are not
imported into the app bundle. All effects use muted light red (#c47575) over warm paper in light mode,
and slate blue (#8fafd1) over charcoal in dark mode,
at a uniform 40% opacity across desktop and mobile. There is no glow, reading-column
mask, or footer backing. Transparent paper cells leave low-density areas open.
Fire, Smoke, and Plasma use reduced intensity or density to avoid heavy solid areas.

To review one directly, open `/?effect=waves` or substitute any name above.
For example, the local server's Waves preview is
`http://127.0.0.1:5174/?effect=waves`. Remove the query to return to random selection.
The selected name is also on the background's `data-effect` attribute.

- Selection: `src/config/home-background.ts`.
- Lazy loading and per-visit state: `src/components/ui/dither-background.tsx`.
- Individual settings and shared palette: `src/components/ui/home-background-effect.tsx`.
- Uniform opacity and full-viewport positioning: `src/design/home-background.css`.
- Native example sources: `src/components/dithercn/`.
- Engine and rendering budget: `src/lib/dither/`.
- Palette and cell size: `src/tokens.css`.

Only the selected effect mounts, using one WebGL context at 30fps. Dithering
updates the tone of individual fixed cells with ambient motion only; cursor
deformation and pointer-driven animation loops have been removed. Hidden tabs and
offscreen effects pause. Reduced motion displays a finished still frame.
Without WebGL the selected example supplies a static CSS
or SVG approximation, rather than animated pixels.

The shader engine and seven effect fields load in a separate chunk, requested only
when Home mounts. Desktop requests 2px cells and mobile requests 3px cells, using
the less regular blue-noise threshold pattern. Cells snap to whole device pixels
and grow on very large screens to keep the canvas within 600,000 cells. Each effect has
its own speed, density and detail settings: three shallow waves below the 30%
horizon (the lower third), one narrow-ring ripple source outside the lower-right
corner with slower radial decay and a viewport-scaled 70vw by 100vh fade,
seven plain contours, lower low-ember fire, lighter
smoke, broad low-contrast plasma, and three soft Aurora curtains without glow.
Without WebGL, Waves uses full-width curved SVG swells instead of a straight horizon.
The pattern continues behind the copy and footer
without a content-shaped cutout.
The page copy renders immediately while the background chunk loads.

Third-party source attribution and local compatibility changes are recorded in
`THIRD_PARTY_NOTICES.md`. No new npm runtime dependencies were required.

## Verification limits

Unit tests cover per-visit selection, return-to-Home navigation, seven field connections,
single-source narrow ripples, lower-third waves without glow,
ambient-only input, grid coverage, cell budget, and fractional display scales. jsdom cannot run WebGL;
those tests mock the low-level renderer. Actual shader compilation, appearance,
frame rate and phone layouts need a real-browser review of the seven
query URLs in both themes. The header toggle refreshes the palette in place; see
`docs/dark-mode.md`.
