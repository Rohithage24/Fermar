import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CropInfo from "./components/CropInfo";
import WeatherInfo from "./components/WeatherInfo";
import FarmingTips from "./components/FarmingTips";
import Footer from "./components/Footer";
import SoilReportUpload from "./components/SoilReportUpload";
import { useLanguage } from "./context/LanguageContext";
import MobileLogin from './components/MobileLogin';
import UploadSoil from './components/UploadSoil';
import './App.css'
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import LogoutButton from "./components/LogoutButton";


const About = () => {
  const { translations } = useLanguage();

  return (
    <div style={{ padding: "2rem", color: "#140909ff", textAlign: "center" }}>
      <h2 style={{ color: "#facc15" }}>👨‍🌾 {translations.aboutTitle}</h2>
      <p>{translations.aboutText}</p>
    </div>
  );
};

const Contact = () => {
  const { translations } = useLanguage();

  return (
    <div style={{ padding: "2rem", color: "#f5f5f5", textAlign: "center" }}>
      <h2 style={{ color: "#facc15" }}>📞 {translations.contactTitle}</h2>
      <p>{translations.contactEmail}</p>
      <p>{translations.contactPhone}</p>
    </div>
  );
};

function App() {
  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <style>
        {`
          body, html, #root {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
        `}
      </style>
          
      <Navbar />

      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <CropInfo />
                <WeatherInfo />
                <SoilReportUpload />
                <FarmingTips />
                <Footer />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registation" element={<RegistrationForm />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/registation" element={<RegistrationForm />} />


          <Route path="/soile" element={<UploadSoil />} />


        </Routes>
      </div>
      
    </div>
  );
}

export default App;
