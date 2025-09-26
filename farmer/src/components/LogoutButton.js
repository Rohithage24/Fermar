// // LogoutButton.js
// import React from "react";

// function LogoutButton({ onLogout }) {
//   const handleLogout = async () => {
//     try {
//       await fetch("${process.env.REACT_APP_BACKEND_URL}/logout", {
//         method: "POST",
//         credentials: "include", // send cookies
//       });

//       if (onLogout) onLogout(); // e.g. clear user state in parent
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//     >
//       Logout
//     </button>
//   );
// }

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

  // Same style theme as navbar
  const highlightColor = "#FFE100"; // yellow
  const linkButtonStyle = {
    backgroundColor: highlightColor,
    color: "#000",
    border: "none",
    padding: "0.35rem 0.8rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "opacity 0.2s ease",
    ...(hover && { opacity: 0.8 }), // hover effect
  };

  return (
    <button
      onClick={handleLogout}
      style={linkButtonStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
