import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { LEGACY_REDIRECTS, ROUTE_PATHS } from "@/config/route-paths";

describe("v2 information architecture routes", () => {
  it("maps legacy routes to their approved destinations", () => {
    expect(LEGACY_REDIRECTS).toEqual({
      "/practice/*": "/beyond-work",
      "/make": "/work",
      "/writing": "/work",
      "/writing/:slug": "/work",
      "/interests": "/work",
      "/work/daosoft-ai-decision-intelligence/:projectSlug": "/work",
      "/curations": "/work",
      "/concepts": "/work",
    });
  });

  it("keeps active routes out of legacy redirects", () => {
    expect(LEGACY_REDIRECTS).not.toHaveProperty(ROUTE_PATHS.beyondWork);
    expect(LEGACY_REDIRECTS).not.toHaveProperty(ROUTE_PATHS.beyondWorkSeries);
    expect(LEGACY_REDIRECTS).not.toHaveProperty(ROUTE_PATHS.work);
    expect(LEGACY_REDIRECTS).not.toHaveProperty(ROUTE_PATHS.workDetail);
  });

  it("ships a GitHub Pages SPA refresh fallback", () => {
    expect(readFileSync(resolve("public/404.html"), "utf8")).toContain(
      "sessionStorage.redirect",
    );
    expect(readFileSync(resolve("index.html"), "utf8")).toContain(
      "sessionStorage.redirect",
    );
  });
});
