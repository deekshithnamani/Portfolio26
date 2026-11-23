import { describe, expect, it } from "vitest";
import { getShaderGrid, MAX_SHADER_CELLS } from "@/lib/dither/grid";

describe("fine dither grid", () => {
  it("uses 2px cells on a normal desktop", () => {
    expect(getShaderGrid(1440, 900, 2, 1)).toEqual({
      columns: 720,
      rows: 450,
      cell: 2,
    });
  });
  it("keeps a 4K viewport within the rendering budget", () => {
    const grid = getShaderGrid(3840, 2160, 2, 2);
    expect(grid.columns * grid.rows).toBeLessThanOrEqual(MAX_SHADER_CELLS);
    expect(grid.columns * grid.cell).toBeGreaterThanOrEqual(3840);
    expect(grid.rows * grid.cell).toBeGreaterThanOrEqual(2160);
  });
  it.each([0.8, 1.25, 1.5, 2])(
    "aligns display scale %s to whole device pixels",
    (ratio) => {
      const grid = getShaderGrid(1920, 1080, 2, ratio);
      expect(Number.isInteger(grid.cell * ratio)).toBe(true);
      expect(grid.cell).toBeLessThan(3);
    },
  );
});
