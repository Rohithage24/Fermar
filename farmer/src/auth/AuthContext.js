// src/auth/AuthContext.js
import React, { useState, createContext, useContext, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Load auth from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);
      setAuth({
        user: parsed.user,
        token: parsed.token,
      });
    }
  }, []);

  // Save auth to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
