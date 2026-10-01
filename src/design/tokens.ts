export type Theme = {
  bg: string;
  fg: string;
  fgMid: string;
  fgDim: string;
  navMuted: string;
  border: string;
  borderMid: string;
  navBg: string;
  sideNavBg: string;
  accent: string;
  card: string;
};

export const DARK = {
  bg: "#050505",
  fg: "#f2ede8",
  fgMid: "#b6b6b6",
  fgDim: "#817979",
  navMuted: "#b1a8a1",
  border: "#161212",
  borderMid: "#726b65",
  navBg: "rgba(5,5,5,0.97)",
  sideNavBg: "#090909",
  accent: "#1FBB68",
  card: "#050505",
} satisfies Theme;

export const LIGHT = {
  bg: "#fcfcfb",
  fg: "#0d0a08",
  fgMid: "#625b54",
  fgDim: "#6f675f",
  navMuted: "#786f68",
  border: "#e8e0d4",
  borderMid: "#8a817b",
  navBg: "#fafaf9",
  sideNavBg: "#fafaf9",
  accent: "#0B6A3A",
  card: "#fcfcfb",
} satisfies Theme;

export const UI_ANIMATION_TOKENS = {
  standardDuration: 0.2,
  microDuration: 0.16,
  cardDuration: 0.24,
  revealOffsetY: 12,
  revealDuration: 0.28,
  revealDelayStep: 0.05,
  revealEasing: [0.2, 0, 0, 1] as const,
  hoverDistance: -1,
  hoverScale: 1.004,
  tapScale: 0.986,
  hoverEasing: [0.16, 1, 0.3, 1] as const,
  microEasing: "easeOut",
  spring: {
    stiffness: 320,
    damping: 30,
    mass: 0.35,
  } as const,
  cursorSpring: {
    stiffness: 280,
    damping: 34,
    mass: 0.4,
  } as const,
} as const;

export const ROUTE_TRANSITION_TOKENS = {
  contentEnterDuration: 0.28,
  contentExitDuration: 0.2,
  contentEnterOffsetY: 10,
  contentExitOffsetY: -8,
  overlayDuration: 0.2,
  overlayHoldOpacity: 0.72,
  contentEnterEasing: [0.16, 1, 0.3, 1] as const,
  contentExitEasing: [0.4, 0, 0.6, 1] as const,
  overlayEasing: "linear",
} as const;
