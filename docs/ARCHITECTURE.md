# Portfolio Architecture (Non-Technical Guide)

## What this project is

This is a React + TypeScript web app that renders your portfolio pages and routes between sections like:
Home, Work, Lab, Writing, and Interests.

Think of it like a house:

- `src/App.tsx` is the front door and hallway (`routes` to different pages).
- `src/Layout.tsx` is the single public entry into the layout shell, while `src/components/layout/*` holds the internal shell parts (header, menu, cursor, page transitions).
- Each page file under `src/pages/*` is a room with its own content.

## Tech stack (simple view)

- **Core app**: React 19, TypeScript, Vite.
- **Routing**: React Router.
- **Styling**: Tailwind CSS + custom `src/index.css` variables and classes.
- **Motion/interaction**: Motion (for subtle animations and page effects).
- **Testing**: Vitest + React Testing Library.
- **Utilities**: `clsx`, small local helpers in `src/lib`.

## Important folders and what they mean

- [src/](C:\Users\Dnamani\Personal\Portfolio26\src)
  - `index.css`: global styles, typography, and theme CSS variables.
  - [src/App.tsx](C:\Users\Dnamani\Personal\Portfolio26\src\App.tsx): defines which URL paths show which page.
  - [src/Layout.tsx](C:\Users\Dnamani\Personal\Portfolio26\src\Layout.tsx): re-export entry so the outside world still imports from one place.
- [src/components/](C:\Users\Dnamani\Personal\Portfolio26\src\components)
  - [src/components/layout/](C:\Users\Dnamani\Personal\Portfolio26\src\components\layout): all shared chrome pieces (top bar, drawer, cursor, route effects, transitions).
  - [src/components/ui/shared.tsx](C:\Users\Dnamani\Personal\Portfolio26\src\components\ui\shared.tsx): reusable page building blocks.
  - [src/components/ui/shared-props.ts](C:\Users\Dnamani\Personal\Portfolio26\src\components\ui\shared-props.ts): shared prop type contracts for UI primitives.
  - [src/components/ui/index.ts](C:\Users\Dnamani\Personal\Portfolio26\src\components\ui\index.ts): shared UI barrel export.
- [src/data/](C:\Users\Dnamani\Personal\Portfolio26\src\data)
  - Split by content type (work, lab, writing, interests) and surfaced via index exports.
- [src/design/](C:\Users\Dnamani\Personal\Portfolio26\src\design)
  - Design tokens (colors, animation timing), named UI recipes in `ui-recipes.ts`, plus layout helpers in [src/design/layout-system.ts](C:\Users\Dnamani\Personal\Portfolio26\src\design\layout-system.ts) and the shared design barrel.
- [src/lib/](C:\Users\Dnamani\Personal\Portfolio26\src\lib): tiny pure helper functions.
- [src/**tests**](C:\Users\Dnamani\Personal\Portfolio26\src__tests__): behavior checks for layout and data imports.

## Yes, there is a style sheet and design tokens

- Style sheet: [src/index.css](C:\Users\Dnamani\Personal\Portfolio26\src\index.css)
- Design tokens: [src/design/tokens.ts](C:\Users\Dnamani\Personal\Portfolio26\src\design\tokens.ts)
- UI recipe tokens: [src/design/ui-recipes.ts](C:\Users\Dnamani\Personal\Portfolio26\src\design\ui-recipes.ts)
- Token exports shortcut: [src/design/index.ts](C:\Users\Dnamani\Personal\Portfolio26\src\design\index.ts)

## Common components in use

- Reused UI building blocks live in:
  - [src/components/ui/index.ts](C:\Users\Dnamani\Personal\Portfolio26\src\components\ui\index.ts) (use this barrel import for shared UI)
  - [src/components/ui/shared.tsx](C:\Users\Dnamani\Personal\Portfolio26\src\components\ui\shared.tsx)
- Reused layout helpers/hooks live in:
  - [src/components/layout/layout-utils.ts](C:\Users\Dnamani\Personal\Portfolio26\src\components\layout\layout-utils.ts)
  - [src/components/layout/layout-context.ts](C:\Users\Dnamani\Personal\Portfolio26\src\components\layout\layout-context.ts)

## How to add features without chaos

When adding a new page:

1. Add page content file under `src/pages`.
2. Add the route in [src/App.tsx](C:\Users\Dnamani\Personal\Portfolio26\src\App.tsx).
3. If new shared UI appears, place it in `src/components/ui`.
4. If new shared data appears, add a file under `src/data` and export from [src/data/index.ts](C:\Users\Dnamani\Personal\Portfolio26\src\data\index.ts).

When adding a new visual style tweak:

1. Try to add reusable CSS variables in [src/index.css](C:\Users\Dnamani\Personal\Portfolio26\src\index.css) first.
2. For brand colors, spacing tone, or shared values, update [src/design/tokens.ts](C:\Users\Dnamani\Personal\Portfolio26\src\design\tokens.ts).

When adding a new shared UI primitive:

1. Add it in [src/components/ui/shared.tsx](C:\Users\Dnamani\Personal\Portfolio26\src\components\ui\shared.tsx) if it is generic.
2. Re-export it from [src/components/ui/index.ts](C:\Users\Dnamani\Personal\Portfolio26\src\components\ui\index.ts).
3. Import from `../components/ui` in pages and tests.

## Why this setup is good for long-term growth

This layout is now split into small files by responsibility:

- data vs. UI shell vs. styles vs. helpers.

So as new sections, feature pages, or capabilities grow, each change lands in a predictable folder instead of a single large file.
