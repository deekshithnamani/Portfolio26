# Portfolio Foundation Design

Date: August 27, 2026

## Purpose

Build the foundation layer for a personal portfolio website in a visual style inspired by Nothing and Teenage Engineering: industrial, technical, high-contrast, flat, and restrained, with a sparing red accent and mixed corner radii. This phase covers the project structure, shared primitives, design tokens, theme system, routing shell, and style guide conventions that the full portfolio will sit on top of.

## Source Of Truth

- Primary user request: the pasted design brief asking for a personal portfolio site in the Nothing / Teenage Engineering visual language.
- Supporting implementation guidance: `C:\Users\Dnamani\Downloads\portfolio-codex-spec.md`.
- Explicit user decision on August 27, 2026: use a `top bar + drawer everywhere` navigation shell for the current build, even though the earlier brief described a persistent desktop sidebar. This may be revisited later if the desktop experience wants a different navigation model.

## Scope For This Foundation Phase

This phase sets up the reusable system, not the complete final content pass.

Included:

- React + Vite + TypeScript application structure
- Tailwind CSS v4 setup through `@tailwindcss/vite`
- Global dark/light design tokens
- Theme context and theme toggle behavior
- Full route structure for the portfolio
- Global layout shell with top bar, drawer, cursor, magnetic interactions, and reduced-motion fallbacks
- Shared page primitives such as headers, filters, and empty states
- Safe typed content scaffolding with `"TBD"` placeholders only
- Written style-guide rules inside the repo

Not included in this phase:

- Final real portfolio copy
- Final case-study assets
- Final writing posts
- Public deployment setup
- Invented background, employers, or fabricated metrics

## Stack

- React 19.x
- Vite (latest stable) with `@vitejs/plugin-react`
- TypeScript
- Tailwind CSS v4 via `@tailwindcss/vite`
- React Router v7 via `react-router`
- `motion` for animation and interaction
- `clsx` for class composition
- `lenis` optional and not required for the first pass

## Visual Direction

The site should feel engineered rather than decorative. The visual language is flat, monochrome-first, and strongly structured, softened only where content needs tactility.

Core traits:

- Near-black and off-white base palette
- Signal red used rarely and deliberately
- No gradients, no shadows, no glow
- Sharp structural edges for dividers, index marks, frames, and the logo
- Softer radii for buttons, pills, content containers, and large media
- Monospace typography for labels, metadata, nav, and numbering
- Grotesk sans-serif typography for headlines and body copy

## Foundation Architecture

The project should be split into three layers:

1. Global system

- `src/theme.ts`
- `src/index.css`
- `src/Layout.tsx`
- `src/App.tsx`
- `src/main.tsx`

2. Shared primitives

- `src/pages/shared.tsx`

3. Content pages and typed data

- `src/data.ts`
- `src/pages/Home.tsx`
- `src/pages/Work.tsx`
- `src/pages/Lab.tsx`
- `src/pages/Writing.tsx`
- `src/pages/Interests.tsx`
- `src/pages/NotFound.tsx`

This separation keeps global behavior centralized, prevents motion logic from leaking into every page, and lets content pages stay mostly declarative.

## File Structure

```text
src/
  index.css
  main.tsx
  App.tsx
  theme.ts
  data.ts
  Layout.tsx
  pages/
    shared.tsx
    Home.tsx
    Work.tsx
    Lab.tsx
    Writing.tsx
    Interests.tsx
    NotFound.tsx
docs/
  superpowers/
    specs/
      2026-08-27-portfolio-foundation-design.md
    style-guides/
      portfolio-foundation-style-guide.md
```

## Design Tokens

Color tokens live in `src/theme.ts` and remain the single JavaScript source of truth.

```ts
export const DARK = {
  bg: "#050505",
  fg: "#f2ede8",
  fgMid: "#565050",
  fgDim: "#1e1a1a",
  border: "#161212",
  borderMid: "#1e1a1a",
  navBg: "rgba(5,5,5,0.97)",
  accent: "#FF3B30",
  card: "#050505",
};

export const LIGHT = {
  bg: "#faf7f2",
  fg: "#0d0a08",
  fgMid: "#888077",
  fgDim: "#d8d0c4",
  border: "#e8e0d4",
  borderMid: "#e0d8cc",
  navBg: "rgba(250,247,242,0.97)",
  accent: "#e02a20",
  card: "#faf7f2",
};

export type Theme = typeof DARK;
```

CSS-level theme values live in `src/index.css` using Tailwind v4 `@theme` blocks and CSS custom properties derived from the active theme.

Radius system:

- Sharp: `0px`
- Soft: `6px` to `8px`
- Medium: `8px` to `12px`
- Large: `16px`

Typography system:

- Inter for headlines and body copy
- JetBrains Mono for labels, nav, metadata, and index numbers
- Hero headline uses the large responsive clamp from the supporting spec
- Body copy remains `text-sm` with long line height

Spacing system:

- Page padding: `px-8 md:px-12 lg:px-16 py-16 md:py-20`
- Main content top clearance for fixed chrome: `pt-14 md:pt-16`
- Section spacing generally in the `mb-12` to `mb-16` range

## Global CSS Rules

`src/index.css` should contain:

- Google Fonts CSS2 imports before everything else
- Tailwind import / setup
- Theme variables
- Base `html`, `body`, and `#root` sizing
- Global body background and foreground application
- Site-wide selection colors
- Hidden scrollbars
- Reusable semantic utility classes for:
  - mono labels
  - thin row dividers
  - grayscale media treatment
  - corner-bracket frame helpers
  - focus-visible states

The CSS should not become a second component system. It should only hold true design-system rules and repeated visual patterns.

## Theme System

Theme state lives in `src/Layout.tsx` through a `ThemeCtx` provider, because the layout needs route awareness and global UI ownership.

`useTheme()` should return:

```ts
{ dark: boolean; t: Theme; toggle: () => void }
```

Rules:

- Dark mode is the default
- Theme switching updates the active token set everywhere
- The toggle is always available from the fixed top bar
- The toggle is a sharp-cornered 36x20 control with a square thumb

## Navigation Shell

The approved shell for this build is a fixed top bar plus a full-screen drawer on all viewports.

### Top bar

- Fixed at the top on every viewport
- Uses `t.navBg` and backdrop blur
- Has a 1px bottom border
- Left side: `LogoMark` plus wordmark linking home
- Right side: `ThemeSwitch` and menu trigger
- Desktop trigger can include a mono `MENU` label plus icon
- Mobile trigger can stay more compact

### Drawer

- Opens from the top-bar trigger
- Backdrop click closes it
- Route changes close it
- `Escape` closes it
- Focus stays trapped while open
- Body scroll locks while open
- The panel carries:
  - close control
  - large stacked nav links
  - one-line nav descriptions
  - contact block
  - signature line

### Active nav indicator

- A single small accent dot
- Position is measured from the active nav link and animated with a spring
- `/` matches exactly
- Other routes use `startsWith`

## Shared Components

`src/pages/shared.tsx` should contain the common page-level primitives.

### `SectionHeader`

Responsibility:

- Render the consistent intro block used by index pages

Behavior:

- Mono all-caps section title
- Red lead mark
- Muted one-line description
- Shared spacing that works across `Work`, `Lab`, `Writing`, and `Interests`

### `FilterPills<T>`

Responsibility:

- Reusable filter control for string-like tag collections

Behavior:

- Rounded pill controls
- Accent border and text for the active state
- Muted inactive state
- Slight visual lift on hover
- Usable for lab filters, writing tags, and interests tags

### `AsciiEmpty`

Responsibility:

- Render deliberate sparse or empty states

Behavior:

- Monospace ASCII block
- Used whenever a section would otherwise look visually abandoned
- Shared base version for content pages
- `NotFound` can render a larger specialized variation

## Global Interaction Components

### `LogoMark`

- 24x24 viewBox SVG
- Sharp geometry only
- Uses `t.fg` and `t.accent`

### `ThemeSwitch`

- Uses the theme context
- Linear transitions only
- Square thumb, not circular

### `MagneticButton`

Design decision:

- It is a wrapper rather than a button replacement

Why:

- The same interaction can enhance links, buttons, and nav items without forcing a single semantic element

Behavior:

- Tracks the pointer near the wrapped element
- Applies a small spring-based translation
- Resets on leave
- Skips itself under reduced-motion preferences

### `CustomCursor`

Behavior:

- Renders only on fine-pointer devices
- Does not render when reduced motion is requested
- Default state is a small red dot using difference blending
- Hover state morphs into a pill with a label such as `VIEW` or an item index

Implementation rule:

- Cursor state should be exposed through a small shared channel so pages can request labels without owning cursor animation logic

### `PageTransition`

Behavior:

- Fixed full-screen black overlay
- Brief flash on route change
- No effect under reduced motion

## Routing

The real route map should exist from the first app pass:

```text
/                -> Home
/work            -> WorkIndex
/work/:slug      -> WorkDetail
/lab             -> Lab
/writing         -> WritingIndex
/writing/:slug   -> PostDetail
/interests       -> Interests
*                -> NotFound
```

Even if some page bodies initially render structured placeholders, the route graph itself should be final so navigation and shell behavior can be validated early.

## Content Model

`src/data.ts` should keep the exact typed shapes agreed in the supporting spec. The important rule is content safety:

- No invented biography
- No invented employers
- No invented project metrics
- No lorem ipsum
- Only real content or explicit `"TBD"` placeholders

The writing body format may remain paragraph-based strings with `\n\n` separation and lightweight `**bold**` parsing because that is part of the chosen content model.

## Style Guide Requirements

A separate repo document should be created at:

`docs/superpowers/style-guides/portfolio-foundation-style-guide.md`

It should document:

- color roles
- typography roles
- radius rules
- spacing rules
- media treatment
- interaction rules
- accessibility rules
- forbidden styles and anti-patterns

It should explicitly call out:

- no shadows
- no gradients
- no glow
- no decorative visual noise
- no fake personal history in seeded content

## Accessibility

Accessibility is a foundation concern, not a polish step.

Required behavior:

- visible keyboard focus states
- drawer focus trap
- drawer close on `Escape`
- body scroll lock while drawer is open
- reduced-motion support for all motion features
- native cursor fallback when the custom cursor is disabled
- no motion-only communication for state changes

## Responsive Strategy

The shell remains structurally consistent across viewport sizes:

- fixed top bar on all screens
- drawer on all screens
- full-width main content

What changes by breakpoint:

- spacing
- top-bar sizing
- drawer width
- nav type scale

The goal is consistency of behavior rather than dramatically different layouts.

## Verification For The Foundation Phase

This phase is successful when:

- the app boots cleanly
- the full route map renders
- the top bar and drawer work on desktop and mobile widths
- the theme toggle updates visual tokens correctly
- reduced-motion paths disable motion features
- empty states render intentionally
- shared primitives feel consistent across index pages
- no content seed presents fiction as fact

## Future Flexibility

The approved `top bar + drawer everywhere` shell is intentionally reversible. If later testing shows the desktop experience wants a persistent rail, the page content and token system should not need to change. The layout shell should be the only major component that needs restructuring.

## Summary Decision

Build a real production-oriented portfolio skeleton now, with:

- a full route map
- centralized tokens and theme state
- shared primitives for headers, pills, and empty states
- centralized motion and accessibility logic
- a written style guide
- safe typed content scaffolding using `"TBD"` placeholders only

This is the recommended starting point because it gives an immediately usable app foundation without overbuilding the first pass.
