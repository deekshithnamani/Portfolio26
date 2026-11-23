export const HOME_EFFECTS = [
  "waves",
  "ripples",
  "contours",
  "fire",
  "smoke",
  "plasma",
  "aurora",
] as const;

export type HomeEffect = (typeof HOME_EFFECTS)[number];

export const HOME_EFFECT_VISIBILITY: Readonly<Record<HomeEffect, boolean>> = {
  waves: true,
  ripples: false,
  contours: false,
  fire: true,
  smoke: true,
  plasma: true,
  aurora: true,
};

export const ACTIVE_HOME_EFFECTS = HOME_EFFECTS.filter(
  (effect) => HOME_EFFECT_VISIBILITY[effect],
);

export function chooseHomeEffect(
  previous?: string,
  random = Math.random,
): HomeEffect {
  const choices = ACTIVE_HOME_EFFECTS.filter((effect) => effect !== previous);
  return choices[
    Math.min(
      choices.length - 1,
      Math.max(0, Math.floor(random() * choices.length)),
    )
  ];
}

function readPreviousEffect(): string | undefined {
  try {
    return sessionStorage.getItem("portfolio.home-effect") ?? undefined;
  } catch {
    return undefined;
  }
}

let previousEffect =
  typeof window === "undefined" ? undefined : readPreviousEffect();

export function getHomeEffect(): HomeEffect {
  if (typeof window !== "undefined") {
    const requested = new URLSearchParams(window.location.search).get("effect");
    if (HOME_EFFECTS.includes(requested as HomeEffect))
      return requested as HomeEffect;
  }
  return chooseHomeEffect(previousEffect);
}

// Record only committed visits, so StrictMode's extra initial render cannot
// accidentally consume a choice or allow the visible effect to repeat.
export function rememberHomeEffect(effect: HomeEffect) {
  previousEffect = effect;
  try {
    sessionStorage.setItem("portfolio.home-effect", effect);
  } catch {
    // In-memory history still avoids repeats when storage is unavailable.
  }
}
