const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  soilData: { type: Object, required: true },
  userInputs: { type: Object, required: true },
  prediction: { type: Object },
  soilReportId: { type: mongoose.Schema.Types.ObjectId, ref: "SoilReport" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Prediction || mongoose.model("Prediction", PredictionSchema);
