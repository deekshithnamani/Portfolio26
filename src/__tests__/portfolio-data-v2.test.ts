import { describe, expect, it } from "vitest";
import { BOOKS, COMPANIES, PHOTOS, PRODUCT_THINKING, PROJECTS, SOCIALS } from "@/data";

describe("v2 portfolio data", () => {
  it("groups professional projects in reverse chronology", () => {
    expect(COMPANIES.map(({ name }) => name)).toEqual(["DAOSoft.AI", "Stealth AI Startup", "Univ.AI"]);
    expect(PROJECTS).toHaveLength(4);
  });
  it("launches product thinking with the Zomato fellowship PRD", () => {
    expect(PRODUCT_THINKING).toHaveLength(1);
    expect(PRODUCT_THINKING[0]).toMatchObject({ tag: "NextLeap Fellowship", portfolioUrl: "https://nextleap.app/portfolio/n-deekshith" });
  });
  it("keeps future beyond-work collections empty and separately editable", () => {
    expect(BOOKS).toEqual([]);
    expect(PHOTOS).toEqual([]);
    expect(SOCIALS).toHaveLength(3);
  });
});
