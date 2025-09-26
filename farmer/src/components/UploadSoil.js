import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./UploadSoil.css";

function UploadSoil() {
  const [soilData, setSoilData] = useState(null);
  const [soilReportId, setSoilReportId] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState("");

  const [cropType, setCropType] = useState("");
  const [season, setSeason] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [humidity, setHumidity] = useState("");
  const [irrigationAmount, setIrrigationAmount] = useState("");

  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a valid image (JPG, PNG).");
    }
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select a file");
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/soil-Reprot", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSoilData(response.data.soil_data);
      setSoilReportId(response.data.soilReportId);

      setTimeout(() => {
        setPreview(null);
        setFile(null);
      }, 5000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!soilData) return setError("Please upload soil report first");
    if (!auth.user) {
      navigate("/login");
      return;
    }

    setPredicting(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/preduct", {
        cropType,
        season,
        soilMoisture: Number(soilMoisture),
        temperature: Number(temperature),
        rainfall: Number(rainfall),
        humidity: Number(humidity),
        irrigationAmount: Number(irrigationAmount),
        soilData,
        soilReportId,
      });

      setPrediction(response.data.data.prediction);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("❌ Prediction failed");
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div className="upload-soil-container">
      <h2>🌱 Upload Soil Fertility Report</h2>

      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="upload-soil-preview" />}
      <br />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="upload-soil-error">{error}</p>}

      {soilData && (
        <div>
          <h3>✅ Soil Data:</h3>
          <pre>{JSON.stringify(soilData, null, 2)}</pre>

          <h3>📌 Additional Inputs</h3>
          <input placeholder="Crop Type" value={cropType} onChange={(e) => setCropType(e.target.value)} />
          <input placeholder="Season" value={season} onChange={(e) => setSeason(e.target.value)} />
          <input placeholder="Soil Moisture" value={soilMoisture} onChange={(e) => setSoilMoisture(e.target.value)} />
          <input placeholder="Temperature" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
          <input placeholder="Rainfall" value={rainfall} onChange={(e) => setRainfall(e.target.value)} />
          <input placeholder="Humidity" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
          <input placeholder="Irrigation Amount" value={irrigationAmount} onChange={(e) => setIrrigationAmount(e.target.value)} />

          <button onClick={handleSubmit} disabled={predicting}>
            {predicting ? "Predicting..." : "Predict Yield"}
          </button>
        </div>
      )}

      {prediction && (
        <div className="upload-soil-prediction">
          <h3>🌾 Predicted Yield</h3>
          <p>{prediction.predicted_yield} {prediction.unit}</p>
        </div>
      )}
    </div>
  );
}

export default UploadSoil;
