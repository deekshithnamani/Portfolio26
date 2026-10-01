# Portfolio Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap and implement the approved portfolio foundation with a full route skeleton, a top bar plus drawer shell, shared design primitives, theme tokens, a style guide, and tests.

**Architecture:** Build the app as a small React + TypeScript + Vite project with Tailwind CSS v4, React Router v7, and Motion. Keep global concerns in `src/Layout.tsx` and `src/index.css`, typed content in `src/data.ts`, and page-level primitives in `src/pages/shared.tsx`, then wire the full route graph through `src/App.tsx`.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4 via `@tailwindcss/vite`, React Router v7 (`react-router`), Motion (`motion/react`), clsx, Vitest, Testing Library, jsdom

---

## File Map

- `.gitignore`
  Purpose: ignore dependencies, build output, coverage, and local brainstorming artifacts.
- `package.json`
  Purpose: scripts and dependency manifest.
- `tsconfig.json`
  Purpose: project references for app and node configs.
- `tsconfig.app.json`
  Purpose: strict browser TypeScript configuration for `src`.
- `tsconfig.node.json`
  Purpose: TypeScript configuration for `vite.config.ts`.
- `vite.config.ts`
  Purpose: React plugin, Tailwind Vite plugin, and Vitest configuration.
- `index.html`
  Purpose: Vite entry HTML.
- `src/vite-env.d.ts`
  Purpose: Vite type references.
- `src/main.tsx`
  Purpose: app mount and global stylesheet import.
- `src/App.tsx`
  Purpose: full route map using `Layout`.
- `src/index.css`
  Purpose: font imports, Tailwind setup, theme variables, base styles, and global utility classes.
- `src/theme.ts`
  Purpose: dark/light token objects and `Theme` type.
- `src/data.ts`
  Purpose: typed content scaffolding and safe placeholder records.
- `src/Layout.tsx`
  Purpose: `ThemeCtx`, `useTheme`, `LogoMark`, `ThemeSwitch`, `CustomCursor`, `MagneticButton`, `PageTransition`, `TopBar`, `NavDrawer`, and layout shell.
- `src/setupTests.ts`
  Purpose: Testing Library setup, matchMedia mock installation, and cleanup.
- `src/test/matchMedia.ts`
  Purpose: deterministic browser media-query mock for pointer and reduced-motion tests.
- `src/__tests__/sanity.test.ts`
  Purpose: verify test harness boots.
- `src/__tests__/theme-and-data.test.ts`
  Purpose: verify theme tokens and data scaffolding shape.
- `src/__tests__/layout.test.tsx`
  Purpose: verify theme toggle, drawer, reduced-motion cursor behavior, and layout shell.
- `src/__tests__/shared.test.tsx`
  Purpose: verify shared primitives.
- `src/__tests__/app-routes.test.tsx`
  Purpose: verify route rendering and page behavior.
- `src/pages/shared.tsx`
  Purpose: `SectionHeader`, `FilterPills`, and `AsciiEmpty`.
- `src/pages/Home.tsx`
  Purpose: hero, CTA row, featured work, and latest writing previews.
- `src/pages/Work.tsx`
  Purpose: work index and work detail rendering, including text/image/video blocks.
- `src/pages/Lab.tsx`
  Purpose: filterable lab index and sparse-state handling.
- `src/pages/Writing.tsx`
  Purpose: writing index, post detail, and lightweight bold-markup parsing.
- `src/pages/Interests.tsx`
  Purpose: filterable interests index with optional images and anime kaomoji accent.
- `src/pages/NotFound.tsx`
  Purpose: 404 ASCII state and route back to home.
- `docs/superpowers/style-guides/portfolio-foundation-style-guide.md`
  Purpose: written style rules for tokens, spacing, interaction, and forbidden patterns.

### Task 1: Bootstrap The Project And Test Harness

**Files:**

- Create: `.gitignore`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/vite-env.d.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `src/setupTests.ts`
- Create: `src/test/matchMedia.ts`
- Create: `src/__tests__/sanity.test.ts`

- [ ] **Step 1: Initialize Git so later commit steps are valid**

Run:

```bash
git init
```

Expected: Git reports that a new repository was initialized in `C:/Users/Dnamani/Personal/Portfolio26/.git`.

- [ ] **Step 2: Write the bootstrap manifest and config files**

Run:

```bash
mkdir src
mkdir src/test
mkdir src/__tests__
```

Expected: the source and test directories exist before files are added.

Create `.gitignore`:

```gitignore
node_modules/
dist/
coverage/
.DS_Store
*.log
.superpowers/
```

Create `package.json`:

```json
{
  "name": "portfolio26",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

Create `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

Create `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vite/client", "vitest/globals", "vitest/jsdom"]
  },
  "include": ["src"]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "noEmit": true,
    "strict": true,
    "types": ["node", "vitest/config"]
  },
  "include": ["vite.config.ts"]
}
```

Create `vite.config.ts`:

```ts
/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    css: true,
  },
});
```

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio26</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 3: Install dependencies**

Run:

```bash
npm install react react-dom react-router motion clsx
npm install -D typescript vite @vitejs/plugin-react @tailwindcss/vite tailwindcss vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/react @types/react-dom
```

Expected: npm finishes without errors and writes `package-lock.json`.

- [ ] **Step 4: Create the minimal app shell and test bootstrap files**

Create `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root was not found.");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="min-h-screen bg-[var(--surface-bg)] text-[var(--surface-fg)]">
      <div className="mx-auto max-w-3xl px-8 py-16">
        <h1 className="text-4xl font-light tracking-[-0.02em]">
          Portfolio foundation
        </h1>
      </div>
    </main>
  );
}
```

Create `src/index.css`:

```css
@import "tailwindcss";

:root {
  --surface-bg: #050505;
  --surface-fg: #f2ede8;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--surface-bg);
  color: var(--surface-fg);
  font-family: sans-serif;
}
```

Create `src/test/matchMedia.ts`:

```ts
type MediaState = {
  reduce: boolean;
  finePointer: boolean;
};

let mediaState: MediaState = {
  reduce: false,
  finePointer: true,
};

export function setMediaState(next: Partial<MediaState>) {
  mediaState = { ...mediaState, ...next };
}

export function resetMatchMediaMock() {
  mediaState = {
    reduce: false,
    finePointer: true,
  };
}

function matchesQuery(query: string) {
  if (query.includes("prefers-reduced-motion")) {
    return mediaState.reduce;
  }

  if (query.includes("pointer: fine")) {
    return mediaState.finePointer;
  }

  return false;
}

export function installMatchMediaMock() {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: matchesQuery(query),
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}
```

Create `src/setupTests.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { installMatchMediaMock, resetMatchMediaMock } from "./test/matchMedia";

beforeAll(() => {
  installMatchMediaMock();
});

afterEach(() => {
  cleanup();
  resetMatchMediaMock();
  document.body.innerHTML = "";
  document.body.removeAttribute("style");
  document.body.removeAttribute("data-drawer-open");
  document.documentElement.removeAttribute("data-theme");
  window.history.pushState({}, "", "/");
});

afterAll(() => {
  vi.restoreAllMocks();
});
```

Create `src/__tests__/sanity.test.ts`:

```ts
import { describe, expect, it } from "vitest";

describe("test harness", () => {
  it("runs in a browser-like environment", () => {
    const node = document.createElement("div");
    node.textContent = "ok";

    expect(node).toHaveTextContent("ok");
  });
});
```

- [ ] **Step 5: Run the harness test**

Run:

```bash
npm run test:run -- src/__tests__/sanity.test.ts
```

Expected: `1 passed`.

- [ ] **Step 6: Verify the bootstrap build works**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite finish successfully and write `dist/`.

- [ ] **Step 7: Commit the bootstrap**

Run:

```bash
git add .gitignore package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html src
git commit -m "chore: bootstrap portfolio foundation app"
```

### Task 2: Add Theme Tokens And Typed Content Scaffolding

**Files:**

- Create: `src/theme.ts`
- Create: `src/data.ts`
- Create: `src/__tests__/theme-and-data.test.ts`

- [ ] **Step 1: Write the failing theme and data tests**

Create `src/__tests__/theme-and-data.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { DARK, LIGHT } from "../theme";
import { INTERESTS, INTEREST_TAGS, LAB, LAB_TAGS, POSTS, WORK } from "../data";

describe("theme tokens", () => {
  it("keeps the approved dark palette", () => {
    expect(DARK.bg).toBe("#050505");
    expect(DARK.accent).toBe("#FF3B30");
  });

  it("keeps the approved light palette", () => {
    expect(LIGHT.bg).toBe("#faf7f2");
    expect(LIGHT.accent).toBe("#e02a20");
  });
});

describe("typed content scaffolding", () => {
  it("seeds work items for route and preview coverage", () => {
    expect(WORK).toHaveLength(2);
    expect(WORK[0].slug).toBe("tbd-case-study-01");
    expect(WORK[1].body.some((block) => block.type === "video")).toBe(true);
  });

  it("keeps lab and interest tags aligned with the design spec", () => {
    expect(LAB_TAGS).toEqual(["All", "Projects", "Experiments"]);
    expect(INTEREST_TAGS).toEqual([
      "All",
      "Creative coding",
      "Photographs",
      "Books",
      "Anime",
    ]);
  });

  it("includes enough placeholder content to exercise the routes", () => {
    expect(LAB).toHaveLength(1);
    expect(POSTS).toHaveLength(2);
    expect(INTERESTS).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run the tests to confirm they fail**

Run:

```bash
npm run test:run -- src/__tests__/theme-and-data.test.ts
```

Expected: FAIL with module-not-found errors for `../theme` and `../data`.

- [ ] **Step 3: Implement the token file and typed data file**

Create `src/theme.ts`:

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

Create `src/data.ts`:

```ts
const PLACEHOLDER_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
    <rect width="1200" height="800" fill="#0d0a08" />
    <text
      x="50%"
      y="50%"
      fill="#f2ede8"
      font-family="JetBrains Mono, monospace"
      font-size="42"
      text-anchor="middle"
      dominant-baseline="middle"
    >
      TBD
    </text>
  </svg>`,
)}`;

export type WorkBodyBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; caption: string }
  | { type: "video"; src: string; caption?: string };

export interface WorkItem {
  slug: string;
  id: string;
  title: string;
  category: string;
  year: string;
  oneliner: string;
  cover: string;
  tags: string[];
  intro: string;
  body: WorkBodyBlock[];
}

export const WORK: WorkItem[] = [
  {
    slug: "tbd-case-study-01",
    id: "01",
    title: "TBD",
    category: "TBD",
    year: "2026",
    oneliner: "TBD",
    cover: PLACEHOLDER_IMAGE,
    tags: ["TBD"],
    intro: "TBD",
    body: [{ type: "text", content: "TBD" }],
  },
  {
    slug: "tbd-case-study-02",
    id: "02",
    title: "TBD",
    category: "TBD",
    year: "2026",
    oneliner: "TBD",
    cover: PLACEHOLDER_IMAGE,
    tags: ["TBD"],
    intro: "TBD",
    body: [
      { type: "image", src: PLACEHOLDER_IMAGE, caption: "TBD" },
      { type: "video", src: "https://example.com/tbd.mp4", caption: "TBD" },
    ],
  },
];

export interface LabItem {
  slug: string;
  id: string;
  title: string;
  sub: string;
  type: "Projects" | "Experiments";
  year: string;
  link: string;
}

export const LAB: LabItem[] = [
  {
    slug: "tbd-project-01",
    id: "01",
    title: "TBD",
    sub: "TBD",
    type: "Projects",
    year: "2026",
    link: "#",
  },
];

export const LAB_TAGS = ["All", "Projects", "Experiments"] as const;

export interface Post {
  slug: string;
  id: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  body: string;
}

export const POSTS: Post[] = [
  {
    slug: "tbd-note-01",
    id: "01",
    date: "August 2026",
    title: "TBD",
    excerpt: "TBD",
    tags: ["Notes"],
    body: "TBD\n\n**TBD**",
  },
  {
    slug: "tbd-note-02",
    id: "02",
    date: "July 2026",
    title: "TBD",
    excerpt: "TBD",
    tags: ["Process"],
    body: "TBD\n\nTBD",
  },
];

export interface InterestItem {
  id: string;
  tag: string;
  title: string;
  sub: string;
  year: string;
  link: string;
  img?: string;
}

export const INTERESTS: InterestItem[] = [
  {
    id: "01",
    tag: "Anime",
    title: "TBD",
    sub: "TBD",
    year: "2026",
    link: "#",
    img: PLACEHOLDER_IMAGE,
  },
  {
    id: "02",
    tag: "Books",
    title: "TBD",
    sub: "TBD",
    year: "2026",
    link: "#",
  },
];

export const INTEREST_TAGS = [
  "All",
  "Creative coding",
  "Photographs",
  "Books",
  "Anime",
] as const;
```

- [ ] **Step 4: Run the tests to confirm the data contract passes**

Run:

```bash
npm run test:run -- src/__tests__/theme-and-data.test.ts
```

Expected: all tests PASS.

- [ ] **Step 5: Commit the token and data scaffolding**

Run:

```bash
git add src/theme.ts src/data.ts src/__tests__/theme-and-data.test.ts
git commit -m "feat: add theme tokens and typed placeholder content"
```

### Task 3: Build The Layout Shell And Global CSS Foundation

**Files:**

- Modify: `src/index.css`
- Create: `src/Layout.tsx`
- Create: `src/__tests__/layout.test.tsx`

- [ ] **Step 1: Write the failing layout tests**

Create `src/__tests__/layout.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import Layout from "../Layout";
import { setMediaState } from "../test/matchMedia";

function renderLayout(initialEntries: string[] = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<div>home screen</div>} />
          <Route path="work" element={<div>work screen</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("layout shell", () => {
  it("defaults to dark theme and toggles to light", async () => {
    const user = userEvent.setup();

    renderLayout();

    expect(document.documentElement.dataset.theme).toBe("dark");
    await user.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("opens the drawer and closes it with Escape", async () => {
    const user = userEvent.setup();

    renderLayout();

    await user.click(screen.getByRole("button", { name: /open navigation/i }));
    expect(
      screen.getByRole("dialog", { name: /site navigation/i }),
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(
      screen.queryByRole("dialog", { name: /site navigation/i }),
    ).not.toBeInTheDocument();
  });

  it("does not render the custom cursor for reduced-motion users", () => {
    setMediaState({ reduce: true });

    renderLayout();

    expect(screen.queryByTestId("custom-cursor")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the layout tests to confirm they fail**

Run:

```bash
npm run test:run -- src/__tests__/layout.test.tsx
```

Expected: FAIL because `src/Layout.tsx` does not exist.

- [ ] **Step 3: Implement the global CSS foundation and full layout shell**

Replace `src/index.css` with:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap");
@import "tailwindcss";

@theme {
  --font-sans: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --radius-soft: 0.5rem;
  --radius-medium: 0.75rem;
  --radius-large: 1rem;
}

:root {
  color-scheme: dark;
  --surface-bg: #050505;
  --surface-fg: #f2ede8;
  --surface-fg-mid: #565050;
  --surface-fg-dim: #1e1a1a;
  --surface-border: #161212;
  --surface-border-mid: #1e1a1a;
  --surface-nav: rgba(5, 5, 5, 0.97);
  --surface-accent: #ff3b30;
  --surface-card: #050505;
}

:root[data-theme="light"] {
  color-scheme: light;
  --surface-bg: #faf7f2;
  --surface-fg: #0d0a08;
  --surface-fg-mid: #888077;
  --surface-fg-dim: #d8d0c4;
  --surface-border: #e8e0d4;
  --surface-border-mid: #e0d8cc;
  --surface-nav: rgba(250, 247, 242, 0.97);
  --surface-accent: #e02a20;
  --surface-card: #faf7f2;
}

html,
body,
#root {
  min-height: 100%;
}

html {
  background: var(--surface-bg);
}

body {
  margin: 0;
  background: var(--surface-bg);
  color: var(--surface-fg);
  font-family: var(--font-sans);
  text-rendering: optimizeLegibility;
}

body[data-drawer-open="true"] {
  overflow: hidden;
}

* {
  box-sizing: border-box;
  scrollbar-width: none;
}

*::-webkit-scrollbar {
  display: none;
}

*::selection {
  background: #ff3b30;
  color: #ffffff;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

.focus-ring:focus-visible {
  outline: 1px solid var(--surface-accent);
  outline-offset: 3px;
}

.mono-meta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.row-divider {
  border-bottom: 1px solid var(--surface-border);
}

.media-grayscale {
  filter: grayscale(100%) contrast(1.05);
}

.corner-frame {
  position: relative;
}

.corner-frame::before,
.corner-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}
```

Create `src/Layout.tsx`:

```tsx
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { DARK, LIGHT, type Theme } from "./theme";

type ThemeContextValue = {
  dark: boolean;
  t: Theme;
  toggle: () => void;
};

type CursorContextValue = {
  label: string | null;
  setLabel: (value: string | null) => void;
};

const ThemeCtx = createContext<ThemeContextValue | null>(null);
const CursorCtx = createContext<CursorContextValue | null>(null);

const NAV_ITEMS = [
  { href: "/", label: "HOME", description: "Overview and featured work" },
  {
    href: "/work",
    label: "WORK",
    description: "Case studies from client and professional work",
  },
  {
    href: "/lab",
    label: "LAB",
    description: "Things I've built, plus raw experiments",
  },
  {
    href: "/writing",
    label: "WRITING",
    description: "Essays, notes, and unfiltered thinking",
  },
  {
    href: "/interests",
    label: "INTERESTS",
    description: "Books, anime, photography, and other obsessions",
  },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

function useFinePointer() {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return finePointer;
}

function applyThemeVariables(theme: Theme, dark: boolean) {
  const root = document.documentElement;

  root.dataset.theme = dark ? "dark" : "light";
  root.style.setProperty("--surface-bg", theme.bg);
  root.style.setProperty("--surface-fg", theme.fg);
  root.style.setProperty("--surface-fg-mid", theme.fgMid);
  root.style.setProperty("--surface-fg-dim", theme.fgDim);
  root.style.setProperty("--surface-border", theme.border);
  root.style.setProperty("--surface-border-mid", theme.borderMid);
  root.style.setProperty("--surface-nav", theme.navBg);
  root.style.setProperty("--surface-accent", theme.accent);
  root.style.setProperty("--surface-card", theme.card);
}

export function useTheme() {
  const context = useContext(ThemeCtx);

  if (!context) {
    throw new Error("useTheme must be used within Layout.");
  }

  return context;
}

export function useCursor() {
  const context = useContext(CursorCtx);

  if (!context) {
    throw new Error("useCursor must be used within Layout.");
  }

  return context;
}

export function MagneticButton({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const distance = Math.hypot(dx, dy);
    const radius = Math.max(rect.width, rect.height) / 2 + 40;

    if (distance > radius) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    setOffset({
      x: Math.max(-8, Math.min(8, dx * 0.15)),
      y: Math.max(-8, Math.min(8, dy * 0.15)),
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={reducedMotion ? { x: 0, y: 0 } : offset}
      transition={{ type: "spring", stiffness: 280, damping: 20, mass: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

function LogoMark({ size = 22 }: { size?: number }) {
  const { t } = useTheme();

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="1.5" y="1.5" width="21" height="21" stroke={t.fg} />
      <rect x="12" y="2" width="10" height="10" fill={t.accent} />
      <path d="M12 2V22" stroke={t.fg} />
      <path d="M2 12H22" stroke={t.fg} />
      <circle cx="7" cy="17" r="1.75" fill={t.accent} />
    </svg>
  );
}

function ThemeSwitch() {
  const { dark, toggle } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={!dark}
      onClick={toggle}
      className="focus-ring relative h-5 w-9 border border-[var(--surface-border)]"
      style={{ background: dark ? "var(--surface-fg)" : "var(--surface-bg)" }}
    >
      <span
        className="absolute top-0.5 h-3.5 w-3.5 border border-[var(--surface-border)] transition-all duration-200"
        style={{
          left: dark ? "2px" : "18px",
          background: dark ? "var(--surface-bg)" : "var(--surface-fg)",
        }}
      />
    </button>
  );
}

function PageTransition() {
  const pathname = useLocation().pathname;
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 bg-black"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.12, ease: "linear" }}
      />
    </AnimatePresence>
  );
}

function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const { label } = useCursor();
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion || !finePointer) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      setPoint({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handleMove);

    return () => window.removeEventListener("pointermove", handleMove);
  }, [finePointer, reducedMotion]);

  if (reducedMotion || !finePointer) {
    return null;
  }

  return (
    <motion.div
      data-testid="custom-cursor"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
      animate={{
        x: point.x - (label ? 34 : 5),
        y: point.y - (label ? 14 : 5),
      }}
      transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.3 }}
    >
      <motion.div
        layout
        className={clsx(
          "flex items-center justify-center border border-white bg-[#ff3b30] text-[10px] font-medium uppercase tracking-[0.22em] text-white",
          label
            ? "h-7 min-w-[68px] rounded-[999px] px-3"
            : "h-2.5 w-2.5 rounded-full",
        )}
      >
        {label ? <span>{label}</span> : null}
      </motion.div>
    </motion.div>
  );
}

function TopBar({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[var(--surface-border)] bg-[var(--surface-nav)] backdrop-blur">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6 md:h-14 md:px-10">
        <Link to="/" className="focus-ring flex items-center gap-3">
          <LogoMark size={20} />
          <span className="mono-meta transition-colors hover:text-[var(--surface-accent)]">
            DNAMANI
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <button
            type="button"
            aria-label="Open navigation"
            onClick={onOpen}
            className="focus-ring flex items-center gap-2 border border-[var(--surface-border)] px-3 py-1.5 mono-meta"
          >
            <span className="hidden md:inline">MENU</span>
            <span aria-hidden="true">|||</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function NavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const navRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicatorTop, setIndicatorTop] = useState(0);

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.dataset.drawerOpen = "true";
    return () => {
      document.body.dataset.drawerOpen = "false";
    };
  }, [open]);

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  useEffect(() => {
    if (!open || !panelRef.current) {
      return;
    }

    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  useLayoutEffect(() => {
    if (!open || !navRef.current) {
      return;
    }

    const current = NAV_ITEMS.find((item) =>
      isActivePath(location.pathname, item.href),
    );

    if (!current) {
      return;
    }

    const anchor = itemRefs.current[current.href];

    if (!anchor) {
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = anchor.getBoundingClientRect();

    setIndicatorTop(itemRect.top - navRect.top + itemRect.height / 2 - 3);
  }, [location.pathname, open]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation backdrop"
            className="fixed inset-0 z-30 bg-black/55"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed right-0 top-0 z-40 flex h-screen w-full max-w-md flex-col border-l border-[var(--surface-border)] bg-[var(--surface-bg)] px-8 py-10 md:w-2/5"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 32 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
          >
            <div className="mb-10 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="focus-ring mono-meta transition-colors hover:text-[var(--surface-accent)]"
              >
                CLOSE
              </button>
            </div>

            <div ref={navRef} className="relative">
              <motion.span
                aria-hidden="true"
                className="absolute left-0 h-1.5 w-1.5 rounded-full bg-[var(--surface-accent)]"
                animate={{ top: indicatorTop, opacity: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              />

              <nav className="flex flex-col gap-6 pl-6">
                {NAV_ITEMS.map((item) => (
                  <div key={item.href}>
                    <NavLink
                      ref={(node) => {
                        itemRefs.current[item.href] = node;
                      }}
                      to={item.href}
                      className="focus-ring block text-2xl font-light tracking-[-0.02em] md:text-3xl"
                    >
                      {item.label}
                    </NavLink>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </nav>
            </div>

            <div className="flex-1" />

            <div className="space-y-3">
              <p className="mono-meta text-[var(--surface-fg-mid)]">CONTACT</p>
              <a
                href="mailto:hello@example.com"
                className="focus-ring block mono-meta transition-colors hover:text-[var(--surface-accent)]"
              >
                hello@example.com
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="focus-ring block mono-meta transition-colors hover:text-[var(--surface-accent)]"
              >
                LINKEDIN ↗
              </a>
            </div>

            <p className="mt-8 mono-meta text-[var(--surface-fg-mid)]">
              EST. 2026 / LAST UPDATED AUGUST 2026
            </p>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function LayoutFrame() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TopBar onOpen={() => setOpen(true)} />
      <NavDrawer open={open} onClose={() => setOpen(false)} />
      <PageTransition />
      <CustomCursor />
      <main className="min-h-screen pt-14 md:pt-16">
        <Outlet />
      </main>
    </>
  );
}

export default function Layout() {
  const [dark, setDark] = useState(true);
  const [label, setLabel] = useState<string | null>(null);
  const theme = dark ? DARK : LIGHT;

  useEffect(() => {
    applyThemeVariables(theme, dark);
  }, [dark, theme]);

  const themeValue = useMemo(
    () => ({
      dark,
      t: theme,
      toggle: () => setDark((current) => !current),
    }),
    [dark, theme],
  );

  const cursorValue = useMemo(
    () => ({
      label,
      setLabel,
    }),
    [label],
  );

  return (
    <ThemeCtx.Provider value={themeValue}>
      <CursorCtx.Provider value={cursorValue}>
        <LayoutFrame />
      </CursorCtx.Provider>
    </ThemeCtx.Provider>
  );
}
```

- [ ] **Step 4: Run the layout tests**

Run:

```bash
npm run test:run -- src/__tests__/layout.test.tsx
```

Expected: all tests PASS.

- [ ] **Step 5: Commit the layout foundation**

Run:

```bash
git add src/index.css src/Layout.tsx src/__tests__/layout.test.tsx
git commit -m "feat: add portfolio layout shell and global styles"
```

### Task 4: Add Shared Page Primitives And The Written Style Guide

**Files:**

- Create: `src/pages/shared.tsx`
- Create: `src/__tests__/shared.test.tsx`
- Create: `docs/superpowers/style-guides/portfolio-foundation-style-guide.md`

- [ ] **Step 1: Write the failing shared-component tests**

Create `src/__tests__/shared.test.tsx`:

```tsx
import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import Layout from "../Layout";
import { AsciiEmpty, FilterPills, SectionHeader } from "../pages/shared";

function renderInsideLayout(node: ReactNode) {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<>{node}</>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("shared page primitives", () => {
  it("renders the section header copy", () => {
    renderInsideLayout(
      <SectionHeader
        title="WORK"
        description="Case studies from client and professional work"
      />,
    );

    expect(screen.getByText("WORK")).toBeInTheDocument();
    expect(
      screen.getByText("Case studies from client and professional work"),
    ).toBeInTheDocument();
  });

  it("calls back when a filter pill is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderInsideLayout(
      <FilterPills
        tags={["All", "Projects", "Experiments"]}
        active="All"
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Projects" }));

    expect(onChange).toHaveBeenCalledWith("Projects");
  });

  it("renders the shared ASCII empty state", () => {
    renderInsideLayout(<AsciiEmpty />);

    expect(screen.getByText(/nothing here yet/i)).toBeInTheDocument();
    expect(screen.getByText(/check back soon/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to confirm they fail**

Run:

```bash
npm run test:run -- src/__tests__/shared.test.tsx
```

Expected: FAIL because `src/pages/shared.tsx` does not exist.

- [ ] **Step 3: Implement the shared primitives and style guide**

Run:

```bash
mkdir docs/superpowers/style-guides
```

Expected: the style-guide directory exists before the markdown file is created.

Create `src/pages/shared.tsx`:

```tsx
import clsx from "clsx";

export function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-12 space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-[var(--surface-accent)]">—</span>
        <h1 className="font-mono text-xs uppercase tracking-[0.24em]">
          {title}
        </h1>
      </div>
      <p className="max-w-xl text-sm leading-[1.9] text-[var(--surface-fg-mid)]">
        {description}
      </p>
    </header>
  );
}

export function FilterPills<T extends string>({
  tags,
  active,
  onChange,
}: {
  tags: readonly T[];
  active: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {tags.map((tag) => {
        const selected = tag === active;

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(tag)}
            className={clsx(
              "focus-ring rounded-[6px] border px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-all duration-150",
              selected
                ? "border-[var(--surface-accent)] text-[var(--surface-accent)]"
                : "border-[var(--surface-border)] text-[var(--surface-fg-mid)] hover:text-[var(--surface-fg)]",
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

export function AsciiEmpty({
  title = "nothing here yet —",
  subtitle = "check back soon",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--surface-border)] p-6">
      <pre className="m-0 whitespace-pre-wrap font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
        {`  ___
 /   \\
|  ?  |   ${title}
 \\___/    ${subtitle}`}
      </pre>
    </div>
  );
}
```

Create `docs/superpowers/style-guides/portfolio-foundation-style-guide.md`:

```md
# Portfolio Foundation Style Guide

## Color Roles

- Background: near-black in dark mode, warm off-white in light mode
- Foreground: high-contrast text color for headings and primary copy
- Mid foreground: metadata and body copy support tone
- Accent: signal red only for highlights, active indicators, and critical emphasis

## Typography Roles

- `Inter`: headlines and body copy
- `JetBrains Mono`: nav labels, metadata, pills, index numbers, and ASCII blocks
- Headlines stay sentence-case and light-weight
- Mono text stays uppercase and tracked

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
```

- [ ] **Step 4: Run the shared-component tests**

Run:

```bash
npm run test:run -- src/__tests__/shared.test.tsx
```

Expected: all tests PASS.

- [ ] **Step 5: Commit the shared primitives**

Run:

```bash
git add src/pages/shared.tsx src/__tests__/shared.test.tsx docs/superpowers/style-guides/portfolio-foundation-style-guide.md
git commit -m "feat: add shared page primitives and style guide"
```

### Task 5: Build The Routed Pages And Wire The App

**Files:**

- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Create: `src/pages/Home.tsx`
- Create: `src/pages/Work.tsx`
- Create: `src/pages/Lab.tsx`
- Create: `src/pages/Writing.tsx`
- Create: `src/pages/Interests.tsx`
- Create: `src/pages/NotFound.tsx`
- Create: `src/__tests__/app-routes.test.tsx`

- [ ] **Step 1: Write the failing route and page behavior tests**

Create `src/__tests__/app-routes.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App";

function renderAt(pathname: string) {
  window.history.pushState({}, "", pathname);
  return render(<App />);
}

describe("app routes", () => {
  it("renders the home hero and primary CTA", () => {
    renderAt("/");

    expect(
      screen.getByRole("heading", { name: /i shape products/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view work/i }),
    ).toBeInTheDocument();
  });

  it("renders the work detail route with a next link", () => {
    renderAt("/work/tbd-case-study-01");

    expect(screen.getByRole("heading", { name: "TBD" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });

  it("shows the lab empty state when a filter has no items", async () => {
    const user = userEvent.setup();

    renderAt("/lab");

    await user.click(screen.getByRole("button", { name: "Experiments" }));

    expect(screen.getByText(/nothing here yet/i)).toBeInTheDocument();
  });

  it("renders bold text in the writing detail view", () => {
    renderAt("/writing/tbd-note-01");

    expect(screen.getByText("TBD", { selector: "strong" })).toBeInTheDocument();
  });

  it("renders the anime kaomoji accent in interests", () => {
    renderAt("/interests");

    expect(screen.getByText(/\( ˘ω˘ \)/i)).toBeInTheDocument();
  });

  it("renders the not-found page for unknown routes", () => {
    renderAt("/missing");

    expect(screen.getByText(/this page wandered off/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the route tests to confirm they fail**

Run:

```bash
npm run test:run -- src/__tests__/app-routes.test.tsx
```

Expected: FAIL because `App.tsx` does not render the final route graph.

- [ ] **Step 3: Implement the pages and final route map**

Replace `src/App.tsx` with:

```tsx
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import { WorkDetail, WorkIndex } from "./pages/Work";
import Lab from "./pages/Lab";
import { PostDetail, WritingIndex } from "./pages/Writing";
import Interests from "./pages/Interests";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<WorkIndex />} />
          <Route path="work/:slug" element={<WorkDetail />} />
          <Route path="lab" element={<Lab />} />
          <Route path="writing" element={<WritingIndex />} />
          <Route path="writing/:slug" element={<PostDetail />} />
          <Route path="interests" element={<Interests />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root was not found.");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `src/pages/Home.tsx`:

```tsx
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { POSTS, WORK } from "../data";
import { MagneticButton, useCursor } from "../Layout";
import { AsciiEmpty } from "./shared";

function getRevealProps(index: number, reducedMotion: boolean) {
  return reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.04, duration: 0.3, ease: "easeOut" },
      };
}

function PreviewRow({
  index,
  href,
  title,
  subtitle,
}: {
  index: string;
  href: string;
  title: string;
  subtitle: string;
}) {
  const reducedMotion = useReducedMotion();
  const { setLabel } = useCursor();

  return (
    <motion.div
      {...getRevealProps(Number(index) - 1, reducedMotion)}
      className="row-divider"
      onMouseEnter={() => setLabel(index)}
      onMouseLeave={() => setLabel(null)}
    >
      <Link
        to={href}
        className="focus-ring flex gap-6 px-1 py-5 transition-transform duration-150 hover:translate-x-1"
      >
        <span className="mono-meta text-[var(--surface-fg-mid)]">{index}</span>
        <div className="space-y-2">
          <h3 className="text-xl font-light tracking-[-0.02em]">{title}</h3>
          <p className="text-sm leading-[1.9] text-[var(--surface-fg-mid)]">
            {subtitle}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const featuredWork = WORK.slice(0, 3);
  const latestPosts = POSTS.slice(0, 2);

  return (
    <div className="mx-auto max-w-3xl px-8 py-16 md:px-12 md:py-20 lg:px-16">
      <section className="mb-16 space-y-8">
        <h1 className="max-w-3xl text-[clamp(2.6rem,5.5vw,5rem)] font-light leading-[0.92] tracking-[-0.025em]">
          <span className="block">I shape products —</span>
          <span className="block text-[var(--surface-accent)]">
            from the pixel
          </span>
          <span className="block">to the roadmap.</span>
        </h1>

        <div className="max-w-md space-y-5 text-sm leading-[1.9] text-[var(--surface-fg-mid)]">
          <p>TBD</p>
          <p>TBD</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <MagneticButton>
            <Link
              to="/work"
              className="focus-ring inline-flex rounded-[8px] border border-[var(--surface-border)] px-4 py-2 text-xs uppercase tracking-[0.2em] transition-transform duration-150 hover:scale-[0.97]"
            >
              VIEW WORK
            </Link>
          </MagneticButton>

          <a
            href="mailto:hello@example.com"
            className="focus-ring font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:text-[var(--surface-accent)]"
          >
            GET IN TOUCH ↗
          </a>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="mono-meta">FEATURED WORK</h2>
          <Link
            to="/work"
            className="focus-ring font-mono text-xs uppercase tracking-[0.2em] text-[var(--surface-fg-mid)] transition-colors hover:text-[var(--surface-accent)]"
          >
            ALL →
          </Link>
        </div>

        {featuredWork.length > 0 ? (
          featuredWork.map((item) => (
            <PreviewRow
              key={item.slug}
              index={item.id}
              href={`/work/${item.slug}`}
              title={item.title}
              subtitle={item.oneliner}
            />
          ))
        ) : (
          <AsciiEmpty />
        )}
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="mono-meta">LATEST WRITING</h2>
          <Link
            to="/writing"
            className="focus-ring font-mono text-xs uppercase tracking-[0.2em] text-[var(--surface-fg-mid)] transition-colors hover:text-[var(--surface-accent)]"
          >
            ALL →
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          latestPosts.map((post) => (
            <PreviewRow
              key={post.slug}
              index={post.id}
              href={`/writing/${post.slug}`}
              title={post.title}
              subtitle={post.excerpt}
            />
          ))
        ) : (
          <AsciiEmpty />
        )}
      </section>
    </div>
  );
}
```

Create `src/pages/Work.tsx`:

```tsx
import { motion, useReducedMotion } from "motion/react";
import { Link, useParams } from "react-router";
import { WORK, type WorkBodyBlock } from "../data";
import { MagneticButton, useCursor } from "../Layout";
import { AsciiEmpty, SectionHeader } from "./shared";

function getRevealProps(index: number, reducedMotion: boolean) {
  return reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.04, duration: 0.3, ease: "easeOut" },
      };
}

function isEmbedSource(src: string) {
  try {
    const url = new URL(src);
    return (
      url.hostname.includes("youtube.com") ||
      url.hostname.includes("youtu.be") ||
      url.hostname.includes("vimeo.com")
    );
  } catch {
    return false;
  }
}

function toEmbedSource(src: string) {
  if (src.includes("watch?v=")) {
    return src.replace("watch?v=", "embed/");
  }

  if (src.includes("youtu.be/")) {
    const id = src.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${id}`;
  }

  if (src.includes("vimeo.com/") && !src.includes("player.vimeo.com")) {
    const id = src.split("vimeo.com/")[1];
    return `https://player.vimeo.com/video/${id}`;
  }

  return src;
}

function WorkBlock({ block }: { block: WorkBodyBlock }) {
  if (block.type === "text") {
    return (
      <p className="text-sm leading-[1.9] text-[var(--surface-fg-mid)]">
        {block.content}
      </p>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="space-y-3">
        <img
          src={block.src}
          alt={block.caption}
          className="media-grayscale aspect-video w-full rounded-[12px] object-cover"
        />
        <figcaption className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
          {block.caption}
        </figcaption>
      </figure>
    );
  }

  if (isEmbedSource(block.src)) {
    return (
      <figure className="space-y-3">
        <div className="overflow-hidden rounded-[12px] border border-[var(--surface-border)]">
          <iframe
            title={block.caption ?? "Embedded case study video"}
            src={toEmbedSource(block.src)}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {block.caption ? (
          <figcaption className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="space-y-3">
      <video
        controls
        src={block.src}
        className="media-grayscale aspect-video w-full rounded-[12px] object-cover"
      />
      {block.caption ? (
        <figcaption className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function WorkIndex() {
  const reducedMotion = useReducedMotion();
  const { setLabel } = useCursor();

  return (
    <div className="mx-auto max-w-3xl px-8 py-16 md:px-12 md:py-20 lg:px-16">
      <SectionHeader
        title="WORK"
        description="Case studies from client and professional work"
      />

      {WORK.length > 0 ? (
        WORK.map((item, index) => (
          <motion.div
            key={item.slug}
            {...getRevealProps(index, reducedMotion)}
            className="row-divider"
            onMouseEnter={() => setLabel(item.id)}
            onMouseLeave={() => setLabel(null)}
          >
            <Link
              to={`/work/${item.slug}`}
              className="focus-ring block px-1 py-6 transition-transform duration-150 hover:translate-x-1"
            >
              <div className="flex gap-6">
                <span className="mono-meta text-[var(--surface-fg-mid)]">
                  {item.id}
                </span>
                <div className="space-y-3">
                  <h2 className="text-2xl font-light tracking-[-0.02em]">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-[1.9] text-[var(--surface-fg-mid)]">
                    {item.oneliner}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-accent)]">
                      {item.category}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
                      {item.year}
                    </span>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[6px] border border-[var(--surface-border)] px-2 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))
      ) : (
        <AsciiEmpty />
      )}
    </div>
  );
}

export function WorkDetail() {
  const { slug = "" } = useParams();
  const itemIndex = WORK.findIndex((item) => item.slug === slug);
  const item = itemIndex >= 0 ? WORK[itemIndex] : null;

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-8 py-16 md:px-12 md:py-20 lg:px-16">
        <AsciiEmpty
          title="case study not found —"
          subtitle="return to the index"
        />
      </div>
    );
  }

  const next = WORK[(itemIndex + 1) % WORK.length];

  return (
    <div className="mx-auto max-w-2xl px-8 py-16 md:px-12 md:py-20 lg:px-16">
      <Link
        to="/work"
        className="focus-ring mb-8 inline-flex font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)] transition-colors hover:text-[var(--surface-accent)]"
      >
        ← BACK
      </Link>

      <div className="mb-4 flex flex-wrap gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-accent)]">
          {item.category}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
          {item.year}
        </span>
      </div>

      <h1 className="mb-6 text-4xl font-light tracking-[-0.02em] md:text-5xl">
        {item.title}
      </h1>

      <p className="mb-10 text-sm leading-[1.9] text-[var(--surface-fg-mid)]">
        {item.intro}
      </p>

      <div className="corner-frame relative mb-12">
        <img
          src={item.cover}
          alt={item.title}
          className="media-grayscale w-full rounded-[16px] object-cover"
        />
        <span className="absolute left-4 top-4 rounded-[6px] border border-[var(--surface-accent)] px-2 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-accent)]">
          {item.id}
        </span>
      </div>

      <div className="space-y-8">
        {item.body.map((block, index) => (
          <WorkBlock key={`${item.slug}-${index}`} block={block} />
        ))}
      </div>

      <div className="mt-12">
        <MagneticButton>
          <Link
            to={`/work/${next.slug}`}
            className="focus-ring inline-flex font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:text-[var(--surface-accent)]"
          >
            NEXT
          </Link>
        </MagneticButton>
      </div>
    </div>
  );
}
```

Create `src/pages/Lab.tsx`:

```tsx
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { LAB, LAB_TAGS } from "../data";
import { useCursor } from "../Layout";
import { AsciiEmpty, FilterPills, SectionHeader } from "./shared";

function getRevealProps(index: number, reducedMotion: boolean) {
  return reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.04, duration: 0.3, ease: "easeOut" },
      };
}

export default function Lab() {
  const [active, setActive] = useState<(typeof LAB_TAGS)[number]>("All");
  const reducedMotion = useReducedMotion();
  const { setLabel } = useCursor();

  const filtered =
    active === "All" ? LAB : LAB.filter((item) => item.type === active);

  return (
    <div className="mx-auto max-w-3xl px-8 py-16 md:px-12 md:py-20 lg:px-16">
      <SectionHeader
        title="LAB"
        description="Things I've built, plus raw experiments"
      />

      <FilterPills tags={LAB_TAGS} active={active} onChange={setActive} />

      {filtered.length > 0 ? (
        filtered.map((item, index) => (
          <motion.div
            key={item.slug}
            {...getRevealProps(index, reducedMotion)}
            className="row-divider"
            onMouseEnter={() => setLabel(item.id)}
            onMouseLeave={() => setLabel(null)}
          >
            <Link
              to={item.link}
              className="focus-ring flex gap-6 px-1 py-6 transition-transform duration-150 hover:translate-x-1"
            >
              <span className="mono-meta text-[var(--surface-fg-mid)]">
                {item.id}
              </span>
              <div className="space-y-3">
                <h2 className="text-2xl font-light tracking-[-0.02em]">
                  {item.title}
                </h2>
                <p className="text-sm leading-[1.9] text-[var(--surface-fg-mid)]">
                  {item.sub}
                </p>
                <div className="flex items-center gap-3">
                  <span className="rounded-[6px] border border-[var(--surface-accent)] px-2 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-accent)]">
                    {item.type}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
                    {item.year}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))
      ) : (
        <AsciiEmpty />
      )}
    </div>
  );
}
```

Create `src/pages/Writing.tsx`:

```tsx
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { POSTS } from "../data";
import { MagneticButton, useCursor } from "../Layout";
import { AsciiEmpty, FilterPills, SectionHeader } from "./shared";

function getRevealProps(index: number, reducedMotion: boolean) {
  return reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.04, duration: 0.3, ease: "easeOut" },
      };
}

function formatParagraph(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export function WritingIndex() {
  const reducedMotion = useReducedMotion();
  const { setLabel } = useCursor();
  const tags = ["All", ...new Set(POSTS.flatMap((post) => post.tags))];
  const [active, setActive] = useState<(typeof tags)[number]>("All");
  const filtered =
    active === "All"
      ? POSTS
      : POSTS.filter((post) => post.tags.includes(active));

  return (
    <div className="mx-auto max-w-3xl px-8 py-16 md:px-12 md:py-20 lg:px-16">
      <SectionHeader
        title="WRITING"
        description="Essays, notes, and unfiltered thinking"
      />

      <FilterPills tags={tags} active={active} onChange={setActive} />

      {filtered.length > 0 ? (
        filtered.map((post, index) => (
          <motion.div
            key={post.slug}
            {...getRevealProps(index, reducedMotion)}
            className="row-divider"
            onMouseEnter={() => setLabel(post.id)}
            onMouseLeave={() => setLabel(null)}
          >
            <Link
              to={`/writing/${post.slug}`}
              className="focus-ring grid gap-4 px-1 py-6 transition-transform duration-150 hover:translate-x-1 md:grid-cols-[140px_1fr]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
                {post.date}
              </span>
              <div className="space-y-3">
                <h2 className="text-2xl font-light tracking-[-0.02em]">
                  {post.title}
                </h2>
                <p className="text-sm leading-[1.9] text-[var(--surface-fg-mid)]">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[6px] border border-[var(--surface-border)] px-2 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))
      ) : (
        <AsciiEmpty />
      )}
    </div>
  );
}

export function PostDetail() {
  const { slug = "" } = useParams();
  const currentIndex = POSTS.findIndex((post) => post.slug === slug);
  const post = currentIndex >= 0 ? POSTS[currentIndex] : null;

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-8 py-16 md:px-12 md:py-20 lg:px-16">
        <AsciiEmpty title="post not found —" subtitle="return to writing" />
      </div>
    );
  }

  const next = POSTS[(currentIndex + 1) % POSTS.length];

  return (
    <div className="mx-auto max-w-2xl px-8 py-16 md:px-12 md:py-20 lg:px-16">
      <Link
        to="/writing"
        className="focus-ring mb-8 inline-flex font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)] transition-colors hover:text-[var(--surface-accent)]"
      >
        ← BACK
      </Link>

      <div className="mb-4 flex flex-wrap gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
          {post.date}
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-[6px] border border-[var(--surface-border)] px-2 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-8 text-4xl font-light tracking-[-0.02em] md:text-5xl">
        {post.title}
      </h1>

      <div className="space-y-6 text-sm leading-[1.9] text-[var(--surface-fg-mid)]">
        {post.body.split("\n\n").map((paragraph, index) => (
          <p key={index}>{formatParagraph(paragraph)}</p>
        ))}
      </div>

      <div className="mt-12">
        <MagneticButton>
          <Link
            to={`/writing/${next.slug}`}
            className="focus-ring inline-flex font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:text-[var(--surface-accent)]"
          >
            NEXT
          </Link>
        </MagneticButton>
      </div>
    </div>
  );
}
```

Create `src/pages/Interests.tsx`:

```tsx
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { INTERESTS, INTEREST_TAGS } from "../data";
import { useCursor } from "../Layout";
import { AsciiEmpty, FilterPills, SectionHeader } from "./shared";

function getRevealProps(index: number, reducedMotion: boolean) {
  return reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.04, duration: 0.3, ease: "easeOut" },
      };
}

export default function Interests() {
  const [active, setActive] = useState<(typeof INTEREST_TAGS)[number]>("All");
  const reducedMotion = useReducedMotion();
  const { setLabel } = useCursor();

  const filtered =
    active === "All"
      ? INTERESTS
      : INTERESTS.filter((item) => item.tag === active);

  return (
    <div className="mx-auto max-w-3xl px-8 py-16 md:px-12 md:py-20 lg:px-16">
      <SectionHeader
        title="INTERESTS"
        description="Books, anime, photography, and other obsessions"
      />

      <FilterPills tags={INTEREST_TAGS} active={active} onChange={setActive} />

      {filtered.length > 0 ? (
        filtered.map((item, index) => (
          <motion.div
            key={item.id}
            {...getRevealProps(index, reducedMotion)}
            className="row-divider py-6"
            onMouseEnter={() => setLabel(item.id)}
            onMouseLeave={() => setLabel(null)}
          >
            {item.img ? (
              <img
                src={item.img}
                alt={item.title}
                className="media-grayscale mb-4 aspect-[3/1] w-full rounded-[16px] object-cover"
              />
            ) : null}

            <Link
              to={item.link}
              className="focus-ring block transition-transform duration-150 hover:translate-x-1"
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-light tracking-[-0.02em]">
                  {item.title}{" "}
                  {item.tag === "Anime" ? (
                    <span className="font-mono text-base">( ˘ω˘ )</span>
                  ) : null}
                </h2>
                <p className="text-sm leading-[1.9] text-[var(--surface-fg-mid)]">
                  {item.sub}
                </p>
                <div className="flex items-center gap-3">
                  <span className="rounded-[6px] border border-[var(--surface-border)] px-2 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
                    {item.tag}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
                    {item.year}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))
      ) : (
        <AsciiEmpty />
      )}
    </div>
  );
}
```

Create `src/pages/NotFound.tsx`:

```tsx
import { Link } from "react-router";
import { MagneticButton } from "../Layout";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-8 py-16 md:min-h-[calc(100vh-4rem)]">
      <div className="space-y-6 text-center">
        <pre className="m-0 font-mono text-sm uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
          {`      ┌───┐
      │ ?? │
      └───┘
   this page wandered off.`}
        </pre>

        <MagneticButton>
          <Link
            to="/"
            className="focus-ring inline-flex font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:text-[var(--surface-accent)]"
          >
            BACK TO HOME →
          </Link>
        </MagneticButton>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the route tests**

Run:

```bash
npm run test:run -- src/__tests__/app-routes.test.tsx
```

Expected: all tests PASS.

- [ ] **Step 5: Commit the routed pages**

Run:

```bash
git add src/App.tsx src/main.tsx src/pages/Home.tsx src/pages/Work.tsx src/pages/Lab.tsx src/pages/Writing.tsx src/pages/Interests.tsx src/pages/NotFound.tsx src/__tests__/app-routes.test.tsx
git commit -m "feat: implement portfolio routes and foundation pages"
```

### Task 6: Run The Full Verification Pass

**Files:**

- Modify: none unless a verification failure forces a fix

- [ ] **Step 1: Run the complete test suite**

Run:

```bash
npm run test:run
```

Expected: all test files PASS.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite both PASS and output production files into `dist/`.

- [ ] **Step 3: Run the local dev server for manual QA**

Run:

```bash
npm run dev
```

Manual checklist:

- Home route shows the three-line hero with red middle line
- Drawer opens and closes correctly on desktop and mobile widths
- Theme toggle flips dark and light variables
- Work, Lab, Writing, Interests, and 404 all render intentional sparse states
- Custom cursor is present on fine pointers and absent under reduced motion
- Filter pills update the visible rows

- [ ] **Step 4: Commit the verified foundation**

Run:

```bash
git add .
git commit -m "feat: finish verified portfolio foundation"
```

## Self-Review

### Spec Coverage

- Bootstrap, tooling, theme tokens, data scaffolding, layout shell, shared primitives, page routes, and style guide are all covered.
- Reduced motion, pointer checks, drawer behavior, and sparse states are covered.
- The approved `top bar + drawer everywhere` navigation decision is reflected in the plan.

### Placeholder Scan

- The only `TBD` strings in this plan are intentional literal content markers required by the approved safe placeholder-content policy in `src/data.ts`.
- There are no unresolved planning placeholders, `TODO`s, or ambiguous “implement later” steps.

### Type Consistency

- `Theme`, `WorkBodyBlock`, `WorkItem`, `LabItem`, `Post`, and `InterestItem` are named consistently.
- Layout exports `useTheme`, `useCursor`, and `MagneticButton`, and pages consume those exact names.
