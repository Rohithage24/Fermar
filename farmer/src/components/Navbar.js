// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [auth] = useAuth();
  console.log(auth);
  
  const user = auth.user;

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(90deg, #1a3c2d, #14532d, #064e3b)",
    padding: "1rem 2rem",
    width: "100%",
    boxSizing: "border-box",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    color: "white",
    fontSize: "1.8rem",
    fontWeight: "bold",
    letterSpacing: "1px",
    cursor: "pointer",
  };

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
    alignItems: "center",
  };

  const linkStyle = {
    color: "white",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <nav style={navbarStyle}>
      <h1 style={logoStyle}>Farmer Portal</h1>
      <ul style={navLinksStyle}>
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/registation" style={linkStyle}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
            </li>
          </>
        )}

        {user && (
          <li>
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
