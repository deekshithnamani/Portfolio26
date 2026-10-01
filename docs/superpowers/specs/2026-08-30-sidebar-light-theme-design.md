# Sidebar Navigation And Light Theme Default

## Summary

Refine the portfolio shell so desktop navigation uses a slim left rail instead of a top app bar, while the site opens in light theme by default and no longer honors previous dark-mode preferences. Mobile keeps the existing top bar and drawer pattern. The footer remains at the bottom of the content column, not inside the sidebar.

## Approved Decisions

- Force light theme on load for all visitors.
- Hide the existing theme toggle without deleting its underlying code yet.
- Replace the desktop top app bar with a slim left navigation rail.
- Keep mobile navigation as a compact top bar with the existing drawer behavior.
- Keep the footer in the content column only.
- Keep the main navigation labels as `HOME`, `WORK`, `MAKE`, and `ABOUT`.

## Desktop Shell

Desktop uses a two-column layout:

- Left column: slim fixed or sticky rail containing the brand mark and vertical primary navigation.
- Right column: main page content with normal scrolling and the footer at the bottom.

The rail should stay visually quiet and compact. It should not include an extra meta block, contact block, or duplicated footer content.

## Mobile Shell

On smaller screens, preserve the current mobile-first navigation pattern:

- Compact top bar remains visible.
- Menu button opens the drawer.
- Drawer continues to present the same primary navigation items.

This keeps mobile behavior familiar while improving the desktop information architecture.

## Theme Behavior

Light theme becomes the only default visible behavior for now:

- Initial load resolves to light theme.
- Previously stored dark-mode preference should no longer override the default.
- Hidden toggle code may remain in the codebase temporarily, but users should not be able to surface dark mode through the UI.

## Footer Behavior

The footer remains part of the main content flow:

- It appears below the page content in the content column.
- It is not moved into the sidebar.
- It stays independent from the navigation structure.

## Implementation Notes

- Update the layout shell to support a desktop `sidebar + content` structure.
- Restrict the current top bar to mobile breakpoints only.
- Add a dedicated desktop side-rail component or equivalent layout branch.
- Update spacing and offsets so desktop no longer reserves room for a top app bar.
- Keep route structure intact; this is a shell/layout change rather than a route redesign.

## Verification

Update tests to cover:

- Desktop sidebar rendering.
- Mobile top bar and drawer continuity.
- Forced light-theme default behavior.
- Footer rendering within the content column.
- Existing route navigation remaining intact.

## Scope Guardrails

- Do not remove the hidden theme-toggle logic yet.
- Do not redesign page content structure in this pass.
- Do not move footer content into the sidebar.
- Do not introduce Git work in this pass.
