import { describe, expect, it } from "vitest";
import { sharingImageTags } from "../../build/static-page-metadata";

describe("sharing card metadata", () => {
  it("waits for a public URL instead of inventing one", () => {
    expect(sharingImageTags()).toBe("");
    expect(sharingImageTags(" ")).toBe("");
  });

  it("uses an absolute card address on root and project-path hosts", () => {
    expect(sharingImageTags("https://example.com")).toContain(
      'content="https://example.com/social-preview.png"',
    );
    const tags = sharingImageTags("https://example.com/portfolio/");
    expect(tags).toContain(
      'content="https://example.com/portfolio/social-preview.png"',
    );
    expect(tags).toContain('name="twitter:card" content="summary_large_image"');
    expect(tags).toContain('property="og:image:width" content="1200"');
  });

  it("rejects non-web addresses", () => {
    expect(() => sharingImageTags("file:///tmp/site")).toThrow("HTTP or HTTPS");
  });
});
