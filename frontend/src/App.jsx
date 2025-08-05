import './App.css'
import AuthPage from './pages/AuthPage'
import { Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Employer from './pages/Employer';

function App() {
  return (
    <div>
      <Routes>
         <Route path="/auth" element={ <AuthPage />} />
         <Route path="/StudentDashboard" element={<StudentDashboard />} />
         <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Employer" element={<Employer />} />
          {/* Add more routes as needed */}
      </Routes>
    </div>
  )
}

export default App
