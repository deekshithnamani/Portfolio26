import { BrowserRouter, Route, Routes } from "react-router";
import { Suspense, useEffect } from "react";
import Layout from "@/Layout";
import { ROUTES } from "@/config/routes";

function RouteLoadingFallback() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-8 py-16 md:px-12">
      <p className="text-sm font-light tracking-[0.08em] text-[var(--surface-fg-mid)]">
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
