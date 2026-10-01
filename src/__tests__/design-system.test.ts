import { describe, expect, it } from "vitest";
import {
  DOCUMENT_TITLES,
  NAV_ITEMS,
  resolveDocumentTitle,
} from "@/config/navigation";
import { ROUTE_PATHS } from "@/config/route-paths";
import {
  CONTROL_SIZE_RECIPES,
  LAYOUT_TOKENS,
  UI_RECIPE_TOKENS,
} from "@/design";

describe("design system recipes", () => {
  it("exposes reusable class recipes for repeated typography, links, and frames", () => {
    expect(UI_RECIPE_TOKENS).toMatchObject({
      rowLink: expect.any(String),
      actionLink: expect.any(String),
      chromeText: expect.any(String),
      metaText: expect.any(String),
      bodySupport: expect.any(String),
      bodyProse: expect.any(String),
      titleMedium: expect.any(String),
      pill: expect.any(String),
      mediaFrame: expect.any(String),
      coverFrame: expect.any(String),
    });
  });

  it("keeps responsive shell density in shared layout tokens", () => {
    expect(LAYOUT_TOKENS.pageShellPaddingX).toContain("lg:");
    expect(LAYOUT_TOKENS.pageShellPaddingX).toContain("xl:");
    expect(LAYOUT_TOKENS.pageShellPaddingY).toContain("lg:");
    expect(LAYOUT_TOKENS.pageShellPaddingY).toContain("xl:");
    expect(LAYOUT_TOKENS.desktopShell).toContain("180px");
  });

  it("uses readable sans chrome text for navigation and footer UI", () => {
    expect(UI_RECIPE_TOKENS.chromeText).toContain("font-sans");
    expect(UI_RECIPE_TOKENS.chromeText).toContain("text-[12px]");
    expect(UI_RECIPE_TOKENS.chromeText).toContain("font-medium");
  });

  it("owns drawer sizing and hero scale at the design layer", () => {
    expect(UI_RECIPE_TOKENS).toMatchObject({
      drawerPanel: expect.any(String),
      drawerNavLink: expect.any(String),
      drawerDescription: expect.stringContaining("font-mono"),
      heroDisplay: expect.stringContaining("clamp"),
      titleLarge: expect.any(String),
    });
  });

  it("uses a hybrid typography system with prose separated from support copy", () => {
    expect(UI_RECIPE_TOKENS.bodySupport).toContain("text-[0.95rem]");
    expect(UI_RECIPE_TOKENS.bodyProse).toContain("text-base");
    expect(UI_RECIPE_TOKENS.bodyProse).toContain("leading-[1.85]");
    expect(UI_RECIPE_TOKENS.titleSmall).toContain("1.25rem");
    expect(UI_RECIPE_TOKENS.titleMedium).toContain("1.5625rem");
    expect(UI_RECIPE_TOKENS.titleLarge).toContain("1.9375rem");
  });

  it("limits explicit control sizes to the supported shared variants", () => {
    expect(Object.keys(CONTROL_SIZE_RECIPES)).toEqual(["sm", "md"]);
    expect(CONTROL_SIZE_RECIPES).toMatchObject({
      sm: {
        filterPill: expect.any(String),
        metaPill: expect.any(String),
      },
      md: {
        filterPill: expect.any(String),
        metaPill: expect.any(String),
      },
    });
  });

  it("keeps compact filter chips breakpoint-aware instead of button-sized", () => {
    expect(CONTROL_SIZE_RECIPES.sm.filterPill).toContain("text-[12px]");
    expect(CONTROL_SIZE_RECIPES.sm.filterPill).toContain("leading-none");
    expect(CONTROL_SIZE_RECIPES.sm.filterPill).toContain("min-h-7");
    expect(CONTROL_SIZE_RECIPES.sm.filterPill).toContain("px-2");
    expect(CONTROL_SIZE_RECIPES.sm.filterPill).toContain("md:min-h-8");
    expect(CONTROL_SIZE_RECIPES.sm.filterPill).not.toContain("2.5");
  });

  it("keeps shared small control labels above the tiny-text range", () => {
    expect(CONTROL_SIZE_RECIPES.sm.metaPill).toContain("text-[12px]");
    expect(CONTROL_SIZE_RECIPES.sm.subtleScaleButton).toContain("text-[12px]");
    expect(UI_RECIPE_TOKENS.drawerDescription).toContain("text-[12px]");
  });
});

describe("navigation metadata", () => {
  it("keeps nav items aligned with the top-level route paths", () => {
    expect(NAV_ITEMS.map((item) => item.href)).toEqual([
      ROUTE_PATHS.home,
      ROUTE_PATHS.work,
      (ROUTE_PATHS as Record<string, string>).make ?? "/make",
      ROUTE_PATHS.concepts,
      ROUTE_PATHS.practice,
      ROUTE_PATHS.curations,
      ROUTE_PATHS.about,
    ]);
  });

  it("resolves document titles from a single title source", () => {
    expect(resolveDocumentTitle(ROUTE_PATHS.home)).toBe(DOCUMENT_TITLES.home);
    expect(resolveDocumentTitle(`${ROUTE_PATHS.work}/case-study`)).toBe(
      DOCUMENT_TITLES.workDetail,
    );
    expect(resolveDocumentTitle("/make")).toBe(
      (DOCUMENT_TITLES as Record<string, string>).make ?? "Make | Dnamani",
    );
    expect(resolveDocumentTitle("/curations")).toBe(
      (DOCUMENT_TITLES as Record<string, string>).curations ??
        "Curations | Dnamani",
    );
    expect(resolveDocumentTitle("/concepts")).toBe(
      (DOCUMENT_TITLES as Record<string, string>).concepts ??
        "Concepts | Dnamani",
    );
    expect(resolveDocumentTitle("/practice")).toBe(
      (DOCUMENT_TITLES as Record<string, string>).practice ??
        "Practice | Dnamani",
    );
    expect(resolveDocumentTitle(`${ROUTE_PATHS.writing}/essay`)).toBe(
      DOCUMENT_TITLES.writingDetail,
    );
    expect(resolveDocumentTitle("/missing")).toBe(DOCUMENT_TITLES.notFound);
  });
});
