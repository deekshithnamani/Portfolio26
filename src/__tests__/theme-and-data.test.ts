import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import * as portfolioData from "@/data";

function relativeLuminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(foreground: string, background: string) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

describe("light theme tokens", () => {
  const css = readFileSync("src/tokens.css", "utf8");
  const color = (name: string) =>
    css.match(new RegExp(`--${name}: (#[A-Fa-f0-9]{6});`))![1];

  it("keeps both text colors at WCAG AA contrast", () => {
    for (const name of ["text", "text-2"]) {
      expect(contrastRatio(color(name), color("bg"))).toBeGreaterThanOrEqual(
        4.5,
      );
    }
  });

  it("keeps the keyboard focus outline at WCAG non-text contrast", () => {
    expect(readFileSync("src/index.css", "utf8")).toContain(
      "outline: 2px solid var(--text)",
    );
    expect(contrastRatio(color("text"), color("bg"))).toBeGreaterThanOrEqual(3);
  });

  it("uses a single light scheme and exposes tokens to Tailwind", () => {
    expect(css).toContain("color-scheme: light");
    expect(css).toContain("@theme inline");
    expect(css).toContain("--color-bg: var(--bg)");
  });

  it("exposes the specified light palette", () => {
    expect(
      ["bg", "text", "text-2", "line", "dither", "pen"].map((name) =>
        color(name).toUpperCase(),
      ),
    ).toEqual([
      "#F8F8F6",
      "#111111",
      "#5F5F5A",
      "#E3E3DD",
      "#CFCFC7",
      "#E6128F",
    ]);
  });
});

describe("content scaffolding", () => {
  it("provides the required work items", () => {
    const { WORK } = portfolioData;

    expect(WORK).toHaveLength(4);
    expect(WORK[0].slug).toBe("daosoft-ai-decision-intelligence");
    expect(WORK[0]).toMatchObject({
      company: "DAOSoft.AI",
      duration: "Mar 2024 – Present",
    });
    expect(WORK[0].body.some((block) => block.type === "image")).toBe(true);
  });

  it("provides the required make content and tags", () => {
    const data = portfolioData as Record<string, unknown>;

    expect(data).toHaveProperty("MAKE_TAGS");
    expect(data).not.toHaveProperty("LAB_TAGS");
    expect(data.MAKE_TAGS).toEqual(["All", "Projects", "Experiments"]);
    expect(data.MAKE).toHaveLength(2);
  });

  it("provides the required posts and interests", () => {
    const { POSTS, INTERESTS, INTEREST_TAGS } = portfolioData;

    expect(POSTS).toHaveLength(2);
    expect(INTERESTS).toHaveLength(4);
    expect(INTEREST_TAGS).toEqual([
      "All",
      "Creative coding",
      "Photographs",
      "Books",
      "Anime",
    ]);
  });

  it("exports the shared placeholder image used by scaffold content", () => {
    const { PLACEHOLDER_IMAGE, WORK } = portfolioData;

    expect(PLACEHOLDER_IMAGE.startsWith("data:image/svg+xml")).toBe(true);
    expect(WORK[0].cover).not.toBe(PLACEHOLDER_IMAGE);
  });
});
