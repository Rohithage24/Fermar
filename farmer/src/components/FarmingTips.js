import React from "react";
import { useLanguage } from "../context/LanguageContext";

function FarmingTips() {
  const { translations } = useLanguage();
  const tips = translations.farmingTips;

  return (
    <section style={{ padding: "2rem", background: "#f0fdf4", color: "#14532d" }}>
      <h2 style={{ textAlign: "center", color: "#16a34a", marginBottom: "2rem" }}>
        {translations.farmingTipsTitle}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
        {tips.map((tip, index) => (
          <div
            key={index}
            style={{
              background: index % 2 === 0 ? "#22c55e" : "#16a34a",
              color: "#fef3c7",
              padding: "1.5rem",
              borderRadius: "10px",
              minWidth: "220px",
              textAlign: "center",
              transition: "transform 0.3s ease, background 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.background = "#16a34a";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = index % 2 === 0 ? "#22c55e" : "#16a34a";
            }}
          >
            <p>{tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FarmingTips;
