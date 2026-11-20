import { useEffect, useRef } from "react";
import { PHOTO_CONTENT } from "@/data/photo-content";
import { drawDither, loadDitherSource } from "./dither";

const ROTATE_MS = 10_000;
const FADE_MS = 1_200;
const HOME_DENSITY_SCALE = 0.65;

export function DitherBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof CanvasRenderingContext2D === "undefined") return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(width < 768px)");
    const photos = PHOTO_CONTENT.images;
    const first = Math.floor(Math.random() * photos.length);
    const ordered = [...photos.slice(first), ...photos.slice(0, first)];
    const frames = new Map<number, HTMLCanvasElement>();
    let images: { source: HTMLImageElement; focalX: number; focalY: number }[] =
      [];
    let disposed = false;
    let elapsed = 0;
    let started: number | undefined;
    let timer: number | undefined;
    let animation: number | undefined;

    function cancelScheduledWork() {
      window.clearTimeout(timer);
      if (animation !== undefined) window.cancelAnimationFrame(animation);
    }

    function playbackTime() {
      return (
        elapsed + (started === undefined ? 0 : performance.now() - started)
      );
    }

    function paint(time: number) {
      if (!images.length || !canvas || !context) return false;

      const ratio = mobile.matches ? 4 : 3;
      const width = Math.max(1, Math.floor(window.innerWidth / ratio));
      const height = Math.max(1, Math.floor(window.innerHeight / ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        frames.clear();
      }

      const turn = Math.floor(time / ROTATE_MS);
      const current = turn % images.length;
      const previous = (current + images.length - 1) % images.length;
      const progress = (time % ROTATE_MS) / FADE_MS;
      const fading =
        !motion.matches &&
        !mobile.matches &&
        images.length > 1 &&
        turn > 0 &&
        progress < 1;
      for (const key of frames.keys()) {
        if (key !== current && (!fading || key !== previous))
          frames.delete(key);
      }

      const getFrame = (index: number) => {
        const cached = frames.get(index);
        if (cached) return cached;

        const frame = document.createElement("canvas");
        const { source, focalX, focalY } = images[index];
        drawDither(frame, source, width, height, {
          densityScale: HOME_DENSITY_SCALE,
          focalX,
          focalY,
        });
        frames.set(index, frame);
        return frame;
      };

      context.globalAlpha = 1;
      if (fading) {
        context.drawImage(getFrame(previous), 0, 0);
        context.globalAlpha = progress;
      }
      context.drawImage(getFrame(current), 0, 0);
      context.globalAlpha = 1;
      return fading;
    }

    function tick() {
      if (started === undefined || document.hidden) return;

      const time = playbackTime();
      if (paint(time)) {
        animation = window.requestAnimationFrame(tick);
      } else {
        timer = window.setTimeout(tick, ROTATE_MS - (time % ROTATE_MS));
      }
    }

    function updatePlayback() {
      cancelScheduledWork();
      elapsed = playbackTime();
      started = undefined;

      if (document.hidden || !images.length) return;
      if (motion.matches || mobile.matches || images.length === 1) {
        elapsed = Math.floor(elapsed / ROTATE_MS) * ROTATE_MS;
        paint(elapsed);
        return;
      }

      started = performance.now();
      tick();
    }

    function resize() {
      if (!document.hidden) paint(playbackTime());
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", updatePlayback);
    motion.addEventListener("change", updatePlayback);
    mobile.addEventListener("change", updatePlayback);
    void Promise.all(
      ordered.map(async ({ file, homeCrop }) => {
        const source = await loadDitherSource(file);
        return source ? { source, ...homeCrop } : null;
      }),
    ).then((sources) => {
      if (disposed) return;
      images = sources.filter((image) => image !== null);
      updatePlayback();
    });

    return () => {
      disposed = true;
      cancelScheduledWork();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", updatePlayback);
      motion.removeEventListener("change", updatePlayback);
      mobile.removeEventListener("change", updatePlayback);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="home-dither" />;
}
