type MediaState = {
  reduce: boolean;
  finePointer: boolean;
  darkTheme: boolean;
};

let mediaState: MediaState = {
  reduce: false,
  finePointer: true,
  darkTheme: true,
};

const mediaListeners = new Map<
  string,
  Set<(event: MediaQueryListEvent) => void>
>();

export function setMediaState(next: Partial<MediaState>) {
  mediaState = { ...mediaState, ...next };
  notifyMediaListeners();
}

export function resetMatchMediaMock() {
  mediaState = {
    reduce: false,
    finePointer: true,
    darkTheme: true,
  };
  notifyMediaListeners();
}

function matchesQuery(query: string) {
  if (query.includes("prefers-reduced-motion")) {
    return mediaState.reduce;
  }

  if (query.includes("pointer: fine")) {
    return mediaState.finePointer;
  }

  if (query.includes("prefers-color-scheme: dark")) {
    return mediaState.darkTheme;
  }

  return false;
}

function notifyMediaListeners() {
  mediaListeners.forEach((listeners, query) => {
    const event = {
      matches: matchesQuery(query),
      media: query,
    } as MediaQueryListEvent;

    listeners.forEach((listener) => listener(event));
  });
}

export function installMatchMediaMock() {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => {
      const listeners = mediaListeners.get(query) ?? new Set();
      mediaListeners.set(query, listeners);

      return {
        get matches() {
          return matchesQuery(query);
        },
        media: query,
        onchange: null,
        addListener: (listener: (event: MediaQueryListEvent) => void) =>
          listeners.add(listener),
        removeListener: (listener: (event: MediaQueryListEvent) => void) =>
          listeners.delete(listener),
        addEventListener: (
          type: string,
          listener: (event: MediaQueryListEvent) => void,
        ) => {
          if (type === "change") {
            listeners.add(listener);
          }
        },
        removeEventListener: (
          type: string,
          listener: (event: MediaQueryListEvent) => void,
        ) => {
          if (type === "change") {
            listeners.delete(listener);
          }
        },
        dispatchEvent: () => false,
      };
    },
  });
}
