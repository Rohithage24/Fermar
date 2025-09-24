import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function UploadSoil() {
  const [soilData, setSoilData] = useState(null);
  const [soilReportId ,setsoilReportId] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [file, setFile] = useState(null);

  // Loading states
  const [uploading, setUploading] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState("");

  // user inputs
  const [cropType, setCropType] = useState("");
  const [season, setSeason] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [humidity, setHumidity] = useState("");
  const [irrigationAmount, setIrrigationAmount] = useState("");
  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Upload soil report
  const handleUpload = async () => {

    if (!file) return setError("Please upload a file");
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/soil-Reprot", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSoilData(response.data.soil_data);
      setsoilReportId(response.data.soilReportId);

      
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      setError("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Save prediction
  const handleSubmit = async () => {
    if (!soilData) return setError("Please upload soil report first");
    setPredicting(true);
    setError("");

    if(!auth.user){
      navigate('/login')
    }

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
      console.log(response);
      
      setPrediction(response.data.data.prediction);
    } catch (err) {
      console.error("Prediction error:", err.response?.data || err.message);
      setError("❌ Prediction failed");
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🌱 Upload Soil Fertility Report</h2>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {soilData && (
        <div style={{ marginTop: "20px" }}>
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
        <div style={{ marginTop: "20px" }}>
          <h3>🌾 Predicted Yield</h3>
          <p>{prediction.predicted_yield} {prediction.unit}</p>
        </div>
      )}
    </div>
  );
}

export default UploadSoil;





// import React, { useState } from "react";
// import axios from "axios";

// function UploadSoil() {
//   const [soilData, setSoilData] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [file, setFile] = useState(null);

//   // user inputs
//   const [cropType, setCropType] = useState("");
//   const [season, setSeason] = useState("");
//   const [soilMoisture, setSoilMoisture] = useState("");
//   const [temperature, setTemperature] = useState("");
//   const [rainfall, setRainfall] = useState("");
//   const [humidity, setHumidity] = useState("");
//   const [irrigationAmount, setIrrigationAmount] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/upload-soil/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setSoilData(response.data.soil_data);
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Soil upload failed!");
//     }
//   };

//   const handleSubmit = async () => {
//     if (!soilData) return;

//     try {
//       const payload = {
//         crop_type: cropType,
//         season: season,
//         soil_ph: soilData.soil_ph,
//         nitrogen: soilData.nitrogen,
//         phosphorus: soilData.phosphorus,
//         potassium: soilData.potassium,
//         organic_matter: soilData.organic_matter,
//         electrical_conductivity: soilData.electrical_conductivity,
//         soil_moisture: Number(soilMoisture),
//         temperature: Number(temperature),
//         rainfall: Number(rainfall),
//         humidity: Number(humidity),
//         irrigation_amount: Number(irrigationAmount),
//       };

//       const response = await axios.post("http://127.0.0.1:8000/predict-yield/", payload);
//       setPrediction(response.data);
//     } catch (error) {
//       if (error.response) {
//         console.error("Prediction failed:", error.response.data);
//         alert("Prediction failed: " + JSON.stringify(error.response.data.detail));
//       } else {
//         console.error("Prediction error:", error);
//       }
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🌱 Upload Soil Fertility Report</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
//         Upload
//       </button>

//       {soilData && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>✅ Extracted Soil Data:</h3>
//           <pre>{JSON.stringify(soilData, null, 2)}</pre>

//           <h3>📌 Enter Additional Details</h3>
//           <input placeholder="Crop Type (e.g. Rice)" value={cropType} onChange={(e) => setCropType(e.target.value)} />
//           <br />
//           <input placeholder="Season (e.g. Kharif)" value={season} onChange={(e) => setSeason(e.target.value)} />
//           <br />
//           <input placeholder="Soil Moisture (%)" value={soilMoisture} onChange={(e) => setSoilMoisture(e.target.value)} />
//           <br />
//           <input placeholder="Temperature (°C)" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
//           <br />
//           <input placeholder="Rainfall (mm)" value={rainfall} onChange={(e) => setRainfall(e.target.value)} />
//           <br />
//           <input placeholder="Humidity (%)" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
//           <br />
//           <input placeholder="Irrigation Amount (mm)" value={irrigationAmount} onChange={(e) => setIrrigationAmount(e.target.value)} />
//           <br />
//           <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
//             Predict Yield
//           </button>
//         </div>
//       )}

//       {prediction && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>🌾 Predicted Yield</h3>
//           <p>
//             {prediction.predicted_yield} {prediction.unit}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadSoil;


