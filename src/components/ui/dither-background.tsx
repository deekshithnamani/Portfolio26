import { lazy, Suspense, useEffect, useState } from "react";
import {
  getHomeEffect,
  rememberHomeEffect,
  type HomeEffect,
} from "@/config/home-background";

const BackgroundEffect = lazy(() => import("./home-background-effect"));

export function DitherBackground({ effect }: { effect?: HomeEffect }) {
  const [visitEffect] = useState(getHomeEffect);
  const selected = effect ?? visitEffect;
  useEffect(() => rememberHomeEffect(selected), [selected]);

  return (
    <div aria-hidden="true" className="home-dither" data-effect={selected}>
      <Suspense fallback={null}>
        <BackgroundEffect effect={selected} />
      </Suspense>
    </div>
  );
}
