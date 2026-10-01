import { describe, expect, it } from "vitest";
import { DARK, LIGHT } from "@/design/tokens";
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

describe("theme tokens", () => {
  it("keeps all small-text color tokens at WCAG AA contrast", () => {
    for (const [name, theme] of Object.entries({ DARK, LIGHT })) {
      for (const token of [
        "fg",
        "fgMid",
        "fgDim",
        "navMuted",
        "accent",
      ] as const) {
        expect(
          contrastRatio(theme[token], theme.bg),
          `${name}.${token}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("keeps interactive border tokens at WCAG non-text contrast", () => {
    for (const [name, theme] of Object.entries({ DARK, LIGHT })) {
      expect(
        contrastRatio(theme.borderMid, theme.bg),
        `${name}.borderMid`,
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it("exposes the required dark theme colors", () => {
    expect(DARK).toEqual({
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
    });
  });

  it("exposes the required light theme colors", () => {
    expect(LIGHT).toEqual({
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
    });
  });
});

describe("content scaffolding", () => {
  it("provides the required work items", () => {
    const { WORK } = portfolioData;

    expect(WORK).toHaveLength(3);
    expect(WORK[0].slug).toBe("tbd-case-study-01");
    expect(WORK[0]).toMatchObject({
      company: "AURORA OPS",
      duration: "8 WEEKS",
      tldr:
        "A command-center concept for teams that need to scan work in progress, spot blocked handoffs, and decide what deserves attention first.",
    });
    expect(WORK[2].body.some((block) => block.type === "video")).toBe(true);
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
    expect(WORK[0].cover).toBe(PLACEHOLDER_IMAGE);
  });
});
