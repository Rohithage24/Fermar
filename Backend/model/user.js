const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String, required: true },
  serveNo: { type: String },
  otp: Number,
  otpExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);





// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, default: "Temp" },
//   mobile: { type: String, required: true, unique: true },
//   otp: Number,
//   otpExpires: Date
// }, { timestamps: true });

// module.exports = mongoose.model("User", UserSchema);



// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mobile: { type: String, required: true },
//   serveNo: { type: String, required: true },
//   otp: { type: Number },
//   otpExpires: { type: Date }
// }, { timestamps: true });

// module.exports = mongoose.model("User", UserSchema);
