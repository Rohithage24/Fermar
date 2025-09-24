import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../auth/AuthContext";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { translations } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const [auth] = useAuth(); // get logged-in user info

  // Update mobile view on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textColor = "#808000"; // olive
  const highlightColor = "#FFE100"; // yellow

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.8rem 2rem",
    width: "100%",
    height: "65px",
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    boxSizing: "border-box",
  };

  const logoStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    cursor: "pointer",
    color: highlightColor,
  };

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
    margin: 0,
    padding: 0,
    alignItems: "center",
  };

  const linkStyle = {
    color: textColor,
    fontWeight: 500,
    cursor: "pointer",
    padding: "0.3rem 0",
  };

  const linkButtonStyle = {
    backgroundColor: highlightColor,
    color: "#000",
    border: "none",
    padding: "0.35rem 0.8rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const linkButtonHoverStyle = {
    opacity: 0.8,
  };

  const hamburgerStyle = {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    gap: "5px",
  };

  const barStyle = {
    width: "25px",
    height: "3px",
    backgroundColor: textColor,
    borderRadius: "2px",
  };

  const mobileMenuStyle = {
    display: menuOpen ? "flex" : "none",
    flexDirection: "column",
    gap: "0.8rem",
    position: "absolute",
    top: "65px",
    right: "0.5rem",
    left: "0.5rem",
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    padding: "0.8rem 1rem",
    borderRadius: "10px",
    boxSizing: "border-box",
    zIndex: 999,
  };

  // Links for non-logged-in users
  const links = [
    { label: "Home", path: "/", isButton: true },
    { label: translations.cropsPage, path: "/crops" },
    { label: translations.aboutTitle, path: "/about", isButton: true },
    { label: translations.contactTitle, path: "/contact", isButton: true },
  ];

  // Login/Register links only for guests
  const guestLinks = [
    { label: "Login", path: "/login", isButton: true },
    { label: "Register", path: "/registation", isButton: true },
  ];

  return (
    <nav style={navbarStyle}>
      <h1 style={logoStyle} onClick={() => navigate("/")}>
        AgroSanga
      </h1>

      {/* Desktop Links */}
      {!isMobile && (
        <ul style={navLinksStyle}>
          {links.map((link, i) => (
            <li key={i}>
              {link.isButton ? (
                <button
                  style={linkButtonStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.opacity = linkButtonHoverStyle.opacity)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </button>
              ) : (
                <span style={linkStyle} onClick={() => navigate(link.path)}>
                  {link.label}
                </span>
              )}
            </li>
          ))}

          {/* Conditionally show Logout or Login/Register */}
          {auth.user ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            guestLinks.map((link, i) => (
              <li key={i}>
                <button
                  style={linkButtonStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.opacity = linkButtonHoverStyle.opacity)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {/* Mobile Hamburger */}
      {isMobile && (
        <div style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
          <span style={barStyle}></span>
          <span style={barStyle}></span>
          <span style={barStyle}></span>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <ul style={mobileMenuStyle}>
          {links.map((link, i) => (
            <li key={i} style={{ marginBottom: "0.5rem" }}>
              {link.isButton ? (
                <button
                  style={{ ...linkButtonStyle, width: "100%" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.opacity = linkButtonHoverStyle.opacity)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(link.path);
                  }}
                >
                  {link.label}
                </button>
              ) : (
                <span
                  style={linkStyle}
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(link.path);
                  }}
                >
                  {link.label}
                </span>
              )}
            </li>
          ))}

          {/* Conditionally show Logout or Login/Register in mobile */}
          {auth.user ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            guestLinks.map((link, i) => (
              <li key={i} style={{ marginBottom: "0.5rem" }}>
                <button
                  style={{ ...linkButtonStyle, width: "100%" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.opacity = linkButtonHoverStyle.opacity)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(link.path);
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
