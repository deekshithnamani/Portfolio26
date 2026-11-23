import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import BackgroundEffect from "@/components/ui/home-background-effect";
import { HOME_EFFECTS } from "@/config/home-background";
import type { DitherShaderProps } from "@/lib/dither/shader";

const captured = vi.hoisted(() => ({
  current: null as DitherShaderProps | null,
}));
vi.mock("@/lib/dither/shader", () => ({
  DitherShader: (props: DitherShaderProps) => {
    captured.current = props;
    return null;
  },
}));
afterEach(() => {
  vi.useRealTimers();
  captured.current = null;
});

describe("ambient shader backgrounds", () => {
  it("renders curved full-width swells when Waves falls back without WebGL", () => {
    render(<BackgroundEffect effect="waves" />);
    const fallback = captured.current?.fallback;
    const { container } = render(<>{fallback}</>);
    expect(container.querySelector("svg")).toHaveAttribute("width", "100%");
    expect(container.querySelector("svg")).toHaveAttribute(
      "preserveAspectRatio",
      "none",
    );
    const paths = container.querySelectorAll("path");
    expect(paths).toHaveLength(3);
    paths.forEach((path) => expect(path.getAttribute("d")).toContain(" C "));
  });
  it("keeps one thin-ring ripple with a larger reach", () => {
    render(<BackgroundEffect effect="ripples" />);
    const uniforms = captured.current?.uniforms;
    expect(uniforms?.ripplesCount).toBe(1);
    expect(uniforms?.ripplesA).toEqual([1.02, 1.02, 1.02, 1.02]);
    expect(uniforms?.ripplesWidth).toBeLessThan(0.5);
    expect(uniforms?.ripplesDecay).toBeGreaterThan(0);
    expect(uniforms?.ripplesDecay).toBeLessThan(1);
  });
  it("keeps three shallow waves in the lower third without an extra horizon halo", () => {
    render(<BackgroundEffect effect="waves" />);
    expect(captured.current?.uniforms).toMatchObject({
      wavesLayers: 3,
      wavesHorizon: 0.3,
      wavesGlow: 0,
    });
    expect(captured.current?.uniforms?.wavesAmplitude).toBeLessThan(1);
  });
  it.each(HOME_EFFECTS)("connects %s to an ambient field", (effect) => {
    render(<BackgroundEffect effect={effect} />);
    expect(captured.current?.field).toContain("float field(");
    expect(captured.current?.uniforms).not.toHaveProperty("portfolioMouse");
    expect(captured.current?.fps).toBe(30);
    expect(captured.current?.palette?.[0]).toBe("transparent");
  });
  it("leaves the effect unchanged when the mouse moves", () => {
    vi.useFakeTimers();
    render(<BackgroundEffect effect="waves" />);
    const original = structuredClone(captured.current?.uniforms);
    const event = new Event("pointermove");
    Object.assign(event, { pointerType: "mouse", clientX: 800, clientY: 500 });
    fireEvent(window, event);
    act(() => vi.advanceTimersByTime(500));
    expect(captured.current?.uniforms).toEqual(original);
    expect(vi.getTimerCount()).toBe(0);
  });
});
