/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Employer from "./pages/Employer";
import LandingPage from "./LandingPage";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, role, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // hydrate Zustand store on refresh
  }, []);

  useEffect(() => {
    // Redirect authenticated users trying to access root or /auth
    if (isAuthenticated) {
      if (location.pathname === "/auth" || location.pathname === "/") {
        if (role === "student") {
          navigate("/student/dashboard");
        } else if (role === "institute") {
          navigate("/institute/dashboard");
        }
      }
    } else {
      // Redirect unauthenticated users away from protected routes
      if (
        location.pathname !== "/" &&
        !location.pathname.startsWith("/auth") &&
        !location.pathname.startsWith("/Employer")
      ) {
        navigate("/auth");
      }
    }
  }, [isAuthenticated, role, location.pathname, navigate]);

  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/Employer/*" element={<Employer />} />

        {/* Protected Student Dashboard */}
        <Route
          path="/student/dashboard"
          element={
            isAuthenticated && role === "student" ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        {/* Protected Institute Dashboard */}
        <Route
          path="/institute/dashboard"
          element={
            isAuthenticated && role === "institute" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
