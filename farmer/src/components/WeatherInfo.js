import React from "react";
import { useLanguage } from "../context/LanguageContext";

function WeatherInfo() {
  const { translations } = useLanguage();

  const weather = translations.weather;
  const soil = translations.soil;

  return (
    <section style={{ padding: "2rem", background: "#fef9f2", color: "#14532d" }}>
      <h2 style={{ textAlign: "center", color: "#16a34a", marginBottom: "2rem" }}>
        {translations.weatherSoilTitle}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
        <div
          style={{
            background: "#22c55e",
            color: "#fef3c7",
            padding: "1.5rem",
            borderRadius: "10px",
            minWidth: "220px",
            textAlign: "center",
            transition: "transform 0.3s ease",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3 style={{ marginBottom: "1rem" }}>{translations.weatherTitle}</h3>
          <p>{translations.temperature}: {weather.temperature}</p>
          <p>{translations.condition}: {weather.condition}</p>
          <p>{translations.humidity}: {weather.humidity}</p>
        </div>
        <div
          style={{
            background: "#16a34a",
            color: "#fef3c7",
            padding: "1.5rem",
            borderRadius: "10px",
            minWidth: "220px",
            textAlign: "center",
            transition: "transform 0.3s ease",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3 style={{ marginBottom: "1rem" }}>{translations.soilTitle}</h3>
          <p>{translations.type}: {soil.type}</p>
          <p>{translations.moisture}: {soil.moisture}</p>
          <p>{translations.ph}: {soil.pH}</p>
        </div>
      </div>
    </section>
  );
}

export default WeatherInfo;
