const BAYER_8 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

export function loadDitherSource(
  src: string,
): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

export function drawDither(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  width: number,
  height: number,
  { densityScale = 1, focalX = 0.5, focalY = 0.5 } = {},
) {
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return;

  const tokens = getComputedStyle(document.documentElement);
  const palette = ["--bg", "--dither"].map((name) =>
    tokens
      .getPropertyValue(name)
      .trim()
      .slice(1)
      .match(/../g)
      ?.map((channel) => parseInt(channel, 16)),
  );
  const [background, dot] = palette;
  if (!background || !dot) return;

  const scale = Math.max(
    width / image.naturalWidth,
    height / image.naturalHeight,
  );
  const scaledWidth = scale * image.naturalWidth;
  const scaledHeight = scale * image.naturalHeight;
  context.drawImage(
    image,
    (width - scaledWidth) * focalX,
    (height - scaledHeight) * focalY,
    scaledWidth,
    scaledHeight,
  );

  const pixels = context.getImageData(0, 0, width, height);
  const { data } = pixels;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      const gray =
        (data[offset] * 0.2126 +
          data[offset + 1] * 0.7152 +
          data[offset + 2] * 0.0722) /
        255;
      // At most 25 of the 64 Bayer positions may be inked, even over solid black.
      const density = Math.min(25, (1 - gray) * 32 * densityScale);
      const color = BAYER_8[y % 8][x % 8] + 0.5 < density ? dot : background;
      data[offset] = color[0];
      data[offset + 1] = color[1];
      data[offset + 2] = color[2];
      data[offset + 3] = 255;
    }
  }
  context.putImageData(pixels, 0, 0);
}
