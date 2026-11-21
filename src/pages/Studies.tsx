import { BackLink } from "@/components/ui/back-link";
import { Link, useParams } from "react-router";
import { PageContainer } from "@/components/ui";
import { DitherImage } from "@/components/ui/dither-image";
import { buildBeyondWorkSeriesPath } from "@/config/route-paths";
import { PHOTO_CONTENT } from "@/data/photo-content";
import { BEYOND_WORK_CONTENT } from "@/data/beyond-work-content";
import { SITE_LINKS } from "@/data/site-links";
import NotFound from "./NotFound";

function seriesLinkId(slug: string) {
  return `creative-series-${slug}`;
}

export default function BeyondWorkIndex() {
  return (
    <PageContainer>
      <h1 className="page-title">{BEYOND_WORK_CONTENT.label}</h1>
      <p className="mt-link">{BEYOND_WORK_CONTENT.description}</p>
      <ul className="mt-gutter grid gap-gutter min-[480px]:grid-cols-2">
        {BEYOND_WORK_CONTENT.series.map(
          ({ slug, title, description, photoIds }) => {
            const cover = PHOTO_CONTENT.images.find(
              ({ id }) => id === photoIds[0],
            );
            return (
              <li key={slug} className="min-w-0">
                <figure>
                  {cover && <DitherImage src={cover.file} label={title} />}
                  <figcaption>
                    <h2 className="item-title">
                      <Link
                        id={seriesLinkId(slug)}
                        to={buildBeyondWorkSeriesPath(slug)}
                      >
                        {title}
                      </Link>
                    </h2>
                    <p className="text-text-2">{description}</p>
                  </figcaption>
                </figure>
              </li>
            );
          },
        )}
      </ul>
    </PageContainer>
  );
}

export function BeyondWorkSeriesPage() {
  const { slug } = useParams();
  const series = BEYOND_WORK_CONTENT.series.find((item) => item.slug === slug);

  if (!series) return <NotFound />;

  const back = SITE_LINKS.backToCreative;
  const photos = series.photoIds.flatMap((id) =>
    PHOTO_CONTENT.images.filter((photo) => photo.id === id),
  );

  return (
    <PageContainer>
      <BackLink
        destination={back}
        state={{ returnToId: seriesLinkId(series.slug) }}
      />
      <h1 className="item-title">{series.title}</h1>
      <p className="mt-link">{series.description}</p>
      {photos.length > 0 && (
        <div className="mt-gutter grid gap-gutter min-[480px]:grid-cols-2">
          {photos.map(({ id, file, alt, caption }) => (
            <figure key={id}>
              <img
                src={file}
                alt={alt}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
              {caption?.trim() && (
                <figcaption className="mt-link text-small text-text-2">
                  {caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
