import { useEffect, useRef } from "react";
import { clamp } from "@/lib/math";

const POINTER_RANGE = 10;

export function DitherBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    const motion = window.matchMedia(
      "(width >= 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;

    function move(x: number, y: number) {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        background?.style.setProperty("--dither-x", `${x}px`);
        background?.style.setProperty("--dither-y", `${y}px`);
      });
    }

    function reset() {
      move(0, 0);
    }

    function onPointerMove(event: PointerEvent) {
      if (!motion.matches || document.hidden || event.pointerType !== "mouse")
        return;

      const x =
        clamp((2 * event.clientX) / window.innerWidth - 1, -1, 1) *
        POINTER_RANGE;
      const y =
        clamp((2 * event.clientY) / window.innerHeight - 1, -1, 1) *
        POINTER_RANGE;
      move(x, y);
    }

    function onPointerOut(event: PointerEvent) {
      if (!event.relatedTarget) reset();
    }

    function onVisibilityChange() {
      if (!background) return;
      background.dataset.paused = String(document.hidden);
      if (document.hidden) reset();
    }

    onVisibilityChange();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motion.addEventListener("change", reset);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motion.removeEventListener("change", reset);
    };
  }, []);

  return <div ref={backgroundRef} aria-hidden="true" className="home-dither" />;
}
