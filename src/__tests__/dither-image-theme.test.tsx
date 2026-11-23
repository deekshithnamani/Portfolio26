import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DitherImage } from "@/components/ui/dither-image";
import { drawDither } from "@/components/ui/dither";

vi.mock("@/components/ui/dither", () => ({ drawDither: vi.fn() }));

describe("Creative cover theme refresh", () => {
  it("redraws the loaded photo on theme changes and unsubscribes on unmount", async () => {
    const { container, unmount } = render(
      <DitherImage
        src="/images/sky.webp"
        label="Sky"
        width={1000}
        height={625}
      />,
    );
    const photo = container.querySelector("img")!;
    Object.defineProperties(photo, {
      naturalWidth: { value: 1000 },
      naturalHeight: { value: 625 },
    });
    fireEvent.load(photo);
    const cover = screen.getByRole("button", {
      name: "Show original image: Sky",
    });
    expect(cover).toHaveAttribute("data-ready", "true");
    const draws = vi.mocked(drawDither).mock.calls.length;
    await act(async () => {
      document.documentElement.dataset.theme = "dark";
    });
    expect(vi.mocked(drawDither).mock.calls.length).toBeGreaterThan(draws);
    unmount();
    const afterUnmount = vi.mocked(drawDither).mock.calls.length;
    await act(async () => {
      document.documentElement.dataset.theme = "light";
    });
    expect(vi.mocked(drawDither).mock.calls.length).toBe(afterUnmount);
  });
});
