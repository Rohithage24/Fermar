const axios = require("axios");
const Prediction = require("../model/pridation");
require("dotenv").config();
exports.savePrediction = async (req, res) => {
  console.log(req.body);

  try {
    const {
      cropType,
      season,
      soilMoisture,
      temperature,
      rainfall,
      humidity,
      irrigationAmount,
      soilData,
      soilReportId,
    } = req.body;

    // Destructure inner soil_data object
    const { soil_data } = soilData;

    const payload = {
      crop_type: cropType,
      season,
      soil_ph: soil_data.soil_ph,
      nitrogen: soil_data.nitrogen,
      phosphorus: soil_data.phosphorus,
      potassium: soil_data.potassium,
      organic_matter: soil_data.organic_matter,
      electrical_conductivity: soil_data.electrical_conductivity || 0,
      soil_moisture: Number(soilMoisture),
      temperature: Number(temperature),
      rainfall: Number(rainfall),
      humidity: Number(humidity),
      irrigation_amount: Number(irrigationAmount),
    };

    const fastApiRes = await axios.post( `${process.env.PYTHON_URL}/predict-yield/`, payload);

    const prediction = new Prediction({
      soilData,
      userInputs: payload,
      prediction: fastApiRes.data,
      soilReportId: soilReportId || null,
    });

    await prediction.save();

    res.json({
      msg: "✅ Prediction saved in MongoDB",
      data: prediction,
    });
  } catch (err) {
    console.error("Save Prediction Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
};
