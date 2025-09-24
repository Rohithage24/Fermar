
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
require("dotenv").config();

// ----------------- REGISTER -----------------
// ----------------- REGISTER -----------------
exports.register = async (req, res) => {
  try {
    const { name, mobile, password, address, surveyNo, area } = req.body;

    if (!name || !mobile || !password || !address || !surveyNo || !area) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if mobile already exists
    const existing = await User.findOne({ mobile });
    if (existing) {
      return res.status(400).json({ msg: "Mobile number already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      mobile,
      password: hashedPassword,
      address,
      surveyNo,
      area,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      msg: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        address: user.address,
        surveyNo: user.surveyNo,
        area: user.area,
      },
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// ----------------- LOGIN -----------------
// ----------------- LOGIN -----------------
exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    console.log(req.body);
    

    if (!mobile || !password) {
      return res.status(400).json({ msg: "Mobile and password are required" });
    }

    const user = await User.findOne({ mobile });
    console.log(user);
    
    if (!user) return res.status(404).json({ msg: "User not found" });
      // const hashedPassword = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,   // prevents JS access
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      msg: "Login successful",
      token :token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        address: user.address,
        surveyNo: user.surveyNo,
        area: user.area,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};



exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // get token from cookies
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach full user object
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ msg: "User not found" });

    req.user = user; // attach full user
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};


exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ msg: "Logged out successfully" });
};

// checkAuth.js
exports.checkAuth = (req, res) => {
  if (!req.user) return res.status(401).json({ msg: "Not authenticated" });

  res.json({
    msg: "Authenticated",
    user: req.user,
  });
};






// const jwt = require("jsonwebtoken");
// const User = require("../model/user");
// const twilio = require("twilio");
// require("dotenv").config();

// // Twilio client
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // ----------------- SEND OTP -----------------
// exports.sendOtp = async (req, res) => {
//   try {
//     const { mobile } = req.body;
//     if (!mobile) return res.status(400).json({ msg: "Mobile number is required" });

//     // Find or create user
//     let user = await User.findOne({ mobile });
//     if (!user) {
//       user = new User({ mobile });
//       await user.save();
//     }

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save OTP and expiry in DB
//     user.otp = otp;
//     user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
//     await user.save();

//     // Send OTP via Twilio SMS
//     // const message = await client.messages.create({
//     //   body: `Your OTP is: ${otp}`,
//     //   from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
//     //   to: `+91${mobile}` // Recipient mobile number
//     // });

//     const message = await client.messages.create({
//   body: `Your OTP is: ${otp}`,
//   from: `+91 8446420312`, // Must be Twilio number
//   to: `+91${mobile}`
// });

//     console.log("Message SID:", message.sid);
//     res.json({ msg: "OTP sent successfully", userId: user._id });
//   } catch (err) {
//     console.error("Send OTP Error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };

// // ----------------- VERIFY OTP -----------------
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { userId, otp } = req.body;
//     if (!userId || !otp) return res.status(400).json({ msg: "User ID and OTP are required" });

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     if (user.otp !== otp || Date.now() > user.otpExpires) {
//       return res.status(400).json({ msg: "Invalid or expired OTP" });
//     }

//     // OTP valid → create JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     // Clear OTP
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     res.json({ msg: "Login successful", token, user: { id: user._id, mobile: user.mobile } });
//   } catch (err) {
//     console.error("Verify OTP Error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };

// // ----------------- JWT AUTH MIDDLEWARE -----------------
// exports.authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ msg: "No token provided" });

//   const token = authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ msg: "Token missing" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id; // Attach user ID to request
//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: "Invalid or expired token" });
//   }
// };
