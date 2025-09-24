const mongoose = require("mongoose");

const SoilReportSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  soil_ph: { type: Number },
  nitrogen: { type: Number },
  phosphorus: { type: Number },
  potassium: { type: Number },
  organic_matter: { type: Number },
  electrical_conductivity: { type: Number },
  createdAt: { type: Date, default: Date.now },
  userID:{type:String},
});

module.exports = mongoose.models.SoilReport || mongoose.model("SoilReport", SoilReportSchema);
