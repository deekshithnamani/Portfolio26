# Design system

- [tokens.css](../tokens.css) defines the light palette, Inter type scale, spacing, sizing, and Tailwind aliases.
- [index.css](../index.css) contains link, focus, dither, project lists, and footer layout rules.
- [layout-system.ts](layout-system.ts) defines the shared page shell. [tokens.ts](tokens.ts) contains animation timings.
- [ui-recipes.ts](ui-recipes.ts) contains shared utility recipes. [tokens.validation.ts](tokens.validation.ts) checks core TypeScript values in development.

## Portfolio layout

- Keep the content centered within 640px. Body text uses 15px Inter and a 1.6 line height. Use `--text` for headings and links and `--text-2` for supporting metadata. The scale uses 12px for supporting text, 14px for header, footer, and case-study navigation links, 16px for project and gallery titles, 18px for section headings, and 20px semibold for main page headings. The header name uses 16px. The header has 40px below it, and the current nav item is semibold. Home uses 40px between its intro and the project list heading.
- Home and Work use shared rows with year, project title, and status. From 480px, the year and status sit beside the project. At smaller widths, the title sits above the metadata. Work can include a description below the title.
- Use `--line` at list boundaries and between list rows. Keep unpublished titles and metadata in `--text-2`. Use `LinkLabel` for trailing arrows. Body links and their arrows share a muted 1px underline that changes color on hover.
- The footer uses flex wrap to keep the external profiles on the left and the 14px credit on the right when space permits.
- Preserve visible focus, header tap height, and reduced-motion and hidden-tab behavior when editing the shell or dither.

## Motion

Use the CSS motion tokens for 200ms route entry, 240ms image reveals, and 140ms link color transitions. Keep these effects in the no-preference motion media query. Route entry changes opacity and leaves layout, fixed dither, and keyboard focus in place. Reserve both scrollbar gutters to keep the centered shell stable as page lengths change. Creative uses a two-column index from 480px and a responsive photo grid in series views, with a muted back link above the title. Returning through the gallery back link scrolls to and focuses the corresponding tile.

Case-study section navigation sits in the right margin and is vertically centered on desktop. Use the shared `BackLink` for leading arrow icons and accessible destination labels.

Home dither uses three procedural layers over the off-white surface. The base grain stays still and uses round dots. The middle wave uses 2px square pixels and the foreground uses sparse 3px diamonds. A broad, shallow mask and a narrower mask with sharper crests keep the moving layers visible as they travel back and forth, with staggered starts and 7s and 10s passes. At each turnaround, both paths return to their horizontal center so the next pass can vary its sideways drift without jumping. The foreground tracks the desktop mouse independently. Touch supports the ambient waves, while reduced motion keeps the composition still and hidden tabs pause both waves. Creative continues using photograph-based previews.
