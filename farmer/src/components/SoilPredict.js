import React, { useState, useEffect } from 'react';
import './SoilPredict.css';

// Mock API function
const fetchSoilPrediction = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResult = {
        soil_ph: 6.5,
        nitrogen: 50,
        phosphorus: 30,
        potassium: 20,
        organic_matter: 3.2,
        electrical_conductivity: 1.1,
        soil_moisture: 55,
        temperature: 28,
        rainfall: 120,
        humidity: 70,
        season: "summer",
        region: "Maharashtra",
        constraints: {
          organic_only: false,
          max_fertilizer_kg_per_ha: 150
        },
        soil_quality_score: 85,
        description: "The soil quality report shows strong nutrient levels and favorable conditions for summer crops in Maharashtra. The pH is optimal, and all essential macronutrients are present in good quantities."
      };
      resolve(mockResult);
    }, 2000);
  });
};

const SoilPredictor = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const getData = async () => {
    setLoading(true);
    setMessage('');
    try {
      const result = await fetchSoilPrediction();
      setPrediction(result);
      setMessage('Data fetched successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to get prediction.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const resetData = () => {
    setPrediction(null);
    getData();
  };

  const renderPredictionResult = () => {
    if (!prediction) return null;

    const valueCardClass = "value-card";

    return (
      <div className="prediction-container">
        <div className="score-card">
          <div className="score-circle">
            <svg viewBox="0 0 36 36" className="score-svg">
              <path
                className="bg-circle"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.8"
                d="M18 2.0845a15.9155 15.9155 0 010 31.831"
              />
              <path
                className="progress-circle"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.8"
                strokeLinecap="round"
                strokeDasharray={`${prediction.soil_quality_score}, 100`}
                d="M18 2.0845a15.9155 15.9155 0 010 31.831"
              />
            </svg>
            <div className="score-text">{prediction.soil_quality_score}</div>
          </div>
          <h2 className="score-title">Soil Quality Score: {prediction.soil_quality_score}/100</h2>
          <p className="score-description">{prediction.description}</p>
        </div>

        <div className="prediction-grid">
          <div className={valueCardClass}>
            <h3>{prediction.soil_ph}</h3>
            <p>pH Level</p>
          </div>
          <div className={valueCardClass}>
            <h3>{prediction.nitrogen} ppm</h3>
            <p>Nitrogen</p>
          </div>
          <div className={valueCardClass}>
            <h3>{prediction.phosphorus} ppm</h3>
            <p>Phosphorus</p>
          </div>
          <div className={valueCardClass}>
            <h3>{prediction.potassium} ppm</h3>
            <p>Potassium</p>
          </div>
          <div className={valueCardClass}>
            <h3>{prediction.organic_matter}%</h3>
            <p>Organic Matter</p>
          </div>
          <div className={valueCardClass}>
            <h3>{prediction.soil_moisture}%</h3>
            <p>Moisture</p>
          </div>
        </div>

        <button onClick={resetData} className="predict-button">Predict Again</button>
      </div>
    );
  };

  return (
    <div className="soil-container">
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Fetching soil data...</p>
        </div>
      ) : (
        prediction ? renderPredictionResult() : (
          <div className="form-card">
            <h1>Predict Soil Health</h1>
            <p>No data to display. Please try again.</p>
            <button onClick={resetData} className="predict-button">Try Again</button>
          </div>
        )
      )}
    </div>
  );
};

export default SoilPredictor;
