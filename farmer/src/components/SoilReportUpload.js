import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import axios from "axios";
import "./SoilReportUpload.css";

function SoilReportUpload() {
  const { translations } = useLanguage();

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert(translations.invalidImage || "Please upload a valid image (JPG, PNG).");
    }
  };

  const handleUpload = async () => {
    if (!file) return setError(translations.selectImage || "Please select a file");
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
    } catch {
      setError("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!soilData) return setError("Please upload soil report first");
    setPredicting(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/preduct", {
        cropType,
        season,
        soilMoisture,
        temperature,
        rainfall,
        humidity,
        irrigationAmount,
        soilData,
        soilReportId,
      });
      setPrediction(response.data.data.prediction);
    } catch {
      setError("❌ Prediction failed");
    } finally {
      setPredicting(false);
    }
  };

  return (
    <section className="soil-upload-section">
      <h2>{translations.soilUploadTitle}</h2>
      <p>{translations.soilUploadText}</p>

      <form className="soil-form" onSubmit={(e) => e.preventDefault()}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <div className="soil-preview">
            <img src={preview} alt={translations.previewAlt || "Soil Report Preview"} />
          </div>
        )}

        <button type="button" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : translations.submitButton}
        </button>

        {error && <p className="error">{error}</p>}

        {soilData && (
          <div className="soil-data-section">
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

            <button type="button" onClick={handleSubmit} disabled={predicting}>
              {predicting ? "Predicting..." : "Predict Yield"}
            </button>
          </div>
        )}

        {prediction && (
          <div className="prediction-section">
            <h3>🌾 Predicted Yield</h3>
            <p>{prediction.predicted_yield} {prediction.unit}</p>
          </div>
        )}
      </form>
    </section>
  );
}

export default SoilReportUpload;
