# Sidebar Navigation And Light Theme Default Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the desktop top app bar with a slim left sidebar, keep the mobile top bar and drawer, and force the portfolio to load in light theme for every visitor.

**Architecture:** The existing route structure stays intact; only the shared layout shell changes. Desktop becomes a two-column `sidebar + content` frame, while mobile keeps the current top-bar and drawer pattern. Theme state remains in the layout context, but startup logic is simplified so light mode always wins and stale dark preferences are ignored.

**Tech Stack:** React 19, React Router 8, TypeScript 6, Motion, Tailwind CSS 4, Vite 6, Vitest, Testing Library

**Execution note:** Per user preference, do not add Git/commit steps while implementing this plan.

---

## File Structure

- `src/components/layout/brand-mark.tsx`
  Shared brand mark used by both the mobile top bar and the new desktop sidebar so the logo SVG does not get duplicated.

- `src/components/layout/side-rail.tsx`
  New desktop-only primary navigation rail. Owns the vertical nav rendering for `HOME`, `WORK`, `MAKE`, and `ABOUT`.

- `src/components/layout/top-bar.tsx`
  Existing header trimmed down to a mobile-only shell with brand + menu button. The hidden theme toggle remains mounted but inaccessible.

- `src/components/layout/Layout.tsx`
  Central layout composition point. Owns the `sidebar + content` shell, the mobile drawer wiring, route effects, footer placement, and theme initialization.

- `src/design/layout-system.ts`
  Shared layout tokens for mobile top offset and the desktop shell grid so page containers stay aligned with the new frame.

- `src/__tests__/layout.test.tsx`
  Primary regression coverage for desktop sidebar rendering, mobile top bar visibility, forced light startup behavior, and main-shell offsets.

- `src/__tests__/app-routes.test.tsx`
  Existing route smoke coverage. Keeps the footer signature and route rendering checked after the shell changes.

## Task 1: Replace The Desktop Top Bar With A Slim Side Rail

**Files:**
- Create: `src/components/layout/brand-mark.tsx`
- Create: `src/components/layout/side-rail.tsx`
- Modify: `src/components/layout/top-bar.tsx`
- Modify: `src/__tests__/layout.test.tsx`

- [ ] **Step 1: Write the failing desktop-sidebar regression test**

Update `src/__tests__/layout.test.tsx` by replacing the current desktop top-bar assertion with a sidebar assertion:

```tsx
  it("renders a desktop side rail while keeping the top bar mobile-only", () => {
    renderLayout();

    const banner = screen.getByRole("banner");
    const sideRail = screen.getByRole("complementary", {
      name: /primary sidebar/i,
    });
    const menuButton = within(banner).getByRole("button", {
      name: /open navigation/i,
    });

    expect(banner.className).toContain("md:hidden");
    expect(sideRail.className).toContain("hidden");
    expect(sideRail.className).toContain("md:flex");
    expect(menuButton.className).toContain("md:hidden");
    expect(
      within(sideRail).getByRole("link", { name: "HOME" }),
    ).toBeInTheDocument();
    expect(
      within(sideRail).getByRole("link", { name: "WORK" }),
    ).toBeInTheDocument();
    expect(
      within(sideRail).getByRole("link", { name: "MAKE" }),
    ).toBeInTheDocument();
    expect(
      within(sideRail).getByRole("link", { name: "ABOUT" }),
    ).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run the layout test to verify it fails**

Run: `npm run test:run -- src/__tests__/layout.test.tsx`

Expected: FAIL because there is no element with `role="complementary"` named `Primary sidebar`, and the top bar banner does not yet include `md:hidden`.

- [ ] **Step 3: Write the minimal shared brand and side-rail implementation**

Create `src/components/layout/brand-mark.tsx`:

```tsx
import { useTheme } from "./layout-context";

export function BrandMark({ size = 22 }: { size?: number }) {
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
```

Create `src/components/layout/side-rail.tsx`:

```tsx
import clsx from "clsx";
import { Link, NavLink } from "react-router";
import { NAV_ITEMS } from "@/config/navigation";
import { ROUTE_PATHS } from "@/config/route-paths";
import { UI_RECIPE_TOKENS } from "@/design";
import { BrandMark } from "./brand-mark";

export function SideRail() {
  return (
    <aside
      aria-label="Primary sidebar"
      className="hidden md:flex md:min-h-screen md:flex-col md:border-r md:border-[var(--surface-border)]"
    >
      <div className="flex flex-1 flex-col px-6 py-8 lg:px-8 lg:py-10">
        <Link
          to={ROUTE_PATHS.home}
          className="focus-ring flex items-center gap-3"
        >
          <BrandMark size={20} />
          <span className={UI_RECIPE_TOKENS.metaText}>DNAMANI</span>
        </Link>

        <nav
          aria-label="Primary sidebar links"
          className="mt-10 flex flex-col gap-2"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === ROUTE_PATHS.home}
              className={({ isActive }) =>
                clsx(
                  "focus-ring inline-flex items-center gap-3 px-1 py-2",
                  isActive
                    ? "text-[var(--surface-accent)]"
                    : "text-[var(--surface-fg-mid)] hover:text-[var(--surface-fg)]",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "h-px w-4 bg-[var(--surface-accent)] transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className={UI_RECIPE_TOKENS.metaText}>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
```

Trim `src/components/layout/top-bar.tsx` to a mobile-only shell:

```tsx
import { Link } from "react-router";
import type { RefObject } from "react";
import { ROUTE_PATHS } from "@/config/route-paths";
import { UI_RECIPE_TOKENS } from "@/design";
import { BrandMark } from "./brand-mark";
import { useTheme } from "./layout-context";

function ThemeSwitch() {
  const { dark, toggle } = useTheme();
  const modeLabel = dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      aria-label={modeLabel}
      aria-pressed={dark}
      title={modeLabel}
      onClick={toggle}
      className="focus-ring relative h-5 w-9 border border-[var(--surface-border)]"
      style={{
        borderColor: "var(--surface-border)",
        background: dark ? "var(--surface-fg)" : "var(--surface-bg)",
      }}
    >
      <span
        className="absolute top-0.5 h-3.5 w-3.5 border border-[var(--surface-border)] transition-all duration-200 motion-reduce:transition-none"
        style={{
          left: dark ? "2px" : "18px",
          background: dark ? "var(--surface-bg)" : "var(--surface-fg)",
        }}
      />
      <span className="sr-only">{modeLabel}</span>
    </button>
  );
}

export function TopBar({
  onOpen,
  open,
  drawerId,
  menuButtonRef,
}: {
  onOpen: () => void;
  open: boolean;
  drawerId: string;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[var(--surface-border)] bg-[var(--surface-nav)] backdrop-blur md:hidden">
      <div className="mx-auto flex h-12 items-center justify-between gap-4 px-4 sm:px-5">
        <Link
          to={ROUTE_PATHS.home}
          className="focus-ring flex items-center gap-2"
        >
          <BrandMark size={20} />
          <span className={UI_RECIPE_TOKENS.metaText}>DNAMANI</span>
        </Link>

        <div className="flex items-center gap-2">
          <div hidden aria-hidden="true">
            <ThemeSwitch />
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={onOpen}
            className={[
              "focus-ring flex items-center gap-2 border border-[var(--surface-border)] px-2 py-1",
              UI_RECIPE_TOKENS.metaText,
            ].join(" ")}
          >
            <span className="hidden sm:inline">MENU</span>
            <span aria-hidden="true">|||</span>
          </button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run the layout test to verify the sidebar behavior passes**

Run: `npm run test:run -- src/__tests__/layout.test.tsx`

Expected: PASS for the new sidebar test, with the remaining layout tests still green.

## Task 2: Recompose The Layout Shell Around Sidebar + Content

**Files:**
- Modify: `src/components/layout/Layout.tsx`
- Modify: `src/design/layout-system.ts`
- Test: `src/__tests__/layout.test.tsx`
- Regression: `src/__tests__/app-routes.test.tsx`

- [ ] **Step 1: Write the failing shell-offset regression**

Update `src/__tests__/layout.test.tsx` so the spacing test matches the new desktop shell:

```tsx
  it("uses the mobile top offset only below the md breakpoint", () => {
    renderLayout();

    const banner = screen.getByRole("banner");
    const main = screen.getByRole("main");

    expect(banner.className).toContain("md:hidden");
    expect(main.className).toContain("pt-12");
    expect(main.className).toContain("md:pt-0");
    expect(main.parentElement?.className).toContain("md:grid");
    expect(main.parentElement?.className).toContain("md:grid-cols-[13rem_minmax(0,1fr)]");
  });
```

- [ ] **Step 2: Run the layout test to verify it fails**

Run: `npm run test:run -- src/__tests__/layout.test.tsx`

Expected: FAIL because `main` still uses `md:pt-14` and the current shell does not render a desktop grid wrapper.

- [ ] **Step 3: Write the minimal shell composition changes**

Update `src/design/layout-system.ts`:

```ts
export const LAYOUT_TOKENS = {
  pageShellMaxWidth: "max-w-3xl",
  pageShellMaxWidthCompact: "max-w-2xl",
  pageShellPaddingX: "px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 2xl:px-12",
  pageShellPaddingY:
    "py-12 sm:py-14 md:py-[3.75rem] lg:py-16 xl:py-[4.25rem] 2xl:py-20",
  topBarOffset: "pt-12 md:pt-0",
  desktopShell:
    "md:grid md:grid-cols-[13rem_minmax(0,1fr)] lg:grid-cols-[14rem_minmax(0,1fr)]",
  viewportFillMinusTopBar:
    "min-h-[calc(100vh-3rem)] md:min-h-screen",
} as const;
```

Update the `LayoutFrame` portion of `src/components/layout/Layout.tsx`:

```tsx
import { SideRail } from "./side-rail";

function LayoutFrame() {
  const [open, setOpen] = useState(false);
  const closeDrawer = useCallback(() => setOpen(false), []);
  const drawerId = useId();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <SkipLink mainRef={mainRef} />
      <TopBar
        onOpen={() => setOpen(true)}
        open={open}
        drawerId={drawerId}
        menuButtonRef={menuButtonRef}
      />
      <NavDrawer
        open={open}
        onClose={closeDrawer}
        drawerId={drawerId}
        menuButtonRef={menuButtonRef}
      />
      <RouteEffects mainRef={mainRef} />
      <PageTransition />
      <CustomCursor />

      <div className={LAYOUT_TOKENS.desktopShell}>
        <SideRail />
        <main
          ref={mainRef}
          id="main-content"
          tabIndex={-1}
          className={["min-h-screen min-w-0 outline-none", LAYOUT_TOKENS.topBarOffset].join(" ")}
        >
          <Outlet />
          <Footer />
        </main>
      </div>
    </>
  );
}
```

Leave `src/__tests__/app-routes.test.tsx` in place as the regression that confirms the footer signature still renders inside the main shell after the composition change.

- [ ] **Step 4: Run the layout and route regressions**

Run: `npm run test:run -- src/__tests__/layout.test.tsx src/__tests__/app-routes.test.tsx`

Expected: PASS, including the existing footer signature test in `src/__tests__/app-routes.test.tsx`.

## Task 3: Force Light Theme On Every Load

**Files:**
- Modify: `src/components/layout/Layout.tsx`
- Modify: `src/__tests__/layout.test.tsx`

- [ ] **Step 1: Write the failing light-theme startup regression**

Replace the current theme-default test in `src/__tests__/layout.test.tsx` with:

```tsx
  it("defaults to light theme even when a dark preference is stored", () => {
    localStorage.setItem("portfolio.theme", "dark");

    renderLayout();

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(
      screen.queryByRole("button", { name: /switch to dark theme/i }),
    ).not.toBeInTheDocument();
  });
```

- [ ] **Step 2: Run the specific theme test to verify it fails**

Run: `npm run test:run -- src/__tests__/layout.test.tsx -t "defaults to light theme even when a dark preference is stored"`

Expected: FAIL because the current `resolveInitialTheme()` logic reads the saved `dark` preference and sets `data-theme="dark"`.

- [ ] **Step 3: Write the minimal forced-light theme implementation**

Simplify the theme startup logic in `src/components/layout/Layout.tsx`:

```tsx
const THEME_STORAGE_KEY = "portfolio.theme";

function clearThemePreference() {
  if (typeof window === "undefined" || !("localStorage" in window)) return;
  window.localStorage.removeItem(THEME_STORAGE_KEY);
}

function resolveInitialTheme() {
  return false;
}

export default function Layout() {
  const [dark, setDark] = useState<boolean>(resolveInitialTheme);
  const [label, setLabel] = useState<string | null>(null);
  const theme = dark ? DARK : LIGHT;

  useEffect(() => {
    clearThemePreference();
  }, []);

  useEffect(() => {
    applyThemeVariables(theme, dark);
  }, [dark, theme]);

  const themeValue = useMemo(
    () => ({ dark, t: theme, toggle: () => setDark((current) => !current) }),
    [dark, theme],
  );
  const cursorValue = useMemo(() => ({ label, setLabel }), [label]);

  return (
    <ThemeCtx.Provider value={themeValue}>
      <CursorCtx.Provider value={cursorValue}>
        <LayoutFrame />
      </CursorCtx.Provider>
    </ThemeCtx.Provider>
  );
}
```

Delete the old `getSystemPrefersDark()`, `getStoredThemePreference()`, and `persistThemePreference()` helpers, plus the two `useEffect` blocks that synchronize with system theme changes and persist dark mode back to local storage. This keeps the hidden toggle code path alive but guarantees every fresh load resolves to light and clears any stale saved dark preference.

- [ ] **Step 4: Run the layout test to verify the theme behavior passes**

Run: `npm run test:run -- src/__tests__/layout.test.tsx`

Expected: PASS, including the forced-light startup regression and the sidebar/mobile-shell assertions from the earlier tasks.

## Task 4: Full Regression Verification

**Files:**
- Regression only: `src/__tests__/layout.test.tsx`
- Regression only: `src/__tests__/app-routes.test.tsx`
- Regression only: the full project test/build pipeline via `package.json`

- [ ] **Step 1: Run the focused regression suite**

Run: `npm run test:run -- src/__tests__/layout.test.tsx src/__tests__/app-routes.test.tsx`

Expected: PASS with all layout and route smoke tests green.

- [ ] **Step 2: Run the full verification command**

Run: `npm run verify`

Expected:
- `tsc -b` exits `0`
- `eslint . --max-warnings=0` exits `0`
- `vitest run` passes all test files
- `vite build` exits `0`

- [ ] **Step 3: Stop after verification and hand results back without Git work**

Report the files changed and the verification result. Do not add commit, branch, or push steps in this execution pass.
