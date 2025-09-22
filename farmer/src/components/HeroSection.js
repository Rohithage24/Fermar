import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Chatbot from "../components/ChatBot/Chatbot"; // no extra spaces

function HeroSection() {
  const { language, setLanguage, translations } = useLanguage();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredLang, setHoveredLang] = useState(null);

  const heroStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    textAlign: "center",
    padding: "0 20px",
    paddingTop: "150px",
    position: "relative",
    backgroundImage: "url('/dan-meyers-IQVFVH0ajag-unsplash.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const headingStyle = {
    fontSize: "3rem",
    marginBottom: "5px",
    color: "#b6ff5c",
    textShadow: "2px 2px 6px rgba(0,0,0,0.9)",
  };

  const textStyle = {
    fontSize: "1.3rem",
    color: "#e8ffb5",
    textShadow: "1px 1px 5px rgba(0,0,0,0.8)",
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
    backgroundColor: "rgba(255, 255, 255, 0.95)",
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

  const toggleLanguageOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowLanguageOptions(false);
  };

  // Map HeroSection language to Chatbot language keys
  const langMap = { English: "en", Hindi: "hi", Marathi: "mr", Odia: "or" };
  const selectedLang = langMap[language] || "en"; // fallback to English

  return (
    <>
      <section style={heroStyle}>
        <h1 style={headingStyle}>{translations.welcome}</h1>
        <p style={textStyle}>{translations.description}</p>

        {/* Language Button */}
        <button
          onClick={toggleLanguageOptions}
          style={hovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {translations.chooseLang}
        </button>

        {/* Language Options */}
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

      {/* Pass selectedLang (mapped key) to Chatbot */}
      <div>
        <Chatbot language={selectedLang} />
      </div>
    </>
  );
}

export default HeroSection;
