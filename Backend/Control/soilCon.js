const path = require("path");
const fs = require("fs");
const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");
require("dotenv").config();

const SoilReport = require("../model/SoilReport"); // fixed path

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

exports.uploadImage = [
  upload.single("file"),

  async (req, res) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

    try {
      if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

      const formData = new FormData();
      formData.append("file", fs.createReadStream(req.file.path));

      const fastApiRes = await axios.post("https://py-db.onrender.com/upload-soil/", formData, {
        headers: formData.getHeaders(),
      });

      const soilData = fastApiRes.data.soil_data;

      const soilReport = new SoilReport({
        imagePath: req.file.path,
        soil_ph: soilData.soil_ph,
        nitrogen: soilData.nitrogen,
        phosphorus: soilData.phosphorus,
        potassium: soilData.potassium,
        organic_matter: soilData.organic_matter,
        electrical_conductivity: soilData.electrical_conductivity,
      });

      await soilReport.save();

      res.json({
        msg: "✅ Soil report uploaded and saved",
        soil_data: soilData,
        soilReportId: soilReport._id,
      });
    } catch (err) {
      console.error("Upload error:", err.message);
      res.status(500).json({ error: err.message });
    }
  },
];

