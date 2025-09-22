import React from "react";
import { useLanguage } from "../context/LanguageContext"; // adjust path if needed

const Navbar = () => {
  const { translations } = useLanguage(); // get translations for current language

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
    gap: "2rem",
    margin: 0,
    padding: 0,
    alignItems: "center",
  };

  const linkStyle = {
    color: "white",
    fontWeight: 500,
    position: "relative",
    cursor: "pointer",
    transition: "color 0.3s",
  };

  const linkHoverStyle = {
    color: "#86efac",
  };

  const linkUnderlineStyle = {
    content: '""',
    position: "absolute",
    width: "0%",
    height: "2px",
    bottom: "-3px",
    left: 0,
    backgroundColor: "#86efac",
    transition: "width 0.3s",
  };

  return (
    <nav style={navbarStyle}>
      <h1 style={logoStyle}>{translations.welcome}</h1>
      <ul style={navLinksStyle}>
        {[translations.home, translations.cropsPage, translations.aboutTitle, translations.contactTitle].map(
          (link, i) => (
            <li
              key={i}
              style={linkStyle}
              onMouseOver={(e) => {
                e.target.style.color = "#86efac";
                e.target.firstChild.style.width = "100%";
              }}
              onMouseOut={(e) => {
                e.target.style.color = "white";
                e.target.firstChild.style.width = "0%";
              }}
            >
              {link}
              <span style={linkUnderlineStyle}></span>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
