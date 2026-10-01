import { createContext, useContext } from "react";
import type { Theme } from "@/design";

export type ThemeContextValue = {
  dark: boolean;
  t: Theme;
  toggle: () => void;
};

export type CursorContextValue = {
  label: string | null;
  setLabel: (value: string | null) => void;
};

export const ThemeCtx = createContext<ThemeContextValue | null>(null);
export const CursorCtx = createContext<CursorContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeCtx);
  if (!context) throw new Error("useTheme must be used within Layout.");
  return context;
}

export function useCursor() {
  const context = useContext(CursorCtx);
  if (!context) throw new Error("useCursor must be used within Layout.");
  return context;
}
