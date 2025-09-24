import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

function Prediction() {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const { soilData, soilReportId, weather } = location.state || {};

  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [season, setSeason] = useState(""); // Season instead of irrigation
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
console.log(auth.user.id);

  if (!soilData || !weather) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
        ⚠ No data found. Please upload soil report and weather first.
        <br />
        <button onClick={() => navigate("/")} style={buttonStyle}>
          ⬅ Go Back
        </button>
      </div>
    );
  }

  const handlePredict = async () => {
    if (!crop || !area || !season) {
      alert("⚠ Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

const payload = {
  crop: crop.toLowerCase(),   // 👈 renamed
  cropType: crop.toLowerCase(), // 👈 send both (safest)
  season: season.toLowerCase(),
  soil_ph: soilData.soil_ph || 6.5,
  nitrogen: soilData.nitrogen || 0,
  phosphorus: soilData.phosphorus || 0,
  potassium: soilData.potassium || 0,
  organic_matter: soilData.organic_matter || 0,
  electrical_conductivity: soilData.electrical_conductivity || 0,
  soilData: soilData,
  soil_moisture: Number(weather.main?.humidity || 0),
  temperature: Number(weather.main?.temp || 0),
  rainfall: Number(weather.rain?.["1h"] || 0),
  humidity: Number(weather.main?.humidity || 0),
  irrigation_amount: Number(area),
  soilReportId,
  userID: auth.user.id,
};


      const res = await axios.post("http://localhost:5000/preduct", payload);

      console.log(res);
      

      setPrediction({
        crop,
        season,
        area,
        yield: res.data.data.prediction.predicted_yield,
      });
    } catch (error) {
      console.error("❌ Prediction error:", error.response?.data || error.message);
      alert("Prediction failed. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", color: "#FFE100", background: "#313131", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>🌾 Crop Yield Prediction</h1>

      <div style={inputContainerStyle}>
        <h2>📝 Enter Crop Details</h2>
        <input placeholder="Crop Type" value={crop} onChange={e => setCrop(e.target.value)} />
        <input placeholder="Area (hectares)" type="number" value={area} onChange={e => setArea(e.target.value)} />
        <select value={season} onChange={e => setSeason(e.target.value)}>
          <option value="">-- Select Season --</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="fall">Fall</option>
        </select>
        <button onClick={handlePredict} disabled={loading}>
          {loading ? "⏳ Predicting..." : "🔮 Predict Yield"}
        </button>
      </div>

      {prediction && (
        <div style={predictionStyle}>
          <h2>✅ Prediction Result</h2>
          <p><strong>Crop:</strong> {prediction.crop}</p>
          <p><strong>Season:</strong> {prediction.season}</p>
          <p><strong>Area:</strong> {prediction.area} hectares</p>
          <p><strong>Estimated Yield:</strong> {prediction.yield} kg/ha</p>
        </div>
      )}
    </div>
  );
}

const buttonStyle = { marginTop: "1rem", background: "#FFE100", border: "none", padding: "10px 15px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };
const inputContainerStyle = { background: "rgba(255,255,255,0.15)", padding: "20px", borderRadius: "12px", marginBottom: "20px" };
const predictionStyle = { background: "rgba(34,197,94,0.8)", padding: "20px", borderRadius: "12px", marginTop: "20px", color: "#fff" };

export default Prediction;
