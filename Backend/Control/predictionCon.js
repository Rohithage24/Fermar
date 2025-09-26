// controllers/predictionController.js
const axios = require("axios");
const Prediction = require("../model/pridation");
require("dotenv").config();


exports.savePrediction = async (req, res) => {
  try {
    const {
      crop,          // frontend might send this
      cropType,      // OR frontend might send this
      season,
      area,
      soilData,
      soilReportId,
      weather,
      userID,
    } = req.body;

    // Fix: safely handle crop
    const cropValue = crop || cropType;
    if (!cropValue) {
      return res.status(400).json({ error: "❌ crop or cropType is required" });
    }

    // Build payload for FastAPI
    const payload = {
      crop_type: cropValue.toLowerCase(),
      season: season ? season.toLowerCase() : "unknown",
      soil_ph: soilData?.soil_ph || 6.5,
      nitrogen: soilData?.nitrogen || 0,
      phosphorus: soilData?.phosphorus || 0,
      potassium: soilData?.potassium || 0,
      organic_matter: soilData?.organic_matter || 0,
      electrical_conductivity: soilData?.electrical_conductivity || 0,
      soil_moisture: Number(weather?.main?.humidity || 0),
      temperature: Number(weather?.main?.temp || 0),
      rainfall: Number(weather?.rain?.["1h"] || 0),
      humidity: Number(weather?.main?.humidity || 0),
      irrigation_amount: Number(area || 0),
    };

    const fastApiRes = await axios.post(
      `${process.env.PYTHON_PREDATION_URL}/predict-yield/`,
      payload
    );

    const newPrediction = new Prediction({
      soilData,
      userInputs: payload,
      prediction: fastApiRes.data,
      soilReportId: soilReportId || null,
      userID :userID,
    });

    await newPrediction.save();
    res.json({ msg: "✅ Prediction saved", data: newPrediction });
  } catch (err) {
    console.error("Save Prediction Error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ error: err.response?.data?.detail || err.message });
  }
};








// const axios = require("axios");
// const Prediction = require("../model/pridation");

// exports.savePrediction = async (req, res) => {
//   try {
//     const {
//       cropType,
//       season,
//       soilMoisture,
//       temperature,
//       rainfall,
//       humidity,
//       irrigationAmount,
//       soilData,
//       soilReportId,
//     } = req.body;
//     console.log(req.body);
    
//     if (!soilData) return res.status(400).json({ error: "Soil data missing" });

//     const payload = {
//       crop_type: cropType,
//       season: season,
//       soil_ph: soilData.soil_ph || 6.5,
//       nitrogen: soilData.nitrogen || 0,
//       phosphorus: soilData.phosphorus || 0,
//       potassium: soilData.potassium || 0,
//       organic_matter: soilData.organic_matter || 0,
//       electrical_conductivity: soilData.electrical_conductivity || 0,
//       soil_moisture: Number(soilMoisture || 0),
//       temperature: Number(temperature || 0),
//       rainfall: Number(rainfall || 0),
//       humidity: Number(humidity || 0),
//       irrigation_amount: Number(irrigationAmount || 0),
//     };

//     const fastApiRes = await axios.post("http://127.0.0.1:8000/predict-yield/", payload);

//     const newPrediction = new Prediction({
//       soilData,
//       userInputs: payload,
//       prediction: fastApiRes.data,
//       soilReportId: soilReportId || null,
//     });

//     await newPrediction.save();

//     res.json({ msg: "✅ Prediction saved", data: newPrediction });
//   } catch (err) {
//     console.error("Save Prediction Error:", err.response?.data || err.message);
//     res.status(500).json({ error: err.response?.data?.detail || err.message });
//   }
// };



// const axios = require("axios");
// const Prediction = require("../model/pridation");
// require("dotenv").config();

// exports.savePrediction = async (req, res) => {
//   console.log("Request body:", req.body);

//   try {
//     const {
//       cropType,
//       season,
//       soilMoisture,
//       temperature,
//       rainfall,
//       humidity,
//       irrigationAmount,
//       soilData, // now this is already the soil object
//       soilReportId,
//     } = req.body;

//     // Use soilData directly
//     const payload = {
//       crop_type: cropType,
//       season,
//       soil_ph: soilData.soil_ph,
//       nitrogen: soilData.nitrogen,
//       phosphorus: soilData.phosphorus,
//       potassium: soilData.potassium,
//       organic_matter: soilData.organic_matter,
//       electrical_conductivity: soilData.electrical_conductivity || 0,
//       soil_moisture: Number(soilMoisture),
//       temperature: Number(temperature),
//       rainfall: Number(rainfall),
//       humidity: Number(humidity),
//       irrigation_amount: Number(irrigationAmount),
//     };

//     // Call Python API
//     const fastApiRes = await axios.post("http://127.0.0.1:8000/predict-yield/", payload);


//     const prediction = new Prediction({
//       soilData,
//       userInputs: payload,
//       prediction: fastApiRes.data,
//       soilReportId: soilReportId || null,
//     });

//     await prediction.save();

//     res.json({
//       msg: "✅ Prediction saved in MongoDB",
//       data: prediction,
//     });
//   } catch (err) {
//     console.error("Save Prediction Error:", err.response?.data || err.message);
//     res.status(500).json({ error: err.message });
//   }
// };
