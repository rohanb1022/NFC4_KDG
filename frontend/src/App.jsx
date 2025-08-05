/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import './App.css'
// import AuthPage from './pages/AuthPage'
// import { Routes, Route, Navigate } from "react-router-dom";
// import StudentDashboard from './pages/StudentDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import Employer from './pages/Employer';

// function App() {
//   return (
//     <div>
//       <Routes>
//          <Route path="/auth" element={ <AuthPage />} />
//          <Route path="/StudentDashboard" element={<StudentDashboard />} />
//          <Route path="/AdminDashboard" element={<AdminDashboard />} />
//           <Route path="/Employer" element={<Employer />} />
//           {/* Add more routes as needed */}
//       </Routes>
//     </div>
//   )
// }

// export default App


// App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, role } = useAuthStore(); // ✅ include role directly

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/auth") {
        if (role === 'student') {
          navigate('/student/dashboard');
        } else if (role === 'institute') {
          navigate('/institute/dashboard');
        }
      }
    } else {
      if (!location.pathname.startsWith('/auth')) {
        navigate('/auth');
      }
    }
  }, [isAuthenticated, role, location.pathname, navigate]); // ✅ also update dependency

  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // hydrate Zustand store on refresh
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/student/dashboard"
          element={
            isAuthenticated && role === 'student' ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/institute/dashboard"
          element={
            isAuthenticated && role === 'institute' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </>
  );
}
