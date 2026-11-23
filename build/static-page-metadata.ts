import type { Plugin } from "vite";
import { PAGE_METADATA } from "../src/config/page-metadata";

const htmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (character) => htmlEntities[character]);
}

export function sharingImageTags(siteUrl?: string) {
  if (!siteUrl?.trim()) return "";
  const base = new URL(siteUrl);
  if (!["http:", "https:"].includes(base.protocol)) {
    throw new Error("VITE_SITE_URL must be an HTTP or HTTPS URL");
  }
  const image = escapeHtml(
    new URL("social-preview.png", `${base.href.replace(/\/$/, "")}/`).href,
  );
  return `<meta property="og:type" content="website" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Deekshith Namani, product designer working on AI and enterprise products" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${image}" />`;
}

export function staticPageMetadata(siteUrl?: string): Plugin {
  return {
    name: "portfolio-static-page-metadata",
    apply: "build",
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const index = bundle["index.html"];
        if (index?.type !== "asset" || typeof index.source !== "string") {
          this.error("Expected a built index.html for route metadata");
        }
        const template = index.source.replace(
          "</head>",
          `${sharingImageTags(siteUrl)}\n  </head>`,
        );
        for (const { path, title, description } of PAGE_METADATA) {
          const output = template
            .replace(
              /<title>[^<]*<\/title>/,
              () => `<title>${escapeHtml(title)}</title>`,
            )
            .replace(
              /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
              () =>
                `<meta name="description" content="${escapeHtml(description)}" />\n    <meta property="og:title" content="${escapeHtml(title)}" />\n    <meta property="og:description" content="${escapeHtml(description)}" />`,
            );

          if (path === "/") {
            index.source = output;
          } else {
            const entry = path.slice(1);
            // Support directory-index hosts and hosts that resolve clean URLs to .html.
            for (const fileName of [`${entry}/index.html`, `${entry}.html`]) {
              this.emitFile({ type: "asset", fileName, source: output });
            }
          }
        }
      },
    },
  };
}
