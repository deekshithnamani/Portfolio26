import { describe, expect, it } from "vitest";
import { getVisibleNavItems } from "@/config/navigation";
import { SOCIALS } from "@/data/socials";

describe("navigation configuration", () => {
  it("keeps Work, Creative and About in the primary navigation", () => {
    expect(getVisibleNavItems("main").map(({ label }) => label)).toEqual([
      "Work",
      "Creative",
      "About",
    ]);
  });

  it("has no utility navigation links", () => {
    expect(getVisibleNavItems("utility")).toEqual([]);
  });

  it("stores socials separately from navigation", () => {
    expect(SOCIALS.map(({ label }) => label)).toEqual([
      "LinkedIn",
      "GitHub",
      "Email",
    ]);
  });
});
