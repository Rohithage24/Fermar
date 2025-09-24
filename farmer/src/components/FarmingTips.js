import React from "react";
import { useLanguage } from "../context/LanguageContext";

function FarmingTips() {
  const { translations } = useLanguage();
  const tips = translations.farmingTips;

  return (
    <section style={{ padding: "2rem", background: "#f8f9ce", color: "#63776bff" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>
        {translations.farmingTipsTitle}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
        {tips.map((tip, index) => (
          <div
            key={index}
            style={{
              background: index % 2 === 0 ? "#5d5d5d" : "#727272",
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
              e.currentTarget.style.background = "#a2b5a9ff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = index % 2 === 0 ? "#808080" : "#919191";
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