import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import axios from "axios";
import "../styles/WeatherSoilSection.css";

const API_KEY = "3310ea8b509ac5126bfb966d30a1ef77";

const WeatherSoilSection = () => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [soilData, setSoilData] = useState(null);
  const [soilReportId, setSoilReportId] = useState(null);
  const [soilError, setSoilError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setWeatherError("Geolocation not supported");
      setLoadingWeather(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const data = await res.json();
          setWeather(data);
        } catch {
          setWeatherError("Unable to fetch weather");
        } finally {
          setLoadingWeather(false);
        }
      },
      () => {
        setWeatherError("Location access denied");
        setLoadingWeather(false);
      }
    );
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!["image/png", "image/jpeg", "image/jpg"].includes(selectedFile.type)) {
      alert(translations.invalidImage || "Please upload a valid image (JPG, PNG).");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!auth?.user) return navigate("/login");
    if (!file) return setSoilError(translations.selectImage || "Please select a file");

    setUploading(true);
    setProgress(0);
    setSoilError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userID", auth.user.id);

    try {
      const res = await axios.post("http://localhost:5000/soil-Reprot", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });

      if (res.data.soil_data) {
        setSoilData(res.data.soil_data);
        setSoilReportId(res.data.soilReportId);
      } else {
        setSoilError("❌ Invalid response from server");
      }

      setTimeout(() => {
        setPreview(null);
        setFile(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      setSoilError("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const goToPrediction = () => navigate("/prediction", { state: { soilData, soilReportId, weather } });

  return (
    <section className="weather-soil-section">
      {/* Weather Card */}
      <div className="weather-card">
        <h2>🌦 Live Weather Info</h2>
        {loadingWeather && <p className="loading">Fetching weather...</p>}
        {weatherError && <p className="error">{weatherError}</p>}
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

      {/* Soil Upload Card */}
      <div className="soil-card">
        <h2>{translations.soilUploadTitle || "Upload Soil Report"}</h2>
        <form className="soil-form" onSubmit={(e) => e.preventDefault()}>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput" className="upload-label">
            {preview ? "Change File" : "Choose File"}
          </label>

          {preview && (
            <div className="soil-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          <button type="button" onClick={handleUpload} disabled={uploading}>
            {uploading ? `Uploading... ${progress}%` : translations.submitButton || "Upload"}
          </button>

          {soilError && <p className="error">{soilError}</p>}

          {soilData && (
            <>
              <button type="button" onClick={goToPrediction}>
                🌾 Go to Prediction
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default WeatherSoilSection;
