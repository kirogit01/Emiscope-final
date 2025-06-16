import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ClimatePage from './pages/ClimatePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import FactoryDashboard from './pages/dashboard/FactoryDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/auth/ProtectedRoute'



function App() {
  const { currentUser, loading, userRole } = useAuth()
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    // Simulate initial app loading
    if (!loading) {
      const timer = setTimeout(() => {
        setAppReady(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [loading])

  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/climate" element={<ClimatePage />} />
            <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!currentUser ? <RegisterPage /> : <Navigate to="/dashboard" />} />
            
            {/* Protected routes */}
            <Route
               path="/dashboard"
               element={
              <ProtectedRoute>
              {currentUser?.email === 'kirokirojan01@gmail.com'
              ? <AdminDashboard />
              : <FactoryDashboard />}
            </ProtectedRoute>
        }
            />
            
            {/* Admin route */}
        <Route
          path="/admin"
           element={
          <ProtectedRoute>
          {currentUser?.email === 'kirokirojan01@gmail.com'
          ? <AdminDashboard />
          : <Navigate to="/not-authorized" />}
         </ProtectedRoute>

    }
  />
          
  
            
            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App