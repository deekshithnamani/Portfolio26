import { SITE_LABELS } from "@/data/site-links";
import { useEffect, useRef, useState } from "react";
import { drawDither } from "./dither";
import { subscribeToTheme } from "@/lib/dither/color";

export function DitherImage({
  src,
  label,
  width,
  height,
}: {
  src: string;
  label: string;
  width?: number;
  height?: number;
}) {
  const previewRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(
    width && height ? width / height : 16 / 9,
  );

  useEffect(() => {
    const canvas = previewRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const render = () => {
      if (!image.naturalWidth) return;
      const ratio = image.naturalWidth / image.naturalHeight;
      setAspectRatio(ratio);
      drawDither(canvas, image, 93, Math.max(1, Math.round(93 / ratio)));
      setReady(true);
    };

    image.addEventListener("load", render);
    const unsubscribe = subscribeToTheme(render);
    if (image.complete) render();
    return () => {
      image.removeEventListener("load", render);
      unsubscribe();
    };
  }, [src]);

  return (
    <button
      type="button"
      className="dither-image focus-ring relative mb-link block w-full cursor-pointer bg-line"
      style={{ aspectRatio }}
      aria-label={`${SITE_LABELS.showOriginal}${label}`}
      aria-pressed={revealed}
      data-ready={ready}
      data-hovered={hovered}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onClick={() => setRevealed((value) => !value)}
    >
      <img
        ref={imageRef}
        src={src}
        alt=""
        loading="lazy"
        width={width}
        height={height}
        decoding="async"
        className="h-full w-full object-contain"
      />
      <canvas
        ref={previewRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
    </button>
  );
}
