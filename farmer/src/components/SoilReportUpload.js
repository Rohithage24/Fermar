import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import axios from "axios";

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
    } catch (err) {
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
    } catch (err) {
      setError("❌ Prediction failed");
    } finally {
      setPredicting(false);
    }
  };

  return (
    <section
      style={{
        backgroundColor: "#313131", // matches WeatherInfo background
        padding: "40px 20px",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: "26px", marginBottom: "15px", color: "#FFE100" }}>
        {translations.soilUploadTitle}
      </h2>
      <p style={{ marginBottom: "20px", fontSize: "16px", color: "#e9edc9" }}>
        {translations.soilUploadText}
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          background: "rgba(255,255,255,0.1)", // glassy card
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          display: "inline-block",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          color: "#FFE100",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            marginBottom: "15px",
            padding: "8px",
            background: "#fefae0",
            border: "2px solid #a7c957",
            borderRadius: "6px",
            color: "#333",
          }}
        />
        <br />

        {preview && (
          <div style={{ marginBottom: "15px" }}>
            <img
              src={preview}
              alt={translations.previewAlt || "Soil Report Preview"}
              style={{
                maxWidth: "250px",
                borderRadius: "8px",
                border: "2px solid #a7c957",
              }}
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          style={{
            background: "#FFE100", // matches other buttons
            color: "#081c15",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          {uploading ? "Uploading..." : translations.submitButton}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {soilData && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <h3 style={{ color: "#FFE100" }}>✅ Soil Data:</h3>
            <pre style={{ color: "#e9edc9" }}>{JSON.stringify(soilData, null, 2)}</pre>

            <h3 style={{ color: "#FFE100" }}>📌 Additional Inputs</h3>
            <input placeholder="Crop Type" value={cropType} onChange={(e) => setCropType(e.target.value)} />
            <input placeholder="Season" value={season} onChange={(e) => setSeason(e.target.value)} />
            <input placeholder="Soil Moisture" value={soilMoisture} onChange={(e) => setSoilMoisture(e.target.value)} />
            <input placeholder="Temperature" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
            <input placeholder="Rainfall" value={rainfall} onChange={(e) => setRainfall(e.target.value)} />
            <input placeholder="Humidity" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
            <input placeholder="Irrigation Amount" value={irrigationAmount} onChange={(e) => setIrrigationAmount(e.target.value)} />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={predicting}
              style={{
                marginTop: "10px",
                background: "#FFE100", // matches other buttons
                color: "#081c15",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {predicting ? "Predicting..." : "Predict Yield"}
            </button>
          </div>
        )}

        {prediction && (
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ color: "#FFE100" }}>🌾 Predicted Yield</h3>
            <p style={{ color: "#e9edc9" }}>
              {prediction.predicted_yield} {prediction.unit}
            </p>
          </div>
        )}
      </form>
    </section>
  );
}

export default SoilReportUpload;
