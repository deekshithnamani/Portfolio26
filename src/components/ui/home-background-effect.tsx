import { Aurora } from "@/components/dithercn/aurora";
import { Waves } from "@/components/dithercn/waves";
import { Ripples } from "@/components/dithercn/ripples";
import { Contours } from "@/components/dithercn/contours";
import { Plasma } from "@/components/dithercn/plasma";
import { Fire } from "@/components/dithercn/fire";
import { Smoke } from "@/components/dithercn/smoke";
import type { HomeEffect } from "@/config/home-background";

const PALETTE = [
  // Leave low-density regions open so the field has breathing room.
  "transparent",
  "--dither-soft",
  "--dither-mid",
  "--dither-ink",
] as const;
const SHARED = {
  className: "home-dither-surface",
  matrix: "blue-noise" as const,
  fps: 30,
  levels: 19,
  stillTime: 8,
  palette: PALETTE,
};

export default function BackgroundEffect({ effect }: { effect: HomeEffect }) {
  switch (effect) {
    case "aurora":
      return (
        <Aurora
          {...SHARED}
          curtains={3}
          intensity={0.5}
          glow={0}
          mask="none"
          speed={0.85}
        />
      );
    case "fire":
      return (
        <Fire
          {...SHARED}
          height={0.48}
          intensity={0.52}
          embers={0.25}
          speed={1.05}
        />
      );
    case "smoke":
      return (
        <Smoke
          {...SHARED}
          density={0.44}
          height={0.65}
          wind={0.18}
          speed={0.9}
        />
      );
    case "waves":
      return (
        <Waves
          {...SHARED}
          layers={3}
          amplitude={0.85}
          horizon={0.3}
          glow={0}
          speed={1.15}
        />
      );
    case "ripples":
      return (
        <Ripples
          {...SHARED}
          sources={[[1.02, 1.02]]}
          rings={9}
          width={0.4}
          decay={0.75}
          intensity={1}
          speed={1}
        />
      );
    case "contours":
      return (
        <Contours
          {...SHARED}
          lines={7}
          scale={0.8}
          index={0}
          relief={0}
          speed={0.85}
        />
      );
    case "plasma":
      return (
        <Plasma
          {...SHARED}
          scale={0.65}
          warp={0.2}
          bands={1}
          intensity={0.45}
          speed={0.9}
        />
      );
  }
}
