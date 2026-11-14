import clsx from "clsx";
import { Link } from "react-router";
import { PageContainer, SectionHeader } from "@/components/ui";
import { SITE_EMAIL_HREF, SITE_LINKEDIN_URL } from "@/config/site";
import { ROUTE_PATHS } from "@/config/route-paths";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";
import { UI_RECIPE_TOKENS } from "@/design";

const STORY_HEADINGS = [
  "Finding design",
  "Taking ownership",
  "Connecting the two",
];

export default function About() {
  const about = PORTFOLIO_CONTENT.about;

  return (
    <PageContainer variant="wide">
      <SectionHeader
        title="ABOUT"
        description="The path from engineering to design — and the product thinking that connects it all."
      />

      <article aria-label="My background">
        {about.bioParagraphs.map((paragraph, index) => (
          <section
            key={paragraph}
            aria-labelledby={`about-story-${index}`}
            className="grid gap-4 border-t border-[var(--surface-border)] py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-10 md:py-9"
          >
            <h2
              id={`about-story-${index}`}
              className={clsx("pt-1", UI_RECIPE_TOKENS.metaText)}
            >
              {STORY_HEADINGS[index] ?? "Background"}
            </h2>
            <p className={clsx("max-w-[65ch]", UI_RECIPE_TOKENS.bodyProse)}>
              {paragraph}
            </p>
          </section>
        ))}
      </article>

      <section
        aria-labelledby="about-now"
        className="grid gap-4 border-t border-[var(--surface-border)] py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-10 md:py-9"
      >
        <h2 id="about-now" className={clsx("pt-1", UI_RECIPE_TOKENS.metaText)}>
          Now
        </h2>
        <div className="max-w-[65ch] space-y-6">
          <p className={UI_RECIPE_TOKENS.bodyProse}>{about.nowBlock}</p>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            <Link
              to={ROUTE_PATHS.work}
              className={clsx(
                "min-h-11 items-center gap-3",
                UI_RECIPE_TOKENS.actionLinkMuted,
              )}
            >
              Explore my work <span aria-hidden="true">→</span>
            </Link>
            <a
              href={SITE_LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className={clsx(
                "min-h-11 items-center gap-3",
                UI_RECIPE_TOKENS.actionLinkMuted,
              )}
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-contact"
        className="grid gap-4 border-t border-[var(--surface-border)] pt-7 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-10 md:pt-9"
      >
        <h2
          id="about-contact"
          className={clsx("pt-1", UI_RECIPE_TOKENS.metaText)}
        >
          Contact
        </h2>
        <div className="max-w-[65ch]">
          <p className="text-xl font-normal leading-[1.4] tracking-[-0.03em] text-[var(--surface-fg)] md:text-2xl">
            Have a product worth thinking through together?
          </p>
          <a
            href={SITE_EMAIL_HREF}
            className={clsx(
              "mt-4 min-h-11 items-center gap-3",
              UI_RECIPE_TOKENS.actionLinkMuted,
            )}
          >
            {about.contactCta.label} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </PageContainer>
  );
}
