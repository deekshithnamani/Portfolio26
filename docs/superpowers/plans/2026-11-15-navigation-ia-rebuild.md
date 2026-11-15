# Navigation and Information Architecture Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the sidebar-first launch navigation with a configurable top navigation, reorganize portfolio content into Work, Product thinking, Beyond work, and About, and keep the side navigation and future sections available through configuration.

**Architecture:** A single typed navigation configuration feeds shared navigation renderers for top, side, and mobile drawer variants. Route definitions remain lazy-loaded, while focused data modules supply companies, projects, product-thinking items, books, photos, and socials. `body[data-nav]` and CSS dimension variables switch the desktop shell without changing page components.

**Tech Stack:** React 19, TypeScript, React Router 8, Vite 6, Tailwind CSS 4, Motion, Vitest, React Testing Library.

---

### Task 1: Configurable navigation shell

**Files:**
- Modify: `src/config/navigation.ts`
- Create: `src/data/socials.ts`
- Modify: `src/data/index.ts`
- Create: `src/components/layout/nav-links.tsx`
- Create: `src/components/layout/social-links.tsx`
- Modify: `src/components/layout/top-bar.tsx`
- Modify: `src/components/layout/side-rail.tsx`
- Modify: `src/components/layout/nav-drawer.tsx`
- Modify: `src/components/layout/footer.tsx`
- Modify: `src/components/layout/Layout.tsx`
- Modify: `src/design/layout-system.ts`
- Modify: `src/index.css`
- Modify: `index.html`
- Test: `src/__tests__/layout.test.tsx`
- Test: `src/__tests__/theme-and-data.test.ts`

- [ ] Add failing tests for ordered main/utility items, hidden-item filtering, top default, mobile drawer parity, footer socials, side layout, and case-study collapse controls.
- [ ] Run `npm run test:run -- src/__tests__/layout.test.tsx src/__tests__/theme-and-data.test.ts` and confirm the new expectations fail.
- [ ] Define `NAV_ITEMS` entries with `label`, `path`, `order`, `visible`, `group`, and `description`; configure Home, Work, Product thinking, hidden Beyond work, About, hidden Side projects, and Resume with `path: "#"`.
- [ ] Move LinkedIn, GitHub, and Email into `src/data/socials.ts` and render them through `SocialLinks`.
- [ ] Render all top, side, and drawer navigation through `NavLinks`, excluding every `visible: false` entry.
- [ ] Set `<body data-nav="top">`, add `--nav-top-height`, `--nav-side-width`, and `--nav-side-collapsed-width`, and make top/side desktop shells switch only through `data-nav`.
- [ ] Keep one mobile hamburger/drawer for both layouts and add a side-collapse button on work-detail routes.
- [ ] Run the focused tests and `npm run build`.
- [ ] Commit as `feat: add configurable top and side navigation`.

### Task 2: Route map, redirects, noindex, and GitHub Pages refresh fallback

**Files:**
- Modify: `src/config/route-paths.ts`
- Modify: `src/config/routes.tsx`
- Modify: `src/config/navigation.ts`
- Create: `src/pages/LegacyRouteRedirect.tsx`
- Modify: `src/components/layout/layout-shell.tsx`
- Create: `public/404.html`
- Modify: `index.html`
- Test: `src/__tests__/app-routes.test.tsx`
- Test: `src/__tests__/layout.test.tsx`

- [ ] Add failing tests for `/practice` to `/beyond-work#photography`, `/curations` to `/beyond-work#library`, `/concepts` to `/`, and a robots `noindex` meta tag on `/make` only.
- [ ] Add failing file assertions for the GitHub Pages redirect and URL-restoration scripts.
- [ ] Run the focused tests and confirm the new route/deployment expectations fail.
- [ ] Add Product thinking and Beyond work route definitions, legacy redirects, and route-level `noIndex` metadata.
- [ ] Add a Vite-copied `public/404.html` redirect plus an `index.html` history restoration script so clean BrowserRouter deep links survive GitHub Pages refreshes.
- [ ] Run focused tests, build, and a local static-server refresh check for nested routes.
- [ ] Commit as `feat: add portfolio routes and pages refresh fallback`.

### Task 3: Focused content data modules

**Files:**
- Create: `src/data/companies.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/product-thinking.ts`
- Create: `src/data/books.ts`
- Create: `src/data/photos.ts`
- Modify: `src/data/types.ts`
- Modify: `src/data/index.ts`
- Modify: `src/data/portfolio-content.ts`
- Modify: `src/data/work.ts`
- Test: `src/__tests__/theme-and-data.test.ts`

- [ ] Add failing tests for three reverse-chronological companies, presentation sizes `large`, `medium`, and `compact`, Zomato as the sole launch product-thinking item, verified NextLeap URL, and separate books/photos exports.
- [ ] Run the data test and confirm the new exports fail.
- [ ] Move existing company and professional-project wording verbatim into `companies.ts` and `projects.ts`.
- [ ] Move the Zomato fellowship wording verbatim into `product-thinking.ts` with the `NextLeap Fellowship` tag and `https://nextleap.app/portfolio/n-deekshith`.
- [ ] Move existing book/photography wording where available; represent absent real entries with explicitly placeholder records that cannot be mistaken for claims.
- [ ] Remove migrated Work/Make duplication from `portfolio-content.ts` while leaving hidden Make, Writing, and Interests content behavior unchanged.
- [ ] Run the data tests and build.
- [ ] Commit as `refactor: split portfolio content into focused data modules`.

### Task 4: Company-grouped Work index

**Files:**
- Modify: `src/pages/Work.tsx`
- Create: `src/components/work/company-project-group.tsx`
- Test: `src/__tests__/app-routes.test.tsx`

- [ ] Add failing tests for company order, company context lines, and DAOSoft/Stealth/Univ.AI presentation sizes.
- [ ] Run the focused Work index tests and confirm failure.
- [ ] Render professional projects grouped by company, with one semantic company section and unequal project-card layouts driven by data.
- [ ] Ensure the NextLeap fellowship item no longer appears under Work.
- [ ] Run focused tests and build.
- [ ] Commit as `feat: group work by company and project prominence`.

### Task 5: Product thinking launch page

**Files:**
- Create: `src/pages/ProductThinking.tsx`
- Modify: `src/config/routes.tsx`
- Test: `src/__tests__/app-routes.test.tsx`

- [ ] Add a failing route test requiring the Zomato PRD, its context line, `NextLeap Fellowship` tag, and external NextLeap link.
- [ ] Run the focused test and confirm failure.
- [ ] Build the data-driven Product thinking page with only the Zomato item at launch and category support for future PRDs, teardowns, fellowship work, and AI PM course material.
- [ ] Run focused tests and build.
- [ ] Commit as `feat: add product thinking launch page`.

### Task 6: Hidden Beyond work page

**Files:**
- Create: `src/pages/BeyondWork.tsx`
- Create: `src/components/beyond-work/photo-grid.tsx`
- Create: `src/components/beyond-work/library-list.tsx`
- Create: `src/components/beyond-work/photo-lightbox.tsx`
- Modify: `src/config/routes.tsx`
- Test: `src/__tests__/app-routes.test.tsx`

- [ ] Add failing tests for Photography and Library landmarks, lazy image behavior, keyboard-operable lightbox semantics, grouped library themes, and absence from all navigation.
- [ ] Run the focused tests and confirm failure.
- [ ] Render the directly accessible but hidden Beyond work page from photos/books data, using placeholder states until real content exists.
- [ ] Implement native lazy loading, meaningful alt text when real data exists, Escape-to-close, focus restoration, and dialog semantics for the lightbox.
- [ ] Run focused tests and build.
- [ ] Commit as `feat: add hidden beyond work foundation`.

### Task 7: Reusable project template and DAOSoft hierarchy

**Files:**
- Create: `src/components/work/project-page.tsx`
- Create: `src/pages/CompanyWork.tsx`
- Modify: `src/pages/Work.tsx`
- Modify: `src/config/route-paths.ts`
- Modify: `src/config/routes.tsx`
- Modify: `src/data/projects.ts`
- Modify: `src/data/types.ts`
- Test: `src/__tests__/app-routes.test.tsx`

- [ ] Add failing tests for a one-line problem, three to five artifacts, optional Design intent labels, Product decision callout, outcome, constraints/tradeoffs, and PDF-deck state.
- [ ] Add failing tests for the DAOSoft parent route and its child-project route.
- [ ] Run the focused tests and confirm failure.
- [ ] Map existing wording verbatim into typed project fields; use a clearly rendered unavailable-PDF state when no deck path exists.
- [ ] Render DAOSoft as a parent with child project links and render every child/non-parent project through one `ProjectPage` component.
- [ ] Run focused tests and build.
- [ ] Commit as `feat: add reusable project pages and daosoft hierarchy`.

### Task 8: Final accessibility, hidden-link, and layout-switch verification

**Files:**
- Modify: `src/__tests__/layout.test.tsx`
- Modify: `src/__tests__/app-routes.test.tsx`
- Modify: `src/__tests__/theme-and-data.test.ts`
- Modify: `docs/ARCHITECTURE.md`

- [ ] Add regression checks that hidden items have no nav/Home/footer links, visible items preserve order, both layouts share mobile navigation, and `data-nav="side"` renders every route without overlap.
- [ ] Add keyboard/focus checks for navigation, redirects, side collapse, and the photo lightbox.
- [ ] Document the exact `visible` line and `data-nav` attribute users edit for future changes.
- [ ] Run `npm run test:run`, `npm run build`, and `npm run lint`; compare against the 37-passing/20-failing baseline and investigate every new failure.
- [ ] Commit as `test: verify portfolio navigation and information architecture`.
