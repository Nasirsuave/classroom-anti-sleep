// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
export const AuthContext = createContext(null);

// Create a provider component that will wrap your entire app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to not authenticated
  const [isLoading, setIsLoading] = useState(true); // To handle initial token check
  const navigate = useNavigate();

  // On initial load, check if a token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      // In a real app, you'd validate this token with your backend
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Done checking initial state
  }, []); // Run only once on mount

  // Function to handle login
  const login = (token) => {
    localStorage.setItem('userToken', token); // Store the token
    setIsAuthenticated(true); // Update React state
    navigate('/dashboard'); // Redirect to dashboard
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('userToken'); // Remove the token
    setIsAuthenticated(false); // Update React state
    navigate('/login'); // Redirect to login page
  };

  // Provide the auth state and functions to children components
  const contextValue = {
    isAuthenticated,
    login,
    logout,
    isLoading, // Provide loading state
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};