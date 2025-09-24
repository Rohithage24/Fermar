// // LogoutButton.js
// import React from "react";

// function LogoutButton({ onLogout }) {
//   const handleLogout = async () => {
//     try {
//       await fetch("http://localhost:5000/logout", {
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
import React from "react";
import { useAuth } from "../auth/AuthContext";

const LogoutButton = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "0.4rem 0.8rem",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#22c55e",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;

