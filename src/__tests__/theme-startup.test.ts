import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setMediaState } from "@/test/matchMedia";

const html = readFileSync("index.html", "utf8");
const boot = html.match(/<script>([\s\S]*?)<\/script>/)![1];
function runStartup() {
  new Function("document", "localStorage", "matchMedia", boot)(
    document,
    localStorage,
    window.matchMedia,
  );
}

beforeEach(() => localStorage.clear());

describe("theme startup before React", () => {
  it.each(["light", "dark"])("applies saved %s before rendering", (theme) => {
    localStorage.setItem("portfolio.theme", theme);
    setMediaState({ darkTheme: theme !== "dark" });
    runStartup();
    expect(document.documentElement.dataset.theme).toBe(theme);
  });
  it("uses the system when a saved value is invalid or unavailable", () => {
    localStorage.setItem("portfolio.theme", "invalid");
    setMediaState({ darkTheme: true });
    runStartup();
    expect(document.documentElement.dataset.theme).toBe("dark");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    setMediaState({ darkTheme: false });
    runStartup();
    expect(document.documentElement.dataset.theme).toBe("light");
  });
  it("provides the matching page background before application CSS loads", () => {
    const shell = html.match(/<style id="theme-shell">([\s\S]*?)<\/style>/)![1];
    const tokens = readFileSync("src/tokens.css", "utf8");
    const backgrounds = [...tokens.matchAll(/--bg: (#[a-f0-9]{6});/g)].map(
      (match) => match[1],
    );
    backgrounds.forEach((color) => expect(shell).toContain(color));
    expect(html.indexOf('charset="UTF-8"')).toBeLessThan(
      html.indexOf("<script>"),
    );
  });
});
