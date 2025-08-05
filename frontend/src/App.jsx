import './App.css'
import AuthPage from './pages/AuthPage'
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
         <Route path="/auth" element={ <AuthPage />} />
      </Routes>
    </div>
  )
}

export default App
