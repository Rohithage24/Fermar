import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CropInfo from "./components/CropInfo";
import FarmingTips from "./components/FarmingTips";
import Footer from "./components/Footer";
import { useLanguage } from "./context/LanguageContext";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import "./App.css"; // external CSS for global styles
import WeatherSoilSection from "./components/WeatherSoilSection";
import FarmerStatsSection from "./components/FarmerStatsSection";
import YieldPrediction from "./components/YieldPrediction";
import AboutUs from "./components/About";



// ✅ Contact Page
const Contact = () => {
  const { translations } = useLanguage();
  return (
    <div className="page-section contact-page">
      <h2>📞 {translations.contactTitle}</h2>
      <p>{translations.contactEmail}</p>
      <p>{translations.contactPhone}</p>
    </div>
  );
};

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <CropInfo />
              <WeatherSoilSection />
              <FarmerStatsSection />
              <FarmingTips />
              <Footer />
            </>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/prediction" element={<YieldPrediction />} />


        {/* Remove UploadSoil & SoilReportUpload until those files exist */}
      </Routes>
    </div>
  );
}

export default App;
