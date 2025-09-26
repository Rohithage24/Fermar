// src/components/LogoutButton.js
import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";


const LogoutButton = () => {
  const [auth, setAuth] = useAuth();
  const [hover, setHover] = useState(false);

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className={`logout-button ${hover ? "hover" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
