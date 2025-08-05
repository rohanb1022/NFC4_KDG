import './App.css'
import AuthPage from './pages/AuthPage'
import { Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <div>
      <Routes>
         <Route path="/auth" element={ <AuthPage />} />
         <Route path="/StudentDashboard" element={<StudentDashboard />} />
      </Routes>
    </div>
  )
}

export default App
