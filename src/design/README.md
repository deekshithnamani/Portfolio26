# Design package

This folder centralizes shared visual constants and helpers for the app.

- `tokens.ts`
  - Theme constants: `DARK` and `LIGHT`.
  - Animation timing values: `UI_ANIMATION_TOKENS`.
- `layout-system.ts`
  - Layout spacing and shell helpers used by shared UI containers.
  - `buildPageShellClassName({ compact })` returns the page wrapper class list.
- `ui-recipes.ts`
  - Named shared utility-class recipes for repeated text, links, pills, and media surfaces.
- `tokens.validation.ts`
  - Lightweight development-only checks to verify core design values are valid.
  - Values are intentionally validated at import-time during development and skipped in production.

## Where to add new values

- Use `tokens.ts` when the value is a reusable visual primitive (color, animation duration/easing, etc.).
- Use `layout-system.ts` for reusable container composition and page shell utilities.
- Use `ui-recipes.ts` when the value is a repeated semantic class recipe used in multiple components.
- Keep page-specific one-off CSS in component files or local CSS classes.
- For any new design token family, add a focused file and re-export from this folder index.

## Token naming conventions

### 1) Token namespaces

- Global tokens should be grouped by purpose:
  - `Theme` and theme families: `tokens.ts` (`DARK`, `LIGHT`, `Theme`, `UI_ANIMATION_TOKENS`).
  - Layout utilities: `layout-system.ts` (`LAYOUT_TOKENS`, `buildPageShellClassName`).
  - Shared class recipes: `ui-recipes.ts` (`UI_RECIPE_TOKENS`).
  - CSS custom properties: `--surface-*` for all theme surfaces.

### 2) Object and key naming

- Keep object names uppercase with `snake_case` for shared static constants (example: `UI_ANIMATION_TOKENS`).
- Keep object keys in `camelCase` and role-based:
  - Colors/roles: `accent`, `bg`, `fg`, `fgMid`, `fgDim`, `border`, `borderMid`, `navBg`, `card`.
  - Recipes/roles: `actionLink`, `bodySupport`, `bodyProse`, `mediaFrame`, `titleLarge`, `titleMedium`.
- Prefer role names over direct visual values.

### 3) CSS token naming

- Use the `--surface-*` prefix for CSS variables:
  - `--surface-bg`, `--surface-fg`, `--surface-accent`, `--surface-border`, etc.
- Treat these as runtime bridge variables that mirror `Theme` keys.

### 4) Route for adding a new token

1. Add semantic value in the relevant token file.
2. Add/extend validation checks if type constraints should be enforced.
3. Wire to CSS variables (when needed) in `layout-utils.ts`.
4. Consume through exported names, not inline magic strings.

### 5) Anti-patterns to avoid

- Avoid inline hex/rgb values in components when a token exists.
- Avoid numeric literals for repeated values (e.g., spacing/durations) unless local and truly one-off.
- Avoid adding duplicate token families that duplicate existing concepts under different names.
