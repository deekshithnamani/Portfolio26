# Portfolio Foundation Style Guide

## Color Roles

- Background: near-black in dark mode, warm off-white in light mode
- Foreground: high-contrast text color for headings and primary copy
- Mid foreground: metadata and body copy support tone
- Accent: signal red only for highlights, active indicators, and critical emphasis

## Typography Roles

- `Inter`: display and content headlines, plus body copy
- `JetBrains Mono`: section labels, nav labels, metadata, pills, index numbers, and ASCII blocks
- Display and content headlines stay sentence-case and light-weight
- Mono section labels and metadata stay uppercase and tracked

## Radius Rules

- Sharp: dividers, logo, index numbers, structural frames
- Soft: pills and compact buttons
- Medium: content containers and inline media
- Large: hero and cover media

## Spacing Rules

- Page gutters: `px-8 md:px-12 lg:px-16`
- Vertical rhythm: `py-16 md:py-20`
- Section breaks: `mb-12` to `mb-16`

## Interaction Rules

- No shadows, glows, or gradients
- Hover on rows uses a small horizontal translation, not scale
- Buttons may compress slightly on hover or active state
- Motion features disable under reduced-motion preferences

## Accessibility Rules

- Focus states must remain visible on every interactive element
- Drawer behaves like a dialog: focus trap, Escape to close, body scroll lock
- Custom cursor never replaces the native cursor on touch or reduced-motion setups

## Forbidden Patterns

- No fake employers or fabricated case-study metrics
- No lorem ipsum
- No centered generic portfolio-hero patterns
- No decorative flourishes that fight the industrial visual language
