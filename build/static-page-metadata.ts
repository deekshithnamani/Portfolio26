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

export function staticPageMetadata(): Plugin {
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
        const template = index.source;
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
