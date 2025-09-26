import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
// NOTE: Assuming these components (Card, Button, Input) are custom wrappers 
// or library components that apply the utility classes used in the CSS
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input } from "./ui"; 
import { ArrowLeft, TrendingUp, CheckCircle } from "lucide-react";
import "../styles/YieldPrediction.css"; // Correct path to the CSS file

const YieldPrediction = () => {
  const location = useLocation();
  const [auth] = useAuth();
  // Destructuring state from location (passed from another page, e.g., the soil upload component)
  const { soilData, soilReportId, weather } = location.state || {}; 

  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [season, setSeason] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!soilData || !weather) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <p className="text-red-600 font-medium text-lg mb-4">
          ⚠ No data found. Please upload soil report and weather first.
        </p>
        {/* Using the styled link back button */}
        <a href="/" className="btn-agriculture inline-flex items-center gap-2">
          <ArrowLeft /> Go Back
        </a>
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
        crop: crop.toLowerCase(),
        cropType: crop.toLowerCase(),
        season: season.toLowerCase(),
        // Default values added for safety if soilData is incomplete
        soil_ph: soilData.soil_ph || 6.5,
        nitrogen: soilData.nitrogen || 0,
        phosphorus: soilData.phosphorus || 0,
        potassium: soilData.potassium || 0,
        organic_matter: soilData.organic_matter || 0,
        electrical_conductivity: soilData.electrical_conductivity || 0,
        soilData,
        soil_moisture: Number(weather.main?.humidity || 0),
        temperature: Number(weather.main?.temp || 0),
        rainfall: Number(weather.rain?.["1h"] || 0),
        humidity: Number(weather.main?.humidity || 0),
        irrigation_amount: Number(area),
        soilReportId,
        userID: auth?.user?.id,
      };

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/preduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setPrediction({
        crop,
        season,
        area,
        // Assuming the response structure is correct
        yield: data.data.prediction.predicted_yield, 
      });
    } catch (error) {
      console.error("❌ Prediction error:", error);
      alert("Prediction failed. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="container mx-auto max-w-5xl space-y-8">
        {/* Back Button (Styled as a thematic link) */}
        <a href="/" className="btn-agriculture inline-flex items-center gap-2">
          <ArrowLeft /> Back to Home
        </a>

        {/* 1. Soil Report Card (Top Section) */}
        <Card className="card-soil-report Card">
          <CardHeader>
            <CardTitle>Soil Report</CardTitle>
            <dive>Overview of your soil data</dive>
          </CardHeader>
          <CardContent className="soil-data-grid">
            {/* Displaying key soil data points */}
            <div>Soil pH: {soilData.soil_ph}</div>
            <div>Nitrogen: {soilData.nitrogen}</div>
            <div>Phosphorus: {soilData.phosphorus}</div>
            <div>Potassium: {soilData.potassium}</div>
            <div>Organic Matter: {soilData.organic_matter}</div>
            <div>Electrical Conductivity: {soilData.electrical_conductivity}</div>
          </CardContent>
        </Card>
        
        {/* 2. Prediction Form and Results (Side by Side) */}
        <div className="two-card Card">
            {/* The wrapper that defines the two-column grid on medium screens */}
            <div className="grid md:grid-cols-2 gap-8"> 
                
                {/* A. Prediction Form Card */}
                <Card className="card-natural Card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="text-success" /> Crop Yield Prediction
                    </CardTitle>
                    <CardDescription>Fill the form below to predict your crop yield</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Input Fields */}
                    <Input placeholder="Crop Type" value={crop} onChange={(e) => setCrop(e.target.value)} />
                    <Input type="number" placeholder="Area (hectares)" value={area} onChange={(e) => setArea(e.target.value)} />
                    <select value={season} onChange={(e) => setSeason(e.target.value)} className="input-select">
                      <option value="">-- Select Season --</option>
                      <option value="summer">Summer</option>
                      <option value="winter">Winter</option>
                      <option value="spring">Spring</option>
                      <option value="fall">Fall</option>
                    </select>
                    {/* Submit Button */}
                    <Button onClick={handlePredict} disabled={loading} className="w-full btn-agriculture">
                      {loading ? "⏳ Predicting..." : "🔮 Predict Yield"}
                    </Button>
                  </CardContent>
                </Card>
                
                {/* B. Prediction Result Card */}
                <Card className="card-natural Card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="text-success" /> Prediction Results
                    </CardTitle>
                    <CardDescription>Results of your crop yield prediction</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {prediction ? (
                      <div className="results-card space-y-4">
                        <div className="predicted-yield">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <CheckCircle className="h-6 w-6 text-success" />
                            <h3 className="text-lg font-semibold">Estimated Yield</h3>
                          </div>
                          <p className="text-3xl font-bold">{prediction.yield} kg/ha</p>
                        </div>

                        {/* Summary of inputs used for prediction */}
                        <div className="soil-data-grid">
                          <div>Crop: {prediction.crop}</div>
                          <div>Season: {prediction.season}</div>
                          <div>Area: {prediction.area} ha</div>
                          <div>Soil pH: {soilData.soil_ph}</div>
                          <div>Nitrogen: {soilData.nitrogen}</div>
                          <div>Phosphorus: {soilData.phosphorus}</div>
                          <div>Potassium: {soilData.potassium}</div>
                          <div>Organic Matter: {soilData.organic_matter}</div>
                          <div>Electrical Conductivity: {soilData.electrical_conductivity}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <TrendingUp className="mx-auto h-12 w-12 mb-4 text-muted-foreground" />
                        <p>Prediction results will appear here after submitting the form</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;