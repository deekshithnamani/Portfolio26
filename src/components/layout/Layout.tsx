import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import { Outlet, useLocation } from "react-router";
import { DARK, LAYOUT_TOKENS, LIGHT, UI_ANIMATION_TOKENS } from "@/design";
import { clamp } from "@/lib/math";
import { CursorCtx, ThemeCtx, useCursor, useTheme } from "./layout-context";
import { applyThemeVariables } from "./layout-utils";
import { TopBar } from "./top-bar";
import { NavDrawer } from "./nav-drawer";
import { Footer } from "./footer";
import { SideRail } from "./side-rail";
import {
  CustomCursor,
  PageTransition,
  RouteTransition,
  RouteEffects,
  SkipLink,
} from "./layout-shell";
import { isActivePath } from "./layout-utils";

export type { Theme } from "@/design";
export { isActivePath, useCursor, useTheme };

const THEME_STORAGE_KEY = "portfolio.theme";

function clearThemePreference() {
  if (typeof window === "undefined" || !("localStorage" in window)) return;
  window.localStorage.removeItem(THEME_STORAGE_KEY);
}

function resolveInitialTheme() {
  return false;
}

export function MagneticButton({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;

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
      x: clamp(dx * 0.15, -8, 8),
      y: clamp(dy * 0.15, -8, 8),
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={reducedMotion ? { x: 0, y: 0 } : offset}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: UI_ANIMATION_TOKENS.spring.stiffness,
              damping: UI_ANIMATION_TOKENS.spring.damping,
              mass: UI_ANIMATION_TOKENS.spring.mass,
            }
      }
    >
      {children}
    </motion.div>
  );
}

function LayoutFrame() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const isCaseStudy = pathname.startsWith("/work/");
  const closeDrawer = useCallback(() => setOpen(false), []);
  const drawerId = useId();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!document.body.dataset.nav) document.body.dataset.nav = "top";
  }, []);

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
      <div className={LAYOUT_TOKENS.desktopShell} data-side-collapsed={sideCollapsed || undefined}>
        <SideRail collapsible={isCaseStudy} collapsed={sideCollapsed} onToggle={() => setSideCollapsed((value) => !value)} />
        <main
          ref={mainRef}
          id="main-content"
          tabIndex={-1}
          className={[
            "flex min-w-0 flex-col outline-none",
            LAYOUT_TOKENS.viewportFillMinusTopBar,
            LAYOUT_TOKENS.topBarOffset,
          ].join(" ")}
        >
          <div className="flex-1">
            <RouteTransition>
              <Outlet />
            </RouteTransition>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
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
