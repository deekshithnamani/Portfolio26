# Dark mode

The header's moon/sun toggle switches light and dark themes. On the first visit,
the site follows the system preference; a manual choice is saved as
`portfolio.theme` in local storage. Storage failures do not disable the switch.
Other tabs stay in sync, and clearing the saved choice restores system following.

The small initialization script in `index.html` applies the theme before styles
render, avoiding a light flash on a dark visit. Keep its storage key and system
query in sync with `src/components/ui/theme-toggle.tsx`. The inline theme-shell
styles also paint the correct page background before application CSS loads;
startup tests keep those two background colors in sync with the theme tokens.
Below 480px the header uses separate rows for the name/toggle and navigation.

Theme colors live in `src/tokens.css`. Light keeps warm paper and muted red;
dark uses charcoal, warm light text, gray placeholders and muted slate blue.
The dither stays at 40% opacity in both themes. Text contrast is tested against
both paper and the strongest dither color.

The shared dither observer watches `data-theme` on the document root. Home shaders
refresh their palette and redraw without remounting or changing the chosen effect.
Creative cover canvases subscribe to the same observer and redraw from the original
photo. Static fallbacks inherit the CSS colors. Reduced-motion behavior is unchanged.
Fullscreen media uses the active theme's paper and text for readable controls,
captions and photo navigation.

Checks cover persistence, system changes, cross-tab sync, disabled storage,
palette notifications, effect continuity, and light/dark text contrast. Actual
WebGL appearance and mobile layout still need browser review.
