import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { setMediaState } from "@/test/matchMedia";
import { subscribeToTheme } from "@/lib/dither/color";

beforeEach(() => localStorage.clear());

describe("theme toggle", () => {
  it("follows system preference until the visitor makes a choice", async () => {
    const user = userEvent.setup();
    setMediaState({ darkTheme: true });
    render(<ThemeToggle />);
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    act(() => setMediaState({ darkTheme: false }));
    await user.click(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("portfolio.theme")).toBe("dark");
    act(() => setMediaState({ darkTheme: false }));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("restores a saved choice after remounting", () => {
    localStorage.setItem("portfolio.theme", "light");
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("still switches when local storage is unavailable", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(
      screen.getByRole("button", { name: "Switch to light mode" }),
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("notifies the dither palette observer when the theme changes", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const listener = vi.fn();
    const unsubscribe = subscribeToTheme(listener);
    try {
      await user.click(
        screen.getByRole("button", { name: "Switch to light mode" }),
      );
      expect(listener).toHaveBeenCalled();
    } finally {
      unsubscribe();
    }
  });

  it("syncs a choice from another tab and returns to system when cleared", () => {
    render(<ThemeToggle />);
    act(() =>
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "portfolio.theme",
          newValue: "light",
        }),
      ),
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    act(() =>
      window.dispatchEvent(
        new StorageEvent("storage", { key: "portfolio.theme", newValue: null }),
      ),
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
});
