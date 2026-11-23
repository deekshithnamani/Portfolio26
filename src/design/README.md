# Design system

- [tokens.css](../tokens.css) defines the light palette, Inter type scale, spacing, sizing, and Tailwind aliases.
- [index.css](../index.css) contains link, focus, dither, project lists, and footer layout rules.
- [layout-system.ts](layout-system.ts) defines the shared page shell. [tokens.ts](tokens.ts) contains animation timings.
- [ui-recipes.ts](ui-recipes.ts) contains shared utility recipes. [tokens.validation.ts](tokens.validation.ts) checks core TypeScript values in development.

## Portfolio layout

- Keep the content centered within 640px. Body text uses 15px Inter and a 1.6 line height. Use `--text` for headings and links and `--text-2` for supporting metadata. The scale uses 12px for supporting text, 14px for page descriptions and navigation links, 15px medium for Creative grid titles, 16px for project and series titles, 18px for section headings, and 20px semibold for main page headings. The header name uses 16px. The header has 40px below it, and the current nav item is semibold. Home uses 40px between its intro and the project list heading.
- Home shows a divider-free list of featured projects with titles first, followed by their type and optional period. On Work, company, role and duration sit beside one or more project titles from 480px and stack above them at narrower widths. Company names use muted 14px text. Roles and year-only durations use muted 12px text. Company-project rows do not repeat the company or add descriptions. Product thinking keeps years in data for sorting and omits them from the interface.
- Use the 4px heading gap between page titles and their descriptions.
- Use `--line` between Work companies. Keep individual project rows divider-free. Keep supporting copy and unpublished titles in `--text-2`. Use `LinkLabel` for trailing arrows. Body links and their arrows share a muted 1px underline that changes color on hover.
- The footer uses flex wrap to keep the external profiles on the left and the 14px credit on the right when space permits.
- Preserve visible focus, header tap height, and reduced-motion and hidden-tab behavior when editing the shell or dither.
- The active palette is `--bg`, `--text`, `--text-2`, `--line`, `--dither`,
  `--case-image`, and `--link-underline`. The removed New badge has no retained
  color or sizing tokens.

## Motion

Use the CSS motion tokens for 200ms route entry, 240ms image reveals, and 140ms link color transitions. Keep these effects in the no-preference motion media query. Route entry changes opacity and leaves layout, fixed dither, and keyboard focus in place. Reserve the scrollbar gutter to keep the shell stable as page lengths change and let the Home texture reach the viewport edge. Creative uses a two-column index from 480px and a responsive photo grid in series views, with a 12px muted back link and 16px of space before the title. Grid descriptions use 14px. Returning through the gallery back link scrolls to and focuses the corresponding tile.

Case-study section navigation wraps beneath the project intro on narrow screens and sits in the right margin on desktop. Use the shared `BackLink` for leading arrow icons and accessible destination labels.

Home rotates between fire, smoke, plasma, waves, and aurora. Contours and ripples are hidden via visibility flags, with their code and direct previews retained. Returning from another page or reloading selects a different effect. The fields and engine are lazy-loaded. The background uses muted light red in light mode and slate blue in dark mode at uniform 40% opacity without glow, text masks, or footer backings, and 2px desktop / 3px mobile blue-noise cells. Fire, Smoke, and Plasma have lighter density or intensity to reduce solid areas. Ripple and Waves retain their existing placement. Motion is ambient only. Device-aligned cells grow when needed to fit the 600,000-cell budget; the engine caps at 30fps, pauses when hidden or offscreen, and respects reduced motion. See `docs/home-backgrounds.md` and `THIRD_PARTY_NOTICES.md`.

The header theme toggle supports light and dark palettes with a saved preference and system default. Home shaders and Creative cover canvases refresh their colors in place. See `docs/dark-mode.md`.

The header name alone uses self-hosted Fraunces Regular at 20px; headings, navigation, and body copy remain Inter. The Latin font subset and its OFL license are in `public/fonts/`.
