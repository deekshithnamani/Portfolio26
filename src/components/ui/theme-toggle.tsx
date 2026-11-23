import { useEffect, useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "portfolio.theme";
const SYSTEM_QUERY = "(prefers-color-scheme: dark)";
const readTheme = (value: string | null): Theme | null =>
  value === "light" || value === "dark" ? value : null;

function initialTheme() {
  let preference: Theme | null = null;
  try {
    preference = readTheme(localStorage.getItem(STORAGE_KEY));
  } catch {
    // Private browsing can disable storage; the switch still works in memory.
  }
  return {
    preference,
    theme:
      preference ??
      ((window.matchMedia(SYSTEM_QUERY).matches ? "dark" : "light") as Theme),
  };
}

export function ThemeToggle() {
  const [{ theme, preference }, setSelection] = useState(initialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const system = window.matchMedia(SYSTEM_QUERY);
    const onSystemChange = () =>
      setSelection((current) =>
        current.preference
          ? current
          : {
              preference: null,
              theme: system.matches ? "dark" : "light",
            },
      );
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      const next = readTheme(event.newValue);
      setSelection({
        preference: next,
        theme: next ?? (system.matches ? "dark" : "light"),
      });
    };
    system.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      system.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
  return (
    <button
      type="button"
      className="theme-toggle focus-ring"
      data-mode={theme}
      aria-label={label}
      aria-pressed={theme === "dark"}
      title={label}
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        setSelection({ preference: next, theme: next });
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* Keep the in-memory choice. */
        }
      }}
    >
      <svg
        className="theme-toggle-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <g className="theme-toggle-sun">
          <circle cx="12" cy="12" r="4" />
          <path
            className="theme-toggle-rays"
            d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"
          />
        </g>
        <g className="theme-toggle-moon">
          <path d="M20.5 13.5A8.5 8.5 0 0 1 10.5 3.5a8.5 8.5 0 1 0 10 10Z" />
        </g>
      </svg>
      <span className="sr-only">
        {preference ? "Theme selected" : "Following system theme"}
      </span>
    </button>
  );
}
