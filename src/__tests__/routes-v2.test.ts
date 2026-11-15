import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { LEGACY_REDIRECTS, ROUTE_PATHS } from "@/config/route-paths";

describe("v2 information architecture routes", () => {
  it("maps legacy routes to their approved destinations", () => {
    expect(LEGACY_REDIRECTS).toEqual({
      "/practice": "/beyond-work#photography",
      "/curations": "/beyond-work#library",
      "/concepts": "/",
    });
  });

  it("keeps future and private routes out of legacy redirects", () => {
    expect(LEGACY_REDIRECTS).not.toHaveProperty(ROUTE_PATHS.make);
    expect(LEGACY_REDIRECTS).not.toHaveProperty(ROUTE_PATHS.writing);
    expect(LEGACY_REDIRECTS).not.toHaveProperty(ROUTE_PATHS.interests);
  });

  it("ships a GitHub Pages SPA refresh fallback", () => {
    expect(readFileSync(resolve("public/404.html"), "utf8")).toContain("sessionStorage.redirect");
    expect(readFileSync(resolve("index.html"), "utf8")).toContain("sessionStorage.redirect");
  });
});
