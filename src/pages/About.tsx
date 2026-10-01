import clsx from "clsx";
import { Link } from "react-router";
import { MagneticButton } from "@/Layout";
import { PageContainer, SectionHeader } from "@/components/ui";
import {
  SITE_EMAIL_HREF,
  SITE_LINKEDIN_URL,
} from "@/config/site";
import { ROUTE_PATHS } from "@/config/route-paths";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";
import { UI_RECIPE_TOKENS } from "@/design";

export default function About() {
  const ABOUT_CONTENT = PORTFOLIO_CONTENT.about;

  return (
    <PageContainer variant="wide">
      <SectionHeader
        title="ABOUT"
        description="Who I am, beyond the case studies — how I actually approach work, and what I'm focused on right now."
      />

      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_280px] md:items-start">
        <article
          className={clsx(
            UI_RECIPE_TOKENS.cardFrame,
            UI_RECIPE_TOKENS.panelPadding,
            "space-y-4",
            UI_RECIPE_TOKENS.bodyProse,
          )}
        >
          <p>{ABOUT_CONTENT.bioParagraphs[0]}</p>
          <p>{ABOUT_CONTENT.bioParagraphs[1]}</p>
          <p>{ABOUT_CONTENT.bioParagraphs[2]}</p>
          <p className={UI_RECIPE_TOKENS.bodySupport}>
            <a
              href={SITE_LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className={UI_RECIPE_TOKENS.actionLink}
            >
              LINKEDIN ↗
            </a>
          </p>

          <p>
            This portfolio is organized to show both the shipped work in{" "}
            <Link to={ROUTE_PATHS.work} className={UI_RECIPE_TOKENS.actionLink}>
              WORK
            </Link>
            {" "}and the smaller explorations in{" "}
            <Link to={ROUTE_PATHS.make} className={UI_RECIPE_TOKENS.actionLink}>
              MAKE
            </Link>
            . For a more direct background, LinkedIn stays available too.
          </p>
        </article>

        <aside className="space-y-5">
          <section
            className={clsx(
              UI_RECIPE_TOKENS.cardFrame,
              UI_RECIPE_TOKENS.panelPadding,
              "space-y-3",
            )}
          >
            <p className={UI_RECIPE_TOKENS.metaText}>NOW</p>
            <p className={UI_RECIPE_TOKENS.bodySupport}>
              {ABOUT_CONTENT.nowBlock}
            </p>
          </section>

          <section
            className={clsx(
              UI_RECIPE_TOKENS.cardFrame,
              UI_RECIPE_TOKENS.panelPadding,
              "space-y-4",
            )}
          >
            <p className={UI_RECIPE_TOKENS.metaText}>CONTACT</p>
            <p className={UI_RECIPE_TOKENS.bodySupport}>
              Open to product, systems, and interface work with a strong design
              craft layer.
            </p>
            <MagneticButton>
              <a
                href={SITE_EMAIL_HREF}
                className={UI_RECIPE_TOKENS.subtleScaleButton}
              >
                {ABOUT_CONTENT.contactCta.label} ↗
              </a>
            </MagneticButton>
          </section>
        </aside>
      </div>
    </PageContainer>
  );
}
