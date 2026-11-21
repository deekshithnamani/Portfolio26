import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "@/Layout";
import { ROUTES } from "@/config/routes";
import { LEGACY_REDIRECTS } from "@/config/route-paths";

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
