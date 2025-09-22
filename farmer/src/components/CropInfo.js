import React from "react";
import cornIcon from "../icons/corn.png"; // your corn icon
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
    <section style={{ padding: "2rem", background: "#f0fdf4", color: "#14532d" }}>
      <h2 style={{ textAlign: "center", color: "#166534", marginBottom: "2rem" }}>
        {translations.mainCrops}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
        {crops.map((crop, index) => (
          <div
            key={index}
            style={{
              background: index % 2 === 0 ? "#22c55e" : "#16a34a",
              color: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              minWidth: "140px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              {crop.name === translations.crops.corn ? (
                <img src={crop.icon} alt={crop.name} style={{ height: "60px", objectFit: "contain" }} />
              ) : (
                crop.icon
              )}
            </div>
            <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>{crop.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CropInfo;
