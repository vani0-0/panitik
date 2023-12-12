const mongoose = require("mongoose");

function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set on env file");
  return mongoose.connect(uri);
}

module.exports = connectDB;
