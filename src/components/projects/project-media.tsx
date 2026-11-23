import { useEffect, useRef, useState } from "react";
import type { ProjectVideo } from "@/data/work-content";
import { SITE_LABELS } from "@/data/site-links";

type Props = {
  image?: { src: string; alt: string };
  video?: ProjectVideo;
  caption?: string;
  placeholderLabel?: string;
  gallery?: { src: string; alt: string; caption?: string }[];
  galleryIndex?: number;
  naturalAspect?: boolean;
};

export function ProjectMedia({
  image,
  video,
  caption,
  placeholderLabel,
  gallery,
  galleryIndex = 0,
  naturalAspect = false,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(galleryIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);
  const media = video?.src.trim() ? video : image;
  const hasMedia = Boolean(media?.src.trim());
  const label =
    (hasMedia ? media?.alt : placeholderLabel) || SITE_LABELS.mediaPlaceholder;

  useEffect(() => {
    if (!expanded) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [expanded]);

  if (!hasMedia && !placeholderLabel) return null;

  function renderMedia(inViewer: boolean) {
    const visible = inViewer && gallery ? gallery[activeIndex] : media;
    if (!hasMedia) {
      return (
        <div
          aria-hidden={inViewer ? undefined : true}
          className={
            inViewer ? "project-media-placeholder-full" : "project-media-inline"
          }
        >
          {inViewer && SITE_LABELS.mediaPlaceholder}
        </div>
      );
    }
    return video?.src.trim() ? (
      <video
        ref={inViewer ? undefined : inlineVideoRef}
        src={video.src}
        aria-label={video.alt}
        poster={video.poster}
        controls
        playsInline
        preload="metadata"
        className={inViewer ? "project-media-full" : "project-media-inline"}
      >
        {video.tracks?.map((track, index) => (
          <track
            key={track.src}
            kind="captions"
            src={track.src}
            srcLang={track.srcLang}
            label={track.label}
            default={index === 0}
          />
        ))}
      </video>
    ) : (
      <img
        src={visible!.src}
        alt={visible!.alt}
        loading={inViewer ? "eager" : "lazy"}
        className={inViewer ? "project-media-full" : "project-media-inline"}
      />
    );
  }

  return (
    <>
      <figure
        className={`mt-gutter${naturalAspect ? " project-media-natural" : ""}`}
      >
        <div className="project-media-frame">
          {renderMedia(false)}
          <button
            ref={triggerRef}
            type="button"
            className="project-media-expand focus-ring"
            aria-label={`${SITE_LABELS.expandMedia}${label}`}
            aria-haspopup="dialog"
            onClick={() => {
              inlineVideoRef.current?.pause();
              setActiveIndex(galleryIndex);
              setExpanded(true);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6" />
            </svg>
          </button>
        </div>
        {caption?.trim() && (
          <figcaption className="mt-link text-small text-text-2">
            {caption}
          </figcaption>
        )}
      </figure>
      <dialog
        ref={dialogRef}
        className="project-media-dialog"
        aria-label={gallery ? "Photography viewer" : label}
        onKeyDown={(event) => {
          if (!gallery || gallery.length < 2) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            const step = event.key === "ArrowRight" ? 1 : -1;
            setActiveIndex(
              (index) => (index + step + gallery.length) % gallery.length,
            );
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          setExpanded(false);
        }}
        onClose={() => setExpanded(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setExpanded(false);
        }}
      >
        {expanded && (
          <>
            <button
              type="button"
              className="project-media-close focus-ring"
              aria-label={SITE_LABELS.closeMedia}
              onClick={() => setExpanded(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
            <figure className="project-media-content">
              {renderMedia(true)}
              {(gallery ? gallery[activeIndex]?.caption : caption)?.trim() && (
                <figcaption className="text-small text-text-2">
                  {gallery ? gallery[activeIndex]?.caption : caption}
                </figcaption>
              )}
              {gallery && gallery.length > 1 && (
                <nav
                  aria-label="Photo navigation"
                  className="flex items-center gap-gutter text-small"
                >
                  <button
                    type="button"
                    className="focus-ring min-h-tap"
                    onClick={() =>
                      setActiveIndex(
                        (index) =>
                          (index - 1 + gallery.length) % gallery.length,
                      )
                    }
                  >
                    ← Previous
                  </button>
                  <span aria-live="polite">
                    {activeIndex + 1} / {gallery.length}
                  </span>
                  <button
                    type="button"
                    className="focus-ring min-h-tap"
                    onClick={() =>
                      setActiveIndex((index) => (index + 1) % gallery.length)
                    }
                  >
                    Next →
                  </button>
                </nav>
              )}
            </figure>
          </>
        )}
      </dialog>
    </>
  );
}
