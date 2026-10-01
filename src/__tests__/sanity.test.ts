import { describe, expect, it } from "vitest";

describe("test harness", () => {
  it("runs in a browser-like environment", () => {
    const node = document.createElement("div");
    node.textContent = "ok";

    expect(node).toHaveTextContent("ok");
  });
});
