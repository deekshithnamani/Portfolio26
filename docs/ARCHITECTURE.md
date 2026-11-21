# Portfolio architecture

This React and TypeScript app uses Vite, React Router, and Tailwind CSS. Vitest and React Testing Library cover routes, shared layout, and content rendering.

## Pages and routes

- [App.tsx](../src/App.tsx) mounts the router and shared layout. [routes.tsx](../src/config/routes.tsx) selects active page modules, and [route-paths.ts](../src/config/route-paths.ts) defines paths and legacy redirects.
- Home renders the intro and a flat list of featured projects with type and optional period. Work renders every project grouped by company and the Product thinking section from [work.json](../src/data/work.json). Company-project descriptions are intentionally omitted. Product thinking retains years for sorting and does not display them. Published project entries resolve their destinations through [site-links.ts](../src/data/site-links.ts).
- Creative and About have their own routes. Both former Product URLs open the Product thinking section of Work. The property-document checker and Univ.AI platform have direct URLs.
- [page-metadata.ts](../src/config/page-metadata.ts) supplies titles and descriptions for both the client router and the Vite build. The build emits an HTML entry per public page with title, description, and Open Graph metadata. The shared layout handles skip links and route focus before paint. Active page modules load with the app, so internal navigation keeps the shell mounted without a loading-screen swap.

## Content and styling

- Use [site.json](../src/data/site.json) for navigation, footer, shared labels, and page metadata.
- Use [about.json](../src/data/about.json) for About copy, and [practice.json](../src/data/practice.json) plus [photos.json](../src/data/photos.json) for series and photographs.
- Shared layout components are under [src/components/layout](../src/components/layout). Shared UI primitives are under [src/components/ui](../src/components/ui).
- [tokens.css](../src/tokens.css) owns shared visual values. See the [design system guide](../src/design/README.md) and [portfolio specification](../SPEC.md) for layout rules.

## Retained legacy modules

The active route table does not import `BeyondWork.tsx`, `ProductThinking.tsx`,
`Curations.tsx`, `Drafts.tsx`, `Interests.tsx`, `Make.tsx`, `Writing.tsx`, or the
legacy `ProjectPageTemplate`. They remain in the repository for history and can
be removed in a separately approved cleanup.
