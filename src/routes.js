import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Feed = React.lazy(() => import("./pages/Feed"));

export default function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Switch>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas Privadas */}
          <Route
            path="/feed"
            element={<ProtectedRoute component={Feed} redirect="/login" />}
          />

          {/* Página de Not Found - 404 */}
          <Route path="/*" element={<NotFound />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
