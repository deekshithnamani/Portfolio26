# Portfolio architecture

This React and TypeScript app uses Vite, React Router, and Tailwind CSS. Vitest and React Testing Library cover routes, shared layout, and content rendering.

## Pages and routes

- [App.tsx](../src/App.tsx) mounts the router and shared layout. [routes.tsx](../src/config/routes.tsx) selects active page modules, and [route-paths.ts](../src/config/route-paths.ts) defines paths and legacy redirects.
- Home is the portfolio index. It renders the intro and experience groups from [work.json](../src/data/work.json). Published project entries resolve their destinations through [site-links.ts](../src/data/site-links.ts).
- Product thinking, Beyond work, and About have their own routes. Work remains reachable at `/work`, and the case study has a direct URL.
- [navigation.ts](../src/config/navigation.ts) resolves document titles and descriptions. The shared layout handles skip links and route focus.

## Content and styling

- Use [links.json](../src/data/links.json) for header and footer destinations and the footer credit.
- Use [about.json](../src/data/about.json) for About and 404 copy, and [beyond-work.json](../src/data/beyond-work.json) plus [photos.json](../src/data/photos.json) for series and photographs.
- Shared layout components are under [src/components/layout](../src/components/layout). Shared UI primitives are under [src/components/ui](../src/components/ui).
- [tokens.css](../src/tokens.css) owns shared visual values. See the [design system guide](../src/design/README.md) and [portfolio specification](../SPEC.md) for layout rules.
