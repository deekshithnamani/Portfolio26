import { describe, expect, it } from "vitest";
import { NAV_ITEMS, getVisibleNavItems } from "@/config/navigation";
import { SOCIALS } from "@/data/socials";

describe("navigation configuration", () => {
  it("keeps launch navigation ordered and hides future sections", () => {
    expect(getVisibleNavItems("main").map(({ label }) => label)).toEqual([
      "Home",
      "Work",
      "Product thinking",
      "About",
    ]);
    expect(NAV_ITEMS.find(({ label }) => label === "Beyond work")?.visible).toBe(false);
    expect(NAV_ITEMS.find(({ label }) => label === "Side projects")?.visible).toBe(false);
  });

  it("keeps Resume separate as a utility item with a TODO path", () => {
    expect(getVisibleNavItems("utility")).toEqual([
      expect.objectContaining({ label: "Resume", path: "#", group: "utility" }),
    ]);
  });

  it("stores socials separately from navigation", () => {
    expect(SOCIALS.map(({ label }) => label)).toEqual(["LinkedIn", "GitHub", "Email"]);
  });
});
