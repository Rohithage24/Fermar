import React from "react";
import cornIcon from "../icons/corn.png";
import { useLanguage } from "../context/LanguageContext";

function CropInfo() {
  const { translations } = useLanguage();

  const crops = [
    { name: translations.crops.rice, icon: "🌾" },
    { name: translations.crops.corn, icon: cornIcon },
    { name: translations.crops.sugarcane, icon: "🧉" },
    { name: translations.crops.cotton, icon: "🧵" },
    { name: translations.crops.pulses, icon: "🥔" },
    { name: translations.crops.millets, icon: "🍚" },
  ];

  return (
    <section className="crop-section">
      <h2 className="crop-title">{translations.mainCrops}</h2>
      <div className="crop-grid">
        {crops.map((crop, index) => (
          <div key={index} className="crop-card">
            <div className="crop-icon">
              {crop.name === translations.crops.corn ? (
                <img src={crop.icon} alt={crop.name} className="corn-img" />
              ) : (
                <span className="emoji-icon">{crop.icon}</span>
              )}
            </div>
            <p className="crop-name">{crop.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CropInfo;
