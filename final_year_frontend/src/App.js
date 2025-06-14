// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider and useAuth

import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import HeatmapsPage from './pages/HeatmapsPage';
import ReportPage from './pages/ReportPage';
import LoginPage from './pages/LoginPage';
import RegisterationPage from './pages/RegistrationPage';


// --- This component will now manage which routes are accessible ---
// It needs to be inside Router but can consume AuthContext
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth(); // Get auth state from context

  if (isLoading) {
    // Optionally render a loading spinner or message while checking auth status
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // If authenticated, render the children (the protected page)
};
// ------------------------------------------------------------------


function AppContent() { // Renamed App to AppContent
  const { isAuthenticated, isLoading } = useAuth(); // Use auth context here too

  // Decide whether to render Navbar based on authentication status and loading state
  // Only show Navbar once auth state is determined AND user is authenticated
  const shouldShowNavbar = isAuthenticated && !isLoading;

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <div className="main-content-area" style={{ marginTop: shouldShowNavbar ? '60px' : '0' }}>
        <Routes>
          {/* Public route for Login */}
          <Route path="/register" element={<RegisterationPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes wrapped with ProtectedRoute component */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/heatmaps" element={<ProtectedRoute><HeatmapsPage /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />

          {/* Redirect from root path */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
          />
        </Routes>
        
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap your entire application content with AuthProvider */}
        <AppContent /> {/* AppContent now consumes the context */}
      </AuthProvider>
    </Router>
  );
}

export default App;