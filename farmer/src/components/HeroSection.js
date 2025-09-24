// HeroSection.js
import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Chatbot from "../components/ChatBot/Chatbot";

function HeroSection() {
  const { language, setLanguage, translations } = useLanguage();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredLang, setHoveredLang] = useState(null);

  const toggleLanguageOptions = () => setShowLanguageOptions(!showLanguageOptions);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowLanguageOptions(false);
  };

  const langMap = { English: "en", Hindi: "hi", Marathi: "mr", Odia: "or" };
  const selectedLang = langMap[language] || "en";

  // Hero section styles
  const heroStyle = {
    paddingTop: "100px", // leave space for navbar
    height: "100vh",
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  };

  const videoStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)", // keep overlay as before
    backdropFilter: "blur(2px)",
    zIndex: 1,
  };

  const headingStyle = {
    fontSize: "3rem",
    color: "#FFE100", // text color updated
    zIndex: 2,
  };

  const textStyle = {
    fontSize: "1.3rem",
    color: "#FFE100", // text color updated
    zIndex: 2,
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s ease",
    zIndex: 2,
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  const languageOptionsStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    gap: "10px",
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    zIndex: 3,
  };

  const languageButtonStyle = {
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  };

  const languageButtonHoverStyle = {
    backgroundColor: "#1b5e20",
  };

  return (
    <>
      <section style={heroStyle}>
        {/* Video Background */}
        <video
          style={videoStyle}
          src="/Recording 2025-09-23 145606.mp4"
          autoPlay
          loop
          muted
        />

        {/* Overlay */}
        <div style={overlayStyle}></div>

        {/* Heading and description */}
        <h1 style={headingStyle}>{translations.welcome}</h1>
        <p style={textStyle}>{translations.description}</p>

        {/* Language selector button */}
        <button
          onClick={toggleLanguageOptions}
          style={hovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {translations.chooseLang}
        </button>

        {/* Language options */}
        {showLanguageOptions && (
          <div style={languageOptionsStyle}>
            {["English", "Hindi", "Marathi", "Odia"].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                style={
                  hoveredLang === lang
                    ? { ...languageButtonStyle, ...languageButtonHoverStyle }
                    : languageButtonStyle
                }
                onMouseEnter={() => setHoveredLang(lang)}
                onMouseLeave={() => setHoveredLang(null)}
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Chatbot */}
      <Chatbot language={selectedLang} />
    </>
  );
}

export default HeroSection;
