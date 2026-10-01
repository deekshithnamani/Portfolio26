# Portfolio Responsive Sizing Design

Date: August 28, 2026

## Purpose

Refine the portfolio so it feels balanced on small laptops, not just functional. The current build is responsive in the basic sense, but it still feels oversized at compact desktop widths because spacing, typography, and panel density shift too quickly into roomy desktop values. This pass introduces a clearer responsive sizing strategy and defines where explicit `small / medium / large` variants should exist.

## Source Of Truth

- User feedback on August 28, 2026: the portfolio feels too big on small laptop sizes.
- Existing portfolio foundation spec: `docs/superpowers/specs/2026-08-27-portfolio-foundation-design.md`.
- Existing production-hardening work: token cleanup, route cleanup, and lint/type/test/build verification completed on August 28, 2026.

## Problem Statement

The site currently adapts without breaking, but it does not yet adapt gracefully for compact laptop widths such as:

- `1280x720`
- `1366x768`
- `1440x900`

The main issue is not that components are missing explicit size variants. The issue is that layout density, heading scale, drawer width, and row padding still lean too far toward desktop spaciousness at medium widths.

## Goals

- Make the portfolio feel tighter and more intentional on small laptops.
- Keep desktop quality intact instead of shrinking everything globally.
- Define where `small / medium / large` size variants are appropriate and where they are not.
- Keep responsiveness driven by reusable tokens and shared recipes, not one-off page hacks.
- Preserve accessibility, focus states, reduced-motion behavior, and route behavior.

## Non-Goals

- No redesign of the visual language.
- No new pages or feature additions.
- No per-page bespoke breakpoint logic unless a reusable pattern cannot cover it.
- No universal `sm / md / lg` prop added to every component.

## Recommended Sizing Strategy

Use two systems together:

1. **Responsive semantic tokens for layout and typography**

- These control page gutters, section rhythm, row padding, headline scale, drawer width, and similar structural decisions.
- They should respond to viewport size automatically.
- They are the right tool for page-level adaptability.

2. **Explicit `small / medium / large` variants only for true controls**

- Use size variants for components that naturally come in different physical sizes:
  - buttons
  - pills / badges
  - icon buttons
  - inputs
  - avatars
- Do not force this pattern onto structural components like:
  - page containers
  - section headers
  - work rows
  - writing rows
  - full-page drawers

This keeps the system predictable. Controls get discrete variants. Layout gets fluid and responsive tokens.

## Why Not Put `small / medium / large` Everywhere

Making every component use `small / medium / large` sounds organized, but it usually creates noise:

- developers start guessing which size a page section should use
- page layout becomes dependent on many local decisions
- responsiveness gets harder because each component needs manual size selection
- the design system becomes less semantic and more mechanical

For this portfolio, the cleaner approach is:

- layout adapts by viewport
- controls expose deliberate size options only where needed

## Target Viewport Behavior

### Mobile

- Keep compact spacing and readable touch targets.
- Preserve the current basic stacked behavior.
- Avoid shrinking typography too far just to save space.

### Small Laptop

- Reduce horizontal gutters and vertical spacing from the current medium-width values.
- Bring list rows and preview rows closer together.
- Slightly reduce heading scale so the pages feel less inflated.
- Make the drawer feel more compact and less dominant.
- Keep enough negative space to preserve the industrial aesthetic.

### Large Desktop

- Preserve the current more spacious feel.
- Do not flatten the experience into a universally compact layout.

## Structural Changes

### Layout Tokens

The design system should define responsive layout density in a more granular way.

Expected responsibilities:

- `src/design/layout-system.ts`
  - page shell horizontal padding
  - page shell vertical padding
  - compact vs. standard container widths
  - small-laptop tuned spacing values

- `src/design/ui-recipes.ts`
  - row link density recipes
  - headline scale recipes
  - drawer panel sizing recipes
  - control size recipes only where shared controls need them

### Size Variant Rules

Use explicit size variants only for components with a true reusable size contract.

Examples:

- `MetaPill`
  - `sm`
  - `md`

- primary button / CTA recipe
  - `sm`
  - `md`

- icon button
  - `sm`
  - `md`

Do not add size variants to:

- `PageContainer`
- `SectionHeader`
- `RevealPanel`
- `WorkIndex` rows
- `WritingIndex` rows

Those should respond through tokens instead.

## Component-Specific Design Decisions

### Top Bar

- Slightly reduce perceived bulk at compact desktop widths.
- Keep the current fixed shell behavior.
- Preserve tap/click usability and focus clarity.

### Drawer

- Reduce width dominance on small laptops.
- Scale nav text more carefully so it still feels bold without overwhelming the viewport.
- Preserve current dialog semantics and interaction behavior.

### Home Hero

- Keep the hero expressive, but tune the responsive clamp so it does not feel oversized on smaller laptops.
- Preserve the strong stacked line breaks and accent treatment.

### List Rows

- Tighten row padding and gaps for work, writing, interests, and home previews.
- Maintain good hover affordance and scanability.
- Keep rows visually strong, not cramped.

### Detail Pages

- Reduce detail-page headline and section spacing at compact laptop widths while preserving the current desktop breathing room.
- Preserve readability for longer text blocks and media.

## Responsiveness Rules

- Prefer fewer, shared responsive recipes over many local breakpoint decisions.
- Treat small laptop widths as a first-class target, not just an extension of tablet or desktop.
- Avoid using `md` as the only major breakpoint for density changes when the page still feels too roomy there.
- Adjust density with semantic tokens before introducing component-specific overrides.

## Accessibility Rules

- Do not reduce interactive hit areas below comfortable pointer or touch usage.
- Focus states must remain visible at every size.
- Reduced-motion behavior must remain unchanged.
- Typography must remain readable after tightening scale and spacing.

## Testing Strategy

Add or update tests to cover:

- responsive class recipes that drive compact laptop density
- any new size variant contracts for reusable control components
- unchanged behavior for drawer accessibility, route rendering, and reduced-motion support

Manual verification should explicitly check:

- `1280x720`
- `1366x768`
- `1440x900`
- a narrow mobile width
- a larger desktop width

## Success Criteria

This pass is successful when:

- the portfolio no longer feels oversized on small laptops
- layout density is controlled through shared tokens and recipes
- only the right reusable controls expose discrete size variants
- desktop and mobile still feel intentional
- lint, typecheck, tests, and production build all pass after the changes

## File Impact

Planned files to change:

- `src/design/layout-system.ts`
- `src/design/ui-recipes.ts`
- `src/components/ui/shared.tsx`
- `src/components/ui/shared-props.ts` if size variants are added to shared controls
- `src/components/layout/top-bar.tsx`
- `src/components/layout/nav-drawer.tsx`
- `src/pages/Home.tsx`
- `src/pages/Work.tsx`
- `src/pages/Writing.tsx`
- `src/pages/Interests.tsx`
- `src/pages/NotFound.tsx`
- relevant test files under `src/__tests__/`

## Final Recommendation

The right long-term rule for this project is:

- use responsive semantic tokens for layout and typography
- use explicit `small / medium / large` variants only for true reusable controls

That gives the portfolio a cleaner system, better scalability, and less confusion than trying to make every component fit a universal size-variant API.
