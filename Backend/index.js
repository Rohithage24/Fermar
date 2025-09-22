const express = require("express");
const cors = require("cors");
const userCon = require("./Control/userCon");
require("dotenv").config();
const { mongodb } = require("./config/mongodb");
const soilCon = require("./Control/soilCon");
const predictionCon = require("./Control/predictionCon");


const server = express();
server.use(cors());
server.use(express.json());


server.post("/send-otp", userCon.sendOtp);
server.post("/verify-otp", userCon.verifyOtp);


server.post("/soil-Reprot" , soilCon.uploadImage);
server.post("/preduct" , predictionCon.savePrediction);

server.listen(process.env.PORT || 5000, () => {
  mongodb();
  console.log(`Server running on port ${process.env.PORT}`)});





// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const userCon = require("./Control/userCon");
// const auth = require("./middleware/auth");

// const server = express();
// server.use(cors());
// server.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected."))
//   .catch(err => console.error(err));

// // Routes
// server.post("/signup", userCon.signup);
// server.post("/send-otp", userCon.sendOtp);
// server.post("/verify-otp", userCon.verifyOtp);

// // Example protected route
// server.get("/profile", auth, async (req, res) => {
//   const User = require("./model/user");
//   const user = await User.findById(req.user).select("-otp -otpExpires");
//   res.json(user);
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// require("dotenv").config(); // load .env first

// const express = require("express");
// const cors = require("cors");
// const userCon = require("./Control/userCon"); // user controller
// const { mongodb } = require("./config/mongodb");

// const server = express();
// server.use(express.json());
// server.use(cors());



// // ---------- Routes ----------
// server.post("/signup", userCon.signup);
// server.post("/send-otp", userCon.sendOtp);
// server.post("/verify-otp", userCon.verifyOtp);

// // ---------- Start server ----------
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   // Connect MongoDB
// mongodb();
//   console.log(`Server running on port ${PORT}`);
// });



// require("dotenv").config(); // must be first
// const express = require("express");
// const cors = require("cors");
// const userCon = require("./Control/userCon");
// const auth = require("./middleware/auth");
// const { mongodb } = require("./config/mongodb");

// const server = express();
// server.use(express.json());
// server.use(cors());

// // Connect MongoDB


// // ---------- Signup & Profile Routes ----------
// server.post("/signup", userCon.signup);
// server.post("/send-otp", userCon.sendOtp);
// server.post("/verify-otp", userCon.verifyOtp);
// server.get("/profile", auth, userCon.getProfile);

// // ---------- Start server ----------
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   mongodb();
//   console.log(`🚀 Server running on port ${PORT}`);
// });





// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const userCon = require("./Control/userCon"); 
// const auth = require("./middleware/auth")
// const upload = require('./uploads');

// dotenv.config();

// const server = express();
// server.use(express.json());
// server.use(cors());

// // Connect MongoDB
// const { mongodb } = require("./config/mongodb");

// // Routes
// server.post("/signup", userCon.signup);
// server.post("/login", userCon.login);
// server.get("/profile", auth, userCon.getProfile);




// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// server.post("/upload-soil", upload.single("file") ,upload.uploadImage ); 

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   mongodb();

//   console.log(`🚀 Server running on port ${PORT}`);
// });

// // // backend/index.js
// // require('dotenv').config();
// // const express = require('express');
// // const fetch = require('node-fetch');

// // const server = express();
// // const PORT = process.env.PORT || 8080;

// // server.use(express.json());

// // // सेटू DigiLocker बेस URLs
// // const SETU_BASE_SANDBOX = process.env.SETU_BASE_SANDBOX || 'https://dg-sandbox.setu.co';
// // const SETU_BASE_PROD = process.env.SETU_BASE_PROD || 'https://dg.setu.co';

// // // your Setu credentials from onboarding
// // const CLIENT_ID = process.env.SETU_CLIENT_ID;
// // const CLIENT_SECRET = process.env.SETU_CLIENT_SECRET;
// // const PRODUCT_INSTANCE_ID = process.env.SETU_PRODUCT_INSTANCE_ID;  // संविधान नुसार लागतो आहे

// // // कॉमन headers
// // function getHeaders() {
// //   return {
// //     'Content-Type': 'serverlication/json',
// //     'x-client-id': CLIENT_ID,
// //     'x-client-secret': CLIENT_SECRET,
// //     'x-product-instance-id': PRODUCT_INSTANCE_ID
// //   };
// // }

// // // 1) Create DigiLocker request (user consent journey)
// // server.post('/setu/digilocker/request', async (req, res) => {
// //   try {
// //     const { redirectUrl, docTypes /* optional: array of doc types you want */ } = req.body;
// //     const response = await fetch(`${SETU_BASE_SANDBOX}/api/digilocker/`, {
// //       method: 'POST',
// //       headers: getHeaders(),
// //       body: JSON.stringify({
// //         redirectUrl: redirectUrl,
// //         docTypes: docTypes  // optional based on spec
// //       })
// //     });
// //     if (!response.ok) {
// //       const err = await response.text();
// //       return res.status(response.status).send({ error: err });
// //     }
// //     const json = await response.json();
// //     // response has: id, status ("unauthenticated"), url (redirect to), validUpto ... :contentReference[oaicite:5]{index=5}
// //     res.json(json);
// //   } catch (e) {
// //     console.error('Error in create request:', e);
// //     res.status(500).send({ error: 'Internal server error' });
// //   }
// // });

// // // 2) Get DigiLocker request status
// // server.get('/setu/digilocker/request/:id/status', async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const response = await fetch(`${SETU_BASE_SANDBOX}/api/digilocker/${id}/status`, {
// //       method: 'GET',
// //       headers: getHeaders()
// //     });
// //     if (!response.ok) {
// //       const err = await response.text();
// //       return res.status(response.status).send({ error: err });
// //     }
// //     const json = await response.json();
// //     res.json(json);
// //   } catch (e) {
// //     console.error('Error in fetch status:', e);
// //     res.status(500).send({ error: 'Internal server error' });
// //   }
// // });

// // // 3) List available documents (global metadata)
// // server.get('/setu/digilocker/documents', async (req, res) => {
// //   try {
// //     const response = await fetch(`${SETU_BASE_SANDBOX}/api/digilocker/documents`, {
// //       method: 'GET',
// //       headers: getHeaders()
// //     });
// //     if (!response.ok) {
// //       const err = await response.text();
// //       return res.status(response.status).send({ error: err });
// //     }
// //     const json = await response.json();
// //     res.json(json);
// //   } catch (e) {
// //     console.error('Error in list docs:', e);
// //     res.status(500).send({ error: 'Internal server error' });
// //   }
// // });

// // // 4) Fetch a document (after user consent)
// // server.get('/setu/digilocker/fetch/:orgId/:docType', async (req, res) => {
// //   try {
// //     const { orgId, docType } = req.params;
// //     // Document fetch usually requires some identifiers + request id etc
// //     const response = await fetch(`${SETU_BASE_SANDBOX}/api/digilocker/doc/fetch`, {
// //       method: 'POST',
// //       headers: getHeaders(),
// //       body: JSON.stringify({
// //         orgId: orgId,
// //         docType: docType,
// //         // plus any other params required (from metadata.parameters array)
// //       })
// //     });
// //     if (!response.ok) {
// //       const err = await response.text();
// //       return res.status(response.status).send({ error: err });
// //     }
// //     // The API may return a file URL or binary content
// //     const contentType = response.headers.get('content-type');
// //     if (contentType && contentType.includes('serverlication/pdf')) {
// //       const buffer = await response.buffer();
// //       res.setHeader('Content-Type', 'serverlication/pdf');
// //       res.send(buffer);
// //     } else {
// //       const json = await response.json();
// //       res.json(json);
// //     }
// //   } catch (e) {
// //     console.error('Error fetch doc:', e);
// //     res.status(500).send({ error: 'Internal server error' });
// //   }
// // });

// // server.listen(PORT, () => {
// //   console.log(`Server listening on port ${PORT}`);
// // });
