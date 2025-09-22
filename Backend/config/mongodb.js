

const mongoose = require("mongoose");

exports.mongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected.");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

// const mongoos = require("mongoose");

// exports.mongodb = async () => {
//  async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/Interview');

//   console.log("Mongodb Connected.");
  
// }
// }
