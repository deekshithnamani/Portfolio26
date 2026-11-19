import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Suspense, useEffect } from "react";
import Layout from "@/Layout";
import { ROUTES } from "@/config/routes";
import { LEGACY_REDIRECTS } from "@/config/route-paths";

function RouteLoadingFallback() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-column items-center justify-center px-gutter py-page">
      <p role="status" className="text-small text-text-2">
        Loading page…
      </p>
    </main>
  );
}

export default function App() {
  useEffect(() => {
    const preloadTimer = setTimeout(() => {
      ROUTES.forEach((route) => route.preload?.());
    }, 1800);

    return () => clearTimeout(preloadTimer);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route element={<Layout />}>
            {Object.entries(LEGACY_REDIRECTS).map(([path, destination]) => (
              <Route
                key={path}
                path={path}
                element={<Navigate to={destination} replace />}
              />
            ))}
            {ROUTES.map((route) => {
              const RouteComponent = route.component;

              return route.index ? (
                <Route key={route.id} index element={<RouteComponent />} />
              ) : (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<RouteComponent />}
                />
              );
            })}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
