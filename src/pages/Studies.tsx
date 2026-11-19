import { useParams } from "react-router";
import { PageContainer } from "@/components/ui";
import { DitherImage } from "@/components/ui/dither-image";
import { ListRow } from "@/components/ui/list-row";
import { buildPracticeSeriesPath } from "@/config/route-paths";
import { PHOTO_CONTENT } from "@/data/photo-content";
import { PRACTICE_CONTENT } from "@/data/practice-content";
import NotFound from "./NotFound";

export default function PracticeIndex() {
  return (
    <PageContainer>
      <h1 className="text-text-2">{PRACTICE_CONTENT.label}</h1>
      <p className="mt-link">{PRACTICE_CONTENT.description}</p>
      <ul className="mt-gutter">
        {PRACTICE_CONTENT.series.map(({ slug, title, photoIds }) => {
          const cover = PHOTO_CONTENT.images.find(
            ({ id }) => id === photoIds[0],
          );
          return (
            <ListRow
              key={slug}
              title={title}
              href={buildPracticeSeriesPath(slug)}
              preview={
                cover && (
                  <>
                    <DitherImage src={cover.file} label={title} />
                    {cover.caption?.trim() && (
                      <p className="text-small text-text-2">{cover.caption}</p>
                    )}
                  </>
                )
              }
            />
          );
        })}
      </ul>
    </PageContainer>
  );
}

export function PracticeSeriesPage() {
  const { slug } = useParams();
  const series = PRACTICE_CONTENT.series.find((item) => item.slug === slug);

  if (!series) return <NotFound />;

  const photos = series.photoIds.flatMap((id) =>
    PHOTO_CONTENT.images.filter((photo) => photo.id === id),
  );

  return (
    <PageContainer>
      <h1 className="text-text-2">{series.title}</h1>
      {series.description && <p className="mt-link">{series.description}</p>}
      {photos.length > 0 && (
        <div className="mt-gutter grid gap-gutter sm:grid-cols-2">
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
