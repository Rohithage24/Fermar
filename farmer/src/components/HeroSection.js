import React from "react";
import { useLanguage } from "../context/LanguageContext";
import '../styles/HeroSection.css'
import ChatBot from "./ChatBot/Chatbot"

function HeroSection() {
  const { language, setLanguage, translations  } = useLanguage();

  const langMap = { English: "en", Hindi: "hi", Marathi: "mr", Odia: "or" };
  const selectedLang = langMap[language] || "en";


  console.log(process.env.REACT_APP_BACKEND_URL);
  

  return (
    <>
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">{translations.title || "AgroSanga"}</h1>
        <p className="hero-tagline">
          {translations.tagline ||
            "AI-powered platform for yield prediction and crop recommendations"}
        </p>
        <p className="hero-description">
          {translations.description ||
            "Harness the power of artificial intelligence to optimize your farming decisions, predict harvest yields, and get personalized crop recommendations based on your soil data."}
        </p>

        <div className="hero-actions">
          <button
            className="primary-btn me-3"
            onClick={() => console.log("Navigate to Get Started")}
          >
            <span className="me-2">🌿</span>
            {translations.getStarted || "Get Started"}
          </button>
          <button
            className="secondary-btn"
            onClick={() => console.log("Navigate to Learn More")}
          >
            <span className="me-2">📖</span>
            {translations.learnMore || "Learn More"}
          </button>
        </div>

        <div className="scroll-down">Scroll Down 🔽</div>
      </div>
    </section>


            <div>
              <ChatBot language={selectedLang} />
            </div>
   

    </>
  );
}

export default HeroSection;
