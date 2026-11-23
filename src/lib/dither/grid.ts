// Keep finer grain from multiplying GPU work without bound on large displays.
export const MAX_SHADER_CELLS = 600_000;

export function getShaderGrid(
  width: number,
  height: number,
  cssCell: number,
  pixelRatio: number,
) {
  const dpr = Number.isFinite(pixelRatio) && pixelRatio > 0 ? pixelRatio : 1;
  const minimum = Math.max(
    1,
    cssCell,
    Math.sqrt((width * height) / MAX_SHADER_CELLS),
  );
  let deviceCell = Math.ceil(minimum * dpr);
  let cell = deviceCell / dpr;
  let columns = Math.max(1, Math.ceil(width / cell));
  let rows = Math.max(1, Math.ceil(height / cell));
  while (columns * rows > MAX_SHADER_CELLS) {
    cell = ++deviceCell / dpr;
    columns = Math.max(1, Math.ceil(width / cell));
    rows = Math.max(1, Math.ceil(height / cell));
  }
  return { columns, rows, cell };
}
