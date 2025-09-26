import React from "react";
import { useLanguage } from "../context/LanguageContext";


function FarmingTips() {
  const { translations } = useLanguage();
  const tips = translations.farmingTips;

  return (
    <section className="farming-tips">
      <h2 className="farming-tips-title">
        {translations.farmingTipsTitle}
      </h2>
      <div className="farming-tips-container">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`farming-tip-card ${index % 2 === 0 ? "even" : "odd"}`}
          >
            <p>{tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FarmingTips;
