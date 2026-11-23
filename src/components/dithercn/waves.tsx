"use client";

import { cssColor, DitherShader } from "@/lib/dither";
import type { DitherPalette, DitherShaderProps } from "@/lib/dither";

interface OceanWaves {
  /** Rows of swells rolling towards the viewer below a glowing horizon. */
  variant?: "ocean";
  /** Height of the horizon, 0 (bottom) to 1 (top). Default 0.62. */
  horizon?: number;
}

interface LineWaves {
  /** Thin lines that swell in the middle and taper at the ends, like a sound wave. */
  variant: "lines";
  horizon?: never;
}

export type WavesVariant = OceanWaves | LineWaves;

export type WavesProps = Omit<
  DitherShaderProps,
  "field" | "uniforms" | "fallback"
> &
  WavesVariant & {
    /** How many waves, 2 to 8. Default 6. */
    layers?: number;
    /** Height of the waves. 1 is calm; 2 is rough. Default 1. */
    amplitude?: number;
    /** Horizon sheen and line halo strength; 0 disables both. */
    glow?: number;
  };

const WAVES_PALETTE = [
  "--dither-paper",
  "color-mix(in oklch, var(--dither-ink) 35%, var(--dither-paper))",
  "--dither-ink",
  "color-mix(in oklch, var(--dither-ink) 45%, var(--foreground))",
] as const satisfies DitherPalette;

const FIELD = `
float wavesHeight(float x, float fi, float k, float t) {
  float freq = mix(7.0, 2.2, k);
  float roll = sin(x * freq + t * (0.32 + 0.22 * k) + fi * 1.9);
  float chop = snoise(vec2(x * freq * 0.45 + fi * 5.0, t * 0.09 + fi));
  return roll * 0.8 + chop * 0.2;
}

float field(vec2 uv, vec2 res, float t) {
  float aspect = res.x / res.y;
  float x = uv.x * aspect;
  float tone = 0.0;

  if (wavesMode < 0.5) {
    float above = uv.y - wavesHorizon;
    tone = above > 0.0 ? wavesGlow * 0.5 * exp(-above * 13.0) : 0.0;
    float glint = wavesGlow * exp(-pow((uv.x - 0.5) * 3.2, 2.0));
    for (int i = 0; i < 8; i++) {
      float fi = float(i);
      if (fi < wavesLayers) {
        float k = fi / max(wavesLayers - 1.0, 1.0);
        float base = wavesHorizon * pow(1.0 - fi / wavesLayers, 1.45);
        float amp = wavesAmplitude * mix(0.012, 0.06, k);
        float crest = base + amp * wavesHeight(x, fi, k, t);
        float depth = (crest - uv.y) * res.y;
        if (depth > 0.0) {
          float body = mix(0.08, 0.015, k) + 0.08 * glint * (1.0 - k);
          tone = body * (0.4 + 0.6 * exp(-depth * mix(0.5, 0.06, k)));
          if (depth < 0.85) {
            tone = mix(0.65, 0.4, k) * (0.75 + 0.25 * glint);
          }
        }
      }
    }
    return tone;
  }

  float envelope = sin(3.14159265 * clamp(uv.x, 0.0, 1.0));
  envelope *= envelope;
  for (int i = 0; i < 8; i++) {
    float fi = float(i);
    if (fi < wavesLayers) {
      float k = fi / max(wavesLayers - 1.0, 1.0);
      float y = 0.5 + envelope * wavesAmplitude * mix(0.3, 0.08, k) * wavesHeight(x * 0.8, fi, k, t * 1.4);
      float dist = abs(uv.y - y) * res.y;
      float line = 1.0 - smoothstep(0.2, 0.85, dist);
      float glow = wavesGlow * exp(-dist * 0.18) * 0.22;
      tone = max(tone, max(line * mix(1.0, 0.45, k), glow * (1.0 - k * 0.6)));
    }
  }
  return tone;
}
`;

/** Static curved swells for devices without WebGL. */
function WavesFallback({
  palette,
  horizon,
  layers,
  amplitude,
}: {
  palette: DitherPalette;
  horizon: number;
  layers: number;
  amplitude: number;
}) {
  const ink = cssColor(palette.at(-2) ?? palette[1]);
  const count = Math.min(8, Math.max(2, Math.round(layers)));
  return (
    <svg
      className="absolute inset-0"
      width="100%"
      height="100%"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => {
        const y = (1 - horizon) * 1000 + i * 80;
        const swell = 45 * amplitude;
        return (
          <path
            key={i}
            d={`M -20 ${y} C 180 ${y - swell}, 300 ${y + swell}, 500 ${y} S 820 ${y - swell}, 1020 ${y + swell / 2}`}
            fill="none"
            stroke={ink}
            strokeWidth={1.5 + i * 0.5}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            opacity={0.65 - i * 0.05}
          />
        );
      })}
    </svg>
  );
}

/**
 * Layered waves drawn as a dither: rows of swells under a glowing
 * horizon, or thin lines like a sound wave. Decorative and full-bleed:
 * size it with `className`, usually `absolute inset-0`.
 */
export const Waves = (props: WavesProps) => {
  const {
    layers = 6,
    amplitude = 1,
    glow = 1,
    palette = WAVES_PALETTE,
    variant,
    horizon: requestedHorizon,
    ...shaderProps
  } = props;
  const horizon = variant === "lines" ? 0.5 : (requestedHorizon ?? 0.62);

  return (
    <DitherShader
      {...shaderProps}
      field={FIELD}
      palette={palette}
      uniforms={{
        wavesAmplitude: Math.max(0, amplitude),
        wavesHorizon: horizon,
        wavesGlow: Math.max(0, Math.min(1, glow)),
        wavesLayers: Math.min(8, Math.max(2, Math.round(layers))),
        wavesMode: variant === "lines" ? 1 : 0,
      }}
      fallback={
        <WavesFallback
          palette={palette}
          horizon={horizon}
          layers={layers}
          amplitude={amplitude}
        />
      }
    />
  );
};
