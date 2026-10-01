import "@testing-library/jest-dom/vitest";
import { afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { installMatchMediaMock, resetMatchMediaMock } from "@/test/matchMedia";

beforeAll(() => {
  installMatchMediaMock();
});

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
  resetMatchMediaMock();
  document.body.innerHTML = "";
  document.body.removeAttribute("style");
  document.body.removeAttribute("data-drawer-open");
  document.documentElement.removeAttribute("data-theme");
  window.history.pushState({}, "", "/");
});
