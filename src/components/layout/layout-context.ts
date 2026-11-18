import { createContext, useContext } from "react";

export type CursorContextValue = {
  label: string | null;
  setLabel: (value: string | null) => void;
};

export const CursorCtx = createContext<CursorContextValue | null>(null);

export function useCursor() {
  const context = useContext(CursorCtx);
  if (!context) throw new Error("useCursor must be used within Layout.");
  return context;
}
