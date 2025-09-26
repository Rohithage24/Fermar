import React from 'react';
// Assuming translations are handled by a context, if not, you can remove 'useLanguage'
import { useLanguage } from '../context/LanguageContext'; 

function FarmerStatsSection() {
  const { translations } = useLanguage();

  // Define the statistics data structure
  const stats = [
    { 
      value: "10K +", 
      label: translations.farmersRegistered || "Farmers Registered" 
    },
    { 
      value: "95%", 
      label: translations.accuracyRate || "Accuracy Rate" 
    },
    { 
      value: "500 +", 
      label: translations.cropsAnalyzed || "Crops Analyzed" 
    },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        {/* Main Title */}
        <h2 className="stats-title">
          {translations.joinFarmersTitle || "Join Thousands of Smart Farmers"}
        </h2>
        
        {/* Description */}
        <p className="stats-description">
          {translations.statsDescription || "AgroSanga is helping farmers across the region make better decisions with AI-powered insights."}
        </p>

        {/* Statistics Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FarmerStatsSection;