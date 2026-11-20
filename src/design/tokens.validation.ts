import { LAYOUT_TOKENS } from "./layout-system";
import { ROUTE_TRANSITION_TOKENS, UI_ANIMATION_TOKENS } from "./tokens";
import { UI_RECIPE_TOKENS } from "./ui-recipes";

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNumberArray(value: unknown): value is readonly number[] {
  return (
    Array.isArray(value) &&
    value.length === 4 &&
    value.every((entry) => typeof entry === "number" && Number.isFinite(entry))
  );
}

function isEasing(value: unknown): boolean {
  return isNonEmptyString(value) || isNumberArray(value);
}

function assertLayoutTokens(): void {
  const tokenValues = [LAYOUT_TOKENS.pageShellPaddingX];

  for (const token of tokenValues) {
    if (!isNonEmptyString(token)) {
      throw new Error(
        "Design token check failed: layout class tokens must be non-empty strings",
      );
    }
  }
}

function assertAnimationTokens(): void {
  if (
    !isNumber(UI_ANIMATION_TOKENS.revealOffsetY) ||
    UI_ANIMATION_TOKENS.revealOffsetY < 0
  ) {
    throw new Error(
      "Design token check failed: revealOffsetY must be a non-negative number",
    );
  }
  if (
    !isNumber(UI_ANIMATION_TOKENS.revealDuration) ||
    UI_ANIMATION_TOKENS.revealDuration <= 0
  ) {
    throw new Error(
      "Design token check failed: revealDuration must be a positive number",
    );
  }
  if (
    !isNumber(UI_ANIMATION_TOKENS.revealDelayStep) ||
    UI_ANIMATION_TOKENS.revealDelayStep < 0
  ) {
    throw new Error(
      "Design token check failed: revealDelayStep must be a non-negative number",
    );
  }
  if (!isEasing(UI_ANIMATION_TOKENS.revealEasing)) {
    throw new Error(
      "Design token check failed: revealEasing must be a non-empty string",
    );
  }
}

function assertRouteTransitionTokens(): void {
  if (!isNumber(ROUTE_TRANSITION_TOKENS.contentEnterDuration)) {
    throw new Error(
      "Design token check failed: contentEnterDuration must be a non-negative number",
    );
  }
  if (
    ROUTE_TRANSITION_TOKENS.contentEnterDuration <= 0 ||
    ROUTE_TRANSITION_TOKENS.contentExitDuration <= 0
  ) {
    throw new Error(
      "Design token check failed: route transition durations must be greater than 0",
    );
  }
  if (!isNumber(ROUTE_TRANSITION_TOKENS.contentExitDuration)) {
    throw new Error(
      "Design token check failed: contentExitDuration must be a non-negative number",
    );
  }
  if (!isNumber(ROUTE_TRANSITION_TOKENS.contentEnterOffsetY)) {
    throw new Error(
      "Design token check failed: contentEnterOffsetY must be a non-negative number",
    );
  }
  if (
    ROUTE_TRANSITION_TOKENS.contentEnterOffsetY < 0 ||
    ROUTE_TRANSITION_TOKENS.contentExitOffsetY > 0
  ) {
    throw new Error(
      "Design token check failed: contentExitOffsetY should be zero or negative",
    );
  }
  if (!isNumber(ROUTE_TRANSITION_TOKENS.contentExitOffsetY)) {
    throw new Error(
      "Design token check failed: contentExitOffsetY must be a number",
    );
  }
  if (!isNumber(ROUTE_TRANSITION_TOKENS.overlayDuration)) {
    throw new Error(
      "Design token check failed: overlayDuration must be a non-negative number",
    );
  }
  if (!isEasing(ROUTE_TRANSITION_TOKENS.contentEnterEasing)) {
    throw new Error(
      "Design token check failed: contentEnterEasing must be a valid easing value",
    );
  }
  if (!isEasing(ROUTE_TRANSITION_TOKENS.contentExitEasing)) {
    throw new Error(
      "Design token check failed: contentExitEasing must be a valid easing value",
    );
  }
  if (!isNumber(ROUTE_TRANSITION_TOKENS.overlayHoldOpacity)) {
    throw new Error(
      "Design token check failed: overlayHoldOpacity must be a number",
    );
  }
}

function assertUiRecipeTokens(): void {
  for (const token of Object.values(UI_RECIPE_TOKENS)) {
    if (!isNonEmptyString(token)) {
      throw new Error(
        "Design token check failed: UI recipe tokens must be non-empty strings",
      );
    }
  }
}

export function validateDesignTokens(): void {
  if (import.meta.env.PROD) {
    return;
  }

  assertLayoutTokens();
  assertAnimationTokens();
  assertRouteTransitionTokens();
  assertUiRecipeTokens();
}

validateDesignTokens();
