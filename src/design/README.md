# Design system

- [tokens.css](../tokens.css) defines the light palette, Inter type scale, spacing, sizing, and Tailwind aliases.
- [index.css](../index.css) contains link, focus, dither, experience, and footer layout rules.
- [layout-system.ts](layout-system.ts) defines the shared page shell. [tokens.ts](tokens.ts) contains animation timings.
- [ui-recipes.ts](ui-recipes.ts) contains shared utility recipes. [tokens.validation.ts](tokens.validation.ts) checks core TypeScript values in development.

## Portfolio layout

- Keep the content centered within 640px. Body text uses 16px Inter and a 1.6 line height. Use `--text` for headings and links and `--text-2` for supporting metadata. The scale uses 13px for supporting text, 14px for navigation, 18px medium for section headings, and 23px semibold for page headings. The header has 48px below it.
- Work experience groups use `--experience-meta-width` for the 176px company, role, and dates column at 480px and up. Project titles fill the second column. Groups run newest first and can contain different numbers of projects. Below 480px, metadata stacks above the titles.
- Use `--line` for separators and the shared spacing tokens for gaps. Link every Work title to its project page. Use the secondary text color for unpublished status. Use `LinkLabel` for the trailing arrow on live links. Body links and their arrows use the same muted, 1px underline. Hover changes the color.
- The footer uses flex wrap to keep the external profiles on the left and credit on the right when space permits.
- Preserve visible focus, header tap height, and reduced-motion and hidden-tab behavior when editing the shell or dither.

## Motion

Use the CSS motion tokens for 200ms route entry, 240ms image reveals, and 140ms link color transitions. Keep these effects in the no-preference motion media query. Route entry changes opacity and leaves layout, fixed dither, and keyboard focus in place. Reserve both scrollbar gutters to keep the centered shell stable as page lengths change. Creative uses a two-column index from 480px and full-width photographs in series views, with a back link above the title.
