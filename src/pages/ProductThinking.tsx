import { PageContainer } from "@/components/ui";
import { LinkLabel } from "@/components/ui/link-label";
import { PRODUCT_THINKING } from "@/data";
import { SITE_LINKS } from "@/data/site-links";
import { WORK_CONTENT } from "@/data/work-content";

export default function ProductThinking() {
  return (
    <PageContainer>
      <h1 className="text-text-2">{WORK_CONTENT.productThinking.label}</h1>
      <div className="mt-link border-t border-line">
        {PRODUCT_THINKING.map(
          ({ slug, tag, duration, title, context, tldr, portfolioUrl }) => (
            <article
              key={slug}
              className="space-y-link border-b border-line py-gutter"
            >
              <p className="flex flex-wrap gap-x-link text-small text-text-2">
                <span>{tag}</span>
                <span>{duration}</span>
              </p>
              <h2 className="font-medium">{title}</h2>
              <p>{context}</p>
              <p className="text-text-2">{tldr}</p>
              <a href={portfolioUrl} target="_blank" rel="noreferrer">
                <LinkLabel label={SITE_LINKS.nextLeap.label} />
              </a>
            </article>
          ),
        )}
      </div>
      <p className="mt-gutter text-text-2">
        {WORK_CONTENT.productThinking.note}
      </p>
    </PageContainer>
  );
}
