// const path = require("path");
// const fs = require("fs");
// const axios = require("axios");
// const multer = require("multer");
// const FormData = require("form-data");
// require("dotenv").config();

// const SoilReport = require("../model/SoilReport"); 

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// exports.uploadImage = [
//   upload.single("file"),

//   async (req, res) => {
//     try {
//       if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

//       console.log("📡 Sending file to FastAPI:", process.env.PYTHON_URL);

//       const formData = new FormData();
//       formData.append("file", fs.createReadStream(req.file.path));

//       // Call FastAPI
//       const fastApiRes = await axios.post(
//         `${process.env.PYTHON_URL}/upload-soil/`,
//         formData,
//         { headers: formData.getHeaders()}
//       );

//       // FastAPI returns { "soil_data": {...} }
//       const soilData = fastApiRes.data.soil_data;

//       if (!soilData) {
//         throw new Error("No soil_data received from FastAPI");
//       }

//       // Save in MongoDB
//       const soilReport = new SoilReport({
//         imagePath: req.file.path,
//         soil_ph: soilData.soil_ph,
//         nitrogen: soilData.nitrogen,
//         phosphorus: soilData.phosphorus,
//         potassium: soilData.potassium,
//         organic_matter: soilData.organic_matter,
//         electrical_conductivity: soilData.electrical_conductivity,
//       });

//       await soilReport.save();

//       res.json({
//         msg: "✅ Soil report uploaded and saved",
//         soil_data: soilData,
//         soilReportId: soilReport._id,
//       });
//     } catch (err) {
//       console.error("❌ Upload error:", err.response?.data || err.message);
//       res.status(500).json({ error: err.response?.data || err.message });
//     }
//   },
// ];





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

// exports.uploadImage = [
//   upload.single("file"),

//   async (req, res) => {
//     if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

//     try {
//       if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

//       const formData = new FormData();
//       formData.append("file", fs.createReadStream(req.file.path));

//       // const fastApiRes = await axios.post("https://py-db.onrender.com/upload-soil/", formData, {
//       //   headers: formData.getHeaders(),
//       // });
//       // const fastApiRes = await axios.post(`${process.env.PYTHON_URL}/upload-soil/`, formData, {
//       //   headers: formData.getHeaders(),
//       // });
//       const fastApiRes = await axios.post(`http://127.0.0.1:8000/upload-soil/`, formData, {
//     headers: formData.getHeaders(),
// });

// console.log(fastApiRes);


//       const soilData = fastApiRes.data.soil_data;

//       const soilReport = new SoilReport({
//         imagePath: req.file.path,
//         soil_ph: soilData.soil_ph,
//         nitrogen: soilData.nitrogen,
//         phosphorus: soilData.phosphorus,
//         potassium: soilData.potassium,
//         organic_matter: soilData.organic_matter,
//         electrical_conductivity: soilData.electrical_conductivity,
//         userID:userID,
//       });

//       await soilReport.save();

//       res.json({
//         msg: "✅ Soil report uploaded and saved",
//         soil_data: soilData,
//         soilReportId: soilReport._id,
//       });
//     } catch (err) {
//       console.error("Upload error:", err.message);
//       res.status(500).json({ error: err.message });
//     }
//   },
// ];

exports.uploadImage = [
  upload.single("file"),

  async (req, res) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

    try {
      if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

      const { userID } = req.body;
      console.log(userID);
       // ✅ get userID from formData

      const formData = new FormData();
      formData.append("file", fs.createReadStream(req.file.path));

      const fastApiRes = await axios.post(`http://127.0.0.1:8000/upload-soil/`, formData, {
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
        userID: userID, // ✅ save userID
      });

      await soilReport.save();

      res.json({
        msg: "✅ Soil report uploaded and saved",
        soil_data: soilData,
        soilReportId: soilReport._id,
      });
    } catch (err) {
      console.log(err);
      
      console.error("Upload error:", err.message);
      res.status(500).json({ error: err.message });
    }
  },
];
