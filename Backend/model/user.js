 const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String },
//   mobile: { type: String, required: true },
//   serveNo: { type: String },
//   otp: Number,
//   otpExpires: Date,
// }, { timestamps: true });
const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  surveyNo: { type: String, required: true },
  area: { type: Number, required: true },
});

// Model



module.exports = mongoose.model("User", farmerSchema);





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
