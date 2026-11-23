import { describe, expect, it } from "vitest";
import {
  HOME_EFFECTS,
  ACTIVE_HOME_EFFECTS,
  chooseHomeEffect,
  getHomeEffect,
  rememberHomeEffect,
} from "@/config/home-background";

describe("home visit background selection", () => {
  it("keeps all seven implemented effects available", () => {
    expect(HOME_EFFECTS).toEqual([
      "waves",
      "ripples",
      "contours",
      "fire",
      "smoke",
      "plasma",
      "aurora",
    ]);
  });
  it("hides Contours and Ripple from the automatic rotation", () => {
    expect(ACTIVE_HOME_EFFECTS).toEqual([
      "waves",
      "fire",
      "smoke",
      "plasma",
      "aurora",
    ]);
  });
  it("can select every effect", () => {
    expect(
      ACTIVE_HOME_EFFECTS.map((_, index) =>
        chooseHomeEffect(
          undefined,
          () => (index + 0.5) / ACTIVE_HOME_EFFECTS.length,
        ),
      ),
    ).toEqual(ACTIVE_HOME_EFFECTS);
  });
  it("avoids repeating the previous reload's effect", () => {
    for (const previous of HOME_EFFECTS) {
      expect(chooseHomeEffect(previous, () => 0)).not.toBe(previous);
      expect(chooseHomeEffect(previous, () => 0.999)).not.toBe(previous);
    }
  });
  it("selects a new effect after a committed Home visit", () => {
    const previous = getHomeEffect();
    rememberHomeEffect(previous);
    expect(getHomeEffect()).not.toBe(previous);
  });
});
