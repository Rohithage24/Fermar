import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const API_KEY = "3310ea8b509ac5126bfb966d30a1ef77";

function WeatherSoilSection() {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [soilData, setSoilData] = useState(null);
  const [soilReportId, setSoilReportId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [soilError, setSoilError] = useState("");
  const [auth] = useAuth();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const data = await response.json();
          setWeather(data);
        } catch {
          setError("Unable to fetch weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied");
        setLoading(false);
      }
    );
  }, []);

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
    if (!auth || !auth.user) {
      navigate("/login");
      return;
    }
    if (!file) return setSoilError(translations.selectImage || "Please select a file");
    setUploading(true);
    setSoilError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userID", auth.user.id);

    try {
      const response = await axios.post("http://localhost:5000/soil-Reprot", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSoilData(response.data.soil_data);
      setSoilReportId(response.data.soilReportId);

      setTimeout(() => {
        setPreview(null);
        setFile(null);
      }, 3000);
    } catch {
      setSoilError("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const goToPrediction = () => {
    navigate("/prediction", {
      state: { soilData, soilReportId, weather },
    });
  };

  return (
    <>
      <style>{`
        .weather-soil-section {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          background-color: #313131;
          padding: 30px 20px;
          min-height: 100vh;
        }
        .weather-card {
          flex: 1 1 350px;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 450px;
        }
        .weather-card h2 {
          text-align: center;
          color: #FFE100;
          font-weight: bold;
          font-size: 1.8rem;
        }
        .weather-content {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          color: #FFE100;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .weather-content h3 {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .soil-card {
          flex: 1 1 450px;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: 450px;
        }
        .soil-card h2 {
          font-size: 26px;
          color: #FFE100;
          text-align: center;
        }
        .soil-form {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          color: #FFE100;
          flex-grow: 1;
          justify-content: space-between;
          gap: 10px;
        }
        .soil-form input[type="file"] {
          padding: 8px;
          background: #fefae0;
          border: 2px solid #a7c957;
          border-radius: 6px;
          color: #333;
        }
        .soil-preview img {
          max-width: 200px;
          border-radius: 8px;
          border: 2px solid #a7c957;
          margin-top: 10px;
        }
        .soil-form button {
          background: #FFE100;
          color: #081c15;
          padding: 10px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
        }
        .soil-data {
          margin-top: 10px;
          max-height: 150px;
          overflow-y: auto;
        }
        .soil-data pre {
          color: #e9edc9;
          font-size: 0.8rem;
        }
      `}</style>

      <section className="weather-soil-section">
        {/* Weather Card */}
        <div className="weather-card">
          <h2>🌦 Live Weather Info</h2>
          {loading && <p style={{ textAlign: "center", color: "#FFE100" }}>Fetching weather...</p>}
          {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
          {weather && (
            <div className="weather-content">
              <h3>{weather.name}, {weather.sys.country}</h3>
              <p>🌡 Temperature: {weather.main.temp} °C</p>
              <p>🌤 Condition: {weather.weather[0].description}</p>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>🌬 Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>

        {/* Soil Card */}
        <div className="soil-card">
          <h2>{translations.soilUploadTitle}</h2>
          <form onSubmit={(e) => e.preventDefault()} className="soil-form">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <div className="soil-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
            <button type="button" onClick={handleUpload} disabled={uploading}>
              {uploading ? "Uploading..." : translations.submitButton}
            </button>
            {soilError && <p style={{ color: "red" }}>{soilError}</p>}
            {soilData && (
              <div className="soil-data">
                <h3>✅ Soil Data:</h3>
                <pre>{JSON.stringify(soilData, null, 2)}</pre>
              </div>
            )}
            {soilData && (
              <button type="button" onClick={goToPrediction}>
                🌾 Go to Prediction
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default WeatherSoilSection;




// import React, { useEffect, useState } from "react";
// import { useLanguage } from "../context/LanguageContext";
// import axios from "axios";

// const API_KEY = "3310ea8b509ac5126bfb966d30a1ef77";

// function WeatherSoilSection() {
//   const { translations } = useLanguage();

//   // Weather state
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Soil state
//   const [soilData, setSoilData] = useState(null);
//   const [soilReportId, setSoilReportId] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [predicting, setPredicting] = useState(false);
//   const [soilError, setSoilError] = useState("");

//   // Soil inputs
//   const [cropType, setCropType] = useState("");
//   const [season, setSeason] = useState("");
//   const [soilMoisture, setSoilMoisture] = useState("");
//   const [temperature, setTemperature] = useState("");
//   const [rainfall, setRainfall] = useState("");
//   const [humidity, setHumidity] = useState("");
//   const [irrigationAmount, setIrrigationAmount] = useState("");

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;
//         try {
//           const response = await fetch(
//            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
//           );
//           const data = await response.json();
//           setWeather(data);
//         } catch {
//           setError("Unable to fetch weather");
//         } finally {
//           setLoading(false);
//         }
//       },
//       () => {
//         setError("Location access denied");
//         setLoading(false);
//       }
//     );
//   }, []);

//   // Soil handlers
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type.startsWith("image/")) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     } else {
//       alert(translations.invalidImage || "Please upload a valid image (JPG, PNG).");
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return setSoilError(translations.selectImage || "Please select a file");
//     setUploading(true);
//     setSoilError("");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post("http://localhost:5000/soil-Reprot", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setSoilData(response.data.soil_data);
//       setSoilReportId(response.data.soilReportId);
//       setTimeout(() => {
//         setPreview(null);
//         setFile(null);
//       }, 5000);
//     } catch {
//       setSoilError("❌ Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!soilData) return setSoilError("Please upload soil report first");
//     setPredicting(true);
//     setSoilError("");

//     try {
//       const response = await axios.post("http://localhost:5000/preduct", {
//         cropType,
//         season,
//         soilMoisture,
//         temperature,
//         rainfall,
//         humidity,
//         irrigationAmount,
//         soilData,
//         soilReportId,
//       });
//       setPrediction(response.data.data.prediction);
//     } catch {
//       setSoilError("❌ Prediction failed");
//     } finally {
//       setPredicting(false);
//     }
//   };

//   return (
//     <section
//       style={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "20px",
//         justifyContent: "center",
//         backgroundColor: "#313131",
//         padding: "30px 20px",
//       }}
//     >
//       {/* Weather Card */}
//       <div
//         style={{
//           flex: "1 1 350px",
//           maxWidth: "400px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           height: "450px", // slightly taller
//         }}
//       >
//         <h2 style={{ textAlign: "center", color: "#FFE100", fontWeight: "bold", fontSize: "1.8rem" }}>
//           🌦 Live Weather Info
//         </h2>

//         {loading && <p style={{ textAlign: "center", color: "#FFE100" }}>Fetching weather...</p>}
//         {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

//         {weather && (
//           <div
//             style={{
//               background: "rgba(255,255,255,0.15)",
//               backdropFilter: "blur(8px)",
//               WebkitBackdropFilter: "blur(8px)",
//               padding: "2rem",
//               borderRadius: "12px",
//               textAlign: "center",
//               boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//               color: "#FFE100",
//               flexGrow: 1,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             <h3 style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
//               {weather.name}, {weather.sys.country}
//             </h3>
//             <p>🌡 Temperature: {weather.main.temp} °C</p>
//             <p>🌤 Condition: {weather.weather[0].description}</p>
//             <p>💧 Humidity: {weather.main.humidity}%</p>
//             <p>🌬 Wind: {weather.wind.speed} m/s</p>
//           </div>
//         )}
//       </div>

//       {/* Soil Card */}
//       <div
//         style={{
//           flex: "1 1 450px",
//           maxWidth: "500px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "flex-start",
//           height: "450px", // same as weather
//         }}
//       >
//         <h2 style={{ fontSize: "26px", color: "#FFE100", textAlign: "center" }}>
//           {translations.soilUploadTitle}
//         </h2>

//         <form
//           onSubmit={(e) => e.preventDefault()}
//           style={{
//             background: "rgba(255,255,255,0.15)",
//             backdropFilter: "blur(12px)",
//             WebkitBackdropFilter: "blur(12px)",
//             display: "flex",
//             flexDirection: "column",
//             padding: "20px",
//             borderRadius: "12px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//             color: "#FFE100",
//             flexGrow: 1,
//             justifyContent: "space-between",
//           }}
//         >
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{
//               padding: "8px",
//               background: "#fefae0",
//               border: "2px solid #a7c957",
//               borderRadius: "6px",
//               color: "#333",
//             }}
//           />

//           {preview && (
//             <div style={{ marginTop: "10px" }}>
//               <img
//                 src={preview}
//                 alt={translations.previewAlt || "Soil Report Preview"}
//                 style={{
//                   maxWidth: "200px",
//                   borderRadius: "8px",
//                   border: "2px solid #a7c957",
//                 }}
//               />
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={handleUpload}
//             disabled={uploading}
//             style={{
//               background: "#FFE100",
//               color: "#081c15",
//               padding: "10px",
//               border: "none",
//               borderRadius: "8px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             {uploading ? "Uploading..." : translations.submitButton}
//           </button>

//           {soilError && <p style={{ color: "red" }}>{soilError}</p>}

//           {soilData && (
//             <div style={{ marginTop: "10px" }}>
//               <h3>✅ Soil Data:</h3>
//               <pre style={{ color: "#e9edc9", fontSize: "0.8rem" }}>{JSON.stringify(soilData, null, 2)}</pre>
//             </div>
//           )}

//           {prediction && (
//             <div style={{ marginTop: "10px" }}>
//               <h3>🌾 Predicted Yield</h3>
//               <p style={{ color: "#e9edc9" }}>
//                 {prediction.predicted_yield} {prediction.unit}
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//     </section>
//   );
// }

// export default WeatherSoilSection;