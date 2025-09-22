const path = require("path");
const fs = require("fs");
const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");

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
    try {
      if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

      const formData = new FormData();
      formData.append("file", fs.createReadStream(req.file.path));

      const fastApiRes = await axios.post("http://127.0.0.1:8000/upload-soil", formData, {
        headers: formData.getHeaders(),
      });

      const soilReport = new SoilReport({
        imagePath: req.file.path,
        soil_ph: fastApiRes.data.soil_ph,
        nitrogen: fastApiRes.data.nitrogen,
        phosphorus: fastApiRes.data.phosphorus,
        potassium: fastApiRes.data.potassium,
        organic_matter: fastApiRes.data.organic_matter,
        electrical_conductivity: fastApiRes.data.electrical_conductivity,
      });

      await soilReport.save();

      res.json({
        msg: "✅ Soil report uploaded and saved",
        soil_data: fastApiRes.data,
        soilReportId: soilReport._id,
      });
    } catch (err) {
      console.error("Upload error:", err.message);
      res.status(500).json({ error: err.message });
    }
  },
];
