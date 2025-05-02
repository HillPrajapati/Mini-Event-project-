import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/RouteConfig/ProtectedRoute";
import PublicRoute from "./components/RouteConfig/PublicRoute";
import "./AppRoutes.css";
import Loader from "./components/Loder";

// Lazy loading components
const Login = lazy(() => import("./components/Login"));
const Events = lazy(() => import("./components/Event"));
const MyBookings = lazy(() => import("./components/MyBooking"));
const Register = lazy(() => import("./components/Register"));

function AppRoutes() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-content">
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default AppRoutes;
