import { motion, useReducedMotion } from "motion/react";
import {
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import { Outlet, useLocation } from "react-router";
import { UI_ANIMATION_TOKENS } from "@/design";
import { clamp } from "@/lib/math";
import { CursorCtx, useCursor } from "./layout-context";
import { Header } from "./top-bar";
import { Footer } from "./footer";
import { RouteEffects, SkipLink } from "./layout-shell";
export { isActivePath } from "./layout-utils";
export { useCursor };

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

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const cursorValue = useMemo(() => ({ label, setLabel }), [label]);

  return (
    <CursorCtx.Provider value={cursorValue}>
      <div className="mx-auto flex min-h-dvh w-full max-w-column flex-col px-gutter">
        <SkipLink mainRef={mainRef} />
        <Header />
        <RouteEffects mainRef={mainRef} />
        <main
          ref={mainRef}
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1"
        >
          <div key={pathname} className="route-content">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </CursorCtx.Provider>
  );
}
