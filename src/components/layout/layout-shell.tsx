import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useLocation } from "react-router";
import { Glass } from "@samasante/liquid-glass";
import {
  ROUTE_TRANSITION_TOKENS,
  UI_ANIMATION_TOKENS,
} from "@/design";
import { getDocumentTitle, useFinePointer } from "./layout-utils";
import { useCursor } from "./layout-context";

export function PageTransition() {
  const pathname = useLocation().pathname;
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 bg-black"
        initial={{ opacity: ROUTE_TRANSITION_TOKENS.overlayHoldOpacity }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: reducedMotion ? 0 : ROUTE_TRANSITION_TOKENS.overlayDuration,
          ease: ROUTE_TRANSITION_TOKENS.overlayEasing,
        }}
      />
    </AnimatePresence>
  );
}

export function RouteTransition({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = useLocation().pathname;
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <motion.div
        key={pathname}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: 0 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0.96, y: ROUTE_TRANSITION_TOKENS.contentEnterOffsetY }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: ROUTE_TRANSITION_TOKENS.contentEnterDuration,
            ease: ROUTE_TRANSITION_TOKENS.contentEnterEasing,
          },
        }}
        exit={{
          opacity: 0.93,
          y: ROUTE_TRANSITION_TOKENS.contentExitOffsetY,
          transition: {
            duration: ROUTE_TRANSITION_TOKENS.contentExitDuration,
            ease: ROUTE_TRANSITION_TOKENS.contentExitEasing,
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function RouteEffects({
  mainRef,
}: {
  mainRef: RefObject<HTMLElement | null>;
}) {
  const pathname = useLocation().pathname;
  const { setLabel } = useCursor();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    document.title = getDocumentTitle(pathname);
    setLabel(null);

    if (previousPathname.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      mainRef.current?.focus({ preventScroll: true });
      previousPathname.current = pathname;
    }
  }, [mainRef, pathname, setLabel]);

  return null;
}

export function SkipLink({
  mainRef,
}: {
  mainRef: RefObject<HTMLElement | null>;
}) {
  return (
    <a
      href="#main-content"
      className="skip-link focus-ring"
      onClick={(event) => {
        event.preventDefault();
        const focusMain = () => {
          mainRef.current?.focus({ preventScroll: true });
          if (typeof mainRef.current?.scrollIntoView === "function") {
            mainRef.current.scrollIntoView();
          }
        };

        window.setTimeout(focusMain, 0);
      }}
    >
      Skip to content
    </a>
  );
}

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const { label } = useCursor();
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const cursorWidth = label ? 72 : 12;
  const cursorHeight = label ? 42 : 12;

  useEffect(() => {
    if (reducedMotion || !finePointer) return;
    const handleMove = (event: PointerEvent) => {
      setPoint({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [finePointer, reducedMotion]);

  if (reducedMotion || !finePointer) return null;

  return (
    <motion.div
      data-testid="custom-cursor"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50"
      animate={{
        x: point.x - cursorWidth / 2,
        y: point.y - cursorHeight / 2,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: UI_ANIMATION_TOKENS.cursorSpring.stiffness,
        damping: UI_ANIMATION_TOKENS.cursorSpring.damping,
        mass: UI_ANIMATION_TOKENS.cursorSpring.mass,
      }}
      >
      {label ? (
        <div className="relative h-[42px] w-[72px]">
          <Glass
            width={72}
            height={42}
            radius={24}
            className="h-full w-full overflow-hidden rounded-full text-[12px] font-semibold tracking-[0.02em] text-[var(--surface-accent)] backdrop-blur-sm"
            style={{
              display: "grid",
              placeItems: "center",
              width: "100%",
              height: "100%",
              minWidth: "72px",
              minHeight: "36px",
              background: "rgba(255, 255, 255, 0.06)",
              mixBlendMode: "normal",
              textAlign: "center",
              borderRadius: "9999px",
            }}
            optics={{
              depth: 0.92,
              strength: 0.42,
              curvature: 0.58,
              bend: 0.28,
              bendWidth: 0.2,
              dispersion: 0.24,
              frost: 0.46,
              sheen: 0.48,
              sheenWidth: 3.2,
              sheenFalloff: 0.78,
              glow: 0.16,
              glowSpread: 1.35,
              glowFalloff: 0.72,
              specular: 1.28,
              brightness: 0.1,
            }}
          >
          <span className="relative z-10">{label}</span>
          </Glass>
        </div>
      ) : (
          <motion.div
            className={clsx(
            "relative flex items-center justify-center overflow-hidden rounded-full border text-[11px] font-semibold tracking-[0.02em]",
            "h-3 w-3 border-[var(--surface-accent)] bg-[var(--surface-accent)] text-transparent",
            )}
          />
      )}
    </motion.div>
  );
}
