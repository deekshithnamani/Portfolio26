import { ProjectMedia } from "@/components/projects/project-media";
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
      <div className="space-y-heading-gap">
        <h1 className="page-title">{BEYOND_WORK_CONTENT.label}</h1>
        <p className="text-nav text-text-2">
          {BEYOND_WORK_CONTENT.description}
        </p>
      </div>
      <ul
        role="list"
        className="mt-gutter grid gap-gutter min-[480px]:grid-cols-2"
      >
        {BEYOND_WORK_CONTENT.series.map(
          ({ slug, title, description, photoIds }) => {
            const cover = PHOTO_CONTENT.images.find(
              ({ id }) => id === photoIds[0],
            );
            return (
              <li key={slug} className="min-w-0">
                <figure>
                  {cover && <DitherImage src={cover.file} label={title} />}
                  <figcaption className="space-y-heading-gap">
                    <h2 className="text-body leading-snug font-medium text-text">
                      <Link
                        id={seriesLinkId(slug)}
                        to={buildBeyondWorkSeriesPath(slug)}
                      >
                        {title}
                      </Link>
                    </h2>
                    <p className="text-nav text-text-2">{description}</p>
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
  const series = BEYOND_WORK_CONTENT.series.find(
    (item) => item.slug === slug?.toLowerCase(),
  );

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
      <div className="mt-link space-y-heading-gap">
        <h1 className="item-title">{series.title}</h1>
        <p className="text-nav text-text-2">{series.description}</p>
      </div>
      {photos.length > 0 && (
        <div className="mt-gutter grid gap-gutter min-[480px]:grid-cols-2">
          {photos.map(({ id, file, alt, caption }, index) => (
            <ProjectMedia
              key={id}
              image={{ src: file, alt }}
              caption={caption}
              naturalAspect
              galleryIndex={index}
              gallery={photos.map((photo) => ({
                src: photo.file,
                alt: photo.alt,
                caption: photo.caption,
              }))}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
